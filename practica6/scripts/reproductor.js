//función que redimensiona la barra una vez pulsado el play
function redimensionaBarra()
{	
	//Si al llamar a la función, el vídeo no ha terminado
	if(!medio.ended)
	{
		/*se crea una variable que toma el valor, pasado a número entero
		de lo que lleva el vídeo*/
		var total=parseInt(medio.currentTime*maximo / medio.duration);
		//se modifica el ancho del elemento
		progreso.style.width=total+'px';
	}
	//Si el vídeo ha terminado
	else
	{
		//el ancho de la barra se pone a 0
		progreso.style.width='0px';
		//cambia el valor del botón
		play.value='\u25BA';
		//y se limpia el intervalo creado antes
		window.clearInterval(bucle);
	}
}
/*función que será llamada cuando se pulse la barra del vídeo
pasando por parámetro el punto dónde ha ocurrido el evento*/
function desplazarMedio(e)
{
	//si el vídeo no está pausado ni terminado
	if(!medio.paused && !medio.ended)
	{
		/*cogemos la posición del ratón en el eje x, 
		para ello hay que restar su posición, dentro del elemento, del eje y*/
		var ratonX=e.pageX-barra.offsetLeft;
		//creamos una variable que contendrá el tiempo de dónde hemos pulsado
		var nuevoTiempo=ratonX*medio.duration/maximo;
		//actualizamos el tiempo en el vídeo
		medio.currentTime=nuevoTiempo;
		//redimensionamos la barra con la posición del ratón
		progreso.style.width=ratonX+'px';
	}
}
//función que ocurre cuando pulsamos play
function accionPlay()
{
	//si el vídeo no está pausado ni terminado
	if(!medio.paused && !medio.ended) 
	{
		//se pausa el vídeo
		medio.pause();
		//cambia el valor del botón play al triángulo invertido
		play.value='\u25BA';
		//se limpia el intervalo creado antes
		window.clearInterval(bucle);
	}
	//la primera vez que pulsemos play entrará en esta parte del código
	else
	{
		//se pondrá en marcha el vídeo
		medio.play();
		//cambiará el valor del botón y aparecerán dos pipe
		play.value='||';
		/*se crea una variable asociada a un intervalo de 1s
		que irá llamando a la función redimensionaBarra*/
		bucle=setInterval(redimensionaBarra, 1000);
	}
}

function accionReiniciar()
{
	medio.currentTime = 0;
}

function accionRetrasar()
{
	console.log(`Tiempo anterior: ${medio.currentTime} / Nuevo tiempo : ${medio.currentTime - 5}`)
	medio.currentTime = +medio.currentTime - 5;
}

function accionAdelantar()
{
	console.log(`Tiempo anterior: ${medio.currentTime} / Nuevo tiempo : ${medio.currentTime + 5}`)
	medio.currentTime = +medio.currentTime + 5;
}

function accionSilenciar()
{
	if (!medio.muted) 
	{
		medio.muted = true;
		silenciar.style.value="escuchar";
	}
	else
	{
		medio.muted = false;
		silenciar.style.value="silenciar";
	}
}

function accionMasVolumen()
{
	if (!(medio.volume >= 1)) 
	{
		medio.volume = (medio.volume + 0.1).toFixed(1);
	}
	console.log("Volumen: "+medio.volume);
}

function accionMenosVolumen()
{
	if (!(medio.volume <= 0)) 
	{
		medio.volume = (medio.volume - 0.1).toFixed(1)
	}
	console.log("Volumen: "+medio.volume);
}

//función inicial
function iniciar() 
{
	//se declara una variable que es el máximo de la barra
	maximo=700;
	//obtenemos los objetos de los elementos
	medio=document.getElementById('medio');
	barra=document.getElementById('barra');
	progreso=document.getElementById('progreso');
	play=document.getElementById('play');
	reiniciar=document.getElementById('reiniciar');
	retrasar=document.getElementById('retrasar');
	adelantar=document.getElementById('adelantar');
	silenciar=document.getElementById('silenciar');
	menosVolumen=document.getElementById('menosVolumen');
	masVolumen=document.getElementById('masVolumen');
	
	//creamos los manejadores de eventos
	play.addEventListener('click', accionPlay, false);
	reiniciar.addEventListener('click', accionReiniciar, false);
	retrasar.addEventListener('click', accionRetrasar, false);
	adelantar.addEventListener('click', accionAdelantar, false);
	silenciar.addEventListener('click', accionSilenciar, false);
	menosVolumen.addEventListener('click', accionMenosVolumen, false);
	masVolumen.addEventListener('click', accionMasVolumen, false);
	barra.addEventListener('click', desplazarMedio, false);
	
}
//primer evento que sucede cuando la página ha cargado
window.addEventListener('load', iniciar, false);