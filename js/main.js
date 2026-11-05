/**
 * main.js — Main game controller and state manager for "Hành Trình Của Chúng Mình"
 */
window.Game = window.Game || {};

// Preserve already registered items if any
const existingScenes = window.Game.scenes || {};
const existingMiniGames = window.Game.miniGames || {};

Object.assign(window.Game, {
    state: {
        currentScene: 'title',
        currentZone: 0,
        loveMeter: 0,
        itemsCollected: [],
        lettersUnlocked: ['letter1'],
        voicesUnlocked: [],
        miniGamesCompleted: [],
        photosUnlocked: ['dalat', 'beach', 'food', 'future'],
        totalTouches: 0
    },

    scenes: existingScenes,
    miniGames: existingMiniGames,
    activeMiniGame: null,

    init() {
        console.log('🎮 Initializing "Hành Trình Của Chúng Mình"...');

        // Check save
        if (window.GameStorage && window.GameStorage.hasSave()) {
            this.loadGame();
        }

        // Init all registered scenes
        for (const id in this.scenes) {
            if (this.scenes[id].init) {
                this.scenes[id].init();
            }
        }

        // Init HUD click events
        this._setupHUDEvents();
        this._setupModalEvents();

        // Global touch tracker
        window.addEventListener('touchstart', () => this.trackTouch(), { passive: true });
        window.addEventListener('click', () => this.trackTouch(), { passive: true });

        // Go to initial scene
        this.changeScene('title');
    },

    registerScene(id, sceneObj) {
        this.scenes[id] = sceneObj;
    },

    changeScene(sceneId) {
        if (!this.scenes[sceneId]) {
            console.error(`Scene ${sceneId} not found!`);
            return;
        }

        const prevScene = this.scenes[this.state.currentScene];
        if (prevScene && prevScene.exit) {
            prevScene.exit();
        }

        if (window.GameTransition) {
            window.GameTransition.fade(() => {
                this._activateSceneDOM(sceneId);
            });
        } else {
            this._activateSceneDOM(sceneId);
        }
    },

    _activateSceneDOM(sceneId) {
        // Hide all scenes
        document.querySelectorAll('.scene').forEach(el => {
            el.classList.remove('active');
            el.style.display = 'none';
        });

        const newSceneEl = document.getElementById(`scene-${sceneId}`);
        if (newSceneEl) {
            newSceneEl.classList.add('active');
            newSceneEl.style.display = 'flex';
        }

        this.state.currentScene = sceneId;
        const newScene = this.scenes[sceneId];
        if (newScene && newScene.enter) {
            newScene.enter();
        }

        this.updateHUD();
        this.saveGame();
    },

    registerMiniGame(id, gameObj) {
        this.miniGames[id] = gameObj;
    },

    startMiniGame(id, onComplete) {
        const game = this.miniGames[id];
        if (!game) {
            console.error(`MiniGame ${id} not found!`);
            if (onComplete) onComplete();
            return;
        }

        const overlay = document.getElementById('minigame-overlay');
        const container = document.getElementById('minigame-container');
        if (!overlay || !container) return;

        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
        container.innerHTML = '';

        this.activeMiniGame = game;
        game.init(container, () => {
            this.endMiniGame();
            if (onComplete) onComplete();
        });
        if (game.start) game.start();
    },

    endMiniGame() {
        if (this.activeMiniGame && this.activeMiniGame.destroy) {
            this.activeMiniGame.destroy();
        }
        this.activeMiniGame = null;

        const overlay = document.getElementById('minigame-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    },

    showDialogue(dialogueKey, onComplete) {
        if (!window.GameData || !window.GameData.dialogues) return;
        const list = window.GameData.dialogues[dialogueKey];
        if (list && window.GameDialogue) {
            window.GameDialogue.show(list, onComplete);
        } else if (onComplete) {
            onComplete();
        }
    },

    addItem(itemId) {
        if (!this.state.itemsCollected.includes(itemId)) {
            this.state.itemsCollected.push(itemId);
            if (window.GameParticles) window.GameParticles.hearts(10);
            if (window.GameAudio) window.GameAudio.playSynthSFX('collect');
            this.updateHUD();
            this.saveGame();
        }
    },

    addLove(amount) {
        this.state.loveMeter = Math.min(100, this.state.loveMeter + amount);
        this.updateHUD();
        if (window.GameParticles) window.GameParticles.hearts(8);
        this.saveGame();
    },

    unlockLetter(letterId) {
        if (!this.state.lettersUnlocked.includes(letterId)) {
            this.state.lettersUnlocked.push(letterId);
            this.saveGame();
        }
    },

    unlockPhoto(photoId) {
        if (!this.state.photosUnlocked.includes(photoId)) {
            this.state.photosUnlocked.push(photoId);
            this.saveGame();
        }
    },

    readLetter(letterId) {
        if (!window.GameData || !window.GameData.letters) return;
        const letter = window.GameData.letters.find(l => l.id === letterId);
        if (!letter) return;

        const modal = document.getElementById('letter-modal');
        const titleEl = document.getElementById('modal-letter-title');
        const contentEl = document.getElementById('modal-letter-content');
        const dateEl = document.getElementById('modal-letter-date');

        if (titleEl) titleEl.textContent = letter.title;
        if (contentEl) contentEl.textContent = letter.content;
        if (dateEl) dateEl.textContent = letter.date || '';

        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    },

    viewPhoto(photoId) {
        const modal = document.getElementById('photo-modal');
        const captionEl = document.getElementById('photo-modal-caption');
        const imgEl = document.getElementById('photo-modal-img');

        const photoMap = {
            dalat: {
                src: 'asset/photos/landaudalat.jpg',
                caption: 'Lần Đầu Đi Đà Lạt — 28/04/2023 🌲'
            },
            beach: {
                src: 'asset/photos/bien.jpg',
                caption: 'Biển Xanh Rì Rào — Kỷ niệm ngọt ngào 🌊'
            },
            food: {
                src: 'asset/photos/quanan.jpg',
                caption: 'Những Bữa Ăn Ngon Cùng Nhau 🍜'
            },
            future: {
                src: 'asset/photos/landaudalat.jpg',
                caption: 'Lời Hứa Mãi Mãi — Quang Vinh & Việt Nga 💍'
            }
        };

        const item = photoMap[photoId] || { src: 'asset/photos/landaudalat.jpg', caption: 'Kỷ niệm đôi ta 💕' };

        if (captionEl) captionEl.textContent = item.caption;
        if (imgEl) {
            imgEl.src = item.src;
            imgEl.style.display = 'block';
        }
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    },

    showParticles(type, count) {
        if (window.GameParticles && window.GameParticles[type]) {
            window.GameParticles[type](count);
        }
    },

    updateHUD() {
        const loveFill = document.getElementById('love-fill');
        const loveText = document.getElementById('love-text');
        const itemCount = document.getElementById('item-count');
        const zoneBadge = document.getElementById('zone-badge');

        if (loveFill) {
            loveFill.style.width = `${this.state.loveMeter}%`;
        }
        if (loveText) {
            loveText.textContent = `${this.state.loveMeter}%`;
        }
        if (itemCount) {
            itemCount.textContent = `${this.state.itemsCollected.length}/20`;
        }
        if (zoneBadge) {
            zoneBadge.textContent = this.state.currentZone > 0 ? `Vùng ${this.state.currentZone}/5` : '';
        }
    },

    showHUD() {
        const hud = document.getElementById('game-hud');
        if (hud) hud.style.display = 'flex';
    },

    hideHUD() {
        const hud = document.getElementById('game-hud');
        if (hud) hud.style.display = 'none';
    },

    saveGame() {
        if (window.GameStorage) {
            window.GameStorage.save(this.state);
        }
    },

    loadGame() {
        if (window.GameStorage) {
            const saved = window.GameStorage.load();
            if (saved) {
                this.state = Object.assign(this.state, saved);
                this.updateHUD();
            }
        }
    },

    resetGameProgress() {
        this.state.currentScene = 'intro';
        this.state.currentZone = 0;
        this.state.loveMeter = 0;
        this.state.itemsCollected = [];
        this.state.lettersUnlocked = ['letter1'];
        this.state.miniGamesCompleted = [];
        this.saveGame();
        this.updateHUD();
    },

    getDaysTogether() {
        const start = new Date('2023-11-01');
        const now = new Date();
        const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        return Math.max(1095, diff);
    },

    trackTouch() {
        this.state.totalTouches++;
        if (this.state.totalTouches % 50 === 0 && window.GameParticles) {
            window.GameParticles.hearts(3);
        }
    },

    _setupHUDEvents() {
        const soundBtn = document.getElementById('hud-sound-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const isMuted = window.GameAudio.toggleMute();
                soundBtn.textContent = isMuted ? '🔇' : '🔊';
            });
        }
    },

    _setupModalEvents() {
        // Letter modal close
        const letterClose = document.getElementById('letter-modal-close');
        const letterModal = document.getElementById('letter-modal');
        if (letterClose && letterModal) {
            letterClose.addEventListener('click', () => {
                letterModal.classList.add('hidden');
                letterModal.style.display = 'none';
            });
            letterModal.addEventListener('click', (e) => {
                if (e.target === letterModal) {
                    letterModal.classList.add('hidden');
                    letterModal.style.display = 'none';
                }
            });
        }

        // Photo modal close
        const photoClose = document.getElementById('photo-modal-close');
        const photoModal = document.getElementById('photo-modal');
        if (photoClose && photoModal) {
            photoClose.addEventListener('click', () => {
                photoModal.classList.add('hidden');
                photoModal.style.display = 'none';
            });
            photoModal.addEventListener('click', (e) => {
                if (e.target === photoModal) {
                    photoModal.classList.add('hidden');
                    photoModal.style.display = 'none';
                }
            });
        }

        // Dialogue overlay tap to advance
        const dialogueOverlay = document.getElementById('dialogue-overlay');
        if (dialogueOverlay) {
            dialogueOverlay.addEventListener('click', () => {
                if (window.GameDialogue) window.GameDialogue.handleTap();
            });
        }
    }
});

// Start when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.Game.init();
});
