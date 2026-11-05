/**
 * Zone 4 Scene — "Góc Nhỏ Của Hai Đứa" 🍜
 * Cozy restaurant / dining moments with glowing lanterns, steaming food, and cooking minigame.
 */
(function() {
    const scene = {
        init() {
            const container = document.getElementById('scene-zone4');

            container.innerHTML = `
                <style>
                    #scene-zone4 .restaurant-bg {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at 50% 60%, #4a2810 0%, #2b1406 60%, #150903 100%);
                        overflow: hidden;
                    }

                    /* Lanterns */
                    #scene-zone4 .lantern-row {
                        position: absolute;
                        top: 15px;
                        left: 0;
                        right: 0;
                        display: flex;
                        justify-content: space-around;
                        padding: 0 10px;
                        z-index: 5;
                    }
                    #scene-zone4 .lantern {
                        font-size: 32px;
                        animation: lanternSway 3s ease-in-out infinite alternate;
                        transform-origin: top center;
                        filter: drop-shadow(0 0 10px #ff7675);
                    }
                    #scene-zone4 .lantern:nth-child(2) {
                        animation-delay: 0.6s;
                    }
                    #scene-zone4 .lantern:nth-child(3) {
                        animation-delay: 1.2s;
                    }
                    @keyframes lanternSway {
                        from { transform: rotate(-6deg); }
                        to { transform: rotate(6deg); }
                    }

                    /* Window overlooking night street */
                    #scene-zone4 .window-night {
                        position: absolute;
                        top: 75px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 220px;
                        height: 120px;
                        background: linear-gradient(180deg, #1e272e 0%, #2f3542 60%, #000 100%);
                        border: 6px solid #8B5A2B;
                        box-shadow: inset 0 0 15px rgba(0,0,0,0.8), 0 0 20px rgba(255,234,167,0.2);
                        overflow: hidden;
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
                    }
                    #scene-zone4 .city-lights {
                        font-size: 14px;
                        opacity: 0.7;
                        letter-spacing: 4px;
                    }

                    /* Dining table */
                    #scene-zone4 .dining-area {
                        position: absolute;
                        bottom: 120px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        z-index: 6;
                    }
                    #scene-zone4 .couple-dining {
                        display: flex;
                        align-items: center;
                        gap: 25px;
                        font-size: 42px;
                    }
                    #scene-zone4 .table-surface {
                        width: 260px;
                        height: 50px;
                        background: #8B5A2B;
                        border-top: 5px solid #A0522D;
                        border-bottom: 5px solid #5C3317;
                        box-shadow: 0 8px 15px rgba(0,0,0,0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 15px;
                        font-size: 26px;
                        margin-top: -10px;
                    }

                    #scene-zone4 .zone4-ui {
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

                <div class="restaurant-bg">
                    <div class="lantern-row">
                        <span class="lantern">🏮</span>
                        <span class="lantern">🏮</span>
                        <span class="lantern">🏮</span>
                    </div>

                    <div class="window-night">
                        <div class="city-lights">✨ 🏢 ✨ 🏨 🌙 ✨</div>
                    </div>

                    <div class="dining-area">
                        <div class="couple-dining">
                            <span class="bounce">👩</span>
                            <span style="font-size: 28px; animation: pulse 1.5s infinite;">🍲</span>
                            <span class="bounce" style="animation-delay: 0.3s;">🧑</span>
                        </div>
                        <div class="table-surface">
                            <span>🍜</span>
                            <span>🥢</span>
                            <span>🧋</span>
                            <span>🥢</span>
                            <span>🥗</span>
                        </div>
                    </div>

                    <div class="zone4-ui">
                        <button id="zone4-game-btn" class="pixel-btn pulse" style="font-size: 13px; padding: 12px 20px; background: #e67e22;">
                            🍳 ĐẦU BẾP TÌNH YÊU
                        </button>
                        <button id="zone4-next-btn" class="pixel-btn" style="display: none; background: #6ab04c; font-size: 13px; padding: 12px 24px;">
                            TIẾP TỤC ĐẾN BẤT NGỜ CUỐI CÙNG 💍 →
                        </button>
                    </div>
                </div>
            `;

            // Setup Play Mini Game button
            const gameBtn = document.getElementById('zone4-game-btn');
            if (gameBtn) {
                gameBtn.addEventListener('click', () => {
                    Game.startMiniGame('cooking', () => {
                        this.onMiniGameComplete();
                    });
                });
            }

            // Setup Next Scene button
            const nextBtn = document.getElementById('zone4-next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    Game.changeScene('zone5');
                });
            }
        },

        enter() {
            Game.showHUD();
            Game.state.currentZone = 4;
            Game.updateHUD();
            GameAudio.playBGM('zone4');

            setTimeout(() => {
                Game.showDialogue('zone4');
            }, 500);

            if (Game.state.miniGamesCompleted.includes('cooking')) {
                const gameBtn = document.getElementById('zone4-game-btn');
                const nextBtn = document.getElementById('zone4-next-btn');
                if (gameBtn) gameBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'block';
            }
        },

        onMiniGameComplete() {
            Game.state.miniGamesCompleted.push('cooking');
            Game.addItem('letter');
            Game.unlockLetter('letter5');
            Game.addLove(20);
            Game.saveGame();

            const gameBtn = document.getElementById('zone4-game-btn');
            const nextBtn = document.getElementById('zone4-next-btn');
            if (gameBtn) gameBtn.style.display = 'none';

            Game.showDialogue('zone4_complete', () => {
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

    Game.registerScene('zone4', scene);
})();
