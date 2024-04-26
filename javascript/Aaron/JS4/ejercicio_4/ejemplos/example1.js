"use strict";

/**
 * Ejemplo de creación de un objeto genérico a partir de la clase Object y otro igual en JSON
 */

let obj = new Object();
obj.a = 12;
obj.b = "Bye";
obj.sayHello = function() {
    setTimeout(() => {
        console.log(`Obj: My property a is ${this.a}`);
    },2000);
}

console.log(obj);
console.log(obj.a, obj.b);
console.log(obj["a"], obj["b"]);
obj.sayHello();

let objJson = {
    a: 23,
    b: "Hello",
    sayHello() {
        setTimeout(() => {
            console.log(`ObjJSON: My property a is ${this.a}`);
        },2000);
    }
};
console.log(objJson);
objJson.sayHello();
