let events = [
    {
        id: 1,
        title: "Annual Tech Symposium 2024",
        category: "Technical",
        description: "Join us for cutting-edge technology presentations and networking opportunities.",
        date: "2024-09-15",
        time: "09:00",
        location: "Main Auditorium",
        speaker: "Dr. Sarah Johnson",
        icon: "fas fa-laptop-code",
        registrations: 45
    },
    {
        id: 2,
        title: "Cultural Night Celebration",
        category: "Cultural",
        description: "Experience diverse cultures through music, dance, and traditional performances.",
        date: "2024-09-20",
        time: "18:00",
        location: "Campus Grounds",
        speaker: "Cultural Committee",
        icon: "fas fa-music",
        registrations: 78
    },
    {
        id: 3,
        title: "Machine Learning Workshop",
        category: "Workshop",
        description: "Hands-on workshop covering basics of ML algorithms and practical implementations.",
        date: "2024-09-25",
        time: "14:00",
        location: "Computer Lab 1",
        speaker: "Prof. Michael Chen",
        icon: "fas fa-robot",
        registrations: 32
    },
    {
        id: 4,
        title: "Inter-College Basketball Championship",
        category: "Sports",
        description: "Annual basketball tournament featuring teams from various colleges.",
        date: "2024-09-30",
        time: "10:00",
        location: "Sports Complex",
        speaker: "Sports Department",
        icon: "fas fa-basketball-ball",
        registrations: 12
    },
    {
        id: 5,
        title: "Academic Excellence Awards",
        category: "Academic",
        description: "Recognizing outstanding academic achievements and scholarly contributions.",
        date: "2024-10-05",
        time: "16:00",
        location: "Conference Hall",
        speaker: "Dean of Academics",
        icon: "fas fa-award",
        registrations: 89
    },
    {
        id: 6,
        title: "Startup Pitch Competition",
        category: "Technical",
        description: "Students present their innovative startup ideas to industry experts.",
        date: "2024-10-10",
        time: "13:00",
        location: "Innovation Center",
        speaker: "Entrepreneurship Cell",
        icon: "fas fa-lightbulb",
        registrations: 23
    }
];

let filteredEvents = [...events];

const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const noEventsMessage = document.getElementById('noEventsMessage');
const addEventModal = document.getElementById('addEventModal');
const addEventForm = document.getElementById('addEventForm');

document.addEventListener('DOMContentLoaded', function() {
    renderEvents();
    setupEventListeners();
    updateStats();
});

function setupEventListeners() {
    searchInput.addEventListener('input', filterEvents);
    categoryFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    addEventForm.addEventListener('submit', handleAddEvent);
}

function renderEvents() {
    if (filteredEvents.length === 0) {
        eventsGrid.style.display = 'none';
        noEventsMessage.style.display = 'block';
        return;
    }

    eventsGrid.style.display = 'grid';
    noEventsMessage.style.display = 'none';

    eventsGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <div class="event-image">
                <i class="${event.icon}"></i>
            </div>
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-clock"></i>
                        <span>${formatTime(event.time)}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-user"></i>
                        <span>${event.speaker}</span>
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary" onclick="registerForEvent(${event.id})">
                        <i class="fas fa-user-plus"></i> Register (${event.registrations})
                    </button>
                    <button class="btn btn-outline" onclick="viewEventDetails(${event.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const dateRange = dateFilter.value;

    filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm) ||
                            event.speaker.toLowerCase().includes(searchTerm);

        const matchesCategory = !category || event.category === category;

        let matchesDate = true;
        const eventDate = new Date(event.date);
        const today = new Date();
        
        if (dateRange === 'today') {
            matchesDate = eventDate.toDateString() === today.toDateString();
        } else if (dateRange === 'week') {
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            matchesDate = eventDate >= today && eventDate <= weekFromNow;
        } else if (dateRange === 'month') {
            const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
            matchesDate = eventDate >= today && eventDate <= monthFromNow;
        } else if (dateRange === 'upcoming') {
            matchesDate = eventDate >= today;
        }

        return matchesSearch && matchesCategory && matchesDate;
    });

    renderEvents();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function registerForEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        event.registrations++;
        renderEvents();
        updateStats();
        alert(`Successfully registered for "${event.title}"!`);
    }
}

function viewEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        alert(`Event Details:\n\nTitle: ${event.title}\nCategory: ${event.category}\nDate: ${formatDate(event.date)}\nTime: ${formatTime(event.time)}\nLocation: ${event.location}\nSpeaker: ${event.speaker}\nDescription: ${event.description}\nRegistrations: ${event.registrations}`);
    }
}

function openAddEventModal() {
    addEventModal.style.display = 'block';
}

function closeAddEventModal() {
    addEventModal.style.display = 'none';
    addEventForm.reset();
}

function handleAddEvent(e) {
    e.preventDefault();
    
    const newEvent = {
        id: events.length + 1,
        title: document.getElementById('eventTitle').value,
        category: document.getElementById('eventCategory').value,
        description: document.getElementById('eventDescription').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        speaker: document.getElementById('eventSpeaker').value,
        icon: getCategoryIcon(document.getElementById('eventCategory').value),
        registrations: 0
    };

    events.push(newEvent);
    filteredEvents = [...events];
    renderEvents();
    updateStats();
    closeAddEventModal();
    alert('Event added successfully!');
}

function getCategoryIcon(category) {
    const icons = {
        'Academic': 'fas fa-graduation-cap',
        'Cultural': 'fas fa-music',
        'Technical': 'fas fa-laptop-code',
        'Sports': 'fas fa-football-ball',
        'Workshop': 'fas fa-tools'
    };
    return icons[category] || 'fas fa-calendar';
}


function updateStats() {
    const today = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) >= today).length;
    const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);
    const activeToday = events.filter(event => 
        new Date(event.date).toDateString() === today.toDateString()
    ).length;

    document.getElementById('totalEvents').textContent = events.length;
    document.getElementById('upcomingEvents').textContent = upcomingEvents;
    document.getElementById('registeredEvents').textContent = totalRegistrations;
    document.getElementById('activeEvents').textContent = activeToday;
}


window.addEventListener('click', function(e) {
    if (e.target === addEventModal) {
        closeAddEventModal();
    }
});

function exportEventsData() {
    return JSON.stringify(events, null, 2);
}

function importEventsData(jsonData) {
    try {
        const importedEvents = JSON.parse(jsonData);
        events = importedEvents;
        filteredEvents = [...events];
        renderEvents();
        updateStats();
        return true;
    } catch (error) {
        console.error('Error importing events data:', error);
        return false;
    }
}

function searchEvents(criteria) {
    return events.filter(event => {
        return Object.keys(criteria).every(key => {
            if (criteria[key] === '') return true;
            return event[key].toLowerCase().includes(criteria[key].toLowerCase());
        });
    });
}