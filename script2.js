//closures
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Example: Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
console.log(memoFib(40)); // Much faster than plain fibonacci(40)


//custom
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Example
function greet(greeting, name) {
  return `${greeting}, ${name}`;
}

const greetHello = greet.myBind(null, "Hello");
console.log(greetHello("Alice")); // "Hello, Alice"



//promise sequence

async function runInSequence(functions) {
  let result = [];
  for (let fn of functions) {
    result.push(await fn());
  }
  return result;
}

// Example
const asyncTasks = [
  () => Promise.resolve(1),
  () => new Promise(res => setTimeout(() => res(2), 1000)),
  () => Promise.resolve(3),
];

runInSequence(asyncTasks).then(console.log); // [1, 2, 3]




//debounce

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}



//event emitter

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

// Example
const emitter = new EventEmitter();
const log = msg => console.log(msg);

emitter.on("message", log);
emitter.emit("message", "Hello World!"); // "Hello World!"


//polyfill
Array.prototype.myMap = function (callback, context) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) result.push(callback.call(context, this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
