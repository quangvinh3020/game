/**
 * Title Screen Scene — "HÀNH TRÌNH CỦA CHÚNG MÌNH"
 * Opening screen with animated pixel art, floating hearts, and start button.
 */
(function() {
    let animationInterval = null;
    let sparkleInterval = null;
    let soundEnabled = true;

    const scene = {
        init() {
            const container = document.getElementById('scene-title');
            const days = Game.getDaysTogether();

            container.innerHTML = `
                <style>
                    #scene-title .title-bg {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, #ff6b9d 0%, #c44dff 40%, #6e3aff 70%, #ff6bb5 100%);
                        background-size: 400% 400%;
                        animation: titleGradient 8s ease infinite;
                        overflow: hidden;
                    }
                    @keyframes titleGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    #scene-title .title-content {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        padding: 20px;
                        text-align: center;
                    }

                    #scene-title .game-title {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 14px;
                        color: #fff;
                        text-shadow: 
                            0 0 10px rgba(255,255,255,0.8),
                            0 0 20px rgba(255,107,181,0.6),
                            2px 2px 0 #c44dff,
                            -1px -1px 0 #ff6bb5;
                        line-height: 1.8;
                        margin-bottom: 8px;
                        animation: titlePulse 3s ease-in-out infinite;
                        max-width: 320px;
                    }
                    @keyframes titlePulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.03); }
                    }

                    #scene-title .title-heart {
                        font-size: 32px;
                        margin: 8px 0;
                        animation: heartBeat 1.2s ease-in-out infinite;
                    }
                    @keyframes heartBeat {
                        0%, 100% { transform: scale(1); }
                        15% { transform: scale(1.3); }
                        30% { transform: scale(1); }
                        45% { transform: scale(1.2); }
                        60% { transform: scale(1); }
                    }

                    #scene-title .title-names {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 11px;
                        color: #ffeef5;
                        text-shadow: 1px 1px 0 #c44dff;
                        margin: 12px 0 6px;
                    }

                    #scene-title .title-stats {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 7px;
                        color: #ffd6e8;
                        line-height: 1.6;
                        margin-bottom: 30px;
                        opacity: 0.9;
                    }

                    #scene-title .title-btn-group {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        align-items: center;
                    }

                    #scene-title .start-btn {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 12px;
                        color: #fff;
                        background: linear-gradient(180deg, #ff6b9d, #e04580);
                        border: none;
                        padding: 14px 32px;
                        cursor: pointer;
                        box-shadow:
                            0 4px 0 #a52d5c,
                            0 0 15px rgba(255,107,157,0.5),
                            inset 0 1px 0 rgba(255,255,255,0.3);
                        image-rendering: pixelated;
                        transition: transform 0.1s, box-shadow 0.1s;
                        position: relative;
                        animation: btnGlow 2s ease-in-out infinite;
                    }
                    @keyframes btnGlow {
                        0%, 100% { box-shadow: 0 4px 0 #a52d5c, 0 0 15px rgba(255,107,157,0.5), inset 0 1px 0 rgba(255,255,255,0.3); }
                        50% { box-shadow: 0 4px 0 #a52d5c, 0 0 30px rgba(255,107,157,0.8), inset 0 1px 0 rgba(255,255,255,0.3); }
                    }
                    #scene-title .start-btn:active {
                        transform: translateY(2px);
                        box-shadow: 0 2px 0 #a52d5c, inset 0 1px 0 rgba(255,255,255,0.3);
                    }

                    #scene-title .continue-btn {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 9px;
                        color: #ffd6e8;
                        background: rgba(255,255,255,0.1);
                        border: 2px solid rgba(255,255,255,0.3);
                        padding: 10px 24px;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    #scene-title .continue-btn:active {
                        background: rgba(255,255,255,0.25);
                    }

                    #scene-title .sound-btn {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        z-index: 10;
                        font-size: 20px;
                        background: rgba(0,0,0,0.2);
                        border: none;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }

                    #scene-title .floating-heart {
                        position: absolute;
                        font-size: 16px;
                        opacity: 0;
                        animation: floatHeart 6s ease-in-out infinite;
                        pointer-events: none;
                        z-index: 1;
                    }
                    @keyframes floatHeart {
                        0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
                        10% { opacity: 0.8; }
                        90% { opacity: 0.6; }
                        100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
                    }

                    #scene-title .sparkle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #fff;
                        pointer-events: none;
                        z-index: 1;
                        animation: sparkleAnim 1.5s ease-in-out infinite;
                    }
                    @keyframes sparkleAnim {
                        0%, 100% { opacity: 0; transform: scale(0); }
                        50% { opacity: 1; transform: scale(1); }
                    }

                    #scene-title .pixel-ground {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 40px;
                        background: 
                            repeating-linear-gradient(
                                90deg,
                                rgba(255,255,255,0.05) 0px,
                                rgba(255,255,255,0.05) 8px,
                                transparent 8px,
                                transparent 16px
                            );
                        z-index: 1;
                    }

                    #scene-title .version-text {
                        position: absolute;
                        bottom: 8px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 6px;
                        color: rgba(255,255,255,0.3);
                        z-index: 5;
                    }
                </style>

                <div class="title-bg">
                    <!-- Floating hearts generated by JS -->
                    <div class="pixel-ground"></div>
                </div>

                <button class="sound-btn" id="title-sound-btn">🔊</button>

                <div class="title-content">
                    <div class="game-title">HÀNH TRÌNH<br>CỦA<br>CHÚNG MÌNH</div>
                    <div class="title-heart">💕</div>
                    <div class="title-names">Quang Vinh & Việt Nga</div>
                    <div class="title-stats">3 năm • ${days} ngày • ∞ kỷ niệm</div>
                    <div class="title-btn-group" id="title-btn-group">
                        <button class="start-btn" id="title-start-btn">▶ BẮT ĐẦU</button>
                    </div>
                </div>

                <div class="version-text">v1.0 — Made with ♥</div>
            `;

            // Generate floating hearts
            this._createFloatingHearts();

            // Event listeners
            document.getElementById('title-start-btn').addEventListener('click', function() {
                GameAudio.playSFX('click');
                Game.changeScene('intro');
            });

            document.getElementById('title-sound-btn').addEventListener('click', function() {
                soundEnabled = !soundEnabled;
                this.textContent = soundEnabled ? '🔊' : '🔇';
                if (soundEnabled) {
                    GameAudio.playBGM('title');
                } else {
                    GameAudio.stopBGM();
                }
            });
        },

        _createFloatingHearts() {
            const bg = document.querySelector('#scene-title .title-bg');
            if (!bg) return;
            const heartEmojis = ['❤️', '💕', '💗', '💖', '✨', '💜', '💛'];
            for (let i = 0; i < 12; i++) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = heartEmojis[i % heartEmojis.length];
                heart.style.left = (Math.random() * 90 + 5) + '%';
                heart.style.animationDelay = (Math.random() * 6) + 's';
                heart.style.animationDuration = (5 + Math.random() * 4) + 's';
                heart.style.fontSize = (12 + Math.random() * 14) + 'px';
                bg.appendChild(heart);
            }
        },

        _createSparkles() {
            const bg = document.querySelector('#scene-title .title-bg');
            if (!bg) return;
            sparkleInterval = setInterval(function() {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (Math.random() * 100) + '%';
                sparkle.style.top = (Math.random() * 100) + '%';
                sparkle.style.animationDelay = '0s';
                bg.appendChild(sparkle);
                setTimeout(function() {
                    if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
                }, 1500);
            }, 300);
        },

        enter() {
            Game.hideHUD();
            Game.showParticles('stars', 15);
            this._createSparkles();

            // Check for save data — show continue button if exists
            var savedData = null;
            try {
                savedData = localStorage.getItem('gameState');
            } catch(e) {
                savedData = null;
            }
            if (savedData) {
                var btnGroup = document.getElementById('title-btn-group');
                if (btnGroup && !document.getElementById('title-continue-btn')) {
                    var continueBtn = document.createElement('button');
                    continueBtn.className = 'continue-btn';
                    continueBtn.id = 'title-continue-btn';
                    continueBtn.textContent = '▶ TIẾP TỤC';
                    continueBtn.addEventListener('click', function() {
                        GameAudio.playSFX('click');
                        try {
                            var state = JSON.parse(savedData);
                            Object.assign(Game.state, state);
                            var target = Game.state.currentScene || 'intro';
                            if (target === 'title') target = 'intro';
                            Game.changeScene(target);
                        } catch(e) {
                            Game.changeScene('intro');
                        }
                    });
                    btnGroup.appendChild(continueBtn);
                }
            }
        },

        exit() {
            if (sparkleInterval) {
                clearInterval(sparkleInterval);
                sparkleInterval = null;
            }
            GameParticles.clear();
            // Remove continue button on exit so it re-evaluates on re-enter
            var continueBtn = document.getElementById('title-continue-btn');
            if (continueBtn && continueBtn.parentNode) {
                continueBtn.parentNode.removeChild(continueBtn);
            }
        }
    };

    Game.registerScene('title', scene);
})();
