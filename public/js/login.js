function login() {
    let correo = document.getElementById("email").value;
    localStorage.setItem("user",correo)
    document.getElementById('logoutLink').style.display = 'inline-block';
    document.getElementById('loginLink').style.display = 'none';
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("password");

}

