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