//Module Pattern-
//Module pattern ek design pattern hai jisme hum apna code ek self executing function (IIFE) ke ander likhte hain, taki variables aur funtions private rahen.

//Iske ander se hum sirf wahi cheezein return karte hain jo bahar use karni hain.

//Is pattern ka main fayda hain data hiding(encapsulation) aur clean structure, taaki code secure, reuseable aur mangeable ban sake.


//immediately invoked function expression(IIFE)

// let iife = (function(){
//     return 12;
// })();

// //module pattern

// let Bank = (function(){
//     let bankBalance = 12000;

//     function checkbalance(){
//         console.log(bankBalance);
//     }

//     function setBalance(val){
//         bankBalance = val;
//     }

//     function withdraw(val){
//         if(val <= bankBalance){
//             bankBalance -= val;
//             console.log(bankBalance);
//         }
//     }
//     return {
//         checkbalance, setBalance, withdraw
//     }
// })();


//practice

// const counterModule = (function(){
//     let count = 0;

//     function increment(){
//         count++;
//     }

//     function getCount(){
//         count;
//     }

//     return{increment, getCount};
// })();

// counterModule.increment()
// counterModule.increment()

// console.log(counterModule.getCount());



// const ConfigModule = (function () {
//     const API_KEY = "SECRET_123";
//     const BASE_URL = "https://api.example.com";

//     return function buildUrl(endpoint) {
//         return `${BASE_URL}/${endpoint}?key=${API_KEY}`
//     }





// })();

// console.log(ConfigModule("users");


// let game = (function(){
//     let score = 0;

//     function add(points){
//         score += points;
//     };

//     function getScore(){
//         return score;
//     }

//     return {
//         add, getScore
//     }
// })();

// const A = (function () {
//     let x = 1;
//     return {
//         inc() {
//             x++;
//         }
//     };
// })();

// A.inc();
// console.log(A.x);

// const B = (function () {
//     let n = 0;
//     return n;
// })();

// console.log(B);


// const C = (function () {
//     let x = 5;
//     return () => x;
// })();

// console.log(C());

// const D = (function () {
//     let x = 5;
//     return { x };
// })();

// D.x = 100;
// console.log(D.x);



// const Counter = (function () {
//     let n = 0;

//     return {
//        function _inc() {
//             n++;
//         },
//        function _get() {
//             return n;
//         }
//     };

//     return{

//     } 


// const Counter = (function () {
//     let n = 0;

//         function _inc() {
//             n++;
//         };
//                function _get() {
//             return n;
//         };


//     return {
//         inc: _inc,
//         get: _get,

//     };
// })();
