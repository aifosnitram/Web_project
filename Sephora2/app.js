const searchTag = document.querySelector('.search input');
const home = document.querySelector('.header-top');
const cartbtn = document.querySelector('#cart-button');
const gridTag = document.querySelector('.product-grid');

const newsletter = document.querySelector('.newsletter-form');
const saberMas = document.querySelectorAll('.saberMas');
const subscribe = document.getElementById("subscribe");

let productList = [];
let cart = [];

async function fetchProducts() {
    try {
        const [response1, response2, response3, response4, response5] = await Promise.all([
            fetch("./json/perfume.json"),
            fetch("./json/champus.json"),
            fetch("./json/makeup.json"),
            fetch("./json/skincare.json"),
            fetch("./json/cepillos.json")
        ]);

        const perfume = (await response1.json()).perfume;
        const champus = (await response2.json()).champus;
        const makeup = (await response3.json()).makeup;
        const skincare = (await response4.json()).skincare;
        const cepillos = (await response5.json()).cepillos;

        // Combine all fetched products into a single list for search + cart
        const allProducts = [...perfume, ...champus, ...makeup, ...skincare, ...cepillos];

        console.log("Here is the data combined:", allProducts);

        // Keep the same render approach you already used in the page (if needed)
        // renderToPage(perfume, champus, makeup, skincare, cepillos);

        return allProducts;
    } catch (error) {
        console.error("Oops, something went wrong:", error);
        return [];
    }
}

const renderProducts = (products) => {
    if (!gridTag) return;
    gridTag.innerHTML = "";
    products.forEach(i => {
        const template = `    
            <article>
                <img src="./img/${i.img || ""}" alt="">
                <h3>Name: ${i.tipo}</h3>
                <h4>${i.marca}</h4>
                <button onclick="addToCart(${i.id})">Añadir al carrito</button>
            </article>`;
        gridTag.innerHTML += template;
    });
}

function info() {
    return alert("aún no definido");
}

const searchTop = () => {
    const text = searchTag.value.toUpperCase();
    if (text.length === 0) {
        renderProducts(productList);
        return;
    }

    if (text.length < 3) return;

    const newList = productList.filter(pro =>
        pro.tipo.toUpperCase().includes(text) ||
        pro.marca.toUpperCase().includes(text)
    );
    renderProducts(newList);
};

const addToCart = (id) => {
    const product = productList.find(pro => pro.id === id);
    if (!product) return;
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cartContainer = document.querySelector('#cart-container');
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    cart.forEach(pro => {
        cartContainer.innerHTML += `<div>${i.tipo} - ${i.precio}</div>
        <h2>Total: ${cart.reduce((total, pro) => total + pro.precio, 0)}€</h2>
        <button onclick="deleteCart()">Vaciar carrito</button>`;
    });

    const total = cart.reduce((total, pro) => total + (pro.precio || 0), 0);
    cartContainer.innerHTML += `<h2>Total: ${total}€</h2>`;
    cartContainer.innerHTML += `<button onclick="deleteCart()">Vaciar carrito</button>`;
}

function deleteCart() {
    cart = [];
    const cartContainer = document.querySelector('#cart-container');
    if (cartContainer) cartContainer.innerHTML = "";
    localStorage.removeItem("cart");
}

const init = async () => {
    productList = await fetchProducts();

    saberMas.forEach(el => el.addEventListener("click", info));
    home.addEventListener("click", init);
    subscribe.addEventListener("click", () => {
        console.log("check subscribe");
        alert("no configurado");
    });
    cartbtn.addEventListener("click", renderCart);

    /*    // render initial products if any
      renderProducts(productList);  */
}
init();

