/**
 * GameStorage — Handles save and load using localStorage
 */
window.GameStorage = {
    STORAGE_KEY: 'gameState',

    save(state) {
        try {
            const data = JSON.stringify(state);
            localStorage.setItem(this.STORAGE_KEY, data);
            localStorage.setItem('hanh_trinh_cua_chung_minh_save', data);
            return true;
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
            return false;
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY) || localStorage.getItem('hanh_trinh_cua_chung_minh_save');
            if (!data) return null;
            return JSON.parse(data);
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
            return null;
        }
    },

    reset() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem('hanh_trinh_cua_chung_minh_save');
            return true;
        } catch (e) {
            console.warn('Could not reset localStorage:', e);
            return false;
        }
    },

    hasSave() {
        try {
            return (localStorage.getItem(this.STORAGE_KEY) !== null) || (localStorage.getItem('hanh_trinh_cua_chung_minh_save') !== null);
        } catch (e) {
            return false;
        }
    }
};
