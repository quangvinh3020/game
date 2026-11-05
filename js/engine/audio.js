/**
 * GameAudio — Handles audio playback with Web Audio synth fallback
 * If sound files don't exist, it generates cute retro 8-bit chiptune sound effects & melodies!
 */
window.GameAudio = {
    currentBGM: null,
    bgmAudio: null,
    bgmVolume: 0.35,
    sfxVolume: 0.5,
    isMuted: false,
    audioCtx: null,
    synthInterval: null,

    init() {
        // Init Web Audio on first user interaction to comply with autoplay policy
        const unlockAudio = () => {
            if (!this.audioCtx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.audioCtx = new AudioCtx();
                }
            }
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };
        window.addEventListener('click', unlockAudio, { passive: true });
        window.addEventListener('touchstart', unlockAudio, { passive: true });
    },

    getAudioContext() {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.audioCtx = new AudioCtx();
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    },

    playBGM(name) {
        if (this.currentBGM === name) return;
        this.stopBGM();
        this.currentBGM = name;

        if (this.isMuted) return;

        // Try loading actual audio file
        const audioPath = `asset/audio/bgm/${name}.mp3`;
        const audio = new Audio();
        audio.src = audioPath;
        audio.loop = true;
        audio.volume = this.bgmVolume;

        audio.play().then(() => {
            this.bgmAudio = audio;
        }).catch(() => {
            // Audio file not found or autoplay blocked -> Use retro synth BGM loop!
            this.playSynthBGM(name);
        });
    },

    playSynthBGM(theme) {
        if (this.isMuted) return;
        const ctx = this.getAudioContext();
        if (!ctx) return;

        // Melodies for different scenes (frequencies)
        const melodies = {
            title: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23, 440.00, 523.25],
            intro: [329.63, 392.00, 440.00, 493.88, 440.00, 392.00, 329.63, 261.63],
            zone1: [392.00, 440.00, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00],
            zone2: [329.63, 349.23, 392.00, 440.00, 392.00, 349.23, 329.63, 293.66],
            zone3: [293.66, 369.99, 440.00, 554.37, 440.00, 369.99, 293.66, 329.63],
            zone4: [349.23, 440.00, 523.25, 587.33, 523.25, 440.00, 392.00, 329.63],
            zone5: [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 1046.50],
            ending: [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 523.25]
        };

        const notes = melodies[theme] || melodies.title;
        let noteIdx = 0;

        if (this.synthInterval) clearInterval(this.synthInterval);

        this.synthInterval = setInterval(() => {
            if (this.isMuted) return;
            try {
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'triangle'; // Sweet gentle retro tone
                osc.frequency.setValueAtTime(notes[noteIdx], now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.exponentialRampToValueAtTime(0.04 * (this.bgmVolume / 0.35), now + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.4);

                noteIdx = (noteIdx + 1) % notes.length;
            } catch (e) {}
        }, 450);
    },

    stopBGM() {
        if (this.bgmAudio) {
            try {
                this.bgmAudio.pause();
                this.bgmAudio.currentTime = 0;
            } catch (e) {}
            this.bgmAudio = null;
        }
        if (this.synthInterval) {
            clearInterval(this.synthInterval);
            this.synthInterval = null;
        }
        this.currentBGM = null;
    },

    fadeBGM(duration = 1000) {
        if (this.bgmAudio) {
            const step = 50;
            const stepVal = this.bgmAudio.volume / (duration / step);
            const fadeTimer = setInterval(() => {
                if (!this.bgmAudio) {
                    clearInterval(fadeTimer);
                    return;
                }
                if (this.bgmAudio.volume > stepVal) {
                    this.bgmAudio.volume -= stepVal;
                } else if (name === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else {
                    clearInterval(fadeTimer);
                    this.stopBGM();
                }
            }, step);
        } else {
            this.stopBGM();
        }
    },

    playSFX(name) {
        if (this.isMuted) return;

        // Try playing audio file
        const sfx = new Audio(`asset/audio/sfx/${name}.mp3`);
        sfx.volume = this.sfxVolume;
        sfx.play().catch(() => {
            // Synth sound effects
            this.playSynthSFX(name);
        });
    },

    playSynthSFX(name) {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            if (name === 'catch' || name === 'pop' || name === 'collect') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (name === 'slide' || name === 'tap') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(350, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (name === 'success' || name === 'correct') {
                // Two upbeat tones
                [523.25, 659.25, 783.99].forEach((f, idx) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = 'square';
                    o.frequency.setValueAtTime(f, now + idx * 0.09);
                    g.gain.setValueAtTime(0.05, now + idx * 0.09);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.15);
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.start(now + idx * 0.09);
                    o.stop(now + idx * 0.09 + 0.16);
                });
            } else if (name === 'wrong') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(140, now + 0.2);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (name === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else {
                // Default soft blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch (e) {}
    },

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            if (this.bgmAudio) this.bgmAudio.pause();
            if (this.synthInterval) {
                clearInterval(this.synthInterval);
                this.synthInterval = null;
            }
        } else {
            if (this.currentBGM) {
                const bgm = this.currentBGM;
                this.currentBGM = null;
                this.playBGM(bgm);
            }
        }
        return this.isMuted;
    },

    setVolume(bgm, sfx) {
        if (bgm !== undefined) {
            this.bgmVolume = Math.max(0, Math.min(1, bgm));
            if (this.bgmAudio) this.bgmAudio.volume = this.bgmVolume;
        }
        if (sfx !== undefined) {
            this.sfxVolume = Math.max(0, Math.min(1, sfx));
        }
    }
};

window.GameAudio.init();
