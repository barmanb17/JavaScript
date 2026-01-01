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
//     }}
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


//manual binding: bind call and apply


//call
//function ko call karte waqt aap set kar sakte ho ki uski this ki value kya hogi with call
// let obj = {
//     name: "bijoy",
//     age: 23

// }
// function abcd() {
//     console.log(this.age)
// }
// abcd.call(obj);


//apply
// function abcd(a, b, c) {
//     console.log(this, a, b, c)
// }

// abcd.apply(obj, [1, 2, 3])


//bind

// function abcd(a, b, c) {
//     console.log(this, a, b, c)
// }

// let fnc = abcd.bind(obj, 1, 2, 3)

// fnc();














//form.html -js part

// const form = document.querySelector("#userForm");
// const container = document.querySelector(".users");

// const inputs = {
//   name: document.querySelector("#name"),
//   role: document.querySelector("#role"),
//   bio: document.querySelector("#bio"),
//   url: document.querySelector("#url"),
// };

// const userManager = {
//   users: [],

//   init() {
//     form.addEventListener("submit", this.handleSubmit.bind(this));
//   },

//   handleSubmit(e) {
//     e.preventDefault();

//     const user = this.getFormData();
//     this.addUser(user);
//     form.reset();
//     this.render();
//   },

//   getFormData() {
//     return {
//       name: inputs.name.value.trim(),
//       role: inputs.role.value.trim(),
//       bio: inputs.bio.value.trim(),
//       url: inputs.url.value.trim(),
//     };
//   },

//   addUser(user) {
//     this.users.push(user);
//   },

//   render() {
//     container.innerHTML = "";

//     this.users.forEach((user, index) => {
//       container.appendChild(this.createCard(user, index));
//     });
//   },

//   createCard(user, index) {
//     const card = document.createElement("div");
//     card.className =
//       "w-72 rounded-2xl bg-zinc-800/70 p-6 text-center shadow-lg backdrop-blur";

//     const img = document.createElement("img");
//     img.src = user.url;
//     img.className = "mx-auto mb-4 h-20 w-20 rounded-full object-cover";

//     const name = document.createElement("h3");
//     name.className = "text-lg font-semibold";
//     name.textContent = user.name;

//     const role = document.createElement("p");
//     role.className = "text-sm text-zinc-400";
//     role.textContent = user.role;

//     const bio = document.createElement("p");
//     bio.className = "mt-2 text-sm text-zinc-300";
//     bio.textContent = user.bio;

//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Remove";
//     removeBtn.className =
//       "mt-4 rounded bg-red-600 px-4 py-1 text-sm hover:bg-red-700";

//     removeBtn.onclick = () => {
//       this.users.splice(index, 1);
//       this.render();
//     };

//     card.append(img, name, role, bio, removeBtn);
//     return card;
//   },
// };

// userManager.init();











//practice of this

// const container = document.querySelector(".users")

// let users = [];

// function addUser(name, role, bio, photo) {
//     users.push({
//         name: name,
//         role: role,
//         bio: bio,
//         photo: photo,
//     })
// }

// function removeUser(index) {
//     users.splice(index, 1)
// }




// users.forEach(function(user) {
//     const card = document.createElement("div");
//     const h3 = document.createElement("h3");
//     h3.textContent = user.name;
//     card.appendChild(h3);

//     const role = document.createElement("p");
//     role.textContent = user.role;
//     card.appendChild(role);

//     const bio = document.createElement("p");
//     bio.textContent = user.bio;
//     card.appendChild(bio);
// })

// container.appendChild(card)

// const container = document.querySelector(".users")

// let users = [];
// function addUser(name, role, bio,) {
//     users.push({
//         name: name,
//         role: role,
//         bio: bio,

//     });
//     renderUsers();
// }

// function removeUser(index) {
//     users.splice(index, 1)
//     renderUsers();
// }


// function renderUsers(){
//     container.innerHTML = "";
//     users.forEach(function(user, index){
//     const card = document.createElement("div");
//     const userName = document.createElement("h3");
//     userName.textContent = user.name;
//     card.appendChild(userName);


//     const role = document.createElement("p");
//     role.textContent = user.role;
//     card.appendChild(role);


//     const bio = document.createElement("p");
//     bio.textContent = user.bio;
//     card.appendChild(bio)



//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.addEventListener("click", function() {
//         removeUser(index);
//     })

//     card.appendChild(deleteBtn);

//     container.appendChild(card);
// })
// }


// const container = document.querySelector(".users");
// let users = [];

// function addUsers(name, role, bio) {
//     users.push({
//         name,
//         role,
//         bio
//     })
//     renderUsers();
// }

