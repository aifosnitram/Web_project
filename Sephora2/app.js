// app.js
import { API } from "./lib/api.js";
import { UI } from "./lib/ui.js";

// --- Global State ---
let productList = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let selectedProduct = null;

// --- DOM Elements ---
const gridTag = document.getElementById("dynamic-grid");
const cartList = document.querySelector(".cart-items");
const totalTag = document.querySelector(".cart-total strong");
const cartPanel = document.getElementById("cart-panel");
const searchTag = document.getElementById("search-input");
const modal = document.getElementById("product-modal");

// --- Cart Logic (Persistente) ---
window.Cart = {
  get: () => JSON.parse(localStorage.getItem("cart")) || [],
  add: (product) => {
    const cart = window.Cart.get();
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  removeAt: (index) => {
    const cart = window.Cart.get();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  removeAll: () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("applied_promo"); // Limpiar promo al vaciar
  },
  total: () => {
    const cart = window.Cart.get();
    return cart.reduce((acc, p) => acc + parseFloat(p.precio), 0);
  },
};

const Storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key),
};

const updateFavIcon = () => {
  const favIcon = document.getElementById("fav-button");
  let badge = document.getElementById("fav-badge");
  if (!badge) {
    if (!favIcon) return;
    badge = document.createElement("span");
    badge.id = "fav-badge";
    badge.style.cssText =
      "position:absolute; top:-6px; right:-8px; background:red; color:white;" +
      "border-radius:50%; font-size:10px; width:16px; height:16px;" +
      "display:flex; align-items:center; justify-content:center; pointer-events:none;";
    favIcon.parentElement.style.position = "relative";
    favIcon.parentElement.appendChild(badge);
  }
  if (badge) {
    badge.innerText = favorites.length;
    badge.style.display = favorites.length > 0 ? "flex" : "none";
  }
};

const init = async () => {
  // Cargar productos para el grid si existe
  if (gridTag) {
    productList = await API.getAllProducts();
    UI.renderProducts(gridTag, productList, favorites);
  }
  
  if (cartList && totalTag) UI.renderCart(cartList, totalTag, Cart.get());
  updateFavIcon();

  // Lógica de página específica
  if (window.location.href.includes("cesta_nueva.html")) {
    cargarCesta();
  }

  // Listeners para el grid dinámico
  if (gridTag) {
    gridTag.addEventListener("click", (e) => {
      const card = e.target.closest(".product");
      if (!card) return;
      const id = parseInt(card.dataset.id);

      // Favoritos
      if (e.target.classList.contains("heart")) {
        if (favorites.includes(id)) {
          favorites = favorites.filter((favId) => favId !== id);
          e.target.classList.remove("active");
        } else {
          favorites.push(id);
          e.target.classList.add("active");
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavIcon();
        return;
      }

      // Añadir al carrito
      if (e.target.classList.contains("add-cart")) {
        const product = productList.find((p) => p.id === id);
        Cart.add(product);
        if (cartList && totalTag) {
            UI.renderCart(cartList, totalTag, Cart.get());
            if (cartPanel) cartPanel.classList.add("open");
        }
        return;
      }

      // Abrir modal
      const product = productList.find((p) => p.id === id);
      if (product) openModal(product);
    });
  }

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

  // Filtrado por categorías del menú
  document.querySelectorAll(".main-cat").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const catId = parseInt(link.dataset.id);

      if (catId) {
        const filtered = productList.filter((p) => p.categoria_id == catId);
        UI.renderProducts(gridTag, filtered, favorites);
        gridTag.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Redirección al carrito principal
  const cartIcon = document.getElementById("cart-button");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = "cesta_nueva.html";
    });
  }

  // Cerrar paneles al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (cartPanel && !cartPanel.contains(e.target) && !e.target.id?.includes("cart-button") && !e.target.classList.contains("add-cart")) {
      cartPanel.classList.remove("open");
    }
  });

  // Cerrar modal al hacer clic en el fondo
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const btnFinalLogin = document.getElementById("btn-final-login");
  if (btnFinalLogin) {
    btnFinalLogin.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value.trim();
      
      if (!email || !pass) {
        alert("Por favor, rellena todos los campos");
        return;
      }

      const check = await API.checkEmail(email);
      
      if (check.exists) {
        const result = await API.login(email, pass);
        if (result && !result.error) {
          const nombreUsuario = result.persona && result.persona.nombre ? result.persona.nombre : email;
          Storage.set("user", nombreUsuario);
          Storage.set("user_id", result.id);
          alert("¡Bienvenido de nuevo!");
          window.location.href = "index.html";
        } else {
          alert("Error de login: " + (result ? result.error : "Credenciales inválidas"));
        }
      } else {
        const result = await API.register({
          email,
          password: pass,
          nombre: "Nuevo",
          apellido: "Usuario",
          telf: "000000000",
          direccion: "Pendiente"
        });
        
        if (result && !result.error) {
          Storage.set("user", "Nuevo Usuario");
          Storage.set("user_id", result.id);
          alert("¡Cuenta creada y sesión iniciada!");
          window.location.href = "index.html";
        } else {
          alert("Error al crear la cuenta: " + (result ? result.error : "Respuesta vacía"));
        }
      }
    });
  }

  // Lógica de cupones en la cesta principal
  const btnPromo = document.querySelector(".btn-promo");
  if (btnPromo) {
    btnPromo.addEventListener("click", () => {
      const code = document.getElementById("promo-code").value.trim().toUpperCase();
      if (code === "BAG" || code === "SEPHORA10") {
        Storage.set("applied_promo", code);
        cargarCesta(); // Recalcular con el nuevo código
        alert(`¡Código ${code} aplicado correctamente!`);
      } else if (code === "") {
        alert("Introduce un código");
      } else {
        alert("Código no válido");
      }
    });
  }

  // Lógica para el botón CONFIRMAR en la cesta
  const btnConfirmar = document.querySelector(".btn-confirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {
      const userId = Storage.get("user_id");
      if (!userId) {
        alert("Inicia sesión para finalizar la compra");
        window.location.href = "login_nuevo.html";
        return;
      }
      const cartItems = Cart.get();
      const totalStr = document.getElementById("subtotal")?.innerText || "0";
      const total = parseFloat(totalStr);
      const success = await API.saveOrder(userId, cartItems, total);
      if (success) {
        alert("¡Pedido confirmado!");
        Cart.removeAll();
        cargarCesta();
      } else {
        alert("Error al procesar el pedido");
      }
    });
  }
};

