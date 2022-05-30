const cashRadioBtn = document.querySelector("#payment-cash");
const cardRadioBtn = document.querySelector("#payment-card");
const cardDOM = document.querySelector(".card");

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
        `
    }
});

cashRadioBtn.addEventListener("click", () => {
    if (cashRadioBtn.checked) {
        cardDOM.innerHTML = "";
    } 
});