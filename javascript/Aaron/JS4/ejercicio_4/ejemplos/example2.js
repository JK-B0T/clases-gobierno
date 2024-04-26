"use strict";

/**
 * Ejemplo de declarar clases con métodos
 */

class Person2015 {
    constructor(name = "Nobody", age = 100) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`My name is ${this.name} and I'm ${this.age}`);
    }

    toString() {
        return `${this.name} (${this.age})`;
    }
}

let p2015 = new Person2015("Peter", 25);
p2015.sayHello();
console.log(p2015.toString());
console.log(p2015);
