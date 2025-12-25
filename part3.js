// scope hai ke aap apne created variables and functions kaha tak youse kar sakteho 



// function abcd() {
//     var a = 12
// }

// console.log(a) // a is not defined

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






//closures- hote hain functions jo ki parent function ke under ho , aur ander wala funtion return ho raha ho, and returning function use kare parent function ka koi variable.

// function abcd() {
//     let a = 12;
//     return function() {
//         console.log(a);
//     }
// }
// abcd();
// the whole thing is closure
//pros- private variables




//toaster- popup notification 

// function createToaster(config) {
//     return function(str) {
//         const div = document.createElement("div");
//         div.textContent = str;
//         div.className = "inline-block  bg-gray-800 text-white px-6 py-3 rounded shadow-lg pointer-events-none transition-opacity duration-300"
//         document.querySelector(".parent").appendChild(div)
//         setTimeout(() => {
//             document.querySelector(".parent").removeChild(div)
//         }, config.duration * 1000);
//     }
// }

// let toaster = createToaster({
//     positionX: "left",
//     positionY: "top",
//     theme: "dark",
//     duration: 3,
// });
// toaster("download done");
// setTimeout(()=> {
//     toaster("download again  bithch")
// },1000)



//This keyword- ek special keyword hain, kyuki baki saare keywords ka nature same rehta hain , iska nature badal kata hain , is baat se ki app usey kaha use kar rahe ho.

// //global scope 
// console.log(this)// here this is - window

// //function scope
// function abcd() {
//     console.log(this);
// }
// abcd(); //here this is - window

//in method
// let obj = {
//     nam: "bijoy",
//     sayName: function() {
//         console.log(this.nam)
// //     },
// };
// obj.sayName();
 //here this is- not window that means in method this value is (object) eg- this.nam = "bijoy"
//caution- agar function arrow function ho toh fir this ki value object nahi hogi .. tab this ki value window hi hogi. 
//caoution- agar object ke under awr dusra funtion ho toh phir this ki value kho dega tab wo window ho jayega isko cater karneke liye function ke under function chahiye toh dusra function ke under arrow funtion banao


//ek aesa function jo object ke under ho use method kehte hain, here sayName: is a method


//event handler

// document.querySelector("h1").addEventListener("click", function(){
//     console.log(this) // here this is h1 
// })

// //class

// class Abcd {
    
//     constructor(){
//         console.log("hey");
//         this.a = 12; //class ke under this ki value blank object rehti hain.
//     }
// }
// let val = new Abcd();


