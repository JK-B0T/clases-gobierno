"use strict";

/**
 * Ejemplo de herencia en JavaScript
 */

class Drink {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    static getTypes() {
        return ["Alcoholic", "Sugar", "Dietetic", "Water"];
    }
}

class AlcoholicDrink extends Drink {
    constructor(name, price, tax) {
        super(name, price);
        this.tax = tax;
    }

    getPrice() {
        return this.price * (1 + this.tax / 100);
    }
}

let vodka = new AlcoholicDrink("Vodka", 6, 20);
console.log(vodka);
console.log(vodka.getPrice().toFixed(2));

console.log(Drink.getTypes());

