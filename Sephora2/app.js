const searchTag = document.querySelector(".search input");
const home = document.querySelector(".header-top");
const cartbtn = document.querySelector("#cart-button");
const gridTag = document.querySelector(".product-grid");
const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");

const newsletter = document.querySelector(".newsletter-form");
const saberMas = document.querySelectorAll(".saberMas");
const subscribe = document.getElementById("subscribe");

let productList = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let codigo = localStorage.getItem("codigo") || "";

// 🔹 FETCH PRODUCTOS
async function fetchProducts() {
  try {
    const [response1, response2, response3, response4, response5] =
      await Promise.all([
        fetch("./json/perfume.json"),
        fetch("./json/champus.json"),
        fetch("./json/makeup.json"),
        fetch("./json/skincare.json"),
        fetch("./json/cepillos.json"),
      ]);

    const perfume = (await response1.json()).perfume;
    const champus = (await response2.json()).champus;
    const makeup = (await response3.json()).makeup;
    const skincare = (await response4.json()).skincare;
    const cepillos = (await response5.json()).cepillos;

    const allProducts = [
      ...perfume,
      ...champus,
      ...makeup,
      ...skincare,
      ...cepillos,
    ];

    // abrir/cerrar carrito
    cartButton.addEventListener("click", () => {
      cartPanel.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!cartPanel.contains(e.target) && !cartButton.contains(e.target)) {
        cartPanel.classList.remove("open");
      }
    });

    return allProducts;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// 🔹 RENDER PRODUCTOS
const renderProducts = (products) => {
  if (!gridTag) return;
  gridTag.innerHTML = "";

  products.forEach((i) => {
    const template = `    
      <article>
        <img src="./img/${i.categoria}/${i.img || ""}" alt="">
        <h3>${i.tipo}</h3>
        <h4>${i.marca}</h4>
        <p>${i.precio}€</p>
        <button onclick="addToCart(${i.id})">Añadir al carrito</button>
      </article>`;
    gridTag.innerHTML += template;
  });
};

// 🔹 AÑADIR AL CARRITO
const addToCart = (id) => {
  const product = productList.find((pro) => pro.id === id);
  if (!product) return;

  cart.push(product);
  guardarCarrito();
  renderCart();
};

// 🔹 GUARDAR
function guardarCarrito() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🔹 RENDER CARRITO
function renderCart() {
  const cartList = document.querySelector(".cart-items");
  const totalTag = document.querySelector(".cart-total");

  if (!cartList || !totalTag) return;

  cartList.innerHTML = "";

  cart.forEach((pro) => {
    cartList.innerHTML += `<li>${pro.tipo} - ${pro.precio}€</li>`;
  });

  let total = cart.reduce((acc, pro) => acc + (pro.precio || 0), 0);

  // 🎁 OFERTA BAG
  if (total > 99 && codigo === "BAG") {
    const existeMini = cart.find((p) => p.tipo === "Mini x6");

    if (!existeMini) {
      cart.push({
        tipo: "Mini x6 (Regalo)",
        precio: 0,
      });
    }
  }

  totalTag.innerHTML = `<strong>Total: ${total}€</strong>`;

  guardarCarrito();
}

// 🔹 VACIAR CARRITO
function deleteCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

// 🔹 CODIGO DESCUENTO
function aplicarCodigo() {
  const input = document.getElementById("codigo").value;

  codigo = input;
  localStorage.setItem("codigo", codigo);

  renderCart();
}

// ================= LOGIN FALSO =================
const loginPanel = document.getElementById("login-panel");

function toggleLogin() {
  const panel = document.getElementById("login-panel");
  panel.classList.toggle("open");
}

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const userText = document.getElementById("user-text");

  if (user === "" || pass === "") {
    userText.innerText = " Rellena usuario y contraseña";
    userText.style.color = "orange";
    return;
  }

  localStorage.setItem("user", user);
  userText.innerText = " Bienvenido " + user;
  userText.style.color = "green";

  alert("Login correcto");

  document.getElementById("login-panel").classList.remove("open");
}

function logout() {
  localStorage.removeItem("user");
  document.getElementById("user-text").innerText = "No logueado";

  // 🔥 cerrar panel login
  document.getElementById("login-panel").classList.remove("open");
}

// ================= MODAL PRODUCTO =================
let currentProduct = null;

function openModal(product) {
  currentProduct = product;

  document.getElementById("modal-img").src =
    `./img/${product.categoria}/${product.img}`;
  document.getElementById("modal-title").innerText = product.tipo;
  document.getElementById("modal-brand").innerText = product.marca;
  document.getElementById("modal-desc").innerText =
    product.descripcion || "Sin descripción";
  document.getElementById("modal-price").innerText = product.precio + "€";

  document.getElementById("product-modal").classList.add("show");
}

function closeModal() {
  document.getElementById("product-modal").classList.remove("show");
}

function addToCartFromModal() {
  if (currentProduct) {
    cart.push(currentProduct);
    guardarCarrito();
    renderCart();
  }
  closeModal();
}

// ================= CLICK PRODUCTO =================
document.addEventListener("click", (e) => {
  const card = e.target.closest("article");
  if (!card) return;

  const index = [...document.querySelectorAll("article")].indexOf(card);
  const product = productList[index];

  if (product) openModal(product);
});

// ================= FAVORITOS =================
let favorites = JSON.parse(localStorage.getItem("fav")) || [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("heart")) {
    e.target.classList.toggle("active");

    const index = [...document.querySelectorAll(".heart")].indexOf(e.target);
    const product = productList[index];

    const exists = favorites.find((f) => f.id === product.id);

    if (exists) {
      favorites = favorites.filter((f) => f.id !== product.id);
    } else {
      favorites.push(product);
    }

    localStorage.setItem("fav", JSON.stringify(favorites));
  }
});

// ================= CERRAR LOGIN AL HACER CLICK FUERA =================
document.addEventListener("click", (e) => {
  const panel = document.getElementById("login-panel");
  const icon = document.querySelector(".fa-user");

  if (!panel || !icon) return;

  const isClickInsidePanel = panel.contains(e.target);
  const isClickOnIcon = icon.contains(e.target);

  if (!isClickInsidePanel && !isClickOnIcon) {
    panel.classList.remove("open");
  }
});
// 🔹 BUSCADOR
const searchTop = () => {
  const text = searchTag.value.toUpperCase();

  if (text.length === 0) {
    renderProducts(productList);
    return;
  }

  if (text.length < 3) return;

  const newList = productList.filter(
    (pro) =>
      pro.tipo.toUpperCase().includes(text) ||
      pro.marca.toUpperCase().includes(text),
  );

  renderProducts(newList);
};

// 🔹 INFO
function info() {
  alert("aún no definido");
}

// 🔹 INIT
const init = async () => {
  productList = await fetchProducts();

  renderProducts(productList);
  renderCart();

  saberMas.forEach((el) => el.addEventListener("click", info));

  subscribe.addEventListener("click", () => {
    alert("no configurado");
  });

  if (searchTag) searchTag.addEventListener("input", searchTop);
};

init();
