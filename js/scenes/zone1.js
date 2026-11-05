/**
 * Zone 1: "Mùa Xuân Gặp Gỡ" — Cherry blossom park scene
 * Falling petals, flower path, mini game: catchFlower
 */
(function() {
    let petalInterval = null;

    const scene = {
        init() {
            const container = document.getElementById('scene-zone1');

            container.innerHTML = `
                <style>
                    #scene-zone1 .park-bg {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(180deg, #87CEEB 0%, #b5e8f7 30%, #90EE90 65%, #5cb85c 75%, #4a8c3f 100%);
                        overflow: hidden;
                    }

                    /* ---- Sun ---- */
                    #scene-zone1 .sun {
                        position: absolute;
                        top: 20px;
                        right: 40px;
                        width: 40px;
                        height: 40px;
                        background: #FFD700;
                        border-radius: 50%;
                        box-shadow: 0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3);
                    }

                    /* ---- Clouds ---- */
                    #scene-zone1 .cloud {
                        position: absolute;
                        background: rgba(255,255,255,0.8);
                        border-radius: 20px;
                        animation: cloudDrift 20s linear infinite;
                    }
                    #scene-zone1 .cloud1 { top: 30px; left: -60px; width: 70px; height: 24px; animation-duration: 25s; }
                    #scene-zone1 .cloud2 { top: 60px; left: -80px; width: 90px; height: 28px; animation-duration: 35s; animation-delay: 8s; }
                    #scene-zone1 .cloud3 { top: 15px; left: -50px; width: 55px; height: 20px; animation-duration: 30s; animation-delay: 15s; }
                    @keyframes cloudDrift {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(100vw + 150px)); }
                    }

                    /* ---- Cherry Blossom Trees ---- */
                    #scene-zone1 .tree {
                        position: absolute;
                        bottom: 35%;
                    }
                    #scene-zone1 .tree-trunk {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 14px;
                        height: 60px;
                        background: linear-gradient(90deg, #6b4423, #8B5E3C, #6b4423);
                    }
                    #scene-zone1 .tree-crown {
                        position: absolute;
                        bottom: 40px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 80px;
                        height: 70px;
                        background: radial-gradient(ellipse, #FFB7C5 30%, #FF69B4 60%, #FF1493 100%);
                        border-radius: 50%;
                        box-shadow: 
                            -20px 10px 0 -5px #FFB7C5,
                            20px 5px 0 -3px #FF69B4,
                            0px -10px 0 -5px #FFB7C5;
                    }
                    #scene-zone1 .tree1 { left: 20px; }
                    #scene-zone1 .tree2 { right: 10px; }
                    #scene-zone1 .tree2 .tree-crown { width: 90px; height: 80px; }
                    #scene-zone1 .tree3 { left: 50%; transform: translateX(-50%); }
                    #scene-zone1 .tree3 .tree-trunk { height: 70px; }
                    #scene-zone1 .tree3 .tree-crown { width: 100px; height: 85px; bottom: 50px; }

                    /* ---- Grass / Ground ---- */
                    #scene-zone1 .ground {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 38%;
                        background: linear-gradient(180deg, #7ec850 0%, #5cb85c 30%, #4a8c3f 100%);
                    }

                    /* ---- Path ---- */
                    #scene-zone1 .path {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 60px;
                        height: 100%;
                        background: linear-gradient(180deg, #d4a76a, #c49a5c);
                        border-left: 3px solid #b08840;
                        border-right: 3px solid #b08840;
                    }

                    /* ---- Flowers on ground ---- */
                    #scene-zone1 .flower {
                        position: absolute;
                        font-size: 14px;
                        animation: flowerSway 3s ease-in-out infinite;
                    }
                    @keyframes flowerSway {
                        0%, 100% { transform: rotate(-5deg); }
                        50% { transform: rotate(5deg); }
                    }

                    /* ---- Falling Petals ---- */
                    #scene-zone1 .petal {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #FFB7C5;
                        border-radius: 50% 0 50% 50%;
                        opacity: 0.8;
                        animation: petalFall linear forwards;
                        pointer-events: none;
                        z-index: 5;
                    }
                    @keyframes petalFall {
                        0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0.9; }
                        25% { transform: translateY(25vh) rotate(90deg) translateX(20px); }
                        50% { transform: translateY(50vh) rotate(180deg) translateX(-15px); }
                        75% { transform: translateY(75vh) rotate(270deg) translateX(25px); }
                        100% { transform: translateY(105vh) rotate(360deg) translateX(10px); opacity: 0; }
                    }

                    /* ---- Zone title ---- */
                    #scene-zone1 .zone-title {
                        position: absolute;
                        top: 15px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #fff;
                        text-shadow: 2px 2px 0 #FF69B4, -1px -1px 0 #FF1493;
                        z-index: 10;
                        text-align: center;
                        white-space: nowrap;
                    }
                    #scene-zone1 .zone-subtitle {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 7px;
                        color: #FFB7C5;
                        margin-top: 6px;
                    }

                    /* ---- Characters ---- */
                    #scene-zone1 .characters {
                        position: absolute;
                        bottom: 40%;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 28px;
                        z-index: 8;
                        display: flex;
                        gap: 6px;
                        animation: charWalk 2s ease-in-out infinite;
                    }
                    @keyframes charWalk {
                        0%, 100% { transform: translateX(-50%) translateY(0); }
                        50% { transform: translateX(-50%) translateY(-4px); }
                    }

                    /* ---- Butterfly ---- */
                    #scene-zone1 .butterfly {
                        position: absolute;
                        top: 30%;
                        right: 20%;
                        font-size: 16px;
                        animation: butterflyFly 8s ease-in-out infinite;
                        z-index: 6;
                    }
                    @keyframes butterflyFly {
                        0%, 100% { transform: translate(0, 0); }
                        25% { transform: translate(-30px, -20px); }
                        50% { transform: translate(-60px, 10px); }
                        75% { transform: translate(-20px, -15px); }
                    }

                    #scene-zone1 .next-btn {
                        font-family: 'Press Start 2P', cursive;
                        font-size: 10px;
                        color: #fff;
                        background: linear-gradient(180deg, #FF69B4, #e04580);
                        border: none;
                        padding: 12px 24px;
                        cursor: pointer;
                        box-shadow: 0 3px 0 #a52d5c;
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 20;
                        display: none;
                        white-space: nowrap;
                    }
                    #scene-zone1 .next-btn:active {
                        transform: translateX(-50%) translateY(2px);
                        box-shadow: 0 1px 0 #a52d5c;
                    }
                </style>

                <div class="park-bg">
                    <div class="sun"></div>
                    <div class="cloud cloud1"></div>
                    <div class="cloud cloud2"></div>
                    <div class="cloud cloud3"></div>

                    <div class="tree tree1">
                        <div class="tree-crown"></div>
                        <div class="tree-trunk"></div>
                    </div>
                    <div class="tree tree2">
                        <div class="tree-crown"></div>
                        <div class="tree-trunk"></div>
                    </div>
                    <div class="tree tree3">
                        <div class="tree-crown"></div>
                        <div class="tree-trunk"></div>
                    </div>

                    <div class="ground">
                        <div class="path"></div>
                    </div>

                    <div class="flower" style="bottom:38%;left:15%;">🌸</div>
                    <div class="flower" style="bottom:36%;left:25%;animation-delay:0.5s;">🌷</div>
                    <div class="flower" style="bottom:39%;right:18%;animation-delay:1s;">🌺</div>
                    <div class="flower" style="bottom:37%;right:30%;animation-delay:1.5s;">🌻</div>
                    <div class="flower" style="bottom:35%;left:40%;animation-delay:0.8s;">🌼</div>
                    <div class="flower" style="bottom:40%;right:40%;animation-delay:1.2s;">🌸</div>

                    <div class="butterfly">🦋</div>

                    <div class="characters">
                        <span>👦</span><span>👧</span>
                    </div>
                </div>

                <div class="zone-title">
                    🌸 Mùa Xuân Gặp Gỡ
                    <div class="zone-subtitle">Zone 1</div>
                </div>

                <button class="next-btn" id="zone1-next-btn">Tiếp tục →</button>
            `;

            document.getElementById('zone1-next-btn').addEventListener('click', function() {
                GameAudio.playSFX('click');
                Game.changeScene('zone2');
            });
        },

        _spawnPetals() {
            var bg = document.querySelector('#scene-zone1 .park-bg');
            if (!bg) return;
            petalInterval = setInterval(function() {
                var petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = (Math.random() * 100) + '%';
                petal.style.animationDuration = (4 + Math.random() * 4) + 's';
                var colors = ['#FFB7C5', '#FF69B4', '#FFC0CB', '#FFD1DC'];
                petal.style.background = colors[Math.floor(Math.random() * colors.length)];
                petal.style.width = (5 + Math.random() * 6) + 'px';
                petal.style.height = petal.style.width;
                bg.appendChild(petal);
                setTimeout(function() {
                    if (petal.parentNode) petal.parentNode.removeChild(petal);
                }, 8000);
            }, 400);
        },

        enter() {
            Game.state.currentZone = 1;
            Game.showHUD();
            Game.updateHUD();
            GameAudio.playBGM('zone1');
            this._spawnPetals();
            Game.showParticles('petals', 10);

            var nextBtn = document.getElementById('zone1-next-btn');
            if (nextBtn) nextBtn.style.display = 'none';

            // Check if already completed
            if (Game.state.miniGamesCompleted.indexOf('catchFlower') !== -1) {
                if (nextBtn) nextBtn.style.display = 'block';
                return;
            }

            Game.showDialogue('zone1', function() {
                Game.startMiniGame('catchFlower', function() {
                    Game.showDialogue('zone1_complete', function() {
                        Game.unlockLetter('letter2');
                        Game.addItem('strawberry');
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
            if (petalInterval) {
                clearInterval(petalInterval);
                petalInterval = null;
            }
            GameParticles.clear();
        }
    };

    Game.registerScene('zone1', scene);
})();
