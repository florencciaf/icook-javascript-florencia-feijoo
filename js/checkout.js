//variables
const inputs = [...document.querySelectorAll("input")]; 
const cashRadioBtn = document.querySelector("#payment-cash");
const cardRadioBtn = document.querySelector("#payment-card");
const cardDOM = document.querySelector(".card");
const houseRadioBtn = document.querySelector("#house");
const flatRadioBtn = document.querySelector("#flat");
const extraDOM = document.querySelector(".extra");
const checkoutInfo = document.querySelector(".checkout-info");
const checkoutTotal = document.querySelector(".checkout-total"); 
const form = document.querySelector(".checkout-form");
const email = document.querySelector("#email");
const firstname = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const dni = document.querySelector("#dni");
const phone = document.querySelector("#phone");
const street = document.querySelector("#street");
const streetNumber = document.querySelector("#number");


//cash or card
cardRadioBtn.addEventListener("click", () => {
    if (cardRadioBtn.checked) {
        cardDOM.innerHTML = `
        <div class="form-control">
            <label for="card-number">Número*</label>
            <input type="tel" name="card-number" maxlength="30" required>
            <i class="fa-regular fa-circle-check"></i>
            <i class="fa-regular fa-circle-xmark"></i>
            <small>Error message</small>
        </div>
        <div class="form-control">
            <label for="card-name-lastname">Nombre y apellido*</label>
            <input type="text" name="card-name-lastname" required>
            <i class="fa-regular fa-circle-check"></i>
            <i class="fa-regular fa-circle-xmark"></i>
            <small>Error message</small>
        </div>
        <div class="form-control">
            <label for="card-due-date">Fecha de vencimiento*</label>
            <input type="month" name="card-due-date" required>
            <small>Error message</small>
        </div>
        <div class="form-control">
            <label for="card-ccv">Código de seguridad*</label>
            <input type="tel" name="card-ccv" maxlength="3" required>
            <i class="fa-regular fa-circle-check"></i>
            <i class="fa-regular fa-circle-xmark"></i>
            <small>Error message</small>
        </div>
        `;
    }
});

cashRadioBtn.addEventListener("click", () => {
    if (cashRadioBtn.checked) {
        cardDOM.innerHTML = "";
    } 
});

//house or flat
flatRadioBtn.addEventListener("click", () => {
    if (flatRadioBtn.checked) {
        extraDOM.innerHTML = `
        <div class="form-control">
            <label for="door">Piso / Puerta</label>
            <input type="text" name="door" maxlength="750" placeholder="Ej. 4 A">
        </div>
        `;
    }
});

houseRadioBtn.addEventListener("click", () => {
    if (houseRadioBtn.checked) {
        extraDOM.innerHTML = "";
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

//validate form
form.noValidate = true;

form.addEventListener("submit", e => {
	e.preventDefault();	
	checkInputs();
});



const checkInputs = () => {
    //variables
	const emailValue = email.value.trim();
	const firstnameValue = firstname.value.trim();
	const lastnameValue = lastname.value.trim();
    const dniValue = dni.value.trim();
    const phoneValue = phone.value.trim();
    const streetValue = street.value.trim();
    const streetNumberValue = streetNumber.value.trim();

    //Regex
    const lettersPattern = /^[A-ZÀ-Ú]+$/i;
    const numbersPattern = /^[0-9]+$/;

    //input validation
    if (emailValue === "") {
        setErrorFor(email, "Este campo es obligatorio.");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Introduzca un email válido.");
    } else {
        setSuccessFor(email);
    }

	if (firstnameValue === "") {
		setErrorFor(firstname, "Este campo es obligatorio.");
	} else if (!lettersPattern.test(firstnameValue)) {
        setErrorFor(firstname, "Introduzca un nombre válido.");
    } else {
		setSuccessFor(firstname);
	}

    if (lastnameValue === "") {
		setErrorFor(lastname, "Este campo es obligatorio.");
	} else if (!lettersPattern.test(lastnameValue)) {
        setErrorFor(lastname, "Introduzca un apellido válido.");
    } else {
		setSuccessFor(lastname);
	}

    if (dniValue === "") {
        setErrorFor(dni, "Este campo es obligatorio.");
    } else if ((!numbersPattern.test(dniValue)) || (dniValue.length < 6)) {
        setErrorFor(dni, "Introduzca un documento válido.");
    } else {
        setSuccessFor(dni);
    }

    if (phoneValue === "") {
        setErrorForPhone(phone, "Este campo es obligatorio.");
    } else if ((!numbersPattern.test(phoneValue)) || (phoneValue.length < 8)) {
        setErrorForPhone(phone, "Introduzca un celular válido.");
    } else {
        setSuccessForPhone(phone);
    }

    if (streetValue === "") {
		setErrorFor(street, "Este campo es obligatorio.");
	} else if (!lettersPattern.test(streetValue)) {
        setErrorFor(street, "Introduzca una calle válida.");
    } else {
		setSuccessFor(street);
	}

    if (streetNumberValue === "") {
        setErrorFor(streetNumber, "Este campo es obligatorio.");
    } else if (!numbersPattern.test(streetNumberValue)) {
        setErrorFor(streetNumber, "Introduzca un número válido.");
    } else {
        setSuccessFor(streetNumber);
    }
}

const setErrorFor = (input, message) => {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	formControl.className = "form-control error";
	small.innerText = message;
}

const setSuccessFor = input => {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

const setErrorForPhone = (input, message) => {
	const formControl = input.parentElement.parentElement;
	const small = formControl.querySelector("small");
	formControl.className = "form-control error";
	small.innerText = message;
}

const setSuccessForPhone = input => {
	const formControl = input.parentElement.parentElement;
	formControl.className = "form-control success";
}
	
const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


inputs.forEach(input => {
    input.addEventListener("focusout", () => {
        checkInputs();
    });
});