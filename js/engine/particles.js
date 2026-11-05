/**
 * GameParticles — Lightweight DOM & CSS based particle system for mobile.
 * Generates sparkling hearts, cherry blossom petals, fireworks, confetti, bubbles, and stars.
 */
window.GameParticles = {
    container: null,

    init() {
        this.container = document.getElementById('particle-canvas');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'particle-canvas';
            document.getElementById('game-container').appendChild(this.container);
        }
    },

    getContainer() {
        if (!this.container) this.init();
        return this.container;
    },

    hearts(count = 15, duration = 2500) {
        const c = this.getContainer();
        const emojis = ['💖', '💕', '💗', '💓', '❤️'];

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'pixel-particle particle-heart';
            p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const startX = Math.random() * 90 + 5;
            const startY = Math.random() * 40 + 50;
            const size = Math.random() * 14 + 14;
            const delay = Math.random() * 400;

            p.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                font-size: ${size}px;
                opacity: 0;
                pointer-events: none;
                animation: floatUpFade ${duration}ms ease-out ${delay}ms forwards;
                user-select: none;
                z-index: 45;
            `;

            c.appendChild(p);
            setTimeout(() => { if (p.parentNode) p.remove(); }, duration + delay + 100);
        }
    },

    petals(count = 20, duration = 3000) {
        const c = this.getContainer();
        const petals = ['🌸', '🌺', '💮'];

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'pixel-particle particle-petal';
            p.textContent = petals[Math.floor(Math.random() * petals.length)];

            const startX = Math.random() * 100;
            const size = Math.random() * 12 + 12;
            const delay = Math.random() * 1500;
            const drift = (Math.random() - 0.5) * 60;

            p.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: -30px;
                font-size: ${size}px;
                opacity: 0.9;
                pointer-events: none;
                animation: petalFall ${duration}ms linear ${delay}ms forwards;
                --drift: ${drift}px;
                user-select: none;
                z-index: 45;
            `;

            c.appendChild(p);
            setTimeout(() => { if (p.parentNode) p.remove(); }, duration + delay + 100);
        }
    },

    fireworks(count = 8) {
        const c = this.getContainer();
        const colors = ['#ff4d79', '#ffdd59', '#4bcffa', '#0be881', '#ef5777', '#ffa801'];

        for (let i = 0; i < count; i++) {
            const burstX = Math.random() * 80 + 10;
            const burstY = Math.random() * 50 + 15;
            const delay = i * 280;

            setTimeout(() => {
                if (window.GameAudio) window.GameAudio.playSynthSFX('pop');

                for (let j = 0; j < 16; j++) {
                    const spark = document.createElement('div');
                    spark.className = 'pixel-particle particle-spark';
                    const angle = (j / 16) * Math.PI * 2;
                    const distance = Math.random() * 65 + 30;
                    const destX = Math.cos(angle) * distance;
                    const destY = Math.sin(angle) * distance;
                    const color = colors[Math.floor(Math.random() * colors.length)];

                    spark.style.cssText = `
                        position: absolute;
                        left: ${burstX}%;
                        top: ${burstY}%;
                        width: 6px;
                        height: 6px;
                        background: ${color};
                        box-shadow: 0 0 6px ${color};
                        pointer-events: none;
                        --destX: ${destX}px;
                        --destY: ${destY}px;
                        animation: sparkExplode 700ms ease-out forwards;
                        z-index: 50;
                    `;

                    c.appendChild(spark);
                    setTimeout(() => { if (spark.parentNode) spark.remove(); }, 750);
                }
            }, delay);
        }
    },

    confetti(count = 35, duration = 3000) {
        const c = this.getContainer();
        const colors = ['#ff6b81', '#ffa502', '#2ed573', '#1e90ff', '#a55eea', '#ff4757'];

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'pixel-particle particle-confetti';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const width = Math.random() * 6 + 6;
            const height = Math.random() * 10 + 6;
            const delay = Math.random() * 800;

            p.style.cssText = `
                position: absolute;
                left: ${left}%;
                top: -20px;
                width: ${width}px;
                height: ${height}px;
                background-color: ${color};
                pointer-events: none;
                animation: confettiRain ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms forwards;
                transform: rotate(${Math.random() * 360}deg);
                z-index: 45;
            `;

            c.appendChild(p);
            setTimeout(() => { if (p.parentNode) p.remove(); }, duration + delay + 100);
        }
    },

    bubbles(count = 15, duration = 3000) {
        const c = this.getContainer();
        for (let i = 0; i < count; i++) {
            const b = document.createElement('div');
            b.className = 'pixel-particle particle-bubble';
            b.textContent = '🫧';
            const left = Math.random() * 90 + 5;
            const size = Math.random() * 16 + 12;
            const delay = Math.random() * 600;

            b.style.cssText = `
                position: absolute;
                left: ${left}%;
                bottom: -20px;
                font-size: ${size}px;
                pointer-events: none;
                animation: bubbleRise ${duration}ms ease-in ${delay}ms forwards;
                z-index: 45;
            `;

            c.appendChild(b);
            setTimeout(() => { if (b.parentNode) b.remove(); }, duration + delay + 100);
        }
    },

    stars(count = 20) {
        const c = this.getContainer();
        for (let i = 0; i < count; i++) {
            const s = document.createElement('div');
            s.className = 'pixel-particle particle-star';
            s.textContent = Math.random() > 0.5 ? '✨' : '⭐';
            const left = Math.random() * 95;
            const top = Math.random() * 80;
            const size = Math.random() * 10 + 10;
            const duration = Math.random() * 1500 + 1000;

            s.style.cssText = `
                position: absolute;
                left: ${left}%;
                top: ${top}%;
                font-size: ${size}px;
                pointer-events: none;
                animation: starTwinkle ${duration}ms ease-in-out infinite alternate;
                z-index: 40;
            `;

            c.appendChild(s);
        }
    },

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
};
