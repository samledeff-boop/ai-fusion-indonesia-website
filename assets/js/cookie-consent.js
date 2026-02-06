/**
 * Cookie Consent Banner for AI Fusion Partner
 * GDPR & Indonesian Privacy Law Compliant
 */

(function() {
    'use strict';

    const COOKIE_NAME = 'aifusion_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    /**
     * Get cookie value by name
     */
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    /**
     * Set cookie
     */
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }

    /**
     * Create and show cookie consent banner
     */
    function showCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-container">
                <div class="cookie-consent-content">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-text">
                        <h3>Kami Menggunakan Cookie</h3>
                        <p>
                            Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis traffic,
                            dan personalisasi konten. Dengan mengklik "Terima", Anda menyetujui penggunaan cookie kami.
                            <a href="privacy.html" target="_blank">Pelajari lebih lanjut</a>
                        </p>
                    </div>
                </div>
                <div class="cookie-actions">
                    <button id="cookie-decline" class="cookie-btn cookie-btn-secondary">
                        Tolak
                    </button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-secondary">
                        Pengaturan
                    </button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">
                        Terima Semua
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate in
        setTimeout(() => {
            banner.classList.add('cookie-consent-visible');
        }, 100);

        // Event listeners
        document.getElementById('cookie-accept').addEventListener('click', acceptAllCookies);
        document.getElementById('cookie-decline').addEventListener('click', declineCookies);
        document.getElementById('cookie-settings').addEventListener('click', showCookieSettings);
    }

    /**
     * Show cookie settings modal
     */
    function showCookieSettings() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>Pengaturan Cookie</h2>
                    <button class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <p class="cookie-intro">
                        Kami menggunakan berbagai jenis cookie untuk memberikan pengalaman terbaik.
                        Anda dapat memilih kategori cookie yang ingin Anda terima.
                    </p>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-title">
                                <input type="checkbox" id="cookie-essential" checked disabled>
                                <label for="cookie-essential">
                                    <strong>Cookie Esensial</strong>
                                    <span class="cookie-required">(Diperlukan)</span>
                                </label>
                            </div>
                        </div>
                        <p class="cookie-category-desc">
                            Cookie ini diperlukan untuk fungsi dasar website seperti keamanan, navigasi,
                            dan akses ke area yang dilindungi. Website tidak dapat berfungsi tanpa cookie ini.
                        </p>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-title">
                                <input type="checkbox" id="cookie-analytics" checked>
                                <label for="cookie-analytics">
                                    <strong>Cookie Analytics</strong>
                                </label>
                            </div>
                        </div>
                        <p class="cookie-category-desc">
                            Cookie ini membantu kami memahami bagaimana pengunjung berinteraksi dengan website
                            melalui pengumpulan dan pelaporan informasi secara anonim.
                        </p>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-title">
                                <input type="checkbox" id="cookie-marketing" checked>
                                <label for="cookie-marketing">
                                    <strong>Cookie Marketing</strong>
                                </label>
                            </div>
                        </div>
                        <p class="cookie-category-desc">
                            Cookie ini digunakan untuk melacak pengunjung di berbagai website dengan tujuan
                            menampilkan iklan yang relevan dan menarik.
                        </p>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-title">
                                <input type="checkbox" id="cookie-preferences" checked>
                                <label for="cookie-preferences">
                                    <strong>Cookie Preferensi</strong>
                                </label>
                            </div>
                        </div>
                        <p class="cookie-category-desc">
                            Cookie ini memungkinkan website untuk mengingat pilihan Anda (seperti bahasa atau wilayah)
                            dan memberikan fitur yang lebih personal.
                        </p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-secondary" id="cookie-save-settings">
                        Simpan Pengaturan
                    </button>
                    <button class="cookie-btn cookie-btn-primary" id="cookie-accept-all-modal">
                        Terima Semua
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.classList.add('cookie-modal-visible');
        }, 10);

        // Event listeners
        modal.querySelector('.cookie-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.cookie-modal-overlay').addEventListener('click', closeModal);
        modal.querySelector('#cookie-save-settings').addEventListener('click', saveCustomSettings);
        modal.querySelector('#cookie-accept-all-modal').addEventListener('click', () => {
            acceptAllCookies();
            closeModal();
        });

        function closeModal() {
            modal.classList.remove('cookie-modal-visible');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    /**
     * Accept all cookies
     */
    function acceptAllCookies() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true,
            timestamp: new Date().toISOString()
        };

        setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_EXPIRY_DAYS);
        removeBanner();
        enableCookies(preferences);

        // Track acceptance (if analytics is enabled)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'event_category': 'engagement',
                'event_label': 'accepted_all'
            });
        }
    }

    /**
     * Decline non-essential cookies
     */
    function declineCookies() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            preferences: false,
            timestamp: new Date().toISOString()
        };

        setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_EXPIRY_DAYS);
        removeBanner();
        enableCookies(preferences);
    }

    /**
     * Save custom cookie settings
     */
    function saveCustomSettings() {
        const preferences = {
            essential: true,
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked,
            preferences: document.getElementById('cookie-preferences').checked,
            timestamp: new Date().toISOString()
        };

        setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_EXPIRY_DAYS);
        removeBanner();
        document.getElementById('cookie-settings-modal').remove();
        enableCookies(preferences);
    }

    /**
     * Remove cookie banner
     */
    function removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('cookie-consent-visible');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    /**
     * Enable cookies based on preferences
     */
    function enableCookies(preferences) {
        // Enable Google Analytics
        if (preferences.analytics && typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }

        // Enable Marketing cookies (Facebook Pixel, etc.)
        if (preferences.marketing) {
            if (typeof fbq !== 'undefined') {
                fbq('consent', 'grant');
            }
        }

        // Enable Preference cookies
        if (preferences.preferences) {
            // Enable preference-related features
        }

        console.log('Cookie preferences saved:', preferences);
    }

    /**
     * Initialize cookie consent
     */
    function init() {
        // Check if user has already made a choice
        const consent = getCookie(COOKIE_NAME);

        if (!consent) {
            // Show banner after 1 second delay
            setTimeout(showCookieBanner, 1000);
        } else {
            // Apply saved preferences
            try {
                const preferences = JSON.parse(consent);
                enableCookies(preferences);
            } catch (e) {
                // Invalid cookie, show banner
                showCookieBanner();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose function to reopen settings
    window.reopenCookieSettings = showCookieSettings;

})();
