//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//cart
let cart = [];

//local storage
const productsList =   [{id: 1, title: "Sushi salad", price: 8, image: "images/product-1.jpg"},
                        {id: 2, title: "Pasta", price: 4, image: "images/product-2.jpg"},
                        {id: 3, title: "Sopa", price: 4, image: "images/product-3.jpg"},
                        {id: 4, title: "Avocado toast", price: 6, image: "images/product-4.jpg"},
                        {id: 5, title: "Paella", price: 8, image: "images/product-5.jpg"},
                        {id: 6, title: "Salmón rosado", price: 8, image: "images/product-6.jpg"},
                        {id: 7, title: "Ensalada", price: 6, image: "images/product-7.jpg"},
                        {id: 8, title: "Pizza", price: 6, image: "images/product-8.jpg"}];

localStorage.setItem("productsList", JSON.stringify(productsList));

const products = JSON.parse(localStorage.getItem("productsList"));

//display products
for (const product of products) {
    let displayProducts = document.createElement("article");
    displayProducts.className = "product";
    displayProducts.innerHTML = `
    <div class="img-container">
        <img src=${product.image} alt="Producto" class="product-img">
        <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            Agregar al carrito
        </button>
    </div>
    <h3>${product.title}</h3>
    <h4>${product.price} USD</h4>
    `
    productsDOM.appendChild(displayProducts);
}

//show cart
cartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("transparent-bcg");
    cartDOM.classList.add("show-cart");
});

//hide cart
closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("transparent-bcg");
    cartDOM.classList.remove("show-cart");
});

//add to cart
const bagButtons = [...document.querySelectorAll(".bag-btn")];

bagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        cartOverlay.classList.add("transparent-bcg");
        cartDOM.classList.add("show-cart");
    });   
}); 

bagButtons.forEach(btn => {
    let id = btn.dataset.id;
    let inCart = cart.find(product => product.id === id);
    if (inCart) {
        btn.innerText = "Agregado";
        btn.disabled = true;
    } else {
        btn.addEventListener("click", e => {
            e.target.innerText = "Agregado";
            e.target.disabled = true;
            
            //get product from products
            let cartItem = products.find(product => product.id === id); 
            console.log(cartItem); 
        });
    }
});