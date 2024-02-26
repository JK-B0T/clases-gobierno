	//Declaración de variables
	let fechaActual = new Date();
	let fechaInicio;

	let pass1;
	let pass2;

	function validarContrasenya() { //Función para verificar que 2 contraseñas son iguales
		console.log(pass1.value, pass2.value);
		if (pass1.value !== pass2.value) {
			pass2.setCustomValidity("Las passwords deben coincidir");
		} else {
			pass2.setCustomValidity('');
		}
	}

	function validarFecha() { //Función para verificar que 1 fecha es menor a la fecha actual
		console.log(fechaInicio.valueAsDate, fechaActual);
		if (fechaInicio.valueAsDate < fechaActual) {
			fechaInicio.setCustomValidity("La fecha de inicio no puede ser menor a la fecha actual");
		} else {
			fechaInicio.setCustomValidity('');
		}
	}

	function iniciar() {
		document.getElementById("nombre").focus();
		pass1 = document.getElementById("password1");
		pass2 = document.getElementById("password2");
		fechaInicio = document.getElementById("fechaInicio");

		pass1.addEventListener("input", validarContrasenya, false);
		pass2.addEventListener("input", validarContrasenya, false);
		fechaInicio.addEventListener("input", validarFecha, false);
	}

	window.addEventListener("load", iniciar
	, false);