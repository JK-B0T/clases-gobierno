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
        this.proyecto.incluye(this);
    }

    asigna (proyecto) {
        this.proyecto = proyecto;         
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
    constructor (nombre, especialidad = "Comodín") {
        super(nombre);
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

    cambiaProyecto (nuevoProyecto) {
        if (this.proyecto !== null && nuevoProyecto.plantilla.length !== 0) {
            this.proyecto.cambiaCoordinador(nuevoProyecto.plantilla[0])
            nuevoProyecto.cambiaCoordinador(this);
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
        if (this.plantilla.length >= this.maxEstudiantes || this.plantilla.includes(estudiante)) {
            console.log("No entra");
            return false;
        } else if (this.plantilla.length === 0){
            if(estudiante instanceof Coordinador) {
                this.plantilla.push(estudiante);
                estudiante.asigna(this);
                return true
            } else {
                console.log("No Coordina");
                return false;
            }
        } else {
            this.plantilla.push(estudiante);
            estudiante.asigna(this);
            return true;
        }
    }

    trabajo (numHoras, estudiante) {
        if (this.plantilla.includes(estudiante)) {
            this.horas += numHoras;
        } else {
            return false;
        }
    }

    coordina (coodinador) {
        if (this.plantilla.includes(coodinador)) {
            this.horas += numHoras;
        } else {
            return false;
        }       
    }

    consultaEstudiante (num) {
        if (plantilla[num] === undefined) {
            return null;
        } else {
            return plantilla[num];
        }
    }

    elimina (nombre) {
        this.plantilla.map((estudiante, index) => {
            nombre = nombre.toLowerCase();
            if (estudiante.getNombre().toLowerCase() === nombre && !(estudiante instanceof Coordinador)) {
                estudiante.proyecto = null;
                this.plantilla.splice(index,1);
                return true;
            } else {
                return false;
            }
        });       
    }

    causaBaja (estudianteDeBaja) {
        if (this.plantilla.includes(estudianteDeBaja)) {
            if (!(estudianteDeBaja instanceof Coordinador)) {
                estudianteDeBaja.proyecto = null;
                this.plantilla.splice(this.plantilla.findIndex((item)=>item === estudianteDeBaja),1);
                return true;
            } else {
                this.plantilla.map(estudiante => {
                    estudiante.proyecto = null;
                });
                this.plantilla = [];
                return true;
            }
        } else {
            return false;
        }    
    }

    cambiaCoordinador (coordinador) {
        this.plantilla[0].proyecto = null;
        this.plantilla[0] = coordinador;
        coordinador.asigna(this);        
    }

    getCoste () {
        return (this.costeHora * this.horas);
    }

    getDesarrolladores () {
        return this.plantilla.length;
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

/*
const wildProject = new Proyecto("H311DV", 5, 12.2);

const coor1 = new Coordinador("ElPepas", "Matemáticas");
const est1 = new Estudiante("Pepi");
const est2 = new Estudiante("Pepo");
const est3 = new Estudiante("Pepe");
const est4 = new Estudiante("Papo");
const est5 = new Estudiante("Pupas");

console.log(wildProject.incluye(est1));
console.log(wildProject.incluye(coor1));
console.log(wildProject.incluye(est1));
console.log(wildProject.incluye(est2));
console.log(wildProject.incluye(est3));
console.log(wildProject.incluye(est4));
console.log(wildProject.incluye(est5));

const civilProject = new Proyecto("HVCL1M", 6, 22.2);

const coor2 = new Coordinador("ElJuanxo", "Deporte");
const est6 = new Estudiante("Johnson");
const est7 = new Estudiante("Jimmy");
const est8 = new Estudiante("Johny");

console.log(civilProject.incluye(est2));
console.log(civilProject.incluye(est5));
console.log(civilProject.incluye(coor2));
console.log(civilProject.incluye(est6));
console.log(civilProject.incluye(est7));
console.log(civilProject.incluye(est8));

const est9 = new Coordinador("ElChepis", "Urología");
const est10 = new Estudiante("Puchas");

console.log(wildProject.getCoste());
console.log(wildProject.getDesarrolladores());
console.log(wildProject.getHoras());
console.log(wildProject.getCodigo());
console.log(wildProject.getPlantilla());

console.log(wildProject.plantilla, civilProject.plantilla);
console.log(est1.getNombre(), est1.getCodigo(), est1.trabaja(5), est1.getHoras(), wildProject.getHoras(), est1.cambiaProyecto(civilProject));
console.log(est1.trabaja(10), est1.getHoras(), wildProject.getHoras(), civilProject.getHoras());
console.log(wildProject.plantilla, civilProject.plantilla);

console.log(coor1.cambiaProyecto(civilProject));
console.log(coor1.expulsa(est1));
console.log(est1.proyecto);
*/

