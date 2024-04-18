"use strict";

// Edita sólo este fichero

window.addEventListener("DOMContentLoaded", main, false);

function main () {
    const imgPreview = document.querySelector("#imgPreview");
    const input = document.querySelector("#image");
    const form = document.querySelector("#newEvent");
    const eventsContainer = document.querySelector("#eventsContainer");

    const inputArray = Array.from(document.querySelectorAll("input:not([type='button'])"));
    inputArray.splice(2, 0, document.querySelector("textarea"));

    form.addEventListener("submit", checkInputsValidation, false);

    function checkInputsValidation() {
        let isFormValid = true;

        inputArray.map((element) => {
            console.log(element, element.value);
            if (element.value === "") {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("is-valid")) {
                    element.classList.remove("is-valid");                  
                }
            } else {
                if (!element.classList.contains("is-valid")) {
                    element.classList.add("is-valid");
                }
                if (element.classList.contains("is-invalid")) {
                    element.classList.remove("is-invalid");                  
                }
            } 
            if (element.classList.contains("is-invalid")) {
                isFormValid = false;
            }  
        });

        if (isFormValid === true) {
            resetForm ();
            return isFormValid;
        } else {
            return isFormValid;
        }
    }

    function resetForm () {
        inputArray.map((element) => {
            if (element.classList.contains("is-valid")) {
                element.classList.remove("is-valid");
            } else if (element.classList.contains("is-invalid")){
                element.classList.remove("is-invalid");
            }
            imgPreview.classList.add("d-none");
            form.reset();
        });
    }

    function createEvent () {
        let container = document.createElement("div");
        container.setAttribute("class", "card");

        let element = document.createElement("img");
        element.setAttribute("class", "card-img-top");
        element.setAttribute("src", imgPreview.src);
        container.append(element);

        element = document.createElement("div");
        element.setAttribute("class", "card-body");

        let childElement = document.createElement("h4");
        childElement.setAttribute("class", "card-title");
        let elementText = document.createTextNode("Nombre del evento");
        childElement.append(elementText);
        element.append(childElement);

        childElement = document.createElement("p");
        childElement.setAttribute("class", "card-text");
        elementText = document.createTextNode("Descripción");
    }

    input.addEventListener("change", (e) => {
        const file = input.files[0];

        if (file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener("load", e => {
                imgPreview.classList.remove("d-none");
                imgPreview.src = reader.result;
            })
        }
    }, false);
}