"use strict";

/**
 * Ejemplo de gestión básica de productos usando AJAX
 */

const SERVER = 'http://arturober.com:5005';
let products = [];

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

    buttonDelete.addEventListener('click', event => {
        deleteProduct(p, tr);
    });

    tr.appendChild(tdPhoto);
    tr.appendChild(tdName)
    tr.appendChild(tdDesc);
    tr.appendChild(tdDelete);
    container.appendChild(tr);
}

function deleteProduct(prod, tr) {
    fetch(`${SERVER}/products/${prod.id}`, {method: 'DELETE'})
    .then(resp => {
        if(resp.status == 204) { // Borrado
            tr.remove();
            let index = products.indexOf(prod);
            products.splice(index, 1);
        }
    })
}

function getProducts() {
    fetch(`${SERVER}/products`).then(resp => {
        if (resp.status === 200) {
            resp.json().then(json => { // json() devuelve una promesa
                products = json.products;
                showProducts();
            });
        }
    });
}

function addProduct(prodJSON) {
    fetch(`${SERVER}/products`, {
        method: 'POST',
        body: JSON.stringify(prodJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        if (resp.status === 201) {
            resp.json().then(json => {
                products.push(json.product);
                showProducts();
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", event => {
    getProducts();

    let form = document.getElementById("addProduct");

    form.addEventListener("submit", event => {
        event.preventDefault();
        let data = {
            name: form.name.value,
            description: form.desc.value,
            photo: document.getElementById("preview").src
        }
        console.log("Send to server: ", data);
        addProduct(data);
    });

    form.image.addEventListener('change', () => {
        var file = form.image.files[0];
        var reader = new FileReader();

        if (file) { // File has been selected (convert to Base64)
            reader.readAsDataURL(file);
        }

        reader.addEventListener("load", () => { //Converted into Base64 event (async)
            document.getElementById("preview").src = reader.result;
        }, false);
    });

    document.getElementById("orderName").addEventListener('click', e => {
        products.sort((p1,p2) => p1.name.localeCompare(p2.name));
        showProducts();
    });

});
