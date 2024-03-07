/*
console.log("Juan Manuel");
alert("Garcia Cabot");

let ciudad = "Benidorm";
console.log(ciudad);

const nombre = prompt("Ingresa tu nombre");
console.log("Hola %s, ¿Cómo estás?" , nombre);

let number = -1.2;
let string = "Esto es un string";
let boolean = true;

console.log(number, string, boolean);

let num1 = 4;
let num2 = 2;
console.log("Para los números %d y %d", num1, num2);
console.log("La suma es " + (num1+num2));
console.log("La resta es " + (num1-num2));
console.log("La multiplicación es " + (num1*num2));
console.log("La división es " + (num1/num2));
alert(5*(4-6));

let num = prompt("Indica un número");
num++;
console.log(num);
num--;
console.log(num);

let num = prompt("Escribe número");
console.log((num-5)*-1);

let num1 = prompt("Num1");
let num2 = prompt("Num2");
console.log(num1==num2);
console.log(num1!=num2);
console.log(num1>=0);
console.log(num1<0);
*/

/*
let num1 = prompt("Num1");
let num2 = prompt("Num2");
console.log(num1 > 0 && num1 < 5);
console.log(num1 >= 0 || num2 >= 0);
*/

/*
let nuHu = prompt("Huh?");
console.log(nuHu);

const bloodType = "A+";
let nombre = "Juan Manuel";
console.log("Hola %s, sos:",nombre, bloodType);
console.log("Así es don " + nombre + ", sacaste un " + bloodType);
*/
//Tremendo de comentario que te estas leyendo maestro

/*Así es doña, 
comentario me llaman*/

/*-----------Ejercicios de profesor Cristian-----------*/

function ejercicio1() {
    const IVA = 21;
    let precio = prompt("Introduzca el precio en euros de su producto");
    let precioConIVA = +precio + +precio * (IVA / 100);

    let solucion = 
    `El producto de ${precio}€ se queda en un total de ${precioConIVA}€ con IVA.`;
    document.getElementById("ej1-Output").innerText = solucion;
}

function ejercicio2() {
    const ladoCuadrado = +prompt("Introduzca el lado de un cuadrado en cm");

    let solucion = 
    `Un cuadrado con un lado de ${ladoCuadrado}cm tiene un perímetro de ${ladoCuadrado * 4} y un área de ${ladoCuadrado * ladoCuadrado}.`
    document.getElementById("ej2-Output").innerText = solucion;
}

function ejercicio3() {
    let kmRecorridos = +prompt("Introduzca los kilómetros recorridos");
    let lConsumidos = +prompt("Introduzca los litros de combustible consumidos");
    let combustiblePorKm = (lConsumidos/kmRecorridos).toFixed(3);

    let solucion = 
    `Habiendo recorrido ${kmRecorridos}km y consumido ${lConsumidos}L de combustible, su vehículo ha gastado ${combustiblePorKm} litros por km.`;
    document.getElementById("ej3-Output").innerText = solucion;
}

function ejercicio4() {
    let num = +prompt("Introduzca un número de 2 digitos");

    let solucion = 
    `El número ${num} tiene ${(num - (num % 10))/10} decenas y ${num - (num - (num % 10))} unidades.`;
    document.getElementById("ej4-Output").innerText = solucion;
}

function ejercicio5() {
    let var1 = prompt("Introduce el valor de la variable 1");
    let var2 = prompt("Introduce el valor de la variable 2");
    let tempVar = var1;
    let solucion;

    solucion = `Antes del intercambio ==> valor de var1: ${var1} / valor de var2: ${var2}.\n`;
    var1 = var2;
    var2 = tempVar;
    solucion += `Después del intercambio ==> valor de var1: ${var1} / valor de var2: ${var2}.`;

    document.getElementById("ej5-Output").innerText = solucion;
}

function ejercicio6() {
    let num = +prompt("Introduce un número");
    console.log;

    let solucion = 
    `¿Es par?: ${(num % 2 == 0)}`;
    document.getElementById("ej6-Output").innerText = solucion;
}

function ejercicio7() {
    let a = +prompt("Introduce un número");
    let b = +prompt("Introduce un número");

    let solucion = 
    `a: "${a}" / b: "${b}"
    ${a > b ? "a es mayor." : a < b ? "b es mayor." : "a y b son iguales."}`;
    document.getElementById("ej7-Output").innerText = solucion;
}

function ejercicio8() {
    const num = prompt("Introduzca un número");
    let solucion;

    if (num > 0) {
        solucion = num + " es positivo.";
    } else if (num < 0) {
        solucion = num + " es negativo.";
    } else {
        solucion = num + " es literalmente 0.";
    }

    document.getElementById("ej8-Output").innerText = solucion;
}

function ejercicio9() {
    let nota = +prompt("EJ2: Introduzca su nota de examen (de 0 a 10)");
    let solucion = "";

    if (nota >= 8) {
        solucion = "Excelente.";
    } else if (nota > 6 && nota < 8) {
        solucion = "Bien.";
    } else if (nota >= 5 && nota < 6) {
        solucion = "Suficiente.";
    } else {
        solucion = "Insuficiente.";
    }

    document.getElementById("ej9-Output").innerText = solucion;
}

function ejerciciox() {
    let variable;

    let solucion = 
    `Mensaje: ${variable}`;
    document.getElementById("ejx-Output").innerText = solucion;
}