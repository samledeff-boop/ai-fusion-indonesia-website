document.addEventListener('DOMContentLoaded', () => {
    // 0. Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 1. Revelation Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal, .hero-title-full, .hero-text h1, .hero-text p, .hero-ctas, .section h2, .step-card, .agent-card, .integration-logo, .pricing-card, .faq-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        // Only add if not already present to avoid double classes if already in HTML
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        revealObserver.observe(el);
    });

    // 2. Interactive Agent Tabs
    const agentTabs = document.querySelectorAll('.agent-tab');
    const agentContents = document.querySelectorAll('.agent-content');

    agentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const agentId = tab.getAttribute('data-agent');

            // Update Tabs
            agentTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Content
            agentContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `agent-${agentId}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none'; // Will be shown via CSS

    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');

    if (navbar && navMenu) {
        navbar.appendChild(mobileMenuBtn);

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }
    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            // Initial style setup - assuming CSS doesn't handle hidden state
            // If CSS handles it, this might not be needed, but good for safety
            // In the HTML viewing, I didn't see specific FAQ styles for hidden/block. 
            // Usually it's handled by max-height or display.
            // Let's toggle an 'active' class on the item.

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items (optional, but common for accordions)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) otherItem.classList.remove('active');
                // });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});
