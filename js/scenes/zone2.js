/**
 * Zone 2: "Đà Lạt Mộng Mơ" — Misty pine hills, cafe, flower garden
 * Mini game: puzzle
 */
(function() {
    let fogInterval = null;

    const scene = {
        init() {
            const container = document.getElementById('scene-zone2');

            container.innerHTML = `
                <style>
                    #scene-zone2 .dalat-bg {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(180deg, #a8d8ea 0%, #c5dedd 20%, #8fbc8f 50%, #6b8e6b 70%, #4a6741 100%);
                        overflow: hidden;
                    }

                    /* ---- Misty fog layers ---- */
                    #scene-zone2 .fog {
                        position: absolute;
                        width: 200%;
                        height: 40px;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.2), transparent);
                        animation: fogDrift 15s linear infinite;
                        pointer-events: none;
                    }
                    #scene-zone2 .fog1 { top: 25%; animation-duration: 20s; opacity: 0.5; }
                    #scene-zone2 .fog2 { top: 35%; animation-duration: 25s; animation-delay: 5s; opacity: 0.3; }
                    #scene-zone2 .fog3 { top: 45%; animation-duration: 18s; animation-delay: 10s; opacity: 0.4; }
                    @keyframes fogDrift {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0%); }
                    }

                    /* ---- Hills ---- */
                    #scene-zone2 .hill-back {
                        position: absolute;
                        bottom: 40%;
                        left: -10%;
                        width: 120%;
                        height: 30%;
                        background: #6b8e6b;
                        border-radius: 50% 50% 0 0;
                    }
                    #scene-zone2 .hill-front {
                        position: absolute;
                        bottom: 30%;
                        left: -5%;
                        width: 110%;
                        height: 25%;
                        background: #5a7d5a;
                        border-radius: 40% 60% 0 0;
                    }

                    /* ---- Pine Trees (CSS triangles) ---- */
                    #scene-zone2 .pine {
                        position: absolute;
                        bottom: 45%;
                    }
                    #scene-zone2 .pine-top {
                        width: 0;
                        height: 0;
                        border-left: 18px solid transparent;
                        border-right: 18px solid transparent;
                        border-bottom: 30px solid #2d5a2d;
                        position: relative;
                    }
                    #scene-zone2 .pine-mid {
                        width: 0;
                        height: 0;
                        border-left: 22px solid transparent;
                        border-right: 22px solid transparent;
                        border-bottom: 28px solid #3a6b3a;
                        margin-top: -12px;
                        margin-left: -4px;
                    }
                    #scene-zone2 .pine-bottom {
                        width: 0;
                        height: 0;
                        border-left: 26px solid transparent;
                        border-right: 26px solid transparent;
                        border-bottom: 26px solid #4a7d4a;
                        margin-top: -10px;
                        margin-left: -8px;
                    }
                    #scene-zone2 .pine-trunk {
                        width: 8px;
                        height: 15px;
                        background: #5c3a1e;
                        margin: 0 auto;
                        margin-left: 14px;
                    }
                    #scene-zone2 .pine1 { left: 10%; }
                    #scene-zone2 .pine2 { left: 25%; bottom: 50%; }
                    #scene-zone2 .pine3 { right: 8%; }
                    #scene-zone2 .pine4 { right: 22%; bottom: 48%; }
                    #scene-zone2 .pine5 { left: 45%; bottom: 52%; }

                    /* ---- Ground ---- */
                    #scene-zone2 .ground {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 35%;
                        background: linear-gradient(180deg, #5a7d5a 0%, #4a6741 40%, #3d5a35 100%);
                    }

                    /* ---- Cafe Building ---- */
                    #scene-zone2 .cafe {
                        position: absolute;
                        bottom: 35%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 120px;
                        height: 80px;
                    }
                    #scene-zone2 .cafe-body {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 55px;
                        background: linear-gradient(180deg, #d4a76a, #c49a5c);
                        border: 3px solid #8B6F47;
                    }
                    #scene-zone2 .cafe-roof {
                        position: absolute;
                        bottom: 52px;
                        left: -10px;
                        width: 0;
                        height: 0;
                        border-left: 70px solid transparent;
                        border-right: 70px solid transparent;
                        border-bottom: 30px solid #8B4513;
                    }
                    #scene-zone2 .cafe-door {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 20px;
                        height: 30px;
                        background: #5c3a1e;
                        border: 2px solid #3d2510;
                    }
                    #scene-zone2 .cafe-window-l {
                        position: absolute;
                        bottom: 22px;
                        left: 12px;
                        width: 22px;
                        height: 18px;
                        background: #fffde0;
                        border: 2px solid #8B6F47;
                        box-shadow: inset 0 0 6px rgba(255,255,200,0.5);
                    }
                    #scene-zone2 .cafe-window-r {
                        position: absolute;
                        bottom: 22px;
                        right: 12px;
                        width: 22px;
                        height: 18px;
                        background: #fffde0;
                        border: 2px solid #8B6F47;
                        box-shadow: inset 0 0 6px rgba(255,255,200,0.5);
                    }
                    #scene-zone2 .cafe-sign {
                        position: absolute;
                        top: -18px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 5px;
                        color: #fff;
                        background: #8B4513;
                        padding: 3px 6px;
                        white-space: nowrap;
                    }
                    #scene-zone2 .cafe-smoke {
                        position: absolute;
                        top: -30px;
                        right: 20px;
                        font-size: 14px;
                        animation: smokeRise 3s ease-in-out infinite;
                        opacity: 0.5;
                    }
                    @keyframes smokeRise {
                        0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
                        50% { transform: translateY(-10px) scale(1.3); opacity: 0.2; }
                    }

                    /* ---- Flower garden ---- */
                    #scene-zone2 .flower-garden {
                        position: absolute;
                        bottom: 8%;
                        left: 10%;
                        right: 10%;
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    #scene-zone2 .garden-flower {
                        font-size: 16px;
                        animation: gardenSway 2.5s ease-in-out infinite;
                    }
                    @keyframes gardenSway {
                        0%, 100% { transform: rotate(-3deg) scale(1); }
                        50% { transform: rotate(3deg) scale(1.05); }
                    }

                    /* ---- Floating clouds ---- */
                    #scene-zone2 .cloud {
                        position: absolute;
                        background: rgba(255,255,255,0.7);
                        border-radius: 20px;
                        animation: cloudFloat 30s linear infinite;
                    }
                    #scene-zone2 .cl1 { top: 8%; left: -80px; width: 70px; height: 22px; animation-duration: 28s; }
                    #scene-zone2 .cl2 { top: 14%; left: -100px; width: 90px; height: 26px; animation-duration: 35s; animation-delay: 10s; }
                    @keyframes cloudFloat {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(100vw + 150px)); }
                    }

                    /* ---- Date display ---- */
                    #scene-zone2 .date-display {
                        position: absolute;
                        top: 50px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 8px;
                        color: #fff;
                        background: rgba(0,0,0,0.3);
                        padding: 6px 14px;
                        z-index: 10;
                        text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
                    }

                    /* ---- Zone title ---- */
                    #scene-zone2 .zone-title {
                        position: absolute;
                        top: 15px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #fff;
                        text-shadow: 2px 2px 0 #2d5a2d;
                        z-index: 10;
                        text-align: center;
                        white-space: nowrap;
                    }
                    #scene-zone2 .zone-subtitle {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 7px;
                        color: #c5e8c5;
                        margin-top: 6px;
                    }

                    /* ---- Characters ---- */
                    #scene-zone2 .characters {
                        position: absolute;
                        bottom: 36%;
                        left: 20%;
                        font-size: 26px;
                        z-index: 8;
                        display: flex;
                        gap: 4px;
                        animation: charBob 2s ease-in-out infinite;
                    }
                    @keyframes charBob {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-3px); }
                    }

                    #scene-zone2 .next-btn {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #fff;
                        background: linear-gradient(180deg, #5cb85c, #4a8c3f);
                        border: none;
                        padding: 12px 24px;
                        cursor: pointer;
                        box-shadow: 0 3px 0 #2d5a2d;
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 20;
                        display: none;
                        white-space: nowrap;
                    }
                    #scene-zone2 .next-btn:active {
                        transform: translateX(-50%) translateY(2px);
                        box-shadow: 0 1px 0 #2d5a2d;
                    }
                </style>

                <div class="dalat-bg">
                    <div class="cloud cl1"></div>
                    <div class="cloud cl2"></div>
                    <div class="fog fog1"></div>
                    <div class="fog fog2"></div>
                    <div class="fog fog3"></div>

                    <div class="hill-back"></div>

                    <div class="pine pine1">
                        <div class="pine-top"></div>
                        <div class="pine-mid"></div>
                        <div class="pine-bottom"></div>
                        <div class="pine-trunk"></div>
                    </div>
                    <div class="pine pine2">
                        <div class="pine-top"></div>
                        <div class="pine-mid"></div>
                        <div class="pine-bottom"></div>
                        <div class="pine-trunk"></div>
                    </div>
                    <div class="pine pine3">
                        <div class="pine-top"></div>
                        <div class="pine-mid"></div>
                        <div class="pine-bottom"></div>
                        <div class="pine-trunk"></div>
                    </div>
                    <div class="pine pine4">
                        <div class="pine-top"></div>
                        <div class="pine-mid"></div>
                        <div class="pine-bottom"></div>
                        <div class="pine-trunk"></div>
                    </div>
                    <div class="pine pine5">
                        <div class="pine-top"></div>
                        <div class="pine-mid"></div>
                        <div class="pine-bottom"></div>
                        <div class="pine-trunk"></div>
                    </div>

                    <div class="hill-front"></div>
                    <div class="ground"></div>

                    <div class="cafe">
                        <div class="cafe-roof"></div>
                        <div class="cafe-body">
                            <div class="cafe-window-l"></div>
                            <div class="cafe-window-r"></div>
                            <div class="cafe-door"></div>
                        </div>
                        <div class="cafe-sign">☕ CAFE</div>
                        <div class="cafe-smoke">☁️</div>
                    </div>

                    <div class="characters">
                        <span>👦</span><span>☕</span><span>👧</span>
                    </div>

                    <div class="flower-garden">
                        <span class="garden-flower" style="animation-delay:0s;">🌹</span>
                        <span class="garden-flower" style="animation-delay:0.3s;">🌻</span>
                        <span class="garden-flower" style="animation-delay:0.6s;">🌷</span>
                        <span class="garden-flower" style="animation-delay:0.9s;">🌺</span>
                        <span class="garden-flower" style="animation-delay:1.2s;">🌸</span>
                        <span class="garden-flower" style="animation-delay:0.4s;">💐</span>
                        <span class="garden-flower" style="animation-delay:0.7s;">🌼</span>
                        <span class="garden-flower" style="animation-delay:1s;">🌹</span>
                    </div>
                </div>

                <div class="zone-title">
                    🏔️ Đà Lạt Mộng Mơ
                    <div class="zone-subtitle">Zone 2</div>
                </div>
                <div class="date-display">📅 01/11/2023</div>

                <button class="next-btn" id="zone2-next-btn">Tiếp tục →</button>
            `;

            document.getElementById('zone2-next-btn').addEventListener('click', function() {
                GameAudio.playSFX('click');
                Game.changeScene('zone3');
            });
        },

        enter() {
            Game.state.currentZone = 2;
            Game.showHUD();
            Game.updateHUD();
            GameAudio.playBGM('zone2');

            var nextBtn = document.getElementById('zone2-next-btn');
            if (nextBtn) nextBtn.style.display = 'none';

            // Check if already completed
            if (Game.state.miniGamesCompleted.indexOf('puzzle') !== -1) {
                if (nextBtn) nextBtn.style.display = 'block';
                return;
            }

            Game.showDialogue('zone2', function() {
                Game.startMiniGame('puzzle', function() {
                    Game.showDialogue('zone2_complete', function() {
                        Game.unlockLetter('letter3');
                        Game.addItem('coffee');
                        Game.addLove(20);
                        Game.updateHUD();
                        Game.saveGame();
                        Game.showParticles('hearts', 10);
                        if (nextBtn) {
                            nextBtn.style.display = 'block';
                            nextBtn.classList.add('bounce');
                        }
                    });
                });
            });
        },

        exit() {
            GameParticles.clear();
        }
    };

    Game.registerScene('zone2', scene);
})();
