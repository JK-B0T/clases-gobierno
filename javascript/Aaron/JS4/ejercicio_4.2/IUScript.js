window.addEventListener("DOMContentLoaded", start, false) 

function start() {

    let listaProyectos = {
        "bandeja": new Proyecto("bandeja", 100, 0, true, false),
    }

    let listaEstudiantes = {

    }

    const dialogList = [
        document.getElementById("nuevoCoordinador"),
        document.getElementById("nuevoEstudiante"),
        document.getElementById("nuevoProyecto")
    ];
    const closeBtnList = Array.from(document.querySelectorAll(".closeDialogBtn"));
    closeBtnList.forEach((btn, index) => btn.addEventListener("click", () => dialogList[index].close()));

    const modalBtnList = [
        document.getElementById("btnNuevoCoordinador"),
        document.getElementById("btnNuevoEstudiante"),
        document.getElementById("btnNuevoProyecto")
    ];
    modalBtnList.forEach((btn, index) => btn.addEventListener("click", () => dialogList[index].showModal()));

    const formList = [
        document.getElementById("nuevoCoordinador").firstElementChild,
        document.getElementById("nuevoEstudiante").firstElementChild,
        document.getElementById("nuevoProyecto").firstElementChild
    ];
    formList.forEach((form) => form.addEventListener("submit", onFormSubmit));

    function onFormSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const objData = Object.fromEntries(data.entries())

        if (objData.hasOwnProperty("codigo")) {
            crearProyecto(objData);
        } else if (objData.hasOwnProperty("especialidad")) {
            crearCoordinador(objData);
        } else {
            crearEstudiante(objData);
        }
    }

    function crearEstudiante(data) {
        const estudiante = new Estudiante(data.nombre);
        listaProyectos.bandeja.incluye(estudiante);
        listaEstudiantes[data.nombre] = estudiante;
        renderizarEstudiante(listaProyectos.bandeja.codigo, estudiante, 0)
    }

    function crearCoordinador(data) {
        const coordinador = new Coordinador(data.nombre, data.especialidad);
        listaProyectos.bandeja.incluye(coordinador);
        listaEstudiantes[data.nombre] = coordinador;
        renderizarEstudiante(listaProyectos.bandeja.codigo, coordinador, 0)
    }

    function crearProyecto(data) {
        listaProyectos[data.codigo] = new Proyecto(data.codigo, data.maxEstudiantes, data.costeHora);
        renderizarProyecto(listaProyectos[data.codigo], 0);
    }

    function comprobar (e) {
        const draggable = document.querySelector(".dragging");
        const dropZone = e.target;

        if (draggable.classList.contains("proyecto")) {
            if (dropZone.classList.contains("proyecto") || dropZone.tagName === "HEADER") {
                if (dropZone.tagName === "HEADER") {
                    dropZone.parentNode.parentNode.insertBefore(draggable, dropZone.parentNode.nextSibling);
                } else {
                    dropZone.parentNode.insertBefore(draggable, dropZone.nextSibling);
                }
            } else if (dropZone.tagName === "MAIN") {
                dropZone.prepend(draggable);
            }
            e.stopPropagation();
        } else {
            const oldProject = listaProyectos[draggable.parentNode.getAttribute("id")];
            const oldDropZone = draggable.parentNode;
            let newProject;
            let newDropZone;

            if (dropZone.classList.contains("proyecto")) {
                newDropZone = dropZone.querySelector("section");
                newProject = listaProyectos[newDropZone.getAttribute("id")];
            } else if (dropZone.classList.contains("estudiante")) {
                newDropZone = dropZone.parentNode;
                newProject = listaProyectos[newDropZone.getAttribute("id")];
            }

            if (draggable.classList.contains("coordinador")) {
                if (oldProject.plantilla.length > 1 && oldProject.getCodigo() !== "bandeja") {
                    for (let i = oldProject.plantilla.length-1; i >= 0 ; i--) {
                        if (oldProject.plantilla[i] instanceof Coordinador) {
                            document.querySelector("#bandeja").prepend(document.getElementById(oldProject.plantilla[i].getNombre()));
                        } else {
                            document.querySelector("#bandeja").append(document.getElementById(oldProject.plantilla[i].getNombre()));
                        }
                        oldProject.plantilla[i].cambiaProyecto(listaProyectos["bandeja"]);
                    }
                } else {
                    listaEstudiantes[draggable.getAttribute("id")].cambiaProyecto(newProject);
                    if (newDropZone.childNodes.length > 0 && newProject.getCodigo() !== "bandeja") {
                        oldDropZone.prepend(newDropZone.querySelector(".coordinador"));
                    }
                    newDropZone.prepend(draggable);
                }
                e.stopPropagation();
            } else {
                if ((newDropZone.querySelector(".coordinador") || newProject.getCodigo() === "bandeja") && newProject.plantilla.length < newProject.maxEstudiantes) {
                    listaEstudiantes[draggable.getAttribute("id")].cambiaProyecto(newProject);
                    newDropZone.append(draggable);
                }
                e.stopPropagation();
            }
            console.log("bandeja: " + listaProyectos["bandeja"].getPlantilla(),
            "\nEEE555: " + listaProyectos["EEE555"].getPlantilla(),
            "\nDDD444: " + listaProyectos["DDD444"].getPlantilla(),
            "\nCCC333: " + listaProyectos["CCC333"].getPlantilla(),
            "\nBBB222: " + listaProyectos["BBB222"].getPlantilla(),
            "\nAAA111: " + listaProyectos["AAA111"].getPlantilla());
        }
    }

    function sumarHoras() {
        console.log("Horas añadidas");
    }

    function eliminarRenderizado(elemento) {
        elemento.parentNode.removeChild(elemento);
    }

    function renderizarEstudiante(nombreTabla = "bandeja", estudiante, indice) {
        const posicion = document.querySelector(`#${nombreTabla} div:nth-child(${indice})`);
        
        const div = document.createElement("div");
        div.addEventListener("dragstart", () => {div.classList.add("dragging")}, false);
        div.addEventListener("dragend", () => {div.classList.remove("dragging");}, false);
        div.addEventListener("dragover", (e) => {e.preventDefault()}, false);
        div.addEventListener("drop", (e) => {comprobar(e);}, false);
        div.classList.add("estudiante");
        div.setAttribute("id", estudiante.getNombre());
        div.setAttribute("draggable", "true");

        const span1 = document.createElement("span");
        span1.classList.add("tipoEstudiante");

        if (estudiante.hasOwnProperty("especialidad")) {
            span1.textContent = "C";
            span1.setAttribute("style", "color: blue")
            div.classList.add("coordinador");
        } else {
            span1.textContent = "E";
            span1.setAttribute("style", "color: green");
        }
        div.appendChild(span1);
        
        const span2 = document.createElement("span");
        span2.classList.add("horasTrabajadas");
        span2.textContent = estudiante.getHoras();
        div.appendChild(span2);

        const span3 = document.createElement("span");
        span3.classList.add("nombreEstudiante");
        span3.textContent = estudiante.getNombre();
        div.appendChild(span3);

        const btn1 = document.createElement("button");
        btn1.setAttribute("type", "button")
        btn1.classList.add("btnElminarEstudiante");
        btn1.textContent = "X";
        btn1.addEventListener("click", () => eliminarRenderizado(div), false)
        div.appendChild(btn1);

        const btn2 = document.createElement("button");
        btn2.setAttribute("type", "button")
        btn2.classList.add("btnSumarHoras");
        btn2.textContent = "+";
        btn2.addEventListener("click", sumarHoras, false)
                //Aparece mensaje con input aparece, al aceptarse se añaden las horas puestas en el al estudiante e interfaz
        div.appendChild(btn2);

        if (indice === 0) {
            document.querySelector(`#${nombreTabla}`).prepend(div);
        } else {
            posicion.insertAdjacentElement("afterend", div);
        }
    }

    function renderizarProyecto(proyecto, indice) {
        const posicion = document.querySelector(`main article:nth-child(${indice})`);
        
        const article = document.createElement("article");
        article.classList.add("proyecto");
        const header = document.createElement("header");
        header.setAttribute("draggable", "true");
        header.classList.add("barra");
        header.addEventListener("dragstart", () => {article.classList.add("dragging")}, false);
        header.addEventListener("dragend", () => {article.classList.remove("dragging");}, false);
        article.addEventListener("dragover", (e) => {e.preventDefault()}, false);
        article.addEventListener("drop", (e) => {comprobar(e)}, false);
        const section = document.createElement("section");
        section.setAttribute("id", proyecto.getCodigo());

        const span1 = document.createElement("span");
        span1.classList.add("codigoProyecto");
        span1.textContent = proyecto.getCodigo();
        header.appendChild(span1);
        
        const span2 = document.createElement("span");
        span2.classList.add("maxEstudiantes");
        span2.textContent = "Max: " + proyecto.maxEstudiantes;
        header.appendChild(span2);

        const span3 = document.createElement("span");
        span3.classList.add("horasInvertidas");
        span3.textContent = "Horas: " + proyecto.getHoras();
        header.appendChild(span3);

        const btn1 = document.createElement("button");
        btn1.setAttribute("type", "button")
        btn1.classList.add("closeBtn");
        btn1.textContent = "X";
        btn1.addEventListener("click", () => eliminarRenderizado(article), false)
        //Aparece mensaje de aviso, si se acepta se elimina proyecto y estudiantes vuelven a la bandeja
        header.appendChild(btn1);

        article.appendChild(header);
        article.appendChild(section);

        if (indice === 0) {
            document.querySelector(`main`).prepend(article);
        } else {
            posicion.insertAdjacentElement("afterend", article);
        }
    }

    document.querySelector("main").addEventListener("drop", (e) => {comprobar(e);}, false);
    document.querySelector("main").addEventListener("dragover", (e) => {e.preventDefault()}, false);
    document.querySelector("aside").addEventListener("drop", (e) => {comprobar(e);}, false);
    document.querySelector("aside").addEventListener("dragover", (e) => {e.preventDefault()}, false);

    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");

    crearProyecto({codigo: "AAA111", maxEstudiantes: 1, costeHora: 11});
    crearProyecto({codigo: "BBB222", maxEstudiantes: 2, costeHora: 12});
    crearProyecto({codigo: "CCC333", maxEstudiantes: 3, costeHora: 13});
    crearProyecto({codigo: "DDD444", maxEstudiantes: 4, costeHora: 14});
    crearProyecto({codigo: "EEE555", maxEstudiantes: 5, costeHora: 15});

    crearEstudiante({nombre: "Epop"});
    crearCoordinador({nombre: "Coco", especialidad: "ganga"});
    crearEstudiante({nombre: "Tim"});
    crearEstudiante({nombre: "John"});
    crearEstudiante({nombre: "Maria"});
    crearEstudiante({nombre: "JP"});
    crearEstudiante({nombre: "Perro"});
    crearEstudiante({nombre: "Gata"});
    crearEstudiante({nombre: "Xin Ye"});
    crearEstudiante({nombre: "Fubuki"});
    crearCoordinador({nombre: "Carla", especialidad: "binbo"});
    crearCoordinador({nombre: "Celia"});

    console.log("bandeja: " + listaProyectos["bandeja"].getPlantilla(),
                "\nEEE555: " + listaProyectos["EEE555"].getPlantilla(),
                "\nDDD444: " + listaProyectos["DDD444"].getPlantilla(),
                "\nCCC333: " + listaProyectos["CCC333"].getPlantilla(),
                "\nBBB222: " + listaProyectos["BBB222"].getPlantilla(),
                "\nAAA111: " + listaProyectos["AAA111"].getPlantilla());

    /*
    renderizarEstudiante("EEE555", cor, 0);
    renderizarEstudiante("EEE555", est, 1);
    renderizarEstudiante("EEE555", est, 2);
    renderizarEstudiante("EEE555", est, 3);

    renderizarEstudiante("DDD444", cor, 0);
    renderizarEstudiante("DDD444", est, 1);
    renderizarEstudiante("DDD444", est, 2);
    renderizarEstudiante("DDD444", est, 3);
    renderizarEstudiante("DDD444", est, 4);
    renderizarEstudiante("DDD444", est, 5);
    renderizarEstudiante("DDD444", est, 6);

    renderizarEstudiante("CCC333", cor, 0);
    renderizarEstudiante("CCC333", est, 1);
    renderizarEstudiante("CCC333", est, 2);
    renderizarEstudiante("CCC333", est, 3);
    renderizarEstudiante("CCC333", est, 4);
    renderizarEstudiante("CCC333", est, 5);
    renderizarEstudiante("CCC333", est, 6);
    renderizarEstudiante("CCC333", est, 7);
    renderizarEstudiante("CCC333", est, 8);
    renderizarEstudiante("CCC333", est, 9);
    renderizarEstudiante("CCC333", est, 10);
    renderizarEstudiante("CCC333", est, 11);

    renderizarEstudiante("BBB222", cor, 0);
    renderizarEstudiante("BBB222", est, 1);
    */
}
