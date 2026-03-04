//get html elements
const searchtag = document.getElementById('main-searcbar');

//arrays for beauty categories
const hairCareList = [];

const getItems = async () => {
    const response = await fetch("./data/listas.json");
    const data = await response.json();
    
};

const renderCarousels = (listJSON) => {

};