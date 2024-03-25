'use strict';

/**
 * Apartado 1
 * Realiza los siguientes pasos (muestra por consola el resultado después de aplicar cada uno):
 * - Crea un array con 4 elementos
 * - Concatena 2 elementos más al final y 2 al principio
 * - Elimina las posiciones de la 3 a la 5 (ambas incluidas)
 * - Inserta 2 elementos más entre el penúltimo y el último
 * - Muestra el array del paso anterior, pero con los elementos separados por " ==> "
 */

console.log('--------------- APARTADO 1 -----------------');

let arr = [1,2,3,4];
console.log(arr);
arr = arr.concat(5,6);
arr = [-1,0].concat(arr);
console.log(arr);
arr.splice(3, 3);
console.log(arr);
arr.splice(1, 0, -0.66, -0.33);
console.log(arr);
arr = arr.join(" ==> ");
console.log(arr);


/**
 * Apartado 2
 * Crea una función que reciba como primer parámetro el nombre de un alumno, seguido
 * de un número indeterminado de notas (usa spread para agruparlas en un array).
 * Utiliza el método reduce para sumar las notas y calcula la media, que deberás mostrar por consola.
 * Posible llamada -> printMedia("Pepe", 4.25, 6, 8.5, 9)
 */

console.log('--------------- APARTADO 2 -----------------');

function printMedia(nombreAlu, ...notas) {
    const media = notas.reduce((sum, nota) => sum + nota)/notas.length;
    return `La media de ${nombreAlu} es ${media}`;
}
console.log(printMedia("Adolfo", 2, 3.4, 1, 0, 0.1));


/**
 * Apartado 3
 * Crea un array de cadenas y ordénalo usando el método sort de mayor a menor longitud .
 * Imprime el array original (antes de ordenarlo) y el resultado
 */

console.log('--------------- APARTADO 3 -----------------');

let stringArr = ["AAAAA", "AAA", "BBB", "BBBB", "AAA"];
console.log(stringArr);
console.log(stringArr.sort((a, b) => {
    if ((b.length - a.length) === 0) {
        if (a > b) {
            return 1;
        } else {
            return -1;
        }
    } else {
       return b.length - a.length;
    }
}));