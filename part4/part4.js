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





//factory function pattern

// function createProduct(name, price) {
//     let stock = 10;
//     return {
//         name,
//         price,
//         checkStock(){
//             console.log(stock)
//         },
//         buy(qty) {
//             if(qty <= stock){
//                 stock-= qty;
//                 console.log(`booked - ${stock} pieces left.`)

//             } else {
//                 console.log(`We only have ${stock} pieces left`)
//             }
//         },

//         refill(qty) {
//             stock += qty;
//             console.log(`refilled- updated stock count is ${stock}`)
//         }
//     }
// }

// let story = createProduct("Iphone", 70000);


//practice

// function createWallet(totalMoney){
    

//     return {
//         addMoney(money){
//             totalMoney += money;
//             console.log(`${money} rupees add, updated money is = ${totalMoney}`);
//         },
//         spendMoney(money){
//             totalMoney -=money;
//             console.log(`${money} rupees deducted, Updated balance is = ${totalMoney}`);
//         },
//         getMoney(){
//             console.log(`Avalilable balance is = ${totalMoney}`);
//         }
//     }
// }

// const wallet = createWallet(500);
// wallet.addMoney(200)
// wallet.spendMoney(400)

// wallet.getMoney()


// function createWallet(initialAmmount){
//     let balance = initialAmmount;

//     return {
//         addMoney(amount){
//             if(amount <= 0){
//                 return "Invalid Amount";
//             }
//             balance += amount;
//             return balance;
//         },
//         spendMoney(amount){
//             if (amount <= 0 ){
//                 return "Invalid Amount";
                
//             } if (amount > balance) {
//                 return "Insufficient Balance";
//             }
//             balance -= amount;
//             return balance;
//         },
//         getBalance(){
//             return balance;
//         }
//     }
// }

// const wallet = createWallet(500);
// wallet.addMoney(200);
// wallet.spendMoney(100);
// console.log(wallet.getBalance())






//Trottling and Debouncing
//debouncing is like - searching something and getting similar products which changes the products with the search input every milisecond

//throttling - har ek interval pe ek event occur hota hain.


// let form = document.querySelector("div")

// const throttleBottle = function(params) {
//     params.preventDefault();
//     let firstDiv = document.createElement("div");
    
//     let h1 = document.createElement("h1");
//     h1.textContent = "JS mastery";
//     firstDiv.appendChild(h1);


//     const header = document.createElement("div");
//     const logo = document.createElement("div");

//     const navLinks = document.createElement("div");

//     const button = document.createElement("button");

//     button.addEventListener("click", function() {
//         h1.textContent = "Versatile Staion";
//         logo.innerHTML = this.scroll("src=https://www.pinterest.com/pin/104005072665186441/");


//         navLinks.textContent = "{NavLinks.tells}"

//     })

// }

//observer pattern practice


// let score = 0; 

// function addScore(points) {
//     score += points;
//     console.log("Score:", score);
// }

// addScore(5);


// let value = 0;
// let listeners = [];

// function subscribe(fn) {
//     listeners.push(fn);
// }

// function changeValue(newValue){
//     value = newValue;
//     listeners.forEach(fn => fn(value));
// }


// function listener1(val) {
//     console.log("Listener 1 got:", val);
// }

// function listener2(val){
//     console.log("Listener 2 got:", val);
// }


// subscribe(listener1);
// subscribe(listener2);


// changeValue(12);



// function hello(number) {
//     console.log("hello", number);
// }

// listeners = [];
// listeners.push(hello);

// listeners.forEach(fn => fn(5));



// let timerId;

// function handleInput() {
//     clearTimeout(timerId);

//     timerId = setTimeout(() => {
//         console.log("API call after typing stops");
//     }, 500)
// }

// input.addEventListener("input", handleInput);

// function search(query) {
//     console.log("Searching for:", query);
// }

// const debouncedSearch = debounce(search, 500);

// input.addEventListener("input", (e) => {
//     debouncedSearch(e.target.value);
// })

// function throttle(fn, delay) {
//     let lastTime = 0;

//     return function (...args) {
//         const now = Date.now();

//         if (now - lastTime >= delay) {
//             fn( ...args);
//             lastTime = now;
//         }
//     }
// }


// function onScroll() {
//     console.log("Throttle scroll");
// }

// const throttledScroll = throttle(onscroll, 1000);

// window.addEventListener("scroll", throttledScroll);


function debounce (fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        },delay);
    }
}


function debounce (fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}



function debounce(fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}



function debounce (fn, timer) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}


function debounce (fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);


        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}


const deboundedFn = debounce(originalFn, 500);

window.addEventListener("event", deboundedFn);



function throttle(fn, delay) {
    let lastTime = 0;

    return function (...args) {
        let now = Date.now();

        if (now - lastTime >= delay) {
            fn (...args);
            lastTime = now;
        }
    };
}


function throttle( fn, delay) {
    let lastTime = 0;

    return function (...args) {
        let now = Date.now();
        if(now - lastTime >= delay) {
            fn (...args);

            lastTime = now;
        }
    };
    
}


function throttle(fn, delay) {
    let lastTime = 0;

    return function (...args) {
        let now = Date.now();

        if( now-lastTime >= delay) {
            fn(...args);
            lastTime = now;
        }
    }
}