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
        return true;
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

    trabaja (numHoras) {
        if (this.proyecto !== null) {
            this.proyecto.coordina(numHoras);
            this.horasInvertidas += numHoras;
            return true;
        } else {
            return false;
        }         
    }

    cambiaProyecto (nuevoProyecto) {
        if (nuevoProyecto.variosCoordinadores || !nuevoProyecto.plantilla[0]) {
            this.proyecto.elimina(this.getNombre());
            this.proyecto = nuevoProyecto;
            nuevoProyecto.plantilla.unshift(this);
            return true;
        } else if(nuevoProyecto.plantilla[0]) {
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
    constructor (codigo = "A892ER", maxEstudiantes = 2, costeHora = 10.5, variosCoordinadores = false, necesitaCoordinador = true) {
        this.codigo = codigo;
        this.horas = 0;
        this.maxEstudiantes = maxEstudiantes;
        this.variosCoordinadores = variosCoordinadores;
        this.necesitaCoordinador = necesitaCoordinador;
        this.plantilla = [];
        if (typeof costeHora !== "number") {
            this.costeHora = 10.5;
        } else {
            this.costeHora = costeHora;
        }
    }

    incluye (estudiante) {
        if (this.plantilla.length >= this.maxEstudiantes || this.plantilla.includes(estudiante)) {
            return false;
        } else if (this.plantilla.length === 0 && this.necesitaCoordinador === true){
            if(estudiante instanceof Coordinador) {
                this.plantilla.push(estudiante);
                estudiante.asigna(this);
                return true
            } else {
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
            return true;
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
        if (this.plantilla[num-1] === undefined) {
            return null;
        } else {
            return this.plantilla[num-1].getNombre();
        }
    }

    elimina (nombre) {
        this.plantilla.map((estudiante, index) => {
            nombre = nombre.toLowerCase();
            if (estudiante.getNombre().toLowerCase() === nombre) {
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
        this.plantilla[0].proyecto = coordinador.proyecto;
        coordinador.proyecto.plantilla[0] = this.plantilla[0]
        this.plantilla[0] = coordinador;
        coordinador.asigna(this);        
    }

    getCoste () {
        return this.costeHora;
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
        if (this.plantilla.length === 0) {
            return "No hay plantilla";
        } else {
            let arrayNames = [];
            this.plantilla.map((est) => {arrayNames.push(est.getNombre())});
            return arrayNames.toString();
        }
    }
}

/*
let e1 = new Estudiante("Pepe");
let e2 = new Estudiante("Luis");
let e3 = new Estudiante();
let c1 = new Coordinador("Robertito", "AS del balón");
let c2 = new Coordinador("Juanito");
let c3 = new Coordinador();
let p1 = new Proyecto("CCC333", 3, 20);
let p2 = new Proyecto(undefined, 1, "Hola");

console.log("Codigo proyecto 2 (tiene que dar A892ER): "+p2.getCodigo());
console.log("Coste hora proyecto 2 (tiene que dar 10.5): "+p2.getCoste());
console.log("Longitud de la plantilla del proyecto 2 (tiene que dar 2): "+p2.plantilla.length);
console.log("Horas proyecto 1 (tiene que dar 0): "+p1.getHoras());
console.log("Plantilla proyecto 1 (tiene que dar mensaje como que no hay plantilla): "+p1.getPlantilla());
console.log("Codigo proyecto 1 (tiene que dar CCC333): "+p1.getCodigo());
console.log("Coste hora proyecto 1 (tiene que dar 20): "+p1.getCoste());
console.log("Numero estudiantes trabajando en proyecto 1 (tiene que dar 0): "+p1.getDesarrolladores());
console.log("Incluir en proyecto 1 a estudiante 1 (tiene que dar false): "+p1.incluye(e1));
console.log("Incluir en proyecto 1 a coordinador 1 (tiene que dar true): "+p1.incluye(c1));
console.log("Incluir en proyecto 1 a estudiante 2 (tiene que dar true): "+p1.incluye(e2));
console.log("Incluir en proyecto 1 a estudiante 3 (tiene que dar true): "+p1.incluye(e3));
console.log("Incluir en proyecto 1 a estudiante 1 (tiene que dar false): "+p1.incluye(e1));
console.log("Plantilla proyecto 1 (tiene que dar Robertito, Luis, Pepito Grillo): "+p1.getPlantilla());
console.log("Causa baja estudiante 1 de proyecto 1 (tiene que dar false): "+p1.causaBaja(e1));
console.log("Causa baja estudiante 3 de proyecto 1 (tiene que dar true): "+p1.causaBaja(e3));
console.log("Incluir en proyecto 1 a estudiante 1 (tiene que dar true): "+p1.incluye(e1));
console.log("Código proyecto coordinador 1 (tiene que dar CCC333): "+c1.getCodigo());
console.log("Horas coordinador 1 (tiene que dar 0): "+c1.getHoras());
console.log("Coordinador 1 trabaja (tiene que dar true): "+c1.trabaja(10));
console.log("Estudiante 2 trabaja en proyecto 1 (tiene que dar true): "+p1.trabajo(10,e2));
console.log("Horas de coordinador 1 (tiene que dar 10): "+c1.getHoras());
console.log("Consulta Coordinador proyecto 1 (tiene que dar Robertito): "+p1.consultaEstudiante(1));
console.log("Plantilla proyecto 1 (tiene que dar Robertito, Luis, Pepe): "+p1.getPlantilla());
console.log("Coordinador 1 cambia proyecto con Coordinador 2 (tiene que dar false): "+c1.cambiaProyecto(c2));
console.log("Incluir en proyecto 2 a coordinador 2 (tiene que dar true): "+p2.incluye(c2));
console.log("Coordinador 1 cambia proyecto con Coordinador 2 (tiene que dar true): "+c1.cambiaProyecto(c2));
console.log("plantilla proyecto 1 (tiene que dar Juanito, Luis, Pepe): "+p1.getPlantilla());
console.log("plantilla proyecto 2 (tiene que dar Robertito): "+p2.getPlantilla());
console.log("Coordinador causa baja proyecto 1 (tiene que dar false): "+p1.causaBaja(c1));
*/