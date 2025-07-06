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
const yy = 50; // this will throw an error because y is a constant and cannot be reassigned
let xx = 50; // this will throw an error because x is already declared in the same scope

// //declaration and initialization
// let a; // declaration
// a = 10; // initialization
// let b = 20; // declaration and initialization
// //re-declaration
// let c = 30; // declaration and initialization
// //let c = 40; // this will throw an error because c is already declared in the same scope
// //re-declaration with let

// var d = 12; //adds in window also its a global variable and function scoped can be declared anywhere cannot use it function scoped because it is a global variable and can be accessed anywhere in the code
// let e = 13; //adds in block scope
// {
//     var f = 14; //adds in window because var is function scoped and function scope is global
//     let g = 15; //adds in block scope because let is block scoped
// }   
// //here var f is accessible outside the block but let g is not accessible outside the block

// const discount = 20 // cannot be reassigned because const is a constant and cannot be changed because it is block scoped
// // discount = 30; // this will throw an error because discount is a constant and cannot be reassigned

// //summery is that var is function scoped and can be accessed anywhere in the code, let is block scoped and can be accessed only within the block, and const is also block scoped but cannot be reassigned.

// //global scope is the outermost scope in which all variables are declared. Variables declared in the global scope can be accessed from anywhere in the code, including inside functions and blocks. example:
// var globalVar = "I am a global variable"; // global variable

// //function scope is a scope that is created by a function. Variables declared inside a function can only be accessed within that function. example: 
// function myFunction() {
//     var functionVar = "I am a function variable"; // function variable  
//     console.log(functionVar); // I am a function variable
// }

// //block scope is a scope that is created by a block of code, such as an if statement, for loop, or while loop. Variables declared inside a block scope can only be accessed within that block. example:
// {
//     let blockVar = "I am a block variable"; // block variable
//     console.log(blockVar); // I am a block variable
// }   

// //Reassignment and redeclaration
// //Reassignment is the process of changing the value of a variable that has already been declared. This can be done with variables declared using let and var, but not with variables declared using const. example:
// let myVar = 10; // variable declared and initialized
// myVar = 20; // variable reassigned

// //Redeclaration is the process of declaring a variable that has already been declared in the same scope. This can be done with variables declared using var, but not with variables declared using let or const. example:
// var myVar2 = 10; // variable declared and initialized
// var myVar2 = 20; // variable redeclared and initialized




// //Temporary Dead Zone (TDZ)
// //The Temporary Dead Zone (TDZ) is a behavior in JavaScript that occurs when a variable is accessed before it has been declared. This can happen with variables declared using let and const. If you try to access a variable before it has been declared, you will get a ReferenceError. example:
// console.log(myVar3); // ReferenceError: myVar3 is not defined
// let myVar3 = 10; // variable declared and initialized
// //The TDZ is the time between the start of the block and the declaration of the variable. During this time, the variable is not accessible, and any attempt to access it will result in a ReferenceError. Once the variable is declared, it can be accessed normally.
// //The TDZ is important because it helps to prevent errors in your code by ensuring that variables are declared before they are used. It also helps to make your code more readable by making it clear when a variable is declared and when it is used.

// //tdz is the upper bound of the block scope, meaning that any variable declared with let or const cannot be accessed before it is declared. This is different from var, which can be accessed before it is declared, but will return undefined instead of throwing an error.

// //hoisting is a behavior in JavaScript where variables and functions are moved to the top of their scope during the compilation phase. This means that you can use a variable or function before it is declared in your code. However, this only applies to variables declared with var, not with let or const. example:

// let g = undefined;

// console.log(g);

// g = 12;

// // In this example, the variable a is hoisted to the top of the scope, but it is not initialized until after the console.log statement. This means that the console.log statement will return undefined instead of throwing an error. If you try to access a variable declared with let or const before it is declared, you will get a ReferenceError instead of undefined.

// //practive
// var q = 1;
// {
//     var q = 2;
// }

// console.log(q); // 2 because var is global and function scoped, so it is accessible outside the block

// //practice
// let aa = 10;
// {
//     let aa = 20; // this is a different variable than the one declared outside the block
//     console.log("inside", aa); // 20
// }
// console.log("outside", aa); // 10 because the variable aa declared outside the block is not affected by the variable aa declared inside the block

// //Why var leaks outside block but let does not?
// //This is because var is function scoped, meaning that it is accessible anywhere in the function, while let is block scoped, meaning that it is only accessible within the block in which it is declared. When you declare a variable with var inside a block, it is still accessible outside the block because it is function scoped. However, when you declare a variable with let inside a block, it is not accessible outside the block because it is block scoped.

// //Why const allows changing object properties ?
// //This is because const only prevents reassignment of the variable itself, not the properties of the object. When you declare an object with const, you cannot reassign the object to a new value, but you can still change the properties of the object. example:
// const myObj = { name: "John", age: 30 }; // object declared with const
// myObj.age = 31; // changing the age property of the object  
// console.log(myObj); // { name: "John", age: 31 } // the object is still the same, but the age property has been changed

// //Data types + Type System

// // data types in javascript are divided into two categories:


// // 1. Primitive data types: These are the basic data types that cannot be broken down
// //    into smaller data types. They include:
// //    - Number: Represents numeric values, both integers and floating-point numbers.    
// //    - String: Represents a sequence of characters, enclosed in single or double quotes.
// //    - Boolean: Represents a logical value, either true or false. 
// //    - Undefined: Represents a variable that has been declared but not assigned a value.
// //    - Null: Represents the intentional absence of any object value.
// //    - Symbol: Represents a unique and immutable value, often used as object property keys.
// //    - BigInt: Represents integers with arbitrary precision, allowing for very large numbers.


