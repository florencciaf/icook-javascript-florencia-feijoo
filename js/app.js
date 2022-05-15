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

const setCartValues = cart => {
    let tempTotal = 0;
    let itemsTotal = 0; 
    cart.map(item => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount; 
    });
    cartTotal.innerText = tempTotal;
    cartItems.innerText = itemsTotal;
}

const addCartItem = item => {
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
    <img src="${item.image}" alt="Producto">
    <div>
        <h4>${item.title}</h4>
        <h5>${item.price} USD</h5>
        <span class="remove-item" data-id=${item.id}>Remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>
    `;
    cartContent.appendChild(div);
    console.log(cartContent);
}

const showCart = () => {
    cartOverlay.classList.add("transparent-bcg");
    cartDOM.classList.add("show-cart");
}

const hideCart = () => {
    cartOverlay.classList.remove("transparent-bcg");
    cartDOM.classList.remove("show-cart");
}

const setupAPP = () => {
    cart = getCart();
    setCartValues(cart);
    populateCart(cart);
    cartBtn.addEventListener("click", showCart);
    closeCartBtn.addEventListener("click", hideCart);
}

const populateCart = cart => {
    cart.forEach(item => addCartItem(item));
}

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

const getCart = () => {
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
}

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
    `;
    productsDOM.appendChild(displayProducts);
}

//add to cart
setupAPP();

const bagButtons = [...document.querySelectorAll(".bag-btn")];

bagButtons.forEach(btn => {
    let id = btn.dataset.id;
    let inCart = cart.find(product => product.id == id);
    if (inCart) {
        btn.innerText = "Agregado";
        btn.disabled = true;
    } 
    btn.addEventListener("click", e => {
        e.target.innerText = "Agregado";
        e.target.disabled = true;
        //get product from products
        let cartItem = {...products.find(product => product.id == id), amount: 1}; 
        //add product to cart
        cart = [...cart, cartItem];
        //save cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        //set cart values
        setCartValues(cart);
        //display cart item
        addCartItem(cartItem);
        //show cart
        showCart();
    });
});