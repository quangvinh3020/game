/**
 * Mini Game: Nhặt Vỏ Ốc Tình Yêu 🐚 — Tap Collection Game
 * Beach scene with shells, starfish, and coral appearing randomly.
 * Player taps items to collect them. Goal: 15 items in 45 seconds.
 */
(function() {
    const ITEM_TYPES = [
        { emoji: '🐚', name: 'Vỏ ốc', weight: 35 },
        { emoji: '⭐', name: 'Sao biển', weight: 25 },
        { emoji: '🪸', name: 'San hô', weight: 20 },
        { emoji: '🦀', name: 'Cua', weight: 12, moving: true },
        { emoji: '🍾', name: 'Chai thủy tinh', weight: 8, special: true }
    ];

    const game = {
        container: null,
        onComplete: null,
        score: 0,
        goal: 15,
        timeLeft: 45,
        failures: 0,
        gameActive: false,
        timerInterval: null,
        spawnInterval: null,
        items: [],
        bottleShown: false,
        els: {},

        init(container, onComplete) {
            this.container = container;
            this.onComplete = onComplete;
            this.failures = 0;
            this._buildDOM();
        },

        _buildDOM() {
            const style = document.createElement('style');
            style.id = 'collectshell-styles';
            style.textContent = `
                .cs-wrap {
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    font-family: 'Press Start 2P', monospace;
                    position: relative; overflow: hidden;
                    user-select: none; -webkit-user-select: none;
                }
                .cs-header {
                    padding: 12px 8px 8px;
                    text-align: center;
                    background: linear-gradient(180deg, #87CEEB 0%, #B0E0FF 100%);
                    z-index: 5;
                }
                .cs-title {
                    font-size: 13px; color: #2C3E50;
                    margin-bottom: 8px;
                    text-shadow: 1px 1px 0 #fff;
                }
                .cs-stats {
                    display: flex; justify-content: center; gap: 20px;
                    font-size: 10px; color: #E84393;
                }
                .cs-sky {
                    height: 10%;
                    background: linear-gradient(180deg, #87CEEB 0%, #B0E0FF 100%);
                    position: relative;
                }
                .cs-wave-area {
                    height: 8%;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(180deg, #B0E0FF 0%, #4FC3F7 50%, #F5DEB3 100%);
                }
                .cs-wave {
                    position: absolute; width: 200%; height: 100%;
                    font-size: 20px; line-height: 1;
                    white-space: nowrap;
                    animation: cs-wave-move 3s linear infinite;
                    color: #4FC3F7;
                    bottom: 0;
                }
                @keyframes cs-wave-move {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .cs-sand {
                    flex: 1;
                    background: linear-gradient(180deg, #F5DEB3 0%, #DEB887 40%, #D2B48C 100%);
                    position: relative;
                    overflow: hidden;
                }
                .cs-sand-texture {
                    position: absolute; width: 100%; height: 100%;
                    pointer-events: none; z-index: 0;
                    opacity: 0.1;
                    background: repeating-conic-gradient(#A0522D 0% 25%, transparent 0% 50%) 50% / 8px 8px;
                }
                .cs-item {
                    position: absolute;
                    font-size: 36px;
                    cursor: pointer;
                    z-index: 3;
                    animation: cs-item-appear 0.3s ease-out;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                    transition: transform 0.1s;
                    touch-action: manipulation;
                }
                .cs-item:active { transform: scale(1.1); }
                .cs-item.cs-moving {
                    animation: cs-item-appear 0.3s ease-out, cs-crab-walk 1s ease-in-out infinite;
                }
                @keyframes cs-item-appear {
                    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes cs-crab-walk {
                    0%, 100% { margin-left: 0; }
                    50% { margin-left: 20px; }
                }
                .cs-item.cs-pulse {
                    animation: cs-item-appear 0.3s ease-out, cs-glow 1s ease-in-out infinite;
                }
                @keyframes cs-glow {
                    0%, 100% { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
                    50% { filter: drop-shadow(0 0 12px rgba(249,202,36,0.8)); }
                }
                .cs-item.cs-special {
                    animation: cs-item-appear 0.3s ease-out, cs-glow-special 0.8s ease-in-out infinite;
                }
                @keyframes cs-glow-special {
                    0%, 100% { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 16px rgba(255,107,157,0.9)); transform: scale(1.05); }
                }
                .cs-item-collected {
                    transition: transform 0.4s ease-in, opacity 0.4s ease-in;
                    transform: scale(1.8) translateY(-40px) !important;
                    opacity: 0 !important;
                    pointer-events: none;
                }
                .cs-item-fade {
                    transition: opacity 0.5s ease-out;
                    opacity: 0 !important;
                    pointer-events: none;
                }
                .cs-instructions {
                    padding: 8px;
                    text-align: center;
                    font-size: 8px; color: #8B7355;
                    background: #D2B48C;
                    z-index: 5;
                }
                .cs-result-overlay {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    background: rgba(245,222,179,0.95);
                    z-index: 10; gap: 16px;
                }
                .cs-result-text {
                    font-size: 16px; color: #2C3E50;
                    text-align: center;
                    text-shadow: 2px 2px 0 #fff;
                    line-height: 1.8;
                }
                .cs-btn {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 10px; padding: 12px 24px;
                    background: #E84393; color: #fff;
                    border: none; cursor: pointer;
                    box-shadow: 0 4px 0 #C0392B;
                    min-width: 44px; min-height: 44px;
                    transition: transform 0.1s;
                }
                .cs-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #C0392B; }
                .cs-btn-skip {
                    background: #95a5a6;
                    box-shadow: 0 4px 0 #7f8c8d;
                    font-size: 9px;
                }
                .cs-score-fly {
                    position: absolute; font-size: 12px;
                    font-family: 'Press Start 2P', monospace;
                    color: #F9CA24; pointer-events: none; z-index: 7;
                    text-shadow: 1px 1px 0 #E84393;
                    animation: cs-fly-up 0.8s ease-out forwards;
                }
                @keyframes cs-fly-up {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-50px); }
                }
                .cs-bottle-msg {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255,255,255,0.95);
                    padding: 16px; text-align: center;
                    font-size: 9px; color: #E84393;
                    z-index: 8;
                    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
                    animation: cs-msg-pop 0.3s ease-out;
                    line-height: 1.8;
                }
                @keyframes cs-msg-pop {
                    0% { transform: translate(-50%,-50%) scale(0); }
                    100% { transform: translate(-50%,-50%) scale(1); }
                }
                .cs-sun {
                    position: absolute; top: 5px; right: 15px;
                    font-size: 30px; z-index: 1;
                    animation: cs-sun-glow 3s ease-in-out infinite;
                }
                @keyframes cs-sun-glow {
                    0%, 100% { filter: drop-shadow(0 0 8px #F9CA24); }
                    50% { filter: drop-shadow(0 0 16px #F9CA24); }
                }
                .cs-cloud {
                    position: absolute; font-size: 24px; z-index: 1;
                    animation: cs-cloud-drift 12s linear infinite;
                    opacity: 0.7;
                }
                @keyframes cs-cloud-drift {
                    0% { transform: translateX(-60px); }
                    100% { transform: translateX(calc(100vw + 60px)); }
                }
            `;
            this.container.appendChild(style);

            const wrap = document.createElement('div');
            wrap.className = 'cs-wrap';
            wrap.innerHTML = `
                <div class="cs-header">
                    <div class="cs-title">🐚 Nhặt Vỏ Ốc Tình Yêu 🐚</div>
                    <div class="cs-stats">
                        <span>⏱️ <span class="cs-timer">45</span>s</span>
                        <span>🐚 <span class="cs-score">0</span>/15</span>
                    </div>
                </div>
                <div class="cs-sky">
                    <div class="cs-sun">☀️</div>
                    <div class="cs-cloud" style="top:5px;animation-delay:0s;">☁️</div>
                    <div class="cs-cloud" style="top:15px;animation-delay:5s;">☁️</div>
                </div>
                <div class="cs-wave-area">
                    <div class="cs-wave">🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~🌊~~</div>
                </div>
                <div class="cs-sand">
                    <div class="cs-sand-texture"></div>
                </div>
                <div class="cs-instructions">Chạm vào vỏ ốc để nhặt!</div>
            `;
            this.container.appendChild(wrap);

            this.els.wrap = wrap;
            this.els.timer = wrap.querySelector('.cs-timer');
            this.els.scoreEl = wrap.querySelector('.cs-score');
            this.els.sand = wrap.querySelector('.cs-sand');
        },

        start() {
            this.score = 0;
            this.timeLeft = 45;
            this.gameActive = true;
            this.items = [];
            this.bottleShown = false;

            this.els.timer.textContent = '45';
            this.els.scoreEl.textContent = '0';

            // Clear existing items and overlays
            this.els.sand.querySelectorAll('.cs-item, .cs-bottle-msg').forEach(e => e.remove());
            const overlay = this.els.wrap.querySelector('.cs-result-overlay');
            if (overlay) overlay.remove();

            // Timer
            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                this.els.timer.textContent = this.timeLeft;
                if (this.timeLeft <= 0) {
                    this._endGame(false);
                }
            }, 1000);

            // Spawn items
            this._scheduleSpawn();
        },

        _scheduleSpawn() {
            if (!this.gameActive) return;
            const delay = 1200 + Math.random() * 800;
            this.spawnInterval = setTimeout(() => {
                if (!this.gameActive) return;
                // Spawn 1-2 items
                const count = Math.random() < 0.3 ? 2 : 1;
                for (let i = 0; i < count; i++) {
                    this._spawnItem();
                }
                this._scheduleSpawn();
            }, delay);
        },

        _pickItemType() {
            // Force bottle to appear once around score 7-10
            if (!this.bottleShown && this.score >= 6 && Math.random() < 0.4) {
                this.bottleShown = true;
                return ITEM_TYPES.find(t => t.special);
            }

            const totalWeight = ITEM_TYPES.reduce((s, t) => s + (t.special ? 0 : t.weight), 0);
            let r = Math.random() * totalWeight;
            for (const t of ITEM_TYPES) {
                if (t.special) continue;
                r -= t.weight;
                if (r <= 0) return t;
            }
            return ITEM_TYPES[0];
        },

        _spawnItem() {
            if (!this.gameActive) return;
            const type = this._pickItemType();
            const sandRect = this.els.sand.getBoundingClientRect();
            if (!sandRect || sandRect.width === 0) return;

            const x = 5 + Math.random() * 75; // percentage
            const y = 10 + Math.random() * 70; // percentage

            const el = document.createElement('div');
            el.className = 'cs-item';
            if (type.moving) el.classList.add('cs-moving');
            else if (type.special) el.classList.add('cs-special');
            else el.classList.add('cs-pulse');

            el.textContent = type.emoji;
            el.style.left = x + '%';
            el.style.top = y + '%';

            const itemData = { el, type, alive: true };
            this.items.push(itemData);

            // Click/tap handler
            const handler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!itemData.alive || !this.gameActive) return;
                itemData.alive = false;
                this._collectItem(itemData);
            };
            el.addEventListener('touchstart', handler, { passive: false });
            el.addEventListener('click', handler);

            this.els.sand.appendChild(el);

            // Auto-remove after 3 seconds
            const fadeTimer = setTimeout(() => {
                if (itemData.alive) {
                    itemData.alive = false;
                    el.classList.add('cs-item-fade');
                    setTimeout(() => el.remove(), 500);
                }
            }, 3000);

            itemData.fadeTimer = fadeTimer;
        },

        _collectItem(itemData) {
            clearTimeout(itemData.fadeTimer);
            this.score++;
            this.els.scoreEl.textContent = this.score;

            const el = itemData.el;
            const rect = el.getBoundingClientRect();
            const sandRect = this.els.sand.getBoundingClientRect();

            // Score fly-up
            const fly = document.createElement('div');
            fly.className = 'cs-score-fly';
            fly.textContent = '+1';
            fly.style.left = el.style.left;
            fly.style.top = el.style.top;
            this.els.sand.appendChild(fly);
            setTimeout(() => fly.remove(), 800);

            // Collection animation
            el.classList.add('cs-item-collected');
            setTimeout(() => el.remove(), 400);

            try { GameAudio.playSFX('pop'); } catch(e) {}

            // Special bottle message
            if (itemData.type.special) {
                this._showBottleMessage();
            }

            // Check win
            if (this.score >= this.goal) {
                this._endGame(true);
            }
        },

        _showBottleMessage() {
            const msg = document.createElement('div');
            msg.className = 'cs-bottle-msg';
            msg.innerHTML = `
                📜 Thư trong chai! 📜<br><br>
                "Anh/em luôn yêu<br>
                và bên cạnh nhau<br>
                mãi mãi nhé! 💕"
            `;
            this.els.sand.appendChild(msg);
            setTimeout(() => {
                msg.style.transition = 'opacity 0.5s';
                msg.style.opacity = '0';
                setTimeout(() => msg.remove(), 500);
            }, 2500);
        },

        _endGame(won) {
            this.gameActive = false;
            if (this.timerInterval) clearInterval(this.timerInterval);
            if (this.spawnInterval) clearTimeout(this.spawnInterval);

            // Clear remaining item fade timers
            this.items.forEach(item => {
                if (item.fadeTimer) clearTimeout(item.fadeTimer);
            });

            setTimeout(() => {
                const overlay = document.createElement('div');
                overlay.className = 'cs-result-overlay';

                if (won) {
                    overlay.innerHTML = `
                        <div class="cs-result-text">
                            Tuyệt vời! 🐚<br><br>
                            Bộ sưu tập<br>vỏ ốc hoàn hảo!
                        </div>
                    `;
                    this.els.wrap.appendChild(overlay);
                    try { Game.showParticles('confetti', 12); } catch(e) {}
                    try { Game.showParticles('hearts', 8); } catch(e) {}
                    setTimeout(() => {
                        if (this.onComplete) this.onComplete();
                    }, 2000);
                } else {
                    this.failures++;
                    let btns = `<button class="cs-btn cs-retry">🔄 Thử lại</button>`;
                    if (this.failures >= 3) {
                        btns += `<button class="cs-btn cs-btn-skip" style="margin-top:8px;">Bỏ qua ▶</button>`;
                    }
                    overlay.innerHTML = `
                        <div class="cs-result-text">
                            Thử lại nhé! 💕<br><br>
                            Bạn nhặt được ${this.score}/${this.goal}
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                            ${btns}
                        </div>
                    `;
                    this.els.wrap.appendChild(overlay);
                    overlay.querySelector('.cs-retry').addEventListener('click', () => {
                        overlay.remove();
                        this.start();
                    });
                    const skipBtn = overlay.querySelector('.cs-btn-skip');
                    if (skipBtn) {
                        skipBtn.addEventListener('click', () => {
                            if (this.onComplete) this.onComplete();
                        });
                    }
                }
            }, 500);
        },

        destroy() {
            this.gameActive = false;
            if (this.timerInterval) clearInterval(this.timerInterval);
            if (this.spawnInterval) clearTimeout(this.spawnInterval);
            this.items.forEach(item => {
                if (item.fadeTimer) clearTimeout(item.fadeTimer);
            });
            const style = document.getElementById('collectshell-styles');
            if (style) style.remove();
            this.items = [];
            this.els = {};
        }
    };

    Game.registerMiniGame('collectShell', game);
})();
