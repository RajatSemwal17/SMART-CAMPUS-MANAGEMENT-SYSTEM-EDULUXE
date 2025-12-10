// Get DOM elements
const portalSelection = document.getElementById('portalSelection');
const studentDashboard = document.getElementById('studentDashboard');
const teacherDashboard = document.getElementById('teacherDashboard');
const portalCards = document.querySelectorAll('.portal-card');

// Add click event listeners to portal cards
portalCards.forEach(card => {
    const button = card.querySelector('.btn-primary');
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const portalType = card.dataset.portal;
        openPortal(portalType);
    });

    // Also make the entire card clickable
    card.addEventListener('click', () => {
        const portalType = card.dataset.portal;
        openPortal(portalType);
    });
});

// Function to open specific portal
function openPortal(portalType) {
    // Add exit animation
    portalSelection.style.animation = 'fadeOut 0.3s ease';

    setTimeout(() => {
        portalSelection.classList.add('hidden');

        if (portalType === 'student') {
            studentDashboard.classList.remove('hidden');
            animateCards(studentDashboard);
        } else if (portalType === 'teacher') {
            teacherDashboard.classList.remove('hidden');
            animateCards(teacherDashboard);
        }
    }, 300);
}

// Function to go back to portal selection
function goBack() {
    const activeDashboard = document.querySelector('.dashboard:not(.hidden)');

    if (activeDashboard) {
        activeDashboard.style.animation = 'fadeOut 0.3s ease';

        setTimeout(() => {
            activeDashboard.classList.add('hidden');
            portalSelection.classList.remove('hidden');
            portalSelection.style.animation = 'fadeIn 0.5s ease';
        }, 300);
    }
}

// Animate dashboard cards on load
function animateCards(dashboard) {
    const cards = dashboard.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add hover effect to portal cards
portalCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Simulate real-time attendance updates
function updateAttendance() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill && !studentDashboard.classList.contains('hidden')) {
        const currentWidth = parseInt(progressFill.style.width);
        if (currentWidth < 100) {
            progressFill.style.width = (currentWidth + 1) + '%';
            const statLarge = progressFill.closest('.card').querySelector('.stat-large');
            statLarge.textContent = (currentWidth + 1) + '%';
        }
    }
}

// Add click effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Interactive badge color changes
setInterval(() => {
    const badges = document.querySelectorAll('.badge-warning');
    badges.forEach(badge => {
        if (Math.random() > 0.7) {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }
    });
}, 3000);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        goBack();
    }
});

// Add dynamic time update
function updateTime() {
    const now = new Date();
    const timeElements = document.querySelectorAll('.time');

    timeElements.forEach((elem, index) => {
        const hour = (now.getHours() + index) % 24;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        elem.textContent = `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
    });
}

// Initialize
updateTime();

// Log portal access (for demo purposes)
console.log('Departments Portal initialized successfully!');