// // 2. Non-primitive data types: These are more complex data types that can hold multiple values or properties. They include:
// //    - Object{}: Represents a collection of key-value pairs, where keys are strings and values can be of any data type. example:
// let person = {
//     name: "John",
//     age: 30,
//     isEmployed: true
// }; // object with properties name, age, and isEmployed

// //    - Array[]: Represents an ordered collection of values, which can be of any data type. example:
// let numbers = [1, 2, 3, 4, 5]; // array of numbers

// //    - Function(): Represents a reusable block of code that can be called with arguments and returns a value.example:
// function add(a, b) {
//     return a + b; // function that takes two arguments and returns their sum
// }



// //Type coercion

// //Type coercion is the automatic or implicit conversion of values from one data type to another. JavaScript performs type coercion in certain situations, such as when performing arithmetic operations or comparing values. 
// // example:
// let num = 5; // number
// let str = "10"; // string
// let result = num + str; // type coercion occurs here, num is converted to a string
// console.log(result); // "510" // the number is converted to a string and concatenated with the string

// //concatination is the process of joining two or more strings together. In JavaScript, you can concatenate strings using the + operator. When you use the + operator with a string and a number, JavaScript will automatically convert the number to a string before concatenating them. This is an example of type coercion.
// // In the example above, the number 5 is converted to a string "5" and then concatenated with the string "10", resulting in the final output "510".

// //Type coercion can lead to unexpected results, so it's important to be aware of how JavaScript handles different data types and to use explicit type conversion when necessary. example:
// let num2 = 5; // number
// let str2 = "10"; // string
// let result2 = num2 + Number(str2); // explicit type conversion using Number() function
// console.log(result2); // 15 // the string is converted to a number and added to the number


// //Truthy vs Falsy values
// // In JavaScript, values can be classified as either truthy or falsy. Truthy values are those that evaluate to true in a boolean context, while falsy values evaluate to false. example of
// //  truthy values include non-empty strings, non-zero numbers, and objects. 

// // Falsy values include false, 0, "", null, undefined, and NaN (Not a Number).

// //true= 0, false= 1, null=0, !!undefined=false

// //why NaN is a number?
// // NaN stands for "Not a Number" and is a special value in JavaScript that represents an invalid or undefined numerical operation. It is considered a number type because it is part of the Number data type in JavaScript. However, it is not equal to any other number, including itself. ie- failed mathematical operations.


// //undefined vs null
// //undefined is a primitive value that indicates that a variable has been declared but has not been assigned a value. It is the default value of uninitialized variables. example:
// let myVar1; // variable declared but not assigned a value
// console.log(myVar1); // undefined // the variable is declared but not assigned a value
// //null is a primitive value that represents the intentional absence of any object value. It is often used to indicate that a variable should not have a value or that an object property does not exist. example:
// let myVar2 = null; // variable assigned a null value
// console.log(myVar2); // null // the variable is assigned a null value
// // The main difference between undefined and null is that undefined indicates that a variable has not been assigned a value, while null indicates that a variable has been intentionally set to have no value. In other words, undefined means "no value assigned," while null means "no value exists."


// //undefined is by default when a variable is declared but not assigned a value, while null is explicitly assigned to indicate the absence of a value.
// //but null is manually assigned to a variable to indicate that it should not have a value, while undefined is automatically assigned by JavaScript when a variable is declared but not initialized.





// //Operators
// //Operators are special symbols in JavaScript that perform operations on values or variables. They can be classified into several categories based on their functionality:

// // 1. Arithmetic Operators: These operators perform mathematical operations on numbers. They include:
// //    - Addition (+): Adds two numbers together.
// let sum = 5 + 10; // 15
// //    - Subtraction (-): Subtracts one number from another.
// let difference = 10 - 5; // 5
// //    - Multiplication (*): Multiplies two numbers together.
// let product = 5 * 10; // 50
// //    - Division (/): Divides one number by another.
// let quotient = 10 / 5; // 2
// //    - Modulus (%): Returns the remainder of a division operation. 
// let remainder = 10 % 3; // 1
// //    - Exponentiation (**): Raises a number to the power of another number.
// let power = 2 ** 3; // 8 (2 raised to the power of 3)
// //    - Increment (++) and Decrement (--): Increases or decreases a number by 1, respectively.
// let increment = 5;
// increment++; // 6
// let decrement = 10;
// decrement--; // 9


// // 2. Comparison Operators: These operators compare two values and return a boolean result (true or false). They include:
// //    - Equal to (==): Checks if two values are equal, performing type coercion if necessary.
// let isEqual = (5 == '5'); // true (type coercion occurs)
// //    - Strict Equal to (===): Checks if two values are equal without performing type coercion.
// let isStrictEqual = (5 === '5'); // false (no type coercion, different types)
// //    - Not Equal to (!=): Checks if two values are not equal, performing type coercion if necessary.
// let isNotEqual = (5 != '5'); // false (type coercion occurs)
// //    - Strict Not Equal to (!==): Checks if two values are not equal without performing type coercion.
// let isStrictNotEqual = (5 !== '5'); // true (no type coercion, different types)
// //    - Greater than (>): Checks if the left value is greater than the right value.
// let isGreaterThan = (10 > 5); // true
// //    - Less than (<): Checks if the left value is less than the right value.
// let isLessThan = (5 < 10); // true
// //    - Greater than or Equal to (>=): Checks if the left value is greater than or equal to the right value.
// let isGreaterThanOrEqual = (10 >= 10); // true
// //    - Less than or Equal to (<=): Checks if the left value is less than or equal to the right value.
// let isLessThanOrEqual = (5 <= 10); // true
// //    - Nullish Coalescing (??): Returns the right-hand operand if the left-hand operand is null or undefined, otherwise returns the left-hand operand.
// let value = null;
// let defaultValue = value ?? 'default'; // 'default' (value is null, so default is returned)


