/**
 * Zone 5 Scene — "Lời Hứa Tương Lai" 💍 (THE PROPOSAL / CLIMAX)
 * The most emotional and magical scene: Night sky, fairy lights, proposal, fireworks explosion.
 */
(function() {
    let proposalStarted = false;

    const scene = {
        init() {
            const container = document.getElementById('scene-zone5');

            container.innerHTML = `
                <style>
                    #scene-zone5 .proposal-bg {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at 50% 30%, #2c1654 0%, #150a2c 60%, #070311 100%);
                        overflow: hidden;
                    }

                    /* Moon & Stars */
                    #scene-zone5 .moon {
                        position: absolute;
                        top: 30px;
                        right: 35px;
                        font-size: 50px;
                        filter: drop-shadow(0 0 25px rgba(255, 234, 167, 0.8));
                        animation: moonGlow 4s ease-in-out infinite alternate;
                        cursor: pointer;
                    }
                    @keyframes moonGlow {
                        from { transform: scale(1); filter: drop-shadow(0 0 20px #ffeaa7); }
                        to { transform: scale(1.08); filter: drop-shadow(0 0 35px #fff); }
                    }

                    /* Fairy lights string */
                    #scene-zone5 .fairy-lights {
                        position: absolute;
                        top: 20px;
                        left: 0;
                        right: 0;
                        display: flex;
                        justify-content: space-around;
                        padding: 0 10px;
                        z-index: 5;
                    }
                    #scene-zone5 .light-bulb {
                        font-size: 16px;
                        animation: lightBlink 1.5s ease-in-out infinite alternate;
                    }
                    #scene-zone5 .light-bulb:nth-child(2n) { animation-delay: 0.3s; color: #ff7675; }
                    #scene-zone5 .light-bulb:nth-child(3n) { animation-delay: 0.6s; color: #ffeaa7; }
                    #scene-zone5 .light-bulb:nth-child(4n) { animation-delay: 0.9s; color: #74b9ff; }
                    @keyframes lightBlink {
                        0% { opacity: 0.3; transform: scale(0.8); }
                        100% { opacity: 1; transform: scale(1.2); }
                    }

                    /* Romantic Garden Ground */
                    #scene-zone5 .flower-garden {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 40%;
                        background: linear-gradient(180deg, #1e3799 0%, #0c2461 40%, #071330 100%);
                        border-top: 4px solid #4a69bd;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        padding-top: 15px;
                        z-index: 6;
                    }
                    #scene-zone5 .garden-decor {
                        display: flex;
                        gap: 15px;
                        font-size: 22px;
                        margin-bottom: 15px;
                        opacity: 0.9;
                    }

                    /* Characters Area */
                    #scene-zone5 .proposal-stage {
                        position: absolute;
                        bottom: 135px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
                        gap: 40px;
                        z-index: 8;
                        width: 100%;
                    }
                    #scene-zone5 .actor-nga {
                        font-size: 48px;
                        filter: drop-shadow(0 0 15px rgba(255, 107, 157, 0.6));
                        animation: gentleHover 3s ease-in-out infinite alternate;
                    }
                    #scene-zone5 .actor-vinh {
                        font-size: 48px;
                        filter: drop-shadow(0 0 15px rgba(116, 185, 255, 0.6));
                        transition: all 1.5s ease;
                    }
                    #scene-zone5 .ring-box {
                        position: absolute;
                        left: 50%;
                        top: 20%;
                        transform: translate(-50%, -50%);
                        font-size: 45px;
                        animation: ringPulse 1.8s ease-in-out infinite;
                        filter: drop-shadow(0 0 20px #ffd700);
                        display: none;
                    }
                    @keyframes ringPulse {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); }
                        50% { transform: translate(-50%, -50%) scale(1.25); filter: drop-shadow(0 0 35px #fff); }
                    }

                    /* Big Celebrate Banner */
                    #scene-zone5 .forever-banner {
                        position: absolute;
                        top: 22%;
                        left: 10%;
                        right: 10%;
                        text-align: center;
                        background: rgba(20, 10, 35, 0.85);
                        border: 4px solid #ff7675;
                        padding: 16px;
                        border-radius: 8px;
                        box-shadow: 0 0 30px #ff7675;
                        z-index: 20;
                        display: none;
                        animation: bounce 1s ease infinite alternate;
                    }
                    #scene-zone5 .forever-banner h2 {
                        font-family: 'Press Start 2P', monospace;
                        font-size: 13px;
                        color: #ffeaa7;
                        margin-bottom: 8px;
                        line-height: 1.6;
                    }

                    #scene-zone5 .zone5-ui {
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

                <div class="proposal-bg">
                    <div class="moon" id="zone5-moon" title="Mặt trăng tình yêu">🌙</div>
                    <div class="fairy-lights">
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                        <span class="light-bulb">💡</span>
                    </div>

                    <div class="proposal-stage">
                        <div class="actor-nga" id="actor-nga">👩</div>
                        <div class="ring-box" id="zone5-ring">💍</div>
                        <div class="actor-vinh" id="actor-vinh">🧑</div>
                    </div>

                    <div class="flower-garden">
                        <div class="garden-decor">
                            <span>🌹</span><span>🌷</span><span>🌸</span><span>🌺</span><span>🌹</span><span>🌷</span>
                        </div>
                    </div>

                    <div class="forever-banner" id="forever-banner">
                        <h2>✨ 3 NĂM & MÃI MÃI VỀ SAU ✨</h2>
                        <p style="color: #fff; font-size: 14px; font-family: 'Press Start 2P'; margin-top: 10px;">QUANG VINH ♥ VIỆT NGA</p>
                    </div>

                    <div class="zone5-ui">
                        <button id="zone5-start-btn" class="pixel-btn pulse" style="font-size: 13px; padding: 14px 24px; background: #e84393;">
                            💍 LẮNG NGHE LỜI HỨA TƯƠNG LAI
                        </button>
                        <button id="zone5-finish-btn" class="pixel-btn" style="display: none; background: #2ed573; font-size: 13px; padding: 14px 26px;">
                            XEM ALBUM & KỶ NIỆM 📸 →
                        </button>
                    </div>
                </div>
            `;

            // Moon click sparkle
            const moon = document.getElementById('zone5-moon');
            if (moon) {
                moon.addEventListener('click', () => {
                    if (window.GameParticles) window.GameParticles.stars(15);
                });
            }

            // Start proposal button
            const startBtn = document.getElementById('zone5-start-btn');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    startBtn.style.display = 'none';
                    this.playProposalSequence();
                });
            }

            // Finish button to ending
            const finishBtn = document.getElementById('zone5-finish-btn');
            if (finishBtn) {
                finishBtn.addEventListener('click', () => {
                    Game.changeScene('ending');
                });
            }
        },

        enter() {
            Game.showHUD();
            Game.state.currentZone = 5;
            Game.updateHUD();
            GameAudio.playBGM('zone5');

            if (window.GameParticles) {
                window.GameParticles.stars(25);
            }

            setTimeout(() => {
                Game.showDialogue('zone5');
            }, 600);
        },

        playProposalSequence() {
            const vinh = document.getElementById('actor-vinh');
            const ring = document.getElementById('zone5-ring');

            // Vinh steps closer
            if (vinh) {
                vinh.style.transform = 'translateX(-20px)';
            }

            setTimeout(() => {
                if (ring) ring.style.display = 'block';
                if (window.GameAudio) window.GameAudio.playSynthSFX('success');

                // Trigger emotional proposal dialogue
                Game.showDialogue('zone5_proposal', () => {
                    this.onProposalAccepted();
                });
            }, 800);
        },

        onProposalAccepted() {
            // Flash screen
            if (window.GameTransition) window.GameTransition.flash(600);

            // Explosions of fireworks & hearts & confetti
            if (window.GameParticles) {
                window.GameParticles.fireworks(12);
                window.GameParticles.confetti(60, 4500);
                window.GameParticles.hearts(35, 3500);
            }

            // Banner
            const banner = document.getElementById('forever-banner');
            if (banner) banner.style.display = 'block';

            // Complete states
            Game.state.loveMeter = 100;
            Game.addItem('ring');
            Game.unlockLetter('letter6');
            Game.updateHUD();
            Game.saveGame();

            // Yes dialogue
            Game.showDialogue('zone5_yes', () => {
                const finishBtn = document.getElementById('zone5-finish-btn');
                if (finishBtn) {
                    finishBtn.style.display = 'block';
                    finishBtn.classList.add('bounce');
                }
            });
        },

        exit() {
            if (window.GameParticles) window.GameParticles.clear();
        }
    };

    Game.registerScene('zone5', scene);
})();
