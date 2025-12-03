// 1. SEGURIDAD
const currentUser = localStorage.getItem('currentUser');
const userDisplay = document.getElementById('user-display');

if (!currentUser) {
    alert("¡Acceso denegado!");
    window.location.href = 'auth.html'; // Minúscula
} else {
    userDisplay.textContent = `Hola, Capitán ${currentUser}`;
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html'; // Minúscula
});

// 2. ANIMACIÓN
const oxygenEl = document.getElementById('stat-oxygen');
const gravityEl = document.getElementById('stat-gravity');
const speedEl = document.getElementById('stat-speed');

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function updateSystem() {
    const oxLevel = getRandom(95, 99.9).toFixed(1);
    oxygenEl.textContent = oxLevel + '%';
    oxygenEl.style.color = oxLevel < 96 ? 'red' : 'white';

    const gravLevel = getRandom(-0.05, 0.05).toFixed(3);
    gravityEl.textContent = gravLevel + ' G';

    const speedLevel = Math.floor(getRandom(27800, 28200));
    speedEl.textContent = speedLevel.toLocaleString() + ' km/h';
}

setInterval(updateSystem, 2000);

// 3. BITÁCORA (TO-DO)
const missionInput = document.getElementById('mission-text');
const addMissionBtn = document.getElementById('add-mission-btn');
const missionList = document.getElementById('mission-list');
const storageKey = `missions_${currentUser}`;

function saveLocalMissions() {
    const missions = [];
    document.querySelectorAll('.mission-item span').forEach(span => {
        missions.push(span.textContent);
    });
    localStorage.setItem(storageKey, JSON.stringify(missions));
}

function createMissionElement(text) {
    const newItem = document.createElement('li');
    newItem.classList.add('mission-item');
    newItem.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn" onclick="deleteMission(this)">×</button>
    `;
    missionList.appendChild(newItem);
}

function addMission() {
    const text = missionInput.value;
    if (text === '') { alert("Escribe una misión primero."); return; }
    createMissionElement(text);
    saveLocalMissions();
    missionInput.value = '';
}

window.deleteMission = function (element) {
    element.parentElement.remove();
    saveLocalMissions();
}

addMissionBtn.addEventListener('click', addMission);
missionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMission();
});

// 4. CARGAR AL INICIO
function loadMissions() {
    const storedMissions = localStorage.getItem(storageKey);
    if (storedMissions) {
        const missionsArray = JSON.parse(storedMissions);
        missionsArray.forEach(text => createMissionElement(text));
    }
}

loadMissions();