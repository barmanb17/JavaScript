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

//Reassignment and redeclaration
//Reassignment is the process of changing the value of a variable that has already been declared. This can be done with variables declared using let and var, but not with variables declared using const. example:
let myVar = 10; // variable declared and initialized
myVar = 20; // variable reassigned

//Redeclaration is the process of declaring a variable that has already been declared in the same scope. This can be done with variables declared using var, but not with variables declared using let or const. example:
var myVar2 = 10; // variable declared and initialized
var myVar2 = 20; // variable redeclared and initialized




//Temporary Dead Zone (TDZ)
//The Temporary Dead Zone (TDZ) is a behavior in JavaScript that occurs when a variable is accessed before it has been declared. This can happen with variables declared using let and const. If you try to access a variable before it has been declared, you will get a ReferenceError. example:
console.log(myVar3); // ReferenceError: myVar3 is not defined
let myVar3 = 10; // variable declared and initialized
//The TDZ is the time between the start of the block and the declaration of the variable. During this time, the variable is not accessible, and any attempt to access it will result in a ReferenceError. Once the variable is declared, it can be accessed normally.
//The TDZ is important because it helps to prevent errors in your code by ensuring that variables are declared before they are used. It also helps to make your code more readable by making it clear when a variable is declared and when it is used.

//tdz is the upper bound of the block scope, meaning that any variable declared with let or const cannot be accessed before it is declared. This is different from var, which can be accessed before it is declared, but will return undefined instead of throwing an error.

//hoisting is a behavior in JavaScript where variables and functions are moved to the top of their scope during the compilation phase. This means that you can use a variable or function before it is declared in your code. However, this only applies to variables declared with var, not with let or const. example:

let g = undefined;

console.log(g);

g = 12;

// In this example, the variable a is hoisted to the top of the scope, but it is not initialized until after the console.log statement. This means that the console.log statement will return undefined instead of throwing an error. If you try to access a variable declared with let or const before it is declared, you will get a ReferenceError instead of undefined.

//practive
var q = 1;
{
    var q = 2;
}

console.log(q); // 2 because var is global and function scoped, so it is accessible outside the block

//practice
let aa = 10;
{
    let aa = 20; // this is a different variable than the one declared outside the block
    console.log("inside", aa); // 20
}
console.log("outside", aa); // 10 because the variable aa declared outside the block is not affected by the variable aa declared inside the block

//Why var leaks outside block but let does not?
//This is because var is function scoped, meaning that it is accessible anywhere in the function, while let is block scoped, meaning that it is only accessible within the block in which it is declared. When you declare a variable with var inside a block, it is still accessible outside the block because it is function scoped. However, when you declare a variable with let inside a block, it is not accessible outside the block because it is block scoped.

//Why const allows changing object properties ?
//This is because const only prevents reassignment of the variable itself, not the properties of the object. When you declare an object with const, you cannot reassign the object to a new value, but you can still change the properties of the object. example:
const myObj = { name: "John", age: 30 }; // object declared with const
myObj.age = 31; // changing the age property of the object  
console.log(myObj); // { name: "John", age: 31 } // the object is still the same, but the age property has been changed

//Data types + Type System

// data types in javascript are divided into two categories:


// 1. Primitive data types: These are the basic data types that cannot be broken down
//    into smaller data types. They include:
//    - Number: Represents numeric values, both integers and floating-point numbers.    
//    - String: Represents a sequence of characters, enclosed in single or double quotes.
//    - Boolean: Represents a logical value, either true or false. 
//    - Undefined: Represents a variable that has been declared but not assigned a value.
//    - Null: Represents the intentional absence of any object value.
//    - Symbol: Represents a unique and immutable value, often used as object property keys.
//    - BigInt: Represents integers with arbitrary precision, allowing for very large numbers.


// 2. Non-primitive data types: These are more complex data types that can hold multiple values or properties. They include:
//    - Object{}: Represents a collection of key-value pairs, where keys are strings and values can be of any data type. example:
let person = {
    name: "John",
    age: 30,
    isEmployed: true
}; // object with properties name, age, and isEmployed

//    - Array[]: Represents an ordered collection of values, which can be of any data type. example:
let numbers = [1, 2, 3, 4, 5]; // array of numbers

//    - Function(): Represents a reusable block of code that can be called with arguments and returns a value.example:
function add(a, b) {
    return a + b; // function that takes two arguments and returns their sum
}



//Type coercion

//Type coercion is the automatic or implicit conversion of values from one data type to another. JavaScript performs type coercion in certain situations, such as when performing arithmetic operations or comparing values. 
// example:
let num = 5; // number
let str = "10"; // string
let result = num + str; // type coercion occurs here, num is converted to a string
console.log(result); // "510" // the number is converted to a string and concatenated with the string

//concatination is the process of joining two or more strings together. In JavaScript, you can concatenate strings using the + operator. When you use the + operator with a string and a number, JavaScript will automatically convert the number to a string before concatenating them. This is an example of type coercion.
// In the example above, the number 5 is converted to a string "5" and then concatenated with the string "10", resulting in the final output "510".

//Type coercion can lead to unexpected results, so it's important to be aware of how JavaScript handles different data types and to use explicit type conversion when necessary. example:
let num2 = 5; // number
let str2 = "10"; // string
let result2 = num2 + Number(str2); // explicit type conversion using Number() function
console.log(result2); // 15 // the string is converted to a number and added to the number


//Truthy vs Falsy values
// In JavaScript, values can be classified as either truthy or falsy. Truthy values are those that evaluate to true in a boolean context, while falsy values evaluate to false. example of
//  truthy values include non-empty strings, non-zero numbers, and objects. 

// Falsy values include false, 0, "", null, undefined, and NaN (Not a Number).

//true= 0, false= 1, null=0, !!undefined=false

//why NaN is a number?
// NaN stands for "Not a Number" and is a special value in JavaScript that represents an invalid or undefined numerical operation. It is considered a number type because it is part of the Number data type in JavaScript. However, it is not equal to any other number, including itself. ie- failed mathematical operations.


//undefined vs null
//undefined is a primitive value that indicates that a variable has been declared but has not been assigned a value. It is the default value of uninitialized variables. example:
let myVar1; // variable declared but not assigned a value
console.log(myVar1); // undefined // the variable is declared but not assigned a value
//null is a primitive value that represents the intentional absence of any object value. It is often used to indicate that a variable should not have a value or that an object property does not exist. example:
let myVar2 = null; // variable assigned a null value
console.log(myVar2); // null // the variable is assigned a null value
// The main difference between undefined and null is that undefined indicates that a variable has not been assigned a value, while null indicates that a variable has been intentionally set to have no value. In other words, undefined means "no value assigned," while null means "no value exists."


