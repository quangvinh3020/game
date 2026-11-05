/**
 * Intro Scene — Pixel art bedroom with waking up animation.
 * Player taps a glowing letter to begin the adventure.
 */
(function() {
    let glowInterval = null;

    const scene = {
        init() {
            const container = document.getElementById('scene-intro');

            container.innerHTML = `
                <style>
                    #scene-intro .bedroom-bg {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(180deg, #ffe8d6 0%, #ffd6ba 40%, #e8c4a8 100%);
                        overflow: hidden;
                    }

                    /* ---- Wall decor ---- */
                    #scene-intro .wall-pattern {
                        position: absolute;
                        inset: 0;
                        background:
                            repeating-linear-gradient(
                                90deg,
                                transparent 0px,
                                transparent 30px,
                                rgba(200,160,120,0.08) 30px,
                                rgba(200,160,120,0.08) 32px
                            ),
                            repeating-linear-gradient(
                                0deg,
                                transparent 0px,
                                transparent 30px,
                                rgba(200,160,120,0.06) 30px,
                                rgba(200,160,120,0.06) 32px
                            );
                    }

                    /* ---- Window ---- */
                    #scene-intro .window {
                        position: absolute;
                        top: 40px;
                        right: 30px;
                        width: 80px;
                        height: 90px;
                        background: linear-gradient(180deg, #87CEEB 0%, #b8e4f0 60%, #fff5c0 100%);
                        border: 6px solid #8B6F47;
                        box-shadow: inset 0 0 20px rgba(255,255,200,0.4);
                    }
                    #scene-intro .window::before {
                        content: '';
                        position: absolute;
                        left: 50%;
                        top: 0;
                        width: 4px;
                        height: 100%;
                        background: #8B6F47;
                        transform: translateX(-50%);
                    }
                    #scene-intro .window::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        height: 4px;
                        background: #8B6F47;
                        transform: translateY(-50%);
                    }
                    #scene-intro .sunlight {
                        position: absolute;
                        top: 40px;
                        right: 20px;
                        width: 120px;
                        height: 200px;
                        background: linear-gradient(180deg, rgba(255,255,200,0.4) 0%, rgba(255,255,200,0) 100%);
                        clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
                        animation: sunPulse 4s ease-in-out infinite;
                        pointer-events: none;
                    }
                    @keyframes sunPulse {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }

                    /* ---- Floor ---- */
                    #scene-intro .floor {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 35%;
                        background: linear-gradient(180deg, #c49a6c, #b08050);
                        background-size: 32px 32px;
                    }
                    #scene-intro .floor::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background:
                            repeating-linear-gradient(
                                90deg,
                                transparent 0px,
                                transparent 30px,
                                rgba(0,0,0,0.05) 30px,
                                rgba(0,0,0,0.05) 32px
                            );
                    }

                    /* ---- Bed ---- */
                    #scene-intro .bed {
                        position: absolute;
                        bottom: 35%;
                        left: 20px;
                        width: 150px;
                        height: 70px;
                    }
                    #scene-intro .bed-frame {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 30px;
                        background: #8B6F47;
                        border: 3px solid #6b5030;
                    }
                    #scene-intro .bed-mattress {
                        position: absolute;
                        bottom: 26px;
                        left: 4px;
                        right: 4px;
                        height: 20px;
                        background: #fff;
                        border: 2px solid #ddd;
                    }
                    #scene-intro .bed-blanket {
                        position: absolute;
                        bottom: 26px;
                        left: 4px;
                        right: 4px;
                        height: 28px;
                        background: linear-gradient(135deg, #ffb6c1, #ff69b4);
                        border: 2px solid #e0558f;
                        border-radius: 2px 2px 0 0;
                    }
                    #scene-intro .bed-pillow {
                        position: absolute;
                        bottom: 48px;
                        left: 10px;
                        width: 40px;
                        height: 18px;
                        background: #fff8f0;
                        border: 2px solid #ddd;
                        border-radius: 4px;
                    }
                    #scene-intro .bed-headboard {
                        position: absolute;
                        bottom: 26px;
                        left: -2px;
                        width: 10px;
                        height: 50px;
                        background: #6b5030;
                    }

                    /* ---- Character on bed ---- */
                    #scene-intro .character {
                        position: absolute;
                        bottom: 52px;
                        left: 50px;
                        font-size: 28px;
                        animation: wakeUp 3s ease-in-out forwards;
                        transform-origin: bottom center;
                    }
                    @keyframes wakeUp {
                        0% { transform: rotate(-90deg) translateY(10px); opacity: 0.7; }
                        40% { transform: rotate(-90deg) translateY(10px); opacity: 0.7; }
                        70% { transform: rotate(-30deg) translateY(0); opacity: 1; }
                        85% { transform: rotate(5deg); }
                        100% { transform: rotate(0deg); opacity: 1; }
                    }

                    /* ---- Desk ---- */
                    #scene-intro .desk {
                        position: absolute;
                        bottom: 35%;
                        right: 20px;
                        width: 100px;
                        height: 50px;
                    }
                    #scene-intro .desk-top {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: 8px;
                        background: #a07848;
                        border: 2px solid #806030;
                    }
                    #scene-intro .desk-leg-l {
                        position: absolute;
                        top: 8px;
                        left: 6px;
                        width: 8px;
                        height: 42px;
                        background: #8B6F47;
                    }
                    #scene-intro .desk-leg-r {
                        position: absolute;
                        top: 8px;
                        right: 6px;
                        width: 8px;
                        height: 42px;
                        background: #8B6F47;
                    }

                    /* ---- Glowing letter ---- */
                    #scene-intro .letter-item {
                        position: absolute;
                        top: -20px;
                        left: 30px;
                        font-size: 24px;
                        cursor: pointer;
                        animation: letterGlow 2s ease-in-out infinite;
                        filter: drop-shadow(0 0 8px rgba(255,200,50,0.8));
                        z-index: 5;
                    }
                    @keyframes letterGlow {
                        0%, 100% { 
                            transform: scale(1) translateY(0);
                            filter: drop-shadow(0 0 6px rgba(255,200,50,0.6));
                        }
                        50% { 
                            transform: scale(1.15) translateY(-4px);
                            filter: drop-shadow(0 0 14px rgba(255,200,50,1));
                        }
                    }

                    /* ---- Wall decoration ---- */
                    #scene-intro .wall-photo {
                        position: absolute;
                        top: 50px;
                        left: 40px;
                        width: 50px;
                        height: 40px;
                        background: linear-gradient(135deg, #ffb6c1, #ff69b4);
                        border: 4px solid #8B6F47;
                        box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
                    }
                    #scene-intro .wall-photo::after {
                        content: '❤️';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 16px;
                    }

                    /* ---- Rug ---- */
                    #scene-intro .rug {
                        position: absolute;
                        bottom: 10%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 120px;
                        height: 30px;
                        background: linear-gradient(90deg, #e8a0b0, #f0b8c8, #e8a0b0);
                        border-radius: 50%;
                        opacity: 0.6;
                    }

                    /* ---- Lamp ---- */
                    #scene-intro .lamp {
                        position: absolute;
                        top: 90px;
                        right: 140px;
                        font-size: 20px;
                    }

                    /* ---- Text overlay ---- */
                    #scene-intro .intro-overlay {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-end;
                        padding-bottom: 30px;
                        z-index: 10;
                        pointer-events: none;
                    }
                    #scene-intro .intro-hint {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 7px;
                        color: #8B6F47;
                        background: rgba(255,255,255,0.7);
                        padding: 6px 12px;
                        animation: hintBlink 2s ease-in-out infinite;
                        pointer-events: none;
                    }
                    @keyframes hintBlink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                    }

                    #scene-intro .next-btn {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #fff;
                        background: linear-gradient(180deg, #ff6b9d, #e04580);
                        border: none;
                        padding: 12px 24px;
                        cursor: pointer;
                        box-shadow: 0 3px 0 #a52d5c;
                        pointer-events: all;
                        display: none;
                        z-index: 20;
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        white-space: nowrap;
                    }
                    #scene-intro .next-btn:active {
                        transform: translateX(-50%) translateY(2px);
                        box-shadow: 0 1px 0 #a52d5c;
                    }

                    /* ---- Bookshelf ---- */
                    #scene-intro .bookshelf {
                        position: absolute;
                        top: 60px;
                        left: 180px;
                        width: 50px;
                        height: 60px;
                        background: #8B6F47;
                        border: 3px solid #6b5030;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        padding: 3px;
                    }
                    #scene-intro .book {
                        width: 100%;
                        height: 8px;
                        display: flex;
                        gap: 2px;
                    }
                    #scene-intro .book span {
                        flex: 1;
                        display: block;
                    }
                </style>

                <div class="bedroom-bg">
                    <div class="wall-pattern"></div>
                    <div class="sunlight"></div>

                    <div class="wall-photo"></div>
                    <div class="lamp">🪔</div>

                    <div class="bookshelf">
                        <div class="book">
                            <span style="background:#e74c3c"></span>
                            <span style="background:#3498db"></span>
                            <span style="background:#2ecc71"></span>
                        </div>
                        <div class="book">
                            <span style="background:#f39c12"></span>
                            <span style="background:#9b59b6"></span>
                        </div>
                        <div class="book">
                            <span style="background:#e74c3c"></span>
                            <span style="background:#1abc9c"></span>
                            <span style="background:#e67e22"></span>
                        </div>
                    </div>

                    <div class="window"></div>
                    <div class="floor"></div>
                    <div class="rug"></div>

                    <div class="bed">
                        <div class="bed-headboard"></div>
                        <div class="bed-frame"></div>
                        <div class="bed-mattress"></div>
                        <div class="bed-blanket"></div>
                        <div class="bed-pillow"></div>
                        <div class="character">👧</div>
                    </div>

                    <div class="desk">
                        <div class="desk-top"></div>
                        <div class="desk-leg-l"></div>
                        <div class="desk-leg-r"></div>
                        <div class="letter-item" id="intro-letter">💌</div>
                    </div>
                </div>

                <div class="intro-overlay">
                    <div class="intro-hint" id="intro-hint" style="display:none;">✨ Nhấn vào lá thư ✨</div>
                </div>

                <button class="next-btn" id="intro-next-btn">Bắt đầu hành trình →</button>
            `;

            // Letter tap handler
            document.getElementById('intro-letter').addEventListener('click', this._onLetterTap.bind(this));

            // Next button
            document.getElementById('intro-next-btn').addEventListener('click', function() {
                GameAudio.playSFX('click');
                Game.changeScene('zone1');
            });
        },

        _onLetterTap() {
            var letterEl = document.getElementById('intro-letter');
            if (!letterEl) return;
            // Disable further taps
            letterEl.style.pointerEvents = 'none';
            // Hide hint
            var hint = document.getElementById('intro-hint');
            if (hint) hint.style.display = 'none';

            GameAudio.playSFX('collect');
            Game.showParticles('hearts', 8);

            Game.showDialogue('intro', function() {
                Game.unlockLetter('letter1');
                Game.addLove(10);
                Game.updateHUD();
                // Show next button
                var nextBtn = document.getElementById('intro-next-btn');
                if (nextBtn) {
                    nextBtn.style.display = 'block';
                    nextBtn.classList.add('bounce');
                }
            });
        },

        enter() {
            Game.showHUD();
            GameAudio.playBGM('intro');

            // Reset character animation
            var char = document.querySelector('#scene-intro .character');
            if (char) {
                char.style.animation = 'none';
                void char.offsetHeight;
                char.style.animation = 'wakeUp 3s ease-in-out forwards';
            }

            // Show hint after intro dialogue delay
            setTimeout(function() {
                var hint = document.getElementById('intro-hint');
                if (hint) hint.style.display = 'block';
            }, 1500);

            // Re-enable letter if not already completed
            var letterEl = document.getElementById('intro-letter');
            if (letterEl && Game.state.lettersUnlocked.indexOf('letter1') === -1) {
                letterEl.style.pointerEvents = 'auto';
                letterEl.style.display = 'block';
            } else if (letterEl) {
                letterEl.style.display = 'none';
                // Show next button directly
                var nextBtn = document.getElementById('intro-next-btn');
                if (nextBtn) nextBtn.style.display = 'block';
            }
        },

        exit() {
            GameParticles.clear();
            var hint = document.getElementById('intro-hint');
            if (hint) hint.style.display = 'none';
        }
    };

    Game.registerScene('intro', scene);
})();
