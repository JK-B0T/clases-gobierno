window.addEventListener("DOMContentLoaded", start, false) 

function start() {

    let horasTrabajadas;
    let horasInvertidas;
    let modo;
    let elementoAEliminar;

    let listaProyectos = {
        "bandeja": new Proyecto("bandeja", 100, 0, true, false),
    }

    let listaEstudiantes = {

    }

    const dialogList = [
        document.getElementById("nuevoCoordinador"),
        document.getElementById("nuevoEstudiante"),
        document.getElementById("nuevoProyecto"),
        document.getElementById("ventanaHoras"),
        document.getElementById("ventanaAceptar"),
    ];
    const closeBtnList = Array.from(document.querySelectorAll(".closeDialogBtn"));
    closeBtnList.forEach((btn, index) => btn.addEventListener("click", () => dialogList[index].close()));

    const modalBtnList = [
        document.getElementById("btnNuevoCoordinador"),
        document.getElementById("btnNuevoEstudiante"),
        document.getElementById("btnNuevoProyecto"),
        //document.getElementById("sumarBtn"),
        //document.getElementById("aceptarBtn"),
    ];
    modalBtnList.forEach((btn, index) => btn.addEventListener("click", () => dialogList[index].showModal()));

    const formList = [
        document.getElementById("nuevoCoordinador").firstElementChild,
        document.getElementById("nuevoEstudiante").firstElementChild,
        document.getElementById("nuevoProyecto").firstElementChild,
        document.getElementById("ventanaHoras").firstElementChild,
    ];
    formList.forEach((form) => form.addEventListener("submit", onFormSubmit, false));

    function onFormSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const objData = Object.fromEntries(data.entries())

        if (objData.hasOwnProperty("codigo")) {
            crearProyecto(objData);
        } else if (objData.hasOwnProperty("especialidad")) {
            crearCoordinador(objData);
        } else if (objData.hasOwnProperty("nombre")){
            crearEstudiante(objData);
        }else {
            sumarHoras(objData);
        }
    }

    function crearEstudiante(data) {
        const estudiante = new Estudiante(data.nombre);
        listaProyectos.bandeja.incluye(estudiante);
        listaEstudiantes[data.nombre] = estudiante;
        renderizarEstudiante(listaProyectos.bandeja.codigo, estudiante, 0);
        dialogList[1].close();
    }

    function crearCoordinador(data) {
        const coordinador = new Coordinador(data.nombre, data.especialidad);
        listaProyectos.bandeja.incluye(coordinador);
        listaEstudiantes[data.nombre] = coordinador;
        renderizarEstudiante(listaProyectos.bandeja.codigo, coordinador, 0);
        dialogList[0].close();
    }

    function crearProyecto(data) {
        listaProyectos[data.codigo] = new Proyecto(data.codigo, data.maxEstudiantes, data.costeHora);
        renderizarProyecto(listaProyectos[data.codigo], 0);
        dialogList[2].close();
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
                            newDropZone.prepend(document.getElementById(oldProject.plantilla[i].getNombre()));
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

    function abrirSumarHoras(e) {
        dialogList[3].showModal();

        horasTrabajadas = e.target.parentNode.querySelector(".horasTrabajadas");
        if (e.target.parentNode.parentNode.getAttribute("id") === "bandeja") {
            horasInvertidas = null
        } else {
            horasInvertidas = e.target.parentNode.parentNode.parentNode.querySelector(".horasInvertidas");
        }
    } 

    function sumarHoras(data) {
        const nuevasHorasTrabajadas = +horasTrabajadas.textContent + +data.horasTrabajadas;
        const nuevasHorasInvertidas = +horasInvertidas.textContent.match(/\d/g).join("") + +data.horasTrabajadas;

        horasTrabajadas.textContent = nuevasHorasTrabajadas;
        horasInvertidas.textContent = nuevasHorasInvertidas;
        dialogList[3].close();
    } 

    function eliminarRenderizado() {
        if (modo === 1) {
            if (elementoAEliminar.tagName === "ARTICLE") {
                delete listaProyectos[listaProyectos[elementoAEliminar.querySelector("section").getAttribute("id")]];
            } else {
                const proyecto = listaProyectos[elementoAEliminar.parentNode.getAttribute("id")];
                delete listaEstudiantes[listaEstudiantes[elementoAEliminar.getAttribute("id")]];
                proyecto.elimina(elementoAEliminar.getAttribute("id"));
            }
            elementoAEliminar.parentNode.removeChild(elementoAEliminar);
        } else if (modo === 2) {
            const proyecto = listaProyectos[elementoAEliminar.querySelector("section").getAttribute("id")];
            const bandeja = document.querySelector("#bandeja");

            for (let i = proyecto.plantilla.length-1; i >= 0 ; i--) {
                if (proyecto.plantilla[i] instanceof Coordinador) {
                    bandeja.prepend(document.getElementById(proyecto.plantilla[i].getNombre()));
                } else {
                    bandeja.append(document.getElementById(proyecto.plantilla[i].getNombre()));
                }
                proyecto.plantilla[i].cambiaProyecto(listaProyectos["bandeja"]);
            }
            delete listaProyectos[proyecto.getCodigo()];
            elementoAEliminar.parentNode.removeChild(elementoAEliminar);
        } else if (modo === 3) {
            const proyecto = listaProyectos[elementoAEliminar.parentNode.getAttribute("id")];
            const bandeja = document.querySelector("#bandeja");

            for (let i = proyecto.plantilla.length-1; i >= 1 ; i--) {
                if (proyecto.plantilla[i] instanceof Coordinador) {
                    bandeja.prepend(document.getElementById(proyecto.plantilla[i].getNombre()));
                } else {
                    bandeja.append(document.getElementById(proyecto.plantilla[i].getNombre()));
                }
                proyecto.plantilla[i].cambiaProyecto(listaProyectos["bandeja"]);
            }
            proyecto.elimina(elementoAEliminar.getAttribute("id"));
            delete listaEstudiantes[elementoAEliminar.getAttribute("id")];
            elementoAEliminar.parentNode.removeChild(elementoAEliminar);
        }
        
        dialogList[4].close();
    }

    function mostrarVentana(elemento) {
        const mensaje = document.querySelector(".mensaje");
        elementoAEliminar = elemento;
        
        if (elemento.tagName === "ARTICLE") {
            if (elemento.querySelector("section").hasChildNodes()) {
                mensaje.textContent = "¿Seguro que quieres eliminar este proyecto? Sus estudiantes se moveran a la bandeja";
                modo = 2;
            } else {
                mensaje.textContent = "¿Seguro que quieres eliminar este proyecto?";
                modo = 1;
            }
        } else if (listaEstudiantes[elemento.getAttribute("id")] instanceof Coordinador) {
            if (elemento.parentNode.getAttribute("id") !== "bandeja" && elemento.nextSibling) {
                mensaje.textContent = "¿Seguro que quieres eliminar este coordinador? Los estudiantes se moveran a la bandeja";
                modo = 3;
            } else {
                mensaje.textContent = "¿Seguro que quieres eliminar a este coordinador?";
                modo = 1;
            } 
        } else {
            mensaje.textContent = "¿Seguro que quieres eliminar a este estudiante?";
            modo = 1;
        }
        dialogList[4].showModal();
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
        btn1.addEventListener("click", () => mostrarVentana(div), false)
        div.appendChild(btn1);

        const btn2 = document.createElement("button");
        btn2.setAttribute("type", "button")
        btn2.classList.add("btnSumarHoras");
        btn2.textContent = "+";
        btn2.addEventListener("click", (e) => abrirSumarHoras(e), false)
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
        btn1.addEventListener("click", () => mostrarVentana(article), false)
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

    document.querySelector("#aceptarBtn").addEventListener("click", eliminarRenderizado, false);
    document.querySelector("main").addEventListener("drop", (e) => {comprobar(e);}, false);
    document.querySelector("main").addEventListener("dragover", (e) => {e.preventDefault()}, false);
    document.querySelector("aside").addEventListener("drop", (e) => {comprobar(e);}, false);
    document.querySelector("aside").addEventListener("dragover", (e) => {e.preventDefault()}, false);

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
    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");

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
