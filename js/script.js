let form = document.getElementById("register"),
    input = document.querySelectorAll(".placeholder"),
    passwords = document.querySelectorAll(".password"),
    prevLength = 0,
    data = {};

let error = {
    "first-name": "Only Latin and Cyrillic letters",
    "last-name": "Only Latin and Cyrillic letters",
    "gender": "Choose your gender",
    "username": "[aA-zZ/0-9/_] (from 4 to 35 signs)",
    "password": "Not less than 6 signs",
    "re-password": "Passwords are not equal",
    "email": "example@site.com",
    "phone": "Digits only"
};

function addError(element, message) {
    let error = document.createElement("div");
    error.classList.add("error");
    let text = document.createTextNode(message);
    error.appendChild(text);
    element.parentNode.appendChild(error);
}

function removeError(element) {
    let error = element.parentNode.querySelectorAll(".error");
    for (let i = 0; i < error.length; i++) {
        element.parentNode.removeChild(error[i]);
    }
}


for (let i = 0; i < input.length; i++) {
    input[i].children[0].onfocus = function () {
        this.parentNode.classList.remove("placeholder-down");
        this.parentNode.classList.add("placeholder-up");
        this.style.borderColor = "#00adf7";
        if (this.parentNode.classList.contains("invalid")) addError(this, error[this.id]);
        else removeError(this);
    };
    input[i].children[0].onblur = function () {
        if (!this.value) {
            this.parentNode.classList.remove("placeholder-up");
            this.parentNode.classList.add("placeholder-down");
            if (this.parentNode.classList.contains("invalid")) addError(this, error[this.id]);
            else removeError(this);
        }
        this.style.borderColor = "black";
        if (this.parentNode.classList.contains("invalid")) addError(this, error[this.id]);
        else removeError(this);
    }
}


// function createOption(parent, value) {
//     let option = document.createElement("option");
//     option.value = value;
//     option.innerHTML = value;
//     parent.appendChild(option);
// }
//
// function daysInMonth(month, year) {
//     return new Date(year, month, 0).getDate();
// }
//
// for (let i = new Date().getFullYear(); i >= 1900; i--) {
//     createOption(year, i);
// }
//
// function removeOption(elem) {
//     while (elem.lastChild) {
//         elem.removeChild(elem.lastChild);
//     }
// }
//
// for (let i = 1; i <= 31; i++) {
//     createOption(day, i);
// }

function validate() {
    let element = event.target,
        id = event.target.id,
        value = event.target.value,
        classList = event.target.parentNode.classList;
    // day = document.getElementById("day"),
    // month = document.getElementById("day"),
    // year = document.getElementById("day");


    function valid(value) {
        classList.remove("invalid");
        classList.add("valid");
        data[id] = value;
    }

    function invalid() {
        classList.remove("valid");
        classList.add("invalid");
        data[id] = "";
    }

    if (id == "first-name" || id == "last-name") {
        let pattern = /^[a-zа-яё]+$/i;
        if (value) {
            if (pattern.test(value)) {
                valid(value);
            } else {
                invalid();
            }
        } else {
            classList.remove("valid");
            classList.remove("invalid");
            data[id] = "";
        }
    }

    // if (id == "month" || id == "year") {
    //     removeOption(day);
    //     let maxDay = daysInMonth(month.value, year.value);
    //     console.log(maxDay);
    //     console.log(year.value);
    //     console.log(month.value);
    //     for (let i = 1; i <= maxDay; i++) {
    //         createOption(day, i);
    //     }
    // }

    if (id == "country") {
        if (value) {
            data[id] = value;
        }
    }

    if (element.classList.contains("gender")) {
        data["gender"] = value;
    }

    if (id == "username") {
        let pattern = /[\W]/;
        if (!pattern.test(value) && value && value.length > 4 && value.length < 36) {
            valid(value);
        } else {
            invalid();
        }
    }

    if (id == "password" || id == "re-password") {
        let password = document.getElementById("password").value;
        let rePassword = document.getElementById("re-password").value;

        let pattern = /[а-яА-ЯёЁ]/;
        if (!pattern.test(value) && value.length > 5) {
            classList.remove("invalid");
            classList.add("valid");
        } else {
            classList.remove("valid");
            classList.add("invalid");
        }

        if (password && rePassword) {
            if (password == rePassword) {
                passwords[0].classList.remove("invalid");
                passwords[1].classList.remove("invalid");
                passwords[0].classList.remove("valid");
                passwords[1].classList.remove("valid");
                passwords[0].classList.add("valid");
                passwords[1].classList.add("valid");
                data["password"] = data["re-password"] = password;
            } else {
                passwords[0].classList.remove("valid");
                passwords[1].classList.remove("valid");
                passwords[0].classList.remove("invalid");
                passwords[1].classList.remove("invalid");
                passwords[0].classList.add("invalid");
                passwords[1].classList.add("invalid");
                data["password"] = data["re-password"] = "";
            }
        }
    }

    if (id == "email") {
        let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (pattern.test(value)) {
            valid(value);
        } else {
            invalid();
        }
    }

    if (id == "phone") {
        let pattern = /^[0-9()-]+$/;
        if (element.value.length > prevLength) {
            if (element.value.length == 1) element.value = "(" + element.value;
            if (element.value.length == 4) element.value += ")-";
            if (element.value.length == 9) element.value += "-";
        }
        prevLength = element.value.length;
        if (element.value) {
            if (pattern.test(element.value) && element.value.length == 14) {
                let phoneNumber = "+38" + element.value.substring(1, 4) + element.value.substring(6, 9) + element.value.substring(10);
                valid(phoneNumber);
            } else {
                invalid();
            }
        } else {
            classList.remove("valid");
            classList.remove("invalid");
        }
    }

    console.log(data);
};

form.onsubmit = function () {
    let elements = document.querySelectorAll(".form-element");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains("invalid") || elements[i].classList.contains("required") && !elements[i].classList.contains("valid")) return false;
    }
    return true;
};


addEventListener("input", validate);