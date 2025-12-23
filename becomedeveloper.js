// let a = document.querySelector('a');


// console.log(a.getAttribute("href"))




// let h1 = document.createElement("h1")
// h1.innerText = "become developer"

// document.body.append(h1)


// let h1 = document.createElement("h1")

// h1.textContent = "become developer by march"

// document.querySelector("body").append(h1)


// let h1 = document.querySelector("h1")

// h1.innerHTML = "become developer by <i>march</i>"

// h1.style.color = "red"


//what is dom ? how does it represent the html structure ?
//ans- dom is document object model . it represents the html structure in a tree format where each html tag is a node and the attributes and text inside the tag are its properties and child nodes respectively.


//name the types of node in dom tree?
//ans- there are mainly 3 types of nodes in dom tree - element node , text node and attribute node.


//what is the difference between element node and text node ? 
//ans- element node represents the html tags in the dom tree whereas text node represents the text content inside the html tags.


//What is the difference between getElementById() and querySelector() methods in DOM?
//ans- getElementById() method is used to select an element by its id attribute and it returns a single element. querySelector() method is used to select the first element that matches a specified CSS selector and it can select elements by id, class, tag name, etc.


//What does getElementsByClassName() return? is it an array ?
//ans- getElementsByClassName() returns a live HTMLCollection of all elements with the specified class name. It is not an array, but it can be converted to an array using Array.from() or spread operator.


//use querySelectorAll to select all buttons with class "buy now"

// let buttoons = document.querySelectorAll(".buy-now")


//t1. Select the heading of a page by ID and change its text to "Welcome to the developer mode".

// let heading = document.getElementById("heading");

// heading.innerText = "Welcome to the developer mode";


// Select all <li> elements and print their text using a loop.

// let lis = document.querySelectorAll("li");

// for (let i = 1; i < lis.length; i++) {
//     console.log(lis[i].innerText);
// }


//What is the difference between innerText , textContent and innerHTML ?
//ans- innerText returns the visible text content of an element, taking into account CSS styles. textContent returns the full text content of an element, including hidden text. innerHTML returns the HTML content of an element as a string, including any child elements and tags.


//When should you use textContent over innerText ?
//ans- textContent should be used when you want to get or set the full text content of an element, regardless of its visibility or CSS styles. It is also faster than innerText as it does not trigger a reflow of the layout.




//Event listeners and events handling

//what are event listeners in javascript ?
//ans- event listeners are functions that wait for a specific event to occur on a particular element and then execute a callback function in response to that event.

//what is call back function ?
//ans- a callback function is a function that is passed as an argument to another function and is executed after a certain event or condition is met.


// let h1 = document.querySelector("h1");

// h1.addEventListener("click", function() {
//     h1.style.color = "blue";
// })

// let p = document.querySelector("p");

// function dblclick() {
//     p.style.color = "green";
// }

// p.addEventListener("dblclick", dblclick);
// p.removeEventListener("dblclick", dblclick);


// let p = document.querySelector("p");

// p.addEventListener("click", function() {
//     p.style.color = "red";
// }   )

// let input = document.querySelector("input");

// input.addEventListener("input", function(inp) {
//     if(inp.data !== null ) {
//         console.log(inp.data)
//     }
// })

//what is change event in javascript ?
//ans- change event in javascript is an event that is triggered when the value of an input element, such as a text field or a select dropdown, is changed and the element loses focus.

// let select = document.querySelector("select");
//  let head = document.getElementById("head");

//  select.addEventListener("change", function(dets) {
//     head.textContent = "Device selected: " + dets.target.value;
//  })
// let h1 = document.querySelector("h1")

// window.addEventListener("keydown", function(dets) {
//    if(dets.key === " ") {
//       h1.textContent = "SPC";
//    } else {
//       h1.textContent = dets.key;
//    }
// })


// let btn = document.querySelector("#btn")
// let input = document.querySelector("input")

// btn.addEventListener("click", function(){
//    input.click();
// })

// input.addEventListener("change", function(text) {
//    btn.textContent = text.target.files[0].name
// })



























// let form = document.querySelector("form")
// let inputs = document.querySelectorAll("input")
// let main = document.querySelector("#main")

// form.addEventListener("submit", function(e) {
//    e.preventDefault();

//    let card = document.createElement("div");
//    card.classList.add("card")

//    let profile = document.createElement("div");
//    profile.classList.add("profile")

//    let img = document.createElement("img");
//    img.setAttribute("src", inputs[0].value);

//    let h3 = document.createElement("h3");
//    h3.textContent = inputs[1].value;

//    let h5 = document.createElement("h5")
//    h5.textContent = inputs[2].value

//    let p = document.createElement("p");
//    p.textContent = inputs[3].value


//    profile.appendChild(img)

//    card.appendChild(profile)

//    card.appendChild(h3)

//    card.appendChild(h5)

//    card.appendChild(p)

//   main.appendChild(card)

//  inputs.forEach(function(e) {
//    if (e.type !== "submit") {
//       e.value = "";
//    }
//  })
// });



















//mouseover mouseout mousemove

// let div = document.querySelector("#abcd")

// div.addEventListener("mouseover", function() {
//    div.style.backgroundColor = "yellow"
// })

// div.addEventListener("mouseout", function(){
//    div.style.backgroundColor = "red"
// })

// window.addEventListener("mousemove", function(e) {
//    div.style.top = e.clientY + "px";
//    div.style.left = e.clientX + "px"
// })




//event bubbling
//ans- jispe event aayega agar uspar listener nahi hua toh humaara event uske parent par listener dhundhega aur aisa karte karte upar ki taraf move karega.


//event capturing
//ans-ulta of event bubbling --from parent to children irrespective of chale toh phir bhi jayega  

//jab bhi aap chick karte ho ya event raise karte ho toh aapka jo event flow hain wo do phases main chalta hain 
//phase1: event top level element se neeche ki taraf aayege
//phase2: event raised element se parent ki taraf aayega


//aur pehle phase 1 hoti hain

let inp = document.querySelector("input");
let span = document.querySelector("span");

inp.addEventListener("input", function(){
   span.textContent = 20 - inp.value.length
})