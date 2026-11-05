/**
 * Zone 3 Scene — "Biển Xanh Tình Yêu" 🌊
 * Ocean wave animations, beach with shells, sun easter egg, transitions to collectShell minigame.
 */
(function() {
    let sunClickCount = 0;

    const scene = {
        init() {
            const container = document.getElementById('scene-zone3');

            container.innerHTML = `
                <style>
                    #scene-zone3 .beach-bg {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(180deg, #74b9ff 0%, #81ecec 45%, #ffeaa7 70%, #fdcb6e 100%);
                        overflow: hidden;
                    }

                    #scene-zone3 .sun {
                        position: absolute;
                        top: 25px;
                        right: 35px;
                        width: 55px;
                        height: 55px;
                        background: radial-gradient(circle, #ffeaa7 30%, #fdcb6e 70%, #fab1a0 100%);
                        border-radius: 50%;
                        box-shadow: 0 0 25px #fdcb6e, 0 0 45px #ffeaa7;
                        cursor: pointer;
                        z-index: 5;
                        animation: pulseSun 3s ease-in-out infinite;
                        -webkit-tap-highlight-color: transparent;
                    }
                    @keyframes pulseSun {
                        0%, 100% { transform: scale(1); box-shadow: 0 0 20px #fdcb6e; }
                        50% { transform: scale(1.08); box-shadow: 0 0 35px #ffeaa7; }
                    }

                    #scene-zone3 .clouds {
                        position: absolute;
                        top: 40px;
                        left: -50px;
                        font-size: 28px;
                        animation: moveCloud 25s linear infinite;
                        opacity: 0.85;
                        pointer-events: none;
                    }
                    @keyframes moveCloud {
                        from { transform: translateX(-50px); }
                        to { transform: translateX(500px); }
                    }

                    /* Waves */
                    #scene-zone3 .ocean-waves {
                        position: absolute;
                        top: 42%;
                        left: 0;
                        right: 0;
                        height: 60px;
                        overflow: hidden;
                        z-index: 4;
                    }
                    #scene-zone3 .wave {
                        position: absolute;
                        width: 200%;
                        height: 100%;
                        background: repeating-linear-gradient(
                            90deg,
                            transparent 0px,
                            transparent 20px,
                            rgba(255, 255, 255, 0.4) 20px,
                            rgba(255, 255, 255, 0.4) 40px
                        );
                        animation: waveDrift 4s ease-in-out infinite alternate;
                    }
                    @keyframes waveDrift {
                        from { transform: translateX(0); }
                        to { transform: translateX(-30px); }
                    }

                    /* Sand & decor */
                    #scene-zone3 .sand-area {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 48%;
                        z-index: 6;
                    }
                    #scene-zone3 .sand-castle {
                        position: absolute;
                        bottom: 90px;
                        left: 40px;
                        font-size: 40px;
                        filter: drop-shadow(2px 4px 0 rgba(0,0,0,0.15));
                        animation: floatCast 4s ease-in-out infinite;
                    }
                    #scene-zone3 .couple-beach {
                        position: absolute;
                        bottom: 100px;
                        right: 40px;
                        display: flex;
                        gap: 10px;
                        font-size: 38px;
                        filter: drop-shadow(2px 4px 0 rgba(0,0,0,0.2));
                    }
                    #scene-zone3 .palm-tree {
                        position: absolute;
                        bottom: 140px;
                        left: 10px;
                        font-size: 55px;
                        pointer-events: none;
                    }

                    #scene-zone3 .zone3-ui {
                        position: absolute;
                        bottom: 25px;
                        left: 0;
                        right: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        z-index: 10;
                        gap: 12px;
                    }
                </style>

                <div class="beach-bg">
                    <div class="sun" id="zone3-sun" title="Chạm 5 lần để mở easter egg!"></div>
                    <div class="clouds">☁️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ☁️</div>
                    <div class="ocean-waves">
                        <div class="wave"></div>
                    </div>
                    <div class="palm-tree">🌴</div>
                    <div class="sand-area">
                        <div class="sand-castle">🏰</div>
                        <div class="couple-beach">
                            <span class="bounce">👩</span>
                            <span style="font-size:24px; align-self:center;">💕</span>
                            <span class="bounce" style="animation-delay: 0.2s;">🧑</span>
                        </div>
                    </div>

                    <div class="zone3-ui">
                        <button id="zone3-game-btn" class="pixel-btn pulse" style="font-size: 13px; padding: 12px 20px;">
                            🐚 NHẶT VỎ ỐC TÌNH YÊU
                        </button>
                        <button id="zone3-next-btn" class="pixel-btn" style="display: none; background: #6ab04c; font-size: 13px; padding: 12px 24px;">
                            TIẾP TỤC HÀNH TRÌNH →
                        </button>
                    </div>
                </div>
            `;

            // Setup Sun easter egg
            const sun = document.getElementById('zone3-sun');
            if (sun) {
                sun.addEventListener('click', () => {
                    sunClickCount++;
                    if (window.GameParticles) window.GameParticles.hearts(5);
                    if (sunClickCount === 5) {
                        if (window.GameParticles) window.GameParticles.fireworks(6);
                        alert("✨ Quang Vinh: 'Dù sóng có lớn, anh vẫn nắm tay em. Mãi mãi!' 💕");
                    }
                });
            }

            // Setup Play Mini Game button
            const gameBtn = document.getElementById('zone3-game-btn');
            if (gameBtn) {
                gameBtn.addEventListener('click', () => {
                    Game.startMiniGame('collectShell', () => {
                        this.onMiniGameComplete();
                    });
                });
            }

            // Setup Next Scene button
            const nextBtn = document.getElementById('zone3-next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    Game.changeScene('zone4');
                });
            }
        },

        enter() {
            Game.showHUD();
            Game.state.currentZone = 3;
            Game.updateHUD();
            GameAudio.playBGM('zone3');

            if (window.GameParticles) {
                window.GameParticles.bubbles(12, 4000);
            }

            const gameBtn = document.getElementById('zone3-game-btn');
            const nextBtn = document.getElementById('zone3-next-btn');
            if (nextBtn) nextBtn.style.display = 'none';
            if (gameBtn) gameBtn.style.display = 'none';

            // Smooth storytelling: dialogue leads directly to minigame
            Game.showDialogue('zone3', () => {
                Game.startMiniGame('collectShell', () => {
                    this.onMiniGameComplete();
                });
            });
        },

        onMiniGameComplete() {
            Game.state.miniGamesCompleted.push('collectShell');
            Game.addItem('heart');
            Game.unlockLetter('letter4');
            Game.addLove(20);
            Game.saveGame();

            const nextBtn = document.getElementById('zone3-next-btn');
            const gameBtn = document.getElementById('zone3-game-btn');
            if (gameBtn) gameBtn.style.display = 'none';

            Game.showDialogue('zone3_complete', () => {
                if (nextBtn) {
                    nextBtn.style.display = 'block';
                    nextBtn.classList.add('bounce');
                }
            });
        },

        exit() {
            if (window.GameParticles) window.GameParticles.clear();
        }
    };

    Game.registerScene('zone3', scene);
})();
