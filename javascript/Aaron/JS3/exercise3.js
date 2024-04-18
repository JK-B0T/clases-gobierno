"use strict";

// Edita sólo este fichero

window.addEventListener("DOMContentLoaded", main, false);

function main () {
    const imgPreview = document.querySelector("#imgPreview");
    const input = document.querySelector("#image");
    const form = document.querySelector("#newEvent");

    const inputArray = Array.from(document.querySelectorAll("input:not([type='button'])"));
    inputArray.push(document.querySelector("textarea"));

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