// --- Modal ---
const openModal = (product) => {
  selectedProduct = product;
  if (!modal) return;
  document.getElementById("modal-img").src =
    `./img/${product.categoria}/${product.img}`;
  document.getElementById("modal-title").innerText = product.tipo;
  document.getElementById("modal-brand").innerText = product.marca;
  document.getElementById("modal-desc").innerText = product.descripcion || "";
  document.getElementById("modal-price").innerText = `${product.precio}€`;
  modal.classList.add("show");
};

window.closeModal = () => {
  if (modal) modal.classList.remove("show");
  selectedProduct = null;
};

window.addToCartFromModal = () => {
  if (selectedProduct) {
    Cart.add(selectedProduct);
    if (cartList && totalTag) UI.renderCart(cartList, totalTag, Cart.get());
    closeModal();
    if (cartPanel) cartPanel.classList.add("open");
  }
};

// --- Login ---
window.toggleLogin = (e) => {
  if (e) e.stopPropagation();
  window.location.href = "login_nuevo.html";
};

window.logout = () => {
  Storage.remove("user");
  Storage.remove("user_id");
  const userText = document.getElementById("user-text");
  if (userText) userText.innerText = "No logueado";
};

// --- Carrito ---
window.deleteCart = () => {
  Cart.removeAll();
  if (cartList && totalTag) UI.renderCart(cartList, totalTag, Cart.get());
  if (window.location.href.includes("cesta_nueva.html")) cargarCesta();
};

window.aplicarCodigo = () => {
  const code = document.getElementById("codigo")?.value.trim().toUpperCase();
  if (code === "BAG" || code === "SEPHORA10") {
    Storage.set("applied_promo", code);
    // Si estamos en la home, actualizar el total del panel lateral
    if (cartList && totalTag) UI.renderCart(cartList, totalTag, Cart.get());
    alert(`¡Código ${code} aplicado! Se verá reflejado en tu cesta.`);
  } else {
    alert("Código no válido");
  }
};

window.removeFromCart = (index) => {
  Cart.removeAt(index);
  if (cartList && totalTag) UI.renderCart(cartList, totalTag, Cart.get());
};

// --- Utils para Cesta ---
function actualizarBarraEnvio(total) {
  const meta = 30;
  const porcentaje = Math.min((total / meta) * 100, 100);
  const barra = document.getElementById("shipping-fill");
  const mensaje = document.getElementById("shipping-msg");

  if (barra) barra.style.width = porcentaje + "%";
  if (mensaje) {
    if (total >= meta) {
      mensaje.innerText = "¡Envío GRATIS conseguido!";
    } else {
      mensaje.innerText = `Faltan ${(meta - total).toFixed(2)} € para el envío GRATIS`;
    }
  }
}

async function cargarCesta() {
  const productos = Cart.get();
  let subtotal = 0;
  const contenedor = document.getElementById("lista-productos-cesta");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  productos.forEach((prod, index) => {
    subtotal += parseFloat(prod.precio);
    contenedor.innerHTML += `
            <div class="product-card">
                <div class="product-info">
                    <h3>${prod.nombre || prod.tipo}</h3>
                    <p class="price">${prod.precio} €</p>
                </div>
                <button class="btn-remove" data-index="${index}">Eliminar</button>
            </div>`;
  });

  contenedor.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      Cart.removeAt(idx);
      cargarCesta();
    });
  });

  // Aplicar promoción guardada si existe
  const savedPromo = Storage.get("applied_promo");
  let total = subtotal;
  if (savedPromo === "BAG") {
    total = subtotal * 0.85; // 15% desc
  } else if (savedPromo === "SEPHORA10") {
    total = subtotal * 0.90; // 10% desc
  }

  const subtotalElem = document.getElementById("subtotal");
  if (subtotalElem) subtotalElem.innerText = total.toFixed(2);
  
  // Mostrar cuál código está aplicado si hay input
  const promoInput = document.getElementById("promo-code");
  if (promoInput && savedPromo) promoInput.value = savedPromo;

  actualizarBarraEnvio(subtotal);
}

// Evento para cerrar el Carrito
window.closeCart = () => {
  if (cartPanel) cartPanel.classList.remove("open");
};

document.addEventListener("DOMContentLoaded", init);
