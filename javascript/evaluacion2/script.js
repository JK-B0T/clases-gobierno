
const executeBtn = document.getElementById("executeBtn");
const printTableBtn = document.getElementById("printTableBtn");
const tableTitle = document.getElementById("tableTitle");
const tableCells = document.querySelectorAll("td");
console.log(tableCells);

executeBtn.addEventListener("click", startApp, false);
printTableBtn.addEventListener("click", printDocument, false);

function getAndValidateUserInputs() {
    const inputs = {
        mode: "M",
        num: 0,
    }
    do {
        inputs.num = prompt("Introduce un número entero");
    } while (isNaN(+inputs.num));
    do {
        inputs.mode = prompt("Introduce el modo de la tabla (P para potenciar y M para multiplicar)");
    } while (inputs.mode !== "M" && inputs.mode !== "P");
    return inputs;
}

function hacerTablaMultiplicar(num) {
    console.log(`-----Tabla de multiplicar del ${num}-----`);
    for (let i = 0; i <= 10; i++) {
        tableCells[i].innerText = `${num} x ${i} = ${i * num}`;
        console.log(`${num} x ${i} = ${i * num}`);
    }
}

function hacerTablaPotenciar(num) {
    console.log(`-----Tabla de potenciar del ${num}-----`);
    for (let i = 0; i <= 10; i++) {
        tableCells[i].innerText = `${num} ^ ${i} = ${num ** i}`;
        console.log(`${num} ^ ${i} = ${i ** num}`);
    }
}

function fillOutTable(mode, num) {
    if (mode === "M") {
        tableTitle.innerText = `Tabla de multiplicar del ${num}`;
        hacerTablaMultiplicar(num);
    } else {
        tableTitle.innerText = `Tabla de potenciar del ${num}`;
        hacerTablaPotenciar(num);
    }
}

function startApp() {
    const inputs = getAndValidateUserInputs();
    fillOutTable(inputs.mode, inputs.num);
}

function printDocument() {
    window.print();
}