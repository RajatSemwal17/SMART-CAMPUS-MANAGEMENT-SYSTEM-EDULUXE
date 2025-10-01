// Theme Toggle Functionality with enhanced animations
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize theme toggle with smooth transition
themeToggle.addEventListener('click', () => {
    // Add transition class for smoother theme change
    body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Add a ripple effect to the button
    createRippleEffect(themeToggle);
    
    // Save theme preference to localStorage if available
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    }
    
    // Remove transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
});

// Create ripple effect for buttons
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    if (typeof(Storage) !== "undefined") {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
    }
});

// Enhanced navigation with smooth page transitions
function showMainPortal() {
    animatePageTransition(() => {
        hideAllPages();
        document.getElementById('mainPortal').classList.remove('hidden');
        hideAllSections();
    });
}

function showStudentPage() {
    animatePageTransition(() => {
        hideAllPages();
        document.getElementById('studentPage').classList.remove('hidden');
        hideAllSections();
    });
}

function showStaffPage() {
    animatePageTransition(() => {
        hideAllPages();
        document.getElementById('staffPage').classList.remove('hidden');
        hideAllSections();
    });
}

// Add smooth page transition animation
function animatePageTransition(callback) {
    const currentPage = document.querySelector('.container:not(.hidden)');
    
    if (currentPage) {
        // Fade out current page
        currentPage.style.transition = 'all 0.3s ease';
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            callback();
            const newPage = document.querySelector('.container:not(.hidden)');
            
            if (newPage) {
                // Fade in new page
                newPage.style.opacity = '0';
                newPage.style.transform = 'scale(1.05)';
                
                // Trigger reflow
                newPage.offsetHeight;
                
                newPage.style.transition = 'all 0.3s ease';
                newPage.style.opacity = '1';
                newPage.style.transform = 'scale(1)';
                
                // Add entrance animation to cards
                animateCardsEntrance(newPage);
            }
        }, 300);
    } else {
        callback();
    }
}

// Animate cards entrance
function animateCardsEntrance(container) {
    const cards = container.querySelectorAll('.portal-card, .option-card, .attendance-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function hideAllPages() {
    const pages = ['mainPortal', 'studentPage', 'staffPage'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

function hideAllSections() {
    const sections = [
        'personalDetailsSection', 
        'attendanceSection', 
        'staffDetailsSection', 
        'staffAttendanceSection'
    ];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

// Student Functions
function showPersonalDetails() {
    hideAllSections();
    const section = document.getElementById('personalDetailsSection');
    if (section) {
        section.classList.remove('hidden');
        // Smooth scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showAttendance() {
    hideAllSections();
    const section = document.getElementById('attendanceSection');
    if (section) {
        section.classList.remove('hidden');
        // Smooth scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Staff Functions
function showStaffDetails() {
    hideAllSections();
    const section = document.getElementById('staffDetailsSection');
    if (section) {
        section.classList.remove('hidden');
        // Smooth scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showStaffAttendance() {
    hideAllSections();
    const section = document.getElementById('staffAttendanceSection');
    if (section) {
        section.classList.remove('hidden');
        // Smooth scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Photo Upload Handlers
document.addEventListener('DOMContentLoaded', () => {
    const studentPhotoInput = document.getElementById('studentPhotoInput');
    const staffPhotoInput = document.getElementById('staffPhotoInput');

    if (studentPhotoInput) {
        studentPhotoInput.addEventListener('change', function(e) {
            handlePhotoUpload(e, 'studentPhoto');
        });
    }

    if (staffPhotoInput) {
        staffPhotoInput.addEventListener('change', function(e) {
            handlePhotoUpload(e, 'staffPhoto');
        });
    }
});

function handlePhotoUpload(event, photoElementId) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const photoElement = document.getElementById(photoElementId);
            if (photoElement) {
                photoElement.style.backgroundImage = `url(${e.target.result})`;
                photoElement.style.backgroundSize = 'cover';
                photoElement.style.backgroundPosition = 'center';
                photoElement.textContent = '';
                
                // Add a success animation
                photoElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    photoElement.style.transform = 'scale(1)';
                }, 200);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Update attendance percentage colors based on value
function updateAttendanceColors() {
    const percentageElements = document.querySelectorAll('.percentage');
    
    percentageElements.forEach(element => {
        const percentage = parseInt(element.textContent);
        
        if (percentage >= 90) {
            element.style.color = 'var(--success-color)';
        } else if (percentage >= 75) {
            element.style.color = 'var(--warning-color)';
        } else {
            element.style.color = 'var(--error-color)';
        }
    });
}

// Add hover effects to form inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            if (!input.matches(':focus')) {
                input.style.borderColor = 'var(--primary-color)';
            }
        });
        
        input.addEventListener('mouseleave', () => {
            if (!input.matches(':focus')) {
                input.style.borderColor = 'var(--border-color)';
            }
        });
    });
    
    // Initialize attendance colors
    updateAttendanceColors();
});

// Add smooth transitions for section changes
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        // Trigger reflow
        section.offsetHeight;
        
        section.style.transition = 'all 0.3s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }
}

// Enhanced navigation with animations
function navigateWithAnimation(showFunction) {
    const currentPage = document.querySelector('.container:not(.hidden)');
    if (currentPage) {
        currentPage.style.opacity = '0.5';
        currentPage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            showFunction();
            const newPage = document.querySelector('.container:not(.hidden)');
            if (newPage) {
                newPage.style.opacity = '0';
                newPage.style.transform = 'scale(1.02)';
                
                // Trigger reflow
                newPage.offsetHeight;
                
                newPage.style.transition = 'all 0.3s ease';
                newPage.style.opacity = '1';
                newPage.style.transform = 'scale(1)';
            }
        }, 150);
    } else {
        showFunction();
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
    // ESC key to go back
    if (event.key === 'Escape') {
        const currentPage = document.querySelector('.container:not(.hidden)').id;
        if (currentPage !== 'mainPortal') {
            showMainPortal();
        }
    }
    
    // Number keys for quick navigation
    if (event.key === '1' && document.getElementById('mainPortal').classList.contains('hidden') === false) {
        showStudentPage();
    } else if (event.key === '2' && document.getElementById('mainPortal').classList.contains('hidden') === false) {
        showStaffPage();
    }
});

// Add loading states for better UX
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Initialize tooltips for better accessibility
function initializeTooltips() {
    const cards = document.querySelectorAll('.portal-card, .option-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.position = 'relative';
        });
    });
}

// Initialize all interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme preference
    if (typeof(Storage) !== "undefined") {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
    }
    
    initializeTooltips();
    updateAttendanceColors();
    addCardHoverEffects();
    initializeParallaxEffect();
    
    // Add CSS for ripple effect
    const rippleCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleAnimation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
});

// Add enhanced card hover effects
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.portal-card, .option-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add magnetic effect
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) { // Only on desktop
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            }
        });
        
        card.addEventListener('mouseleave', (e) => {
            card.style.transform = '';
        });
    });
}

// Add parallax effect to background
function initializeParallaxEffect() {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    function animateParallax() {
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;
        
        const bgElement = document.body;
        if (bgElement) {
            bgElement.style.backgroundPosition = `${targetX * 20}px ${targetY * 20}px`;
        }
        
        requestAnimationFrame(animateParallax);
    }
    
    animateParallax();
}