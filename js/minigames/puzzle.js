/**
 * Mini Game: Ký Ức Đà Lạt 🧩 — Sliding Puzzle
 * 3x3 sliding puzzle with a Đà Lạt themed pixel art scene.
 * Goal: Arrange all tiles in correct order.
 */
(function() {
    const TILES = [
        { id: 1, emoji: '☁️', label: '1', bg: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 100%)' },
        { id: 2, emoji: '☀️', label: '2', bg: 'linear-gradient(180deg, #87CEEB 0%, #FFE4A0 100%)' },
        { id: 3, emoji: '☁️', label: '3', bg: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 100%)' },
        { id: 4, emoji: '🌲', label: '4', bg: 'linear-gradient(180deg, #6AB04C 0%, #2E8B57 100%)' },
        { id: 5, emoji: '🏠', label: '5', bg: 'linear-gradient(180deg, #78E08F 0%, #6AB04C 100%)' },
        { id: 6, emoji: '🌲', label: '6', bg: 'linear-gradient(180deg, #6AB04C 0%, #2E8B57 100%)' },
        { id: 7, emoji: '🌻', label: '7', bg: 'linear-gradient(180deg, #F9CA24 0%, #F0932B 100%)' },
        { id: 8, emoji: '🛤️', label: '8', bg: 'linear-gradient(180deg, #DEB887 0%, #D2691E 100%)' }
    ];

    const game = {
        container: null,
        onComplete: null,
        board: [], // array of 9, index = position, value = tile id (0 = empty)
        emptyPos: 8,
        moves: 0,
        solved: false,
        els: {},
        _onTileClick: null,

        init(container, onComplete) {
            this.container = container;
            this.onComplete = onComplete;
            this._buildDOM();
        },

        _buildDOM() {
            const style = document.createElement('style');
            style.id = 'puzzle-styles';
            style.textContent = `
                .pz-wrap {
                    width: 100%; height: 100%;
                    background: linear-gradient(180deg, #E8F6FF 0%, #FFF8E1 100%);
                    display: flex; flex-direction: column;
                    font-family: 'Press Start 2P', monospace;
                    user-select: none; -webkit-user-select: none;
                    overflow-y: auto;
                }
                .pz-header {
                    padding: 12px 8px 8px;
                    text-align: center;
                }
                .pz-title {
                    font-size: 13px; color: #2C3E50;
                    margin-bottom: 8px;
                    text-shadow: 1px 1px 0 #fff;
                }
                .pz-stats {
                    display: flex; justify-content: center; gap: 16px;
                    font-size: 10px; color: #E84393;
                    align-items: center;
                }
                .pz-hint-btn, .pz-shuffle-btn {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 8px; padding: 6px 12px;
                    background: #F9CA24; color: #2C3E50;
                    border: none; cursor: pointer;
                    box-shadow: 2px 2px 0 #E67E22;
                    min-height: 30px;
                }
                .pz-hint-btn:active, .pz-shuffle-btn:active {
                    transform: translateY(1px);
                    box-shadow: 1px 1px 0 #E67E22;
                }
                .pz-board-area {
                    flex: 1; display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    padding: 8px;
                    gap: 12px;
                }
                .pz-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 4px;
                    width: min(85vw, 300px);
                    height: min(85vw, 300px);
                    background: #2C3E50;
                    padding: 4px;
                    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
                }
                .pz-tile {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    cursor: pointer;
                    font-size: 28px;
                    position: relative;
                    transition: transform 0.15s ease;
                    box-shadow: inset 0 0 0 2px rgba(255,255,255,0.3);
                }
                .pz-tile:active {
                    transform: scale(0.95);
                }
                .pz-tile-empty {
                    background: #1a252f !important;
                    cursor: default;
                    box-shadow: none;
                }
                .pz-tile-label {
                    font-size: 8px; color: rgba(255,255,255,0.8);
                    position: absolute; top: 4px; left: 6px;
                    text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
                }
                .pz-tile-hint {
                    animation: pz-hint-flash 0.6s ease 2;
                }
                @keyframes pz-hint-flash {
                    0%,100% { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.3); }
                    50% { box-shadow: inset 0 0 0 3px #F9CA24, 0 0 10px #F9CA24; }
                }
                .pz-ref {
                    display: flex; gap: 2px;
                    padding: 4px;
                    background: rgba(44,62,80,0.1);
                }
                .pz-ref-tile {
                    width: 28px; height: 28px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 14px;
                    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2);
                }
                .pz-ref-label { font-size: 5px; color: #666; }
                .pz-bottom {
                    padding: 8px;
                    display: flex; flex-direction: column;
                    align-items: center; gap: 8px;
                }
                .pz-ref-title {
                    font-size: 8px; color: #666;
                    margin-bottom: 4px;
                }
                .pz-result-overlay {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    background: rgba(232,246,255,0.95);
                    z-index: 10; gap: 16px;
                }
                .pz-result-text {
                    font-size: 16px; color: #2C3E50;
                    text-align: center;
                    text-shadow: 2px 2px 0 #fff;
                    line-height: 1.8;
                }
                .pz-complete-scene {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    width: min(70vw, 240px);
                    height: min(70vw, 240px);
                    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
                    animation: pz-complete-glow 1s ease infinite alternate;
                }
                @keyframes pz-complete-glow {
                    0% { box-shadow: 4px 4px 0 rgba(0,0,0,0.3), 0 0 0 rgba(249,202,36,0); }
                    100% { box-shadow: 4px 4px 0 rgba(0,0,0,0.3), 0 0 20px rgba(249,202,36,0.5); }
                }
                .pz-complete-tile {
                    display: flex; align-items: center; justify-content: center;
                    font-size: 28px;
                }
            `;
            this.container.appendChild(style);

            const wrap = document.createElement('div');
            wrap.className = 'pz-wrap';
            wrap.style.position = 'relative';
            wrap.innerHTML = `
                <div class="pz-header">
                    <div class="pz-title">🧩 Ký Ức Đà Lạt 🧩</div>
                    <div class="pz-stats">
                        <span>Bước: <span class="pz-moves">0</span></span>
                        <button class="pz-hint-btn">💡 Gợi ý</button>
                    </div>
                </div>
                <div class="pz-board-area">
                    <div class="pz-grid"></div>
                    <div class="pz-bottom">
                        <div class="pz-ref-title">🖼️ Hình mẫu:</div>
                        <div class="pz-ref"></div>
                        <button class="pz-shuffle-btn">🔄 Trộn lại</button>
                    </div>
                </div>
            `;
            this.container.appendChild(wrap);

            this.els.wrap = wrap;
            this.els.movesEl = wrap.querySelector('.pz-moves');
            this.els.grid = wrap.querySelector('.pz-grid');
            this.els.ref = wrap.querySelector('.pz-ref');
            this.els.hintBtn = wrap.querySelector('.pz-hint-btn');
            this.els.shuffleBtn = wrap.querySelector('.pz-shuffle-btn');

            // Build reference image
            this.els.ref.innerHTML = `
                <div style="width: 80px; height: 80px; background: url('asset/photos/datlat.jpg') center/cover no-repeat; border: 2px solid #2C3E50; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
            `;

            // Event handlers
            this.els.hintBtn.addEventListener('click', () => this._showHint());
            this.els.shuffleBtn.addEventListener('click', () => this.start());

            this._onTileClick = (e) => {
                const tile = e.target.closest('.pz-tile');
                if (!tile || this.solved) return;
                const pos = parseInt(tile.dataset.pos);
                this._tryMove(pos);
            };
            this.els.grid.addEventListener('click', this._onTileClick);
        },

        start() {
            this.solved = false;
            this.moves = 0;
            this.els.movesEl.textContent = '0';

            // Remove result overlay
            const overlay = this.els.wrap.querySelector('.pz-result-overlay');
            if (overlay) overlay.remove();

            // Initialize board: [1,2,3,4,5,6,7,8,0]
            this.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            this.emptyPos = 8;

            // Shuffle with solvable configuration
            this._shuffle();
            this._renderBoard();
        },

        _shuffle() {
            // Perform random valid moves to ensure solvability
            const directions = [-1, 1, -3, 3]; // left, right, up, down
            for (let i = 0; i < 200; i++) {
                const validMoves = [];
                const ep = this.emptyPos;
                const row = Math.floor(ep / 3);
                const col = ep % 3;

                if (col > 0) validMoves.push(ep - 1); // left neighbor
                if (col < 2) validMoves.push(ep + 1); // right neighbor
                if (row > 0) validMoves.push(ep - 3); // top neighbor
                if (row < 2) validMoves.push(ep + 3); // bottom neighbor

                const pick = validMoves[Math.floor(Math.random() * validMoves.length)];
                this.board[this.emptyPos] = this.board[pick];
                this.board[pick] = 0;
                this.emptyPos = pick;
            }

            // Make sure it's not already solved
            if (this._isSolved()) {
                // Do a few more moves
                const ep = this.emptyPos;
                const row = Math.floor(ep / 3);
                const col = ep % 3;
                if (col > 0) {
                    this.board[this.emptyPos] = this.board[ep - 1];
                    this.board[ep - 1] = 0;
                    this.emptyPos = ep - 1;
                } else {
                    this.board[this.emptyPos] = this.board[ep + 1];
                    this.board[ep + 1] = 0;
                    this.emptyPos = ep + 1;
                }
            }
        },

        _renderBoard() {
            this.els.grid.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const val = this.board[i];
                const tile = document.createElement('div');
                tile.className = 'pz-tile';
                tile.dataset.pos = i;

                if (val === 0) {
                    tile.classList.add('pz-tile-empty');
                } else {
                    const col = (val - 1) % 3;
                    const row = Math.floor((val - 1) / 3);
                    tile.style.backgroundImage = "url('asset/photos/datlat.jpg')";
                    tile.style.backgroundSize = "300% 300%";
                    tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
                    tile.style.backgroundRepeat = "no-repeat";
                    tile.innerHTML = `
                        <span class="pz-tile-label" style="background: rgba(0,0,0,0.65); color: #fff; padding: 2px 4px; border-radius: 2px;">${val}</span>
                    `;
                }
                this.els.grid.appendChild(tile);
            }
        },

        _tryMove(pos) {
            // Check if pos is adjacent to empty
            const ep = this.emptyPos;
            const posRow = Math.floor(pos / 3);
            const posCol = pos % 3;
            const epRow = Math.floor(ep / 3);
            const epCol = ep % 3;

            const isAdjacent = (Math.abs(posRow - epRow) + Math.abs(posCol - epCol)) === 1;
            if (!isAdjacent) return;

            // Swap
            this.board[ep] = this.board[pos];
            this.board[pos] = 0;
            this.emptyPos = pos;

            this.moves++;
            this.els.movesEl.textContent = this.moves;

            try { GameAudio.playSFX('slide'); } catch(e) {}

            this._renderBoard();

            // Check win
            if (this._isSolved()) {
                this.solved = true;
                this._onWin();
            }
        },

        _isSolved() {
            for (let i = 0; i < 8; i++) {
                if (this.board[i] !== i + 1) return false;
            }
            return this.board[8] === 0;
        },

        _showHint() {
            // Briefly show correct numbers flashing
            const tiles = this.els.grid.querySelectorAll('.pz-tile');
            tiles.forEach(t => {
                if (!t.classList.contains('pz-tile-empty')) {
                    t.classList.add('pz-tile-hint');
                    setTimeout(() => t.classList.remove('pz-tile-hint'), 1200);
                }
            });
        },

        _onWin() {
            try { GameAudio.playSFX('success'); } catch(e) {}

            setTimeout(() => {
                const overlay = document.createElement('div');
                overlay.className = 'pz-result-overlay';

                overlay.innerHTML = `
                    <div class="pz-result-text">
                        Đẹp quá! 🧩<br><br>
                        Kỷ niệm Đà Lạt 01/11/2023<br>
                        Hoàn thành trong ${this.moves} bước!
                    </div>
                    <div style="width: 220px; height: 220px; background: url('asset/photos/datlat.jpg') center/cover no-repeat; border: 4px solid #fff; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.6); margin: 15px auto;"></div>
                `;
                this.els.wrap.appendChild(overlay);

                try { Game.showParticles('confetti', 15); } catch(e) {}
                try { Game.showParticles('hearts', 8); } catch(e) {}

                setTimeout(() => {
                    if (this.onComplete) this.onComplete();
                }, 2000);
            }, 300);
        },

        destroy() {
            this.solved = true;
            if (this.els.grid) {
                this.els.grid.removeEventListener('click', this._onTileClick);
            }
            const style = document.getElementById('puzzle-styles');
            if (style) style.remove();
            this.els = {};
        }
    };

    Game.registerMiniGame('puzzle', game);
})();
