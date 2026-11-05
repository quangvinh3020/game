/**
 * Ending Scene — "Album Kỷ Niệm & Tri Ân" 🎆
 * Scrollable photo album, love letter reader, collection summary, and replay.
 */
(function() {
    const scene = {
        init() {
            const container = document.getElementById('scene-ending');
            const days = Game.getDaysTogether();

            container.innerHTML = `
                <style>
                    #scene-ending {
                        overflow-y: auto !important;
                        -webkit-overflow-scrolling: touch;
                        background: linear-gradient(180deg, #130f40 0%, #30336b 50%, #192a56 100%);
                    }

                    .ending-wrap {
                        padding: 30px 16px 80px 16px;
                        color: #fff;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 25px;
                    }

                    .ending-header h1 {
                        font-family: 'Press Start 2P', monospace;
                        font-size: 15px;
                        color: #ff7675;
                        text-shadow: 2px 2px #000;
                        margin-bottom: 8px;
                    }
                    .ending-header p {
                        font-family: 'VT323', monospace;
                        font-size: 20px;
                        color: #f6e58d;
                    }

                    /* Summary card */
                    .summary-card {
                        background: rgba(255, 255, 255, 0.08);
                        border: 3px solid #f8a5c2;
                        border-radius: 8px;
                        padding: 16px;
                        width: 100%;
                        max-width: 380px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    }
                    .summary-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                        margin-top: 12px;
                    }
                    .stat-box {
                        background: rgba(0,0,0,0.3);
                        padding: 10px;
                        border-radius: 6px;
                    }
                    .stat-num {
                        font-family: 'Press Start 2P', monospace;
                        font-size: 14px;
                        color: #ff9ff3;
                    }
                    .stat-lbl {
                        font-size: 12px;
                        color: #c7ecee;
                        margin-top: 4px;
                    }

                    /* Album Section */
                    .album-section {
                        width: 100%;
                        max-width: 380px;
                    }
                    .album-section h2 {
                        font-family: 'Press Start 2P', monospace;
                        font-size: 13px;
                        color: #74b9ff;
                        margin-bottom: 14px;
                        text-align: left;
                    }
                    .photo-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 14px;
                    }
                    .photo-card {
                        background: #fff;
                        color: #2c3e50;
                        padding: 8px 8px 14px 8px;
                        border-radius: 4px;
                        box-shadow: 0 6px 12px rgba(0,0,0,0.35);
                        transform: rotate(calc((var(--r, 0) * 1deg)));
                        cursor: pointer;
                        transition: transform 0.2s;
                    }
                    .photo-card:active {
                        transform: scale(0.96);
                    }
                    .photo-thumb {
                        width: 100%;
                        height: 100px;
                        background: #f1f2f6;
                        border-radius: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 38px;
                        overflow: hidden;
                    }
                    .photo-caption {
                        font-family: 'VT323', monospace;
                        font-size: 16px;
                        margin-top: 8px;
                        font-weight: bold;
                    }
                    .photo-date {
                        font-size: 10px;
                        color: #7f8c8d;
                    }

                    /* Letters Box */
                    .letters-section {
                        width: 100%;
                        max-width: 380px;
                    }
                    .letters-section h2 {
                        font-family: 'Press Start 2P', monospace;
                        font-size: 13px;
                        color: #fdcb6e;
                        margin-bottom: 14px;
                        text-align: left;
                    }
                    .letter-list {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .letter-item {
                        background: rgba(255, 234, 167, 0.15);
                        border: 2px dashed #ffeaa7;
                        border-radius: 6px;
                        padding: 12px 16px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                    }
                    .letter-item:active {
                        background: rgba(255, 234, 167, 0.3);
                    }
                    .letter-name {
                        font-family: 'VT323', monospace;
                        font-size: 18px;
                        color: #ffeaa7;
                    }

                    /* Ending Credits */
                    .credits-box {
                        font-family: 'VT323', monospace;
                        font-size: 18px;
                        line-height: 1.6;
                        color: #dcdde1;
                        border-top: 1px solid rgba(255,255,255,0.2);
                        padding-top: 20px;
                        width: 100%;
                    }
                </style>

                <div class="ending-wrap">
                    <div class="ending-header">
                        <h1>HÀNH TRÌNH CỦA CHÚNG MÌNH</h1>
                        <p>Quang Vinh ♥ Việt Nga</p>
                    </div>

                    <!-- Statistics -->
                    <div class="summary-card">
                        <div style="font-family: 'Press Start 2P'; font-size: 11px; color: #ffeaa7;">
                            💖 TỔNG KẾT 3 NĂM YÊU NHAU
                        </div>
                        <div class="summary-grid">
                            <div class="stat-box">
                                <div class="stat-num">${days}</div>
                                <div class="stat-lbl">Ngày bên nhau</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">4/4</div>
                                <div class="stat-lbl">Mini Game vượt qua</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">6</div>
                                <div class="stat-lbl">Lá thư tình</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">100%</div>
                                <div class="stat-lbl">Love Meter</div>
                            </div>
                        </div>
                    </div>

                    <!-- Photo Album -->
                    <div class="album-section">
                        <h2>📸 ALBUM KỶ NIỆM</h2>
                        <div class="photo-grid">
                            <div class="photo-card" style="--r: -2;" onclick="Game.viewPhoto('dalat')">
                                <div class="photo-thumb" style="background: url('asset/photos/landaudalat.jpg') center/cover no-repeat;"></div>
                                <div class="photo-caption">Lần Đầu Đi Đà Lạt</div>
                                <div class="photo-date">28/04/2023</div>
                            </div>
                            <div class="photo-card" style="--r: 2;" onclick="Game.viewPhoto('beach')">
                                <div class="photo-thumb" style="background: url('asset/photos/bien.jpg') center/cover no-repeat;"></div>
                                <div class="photo-caption">Biển Xanh Rì Rào</div>
                                <div class="photo-date">Mùa hè rực rỡ</div>
                            </div>
                            <div class="photo-card" style="--r: 1;" onclick="Game.viewPhoto('food')">
                                <div class="photo-thumb" style="background: url('asset/photos/quanan.jpg') center/cover no-repeat;"></div>
                                <div class="photo-caption">Góc Quán Quen</div>
                                <div class="photo-date">Những chiều tan ca</div>
                            </div>
                            <div class="photo-card" style="--r: -1;" onclick="Game.viewPhoto('future')">
                                <div class="photo-thumb" style="background: url('asset/photos/datlat.jpg') center/cover no-repeat;"></div>
                                <div class="photo-caption">Lời Hứa Tương Lai</div>
                                <div class="photo-date">Mãi mãi về sau</div>
                            </div>
                        </div>
                    </div>

                    <!-- Love Letters -->
                    <div class="letters-section">
                        <h2>💌 HỘP THƯ TÌNH</h2>
                        <div class="letter-list" id="ending-letter-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Voice message player button -->
                    <div style="width: 100%; max-width: 380px;">
                        <button class="pixel-btn" id="voice-msg-btn" style="width: 100%; background: #6c5ce7; font-size: 12px; padding: 14px;">
                            🔊 NGHE VOICE MESSAGE TÌNH YÊU
                        </button>
                    </div>

                    <!-- Credits -->
                    <div class="credits-box">
                        <p>💌 "Mỗi pixel trong trò chơi này đều chứa đựng tình yêu sâu đậm nhất của anh dành cho em."</p>
                        <p style="margin-top: 10px; color: #ff7675;">Quang Vinh & Việt Nga</p>
                        <p style="font-size: 14px; opacity: 0.7;">01/11/2023 — ♾️</p>
                    </div>

                    <button class="pixel-btn" id="ending-replay-btn" style="background: #e84393; font-size: 13px; padding: 14px 28px; margin-top: 10px;">
                        🎮 CHƠI LẠI TỪ ĐẦU
                    </button>
                </div>
            `;

            // Populate Letters
            const listEl = document.getElementById('ending-letter-list');
            if (listEl && window.GameData && window.GameData.letters) {
                listEl.innerHTML = '';
                window.GameData.letters.forEach(letter => {
                    const item = document.createElement('div');
                    item.className = 'letter-item';
                    item.innerHTML = `
                        <span class="letter-name">${letter.title}</span>
                        <span>💌</span>
                    `;
                    item.onclick = () => {
                        Game.readLetter(letter.id);
                    };
                    listEl.appendChild(item);
                });
            }

            // Voice message
            const voiceBtn = document.getElementById('voice-msg-btn');
            if (voiceBtn) {
                voiceBtn.onclick = () => {
                    if (window.GameAudio) {
                        window.GameAudio.playSynthSFX('success');
                        window.GameAudio.playSynthBGM('ending');
                    }
                    alert("🎙️ Quang Vinh: 'Cảm ơn em đã luôn là cô gái tuyệt vời nhất của anh. 3 năm qua hạnh phúc lắm, và anh muốn cùng em đi trọn cả cuộc đời này. Yêu em!' 💕");
                };
            }

            // Replay
            const replayBtn = document.getElementById('ending-replay-btn');
            if (replayBtn) {
                replayBtn.onclick = () => {
                    if (confirm("Em có muốn chơi lại từ đầu không? 💕")) {
                        Game.resetGameProgress();
                        Game.changeScene('title');
                    }
                };
            }
        },

        enter() {
            Game.hideHUD();
            GameAudio.playBGM('ending');
            if (window.GameParticles) {
                window.GameParticles.hearts(15, 3000);
            }
        },

        exit() {
            if (window.GameParticles) window.GameParticles.clear();
        }
    };

    Game.registerScene('ending', scene);
})();
