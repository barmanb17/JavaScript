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

var d = 12; //adds in window also its a global variable and function scoped can be declared anywhere cannot use it function scoped because it is a global variable and can be accessed anywhere in the code
let e = 13; //adds in block scope
{
    var f = 14; //adds in window because var is function scoped and function scope is global
    let g = 15; //adds in block scope because let is block scoped
}   
//here var f is accessible outside the block but let g is not accessible outside the block

const discount = 20 // cannot be reassigned because const is a constant and cannot be changed because it is block scoped
// discount = 30; // this will throw an error because discount is a constant and cannot be reassigned

//summery is that var is function scoped and can be accessed anywhere in the code, let is block scoped and can be accessed only within the block, and const is also block scoped but cannot be reassigned.

//global scope is the outermost scope in which all variables are declared. Variables declared in the global scope can be accessed from anywhere in the code, including inside functions and blocks. example:
var globalVar = "I am a global variable"; // global variable

//function scope is a scope that is created by a function. Variables declared inside a function can only be accessed within that function. example: 
function myFunction() {
    var functionVar = "I am a function variable"; // function variable  
    console.log(functionVar); // I am a function variable
}

//block scope is a scope that is created by a block of code, such as an if statement, for loop, or while loop. Variables declared inside a block scope can only be accessed within that block. example:
{
    let blockVar = "I am a block variable"; // block variable
    console.log(blockVar); // I am a block variable
}   

//

