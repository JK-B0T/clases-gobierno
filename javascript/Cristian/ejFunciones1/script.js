function imprimirSolucion (solucion, numEj) {
    document.getElementById(`ej${numEj}-Output`).innerText += `${solucion}\n`;
}

function ejercicio1 () {
    function numerMayor(...numeros) {
        let numMayor = numeros[0];
        let numerosIguales = true;

        for (let i = 1; i < numeros.length; i++) {
            if (numMayor != numeros[i]) {
                numerosIguales = false;
                if (numeros[i] > numMayor) {
                    numMayor = numeros[i];
                }
            }
        }

        if (numerosIguales === true) {
            return "Son iguales";
        } else {
            return numMayor;
        }
    }

    imprimirSolucion(numerMayor(10,1,100), 1);
    imprimirSolucion(numerMayor(3,3,3), 1);
    imprimirSolucion(numerMayor(1,5,2,7,65,3,2), 1);
}

function ejercicio2 () {
    function esVocal(...char) {
        const vocalString = "aeiouAEIOU"
        if (char.length == 1 && vocalString.includes(char)) {
            return true;
        } else {
            return false;
        }
    }

    imprimirSolucion(esVocal("A"), 2);
    imprimirSolucion(esVocal(223), 2);
    imprimirSolucion(esVocal("t"), 2);
    imprimirSolucion(esVocal("hola"), 2);
}

function ejercicio3 () {
    function generar_caracteres(num, char) {
        if (char.length != 1) {
            return "ERROR: no introdujo un solo carácter";
        } else {
            let string = "";
            for (let i = 0; i < num; i++) {
                string += char;
            }
            return string;
        }
    }

    imprimirSolucion(generar_caracteres(5,"A"), 3);
    imprimirSolucion(generar_caracteres(12, 124), 3);
    imprimirSolucion(generar_caracteres(23, "t"), 3);
    imprimirSolucion(generar_caracteres(5,"hola"), 3);
}

function ejercicio4 () {
    function inversa(string) {
        return string.split("").reverse().join("");
    }

    imprimirSolucion(inversa("Buena tarde"), 4);
    imprimirSolucion(inversa("oediotsamodielconretxE"), 4);
    imprimirSolucion(inversa("animál"), 4);
}

function ejercicio5 () {
    function sumaArreglo(arr) {
        let sum = 0;
        for(num of arr) {
            sum += num;
        }
        return `Array de longitud ${arr.length} se suma en un total de ${sum}`;
    }

    imprimirSolucion(sumaArreglo([1,2,3]), 5);
    imprimirSolucion(sumaArreglo([0,0,0,0,0,0,0]), 5);
    imprimirSolucion(sumaArreglo([365*11, -365*12]), 5);
}

function ejercicio6 () {
    function multiplicarArreglo(arr) {
        let numMenor = Infinity;
        let numMayor = 0
        for(num of arr) {
            if (num > numMayor) {
                numMayor = num;
            }
            if (num < numMenor) {
                numMenor = num;
            }
        }
        return numMenor * numMayor;
    }

    imprimirSolucion(multiplicarArreglo([1,2,3]), 6);
    imprimirSolucion(multiplicarArreglo([0,2,3,4,5,6,100]), 6);
    imprimirSolucion(multiplicarArreglo([4,7,10,2]), 6);
}

function ejercicio7 () {
    function booleanoArray(arr1, arr2) {
        const concatArray = arr1.concat(arr2);
        if (concatArray.length >= 10) {
            return true;
        } else {
            return false;
        }
    }

    imprimirSolucion(booleanoArray([1,2,3,4,5], [6,7,8,9,0]), 7);
    imprimirSolucion(booleanoArray([1,2,3], [6,7,8,9,0]), 7);
}

function ejercicio8 () {
    function funcionarray(arr1, arr2) {
        const concatArray = arr1.concat(arr2);
        return concatArray.map((num) => num*2);
    }

    imprimirSolucion(funcionarray([20,30,60], [2,3,6]), 8);
    imprimirSolucion(funcionarray([1], [50,50,50]), 8);
}