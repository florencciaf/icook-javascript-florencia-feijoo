//variables
const inputs = [...document.querySelectorAll(".input")]; 
const checkoutInfo = document.querySelector(".checkout-info");
const checkoutTotal = document.querySelector(".checkout-total"); 
const houseRadioBtn = document.querySelector("#house");
const flatRadioBtn = document.querySelector("#flat");
const infoExtra = document.querySelector(".info-extra");
const form = document.querySelector(".checkout-form");
const email = document.querySelector("#email");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const dni = document.querySelector("#dni");
const phone = document.querySelector("#phone");
const street = document.querySelector("#street");
const number = document.querySelector("#number");

//cart summary
let cartSummary = [];

const getCartSummary = () => localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const displayCartSummary = cartSummary => {
    for (const item of cartSummary) {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <img src="${item.image}" alt="Producto">
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <p>Cantidad: ${item.amount}</p>
        </div>
        `;
        checkoutInfo.appendChild(div);
    }
}

const setCheckoutTotal = cartSummary => {
    let tempTotal = 0;
    cartSummary.map(item => {
        tempTotal += item.price * item.amount;
    });
    checkoutTotal.innerText = tempTotal;
}

const setupCheckout = () => {
    cartSummary = getCartSummary();
    displayCartSummary(cartSummary);
    setCheckoutTotal(cartSummary);
}

//house or flat
const shippingDOM = () => {
    flatRadioBtn.addEventListener("click", () => {
        if (flatRadioBtn.checked) {
            infoExtra.innerHTML = `
            <div class="form-control">
                <label for="door">Piso / Puerta</label>
                <input type="text" name="door" maxlength="750" placeholder="Ej. 4 A">
            </div>
            `;
        }
    });

    houseRadioBtn.addEventListener("click", () => {
        if (houseRadioBtn.checked) {
            infoExtra.innerHTML = "";
        } 
    });
}

//check form validity
const validateForm = () => {
    form.noValidate = true;
    form.addEventListener("submit", e => {
        e.preventDefault();	
        inputs.forEach(input => {
            checkInputs(input);
        });
        if (form.checkValidity()) {
            swal({
                title: "Te estamos redirigiendo a Mercado Pago",
                text: "¡Gracias por elegirnos!",
                button: false
            }).then(setTimeout(() => {
                mercadopago();
            }, 3000));
        }
    });
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            checkInputs(input);
        });
    });
}

const checkInputs = input => {
    //variables
    const emailValue = email.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const dniValue = dni.value.trim();
    const phoneValue = phone.value.trim();
    const streetValue = street.value.trim();
    const numberValue = number.value.trim();

    //regex
    const lettersPattern = /^[A-ZÀ-Ú]+$/i;
    const numbersPattern = /^[0-9]+$/;

    //logic
    switch (input) {
        case email:
            if (emailValue === "") {
                setErrorFor(email, "Este campo es obligatorio.");
            } else if (!isEmail(emailValue)) {
                setErrorFor(email, "Introduzca un email válido.");
            } else {
                setSuccessFor(email);
            }
            break;

        case firstname:
            if (firstnameValue === "") {
                setErrorFor(firstname, "Este campo es obligatorio.");
            } else if (!lettersPattern.test(firstnameValue)) {
                setErrorFor(firstname, "Introduzca un nombre válido.");
            } else {
                setSuccessFor(firstname);
            }
            break;

        case lastname:
            if (lastnameValue === "") {
                setErrorFor(lastname, "Este campo es obligatorio.");
            } else if (!lettersPattern.test(lastnameValue)) {
                setErrorFor(lastname, "Introduzca un apellido válido.");
            } else {
                setSuccessFor(lastname);
            }
            break;

        case dni:
            if (dniValue === "") {
                setErrorFor(dni, "Este campo es obligatorio.");
            } else if ((!numbersPattern.test(dniValue)) || (dniValue.length < 6)) {
                setErrorFor(dni, "Introduzca un documento válido.");
            } else {
                setSuccessFor(dni);
            }
            break;
            
        case phone:        
            if (phoneValue === "") {
                setErrorForPhone(phone, "Este campo es obligatorio.");
            } else if ((!numbersPattern.test(phoneValue)) || (phoneValue.length < 8)) {
                setErrorForPhone(phone, "Introduzca un celular válido.");
            } else {
                const formControl = phone.parentElement.parentElement;
                formControl.className = "form-control success";
            }
            break;

        case street:
            if (streetValue === "") {
                setErrorFor(street, "Este campo es obligatorio.");
            } else if (!lettersPattern.test(streetValue)) {
                setErrorFor(street, "Introduzca una calle válida.");
            } else {
                setSuccessFor(street);
            }
            break;

        case number: 
            if (numberValue === "") {
                setErrorFor(number, "Este campo es obligatorio.");
            } else if (!numbersPattern.test(numberValue)) {
                setErrorFor(number, "Introduzca un número válido.");
            } else {
                setSuccessFor(number);
            }
            break;

        default: 
            console.log("Switch error");
            break;
    }
}

//validate email
const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

//success-error messages
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

//payment
const mercadopago = async () => {
    const cartSummaryToMap = cartSummary.map(item => {
        let newItem =     
        {
            title: item.title,
            description: "",
            picture_url: item.image,
            category_id: item.id,
            quantity: item.amount,
            currency_id: "ARS",
            unit_price: item.price
        }
        return newItem;
    });

    try {
        let response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                Authorization: "Bearer TEST-6296233006857925-060821-f03fa770269b05fac825bb2edd76f32f-46022354"
            },
            body: JSON.stringify({
                items: cartSummaryToMap,
                back_urls: {
                    "success": "http://127.0.0.1:5500/index.html",
                    "failure": "http://127.0.0.1:5500/index.html",
                    "pending": "http://127.0.0.1:5500/index.html"
                },
                auto_return: "approved"
            })
        });
        let data = await response.json();
        window.open(data.init_point, "_self");
    } catch (error) {
        console.log(error);
    }
}

//execution
setupCheckout();
shippingDOM();
validateForm();