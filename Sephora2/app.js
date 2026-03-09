const searchTag = document.querySelector('.search');
const home = document.querySelector('.header-top');

const newsletter = document.querySelector('.newsletter-form');
const saberMas = document.querySelectorAll('.saberMas');
const subscribe = document.getElementById("subscribe");

let productList = [];
let cart = [];

const getProducts = async () => {
    const list = await fetch('./data/listas.json')
        .then(response => response.json())
        .then((collection) => {
            console.log("name", collection.nameCollection)
        });
    //renderProducts(collection.products)});
    productList = list;
}

const renderProducts = (products) => {
    grid.innerHTML = "";
    products.forEach(i => {
        let template = `    
            <article>
                <img src="./img/${i.img}" alt="">
                <h3>Name:${i.tipo}</h3>
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
    //console.log(text);
    if (text.length === 0) {
        renderBooks(bookList);
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
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartContainer.innerHTML = "";
    cart.forEach(pro => {
        cartContainer.innerHTML += `<div>${i.tipo} - ${i.precio}</div>`;
    });

}

function deleteCart() {
    booksCart = [];
    cartContainer.innerHTML = "";
    localStorage.removeItem("booksCart");

}
const init = async () => {
    productList = await getProducts();


    saberMas.addEventListener("click", info);
    home.addEventListener("click", init);
    subscribe.addEventListener("click", () => {
        console.log("check subscribe");
        alert("no configurado");
    })
}
init();

