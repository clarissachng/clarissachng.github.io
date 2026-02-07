// No import statements needed anymore!

interface ScrollItem {
    el: HTMLElement;
    speed: number;
    update: (scrollTop: number) => void;
}

// Equivalent to $(document).ready(...)
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    // We use <HTMLElement> generic to tell TS exactly what we expect
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const closeBtn = document.getElementById("close-btn");

    // Optional chaining (?.) prevents crashes if elements are missing from HTML
    hamburgerBtn?.addEventListener("click", () => {
        mobileMenu?.classList.add("active");
    });

    closeBtn?.addEventListener("click", () => {
        mobileMenu?.classList.remove("active");
    });

    // Close when clicking outside
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        
        // Native .closest() works just like jQuery's
        const isClickInside = target.closest("#mobile-menu") || target.closest("#hamburger-btn");
        
        if (!isClickInside) {
            mobileMenu?.classList.remove("active");
        }
    });


    // --- Fade Up Animation ---
    const winHeightPadded = window.innerHeight * 0.8;

    function maskinleftload() {
        const scrolled = window.scrollY;
        
        // Select all elements with the class
        const elements = document.querySelectorAll<HTMLElement>(".element-fade-up:not(.triggered)");

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
                        if (animationName) el.classList.add(animationName);
                    }, parseInt(timeoutData, 10));
                } else {
                    el.classList.add('triggered');
                    if (animationName) el.classList.add(animationName);
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
    const horizontalScrollEl = document.querySelector<HTMLElement>('.horizontal-scroll');

    if (horizontalScrollEl) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const winHeight = window.innerHeight || 1; 
            const textPosition = Math.round((scrollTop / winHeight) * 60);
            
            // Native style manipulation
            horizontalScrollEl.style.transform = `translateX(${textPosition - 130}%)`;
        });
    }


    // --- Change Image Animation ---
    const imgList = [
        "../assets/shapes/3.png", 
        "../assets/shapes/5.png", 
        "../assets/shapes/4.png", 
        "../assets/shapes/7.png", 
        "../assets/shapes/8.png"
    ];

    function preloadImages(list: string[]) {
        list.forEach((imgSrc) => {
            const newImg = new Image();
            newImg.src = imgSrc;
        });
    }
    preloadImages(imgList);

    const introShape = document.getElementById('intro-shape');

    if (introShape) {
        setInterval(() => {
            const randomImage = Math.floor(Math.random() * imgList.length);
            introShape.style.backgroundImage = `url('${imgList[randomImage]}')`;
        }, 1000);
    }


    // --- Scroll Speed Animation (Class Based) ---
    class MoveItItem implements ScrollItem {
        el: HTMLElement;
        speed: number;

        constructor(element: HTMLElement) {
            this.el = element;
            const speedAttr = element.getAttribute('data-scroll-speed');
            this.speed = speedAttr ? parseInt(speedAttr) : 1;
        }

        update(scrollTop: number) {
            // Template literals (backticks) make string math cleaner
            this.el.style.transform = `translateY(${-scrollTop / this.speed}px)`;
        }
    }

    let currentIndex: number = 0;
    const slides = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>;

    function showSlide(index: number, direction: 'left' | 'right' = 'left'): void {
        // Wrap around logic
        if (index >= slides.length) currentIndex = 0;
        if (index < 0) currentIndex = slides.length - 1;

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
    document.getElementById("nextBtn")?.addEventListener("click", () => {
        currentIndex++;
        showSlide(currentIndex, 'left');
    });

    document.getElementById("prevBtn")?.addEventListener("click", () => {
        currentIndex--;
        showSlide(currentIndex, 'right');
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            currentIndex--;
            showSlide(currentIndex, 'right');
        } else if (e.key === "ArrowRight") {
            currentIndex++;
            showSlide(currentIndex, 'left');
        }
    });

    // Initialize the first slide
    showSlide(currentIndex);

    // Initialize MoveIt Logic
    const moveItInstances: MoveItItem[] = [];
    
    // Query all elements with the attribute
    document.querySelectorAll<HTMLElement>('[data-scroll-speed]').forEach((el) => {
        moveItInstances.push(new MoveItItem(el));
    });

    // We can reuse the same window scroll listener for multiple things if we want,
    // but adding a second one is fine for clarity.
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        moveItInstances.forEach((inst) => inst.update(scrollTop));
    });

});