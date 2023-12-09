function login() {
    let correo = document.getElementById("email").value;
    localStorage.setItem("user",correo)
    document.getElementById('logoutLink').style.display = 'inline-block';
    document.getElementById('loginLink').style.display = 'none';
}

function logout() {
    // Resto del código...

    // Limpiar información de usuario del localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("password");

    // Ocultar el enlace de "Cerrar Sesión" si el localStorage está vacío
   
}

