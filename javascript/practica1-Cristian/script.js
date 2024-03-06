function ejercicio1() {
    let juanCapital = +(+prompt("¿Cuantos euros tiene Juan?")).toFixed(2);
    let davidCapital = +(juanCapital / 2).toFixed(2);
    let joseCapital = +(davidCapital + juanCapital).toFixed(2);

    let solucion = 
    `Juan tiene ${juanCapital}€
    David tiene ${davidCapital}€
    José tiene ${joseCapital}€
    El promedio de los tres es: ${((juanCapital + davidCapital + joseCapital) / 3).toFixed(2)}€`;
    document.getElementById("ej1-Output").innerText = solucion;
}

function ejercicio2() {
    let string = prompt("Introduce una serie de caracteres");

    let solucion = string.length > 4 ? true : false;
    document.getElementById("ej2-Output").innerText = solucion;
}

function ejercicio3() {
    let numArr = [];
    let sumatorio = 0;

    for (let i = 0; i < 3; i++) {
        do {
            numArr[i] = +prompt(`Introduce el número ${i + 1} (del 1 al 10) para hacer el promedio`)
        } while (numArr[i] < 1 || numArr[i] > 10);
        sumatorio += numArr[i];
    }

    let solucion = 
    `Número 1: ${numArr[0]}
    Número 2: ${numArr[1]}
    Número 3: ${numArr[2]}
    El promedio de los tres es: ${(sumatorio / 3).toFixed(2)}`;
    document.getElementById("ej3-Output").innerText = solucion;
}