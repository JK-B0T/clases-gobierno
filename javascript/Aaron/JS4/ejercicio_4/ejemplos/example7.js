"use strict";

/**
 * Ejemplo de concatenar promesas.la función dividemitad obtiene el número
 * multiplicado por 10 (llamada a multiplica10) en una promesa. Cuando lo 
 * recibe, lo divide entre 2 y lo devuelve (el ńumero no puede ser mayor que 100).
 * El número no puede ser negativo, ni superar 100 cuando se multiplica por 10. En
 * caso de error, irá directamente al método catch.
 * 
 * Las 3 llamadas se ejecutan en paralelo (asíncronas)
 */

/**
 * Esta función tarda 3 segundos en devolver el número multiplicado por 10
 * y lo devuelve en una promesa. No puede ser negativo
 */
function multiplica10(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(num < 0)
                reject(`${num} can't be negative!!`);
            else
                resolve(num * 10);
        }, 3000);
    });
}

/**
 * Esta función obtiene el número multiplicado por 10 de la anterior y lo divide por
 * la mitad. No admite números mayores a 100.
 */
function dividemitad(num) {
    return multiplica10(num).then(n => {
        if(n > 100)
            throw n + " is greater than 100!";
        return n / 2;
    });
}

dividemitad(5).then(num => console.log(num));
dividemitad(-45)
    .then(num => console.log(num))
    .catch(error => console.error(error));

dividemitad(77)
    .then(num => console.log(num))
    .catch(error => console.error(error));
