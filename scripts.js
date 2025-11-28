// Shared scripts: menu toggle (overlay), top button, and lightbox initialization
(function () {
    'use strict';

    // Mobile menu / overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    let overlay = null;
    if (mainNav && !document.querySelector('nav .overlay')) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.querySelector('nav').appendChild(overlay);
    } else {
        overlay = document.querySelector('nav .overlay');
    }

    function openMenu() {
        if (mainNav) mainNav.classList.add('show');
        if (overlay) overlay.classList.add('show');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (mainNav) mainNav.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu(); else openMenu();
        });
    }
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Top button
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Generic lightbox initializer: looks for .lightbox-trigger and #lightbox structure
    function initLightbox() {
        const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
        const lightbox = document.getElementById('lightbox');
        if (!triggers.length || !lightbox) return;
        const lightboxImg = document.getElementById('lightboxImg');
        const captionEl = lightbox.querySelector('.caption');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const closeBtn = document.getElementById('closeBtn');
        let currentIndex = 0;

        function open(index) {
            currentIndex = index;
            const srcEl = triggers[currentIndex];
            if (!srcEl) return;
            lightboxImg.src = srcEl.dataset.full || srcEl.src;
            lightboxImg.alt = srcEl.alt || '';
            if (captionEl) captionEl.textContent = srcEl.dataset.caption || '';
            lightbox.classList.add('show');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            lightbox.classList.remove('show');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        function next() { currentIndex = (currentIndex + 1) % triggers.length; open(currentIndex); }
        function prev() { currentIndex = (currentIndex - 1 + triggers.length) % triggers.length; open(currentIndex); }

        triggers.forEach((t, i) => {
            t.setAttribute('tabindex', '0');
            t.addEventListener('click', () => open(i));
            t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') open(i); });
        });

        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });
    }

    // Init on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        initLightbox();
        initReveal();
    });

    // Reveal on scroll using IntersectionObserver
    function initReveal() {
        if (!('IntersectionObserver' in window)) return;
        const items = Array.from(document.querySelectorAll('.reveal'));
        if (!items.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(i => io.observe(i));
    }

    // Fights filter: if the fights page contains controls, wire them
    function initFightsFilter() {
        const fightList = document.getElementById('fightList');
        if (!fightList) return;
        const cards = Array.from(fightList.querySelectorAll('.fight-card'));
        const search = document.getElementById('fightSearch');
        const yearSel = document.getElementById('fightYear');
        const resultSel = document.getElementById('fightResult');

        function matches(card) {
            const q = search && search.value.trim().toLowerCase();
            const year = yearSel && yearSel.value;
            const result = resultSel && resultSel.value;
            const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
            if (q) {
                if (!title.includes(q)) return false;
            }
            if (year && year !== 'all') {
                if (card.dataset.year !== year) return false;
            }
            if (result && result !== 'all') {
                if (card.dataset.result !== result) return false;
            }
            return true;
        }

        function applyFilter() {
            cards.forEach(c => {
                if (matches(c)) {
                    c.style.display = '';
                    // re-trigger reveal if not shown yet
                    if (c.classList.contains('reveal') && !c.classList.contains('show')) {
                        // small timeout to allow layout
                        setTimeout(() => c.classList.add('show'), 60);
                    }
                } else {
                    c.style.display = 'none';
                }
            });
        }

        if (search) search.addEventListener('input', applyFilter);
        if (yearSel) yearSel.addEventListener('change', applyFilter);
        if (resultSel) resultSel.addEventListener('change', applyFilter);

        // initial apply
        applyFilter();
    }

})();
