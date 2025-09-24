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


//lazy evaluation pipeline

class LazyArray {
  constructor(arr) {
    this.arr = arr;
    this.operations = [];
  }

  map(fn) {
    this.operations.push(arr => arr.map(fn));
    return this;
  }

  filter(fn) {
    this.operations.push(arr => arr.filter(fn));
    return this;
  }

  value() {
    return this.operations.reduce((acc, fn) => fn(acc), this.arr);
  }
}

// Example
const result = new LazyArray([1, 2, 3, 4])
  .map(x => x * 2)
  .filter(x => x > 4)
  .value();

console.log(result); // [6, 8]


//retro with backoff

async function retry(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(res => setTimeout(res, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

// Example
let count = 0;
const unreliableTask = () => {
  count++;
  return count < 3 ? Promise.reject("Fail") : Promise.resolve("Success");
};

retry(unreliableTask, 5).then(console.log); // "Success"


//deep clone

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj);

  let clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}

// Example
const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
b.y.z = 100;
console.log(a.y.z); // 2 (unchanged)


//mini reactive system

function reactive(obj) {
  const deps = new Map();

  return new Proxy(obj, {
    get(target, prop) {
      if (!deps.has(prop)) deps.set(prop, new Set());
      if (activeEffect) deps.get(prop).add(activeEffect);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      if (deps.has(prop)) {
        deps.get(prop).forEach(fn => fn());
      }
      return result;
    }
  });
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

// Example
const state = reactive({ count: 0 });

watchEffect(() => {
  console.log("Count changed:", state.count);
});

state.count++; // logs: "Count changed: 1"
