window.addEventListener("DOMContentLoaded", start, false) 

function start() {
    const bandeja = document.querySelector("aside");
    const est = new Estudiante("Pepo");
    const cor = new Coordinador("Coco", "Cocotero");
    const pro = new Proyecto("ZXY123", 3, 10);

    function sumarHoras() {
        console.log("Horas añadidas");
    }

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

        const btn1 = document.createElement("button");
        btn1.setAttribute("type", "button")
        btn1.classList.add("btnElminarEstudiante");
        btn1.textContent = "X";
        btn1.addEventListener("click", () => div.parentNode.removeChild(div), false)
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
