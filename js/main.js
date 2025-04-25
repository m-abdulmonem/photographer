
// Auth state management (example - replace with your actual auth logic)
function checkAuthState() {
    // This is just for demonstration - replace with your actual auth check
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'false';
    // if (isAuthenticated) {
        document.body.classList.add('user-authed');
    // } else {
    //     document.body.classList.remove('user-authed');
    // }
}

// Call this when auth state changes
function setAuthState(isAuthenticated) {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    checkAuthState();
}

// Check auth state on page load
document.addEventListener('DOMContentLoaded', function () {
    checkAuthState();

    // Example login/logout buttons (you'll need to add these to your pages)
    document.querySelectorAll('.btn-login').forEach(btn => {
        btn.addEventListener('click', () => setAuthState(true));
    });

    document.querySelectorAll('.btn-logout').forEach(btn => {
        btn.addEventListener('click', () => setAuthState(false));
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-overlay').style.bottom = '0';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-overlay').style.bottom = '-100%';
        });
    });
    
    // Testimonial slider
    if (document.querySelector('.testimonials-slider')) {
        // Initialize testimonial slider here
        // This would be implemented with a library like Swiper.js in a real project
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Booking Page JavaScript (booking.js)
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#bookingCalendar')) {
        // Initialize calendar
        const calendarEl = document.getElementById('bookingCalendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
            },
            selectable: true,
            select: function(info) {
                // Check if date is available
                if (info.start.getDay() !== 0 && info.start.getDay() !== 6) { // Example: not Sunday (0) or Saturday (6)
                    // Mark date as selected
                    document.querySelectorAll('.fc-day').forEach(day => {
                        day.classList.remove('fc-day-selected');
                    });
                    info.dayEl.classList.add('fc-day-selected');
                    
                    // Show package selection
                    document.querySelector('.calendar-section').classList.add('hidden');
                    document.querySelector('.package-selection').classList.remove('hidden');
                    
                    // Set selected date
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = info.start.toLocaleDateString('en-US', options);
                    document.querySelector('#selectedDate').textContent = formattedDate;
                } else {
                    alert('Weekends are not available for booking. Please select a weekday.');
                }
            },
            dateClick: function(info) {
                // Prevent date click from doing anything if the date is booked
                if (info.dayEl.classList.contains('fc-day-booked')) {
                    return false;
                }
            },
            datesSet: function(info) {
                // Mark booked dates (in a real app, this would come from an API)
                const bookedDates = [
                    '2025-06-10',
                    '2025-06-15',
                    '2025-06-20',
                    '2025-06-25'
                ];
                
                document.querySelectorAll('.fc-day').forEach(day => {
                    const dateStr = day.getAttribute('data-date');
                    if (bookedDates.includes(dateStr)) {
                        day.classList.add('fc-day-booked');
                    } else if (dateStr) {
                        const date = new Date(dateStr);
                        if (date.getDay() !== 0 && date.getDay() !== 6) { // Weekdays
                            day.classList.add('fc-day-available');
                        }
                    }
                });
            }
        });
        
        calendar.render();
        
        // Back to calendar button
        document.querySelector('#backToCalendar').addEventListener('click', function() {
            document.querySelector('.calendar-section').classList.remove('hidden');
            document.querySelector('.package-selection').classList.add('hidden');
        });
        
        // Proceed to details button
        document.querySelector('#proceedToDetails').addEventListener('click', function() {
            document.querySelector('.package-selection').classList.add('hidden');
            document.querySelector('.client-details').classList.remove('hidden');
            
            // Update summary (in a real app, this would come from selected package)
            document.querySelector('#summaryDate').textContent = document.querySelector('#selectedDate').textContent;
            document.querySelector('#summaryPackage').textContent = 'Premium Wedding Package';
            document.querySelector('#summaryTotal').textContent = '$2,500';
        });
        
        // Back to packages button
        document.querySelector('#backToPackages').addEventListener('click', function() {
            document.querySelector('.package-selection').classList.remove('hidden');
            document.querySelector('.client-details').classList.add('hidden');
        });
        
        // Form submission
        document.querySelector('#bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send data to server
            document.querySelector('.client-details').classList.add('hidden');
            document.querySelector('.confirmation-section').classList.remove('hidden');
            
            // Set confirmation details
            document.querySelector('#bookingRef').textContent = 'ELESAWY-' + Math.floor(Math.random() * 1000000);
            document.querySelector('#confirmationDate').textContent = document.querySelector('#summaryDate').textContent;
            document.querySelector('#confirmationPackage').textContent = document.querySelector('#summaryPackage').textContent;
        });
    }
    
    // Package tabs
    if (document.querySelector('.package-tabs')) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});

