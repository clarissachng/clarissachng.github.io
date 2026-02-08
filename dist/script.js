// No import statements needed anymore!
// Equivalent to $(document).ready(...)
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    // --- Mobile Menu ---
    function initMobileMenu() {
        var _a;
        const sidebar = document.querySelector('.sidebar');
        const mobileMenu = document.getElementById("mobile-menu");
        const hamburgerBtn = document.getElementById("hamburger-btn");
        if (!sidebar || !hamburgerBtn)
            return;
        // Remove old listeners by cloning and replacing
        const newHamburgerBtn = hamburgerBtn.cloneNode(true);
        (_a = hamburgerBtn.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newHamburgerBtn, hamburgerBtn);
        // Toggle menu open/close
        newHamburgerBtn.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("is-open");
            newHamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close menu when clicking on any link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('is-open');
                newHamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
        // Close when clicking outside
        document.addEventListener("click", (event) => {
            const target = event.target;
            const isClickInside = target.closest("#mobile-menu") || target.closest("#hamburger-btn") || target.closest(".sidebar");
            if (!isClickInside && sidebar.classList.contains('is-open')) {
                sidebar.classList.remove("is-open");
                newHamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
                newHamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    // Try to initialize immediately
    initMobileMenu();
    // --- Fade Up Animation ---
    const winHeightPadded = window.innerHeight * 0.8;
    function maskinleftload() {
        const scrolled = window.scrollY;
        // Select all elements with the class
        const elements = document.querySelectorAll(".element-fade-up:not(.triggered)");
        elements.forEach((el) => {
            // Calculate position relative to the document
            const rect = el.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY;
            if (scrolled + winHeightPadded > offsetTop) {
                // Get data attributes using the native .dataset property
                const timeoutData = el.dataset.timeout;
                const animationName = el.dataset.animation || '';
                if (timeoutData) {
                    setTimeout(() => {
                        el.classList.add('triggered');
                        if (animationName)
                            el.classList.add(animationName);
                    }, parseInt(timeoutData, 10));
                }
                else {
                    el.classList.add('triggered');
                    if (animationName)
                        el.classList.add(animationName);
                }
            }
        });
    }
    // Listen to scroll
    window.addEventListener('scroll', maskinleftload);
    // Trigger on page load for elements already in view
    maskinleftload();
    // --- GIF Name Animation ---
    const textEl = document.querySelector(".text");
    if (textEl && textEl.textContent) {
        const chars = textEl.textContent.split("");
        // Create the HTML string
        const newHtml = chars.map((char, i) => {
            return `<span style="transform:rotate(${i * 8.125}deg)">${char}</span>`;
        }).join("");
        textEl.innerHTML = newHtml;
    }
    // --- Horizontal Scroll Animation ---
    const horizontalScrollEl = document.querySelector('.horizontal-scroll');
    if (horizontalScrollEl) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const winHeight = window.innerHeight || 1;
            const textPosition = Math.round((scrollTop / winHeight) * 60);
            // Native style manipulation
            horizontalScrollEl.style.transform = `translateX(${textPosition - 130}%)`;
        });
    }
    // --- Scroll Speed Animation (Class Based) ---
    class MoveItItem {
        constructor(element) {
            this.el = element;
            const speedAttr = element.getAttribute('data-scroll-speed');
            this.speed = speedAttr ? parseInt(speedAttr) : 1;
        }
        update(scrollTop) {
            // Template literals (backticks) make string math cleaner
            this.el.style.transform = `translateY(${-scrollTop / this.speed}px)`;
        }
    }
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    function showSlide(index, direction = 'left') {
        // Wrap around logic
        if (index >= slides.length)
            currentIndex = 0;
        if (index < 0)
            currentIndex = slides.length - 1;
        // Hide all slides and remove animation classes
        slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.remove('slide-left', 'slide-right');
        });
        // Show the active slide with animation
        const currentSlide = slides[currentIndex];
        if (currentSlide) {
            currentSlide.style.display = "block";
            currentSlide.classList.add(direction === 'left' ? 'slide-left' : 'slide-right');
        }
    }
    // Event Listeners for Buttons
    (_a = document.getElementById("nextBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        currentIndex++;
        showSlide(currentIndex, 'left');
    });
    (_b = document.getElementById("prevBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        currentIndex--;
        showSlide(currentIndex, 'right');
    });
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            currentIndex--;
            showSlide(currentIndex, 'right');
        }
        else if (e.key === "ArrowRight") {
            currentIndex++;
            showSlide(currentIndex, 'left');
        }
    });
    // Initialize the first slide
    showSlide(currentIndex);
    // Initialize MoveIt Logic
    const moveItInstances = [];
    // Query all elements with the attribute
    document.querySelectorAll('[data-scroll-speed]').forEach((el) => {
        moveItInstances.push(new MoveItItem(el));
    });
    // We can reuse the same window scroll listener for multiple things if we want,
    // but adding a second one is fine for clarity.
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        moveItInstances.forEach((inst) => inst.update(scrollTop));
    });
    // --- Navigation Pill Animation ---
    function initNavPillAnimation() {
        const navPillBg = document.querySelector('.nav-pill-bg');
        const navLinks = document.querySelectorAll('.nav-pill');
        if (navPillBg && navLinks.length > 0) {
            // Function to move pill to a specific link
            function movePillTo(link) {
                var _a;
                if (!navPillBg)
                    return;
                const linkRect = link.getBoundingClientRect();
                const navRect = (_a = link.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                if (navRect) {
                    const left = linkRect.left - navRect.left;
                    const width = linkRect.width;
                    navPillBg.style.opacity = '1';
                    navPillBg.style.left = `${left}px`;
                    navPillBg.style.width = `${width}px`;
                }
            }
            // Add hover listeners
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    movePillTo(link);
                });
            });
            // Handle mouse leave from nav container
            const sidebarNav = document.querySelector('.sidebar-nav');
            sidebarNav === null || sidebarNav === void 0 ? void 0 : sidebarNav.addEventListener('mouseleave', () => {
                // Check if there's an active link
                const activeLink = document.querySelector('.nav-pill.is-active, .nav-pill[aria-current="page"]');
                if (activeLink) {
                    movePillTo(activeLink);
                }
                else {
                    navPillBg.style.opacity = '0';
                }
            });
            // Initialize pill position on active link if exists
            const currentPath = window.location.pathname;
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref && currentPath.includes(linkHref)) {
                    link.classList.add('is-active');
                    movePillTo(link);
                }
            });
        }
    }
    // Try to initialize immediately
    initNavPillAnimation();
    // Also watch for the nav to be loaded dynamically
    const navObserver = new MutationObserver(() => {
        if (document.querySelector('.nav-pill-bg')) {
            initNavPillAnimation();
            initMobileMenu(); // Also initialize mobile menu when nav loads
            navObserver.disconnect();
        }
    });
    navObserver.observe(document.body, { childList: true, subtree: true });
});
export {};
//# sourceMappingURL=script.js.map