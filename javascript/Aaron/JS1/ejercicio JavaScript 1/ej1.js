'use strict';

/**
 * Apartado 1
 * Crea una función que reciba 2 cadenas por parámetro. Dicha función imprimirá por consola qué cadena
 * tiene mayor longitud. Si el tipo de algún parámetro no es string (typeof param !== "string"),
 * debes imprimir un error.
 * Llama a la función 3 veces con diferentes parámetros. En una de esas llamadas pásale por parámetro un valor que no sea string.
 */

console.log('--------------- APARTADO 1 -----------------');
function apartado1 (str1, str2) {
    if (typeof str1 !== "string" || typeof str2 !== "string") {
        console.log(`ERROR-AP1: uno o varios de los parámetros no son de tipo string.`);
    } else {
        if (str1.length > str2.length) {
            console.log(`"${str1}" tiene mayor longitud que "${str2}"`);
        } else if (str1.length < str2.length) {
            console.log(`"${str2}" tiene mayor longitud que "${str1}"`);
        } else {
            console.log(`"${str1}" tiene la misma longitud que "${str2}"`);
        }
    }
}
apartado1("hombre", "mujer ");
apartado1("Talos", "Principle");
apartado1("número de pelos en mi cabeza: ", 0);

/**
 * Apartado 2
 * Crea una función que reciba 2 números por parámetro, el primer número indicará cuantas veces debemos imprimir el segundo
 * por pantalla, pero en cada iteración muéstra el valor anterior multiplicado por 2.
 * Ejemplo: Si recibimos 4 y 6 imprimiremos: 6 12 24 48
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 2 -----------------');
function apartado2 (numRepeticion, num) {
    let str = ""
    let lastNum = num;
    for (let i = 0; i < numRepeticion; i++) {
        num *= 2;
        str += `${num} `;
    }
    console.log(str);
}
apartado2(3, 2);
apartado2(10, 8);
apartado2(5, Number.POSITIVE_INFINITY);

/**
 * Apartado 3
 * Crea una función que reciba 2 parámetros. El primero será una cadena y el segundo otra cadena que contendrá un caracter.
 * Convierte ambos parámetros a cadena y comprueba que efectivamente, el segundo parámetro tiene una longitud de 1.
 * Debes mostrar cuantas veces aparece el caracter recibido en la cadena.
 * Ejemple: Si recibimos "carcasa" y "a", debemos indicar que aparece 3 veces dicha letra en la cadena.
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 3 -----------------');
function apartado3 (str, char) {
    str = str.toString();
    char = char.toString();
    const regex = new RegExp(char, "g");

    if (char.length !== 1) {
        console.log(`ERROR-AP3: el segundo parámetro no es un carácter.`);
    } else {
        console.log(str.match(regex).length)
    }
}
apartado3("aaaaah", "a");
apartado3("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
, "o");
apartado3("pompa", "pompa");

/**
 * Apartado 4
 * Crea una función que reciba 3 parámetros (nombre de producto, precio e impuesto en porcentaje sobre 100).
 * Dicha función hará lo siguiente:
 * - Los parámetros deberán tener un valor por defecto por si no los recibe que deben ser: "Producto genérico", 100 y 21.
 * - Convierte el nombre de producto a string (por si acaso) y los otros 2 a número. Si el precio o el impuesto no son
 *   numéros válidos (NaN) muestra un error. Si son válidos, muestra por consola el nombre del producto y el precio final contando impuestos.
 * - Llama a la función varias veces, omitiendo parámetros, con todos los parámetros, y pasándo algún valor no númerico en el precio o impuesto.
 */

console.log('--------------- APARTADO 4 -----------------');
function apartado4 (nombreProducto = "Producto genérico", precio = 100, impuesto = 21) {
    nombreProducto = nombreProducto.toString();
    precio = +precio;
    impuesto = +impuesto;

    if (isNaN(precio) || isNaN(impuesto)) {
        console.log(`ERROR-AP4: uno de los parametros númericos no es válido.`);
    } else {
        console.log(nombreProducto, precio * (1 +(21 / 100)));
    }
}
apartado4();
apartado4("Cacahuete", 2);
apartado4("pompa", "pompa", 95);

/**
 * Apartado 5
 * Crea una función de tipo flecha (arrow function) que reciba 2 parámetros. Una cadena completa y un trozo de cadena a buscar.
 * La función debe comprobar si el trozo de cadena de búsqueda se encuentra dentro de la cadena completa e imprimir
 * por consola un mensaje indicando si ha encontrado coincidencia o no.
 * La búsqueda no debe ser sensible a mayúsculas o minúsculas, por lo que debes comparar ambas cadenas previa transformación
 * a minúsculas (o a mayúsculas). Ej: La cadena "Santiago de Compostela" contiene la cadena de búsqueda "COMPO".
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 5 -----------------');
const apartado5 = (strCompleto, strTrozo) => {
    strCompleto = strCompleto.toLowerCase();
    strTrozo = strTrozo.toLowerCase();

    if (strCompleto.includes(strTrozo)) {
        console.log("Se encontro coincidencia");
    } else {
        console.log("No se encontro coincidencia");
    }
}

apartado5("popopopopopopo", "po");
apartado5("Macarrones", "Mc");
apartado5("HOY SE COME FAMILIA", "hoy se come");



