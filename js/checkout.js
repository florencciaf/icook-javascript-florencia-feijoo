//variables
const cashRadioBtn = document.querySelector("#payment-cash");
const cardRadioBtn = document.querySelector("#payment-card");
const cardDOM = document.querySelector(".card");
const checkoutInfo = document.querySelector(".checkout-info");
const checkoutTotal = document.querySelector(".checkout-total"); 

//payment method
cardRadioBtn.addEventListener("click", () => {
    if (cardRadioBtn.checked) {
        cardDOM.innerHTML = `
        <div>
            <label for="card-number">Número*</label><br>
            <input type="tel" name="card-number" maxlength="30" required>
        </div>
        <div>
            <label for="card-name-lastname">Nombre y apellido como figura en la tarjeta*</label><br>
            <input type="text" name="card-name-lastname" required>
        </div>
        <div>
            <label for="card-due-date">Fecha de vencimiento*</label><br>
            <input type="month" name="card-due-date" required>
        </div>
        <div>
            <label for="card-ccv">Código de seguridad*</label><br>
            <input type="tel" name="card-ccv" maxlength="3" required>
        </div>
        `;
    }
});

cashRadioBtn.addEventListener("click", () => {
    if (cashRadioBtn.checked) {
        cardDOM.innerHTML = "";
    } 
});

//checkout info
let cartSummary = [];

const getCartSummary = () => localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

cartSummary = getCartSummary();

const displayCartSummary = cartSummary => {
    for (const item of cartSummary) {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <img src="${item.image}" alt="Producto">
        <div>
            <h4>${item.title}</h4>
            <h5>${item.price} USD</h5>
            <p>Cantidad: ${item.amount}</p>
        </div>
        `;
        checkoutInfo.appendChild(div);
    }
}

displayCartSummary(cartSummary);

const setCheckoutTotal = cartSummary => {
    let tempTotal = 0;
    cartSummary.map(item => {
        tempTotal += item.price * item.amount;
    });
    checkoutTotal.innerText = tempTotal;
}

setCheckoutTotal(cartSummary);