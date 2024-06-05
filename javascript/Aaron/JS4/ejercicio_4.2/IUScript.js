window.addEventListener("DOMContentLoaded", start, false) 

function start() {
    let listaProyecto = {"bandeja": document.querySelector("aside")} 

    const dialogList = [
        document.getElementById("nuevoCoordinador"),
        document.getElementById("nuevoEstudiante"),
        document.getElementById("nuevoProyecto")
    ];
    const closeBtnList = Array.from(document.querySelectorAll(".closeDialogBtn"));
    closeBtnList.forEach((btn, index) => btn.addEventListener("click", () => dialogList[index].close()));

    const btnNuevoCoordinador = document.getElementById("btnNuevoCoordinador");
    btnNuevoCoordinador.addEventListener("click", () => dialogList[0].showModal(), false);
    const btnNuevoEstudiante = document.getElementById("btnNuevoEstudiante");
    btnNuevoEstudiante.addEventListener("click", () => dialogList[1].showModal(), false);
    const btnNuevoProyecto = document.getElementById("btnNuevoProyecto");
    btnNuevoProyecto.addEventListener("click", () => dialogList[2].showModal(), false);

    function sumarHoras() {
        console.log("Horas añadidas");
    }

    function eliminarRenderizado(elemento) {
        elemento.parentNode.removeChild(elemento);
    }

    function renderizarEstudiante(nombreTabla, estudiante, indice) {
        const posicion = document.querySelector(`${nombreTabla} div:nth-child(${indice})`);
        
        const div = document.createElement("div");
        div.classList.add("estudiante");

        const span1 = document.createElement("span");
        span1.classList.add("tipoEstudiante");
        if (estudiante instanceof Coordinador) {
            span1.textContent = "C";
        } else {
            span1.textContent = "E";
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
        const header = document.createElement("header");
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
    const pro1 = new Proyecto("ABC123", 3, 10);
    const pro2 = new Proyecto("DFG456", 3, 10);
    const pro3 = new Proyecto("HYJ789", 3, 10);
    const pro4 = new Proyecto("KLM012", 3, 10);
    const pro5 = new Proyecto("NOP345", 3, 10);

    renderizarProyecto(pro1, 0);
    renderizarProyecto(pro2, 1);
    renderizarProyecto(pro3, 2);
    renderizarProyecto(pro4, 3);
    renderizarProyecto(pro5, 4);

    renderizarEstudiante("#"+pro1.getCodigo(), cor, 0);
    renderizarEstudiante("#"+pro1.getCodigo(), est, 1);
    renderizarEstudiante("#"+pro1.getCodigo(), est, 2);
    renderizarEstudiante("#"+pro1.getCodigo(), est, 3);

    renderizarEstudiante("#"+pro2.getCodigo(), cor, 0);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 1);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 2);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 3);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 4);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 5);
    renderizarEstudiante("#"+pro2.getCodigo(), est, 6);

    renderizarEstudiante("#"+pro3.getCodigo(), cor, 0);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 1);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 2);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 3);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 4);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 5);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 6);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 7);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 8);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 9);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 10);
    renderizarEstudiante("#"+pro3.getCodigo(), est, 11);

    renderizarEstudiante("#"+pro4.getCodigo(), cor, 0);
    renderizarEstudiante("#"+pro4.getCodigo(), est, 1);

    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", cor, 1);

    function renderizarCoodinador() {
        
    }

    function renderizarCoodinador() {
        
    }
}
