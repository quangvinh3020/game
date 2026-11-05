/**
 * GameDialogue — Stardew Valley style dialogue system with typewriter effect,
 * portrait support, sound effects, and branching choices.
 */
window.GameDialogue = {
    isActive: false,
    queue: [],
    currentIndex: 0,
    onComplete: null,
    isTyping: false,
    typewriterTimer: null,
    fullText: '',
    targetElement: null,

    show(dialogues, onComplete) {
        if (!dialogues || dialogues.length === 0) {
            if (onComplete) onComplete();
            return;
        }

        this.queue = Array.isArray(dialogues) ? dialogues : [dialogues];
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.isActive = true;

        const overlay = document.getElementById('dialogue-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'flex';
        }

        this._renderCurrent();
    },

    _renderCurrent() {
        if (this.currentIndex >= this.queue.length) {
            this.hide();
            if (this.onComplete) {
                const cb = this.onComplete;
                this.onComplete = null;
                cb();
            }
            return;
        }

        const entry = this.queue[this.currentIndex];
        const speakerEl = document.getElementById('dialogue-speaker');
        const textEl = document.getElementById('dialogue-text');
        const portraitEl = document.getElementById('dialogue-portrait');
        const choicesEl = document.getElementById('dialogue-choices');
        const continuePrompt = document.getElementById('dialogue-continue');

        if (choicesEl) {
            choicesEl.innerHTML = '';
            choicesEl.style.display = 'none';
        }
        if (continuePrompt) {
            continuePrompt.style.display = 'none';
        }

        // Speaker name
        if (speakerEl) {
            if (entry.speaker) {
                speakerEl.textContent = entry.speaker;
                speakerEl.style.display = 'inline-block';
            } else {
                speakerEl.style.display = 'none';
            }
        }

        // Portrait
        if (portraitEl) {
            if (entry.portrait === 'vinh') {
                portraitEl.innerHTML = `
                    <div class="portrait-avatar portrait-vinh">
                        <div class="avatar-pixel avatar-pixel-vinh">🧑</div>
                    </div>
                `;
                portraitEl.style.display = 'flex';
            } else if (entry.portrait === 'nga') {
                portraitEl.innerHTML = `
                    <div class="portrait-avatar portrait-nga">
                        <div class="avatar-pixel avatar-pixel-nga">👩</div>
                    </div>
                `;
                portraitEl.style.display = 'flex';
            } else if (entry.portrait) {
                portraitEl.innerHTML = `<img src="${entry.portrait}" alt="avatar" />`;
                portraitEl.style.display = 'flex';
            } else {
                portraitEl.style.display = 'none';
            }
        }

        // Typewriter text
        this.fullText = entry.text || '';
        this.targetElement = textEl;
        this._typewrite(textEl, this.fullText, 25, () => {
            this.isTyping = false;
            if (entry.choices && entry.choices.length > 0) {
                this._renderChoices(entry.choices);
            } else {
                if (continuePrompt) continuePrompt.style.display = 'block';
            }
        });
    },

    _typewrite(element, text, speed, callback) {
        if (!element) {
            if (callback) callback();
            return;
        }
        if (this.typewriterTimer) clearInterval(this.typewriterTimer);

        element.textContent = '';
        this.isTyping = true;
        let charIndex = 0;

        this.typewriterTimer = setInterval(() => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                if (charIndex % 3 === 0 && window.GameAudio) {
                    window.GameAudio.playSynthSFX('tap');
                }
            } else {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
                this.isTyping = false;
                if (callback) callback();
            }
        }, speed);
    },

    _renderChoices(choices) {
        const choicesEl = document.getElementById('dialogue-choices');
        if (!choicesEl) return;

        choicesEl.innerHTML = '';
        choicesEl.style.display = 'flex';

        choices.forEach((choiceText, index) => {
            const btn = document.createElement('button');
            btn.className = 'pixel-btn dialogue-choice-btn bounce';
            btn.textContent = choiceText;
            btn.onclick = (e) => {
                e.stopPropagation();
                if (window.GameAudio) window.GameAudio.playSynthSFX('pop');
                this.selectChoice(index);
            };
            choicesEl.appendChild(btn);
        });
    },

    selectChoice(index) {
        this.currentIndex++;
        this._renderCurrent();
    },

    handleTap() {
        if (!this.isActive) return;

        const entry = this.queue[this.currentIndex];
        // If still typing, finish text immediately
        if (this.isTyping) {
            if (this.typewriterTimer) {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
            }
            if (this.targetElement) {
                this.targetElement.textContent = this.fullText;
            }
            this.isTyping = false;

            const continuePrompt = document.getElementById('dialogue-continue');
            if (entry && entry.choices && entry.choices.length > 0) {
                this._renderChoices(entry.choices);
            } else if (continuePrompt) {
                continuePrompt.style.display = 'block';
            }
            return;
        }

        // If choices present, player must click a choice button
        if (entry && entry.choices && entry.choices.length > 0) {
            return;
        }

        // Proceed to next dialogue
        this.currentIndex++;
        this._renderCurrent();
    },

    hide() {
        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
            this.typewriterTimer = null;
        }
        this.isActive = false;
        this.isTyping = false;
        const overlay = document.getElementById('dialogue-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    }
};