// //3. Assignment Operators: These operators assign values to variables. They include:
// //    - Assignment (=): Assigns a value to a variable.
// let v = 10; // assigns 10 to v
// v+=3; // added 3 saved 13
// v-=11; // substacted 11 saved 2
// v*=2; // into 2 saved 4
// v/=2 // 4/2 saved 2
// v%=1 // 2/1  saved 1

// //4. Logical Operator:
//   //  && - if both are true final true
//   //  || - if one is true final true
//   //  !  - if true final false, if false final true 


//   //5. Unary Operators:
//   // Unary operators operate on a single operand and perform operations such as negation or incrementing/decrementing a value. They include:
// //    - Unary Plus (+): Converts a value to a number. example- +"5" =5(number), +"harsh" = NaN
// //    - typeof - tells the type of the object


// // typeof null = 'object', typepf array[] = 'object', typeof object{} = 'object', type of function() = 'function', type of NaN = 'number'.


//  // ++ , -- => adds and substacts aage and piche


 
// //6. Ternary Operator:
// // condition ? if true then its code : if false then its code


// //pre vs post increment is // pre-increment: ++x (increments x before using its value)
// // post-increment: x++ (increments x after using its value)
// // pre-decrement: --x (decrements x before using its value)



// //Control flow 
// // 1.if else- if else if else
// // 2.switch case

// //3. early return pattern-
// function getGrade(score) {
//     if (score >= 90 && score <=100 ) return "A";
//     if (score >= 80 && score <= 89 ) return "B";
//     if (score >= 70 && score <= 79 ) return "C";
//     return "invalid marks"
// }

// console.log(getGrade(54));

// //rock-paper-scissor logic

// function rps(user, computer){
//     if( user === computer) return "draw";

//     if(user === "rock" && computer === "scissor") return "user";
//     if(user === "scissor" && computer === "paper") return "user";
//     if (user === "paper" && computer === "rock") return "user";

//     return "computer";
// }
// console.log(rps("rock", "scissor"));






// //Loops

// // 1. for loop
// // The for loop is used to iterate over a block of code a specified number of times.
//  for(let i = 1; i<101; i++) {
//     console.log(i); // prints numbers from 1 to 100
//  }

// // 2. while loop
// // The while loop is used to repeatedly execute a block of code as long as a specified condition is true.
// let j = 1;
//  while (j < 20) {
//     console.log(j); // prints numbers from 1 to 19
//     j++;
//  }

// // 3. do while loop
// // The do while loop is similar to the while loop, but it guarantees that the block of code will be executed at least once, even if the condition is false.
//  let  k = 1;
//  do {
//     console.log(k); // prints numbers from 1 to 19
//     k++;
//  } while (k < 20);

//  // 4.break statement
// // The break statement is used to exit a loop prematurely when a certain condition is met.
// for (let l = 1; l <= 10; l++) {
//     if (l === 5) {
//         break; // exits the loop when l is equal to 5
//     }
//     console.log(l); // prints numbers from 1 to 4
// }

// // 5.continue statement
// // The continue statement is used to skip the current iteration of a loop and move to the next iteration.
// for (let m = 1; m <= 10; m++) {
//     if (m === 5) {
//         continue; // skips the iteration when m is equal to 5
//     }
//     console.log(m); // prints numbers from 1 to 10, skipping 5
// }

// // practice questions

// //01. Print numbers from 1 to 10 using for loop;
// for(i = 1; i<11; i++) {
//     console.log(i);
// }

// //2. Print numbers from 10 to 1 using a while loop;
// let n =10;
// while( n > 0 ) {
//     console.log(n);
//     n--;
// }

// //3.Print even numbers from 1 to 20 using a for loop.
// for (i =1; i<21; i++){
//     if( i%2 === 0){
//         console.log(i);
//     }
// }

// //4. Print odd numbers from 1 to 15 using a while loop.
// let i =1;
// while(i<16){
//     if(i % 2 === 1) {
//         console.log(i);
//     }
//     i++;
// }

// //5. Print the multiplication table of 5 ( i.e., 5 * 1 = 5...)
// for (let i = 1; i<=10; i++){
//     console.log(`5 x ${i} = ${5 * i}`);
// }

//6. Find the sum of numbers from 1 to 100 using loop.
// let sum =0;
// for(let i = 1; i<101; i++){
//     sum = sum + i;
// }
// console.log(sum)

//7. Print all numbers between 1 to 50 that are divisible by 3.
// let i = 1;
// for(i=1; i<51; i++) {
//     if (i % 3 === 0) {
//         console.log(i);
//     }
// }

//8. Ask the user for a number and print whether each number from 1 to that number is even or odd.

// let val = prompt("enter a number");

// let i = 1;
// while (i <= val){
//     if (i % 2 === 0) {
//         console.log(`${i} is even`)
//     } else {
//         console.log(`${i} is odd`)
//     }
//     i++;
// }

// using for loop

// let val = prompt("enter the number");

// let i = 1;
// for( i=1; i<=val; i++){
//     if(i % 2 === 0) {
//         console.log(`${i} is even`)
//     } else {
//         console.log(`${i} is odd`)
//     }
// }

//9. Count how many numbers between 1 to 100 are divisible by both 3 and 5.

// for ( i = 1; i<=100; i++) {
//     if(i % 3 === 0 && i % 5 ===0) {
//         console.log(i);
//     }
// }

