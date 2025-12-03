const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');

const toRegisterBtn = document.getElementById('to-register');
const toLoginBtn = document.getElementById('to-login');

const toggleLoginBtn = document.getElementById('toggle-login-pass');
const loginPassInput = document.getElementById('login-pass');

const toggleRegBtn = document.getElementById('toggle-reg-pass');
const regPassInput = document.getElementById('reg-pass');

// Limpiar inputs al cambiar de form
function cleanInputs() {
    loginForm.reset();
    registerForm.reset();
    loginPassInput.type = 'password';
    regPassInput.type = 'password';
    toggleLoginBtn.textContent = '👁️';
    toggleRegBtn.textContent = '👁️';
}

// Cambiar entre Login y Register
toRegisterBtn.addEventListener('click', () => {
    cleanInputs();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.textContent = "Crear Cuenta Nueva";
});

toLoginBtn.addEventListener('click', () => {
    cleanInputs();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    formTitle.textContent = "Bienvenido a Bordo";
});

// Mostrar/Ocultar contraseña
toggleLoginBtn.addEventListener('click', () => {
    const type = loginPassInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassInput.setAttribute('type', type);
    toggleLoginBtn.textContent = type === 'password' ? '👁️' : '🔒';
});

toggleRegBtn.addEventListener('click', () => {
    const type = regPassInput.getAttribute('type') === 'password' ? 'text' : 'password';
    regPassInput.setAttribute('type', type);
    toggleRegBtn.textContent = type === 'password' ? '👁️' : '🔒';
});

// REGISTRO
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (pass.length < 6) {
        alert("⚠️ La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ name, pass }));
    alert('¡Registro exitoso! Ahora inicia sesión.');
    toLoginBtn.click();
});

// LOGIN
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    const storedUser = localStorage.getItem(email);

    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (pass === userData.pass) {
            localStorage.setItem('currentUser', userData.name);
            cleanInputs();
            alert(`Bienvenido, ${userData.name}. Despegando...`);
            window.location.href = 'dashboard.html'; // Importante: minúscula
        } else {
            alert('❌ Contraseña incorrecta.');
        }
    } else {
        alert('❌ Usuario no encontrado. Regístrese primero.');
        cleanInputs();
    }
});