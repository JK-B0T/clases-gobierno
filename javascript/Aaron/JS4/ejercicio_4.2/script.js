class Estudiante {
    constructor (nombre = "Pepito Conejo") {
        this.nombre = nombre;
        this.horasInvertidas = 0;
        this.proyecto = null;
    }

    trabaja () {
        console.log("trabaja");            
    }

    cambiaProyecto () {
        console.log("cambiaProyecto");            
    }

    asigna () {
        console.log("asigna");            
    }

    getNombre () {
        console.log("getNombre");            
    }

    getHoras () {
        console.log("getHoras");            
    }

    getCodigo () {
        console.log("getCodigo");            
    }
}

class Coordinador extends Estudiante {
    constructor (especialidad = comodín) {
        this.especialidad = especialidad;
    }

    trabaja () {
        console.log("trabaja");            
    }

    cambiaProyecto () {
        console.log("cambiaProyecto");            
    }

    expulsa () {
        console.log("expulsa");            
    }
}

class Proyecto {
    constructor (codigo = "A892ER", maxEstudiantes = 2, costeHora = 10.5) {
        this.codigo = codigo;
        this.horas = 0;
        this.costeHora = costeHora;
        this.maxEstudiantes = maxEstudiantes;
        this.plantilla = [];
    }

    incluye (estudiante) {
        console.log("incluye");
        /*Se le pasa un estudiante como parámetro
        Recorrer el array de estudiantes
        Si no hay espacio se imprime un error
        Si el estudiante ya pertenece a la plantilla se imprime un error
        Si no hay coordinador, asigna el estudiante cambiado su clase a coordinador
        Si lo hay, añade simplemente al estudiante enviandole el mensaje asigna.
        Si el estudiante estaba en otro proyecto, se le envia un mensaje cambioProyecto.

        Si se termina añadiendo, se devuelve true, si no, false
        */
    }

    trabajo () {
        console.log("trabajo");            
    }

    coordina () {
        console.log("coordina");            
    }

    consultaEstudiante () {
        console.log("consultaEstudiante");            
    }

    elimina () {
        console.log("elimina");            
    }

    causaBaja () {
        console.log("causaBaja");            
    }

    cambiaCoordinador () {
        console.log("cambiaCoordinador");            
    }

    getCoste () {
        return (this.costeHora * this.horas);
    }

    getDesarrolladores () {
        return this.plantilla.length; //Falta retornar "desarrollador"
    }

    getHoras () {
        return this.horas;
    }

    getCodigo () {
        return this.codigo;
    }

    getPlantilla () {
        return this.plantilla;
    }
}

const wildProject = new Proyecto ("H311DV", 5, 12.2);

console.log(wildProject.getCoste());
console.log(wildProject.getDesarrolladores());
console.log(wildProject.getHoras());
console.log(wildProject.getCodigo());
console.log(wildProject.getPlantilla());