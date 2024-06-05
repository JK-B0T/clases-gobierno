window.addEventListener("DOMContentLoaded", start, false) 

function start() {
    const bandeja = document.querySelector("aside");
    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");
    const pro = new Proyecto("ZXY123", 3, 10);

    function renderizarEstudiante(nombreTabla, estudiante, indice) {
        const position = document.querySelector(`${nombreTabla} div:nth-child(${indice})`);
        
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

        if (indice === 0) {
            document.querySelector(`${nombreTabla}`).prepend(div);
        } else {
            position.insertAdjacentElement("afterend", div);
        }
    }

    renderizarEstudiante("aside", est, 0);
    renderizarEstudiante("aside", cor, 2);

    function renderizarCoodinador() {
        
    }

    function renderizarCoodinador() {
        
    }
}