// Profile Page JavaScript (profile.js)
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.profile-section')) {
        // Profile tabs
        const profileMenuItems = document.querySelectorAll('.profile-menu ul li a');
        const profileTabs = document.querySelectorAll('.profile-tab');
        
        profileMenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all menu items and tabs
                profileMenuItems.forEach(item => item.parentElement.classList.remove('active'));
                profileTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked menu item and corresponding tab
                this.parentElement.classList.add('active');
                const tabId = this.getAttribute('href').substring(1);
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Booking filter
        const bookingFilterBtns = document.querySelectorAll('.bookings-filter .filter-btn');
        
        bookingFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                bookingFilterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter bookings (in a real app, this would be more sophisticated)
                const filter = this.textContent.toLowerCase();
                const bookingItems = document.querySelectorAll('.booking-item');
                
                bookingItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Gallery filter
        const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
        
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                galleryFilterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real app, this would filter the gallery
            });
        });
        
        // Favorite button toggle
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }
    // Add this to your main.js or create a new testimonials.js file
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Update slider position
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slider.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
});
    // JavaScript
    document.addEventListener('DOMContentLoaded', function () {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                const isExpanded = item.classList.contains('active');

                if (isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    item.setAttribute('aria-expanded', 'true');
                } else {
                    answer.style.maxHeight = null;
                    item.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Keyboard accessibility
        faqItems.forEach(item => {
            item.querySelector('.faq-question').addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.querySelector('.faq-question').click();
                }
            });
        });
    });

    
});



// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function () {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('lang') || 'en';

    // Set initial language
    setLanguage(currentLang);

    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    function setLanguage(lang) {
        // Update UI
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Set document direction
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        // Save preference
        localStorage.setItem('lang', lang);

        // In a real app, you would load translations here
        // For now we'll just toggle a class
        document.body.classList.toggle('rtl', lang === 'ar');

        // You would typically make an API call to get translations
        // loadTranslations(lang);
    }

    // Example translation function (you would implement this properly)
    function loadTranslations(lang) {
        // This is just a placeholder - in a real app you would:
        // 1. Load a JSON file with translations
        // 2. Replace all text elements with their translations
        // 3. Adjust any layout for RTL languages

        console.log(`Loading ${lang} translations...`);
    }
});

// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const storedTheme = localStorage.getItem('theme') || 'system';

    // Set initial theme
    setTheme(storedTheme);

    // Add click handlers
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    function setTheme(theme) {
        // Remove all theme attributes first
        document.documentElement.removeAttribute('data-theme');

        // Set the selected theme
        if (theme !== 'system') {
            document.documentElement.setAttribute('data-theme', theme);
        }

        // Update UI
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });

        // Save preference
        localStorage.setItem('theme', theme);

        // Update icon for system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemIcon = document.querySelector('.theme-btn[data-theme="system"] i');

        if (theme === 'system') {
            systemIcon.className = systemPrefersDark ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            setTheme('system');
        }
    });
});

// Enhanced Theme Loader
function initializeTheme() {
    const storedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(storedTheme);

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
}

function applyTheme(theme) {
    // First remove any existing theme attributes
    document.documentElement.removeAttribute('data-theme');

    // Apply the selected theme
    if (theme !== 'system') {
        document.documentElement.setAttribute('data-theme', theme);
    } else {
        // Handle system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    // Force repaint to prevent white flash
    document.body.style.opacity = '0.99';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 10);
}

// Run immediately when script loads
initializeTheme();

// Also run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeTheme);
// Profile button interaction
document.querySelectorAll('.profile-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});
// Testimonials Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider) return; // Exit if no slider found
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalDuration = 5000; // 5 seconds
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Auto-slide function
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalDuration);
    }
    
    // Stop auto-slide on user interaction
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    // Update slider position
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slider.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        pauseSlider();
        startSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlider();
        startSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlider();
        startSlider();
    });
    
    // Pause on hover
    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', startSlider);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseSlider();
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlider();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
    
    // Initialize
    startSlider();
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!slider) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalDuration = 5000;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Touch/Click events
    slides.forEach((slide, index) => {
        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);

        // Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    // Prevent image drag
    window.oncontextmenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function touchStart(index) {
        return function (event) {
            currentSlide = index;
            startPos = getPositionX(event);
            isDragging = true;
            pauseSlider();

            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentSlide < slides.length - 1) {
            currentSlide += 1;
        }

        if (movedBy > 100 && currentSlide > 0) {
            currentSlide -= 1;
        }

        setPositionByIndex();
        slider.classList.remove('grabbing');
        startSlider();
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentSlide * -slider.offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        updateDots();
    }

    // Auto-slide function
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalDuration);
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        if (currentSlide >= slides.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide += 1;
        }
        setPositionByIndex();
    }

    function prevSlide() {
        if (currentSlide <= 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide -= 1;
        }
        setPositionByIndex();
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlider();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlider();
        startSlider();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', startSlider);

    // Initialize
    startSlider();
});
// FAQ Functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items first
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
        });
    });

 
});
