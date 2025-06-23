// Inicializa ou recupera os dados salvos
const users = JSON.parse(localStorage.getItem("userList")) || [];

const userForm = document.getElementById("userForm");
const userTableBody = document.getElementById("userTableBody");
const logoutButton = document.getElementById("logoutButton");

let editIndex = null;

// Renderiza a tabela de usuários
function renderTable() {
    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.hours}</td>
            <td>
                <button onclick="editUser(${index})">Editar</button>
                <button onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;

        userTableBody.appendChild(tr);
    });

    localStorage.setItem("userList", JSON.stringify(users));
}

// Adiciona ou atualiza usuário
userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const hours = document.getElementById("hours").value.trim();

    if (editIndex === null) {
        // Adiciona novo
        users.push({ name, email, hours });
    } else {
        // Atualiza
        users[editIndex] = { name, email, hours };
        editIndex = null;
    }

    userForm.reset();
    renderTable();
});

// Editar usuário
function editUser(index) {
    const user = users[index];

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("hours").value = user.hours;

    editIndex = index;
}

// Excluir usuário
function deleteUser(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
        users.splice(index, 1);
        renderTable();
    }
}

// Logout
logoutButton.addEventListener("click", function () {
    window.location.href = "login.html";
});

// Inicializa a tabela
renderTable();
