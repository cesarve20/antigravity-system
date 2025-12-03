// Detecta si hay usuario logueado en la página principal
const navBtn = document.getElementById('nav-btn');
const currentUser = localStorage.getItem('currentUser');

if (currentUser) {
    navBtn.textContent = `Ir a Cabina (${currentUser})`;
    navBtn.href = 'pages/dashboard.html'; // Importante: minúscula
    navBtn.style.backgroundColor = '#2ea043';
    navBtn.style.color = '#ffffff';
}