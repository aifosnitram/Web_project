const API = "http://127.0.0.1:8000/api";

/* 🔐 PROTECCIÓN SIMPLE */
const savedRole = localStorage.getItem("role");
const role = savedRole ? savedRole.replace(/['"]+/g, '') : ""; // Limpiar comillas de JSON.stringify

if (role !== "admin") {
    window.location.href = "../index.html";
}

/* =========================
   👤 USUARIOS
========================= */
async function loadUsers() {
    const res = await fetch(`${API}/usuarios`);
    const users = await res.json();

    let html = `
    <h2>Usuarios</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Acción</th>
      </tr>
  `;

    users.forEach(u => {
        html += `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
          <select onchange="changeRole(${u.id}, this.value)">
            <option value="user" ${u.role === "user" ? "selected" : ""}>user</option>
            <option value="admin" ${u.role === "admin" ? "selected" : ""}>admin</option>
          </select>
        </td>
        <td>-</td>
      </tr>
    `;
    });

    html += `</table>`;

    document.getElementById("table").innerHTML = html;
}

/* =========================
   🔁 CAMBIAR ROL
========================= */
async function changeRole(id, role) {
    await fetch(`${API}/usuarios/${id}/role`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ role })
    });

    alert("Rol actualizado");
}

/* =========================
   📦 PRODUCTOS
========================= */
async function loadProducts() {
    const res = await fetch(`${API}/productos`);
    const products = await res.json();

    let html = `
    <h2>Productos</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
      </tr>
  `;

    products.forEach(p => {
        html += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio} €</td>
      </tr>
    `;
    });

    html += `</table>`;

    document.getElementById("table").innerHTML = html;
}

/* =========================
   🚪 LOGOUT
========================= */
function logout() {
    localStorage.removeItem("role");
    window.location.href = "../index.html";
}