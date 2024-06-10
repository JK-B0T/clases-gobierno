window.addEventListener("DOMContentLoaded", start, false) 

function start() {

    let listaProyectos = {
        "bandeja": new Proyecto("bandeja", 100, 0),
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

    function updateDragger (e) {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        const element = e.target;

        if (draggable.classList.contains("estudiante")) {
            const estudiante = listaEstudiantes[draggable.querySelector(".nombreEstudiante").textContent];

            if (element.classList.contains("estudiante") || element.classList.contains("proyecto")) {
                e.stopPropagation();

                if (element.classList.contains("estudiante")) {
                    const proyecto = listaProyectos[element.parentNode.getAttribute("id")];
                    const container = element.parentNode;

                    if (estudiante.cambiaProyecto(proyecto)) {
                        container.insertBefore(draggable, element.nextSibling);
                    }
                } else if (element.classList.contains("coordinador")) {
                    const coordinador = listaProyectos[element.querySelector("section").getAttribute("id")];
                    const container = element.querySelector("section");

                    if (estudiante.cambiaProyecto(proyecto)) {
                        container.appendChild(draggable);
                    }
                } else {
                    const proyecto = listaProyectos[element.querySelector("section").getAttribute("id")];
                    const container = element.querySelector("section");

                    if (estudiante.cambiaProyecto(proyecto)) {
                        container.appendChild(draggable);
                    }
                }
            }

        } else {
            if (element.classList.contains("proyecto")) {
                e.stopPropagation();
                element.parentNode.insertBefore(draggable, element.nextSibling);
            } else if (element.tagName === "MAIN") {
                e.stopPropagation();
                element.appendChild(draggable);
            }
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
        div.addEventListener("dragend", () => {div.classList.remove("dragging")}, false);
        div.classList.add("estudiante");
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
        header.addEventListener("dragend", () => {article.classList.remove("dragging")}, false);
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

    window.addEventListener("dragover", updateDragger, false);

    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");

    crearProyecto({codigo: "AAA111", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "BBB222", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "CCC333", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "DDD444", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "EEE555", maxEstudiantes: 3, costeHora: 10});

    crearEstudiante({nombre: "1"});
    crearCoordinador({nombre: "2", especialidad: "ganga"});
    crearEstudiante({nombre: "3"});
    crearEstudiante({nombre: "4"});
    crearEstudiante({nombre: "5"});
    crearEstudiante({nombre: "6"});
    crearEstudiante({nombre: "7"});
    crearEstudiante({nombre: "8"});
    crearEstudiante({nombre: "9"});
    crearEstudiante({nombre: "10"});
    crearCoordinador({nombre: "11", especialidad: "binbo"});

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