//10. Write a loop from 1 to 100  that prints each number and stops completely when it finds the first number divisible by 7.
// for( let i = 1; i <101; i++){
//     console.log(i);
//     if( i % 7 === 0 ) {
//         break;
//     }
// }

//11. Write a loop from 1 to 20 that skips numbers divisible by 3 and prints all others
// for( let i = 1; i<21; i++){
//     if( i % 3 === 0) {
//         continue;
//     }
//     console.log(i);
// }

//12. Write a loop from 1 to 100 that prints only 5 odd numbers then stop the loop.
// let count =0;
// for( i =1; i<101; i++){
//     if (i % 2 === 1) {
//         count++;
//         console.log(i);
//     }
//     if (count === 5) break;
// }


//common confusions

//1. When to use for and while loop ?
// Use a for loop when you know in advance how many times you want to execute a statement or a block of code (e.g., iterating over arrays, counting from 1 to 10).
// Use a while loop when you want to repeat a block of code an indefinite number of times, as long as a certain condition is true (e.g., waiting for user input, reading data until the end).





//Function:
//What is function and why we use it:
// A function is a reusable block of code designed to perform a specific task.
// We use functions to organize code, avoid repetition, and make programs easier to read, maintain, and test.


// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Vijay")); // Hello, Vijay!

// Function Expression
const add = function(a, b) {
    return a + b;
};
console.log(add(2, 3)); // 5

