const searchInput = document.querySelector('.search-box input');
const notices = document.querySelectorAll('.notice');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    notices.forEach(notice => {
        const text = notice.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            notice.style.display = 'block';
    } else {
                notice.style.display = 'none';
    }
        });
});

const categorySelect = document.getElementById('categorySelect');

    categorySelect.addEventListener('change', function() {
    const selectedCategory = this.value;
        const allNotices = document.querySelectorAll('.notice');
    
    allNotices.forEach(notice => {
            const categories = notice.getAttribute('data-category');
        
        if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                notice.style.display = 'block';
            } else {
        notice.style.display = 'none';
    }
    });
    });

const viewAllLink = document.getElementById('viewAllLink');
    const additionalNotices = document.querySelector('.additional-notices');

viewAllLink.addEventListener('click', function(e) {
        e.preventDefault();
    
    if (additionalNotices.style.display === 'none') {
            additionalNotices.style.display = 'block';
        this.textContent = 'Show Less →';
    } else {
    additionalNotices.style.display = 'none';
            this.textContent = 'View All Notices →';
        }
});

function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
    }

const today = new Date();
    const noticeDates = document.querySelectorAll('.notice-date');

noticeDates.forEach((dateElement, index) => {
        const date = new Date(today);
    date.setDate(date.getDate() - (index * 2)); 
        dateElement.textContent = 'Published: ' + formatDate(date);
});

const eventDates = document.querySelectorAll('.event-date');
    const futureDates = [
    formatDate(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000)), 
        formatDate(new Date(today.getTime() + 19 * 24 * 60 * 60 * 1000)), 
    formatDate(new Date(today.getTime() + 29 * 24 * 60 * 60 * 1000)) + " - " + 
        formatDate(new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000)) 
    ];

eventDates.forEach((dateElement, index) => {
    dateElement.textContent = futureDates[index];
        });