// function deleteUser(index) {
//     users.splice(index, 1);
//     renderUsers();
// }

// function renderUsers() {
//     container.innerHTML = "";

//     users.forEach(function(user, index) {
//         const card = document.createElement("div");
//         const userName = document.createElement("h3");
//         userName.textContent = user.name;
//         card.appendChild(userName);


//         const role = document.createElement("p");
//         role.textContent = user.role;
//         card.appendChild(role);


//         const bio = document.createElement("p");
//         bio.textContent = user.bio;
//         card.appendChild(bio);


//         const deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "Delete";
//         deleteBtn.addEventListener("click", function() {
//             deleteUser(index);
//         })

//         card.appendChild(deleteBtn);

//         container.appendChild(card)

//     })
// }


// const form = document.querySelector("#userForm");
// const nameInput = document.querySelector("#name");
// const roleInput = document.querySelector("#role");
// const bioInput = document.querySelector("#bio");

// form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     addUsers(
//         nameInput.value,
//         roleInput.value,
//         bioInput.value
//     );

//     form.reset();
// });



//object oriented programming

// function CreateBiscuits(name, price, qty, company, category) {
//     this.name = name;
//     this.price = price;
//     this.qty = qty;
//     this.company = company;
//     this.category = category;

// }
// let biscuit1 = new CreateBiscuits("ParleG", 10, 1, "Parle", "regular");
// let biscuit2 = new CreateBiscuits("Good Day", 20 , 2, "Britannia", "Premium")

//that is OOPS - making factories and using it all along the code.


// function CreatePencil(name, price, color, company) {

//     this.name = name;
//     this.price = price;
//     this.color = color;
//     this.company = company;
//     this.write = function(text) {
//         let h1 = document.createElement("h1");
//         h1.textContent = text;
//         h1.style.color = color;
//         document.body.append(h1);
//     };


// }
// CreatePencil.prototype.class = "higher secondary"  // the field will go automatically on every new instances . yea use kiya ja sakta hain taki kam memory use ho every instances pe kyuki yea sab me hone wala hain toh bar bar ise likhneka koyi logic nahi hota

// let Pencil1 = new CreatePencil("Natraj", 10, "green", "Natraj") //here this is blank object because of (new)

// let Pencil2 = new CreatePencil("dom", 10, "black", "doms")
// //these all are called constructor functions which are starts with capital lettters




//classes

// class User {
//     constructor(name, address, userName, email, e) {
//         this.name = name;
//         this.address = address;
//         this.userName = userName;
//         this.email = email;
//         this.role = "user";
//     }

//     write(text) {
//         let h1 = document.createElement("h1");
//         h1.textContent = `${this.name}:${text}`;
//         document.body.appendChild(h1)
//     }
//     checkRole(){
//         console.log(this.role)
//     }
// }

// class Admin extends User{
//     constructor(name, address, userName, email ){
//         super(name, address, userName, email )
//         this.role = "admin"
//     }
//     remove(){
//         document.querySelectorAll("h1").forEach(function(elem){
//             elem.remove();
//         })
//     }
//     checkRole(){
//         console.log(this.role)
//     }
// }


// let u1 = new User("bijoy", "nagaon", "vijjjay", "bijoybarman110@gmail.com", )
// let u2 = new User("bijoya", "nagaon", "vijjjay", "bijoybarman110@gmail.com", )

// let a1 = new Admin("admin1", "india", "adminn", "a@a.com")






//Prototypal ineritance vs classical inheritance.

//classical inheritance- classes banana awr unhe extend karna

//prototypal inheritance- object to object inheritance

// let coffee = {
//     color: "dark",
//     drink: function () {
//         console.log("gut gut gut")
//     }
// }

// let arabicaCoffee = Object.create(coffee);
// arabicaCoffee.taste = "bitter"
// arabicaCoffee.drink()

//ek object ka saari props/methods ko inherit kar dena dusre object main = prototypal inheritance.






//synchronous and asynchronous
// koi bhi code js mein like by like chalega aur yea natural pattern bhi hota hai ki code line by line chale, but kabhi kabaar aisa cases aata hai life mein jaha par aapka code wait karta hai and utni der mein agla code chal jaata hain . 


// console.log("hey1");
// console.log("hey2");
// setTimeout(() => {
//     console.log("hey motherfuckers")
// }, 2000);
// console.log("hey3");
// console.log("hey4");





//callback pattern, callback hell

// function kechDerBaadChalunga(fnc) {

//     setTimeout(fnc, Math.floor(Math.random()*10)*1000);
// }
// kechDerBaadChalunga(function(){ //this is called callback function
//     console.log("hey")
// })

