function ejercicio1 () {
    const alumno = {
        "nombre": "Juan Manuel",
        "ingles": 10,
        "programacion": 10,
        "html": 10
    }

    const media = (alumno.ingles + alumno.programacion + alumno.html) / 3;
    let solucion = `El alumno ${alumno.nombre} tiene una media de ${media}`
    document.getElementById("ej1-Output").innerText = solucion;
}