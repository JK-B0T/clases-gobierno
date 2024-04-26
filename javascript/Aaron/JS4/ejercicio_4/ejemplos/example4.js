"use strict";

/** 
 * Ejemplo de valor string (toString) de una clase y valor primitivo (valueOf), 
 * en este caso la vitalidad del guerrero.
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

console.log(w1 < w2); // false

let warriors = [w1, w2, w3, w4];
warriors.sort((w1, w2) => w1 - w2);
console.log(warriors.toString());
