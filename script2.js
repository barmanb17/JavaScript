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


//custom call and apply

Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') throw new TypeError('Not callable');
  context = context ?? globalThis;
  const sym = Symbol();
  context[sym] = this;
  const result = context[sym](...args);
  delete context[sym];
  return result;
};

Function.prototype.myApply = function(context, args) {
  if (typeof this !== 'function') throw new TypeError('Not callable');
  context = context ?? globalThis;
  const sym = Symbol();
  context[sym] = this;
  const result = context[sym](...(args || []));
  delete context[sym];
  return result;
};

// Example
function hello(greeting, name) { return `${greeting}, ${name} from ${this.place}`; }
const obj = { place: 'Earth' };
console.log(hello.myCall(obj, 'Hi', 'Alice')); // "Hi, Alice from Earth"
console.log(hello.myApply(obj, ['Hey', 'Bob'])); // "Hey, Bob from Earth"


//promise all

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError('Iterable required'));
    const results = [];
    let completed = 0;
    const total = promises.length;
    if (total === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(value => {
        results[i] = value;
        completed += 1;
        if (completed === total) resolve(results);
      }).catch(reject);
    });
  });
}

// Example
promiseAll([Promise.resolve(1), 2, Promise.resolve(3)])
  .then(console.log) // [1,2,3]
  .catch(console.error);


  //LRU cache

  class LRUCache {
  constructor(limit = 100) {
    this.limit = limit;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return undefined;
    const val = this.map.get(key);
    // move to newest (end)
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  set(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.limit) {
      // remove oldest
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

// Example
const lru = new LRUCache(2);
lru.set('a', 1);
lru.set('b', 2);
lru.get('a');    // touch 'a' -> order: b, a
lru.set('c', 3); // evict 'b'
console.log(lru.get('b')); // undefined
console.log(lru.get('a')); // 1


//custom instance off

function myInstanceOf(obj, constructor) {
  if (typeof constructor !== 'function') throw new TypeError('Right-hand side must be callable');
  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;
  while (proto !== null) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// Example
console.log(myInstanceOf([], Array)); // true
console.log(myInstanceOf({}, Array)); // false


//pipe and compose


const pipe = (...fns) => (initial) => fns.reduce((v, f) => f(v), initial);
const compose = (...fns) => (initial) => fns.reduceRight((v, f) => f(v), initial);

// Example
const add1 = x => x + 1;
const times2 = x => x * 2;
console.log(pipe(add1, times2)(3)); // (3+1)*2 = 8
console.log(compose(add1, times2)(3)); // add1(times2(3)) = 7


//async queue

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(task) {
    // task : () => Promise
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.runNext();
    });
  }

  async runNext() {
    if (this.running) return;
    const item = this.queue.shift();
    if (!item) return;
    this.running = true;
    try {
      const result = await item.task();
      item.resolve(result);
    } catch (err) {
      item.reject(err);
    } finally {
      this.running = false;
      this.runNext();
    }
  }
}

// Example
const q = new AsyncQueue();
q.enqueue(() => new Promise(res => setTimeout(() => res(1), 500))).then(console.log);
q.enqueue(() => new Promise(res => setTimeout(() => res(2), 100))).then(console.log);
// logs 1 then 2 (sequentially)


//virtual dom diff

// VNode shape: { type: 'tag' | 'text', tag?, props?, children? }
// For text nodes: { type: 'text', value: '...' }

function diff(oldNode, newNode, path = []) {
  const patches = [];

  if (!oldNode) {
    patches.push({ type: 'INSERT', path, node: newNode });
    return patches;
  }
  if (!newNode) {
    patches.push({ type: 'REMOVE', path });
    return patches;
  }

  if (oldNode.type === 'text' && newNode.type === 'text') {
    if (oldNode.value !== newNode.value) patches.push({ type: 'TEXT', path, value: newNode.value });
    return patches;
  }

  if (oldNode.type !== newNode.type || oldNode.tag !== newNode.tag) {
    patches.push({ type: 'REPLACE', path, node: newNode });
    return patches;
  }

  // compare props shallowly
  const propsPatches = {};
  const allProps = new Set([...(oldNode.props ? Object.keys(oldNode.props) : []), ...(newNode.props ? Object.keys(newNode.props) : [])]);
  allProps.forEach(key => {
    const oldVal = (oldNode.props || {})[key];
    const newVal = (newNode.props || {})[key];
    if (oldVal !== newVal) propsPatches[key] = newVal;
  });
  if (Object.keys(propsPatches).length) patches.push({ type: 'PROPS', path, props: propsPatches });

  // diff children by index
  const maxLen = Math.max((oldNode.children || []).length, (newNode.children || []).length);
  for (let i = 0; i < maxLen; i++) {
    patches.push(...diff((oldNode.children || [])[i], (newNode.children || [])[i], path.concat(i)));
  }

  return patches;
}

// Example
const aa = { type: 'tag', tag: 'div', props: { id: 'x' }, children: [{ type: 'text', value: 'Hi' }] };
const bb = { type: 'tag', tag: 'div', props: { id: 'y' }, children: [{ type: 'text', value: 'Hello' }, { type: 'tag', tag: 'span', children: [{ type: 'text', value: '!' }] }] };
console.log(diff(a, b));
/* possible patches:
[
  { type: 'PROPS', path: [], props: { id: 'y' } },
  { type: 'TEXT', path: [0], value: 'Hello' },
  { type: 'INSERT', path: [1], node: { type: 'tag', tag: 'span', children: [...] } }
]
*/
