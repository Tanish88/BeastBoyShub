document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================================================
       1. Mobile Menu Toggle
       ========================================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================================================
       2. Navbar Add Background on Scroll
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#0a0a0a]', 'shadow-lg', 'border-b', 'border-bbsred/20');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-[#0a0a0a]', 'shadow-lg', 'border-b', 'border-bbsred/20');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    /* =========================================================================
       3. Scroll Reveal Animations (Intersection Observer)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================================================
       4. Animated Counters for Stats Section
       ========================================================================= */
    const counters = document.querySelectorAll('.counter');
    const counterSection = document.getElementById('counter-section');
    let countersStarted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;
                const increment = target / 200; // Adjust for speed

                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target + (target % 1 !== 0 ? '' : ''); 
                    
                    // Special handling for decimal (like 7.1 and 2.6)
                    if(target === 7.1 || target === 2.6) {
                        counter.innerText = target.toFixed(1);
                    }
                }
            };
            
            // Decimal handling setup
            const originalTarget = parseFloat(counter.getAttribute('data-target'));
            if(Number.isInteger(originalTarget) === false) {
                 const step = () => {
                    const c = parseFloat(counter.innerText);
                    const inc = originalTarget / 100;
                    if(c < originalTarget) {
                        counter.innerText = (c + inc).toFixed(1);
                        setTimeout(step, 20);
                    } else {
                        counter.innerText = originalTarget.toFixed(1);
                    }
                 };
                 counter.innerText = "0.0";
                 setTimeout(step, window.innerWidth > 768 ? 200 : 0);
            } else {
                updateCounter();
            }
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            runCounters();
        }
    }, {
        threshold: 0.5
    });

    if (counterSection) {
        statsObserver.observe(counterSection);
    }
});

/* =========================================================================
   5. Buy Me a Coffee Modal Logic
   ========================================================================= */
const coffeeModal = document.getElementById('coffeeModal');
const coffeeModalContent = document.getElementById('coffeeModalContent');

function openCoffeeModal() {
    coffeeModal.classList.remove('opacity-0', 'pointer-events-none');
    coffeeModalContent.classList.remove('scale-95');
    coffeeModalContent.classList.add('scale-100');
}

function closeCoffeeModal() {
    coffeeModal.classList.add('opacity-0', 'pointer-events-none');
    coffeeModalContent.classList.remove('scale-100');
    coffeeModalContent.classList.add('scale-95');
}

// Close modal on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !coffeeModal.classList.contains('pointer-events-none')) {
        closeCoffeeModal();
    }
});
