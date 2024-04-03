'use strict';


/**
 * Apartado 4
 * Crea un array de números de más de una cifra. Mapea ese array en otro que sea la suma de las cifras de cada número. No puedes usar bucles.
 * Pista: Puedes convertir los números a cadena primero y después con Array.from(cadena) la transformas a array de caracteres (que puedes sumar)
 * Imprime el array original y el resultado (ej: [123, 34, 52] -> [6, 7, 7])
 */

console.log('--------------- APARTADO 4 -----------------');

const arr = [23, 3, 321];
const solucion = arr.map((num) => {
    num = num.toString().split('');
    return num = num.reduce((sum, cifra) => {return +sum + +cifra});
});

console.log(arr, solucion);

/**
 * Apartado 5
 * A partir del siguiente array que contiene productos con mensajes sobre los mismos:
 * - Filtra los mensajes que empiecen por ERROR (usa el método startsWith).
 * - Después recórrelos y mételos en un objeto Map cuya clave sea el nombre del producto
 * y cuyo valor sea un array con los mensajes de error asociados al producto (debes comprobar 
 * si está  primero el producto en el Map para crear el array o añadirle el mensaje)
 * - Recorre el objeto Map mostrando cada producto, y que errores tiene asociados.
 */

console.log('--------------- APARTADO 5 -----------------');

let mensajes = [
    ['Silla', 'ERROR: Stock no coincide'],
    ['Mesa', 'Pedido de 2 unidades'],
    ['Silla', 'ERROR: El precio no puede ser menor a 1'],
    ['Mesa', 'ERROR: No se pueden enviar 0 unidades'],
    ['Cama', 'ERROR: El fabricante no tiene ese modelo'],
    ['Silla', 'Se ha borrado el producto de la base de datos'],
    ['Mesa', 'ERROR: El stock no puede ser negativo']
];

const itemErrorArr = mensajes.filter(item => item[1].startsWith("ERROR"))
.reduce((obj, item) => {
    if (obj.hasOwnProperty(item[0])) {
        obj[item[0]].push(item[1]);
        return obj;
    }
    return {...obj, [item[0]]: [item[1]]};
}, {});
console.log(itemErrorArr);

/**
 * Apartado 6
 * Crea una función calcule el área de un triángulo. Esta función recibirá 3 parámetros:
 * 2 lados del triángulo, y el ańgulo entre ellos (en grados).
 * Para calcular el área con estos datos debemos aplicar la fórmula: (1/2)*lado1*lado2*seno(ángulo).
 * Debes tener en cuenta que para aplicar la fórmula, el ángulo debe estar en radianes. Para pasarlo
 * a radianes lo multiplicamos por PI y dividimos entre 180.
 */

console.log('--------------- APARTADO 6 -----------------');

function calcularAreaTriangular(lado1, lado2, angulo) {
    const PI = 3.141592;
    const RADIANES = (angulo * PI) / 180;
    return ((lado1*lado2)/2 * Math.sin(RADIANES)).toFixed(2);
}

console.log(calcularAreaTriangular(23, 23, 90));

/**
 * Apartado 7
 * Crea una función que reciba una cadena con una fecha en formato "YYYY-MM-DD". Muestra la fecha (ej: 2019-02-28) con
 * el siguiente formato: Jueves, 28 de Febrero de 2019.
 * Debes formatear la fecha usando los métodos de la clase Date para obtener, día de la semana, día del mes, mes, y año.
 * No puedes usar librerías como moment.js (obsoleta - https://momentjs.com/docs/#/-project-status/) para ayudarte.
 * Para mostrar el nombre del mes o del día de la semana, puedes crearte un array que los contenga (los días de la semana empiezan por domingo -> 0)
 * Métodos de la clase Date: https://www.w3schools.com/jsref/jsref_obj_date.asp
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 7 -----------------');

function formatearFecha(fecha = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
    const fechaFormateada = new Date(fecha);
    const diasArr = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábados"];
    const mesesArr = ["Enero", "Febrero", "Marzo", "Abril", "Mayo","Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return (`${diasArr[fechaFormateada.getDay()]}, ${fechaFormateada.getDate()} de ${mesesArr[fechaFormateada.getMonth()]} de ${fechaFormateada.getFullYear()}`);
}
console.log(formatearFecha());
console.log(formatearFecha("2019-2-28"));
console.log(formatearFecha("1901-01-22"));

/**
 * Apartado 8
 * Haz lo mismo que en el apartado 7 pero utiliza la API de internacionalización para formatear la fecha (Intl)
 */

console.log('--------------- APARTADO 8 -----------------');

function formatearFechaIntl(fecha = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
    const fechaFormateada = new Date(fecha)
    return new Intl.DateTimeFormat('es-ES', {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(fechaFormateada);
}
console.log(formatearFechaIntl());
console.log(formatearFechaIntl("2019-2-28"));
console.log(formatearFechaIntl("1901-01-22"));

