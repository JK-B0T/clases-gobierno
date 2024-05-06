class Estudiante {
    constructor (nombre = "Pepito Conejo") {
        this.nombre = nombre;
        this.horasInvertidas = 0;
        this.proyecto = null;
    }

    trabaja (numHoras) {
        if (this.proyecto !== null) {
            this.proyecto.trabajo(numHoras, this);
            this.horasInvertidas += numHoras;
            return true;
        } else {
            return false;
        }
    }

    cambiaProyecto (proyecto) {
        this.proyecto.elimina(this.nombre);
        this.proyecto = proyecto;  
        this.proyecto.incluye(this.nombre);
    }

    asigna (proyecto) {
        this.proyecto.incluye(this.nombre);         
    }

    getNombre () {
        return this.nombre;          
    }

    getHoras () {
        return this.horasInvertidas;          
    }

    getCodigo () {
        return this.proyecto.getCodigo();             
    }
}

class Coordinador extends Estudiante {
    constructor (especialidad = "Comodín") {
        super(Estudiante(nombre));
        this.especialidad = especialidad;
    }

    trabaja () {
        if (this.proyecto !== null) {
            this.proyecto.coordina(numHoras);
            this.horasInvertidas += numHoras;
            return true;
        } else {
            return false;
        }         
    }

    cambiaProyecto (coordinador) {
        if (this.proyecto !== null && coordinador.proyecto !== null) {
            projectoTemp = coordinador.proyecto;
            coordinador.proyecto = this.proyecto;
    
    
            this.proyecto = projectoTemp;
            this.proyecto.elimina(this.nombre);
            this.proyecto = proyecto;  
            this.proyecto.incluye(this.nombre);  
            return true;
        } else {
            return false;
        }
      
    }

    expulsa (estudiante) {
        if (this.proyecto.plantilla.includes(estudiante)) {
            this.proyecto.causaBaja(estudiante);
        }        
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
        if (this.plantilla.length >= this.maxEstudiantes || !this.plantilla.includes(estudiante)) {
            return false;
        } else if (this.plantilla.length === 0){
            if(estudiante instanceof Coordinador) {
                estudiante.asigna(this);
                return true
            } else {
                return false;
            }
        } else {
            estudiante.asigna(this);
            return true;
        }
    }

    trabajo (numHoras, estudiante) {
        if (this.plantilla.includes(estudiante)) {
            this.horasInvertidas += numHoras;
        } else {
            return false;
        }
    }

    coordina (coodinador) {
        if (this.plantilla.includes(coodinador)) {
            this.horasInvertidas += numHoras;
        } else {
            return false;
        }       
    }

    consultaEstudiante (num) {
        if (plantilla[num] === undefined) {
            return null;
        }
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