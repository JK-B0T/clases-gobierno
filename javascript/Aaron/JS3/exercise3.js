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
        let isFormComplete = true;
        inputArray.map((element) => {
            if (element.value === null && !element.classList.contains("is-invalid")) {
                element.classList.toggle("is-invalid");
                if (element.classList.contains("is-valid")) {
                    element.classList.toggle("is-valid");
                }
                isFormComplete = false;
            } else if (element.value !== null && !element.classList.contains("is-valid")) {
                if (element.classList.contains("is-invalid")) {
                    element.classList.toggle("is-invalid");
                }
                element.classList.toggle("is-valid");
            }

            if (isFormComplete = true) {
                resertform();
            }
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