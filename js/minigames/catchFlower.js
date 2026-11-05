/**
 * Mini Game: Hứng Hoa Tình Yêu 🌸 — Catch Game
 * Cherry blossom petals fall from the top, player catches them with a basket.
 * Goal: Catch 10 out of 15 falling petals in 30 seconds.
 */
(function() {
    const game = {
        container: null,
        onComplete: null,
        // Game state
        score: 0,
        goal: 10,
        timeLeft: 30,
        basketX: 50, // percentage
        petals: [],
        animFrameId: null,
        timerInterval: null,
        failures: 0,
        gameActive: false,
        lastTime: 0,
        petalSpawnTimer: 0,
        petalSpawnInterval: 1200,
        totalPetalsSpawned: 0,
        maxPetals: 20,
        // DOM refs
        els: {},
        // Touch tracking
        touchStartX: 0,
        basketStartX: 0,
        gameAreaRect: null,
        // Bound handlers
        _onTouchStart: null,
        _onTouchMove: null,
        _onTouchEnd: null,
        _onMouseMove: null,
        _onResize: null,

        init(container, onComplete) {
            this.container = container;
            this.onComplete = onComplete;
            this.failures = 0;
            this._buildDOM();
            this._bindEvents();
        },

        _buildDOM() {
            // Inject styles
            const style = document.createElement('style');
            style.id = 'catchflower-styles';
            style.textContent = `
                .cf-wrap {
                    width: 100%; height: 100%;
                    background: linear-gradient(180deg, #FFE0EC 0%, #FFF0F5 40%, #E8F5E9 100%);
                    display: flex; flex-direction: column;
                    font-family: 'Press Start 2P', monospace;
                    position: relative; overflow: hidden;
                    user-select: none; -webkit-user-select: none;
                    touch-action: none;
                }
                .cf-header {
                    padding: 12px 8px 8px;
                    text-align: center;
                    z-index: 5;
                }
                .cf-title {
                    font-size: 13px; color: #FF6B9D;
                    margin-bottom: 8px;
                    text-shadow: 1px 1px 0 #fff;
                }
                .cf-stats {
                    display: flex; justify-content: center; gap: 20px;
                    font-size: 10px; color: #E84393;
                }
                .cf-game-area {
                    flex: 1; position: relative; overflow: hidden;
                }
                .cf-petal {
                    position: absolute; font-size: 28px;
                    z-index: 3; pointer-events: none;
                    transition: none;
                    filter: drop-shadow(0 2px 4px rgba(255,107,157,0.3));
                }
                .cf-petal.golden { filter: drop-shadow(0 0 8px #F9CA24); }
                .cf-petal.rare { filter: drop-shadow(0 0 8px #FF6B9D); }
                .cf-petal.caught {
                    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                    transform: scale(1.5); opacity: 0;
                }
                .cf-basket {
                    position: absolute; bottom: 10px;
                    width: 80px; height: 50px;
                    font-size: 40px; text-align: center;
                    line-height: 50px; z-index: 4;
                    transform: translateX(-50%);
                    transition: none;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }
                .cf-basket.bounce {
                    animation: cf-bounce 0.3s ease;
                }
                @keyframes cf-bounce {
                    0%,100% { transform: translateX(-50%) scaleY(1); }
                    50% { transform: translateX(-50%) scaleY(0.8) scaleX(1.1); }
                }
                .cf-instructions {
                    padding: 8px;
                    text-align: center;
                    font-size: 8px; color: #999;
                    z-index: 5;
                    background: rgba(255,255,255,0.5);
                }
                .cf-result-overlay {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    background: rgba(255,240,245,0.95);
                    z-index: 10; gap: 16px;
                }
                .cf-result-text {
                    font-size: 16px; color: #FF6B9D;
                    text-align: center;
                    text-shadow: 2px 2px 0 #fff;
                    line-height: 1.8;
                }
                .cf-btn {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 10px; padding: 12px 24px;
                    background: #E84393; color: #fff;
                    border: none; cursor: pointer;
                    box-shadow: 0 4px 0 #C0392B;
                    image-rendering: pixelated;
                    min-width: 44px; min-height: 44px;
                    transition: transform 0.1s;
                }
                .cf-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #C0392B; }
                .cf-btn-skip {
                    background: #95a5a6;
                    box-shadow: 0 4px 0 #7f8c8d;
                    font-size: 9px;
                }
                .cf-catch-particle {
                    position: absolute; font-size: 12px;
                    pointer-events: none; z-index: 6;
                    animation: cf-particle-fly 0.6s ease-out forwards;
                }
                @keyframes cf-particle-fly {
                    0% { opacity: 1; transform: translate(0,0) scale(1); }
                    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
                }
                .cf-score-pop {
                    position: absolute; font-size: 14px; font-family: 'Press Start 2P', monospace;
                    color: #F9CA24; pointer-events: none; z-index: 7;
                    animation: cf-score-fly 0.8s ease-out forwards;
                    text-shadow: 1px 1px 0 #E84393;
                }
                @keyframes cf-score-fly {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-60px); }
                }
                .cf-bg-petal {
                    position: absolute; font-size: 16px; opacity: 0.15;
                    pointer-events: none; z-index: 1;
                    animation: cf-bg-float 8s linear infinite;
                }
                @keyframes cf-bg-float {
                    0% { transform: translateY(-20px) rotate(0deg); }
                    100% { transform: translateY(calc(100vh)) rotate(360deg); }
                }
            `;
            this.container.appendChild(style);

            const wrap = document.createElement('div');
            wrap.className = 'cf-wrap';
            wrap.innerHTML = `
                <div class="cf-header">
                    <div class="cf-title">🌸 Hứng Hoa Tình Yêu 🌸</div>
                    <div class="cf-stats">
                        <span>⏱️ <span class="cf-timer">30</span>s</span>
                        <span>🌸 <span class="cf-score">0</span>/10</span>
                    </div>
                </div>
                <div class="cf-game-area"></div>
                <div class="cf-instructions">◄ Vuốt trái/phải để hứng hoa ►</div>
            `;
            this.container.appendChild(wrap);

            this.els.wrap = wrap;
            this.els.timer = wrap.querySelector('.cf-timer');
            this.els.scoreEl = wrap.querySelector('.cf-score');
            this.els.gameArea = wrap.querySelector('.cf-game-area');
            this.els.instructions = wrap.querySelector('.cf-instructions');

            // Create basket
            const basket = document.createElement('div');
            basket.className = 'cf-basket';
            basket.textContent = '🧺';
            this.els.gameArea.appendChild(basket);
            this.els.basket = basket;

            // Add background petals for ambiance
            for (let i = 0; i < 5; i++) {
                const bp = document.createElement('div');
                bp.className = 'cf-bg-petal';
                bp.textContent = '🌸';
                bp.style.left = (Math.random() * 90) + '%';
                bp.style.animationDelay = (Math.random() * 8) + 's';
                this.els.gameArea.appendChild(bp);
            }
        },

        _bindEvents() {
            const area = this.els.wrap;

            this._onTouchStart = (e) => {
                if (!this.gameActive) return;
                const touch = e.touches[0];
                this.touchStartX = touch.clientX;
                this.basketStartX = this.basketX;
                e.preventDefault();
            };

            this._onTouchMove = (e) => {
                if (!this.gameActive) return;
                const touch = e.touches[0];
                const rect = this.els.gameArea.getBoundingClientRect();
                const dx = touch.clientX - this.touchStartX;
                const pctDelta = (dx / rect.width) * 100;
                this.basketX = Math.max(10, Math.min(90, this.basketStartX + pctDelta));
                this.els.basket.style.left = this.basketX + '%';
                e.preventDefault();
            };

            this._onTouchEnd = () => {};

            this._onMouseMove = (e) => {
                if (!this.gameActive) return;
                const rect = this.els.gameArea.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                this.basketX = Math.max(10, Math.min(90, (relX / rect.width) * 100));
                this.els.basket.style.left = this.basketX + '%';
            };

            this._onResize = () => {
                this.gameAreaRect = this.els.gameArea.getBoundingClientRect();
            };

            area.addEventListener('touchstart', this._onTouchStart, { passive: false });
            area.addEventListener('touchmove', this._onTouchMove, { passive: false });
            area.addEventListener('touchend', this._onTouchEnd);
            area.addEventListener('mousemove', this._onMouseMove);
            window.addEventListener('resize', this._onResize);
        },

        start() {
            this.score = 0;
            this.timeLeft = 30;
            this.petals = [];
            this.basketX = 50;
            this.totalPetalsSpawned = 0;
            this.petalSpawnTimer = 0;
            this.gameActive = true;
            this.lastTime = performance.now();

            this.els.basket.style.left = '50%';
            this.els.timer.textContent = '30';
            this.els.scoreEl.textContent = '0';

            // Remove any result overlay
            const existing = this.els.wrap.querySelector('.cf-result-overlay');
            if (existing) existing.remove();

            // Remove old petals
            this.els.gameArea.querySelectorAll('.cf-petal').forEach(p => p.remove());

            this.gameAreaRect = this.els.gameArea.getBoundingClientRect();

            // Start timer
            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                this.els.timer.textContent = this.timeLeft;
                if (this.timeLeft <= 0) {
                    this._endGame(false);
                }
            }, 1000);

            // Start game loop
            this._gameLoop(performance.now());
        },

        _gameLoop(timestamp) {
            if (!this.gameActive) return;
            const dt = timestamp - this.lastTime;
            this.lastTime = timestamp;

            // Spawn petals
            this.petalSpawnTimer += dt;
            if (this.petalSpawnTimer >= this.petalSpawnInterval && this.totalPetalsSpawned < this.maxPetals) {
                this._spawnPetal();
                this.petalSpawnTimer = 0;
                // Vary interval
                this.petalSpawnInterval = 800 + Math.random() * 800;
            }

            // Update petals
            this._updatePetals(dt);

            this.animFrameId = requestAnimationFrame((t) => this._gameLoop(t));
        },

        _spawnPetal() {
            this.totalPetalsSpawned++;
            const rand = Math.random();
            let type, emoji, points;
            if (rand < 0.08) {
                type = 'rare'; emoji = '💮'; points = 3;
            } else if (rand < 0.22) {
                type = 'golden'; emoji = '⭐'; points = 2;
            } else {
                type = 'normal'; emoji = '🌸'; points = 1;
            }

            const el = document.createElement('div');
            el.className = 'cf-petal' + (type !== 'normal' ? ' ' + type : '');
            el.textContent = emoji;

            const x = 8 + Math.random() * 84; // percentage
            el.style.left = x + '%';
            el.style.top = '-30px';

            this.els.gameArea.appendChild(el);

            const speed = 80 + Math.random() * 60; // pixels per second
            const wobbleAmp = 15 + Math.random() * 20;
            const wobbleFreq = 1 + Math.random() * 2;

            this.petals.push({
                el, x, y: -30, speed, type, emoji, points,
                wobbleAmp, wobbleFreq, wobblePhase: Math.random() * Math.PI * 2,
                alive: true, caught: false
            });
        },

        _updatePetals(dt) {
            const rect = this.gameAreaRect;
            if (!rect) return;
            const basketLeft = (this.basketX / 100) * rect.width - 45;
            const basketRight = (this.basketX / 100) * rect.width + 45;
            const basketTop = rect.height - 60;

            for (let i = this.petals.length - 1; i >= 0; i--) {
                const p = this.petals[i];
                if (!p.alive) continue;

                p.y += p.speed * (dt / 1000);
                p.wobblePhase += dt / 1000 * p.wobbleFreq;
                const wobbleX = Math.sin(p.wobblePhase) * p.wobbleAmp;

                const pxX = (p.x / 100) * rect.width + wobbleX;
                p.el.style.top = p.y + 'px';
                p.el.style.left = pxX + 'px';

                // Collision with basket
                if (p.y >= basketTop && p.y <= rect.height &&
                    pxX >= basketLeft && pxX <= basketRight && !p.caught) {
                    p.caught = true;
                    p.alive = false;
                    this._catchPetal(p, pxX);
                }

                // Off screen
                if (p.y > rect.height + 30) {
                    p.alive = false;
                    p.el.remove();
                    this.petals.splice(i, 1);
                }
            }
        },

        _catchPetal(p, pxX) {
            this.score += p.points;
            this.els.scoreEl.textContent = this.score;

            // Bounce basket
            this.els.basket.classList.remove('bounce');
            void this.els.basket.offsetWidth;
            this.els.basket.classList.add('bounce');

            // Score popup
            const pop = document.createElement('div');
            pop.className = 'cf-score-pop';
            pop.textContent = '+' + p.points;
            pop.style.left = pxX + 'px';
            pop.style.top = (p.y - 20) + 'px';
            this.els.gameArea.appendChild(pop);
            setTimeout(() => pop.remove(), 800);

            // Catch particles
            for (let i = 0; i < 4; i++) {
                const part = document.createElement('div');
                part.className = 'cf-catch-particle';
                part.textContent = p.emoji;
                part.style.left = pxX + 'px';
                part.style.top = p.y + 'px';
                const angle = (Math.PI * 2 / 4) * i;
                part.style.setProperty('--dx', Math.cos(angle) * 30 + 'px');
                part.style.setProperty('--dy', Math.sin(angle) * 30 + 'px');
                this.els.gameArea.appendChild(part);
                setTimeout(() => part.remove(), 600);
            }

            // Caught animation
            p.el.classList.add('caught');
            setTimeout(() => {
                p.el.remove();
            }, 300);

            try { GameAudio.playSFX('catch'); } catch(e) {}

            // Check win
            if (this.score >= this.goal) {
                this._endGame(true);
            }
        },

        _endGame(won) {
            this.gameActive = false;
            if (this.timerInterval) clearInterval(this.timerInterval);
            if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

            setTimeout(() => {
                const overlay = document.createElement('div');
                overlay.className = 'cf-result-overlay';

                if (won) {
                    overlay.innerHTML = `
                        <div class="cf-result-text">
                            Tuyệt vời! 🌸<br><br>
                            Bạn đã hứng được<br>${this.score} bông hoa!
                        </div>
                    `;
                    this.els.wrap.appendChild(overlay);
                    try { Game.showParticles('hearts', 15); } catch(e) {}
                    try { Game.showParticles('petals', 10); } catch(e) {}
                    setTimeout(() => {
                        if (this.onComplete) this.onComplete();
                    }, 2000);
                } else {
                    this.failures++;
                    let btns = `<button class="cf-btn cf-btn-retry">🔄 Thử lại</button>`;
                    if (this.failures >= 3) {
                        btns += `<button class="cf-btn cf-btn-skip cf-btn-skip-style" style="background:#95a5a6;box-shadow:0 4px 0 #7f8c8d;font-size:9px;margin-top:8px;">Bỏ qua ▶</button>`;
                    }
                    overlay.innerHTML = `
                        <div class="cf-result-text">
                            Thử lại nhé! 💕<br><br>
                            Bạn hứng được ${this.score}/${this.goal}
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                            ${btns}
                        </div>
                    `;
                    this.els.wrap.appendChild(overlay);
                    overlay.querySelector('.cf-btn-retry').addEventListener('click', () => {
                        overlay.remove();
                        this.start();
                    });
                    const skipBtn = overlay.querySelector('.cf-btn-skip-style');
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
            if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

            const area = this.els.wrap;
            if (area) {
                area.removeEventListener('touchstart', this._onTouchStart);
                area.removeEventListener('touchmove', this._onTouchMove);
                area.removeEventListener('touchend', this._onTouchEnd);
                area.removeEventListener('mousemove', this._onMouseMove);
            }
            window.removeEventListener('resize', this._onResize);

            const style = document.getElementById('catchflower-styles');
            if (style) style.remove();

            this.petals = [];
            this.els = {};
        }
    };

    Game.registerMiniGame('catchFlower', game);
})();
