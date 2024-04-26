"use strict";

/**
 * Ejemplo de desestructuración de las propiedades de un objeto
 */

class Warrior {
    constructor(name, vitality) {
        this.vitality = vitality;
        this.name = name;
    }
    
    toString() {
        return this.name + " (" + this.vitality + ")";
    }

    valueOf() {
        return this.vitality;
    }
}

let w1 = new Warrior("James Warrior", 150);
let w2 = new Warrior("Peter Strong", 100);
let w3 = new Warrior("Wanna Die", 80);
let w4 = new Warrior("Lame Warrior", 110);

let warriors = [w1, w2, w3, w4];

warriors.forEach(w => {
    let name = w.name;
    let vitality = w.vitality;
    console.log(`Warrior: ${name}. Vitality: ${vitality}`);
});

console.log("---------------------------");

warriors.forEach(w => {
    let {name, vitality} = w;
    console.log(`Warrior: ${name}. Vitality: ${vitality}`);
});

console.log("---------------------------");

let {name: nameW1, vitality: vitW1} = w1;
console.log(`Warrior 1: ${nameW1}. Vitality 1: ${vitW1}`);
