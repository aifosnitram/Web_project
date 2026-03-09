const searchTag = document.querySelector('.search');

const newsletter = document.querySelector('.newsletter-form');
const saberMas = document.querySelectorAll('.saberMas');

const productList = [];

const getProducts = async ()=>{
   const response = await fetch('./data/listas.json');
   const data     = await response.json();
   return data;
}

const renderProducts = (products) => {
   grid.innerHTML = "";
   characters.forEach(e => {
      let template = `    
            <article>
                <img src="./img/${e.image}" alt="">
                <h3>Name:${e.name}</h3>
                <h4>Planet:${e.planet}</h4>
                <h4>Power:${e.power}</h4>
                <button onclick="handleDialog(${e.id})">Ver detalle</button>
            </article>`;
      gridTag.innerHTML += template;
       
   });
}

function info(){
   return alert ("aún no definido");
}

const init = async () => {
    saberMas.addEventListener("click", info);
}
init();

