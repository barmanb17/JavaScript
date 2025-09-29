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


//setInterval implemented with setTimeout


(function() {
  const timers = new Map();
  let idCounter = 1;

  function mySetInterval(fn, interval, ...args) {
    const id = idCounter++;
    let active = true;

    const tick = async () => {
      if (!active) return;
      try { fn(...args); } finally {
        if (active) timers.set(id, setTimeout(tick, interval));
      }
    };

    timers.set(id, setTimeout(tick, interval));
    // store a cancel token
    timers.set(`cancel_${id}`, () => { active = false; clearTimeout(timers.get(id)); timers.delete(id); timers.delete(`cancel_${id}`); });
    return id;
  }

  function myClearInterval(id) {
    const cancel = timers.get(`cancel_${id}`);
    if (typeof cancel === 'function') cancel();
  }

  // expose globally
  globalThis.mySetInterval = mySetInterval;
  globalThis.myClearInterval = myClearInterval;
})();

// Example
const iid = mySetInterval(() => console.log('tick'), 300);
setTimeout(() => myClearInterval(iid), 1000); // stop after ~1s


//flatten object


function flatten(obj, prefix = '', res = {}) {
  if (obj === null || typeof obj !== 'object' || obj instanceof Date) {
    res[prefix] = obj;
    return res;
  }
  if (Array.isArray(obj)) {
    // decide representation for arrays: we will keep indices in keys
    obj.forEach((v, i) => flatten(v, prefix ? `${prefix}.${i}` : `${i}`, res));
  } else {
    for (const key of Object.keys(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      flatten(obj[key], newKey, res);
    }
  }
  return res;
}

// Example
console.log(flatten({ a: { b: { c: 1 }}, arr: [10, { x: 1 }] }));
// { 'a.b.c': 1, 'arr.0': 10, 'arr.1.x': 1 }



//async runner

function run(genFn) {
  const gen = typeof genFn === 'function' ? genFn() : genFn;

  return new Promise((resolve, reject) => {
    function step(nextF, arg) {
      let result;
      try {
        result = nextF.call(gen, arg);
      } catch (err) {
        return reject(err);
      }
      const { value, done } = result;
      if (done) return resolve(value);
      // support yielded promises or plain values
      Promise.resolve(value).then(
        val => step(gen.next, val),
        err => step(gen.throw, err)
      );
    }
    step(gen.next);
  });
}

// Example: generator yields promises
run(function* () {
  const a = yield Promise.resolve(1);
  const b = yield new Promise(res => setTimeout(() => res(2), 200));
  return a + b;
}).then(console.log); // 3




class Range {
  constructor(start = 0, end = 0, step = 1) {
    if (step === 0) throw new Error("step cannot be 0");
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    const start = this.start;
    const end = this.end;
    const step = this.step;
    let current = start;
    const increasing = step > 0;

    return {
      next() {
        if ((increasing && current > end) || (!increasing && current < end)) {
          return { done: true };
        }
        const value = current;
        current += step;
        return { value, done: false };
      }
    };
  }
}

// Example
for (const n of new Range(1, 5)) console.log(n); // 1 2 3 4 5
for (const n of new Range(5, 1, -2)) console.log(n); // 5 3 1


//proxy based validation

function createValidatedObject(target = {}, schema = {}) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (prop in schema) {
        const validator = schema[prop];
        const ok = validator(value);
        if (!ok) throw new TypeError(`Validation failed for property "${String(prop)}"`);
      }
      obj[prop] = value;
      return true;
    },
    get(obj, prop) {
      return obj[prop];
    }
  });
}

// Example: enforce age >= 18 and name is non-empty string
const person = createValidatedObject({}, {
  age: v => Number.isInteger(v) && v >= 18,
  name: v => typeof v === 'string' && v.trim().length > 0
});

person.name = "Alice";
person.age = 25;
// person.age = 15; // throws TypeError


//observer

class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.unsubscribe(fn); // return unsubscribe handle
  }

  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }

  notify(data) {
    // copy to avoid mutation issues if subscriber list changes during notification
    [...this.subscribers].forEach(fn => {
      try {
        fn(data);
      } catch (err) {
        // swallow or log subscriber errors so one bad subscriber won't break others
        console.error('Subscriber error:', err);
      }
    });
  }
}

// Example
const obs = new Observable();
const unsub = obs.subscribe(d => console.log('A got', d));
obs.subscribe(d => console.log('B got', d));
obs.notify('hello'); // A got hello  B got hello
unsub(); 
obs.notify('again'); // B got again
