// scope hai ke aap apne created variables and functions kaha tak youse kar sakteho 



function abcd() {
    var a = 12
}

console.log(a) // a is not defined

// we cannot define a outside the function because its block scope

// scope- function scope, global scope and block scope 

//function scope- function ke andar hi use ho sakti hain
//global scope - poore code mein hi use ho sakti hain
//block scope - {} curly braces main hi use ho sakti hain.
// agar aapka code kisibhi braces ke ander nahi hain toh yea global scope main hain
// agar curley braces lage hain toh yea block scope hain
// agar function and curly braces hain toh function scope hain.





//execution context- 
// js sabse pehle jesehi apka function dekhta hain, sabse pehle banata hain exexution context, yea ek process hain jo 2 phases main chalta hain, memory phase(space for variables and function to run its like a space where the function runs ) and execution phase.
// function abcd() {
//     var a = 12;
//     var b =13;
//     var c = 14;
// }


// lexical scope and dynamic scope 
//lexical scoping - aap kahapar physicall available ho waha hi aap access kar sakte ho  so that im in home that means im lexically available in home 
// function efgh() {
//     let d = 12;
//     function i(){
//         console.log(d)
//     }
// }
// d is lexically available in function efgh()


//dynamic scoping- kaha se call kar rahe ho uspe depend karega ki kya value milegi 
// let a = 12;
// function abcd(){
//     console.log(a);
// }

// function defg(){
//     let a =13;
//     abcd();
// }

// defg()

//here in function defg() a is 12 because js always follows lexical scoping , if it would follow dynamic scoping that it would be a = 13 in function defg();

