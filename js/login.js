// Verifica se já existe algum usuário cadastrado
const users = JSON.parse(localStorage.getItem("users")) || [];

// Cadastro de usuário
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Verificar se já existe o email cadastrado
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
        alert("Email já cadastrado!");
        return;
    }

    // Adiciona usuário
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastro realizado com sucesso!");
    document.getElementById("registerForm").reset();
});

// Login de usuário
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        alert("Login bem-sucedido!");
        // Redireciona para o CRUD após login
        window.location.href = "crud.html";
    } else {
        alert("Email ou senha inválidos.");
    }
});
