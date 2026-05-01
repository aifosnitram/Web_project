// lib/ui.js
export const UI = {
  // favorites: array de IDs ya guardados como favoritos
  renderProducts(container, products, favorites = []) {
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p>No se encontraron productos.</p>`;
      return;
    }

    products.forEach((p) => {
      const isFav = favorites.includes(p.id);
      container.innerHTML += `
        <div class="product" data-id="${p.id}">
          <span class="badge">${p.categoria || "Novedad"}</span>
          <i class="fa fa-heart heart${isFav ? " active" : ""}"></i>
          <img src="./img/${p.categoria}/${p.img}" alt="${p.tipo}" />
          <p class="product-name">${p.tipo}</p>
          <p>${p.marca}</p>
          <p class="price">${p.precio}€</p>
          <button class="add-cart">Añadir al carrito</button>
        </div>
      `;
    });
  },

  renderCart(container, totalTag, cart) {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = `<li style="color:#999; font-size:14px; padding:12px 0;">El carrito está vacío</li>`;
    } else {
      cart.forEach((p, index) => {
        container.innerHTML += `
          <li>
            <span>${p.tipo} — <strong>${p.precio}€</strong></span>
            <button onclick="removeFromCart(${index})" style="float:right; background:none; border:none; cursor:pointer; color:#999; font-size:16px;">✕</button>
          </li>
        `;
      });
    }

    const total = cart.reduce((acc, p) => acc + (p.precio || 0), 0);
    totalTag.innerHTML = `<strong>Total: ${total.toFixed(2)}€</strong>`;
  },
};
