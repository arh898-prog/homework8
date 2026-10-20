// Homework 8: Advanced JavaScript Interactivity
// This file keeps the JavaScript features in simple, separate functions.

// Portfolio owner information and Homework 7 greetings.
const name = 'Ashton Heitkam';

function showGreeting(personName) {
    return 'Hello, my name is ' + personName + '! Welcome to my portfolio!';
}

function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good morning!';
    } else if (hour < 18) {
        return 'Good afternoon!';
    }
    return 'Good evening!';
}

const personalGreeting = document.getElementById('personalGreeting');
const timeGreeting = document.getElementById('timeGreeting');

if (personalGreeting) {
    personalGreeting.textContent = showGreeting(name);
}
if (timeGreeting) {
    timeGreeting.textContent = getTimeGreeting();
}

// STEP 1: Add a skill entered by the visitor.
const skillForm = document.getElementById('skillForm');
const skillInput = document.getElementById('skillInput');
const skillsList = document.getElementById('skillsList');
const skillMessage = document.getElementById('skillMessage');

if (skillForm) {
    skillForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const skillName = skillInput.value.trim();

        if (skillName === '') {
            skillMessage.textContent = 'Please enter a skill first.';
            return;
        }

        const skill = document.createElement('div');
        skill.className = 'skill';
        skill.textContent = skillName;
        skillsList.appendChild(skill);

        skillInput.value = '';
        skillMessage.textContent = 'Skill added: ' + skillName;
        skillInput.focus();
    });
}

// STEP 2 and 3: Store project information in three separate arrays.
// The dates are sample deadlines; update them to match your actual projects.
const projectTitles = [
    'Still Life Cow Head',
    'Different Style',
    'Digital Art Portfolio Expansion'
];

const projectDescriptions = [
    'A still life drawing focused on shapes, details, and shading.',
    'A second version of the same subject using a different style and approach.',
    'Adding more artwork and improving how creative projects are presented online.'
];

const projectDeadlines = [
    '2026-09-15',
    '2026-10-10',
    '2026-12-01'
];

const projectImages = [
    'images/portfolio1.jpg',
    'images/portfolio2.jpg',
    'images/portfolio3.jpg'
];

function getProjectStatus(deadlineText) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(deadlineText + 'T00:00:00');
    deadline.setHours(0, 0, 0, 0);

    // Use === to identify a deadline that is today, then > and < to compare dates.
    if (deadline.getTime() === today.getTime()) {
        return 'Due today';
    } else if (deadline > today) {
        return 'Ongoing';
    } else if (deadline < today) {
        return 'Completed';
    }

    return 'Status unavailable';
}

function displayProjects() {
    const projectsList = document.getElementById('projectsList');

    if (!projectsList) {
        return;
    }

    projectsList.textContent = '';

    // A for loop builds one project card for each set of array entries.
    for (let i = 0; i < projectTitles.length; i++) {
        const article = document.createElement('article');
        article.className = 'project';

        const image = document.createElement('img');
        image.src = projectImages[i];
        image.alt = projectTitles[i] + ' artwork';
        image.loading = 'lazy';

        const details = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = projectTitles[i];

        const description = document.createElement('p');
        description.textContent = projectDescriptions[i];

        const deadline = document.createElement('p');
        deadline.textContent = 'Deadline: ' + projectDeadlines[i];

        const status = document.createElement('p');
        status.className = 'project-status';
        status.textContent = 'Status: ' + getProjectStatus(projectDeadlines[i]);

        details.appendChild(title);
        details.appendChild(description);
        details.appendChild(deadline);
        details.appendChild(status);
        article.appendChild(image);
        article.appendChild(details);
        projectsList.appendChild(article);
    }
}

displayProjects();

// STEP 4: Count each click on the resume download link.
let resumeDownloadCount = 0;
const resumeLink = document.getElementById('downloadResume');
const resumeStatus = document.getElementById('resumeStatus');

if (resumeLink && resumeStatus) {
    resumeLink.addEventListener('click', function () {
        resumeDownloadCount++;
        resumeStatus.textContent = 'Resume download clicks: ' + resumeDownloadCount;
    });
}

// STEP 5: Build the experience and education tables using JavaScript.
const educationData = [
    ['Northern Arizona University', 'Immersive Game and Design', '2026', 'Present'],
    ['Sunrise Mountain High School', 'High School Diploma', '2021', '2025']
];

const experienceData = [
    ['Robotics Coach', 'VEX Robotics', 'Dates not specified', 'Worked with students on teamwork and problem solving.'],
    ['Student', 'Northern Arizona University', '2026', 'Present', 'Working on creative and game design projects.']
];

function createDataTable(containerId, headings, rows) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    const table = document.createElement('table');
    table.className = 'data-table table table-striped';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    for (let i = 0; i < headings.length; i++) {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = headings[i];
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let i = 0; i < rows.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < headings.length; j++) {
            const cell = document.createElement('td');
            cell.textContent = rows[i][j] || 'Not specified';
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.textContent = '';
    container.appendChild(table);
}

createDataTable(
    'educationTable',
    ['Institution', 'Program / Degree', 'Start Date', 'End Date'],
    educationData
);

createDataTable(
    'experienceTable',
    ['Role', 'Company / Organization', 'Start Date', 'End Date / Details'],
    experienceData.map(function (entry) {
        return [entry[0], entry[1], entry[2], entry[3] + (entry[4] ? ' ' + entry[4] : '')];
    })
);

// BONUS: Toggle light and dark themes.
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeToggle.textContent = 'Switch to Light Theme';
        } else {
            themeToggle.textContent = 'Switch to Dark Theme';
        }
    });
}

// BONUS: Change the page font size and background color immediately.
const fontSizeInput = document.getElementById('fontSizeInput');
const backgroundInput = document.getElementById('backgroundInput');

if (fontSizeInput) {
    fontSizeInput.addEventListener('change', function () {
        document.body.style.fontSize = fontSizeInput.value;
    });
}

if (backgroundInput) {
    backgroundInput.addEventListener('input', function () {
        if (!document.body.classList.contains('dark-theme')) {
            document.body.style.backgroundColor = backgroundInput.value;
        }
    });
}

console.log('Homework 8 JavaScript loaded.');
