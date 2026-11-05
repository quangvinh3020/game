/**
 * GameTransition — Smooth transitions between scenes (Fade, Flash, Pixel curtain)
 */
window.GameTransition = {
    overlay: null,

    init() {
        this.overlay = document.getElementById('transition-overlay');
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.id = 'transition-overlay';
            document.getElementById('game-container').appendChild(this.overlay);
        }
    },

    getOverlay() {
        if (!this.overlay) this.init();
        return this.overlay;
    },

    fade(callback, duration = 400) {
        const ov = this.getOverlay();
        ov.style.transition = `opacity ${duration / 2}ms ease-in-out`;
        ov.style.background = '#1a1024';
        ov.style.pointerEvents = 'auto';
        ov.style.opacity = '1';

        setTimeout(() => {
            if (callback) callback();
            setTimeout(() => {
                ov.style.opacity = '0';
                setTimeout(() => {
                    ov.style.pointerEvents = 'none';
                }, duration / 2);
            }, 50);
        }, duration / 2);
    },

    flash(duration = 500) {
        const ov = this.getOverlay();
        ov.style.transition = `opacity ${duration / 3}ms ease-out`;
        ov.style.background = '#ffffff';
        ov.style.pointerEvents = 'auto';
        ov.style.opacity = '0.9';

        setTimeout(() => {
            ov.style.transition = `opacity ${(duration * 2) / 3}ms ease-in`;
            ov.style.opacity = '0';
            setTimeout(() => {
                ov.style.pointerEvents = 'none';
            }, (duration * 2) / 3);
        }, duration / 3);
    }
};
