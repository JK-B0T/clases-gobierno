"use strict";
// Ejemplo de acceso a servicios web con clases y promesas (async await)

let products = [];
let productService = new ProductService();
let form;
let imgPreview;

function showProducts() {
    let container = document.getElementById("productContainer");
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    products.forEach(p => {
        appendProduct(p, container);
    });
}

function appendProduct(p, container) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = p.name;

    let tdDesc = document.createElement("td");
    tdDesc.innerText = p.description;

    let tdPhoto = document.createElement("td");

    let img = document.createElement("img");
    img.src = `${SERVER}/${p.photo}`;
    tdPhoto.appendChild(img);

    let tdDelete = document.createElement("td");
    let buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    tdDelete.appendChild(buttonDelete);

    buttonDelete.addEventListener('click', async event => {
        deleteProduct(p, tr)
    });

    tr.appendChild(tdPhoto);
    tr.appendChild(tdName)
    tr.appendChild(tdDesc);
    tr.appendChild(tdDelete);

    container.appendChild(tr);
}

async function deleteProduct(p, tr) {
    try{
        await productService.delete(p.id);
        tr.remove();
        let index = products.indexOf(p);
        products.splice(index, 1);
    } catch(e) {
        console.error("Error al borrar el producto " + p.id);
    }
}

async function getProducts() {
    products = await productService.getAll();
    showProducts();
}

async function addProduct(product) {
    const prodResp = await productService.post(product);
    products.push(prodResp);
    showProducts(); // Redibujamos todos los productos otra vez 
    form.reset();
    imgPreview.src = "";
}

document.addEventListener("DOMContentLoaded", event => { // Esperamos a que haya cargado todo el DOM antes de empezar
    getProducts();

    form = document.getElementById("addProduct");
    imgPreview = document.getElementById("preview");

    form.addEventListener("submit", event => { // Envío del formulario
        event.preventDefault();
        let product = {
            name: form.name.value,
            description: form.desc.value,
            photo: document.getElementById("preview").src
        }
        console.log("Enviamos el producto: ", product);
        addProduct(product);
    });

    form.image.addEventListener('change', () => { // Imagen a Base64
        var file = form.image.files[0];
        var reader = new FileReader();

        if (file) { 
            reader.readAsDataURL(file);
        }

        reader.addEventListener("load", () => { 
            imgPreview.src = reader.result;
        }, false);
    });

    document.getElementById("orderName").addEventListener('click', e => { // Botón de ordenar
        products.sort((p1,p2) => p1.name.localeCompare(p2.name));
        showProducts();
    });

});
