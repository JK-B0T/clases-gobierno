class Telefono {
    constructor (tarifa = 0.09) {
        this.tarifa = tarifa, 
        this.saldo = 18.95, 
        this.minutos_llamada = 0};

    getSaldo () {
        return this.saldo.toFixed(2);
    }
    getTarifa () {
        return this.tarifa;
    }
    getUso () {
        return this.minutos_llamada;
    }
    llama (num) {
        if (!(num <= 0)) {
            const minutosGastados = (this.saldo / this.tarifa).toFixed(2);

            if (!((num * this.tarifa) > this.saldo)) {
                const dineroGastado = (num * this.tarifa).toFixed(2);
                console.log(`Llamaste por ${num} minutos compa, adios a ${dineroGastado}€`);
                this.saldo -= (dineroGastado);
                this.minutos_llamada += minutosGastados;
                return true;
            } else if (minutosGastados >= 1) {
                console.log(`Llamaste por ${minutosGastados} minutos compa, adios a ${(minutosGastados) * this.tarifa}€`);
                this.saldo = 0;
                this.minutos_llamada += minutosGastados;
                return true;
            } else {
                console.log("No dispones de suficiente saldo");
                return false;
            }

        } else {
            console.log("No dispones de suficiente saldo");
            return false;
        }
    }
    dispone () {
        if ((this.saldo / this.tarifa).toFixed(2) >= 1) {
            console.log(`Te quedan ${(this.saldo/this.tarifa).toFixed(0)} minutos de llamada`);
        } else {
            console.log(`Te quedan 0 minutos de llamada`);
        }

    }
    recargar (num) {
        if (num > 0) {
            this.saldo += num;
            return true;
        } else {
            return false;
        }
    }
}

let movil = new Telefono(0.1);