//ek function ko agar aap ke aur function bhej de rahe ho parameter main toh parameter wala function kehlata hain callback


//callback hell

//callback ke under call back uske under awr ek callback is called callback hell


//promises

//aap ek promise banate ho joki do state mein se ek state me jaa sakta hain wnd wo yaa to resolve hoga ua to reject hoga ab wo kya hoga ye to waqt batayega par humein dono ke liye code likhna padta hai.


// let pr = new Promise(function (res, rej) {
//     setTimeout(() => {
//         let rn = Math.floor(Math.random()*10);
//         if(rn > 5) res("resolved with " + rn);
//         else rej ("rejected with " + rn)
//     }, 3000);
// });


// pr
// .then(function(val){
//  console.log(val)
// })
// .catch(function(val){
//  console.log(val)
// })







//async await


// async function abcd() {
//     let val = await pr;
// }

// abcd();



//fetch api + http basics

// fetch("https://randomuser.me/api/?results=5")
// .then((raw) => raw.json())
// .then((data) => console.log(data.results))



// let marks = [ 45, 60, 78, 90]

// for(let i = 0; i < marks.length; i++) {
//     console.log(marks[i]);
// }


// let age = 32;

// brothersAge = 23;

// let gap = Math.abs(age - brothersAge);

// console.log(`Age gap is ${gap} years`)


// let priceOfPen = 10;
// let priceOfnotebook = 40;
// let quantityOfPen = 3;
// let quantityOfnotebook = 2;

// let totalbill = priceOfPen*quantityOfPen+priceOfnotebook*quantityOfnoteobook

// console.log(totalbill);


// let marks = 37;

// if(marks >= 40) {
//     console.log("Pass")
// }else {
//     console.log("Fail")
// }


// let age = 61;

// // if (age < 18){
// //     result = "Not eligible"
// // } else if (age <= 60) {
// //     result = "Eligible"
// // } else {
// //     result= "Senior citizen"
// // }
// // console.log(result)

// let result = age < 18 ? "not eligible" : age <= 60 ? "eligible" : "senior citizen";



// let number = 15;

// let result = number%2 === 0 ? "Even" : "Odd";

// console.log(result)

// let billAmount = 2500;
// let discount = 0;

// if(billAmount > 2000) {
//     discount = billAmount * 0.2;
// } else if (billAmount > 1000 ) {
//     discount = billAmount * 0.1;
// } else {
//     discount = 0;
// }
// let finalAmount = billAmount- discount
// console.log(finalAmount);


// let salary = 30000;
// let experience = 3;
// let bonus = 0;

// if(experience >= 5){
//     bonus = salary * 0.2;
// } else if (experience >= 2) {
//     bonus = salary * 0.1;
// } else {
//     bonus = 0;
// }

// let finalSalary = salary + bonus;

// console.log(finalSalary);


// let i = 20;

// for(i=1; i<=20; i++) {
//     console.log(i)
// }
// for(let i = 1; i <= 20; i++){
//     console.log(i);
// }


// for(i=1; i<=50; i++){
//     if(i%2===0){
//         console.log(i)
//     }
// }

// let num = 7;

// for(let i = 1; i<=10; i++){
//     console.log(`${num} * ${i} = ${num*i}  `)
// }


// let numbers = [10, 20, 30, 40];

// let sum = 0;

// numbers.forEach(function(num){
//     sum = sum + num
// });

// console.log(sum);


// let numbers = [5, 17, 3, 99, 45];

// let marks = [35, 80, 42, 20, 90]

// let pass = 0;

// marks.forEach(function(mark) {
//     if(mark>=40){
//         pass++
//     }
// })

// console.log(pass);




// function countPass(marksAray) {
//     let pass = 0;

//     marksAray.forEach(function(mark){
//         if(mark>=40){
//             pass++;
//         }
//     });

//     return pass;
// }

// let result = countPass([35, 80, 42, 20, 90]);
// console.log(result);


// function calculateAverage(marksArray) {
//     total = 0
//    let  marks = 0;

//     marksArray.forEach(function(mark){
//         marks = marks++
//     })


//     return marks;
// }

// calculateAverage([10, 20, 30, 40])
// console.log(calculateAverage)



// function calculateAverage(marksArray) {
//     let total = 0;

//     marksArray.forEach(function(mark){
//         total = total + mark;
//     });

//     let average = total / marksArray.length;

//     return average;
// }

// let result = calculateAverage([10, 20, 30, 40, 4, 23, 6, 5445, 3]);
// console.log(result);
