window.addEventListener("DOMContentLoaded", start, false) 

function start() {

    let listaProyectos = [
        {
            "plantilla": [],
            "codigo": "aside",
        },
    ]

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
        const plantilla = listaProyectos[0].plantilla
        plantilla.push(new Estudiante(data.nombre));
        renderizarEstudiante(listaProyectos[0].codigo, plantilla[plantilla.length-1], 0)
    }

    function crearCoordinador(data) {
        const plantilla = listaProyectos[0].plantilla
        plantilla.push(new Coordinador(data.nombre, data.especialidad));
        renderizarEstudiante(listaProyectos[0].codigo, plantilla[plantilla.length-1], 0)
    }

    function crearProyecto(data) {
        listaProyectos.push(new Proyecto(data.codigo, data.maxEstudiantes, data.costeHora));
        renderizarProyecto(listaProyectos[listaProyectos.length-1], 0);
        updateDragger();
    }

    function updateDragger () {
        const contenedor = document.querySelector("main");

        function placeElement(e) {
            e.preventDefault();
            const siblings = Array.from(document.querySelectorAll(".proyecto:not(.dragging)"));
            siblings.unshift(document.querySelector("aside"));
            const dragItem = document.querySelector(".dragging");

            let nextSibling = siblings.find( sibling => {
                if (sibling.tagName === "ASIDE") {
                    return (e.clientX <= sibling.offsetLeft + sibling.offsetWidth);
                } else {
                    return (e.clientY + contenedor.scrollTop <= sibling.offsetTop + sibling.offsetHeight);
                }
            });

            if (dragItem.classList.contains("estudiante")) {
                e.stopPropagation();
                if (dragItem.firstChild.textContent === "C") {
                    if (nextSibling.tagName === "ASIDE") {
                        //Si proyecto de coordinador tiene estudiantes, aparece mensaje de alerta para confirmar acción
                        //Si se confirma, todos los estudiantes de proyecto se mueven a la bandeja
                        nextSibling.prepend(dragItem);
                    } else {
                        //Si el proyecto al que se mueve ya tiene coordinador, se intercambian el proyecto o bandeja
                        nextSibling.querySelector("section").prepend(dragItem);
                    }
                } else {
                    if (nextSibling.tagName === "ASIDE") {
                        nextSibling.appendChild(dragItem);
                    } else {
                        //Si el proyecto alcanzo su máximo o está vacío, no ocurre nada
                        nextSibling.querySelector("section").appendChild(dragItem);
                    }
                }
            } else {
                contenedor.insertBefore(dragItem, nextSibling);
            }
        }

        contenedor.parentNode.addEventListener("dragover", placeElement, false);
    }

    function sumarHoras() {
        console.log("Horas añadidas");
    }

    function eliminarRenderizado(elemento) {
        elemento.parentNode.removeChild(elemento);
    }

    function renderizarEstudiante(nombreTabla, estudiante, indice) {
        const posicion = document.querySelector(`${nombreTabla} div:nth-child(${indice})`);
        
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
        } else {
            span1.textContent = "E";
            span1.setAttribute("style", "color: green")
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
            document.querySelector(`${nombreTabla}`).prepend(div);
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

    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");

    crearProyecto({codigo: "ABC123", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "DFG456", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "HYJ789", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "KLM012", maxEstudiantes: 3, costeHora: 10});
    crearProyecto({codigo: "NOP345", maxEstudiantes: 3, costeHora: 10});

    renderizarEstudiante("#"+listaProyectos[5].getCodigo(), cor, 0);
    renderizarEstudiante("#"+listaProyectos[5].getCodigo(), est, 1);
    renderizarEstudiante("#"+listaProyectos[5].getCodigo(), est, 2);
    renderizarEstudiante("#"+listaProyectos[5].getCodigo(), est, 3);

    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), cor, 0);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 1);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 2);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 3);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 4);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 5);
    renderizarEstudiante("#"+listaProyectos[4].getCodigo(), est, 6);

    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), cor, 0);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 1);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 2);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 3);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 4);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 5);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 6);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 7);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 8);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 9);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 10);
    renderizarEstudiante("#"+listaProyectos[3].getCodigo(), est, 11);

    renderizarEstudiante("#"+listaProyectos[2].getCodigo(), cor, 0);
    renderizarEstudiante("#"+listaProyectos[2].getCodigo(), est, 1);

    crearEstudiante({nombre: "Jusep"});
    crearCoordinador({nombre: "El Gongas", especialidad: "ganga"});
    crearEstudiante({nombre: "JohnCos"});
    crearEstudiante({nombre: "Shadia"});
    crearEstudiante({nombre: "Yeipis"});
    crearEstudiante({nombre: "James"});
    crearEstudiante({nombre: "Aida"});
    crearEstudiante({nombre: "Guellens"});
    crearEstudiante({nombre: "Perrin"});
    crearEstudiante({nombre: "Gatin"});
    crearCoordinador({nombre: "La Bimbas", especialidad: "binbo"});
}
