(() => {
    'use strict';

    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.site-nav');

    const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 28);
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    menuButton?.addEventListener('click', () => {
        const open = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!open));
        navigation?.classList.toggle('open', !open);
        document.body.classList.toggle('menu-open', !open);
    });

    navigation?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menuButton?.setAttribute('aria-expanded', 'false');
            navigation.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -70px', threshold: 0.08 });
        revealItems.forEach((item) => observer.observe(item));
    }

    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitButton = form?.querySelector('.submit-btn');

    const showMessage = (message, success) => {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message is-visible ${success ? 'success' : 'error'}`;
        formMessage.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    };

    form?.addEventListener('submit', async (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        event.preventDefault();
        submitButton?.classList.add('loading');
        if (submitButton) submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            const data = await response.json();
            showMessage(data.message || 'Your enquiry has been processed.', Boolean(data.success));
            if (data.success) form.reset();
        } catch (error) {
            showMessage('Something went wrong. Please email or call us directly.', false);
        } finally {
            submitButton?.classList.remove('loading');
            if (submitButton) submitButton.disabled = false;
        }
    });
})();
