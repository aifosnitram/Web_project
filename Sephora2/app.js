import { API, Cart, UI, Storage } from "./lib/index.js";

// --- Elementos del DOM ---
const gridTag = document.getElementById("dynamic-grid");
const cartList = document.querySelector(".cart-items");
const totalTag = document.querySelector(".cart-total");
const searchTag = document.querySelector(".search input");
const cartPanel = document.getElementById("cart-panel");
const loginPanel = document.getElementById("login-panel");
const cartButton = document.getElementById("cart-button");
const modal = document.getElementById("product-modal");

let productList = [];
let selectedProduct = null;
let favorites = Storage.get("favorites") || []; // array de IDs favoritos

// --- Actualizar icono corazón del header ---
const updateFavIcon = () => {
  const favIcon = document.getElementById("fav-button");
  if (!favIcon) return;

  const count = favorites.length;
  favIcon.style.color = count > 0 ? "red" : "";

  let badge = document.getElementById("fav-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "fav-badge";
    badge.style.cssText =
      "position:absolute; top:-6px; right:-8px; background:red; color:white;" +
      "border-radius:50%; font-size:10px; width:16px; height:16px;" +
      "display:flex; align-items:center; justify-content:center; pointer-events:none;";
    favIcon.parentElement.style.position = "relative";
    favIcon.parentElement.appendChild(badge);
  }
  badge.style.display = count > 0 ? "flex" : "none";
  badge.innerText = count;
};

// --- Inicialización ---
const init = async () => {
  productList = await API.getAllProducts();

  UI.renderProducts(gridTag, productList, favorites);
  UI.renderCart(cartList, totalTag, Cart.get());
  updateFavIcon();

  // Restaurar usuario si estaba logueado
  const savedUser = Storage.get("user");
  if (savedUser) {
    document.getElementById("user-text").innerText = `Hola, ${savedUser}`;
  }

  // Abrir/cerrar carrito
  cartButton.addEventListener("click", (e) => {
    e.stopPropagation();
    cartPanel.classList.toggle("open");
    loginPanel.classList.remove("open");
  });

  // Botones de comprar
  document.querySelectorAll('.buy-btn').forEach(btn => {
     btn.addEventListener('click', async () => {
        const userId = Storage.get("user_id");
        if (!userId) {
            alert('Por favor inicie sesión para comprar');
            toggleLogin();
            return;
        }
        const cartItems = Cart.get();
        if (cartItems.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        const totalText = totalTag.innerText;
        const total = parseFloat(totalText.replace('Total: ', '').replace('€', '').trim().replace(',', '.')) || 0;
        
        const success = await API.saveOrder(userId, cartItems, total);
        if (success) {
            alert('Pedido realizado con éxito!');
            deleteCart();
            cartPanel.classList.remove("open");
        } else {
            alert('Error al realizar el pedido.');
        }
     });
  });

  // Delegación de eventos en el grid dinámico
  gridTag.addEventListener("click", (e) => {
    const article = e.target.closest(".product");
    if (!article) return;

    const id = parseInt(article.dataset.id);

    // Clic en corazón → toggle favorito
    if (e.target.classList.contains("heart")) {
      e.stopPropagation();
      const isFav = favorites.includes(id);
      if (isFav) {
        favorites = favorites.filter((fid) => fid !== id);
      } else {
        favorites.push(id);
      }
      Storage.set("favorites", favorites);
      e.target.classList.toggle("active", !isFav);
      updateFavIcon();
      return;
    }

    // Clic en "Añadir al carrito"
    if (e.target.classList.contains("add-cart")) {
      e.stopPropagation();
      const product = productList.find((p) => p.id === id);
      if (product) {
        Cart.add(product);
        UI.renderCart(cartList, totalTag, Cart.get());
        cartPanel.classList.add("open");
      }
      return;
    }

    // Clic en la tarjeta → abrir modal
    const product = productList.find((p) => p.id === id);
    if (product) openModal(product);
  });

  // Buscador dinámico
  if (searchTag) {
    searchTag.addEventListener("input", () => {
      const text = searchTag.value.toLowerCase();
      const filtered = productList.filter(
        (p) =>
          p.tipo.toLowerCase().includes(text) ||
          p.marca.toLowerCase().includes(text),
      );
      UI.renderProducts(gridTag, filtered, favorites);
    });
  }

  // Cerrar paneles al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      cartPanel.classList.contains("open") &&
      !cartPanel.contains(e.target) &&
      e.target !== cartButton
    ) {
      cartPanel.classList.remove("open");
    }

    const userIcon = document.querySelector(".fa-user");
    if (
      loginPanel.classList.contains("open") &&
      !loginPanel.contains(e.target) &&
      e.target !== userIcon
    ) {
      loginPanel.classList.remove("open");
    }
  });

  // Cerrar modal al hacer clic en el fondo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
};

// --- Modal ---
const openModal = (product) => {
  selectedProduct = product;
  document.getElementById("modal-img").src =
    `./img/${product.categoria}/${product.img}`;
  document.getElementById("modal-title").innerText = product.tipo;
  document.getElementById("modal-brand").innerText = product.marca;
  document.getElementById("modal-desc").innerText = product.descripcion || "";
  document.getElementById("modal-price").innerText = `${product.precio}€`;
  modal.classList.add("show");
};

window.closeModal = () => {
  modal.classList.remove("show");
  selectedProduct = null;
};

window.addToCartFromModal = () => {
  if (selectedProduct) {
    Cart.add(selectedProduct);
    UI.renderCart(cartList, totalTag, Cart.get());
    closeModal();
    cartPanel.classList.add("open");
  }
};

// --- Login ---
window.toggleLogin = (e) => {
  if (e) e.stopPropagation();
  loginPanel.classList.toggle("open");
  cartPanel.classList.remove("open");
};

window.login = async () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (user && pass) {
    let result = await API.login(user, pass);
    if (!result || result.error) {
       if (confirm('Usuario no encontrado o credenciales inválidas. ¿Deseas registrarte con este email?')) {
           const nombre = prompt("Nombre:");
           const apellido = prompt("Apellido:");
           const telf = prompt("Teléfono:");
           const direccion = prompt("Dirección:");
           
           result = await API.register({ email: user, password: pass, nombre, apellido, telf, direccion });
           if (!result || result.error) {
              alert("Falló el registro");
              return;
           }
           alert("Registro exitoso!");
       } else {
           return;
       }
    }
    const nombreUsuario = result.persona ? result.persona.nombre : user;
    Storage.set("user", nombreUsuario);
    Storage.set("user_id", result.id);
    document.getElementById("user-text").innerText = `Hola, ${nombreUsuario}`;
    loginPanel.classList.remove("open");
  } else {
     alert("Ingresa usuario y contraseña");
  }
};

window.logout = () => {
  Storage.remove("user");
  Storage.remove("user_id");
  document.getElementById("user-text").innerText = "No logueado";
};

// --- Carrito ---
window.deleteCart = () => {
  Cart.removeAll();
  UI.renderCart(cartList, totalTag, Cart.get());
};

window.aplicarCodigo = () => {
  const code = document.getElementById("codigo").value;
  if (code) {
    Storage.set("codigo", code);
    alert(`Código "${code}" aplicado (lógica de descuento pendiente)`);
  } else {
    alert("Introduce un código de descuento");
  }
};

window.removeFromCart = (index) => {
  Cart.removeAt(index);
  UI.renderCart(cartList, totalTag, Cart.get());
};

// Arrancar la App
init();
