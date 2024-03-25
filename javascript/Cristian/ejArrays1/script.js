function imprimirSolucion (solucion, numEj, remplazo = false) {
    if (remplazo === false) {
        document.getElementById(`ej${numEj}-Output`).innerText += `${solucion}\n`;
    } else {
        document.getElementById(`ej${numEj}-Output`).innerText = `${solucion}\n`;
    }
    
}

function ejercicio1 () {
    let diasSemanaArr = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    let seleccion;
    do {
        seleccion = prompt("Introduzca un número del 0 al 6");
    } while (seleccion < 0 || seleccion > 6)

    imprimirSolucion(diasSemanaArr[seleccion], 1, true);
}

function ejercicio2 () {
    let validacionArr = [true, false];
    let input = prompt("Introduzca un número");

    if (input >= 0 && input <= 9) {
        imprimirSolucion(validacionArr[0], 2, true);
        alert(validacionArr[0]);
    } else {
        imprimirSolucion(validacionArr[1], 2, true);
        alert(validacionArr[1]);
    }
}

function ejercicio3 () {
    function sumaLista(arr) {
        let sum = 0;
        for(num of arr) {
            sum += num;
        }
        return sum;
    }

    imprimirSolucion(sumaLista([1,2,3]), 3);
    imprimirSolucion(sumaLista([0,0,0,0,0,0,0]), 3);
    imprimirSolucion(sumaLista([2,4,5,1,2]), 3);
}