/**
 * Mini Game: Đầu Bếp Tình Yêu 🍳 — Recipe Matching Game
 * 3 rounds of selecting correct ingredients for Vietnamese dishes.
 * Goal: Complete all 3 recipes.
 */
(function() {
    const RECIPES = [
        {
            name: 'Phở Bò',
            emoji: '🍜',
            correct: [
                { emoji: '🍜', name: 'Bánh phở' },
                { emoji: '🥩', name: 'Thịt bò' },
                { emoji: '🌿', name: 'Rau thơm' },
                { emoji: '🍋', name: 'Chanh' }
            ],
            wrong: [
                { emoji: '🍕', name: 'Pizza' },
                { emoji: '🧀', name: 'Phô mai' },
                { emoji: '🍣', name: 'Sushi' },
                { emoji: '🌶️', name: 'Ớt' }
            ]
        },
        {
            name: 'Trà Sữa',
            emoji: '🧋',
            correct: [
                { emoji: '🫖', name: 'Trà' },
                { emoji: '🥛', name: 'Sữa' },
                { emoji: '🧊', name: 'Đá' },
                { emoji: '🫧', name: 'Trân châu' }
            ],
            wrong: [
                { emoji: '🍺', name: 'Bia' },
                { emoji: '🥤', name: 'Nước ngọt' },
                { emoji: '🍵', name: 'Matcha' },
                { emoji: '🧃', name: 'Nước ép' }
            ]
        },
        {
            name: 'Bánh Tráng Trộn',
            emoji: '🥗',
            correct: [
                { emoji: '🫓', name: 'Bánh tráng' },
                { emoji: '🥚', name: 'Trứng cút' },
                { emoji: '🥜', name: 'Đậu phộng' },
                { emoji: '🌶️', name: 'Tương ớt' }
            ],
            wrong: [
                { emoji: '🍞', name: 'Bánh mì' },
                { emoji: '🧈', name: 'Bơ' },
                { emoji: '🥓', name: 'Xông khói' },
                { emoji: '🫒', name: 'Ô liu' }
            ]
        }
    ];

    const game = {
        container: null,
        onComplete: null,
        currentRound: 0,
        selected: [], // selected ingredient indices in shuffled array
        shuffledIngredients: [],
        correctIndices: [], // indices in shuffled array that are correct
        els: {},

        init(container, onComplete) {
            this.container = container;
            this.onComplete = onComplete;
            this._buildDOM();
        },

        _buildDOM() {
            const style = document.createElement('style');
            style.id = 'cooking-styles';
            style.textContent = `
                .ck-wrap {
                    width: 100%; height: 100%;
                    background: linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%);
                    display: flex; flex-direction: column;
                    font-family: 'Press Start 2P', monospace;
                    position: relative; overflow-y: auto;
                    user-select: none; -webkit-user-select: none;
                }
                .ck-header {
                    padding: 12px 8px 8px;
                    text-align: center;
                }
                .ck-title {
                    font-size: 13px; color: #E84393;
                    margin-bottom: 8px;
                    text-shadow: 1px 1px 0 #fff;
                }
                .ck-round-info {
                    font-size: 10px; color: #2C3E50;
                }
                .ck-dish-area {
                    padding: 12px;
                    text-align: center;
                }
                .ck-dish-card {
                    background: rgba(255,255,255,0.8);
                    padding: 12px;
                    box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
                    display: inline-block;
                }
                .ck-dish-emoji {
                    font-size: 40px;
                    display: block; margin-bottom: 8px;
                }
                .ck-dish-name {
                    font-size: 12px; color: #2C3E50;
                    margin-bottom: 4px;
                }
                .ck-dish-hint {
                    font-size: 8px; color: #999;
                }
                .ck-ingredients-area {
                    padding: 8px 12px;
                    flex: 1;
                }
                .ck-ingredients-label {
                    font-size: 9px; color: #666;
                    margin-bottom: 8px;
                    text-align: center;
                }
                .ck-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                    max-width: 380px;
                    margin: 0 auto;
                }
                .ck-ingredient {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    padding: 10px 4px;
                    background: #fff;
                    box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
                    cursor: pointer;
                    min-height: 80px;
                    transition: transform 0.15s, box-shadow 0.15s;
                    position: relative;
                }
                .ck-ingredient:active { transform: scale(0.95); }
                .ck-ingredient.selected {
                    background: #E8F5E9;
                    box-shadow: 0 0 0 3px #6AB04C, 2px 2px 0 rgba(0,0,0,0.15);
                }
                .ck-ingredient.correct {
                    background: #C8E6C9;
                    animation: ck-bounce 0.4s ease;
                }
                .ck-ingredient.wrong {
                    background: #FFCDD2;
                    animation: ck-shake 0.4s ease;
                }
                @keyframes ck-bounce {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes ck-shake {
                    0%,100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    75% { transform: translateX(6px); }
                }
                .ck-ingredient-emoji {
                    font-size: 28px;
                    margin-bottom: 6px;
                }
                .ck-ingredient-name {
                    font-size: 6px; color: #666;
                    text-align: center;
                    line-height: 1.4;
                }
                .ck-selected-area {
                    padding: 8px 12px;
                    text-align: center;
                }
                .ck-selected-label {
                    font-size: 8px; color: #666;
                    margin-bottom: 8px;
                }
                .ck-selected-slots {
                    display: flex; justify-content: center; gap: 8px;
                }
                .ck-slot {
                    width: 44px; height: 44px;
                    border: 2px dashed #ccc;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 24px;
                    background: rgba(255,255,255,0.5);
                }
                .ck-slot.filled {
                    border-style: solid;
                    border-color: #6AB04C;
                    background: #E8F5E9;
                }
                .ck-cook-area {
                    padding: 12px;
                    text-align: center;
                }
                .ck-cook-btn {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 12px; padding: 14px 28px;
                    background: #E84393; color: #fff;
                    border: none; cursor: pointer;
                    box-shadow: 0 4px 0 #C0392B;
                    min-height: 44px;
                    transition: transform 0.1s;
                }
                .ck-cook-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #C0392B; }
                .ck-cook-btn:disabled {
                    background: #bbb;
                    box-shadow: 0 4px 0 #999;
                    cursor: default;
                }
                .ck-round-transition {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    background: rgba(255,248,225,0.95);
                    z-index: 10; gap: 12px;
                    animation: ck-fade-in 0.3s ease;
                }
                @keyframes ck-fade-in {
                    0% { opacity: 0; } 100% { opacity: 1; }
                }
                .ck-transition-emoji {
                    font-size: 60px;
                    animation: ck-big-bounce 0.6s ease infinite alternate;
                }
                @keyframes ck-big-bounce {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                }
                .ck-transition-text {
                    font-size: 14px; color: #E84393;
                    text-shadow: 1px 1px 0 #fff;
                    text-align: center;
                    line-height: 1.8;
                }
                .ck-result-overlay {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    background: rgba(255,248,225,0.95);
                    z-index: 10; gap: 16px;
                }
                .ck-result-text {
                    font-size: 16px; color: #E84393;
                    text-align: center;
                    text-shadow: 2px 2px 0 #fff;
                    line-height: 1.8;
                }
                .ck-pot {
                    font-size: 50px;
                    animation: ck-pot-bubble 0.5s ease infinite alternate;
                }
                @keyframes ck-pot-bubble {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-4px); }
                }
            `;
            this.container.appendChild(style);

            const wrap = document.createElement('div');
            wrap.className = 'ck-wrap';
            wrap.style.position = 'relative';
            wrap.innerHTML = `
                <div class="ck-header">
                    <div class="ck-title">🍳 Đầu Bếp Tình Yêu 🍳</div>
                    <div class="ck-round-info">Món <span class="ck-round-num">1</span>/3: <span class="ck-dish-title"></span></div>
                </div>
                <div class="ck-dish-area">
                    <div class="ck-dish-card">
                        <span class="ck-dish-emoji"></span>
                        <span class="ck-dish-name"></span>
                        <span class="ck-dish-hint">Chọn 4 nguyên liệu</span>
                    </div>
                </div>
                <div class="ck-ingredients-area">
                    <div class="ck-ingredients-label">Nguyên liệu:</div>
                    <div class="ck-grid"></div>
                </div>
                <div class="ck-selected-area">
                    <div class="ck-selected-label">Đã chọn:</div>
                    <div class="ck-selected-slots">
                        <div class="ck-slot"></div>
                        <div class="ck-slot"></div>
                        <div class="ck-slot"></div>
                        <div class="ck-slot"></div>
                    </div>
                </div>
                <div class="ck-cook-area">
                    <button class="ck-cook-btn" disabled>🍳 Nấu!</button>
                </div>
            `;
            this.container.appendChild(wrap);

            this.els.wrap = wrap;
            this.els.roundNum = wrap.querySelector('.ck-round-num');
            this.els.dishTitle = wrap.querySelector('.ck-dish-title');
            this.els.dishEmoji = wrap.querySelector('.ck-dish-emoji');
            this.els.dishName = wrap.querySelector('.ck-dish-name');
            this.els.grid = wrap.querySelector('.ck-grid');
            this.els.slots = wrap.querySelectorAll('.ck-slot');
            this.els.cookBtn = wrap.querySelector('.ck-cook-btn');

            // Cook button
            this.els.cookBtn.addEventListener('click', () => this._checkAnswer());
        },

        start() {
            this.currentRound = 0;
            // Remove any overlays
            this.els.wrap.querySelectorAll('.ck-round-transition, .ck-result-overlay').forEach(e => e.remove());
            this._setupRound();
        },

        _setupRound() {
            const recipe = RECIPES[this.currentRound];
            this.selected = [];

            // Update header
            this.els.roundNum.textContent = this.currentRound + 1;
            this.els.dishTitle.textContent = recipe.name + ' ' + recipe.emoji;
            this.els.dishEmoji.textContent = recipe.emoji;
            this.els.dishName.textContent = recipe.name;

            // Shuffle ingredients
            const allIngredients = [...recipe.correct, ...recipe.wrong].map((ing, i) => ({
                ...ing,
                isCorrect: i < recipe.correct.length
            }));
            this.shuffledIngredients = this._shuffleArray(allIngredients);

            // Build correct indices lookup
            this.correctIndices = [];
            this.shuffledIngredients.forEach((ing, i) => {
                if (ing.isCorrect) this.correctIndices.push(i);
            });

            // Render grid
            this.els.grid.innerHTML = '';
            this.shuffledIngredients.forEach((ing, i) => {
                const card = document.createElement('div');
                card.className = 'ck-ingredient';
                card.dataset.idx = i;
                card.innerHTML = `
                    <span class="ck-ingredient-emoji">${ing.emoji}</span>
                    <span class="ck-ingredient-name">${ing.name}</span>
                `;
                card.addEventListener('click', () => this._toggleIngredient(i, card));
                this.els.grid.appendChild(card);
            });

            // Reset slots
            this.els.slots.forEach(s => {
                s.textContent = '';
                s.classList.remove('filled');
            });

            // Reset cook button
            this.els.cookBtn.disabled = true;
        },

        _toggleIngredient(idx, card) {
            const selIdx = this.selected.indexOf(idx);
            if (selIdx !== -1) {
                // Deselect
                this.selected.splice(selIdx, 1);
                card.classList.remove('selected');
            } else {
                if (this.selected.length >= 4) return; // max 4
                this.selected.push(idx);
                card.classList.add('selected');
            }

            // Update slots
            this.els.slots.forEach((slot, i) => {
                if (i < this.selected.length) {
                    slot.textContent = this.shuffledIngredients[this.selected[i]].emoji;
                    slot.classList.add('filled');
                } else {
                    slot.textContent = '';
                    slot.classList.remove('filled');
                }
            });

            // Enable cook button when 4 selected
            this.els.cookBtn.disabled = this.selected.length !== 4;
        },

        _checkAnswer() {
            // Check if all selected are correct
            const allCorrect = this.selected.every(idx => this.shuffledIngredients[idx].isCorrect);

            const cards = this.els.grid.querySelectorAll('.ck-ingredient');

            if (allCorrect) {
                // Mark all correct
                this.selected.forEach(idx => {
                    cards[idx].classList.remove('selected');
                    cards[idx].classList.add('correct');
                });
                try { GameAudio.playSFX('correct'); } catch(e) {}

                // Disable further interaction
                this.els.cookBtn.disabled = true;

                setTimeout(() => {
                    try { GameAudio.playSFX('cooking'); } catch(e) {}
                    this._roundComplete();
                }, 800);
            } else {
                // Show wrong
                this.selected.forEach(idx => {
                    const ing = this.shuffledIngredients[idx];
                    cards[idx].classList.remove('selected');
                    if (!ing.isCorrect) {
                        cards[idx].classList.add('wrong');
                        setTimeout(() => cards[idx].classList.remove('wrong'), 500);
                    }
                });
                try { GameAudio.playSFX('wrong'); } catch(e) {}

                // Clear selection after shake
                setTimeout(() => {
                    this.selected = [];
                    cards.forEach(c => c.classList.remove('selected', 'wrong'));
                    this.els.slots.forEach(s => {
                        s.textContent = '';
                        s.classList.remove('filled');
                    });
                    this.els.cookBtn.disabled = true;
                }, 600);
            }
        },

        _roundComplete() {
            const recipe = RECIPES[this.currentRound];

            if (this.currentRound < RECIPES.length - 1) {
                // Show transition
                const trans = document.createElement('div');
                trans.className = 'ck-round-transition';
                trans.innerHTML = `
                    <div class="ck-transition-emoji">${recipe.emoji}</div>
                    <div class="ck-transition-text">Ngon quá! 🎉</div>
                    <div class="ck-pot">🍲</div>
                `;
                this.els.wrap.appendChild(trans);
                try { Game.showParticles('confetti', 6); } catch(e) {}

                setTimeout(() => {
                    trans.remove();
                    this.currentRound++;
                    this._setupRound();
                }, 2000);
            } else {
                // All rounds complete
                this._gameComplete();
            }
        },

        _gameComplete() {
            const overlay = document.createElement('div');
            overlay.className = 'ck-result-overlay';
            overlay.innerHTML = `
                <div class="ck-result-text">
                    Đầu bếp xuất sắc! 🍳<br><br>
                    Hoàn thành cả 3 món!
                </div>
                <div style="font-size:40px;display:flex;gap:8px;">
                    ${RECIPES.map(r => r.emoji).join(' ')}
                </div>
            `;
            this.els.wrap.appendChild(overlay);

            try { Game.showParticles('hearts', 15); } catch(e) {}
            try { Game.showParticles('fireworks', 10); } catch(e) {}
            try { GameAudio.playSFX('success'); } catch(e) {}

            setTimeout(() => {
                if (this.onComplete) this.onComplete();
            }, 2000);
        },

        _shuffleArray(arr) {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        },

        destroy() {
            const style = document.getElementById('cooking-styles');
            if (style) style.remove();
            this.els = {};
        }
    };

    Game.registerMiniGame('cooking', game);
})();
