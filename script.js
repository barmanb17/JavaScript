//var let const

//we wont use var 
//let and const are block scoped
let x = 10; 
const y = 20; // cannot be reassigned
let z = 30; // can be reassigned
console.log(x); // 10
console.log(y); // 20  
console.log(z); // 30
z = 40; // reassigning z        
console.log(z); // 40
// const y = 50; // this will throw an error because y is a constant and cannot be reassigned
// let x = 50; // this will throw an error because x is already declared in the same scope

//declaration and initialization
let a; // declaration
a = 10; // initialization
let b = 20; // declaration and initialization
//re-declaration
let c = 30; // declaration and initialization
//let c = 40; // this will throw an error because c is already declared in the same scope
//re-declaration with let


