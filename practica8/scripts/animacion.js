

function animaciones () {
    const chincheta1 = document.querySelector("#artHTML > header > .chincheta");
    chincheta1.addEventListener("animationend", animacionArt1, false)
    chincheta1.classList.add("chincheta1");

    function animacionArt1 () {
        const articulo1 = document.querySelector("#artHTML");
        articulo1.addEventListener("animationend", animacionChi2, false)
        articulo1.classList.add("article1");

        function animacionChi2 () {
            const chincheta2 = document.querySelector("#artCSS > header > .chincheta");
            articulo1.addEventListener("animationend", animacionChi3, false)
            chincheta2.classList.add("chincheta2");

            function animacionChi3 () {
                const chincheta3 = document.querySelector("#artJS > header > .chincheta");
                chincheta3.addEventListener("animationend", animacionArt3, false)
                chincheta3.classList.add("chincheta3");

                function animacionArt3 () {
                    const articulo3 = document.querySelector("#artJS");
                    articulo3.classList.add("article3");
                }
            }
        }
    }
}

window.addEventListener("load", animaciones, false);