// Arrow Function
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// Default Parameters
function sayHello(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(sayHello()); // Hello, Guest!

// Rest Parameters is a feature that allows a function to accept an (indefinite number of arguments) as an array. It is denoted by three dots (...) before the parameter name.
// This is useful when you want to create a function that can handle a variable number of arguments
function sumAll(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Spread Parameters (Spread Syntax)
// The spread syntax (...) allows an iterable (like an array) to be expanded in places where zero or more arguments or elements are expected.

// Example: Passing array elements as arguments to a function
function maxOfThree(a, b, c) {
    return Math.max(a, b, c);
}
const nums = [3, 7, 2];
console.log(maxOfThree(...nums)); // 7

// Example: Combining arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// Example: Copying arrays
const original = [5, 6, 7];
const copy = [...original];
console.log(copy); // [5, 6, 7]

// Callback Function
function processUserInput(callback) {
    const name = "Vijay";
    callback(name);
}
processUserInput(function(name) {
    console.log(`Welcome, ${name}!`);
});



//parameters and arguments

// Parameters are variables listed as part of the function definition.
// Arguments are the actual values passed to the function when it is called.

function example(param1, param2) { // param1 and param2 are parameters
    console.log(param1, param2);
}

example(10, 20); // 10 and 20 are arguments


// Return Values and Early Return

// A function can return a value using the return statement.
// Once a return statement is executed, the function stops executing (early return).

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero"; // early return if invalid input
    }
    return a / b; // returns the result if input is valid
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // Cannot divide by zero

// Example: Early return to exit a function when a condition is met
function isAdult(age) {
    if (age < 18) return false; // early return if under 18
    return true;
}

console.log(isAdult(20)); // true
console.log(isAdult(15)); // false


/*
First Class Functions in JavaScript

JavaScript treats functions as first-class citizens, meaning:
- Functions can be assigned to variables.
- Functions can be passed as arguments to other functions.
- Functions can be returned from other functions.

Examples:
*/

// Assigning a function to a variable
const sayHi = function() {
    console.log("Hi!");
};
sayHi(); // Hi!

// Passing a function as an argument (callback)
function executeCallback(callback) {
    callback();
}
executeCallback(sayHi); // Hi!

// Returning a function from another function
function createMultiplier(x) {
    return function(y) {
        return x * y;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// This flexibility is what enables higher-order functions and functional programming patterns in JavaScript.



/*
Higher-Order Functions in JavaScript

A higher-order function is a function that does at least one of the following:
- Takes one or more functions as arguments (callbacks)
- Returns a function as its result

Common examples in JavaScript are array methods like forEach, map, filter, and reduce.

Examples:
*/

// 1. A function that takes another function as an argument
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
repeat(3, console.log); // prints 0, 1, 2

// 2. Array map: takes a function and applies it to each element
const numbers = [1, 2, 3, 4];
const squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16]

// 3. Array filter: filters elements based on a function
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// 4. Array reduce: reduces array to a single value using a function
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// 5. A function that returns another function
function greeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}
const sayHello = greeter("Hello");
console.log(sayHello("Vijay")); // Hello, Vijay!

// Higher-order functions enable powerful abstractions and functional programming patterns in JavaScript.



/*
Pure vs Impure Functions

A pure function is a function that:
- Given the same input, always returns the same output.
- Does not cause any side effects (does not modify external state, variables, or data outside its scope).

An impure function is a function that:
- May return different outputs for the same input.
- May cause side effects (modifies external state, logs to console, changes global variables, etc.).

Examples:
*/

// Pure function
function addPure(a, b) {
    return a + b;
}
console.log(addPure(2, 3)); // 5 (always returns 5 for 2, 3)

// Impure function (modifies external variable)
let counter = 0;
function incrementImpure() {
    counter++;
    return counter;
}
console.log(incrementImpure()); // 1
console.log(incrementImpure()); // 2 (output depends on external state)

// Impure function (side effect: logging)
function logMessage(message) {
    console.log(message); // side effect: writes to console
}
logMessage("Hello!");

// Pure functions are predictable and easier to test, while impure functions can introduce bugs due to side effects.




/*
Closures and Lexical Scoping

Lexical scoping means that a function can access variables from its own scope, as well as from its parent (outer) scopes.

A closure is created when a function "remembers" the variables from its lexical scope even after the outer function has finished executing.

Examples:
*/

// Lexical Scoping Example
function outer() {
    let outerVar = "I'm from outer!";
    function inner() {
        console.log(outerVar); // inner can access outerVar due to lexical scoping
    }
    inner();
}
outer(); // Output: I'm from outer!

// Closure Example
function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = makeCounter();
console.log(counter2()); // 1 (separate closure)

// Closures are useful for data privacy and maintaining state between function calls.


/*
IIFE (Immediately Invoked Function Expression)

An IIFE is a function that is defined and executed immediately after its creation.
It is commonly used to create a new scope and avoid polluting the global namespace.

Syntax:
(function() {
    // code here
})();

or with arrow function:
(() => {
    // code here
})();

Examples:
*/

// Basic IIFE
(function() {
    console.log("This runs immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("Vijay");

// IIFE with return value
const result = (function(a, b) {
    return a + b;
})(2, 3);
console.log(result); // 5

// IIFE for data privacy (creating private variables)
const counterModule = (function() {
    let count = 0;
    return {
        increment: function() {
            count++;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
})();
console.log(counterModule.increment()); // 1
console.log(counterModule.getCount());  // 1

// IIFEs are useful for encapsulation and avoiding variable collisions in the global scope.




// Hoisting: Difference between Function Declaration and Function Expression

// Function Declaration is hoisted completely (both name and body)
hoistedDeclaration(); // Works: Output -> "I am a function declaration"
function hoistedDeclaration() {
    console.log("I am a function declaration");
}

// Function Expression is NOT hoisted (only variable is hoisted, not the function assignment)
try {
    hoistedExpression(); // Error: hoistedExpression is not a function
} catch (e) {
    console.log(e.message);
}
var hoistedExpression = function() {
    console.log("I am a function expression");
};
hoistedExpression(); // Works after assignment: Output -> "I am a function expression"



// practice function

//1. What's the difference between function declaration and expression in terms of hoisting?

//Ans= 
// Function Declaration is hoisted completely (both name and body)
// Function Expression is NOT hoisted (only variable is hoisted, not the function assignment)

//2. Use rest parameter to accept any number of scores and return the total.

let getScore = (...scores) => {
   let total = 0;
   scores.forEach(function(val){
    total = total + val;
   });
   return total;
}
getScore( 2,4,5,8)

//3q.
function f(){
    return;
}

console.log(f()); //output- undefined


//4. What does it mean when we say "functions are first-class citizens" ?


//5. Can you assign a funcion to a variable and then call it : 

// let var = function(){

// }
// var()

//5. Pass a function into another function and execute it inside.

function abcd(val){
    val();
}
abcd(function (){
    console.log("hey");
});



// A higher-order function is a function that takes one or more functions as arguments, or returns a function as its result.
// Examples: Array methods like map, filter, reduce, or any function that accepts a callback or returns a function.

function higherOrderExample(callback) {
    // Takes a function as an argument (callback)
    callback();
}

higherOrderExample(function() {
    console.log("This is a callback function passed to a higher-order function.");
});

// A function returning another function
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const greetHello = createGreeting("Hello");
console.log(greetHello("Vijay")); // Hello, Vijay!


//Convert the below function into a pure function

// let total = 0;
// function addToTotal(num){
//     total += num;
// }

// //solution:
// let total = 0;
// function addToTotal(num){
//     let newTotal = 0;
//     newTotal += num;
//     return newTotal;
// }


//What is closure ? when is it created?
//If a child (inner function) remembers things from their parent (outer function) even after the parent has left — that's a closure.


//Convert this normal funcion into an IIFE
function init(){
    console.log("initailized")
}

//sol:
(function init(){
    console.log("initailized")
})();


//What is the use of IIFE? Name one real world use case.
//IIFE is used to run code immediately and keep variables private.



//Write a BMI calculator;

function bmi(weight, height){
    return weight/ (height*height);
}
console.log(bmi(69, 1.8).toFixed(2));



// ✅ Create a reusable discount calculator using a Higher-Order Function (HOF)

function discountCalculator(discount) {
    // This outer function takes a 'discount' percentage as input
    // and returns a new function customized for that discount rate

    return function (price) {
        // This inner function takes a 'price' and applies the outer 'discount' to it
        // Formula: discounted price = original price - discount amount
        return price - price * (discount / 100);
    };
}

// Create a discount function for 10% discount
let ten = discountCalculator(10);

// Create a discount function for 20% discount
let twenty = discountCalculator(20);

// Use the 10% discount function on price 1200 → should return 1080
console.log(ten(1200));

// Use the 20% discount function on price 200 → should return 160
console.log(twenty(200));



//Arrow vs Regular function

// Arrow Function vs Regular Function (Summary):
// - Arrow functions: shorter syntax, no own `this` or `arguments`, not usable as constructors.
// - Regular functions: have their own `this` and `arguments`, can be constructors, suitable for methods.

// ✅ Regular Function Example (has its own `this`)
const person1 = {
  name: "Alice",
  greet: function () {
    console.log("Hi, I'm " + this.name); // 'this' refers to person1
  }
};
person1.greet(); // Output: Hi, I'm Alice

// ❌ Arrow Function Example (does not bind its own `this`)
const person2 = {
  name: "Bob",
  greet: () => {
    console.log("Hi, I'm " + this.name); // 'this' is undefined or window/global
  }
};
person2.greet(); // Output: Hi, I'm undefined

// ✅ Arrow Function for simple logic
const addd = (a, b) => a + b;
console.log(add(3, 4)); // Output: 7

// ✅ Regular Function can access `arguments`
function showArgs() {
  console.log(arguments);
}
showArgs(1, 2, 3); // Output: [1, 2, 3]

// ❌ Arrow Function can't access `arguments`
const showArrowArgs = () => {
  // console.log(arguments); // Error: arguments is not defined
};

// ✅ Regular Function used as a constructor
function Car(brand) {
  this.brand = brand;
}
const myCar = new Car("Toyota");
console.log(myCar.brand); // Output: Toyota

// ❌ Arrow Function can't be used as a constructor
// const CarArrow = (brand) => { this.brand = brand; }
// const brokenCar = new CarArrow("Honda"); // Error: not a constructor



// 🔁 Function Hoisting vs Temporal Dead Zone (TDZ)

// ✅ Function Hoisting:
// - Function declarations are hoisted: you can call them before they're defined in code.
// - Only works with `function` keyword (not with function expressions or arrow functions).

console.log(greet()); // Output: Hello!

function greet() {
  return "Hello!";
}

// ❌ Function expressions and arrow functions are NOT hoisted:
try {
  console.log(sayHi()); // ReferenceError: Cannot access 'sayHi' before initialization
} catch (e) {
  console.log(e.message);
}

const sayHii = function () {
  return "Hi!";
};

// 🧠 TDZ (Temporal Dead Zone):
// - A `let` or `const` variable is in the TDZ from the start of the block until it's initialized.
// - Accessing it before declaration causes a ReferenceError.

try {
  console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
  let a = 10;
} catch (e) {
  console.log(e.message);
}

// ✅ var is hoisted and initialized as `undefined`
console.log(b); // Output: undefined
var b = 20;

// ❗ Best Practice:
// - Always declare variables at the top of their scope.
// - Avoid using `var` to prevent confusion caused by hoisting.



// 🔒 Closures & 🔁 Higher-Order Functions (HOFs)

// ✅ CLOSURE:
// A closure is created when a function "remembers" variables from its outer scope,
// even after the outer function has finished executing.

function outer() {
  let count = 0;

  return function inner() {
    count++; // inner still has access to 'count'
    console.log("Count is:", count);
  };
}

const counterr = outer(); // outer is called once
counter(); // Output: Count is: 1
counter(); // Output: Count is: 2

// 🔐 Closure allows the inner function to "close over" the 'count' variable,
// keeping it private and persistent between calls.

// Use Case: Data privacy, function factories, memoization, and more.


// 🔁 HIGHER-ORDER FUNCTION (HOF):
// A function that either:
// 1. Takes one or more functions as arguments
// 2. Returns a function

// Example 1: HOF that returns a function (Discount calculator)
function discountCalculator(discount) {
  return function (price) {
    return price - price * (discount / 100);
  };
}

const tenPercentOff = discountCalculator(10);
console.log(tenPercentOff(1000)); // Output: 900

// Example 2: HOF that accepts a function as argument (Array map)
const numberss = [1, 2, 3];
const doubled = numbers.map(function (num) {
  return num * 2;
});
console.log(doubled); // Output: [2, 4, 6]

// Use Case: Reusability, abstraction, cleaner functional code (e.g., map, filter, reduce)


// ✅ Summary:

// 🔒 Closure:
// - Inner function remembers variables from outer function even after it's gone.
// - Creates private, persistent state.

// 🔁 HOF:
// - Accepts functions as arguments or returns functions.
// - Used in functional programming for abstraction and reusability.






//Arrays
// ARRAYS

// What is an array?
// An array is an ordered collection of values (elements), which can be of any type.
// Arrays are zero-indexed (first element is at index 0).

// Creating arrays
let arr = [1, 2, 3, 4];
let mixed = [1, "hello", true, null];

// Accessing elements
console.log(arr[0]); // 1
console.log(mixed[1]); // "hello"

// Modifying elements
arr[2] = 99;
console.log(arr); // [1, 2, 99, 4]

// Array length
console.log(arr.length); // 4

// Adding elements
arr.push(5); // adds to end
arr.unshift(0); // adds to start
console.log(arr); // [0, 1, 2, 99, 4, 5]

// Removing elements
arr.pop(); // removes from end
arr.shift(); // removes from start
console.log(arr); // [1, 2, 99, 4]

// Iterating over arrays
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for...of loop
for (let val of arr) {
    console.log(val);
}

// Array methods

// forEach: executes a function for each element
arr.forEach(function (val, idx) {
    console.log(`Index ${idx}: ${val}`);
});

// map: creates a new array by applying a function to each element
//map sirf tab use karna hain jab ek naya array banana hain pichle array ki data ke basis pe
//return is mandatory for map otherwise undefined
let doubleds = arr.map(x => x * 2);
console.log(doubleds);

// filter: creates a new array with elements that pass a test
let evenss = arr.filter(x => x % 2 === 0);
console.log(evenss);

let arrrr= [1,2,3,4,5,6,7,8]

let newarrrr = arrrr.filter(function(val){
    if(val> 4) return val;
})
// reduce: reduces array to a single value
let summ= arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
// ✅ Add all numbers in the array using reduce

let adds = [1, 2, 3, 4, 5]; // An array of numbers to be summed
let ans = adds.reduce(function(acc, curr) {
    // 'acc' (accumulator) holds the running total
    // 'curr' (current) is the current element in the array
    return acc + curr; // Add current number to the accumulator
}, 0); // 0 is the initial value of the accumulator
console.log(ans); // Output: 15


// includes: checks if array contains a value
console.log(arr.includes(99)); // true

// indexOf: returns index of value, or -1 if not found
console.log(arr.indexOf(99)); // 2

// slice: returns a shallow copy of a portion of an array
let sub = arr.slice(1, 3); // from index 1 up to (not including) 3
console.log(sub);

// splice: adds/removes elements (modifies original array)
arr.splice(1, 1, 42); // at index 1, remove 1 element, insert 42
console.log(arr);

//sort - acecending or decending order sorting arr.sort(function(){}) -sorting always returns function

// concat: combines arrays
let arr22 = [7, 8];
let combinedd = arr.concat(arr22);
console.log(combined);

// spread syntax for copying/combining
let copyy = [...arr];
let merged = [...arr, ...arr2];
console.log(copy, merged);

// Multidimensional arrays
let matrix = [
    [1, 2],
    [3, 4]
];
console.log(matrix[1][0]); // 3

// Practice: Reverse an array
let reversed = arr.slice().reverse();
console.log(reversed);

// Practice: Find the maximum value in an array
let max = Math.max(...arr);
console.log(max);

// Practice: Remove duplicates from an array
let withDuplicates = [1, 2, 2, 3, 4, 4, 5];
let unique = [...new Set(withDuplicates)];
console.log(unique);

// Arrays are reference types
let a = [1, 2, 3];
let b = a;
b[0] = 99;
console.log(a); // [99, 2, 3] (a and b refer to the same array)

// To copy an array (shallow copy), use slice or spread
let c = [...a];
c[0] = 1;
console.log(a, c); // [99, 2, 3] [1, 2, 3]

// destructuring and spread operator
// Array destructuring
const arr3 = [10, 20, 30, 40];
const [first, second, ...rest] = arr3;
console.log(first); // 10
console.log(second); // 20
console.log(rest); // [30, 40]

// Object destructuring
const personObj = { name: "Vijay", age: 25, city: "Delhi" };
const { name, age, city } = personObj;
console.log(name); // Vijay
console.log(age); // 25
console.log(city); // Delhi

// Renaming during destructuring
const { name: personName } = personObj;
console.log(personName); // Vijay

// Default values in destructuring
const { country = "India" } = personObj;
console.log(country); // India

// Spread operator with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

// Spread operator with arrays
const arr4 = [1, 2];
const arr5 = [3, 4];
const combinedArr = [...arr4, ...arr5];
console.log(combinedArr); // [1, 2, 3, 4]

//practice

//create a array with 3 fruits and print the second fruit.

let fruits = [ "apple", "banana", "coconut"]

console.log(fruits[1]);

//add "mango" at the end and "pineapple" at the beginning.
fruits.push("mango")
fruits.unshift("pineapple")
console.log(fruits)

//replace "banana" with Kiwi
fruits.splice(1,1,"kiwi")
console.log(fruits)

//inset "red" and "blue" at index 1 in this array.
let color = ["green", "yellow"]
color.splice(1, 0, "red", "yellow")

//Extract only the middle 3 elements from this array.

let items = [1,2,3,4,5]
console.log(items.slice(1, 4))
//.slice() does not change the original array. It returns a new array with the selected portion


//Sort this array alphabatically and then reverse it.

let names = ["zara", "arjun", "mira", "bhavya"];
names.sort().reverse()

//use .map() to square each number:
let sqr = [1,2,3,4];
console.log(sqr.map(function(num){
    return num * 2;
}))

//use .filter() to keep numbers greater than 10:
let grt = [5,12,8,20,3];

console.log(grt.filter(function(num){
    return num > 10;
}))

//use .reduct() to find the sum of this array:
 let red = [10, 20, 30];

 console.log(red.reduce(function(acc, val){
    return acc + val
 }, 0))

 // use .find() to get the first number less than 10;
 let num = [12, 15, 3,8, 20];

let anss = num.find(function(val){
    return val <10;
})

//Destructure this array to get firstName and lastName.
let fullName =["harsh", "harshita"];
let [firstName, lastName] = fullName;

//merge two arrays using spread operator:
let p = [1,2]
let q = [3,4 ]

let r = [...p, ...q];

// Add "india" to the start of this array using spread operator
let countries = ["usa", "uk"];
countries = ["india", ...countries];

console.log(countries); // Output: ['india', 'usa', 'uk']

//clone this array properly (not by reference)
let arrr = [1,2,3]
let arrr2 = [...arrr];

//slice vs splice
// slice() creates a new array by extracting a portion of an existing array
let sliced = arrr.slice(1, 3); // [2, 3]

// splice() modifies the original array by removing or replacing elements
arrr.splice(1, 1, 99); // [1, 99, 3]

// map vs forEach

// forEach: Executes a provided function once for each array element. It does not return a new array.
// Use forEach when you want to perform side effects (like logging or updating external variables) for each element.
const arrForEach = [1, 2, 3];
arrForEach.forEach(function(val, idx) {
    console.log(`forEach index ${idx}: ${val}`);
});

// map: Executes a provided function once for each array element and returns a new array with the results.
// Use map when you want to transform each element and create a new array.
const arrMap = [1, 2, 3];
const doubledArr = arrMap.map(function(val) {
    return val * 2;
});
console.log('map result:', doubledArr); // [2, 4, 6]

// Summary:
// - Use map when you need a new array based on the original.






//Object

// What is an object?
// An object is a collection of key-value pairs, where keys (also called properties) are strings (or Symbols), and values can be any data type.
// Objects are used to represent real-world entities and store related data and functionality together.

// Creating objects -key value structure
let person = {
    name: "Vijay",
    age: 25,
    isStudent: true
};

// Accessing properties
console.log(person.name); // Vijay
console.log(person["age"]); // 25

// Modifying properties
person.age = 26;
person["isStudent"] = false;

// Adding new properties
person.city = "Delhi";

// Deleting properties
delete person.isStudent;

// Checking if a property exists
console.log("name" in person); // true

// Iterating over object properties
for (let key in person) {
    console.log(key, person[key]);
}

// Object methods (functions inside objects)
let user = {
    name: "Alice",
    greet: function() {
        return `Hello, ${this.name}!`;
    }
};
console.log(user.greet()); // Hello, Alice!

// Shorthand method syntax
let car = {
    brand: "Toyota",
    start() {
        console.log("Car started");
    }
};
car.start();

// Object destructuring
const { namee, agee, cityy } = person;


// Define an object with key-value pairs
let obj = {
    name: "harsh",
    age: 26,
    email: "test@test.com"
};

// Use a for...in loop to iterate over the object's keys
for (let key in obj) {
    // Print the key and its corresponding value
    console.log(key, obj[key]);
}

// Object.keys: returns an array of the object's own property names (keys)
console.log(Object.keys(obj)); // ["name", "age", "email"]
console.log(Object.entries(obj)); // [["name", "harsh"], ["age", 26], ["email", "test@test.com"]]

// 📌 Copying Objects in JavaScript

/*
1. Spread Operator (Shallow Copy)
- Copies all enumerable own properties from one object to another.
- Only creates a shallow copy (nested objects are still referenced).
*/

const originalObj = { a: 1, b: 2, nested: { c: 3 } };

const copyWithSpread = { ...originalObj }; // Shallow copy

copyWithSpread.a = 10;           // ✅ Only affects copyWithSpread.a
copyWithSpread.nested.c = 99;    // ❌ Affects both originalObj and copy because nested is shared

console.log("Spread:", originalObj, copyWithSpread);

// Output:
// Spread: { a: 1, b: 2, nested: { c: 99 } } 
//         { a: 10, b: 2, nested: { c: 99 } }


/*
2. Object.assign() (Shallow Copy)
- Copies properties from one or more source objects to a target object.
- Also creates a shallow copy.
*/

const copyWithAssign = Object.assign({}, originalObj); // Shallow copy again

copyWithAssign.b = 20;           // ✅ Only affects copyWithAssign.b
copyWithAssign.nested.c = 100;   // ❌ Still affects originalObj.nested.c

console.log("Assign:", originalObj, copyWithAssign);

// Output:
// Assign: { a: 1, b: 2, nested: { c: 100 } }
//         { a: 1, b: 20, nested: { c: 100 } }


/*
3. Deep Clone (for nested objects)
- Use JSON.parse(JSON.stringify(obj)) for deep cloning simple objects.
- Does not support functions, undefined, dates, regex, etc.
*/

const deepCloned = JSON.parse(JSON.stringify(originalObj)); // Deep copy

deepCloned.nested.c = 123;       // ✅ Does NOT affect originalObj

console.log("Deep Clone:", originalObj, deepCloned);

// Output:
// Deep Clone: { a: 1, b: 2, nested: { c: 100 } }
//             { a: 1, b: 2, nested: { c: 123 } }



// Optional Chaining (?.)
// Allows safe access to deeply nested properties without throwing an error if a property doesn't exist.

let student = {
    name: "Vijay",
    address: {
        city: "Delhi",
        pin: 110001
    }
};

console.log(student.address?.city); // "Delhi"
console.log(student.contact?.phone); // undefined (no error thrown)

// Optional chaining with function calls
let userObj = {
    greet() {
        return "Hello!";
    }
};
console.log(userObj.greet?.()); // "Hello!"
console.log(userObj.sayBye?.()); // undefined

// Computed Properties
// Allows dynamic property names in objects using square brackets []

let keyName = "email";
let value = "vijay@example.com";

let dynamicObj = {
    [keyName]: value,
    age: 25
};
console.log(dynamicObj); // { email: "vijay@example.com", age: 25 }

// Example: Using computed properties in a function
function createUser(key, val) {
    return {
        [key]: val,
        createdAt: Date.now()
    };
}
console.log(createUser("username", "vijay123"));



//create an object for a student with name, age, and isEnrolled

let studentt = {
    name: "bijoy",
    age: 25,
    isEnrolled: true
}

//can an object key be a number or boolean? try this
const obbj = {
    true: "yes",
    42: "answer",
};
console.log(obbj[42]);      // Output: "answer"
console.log(obbj["true"]);  // Output: "yes"
console.log(obbj.true);     // Output: "yes"

//access the value of "first-name" from this object? 
const userrr = {
    "first-name": "harsh"
};
console.log(user["first-name"]);

//given a dynamic key let key = "age", how will you access user[key] ?
let key = "age";
const uuser = {
    age: 26
}
console.log(uuser[key])

//from object below print the latitude:
const location = {
    cityyy: "nagaon",
    coordinates: {
        lat: 23.2,
        lng: 77.7,
    },
};
console.log(location.coordinates.lat);

//What will happen if coordinates is missing how can you prevent errors?
console.log(location?.coordinates?.lat)

//destucture the city and lat from the location object above
let {cityyy, coordinates:{lat}} = location;

//destructure the key "first_name" as a value called firstName
const usser = {
    "first-name": "Harsh",
};

let {"first-name": firstNamee} = usser;

//use for in loop to log all keys in this object
const course = {
    title: "js",
    duration: "4 weeks",
}
for (let key in course){
    console.log(key)
}

//use object.entries() to print all key value pairs as:
//title: js
//duration: 4 weeks
const coourse = {
    title: "js",
    duration: "4 weeks"
};

Object.entries(coourse).forEach(function(val){
    console.log(val[0] + ":" + val[1]);
});

//copy the object using spread operator;

const originals = { a:1, b:2};
const copys = {...originals};

//deep clone of obj11 safely
const obj11 = {info: {score: 80}};
let newobj = JSON.parse(JSON.stringify(obj11))

//use a variable to dynamically assign a property;
const ke3y = "role";
let oobj = {
    name: "hrash",
    [ke3y]: "admin",
};
