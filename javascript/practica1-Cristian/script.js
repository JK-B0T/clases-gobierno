function ejercicio1() {
    let juanCapital = +prompt("¿Cuantos euros tiene Juan?");
    let davidCapital = (juanCapital / 2).toFixed(2);
    let joseCapital = (davidCapital + juanCapital).toFixed(2);

    let solucion = 
    `Juan tiene ${juanCapital} euros
    David tiene ${davidCapital} euros
    José tiene ${joseCapital} euros
    El promedio de los tres es: ${((juanCapital + davidCapital + joseCapital) / 3).toFixed(2)}`;
    document.getElementById("ej1-Output").innerText = solucion;
}

function ejercicio2() {
    let variable;

    let solucion = `${variable}`;
    document.getElementById("ej2-Output").innerText = solucion;
}

function ejercicio3() {
    let variable;

    let solucion = `${variable}`;
    document.getElementById("ej3-Output").innerText = solucion;
}