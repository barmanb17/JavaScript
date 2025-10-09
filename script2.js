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


//memoization utility

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowFib1 = n => (n <= 1 ? n : slowFib1(n - 1) + slowFib1(n - 2));
const fastFib1 = memoize(slowFib1);
console.log(fastFib1(40));


//function composition

const composee = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);
const add = x => x + 2;
const square = x => x * x;
const resultt = compose(square, add)(5);
console.log(result);


//debounce

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const logg = debounce(x => console.log(x), 500);
log(1);
log(2);
setTimeout(() => log(3), 600);


//throttle

function throttle(fn, limit) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
}

const loggg = throttle(x => console.log(x), 1000);
setInterval(() => log(Date.now()), 200);
//logs every second


//curry

function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ? fn(...args) : (...next) => curried(...args, ...next);
  };
}

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));




//deep clone

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  const copy = Array.isArray(obj) ? [] : {};
  hash.set(obj, copy);
  for (const key in obj) copy[key] = deepClone(obj[key], hash);
  return copy;
}

const aaa = { x: 1, y: { z: 2 } };
const b = deepClone(aaa);
console.log(aaa !== b, aaa.y !== b.y);


//parallel promise executor

function runParallel(tasks, limit) {
  let i = 0, active = 0, results = [];
  return new Promise((resolve, reject) => {
    function runNext() {
      if (i === tasks.length && active === 0) return resolve(results);
      while (active < limit && i < tasks.length) {
        const idx = i++;
        active++;
        tasks[idx]().then(r => {
          results[idx] = r;
          active--;
          runNext();
        }).catch(reject);
      }
    }
    runNext();
  });
}

const tasks = [
  () => Promise.resolve(1),
  () => new Promise(res => setTimeout(() => res(2), 200)),
  () => Promise.resolve(3)
];
runParallel(tasks, 2).then(console.log);


//retro promise

function retry(fn, attempts) {
  return new Promise((resolve, reject) => {
    function attempt(n) {
      fn().then(resolve).catch(err => {
        if (n === 0) reject(err);
        else attempt(n - 1);
      });
    }
    attempt(attempts);
  });
}

let countt = 0;
retry(() => {
  return new Promise((res, rej) => {
    count++ < 2 ? rej('fail') : res('success');
  });
}, 3).then(console.log);


//event bus

class EventBus {
  constructor() { this.events = {}; }
  on(e, fn) { (this.events[e] ||= []).push(fn); }
  off(e, fn) { this.events[e] = (this.events[e] || []).filter(x => x !== fn); }
  emit(e, ...args) { (this.events[e] || []).forEach(fn => fn(...args)); }
}

const bus = new EventBus();
bus.on('msg', x => console.log('listener1', x));
bus.on('msg', x => console.log('listener2', x));
bus.emit('msg', 'hello');


//pipeline (async)

async function pipeline(x, ...fns) {
  let res = x;
  for (const fn of fns) res = await fn(res);
  return res;
}

const double = async x => x * 2;
const addOne = async x => x + 1;
pipeline(3, double, addOne, double).then(console.log);


//lazy evaluation with generators

function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) yield i;
}

const nums = range(1, 10, 2);
for (const n of nums) console.log(n);


//lru cache

class LRU {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.limit) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, val);
  }
}

const lruu = new LRU(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1));
lru.put(3, 3);
console.log(lru.get(2));

//deep freeze

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach(k => {
    if (obj[k] && typeof obj[k] === 'object' && !Object.isFrozen(obj[k])) deepFreeze(obj[k]);
  });
  return obj;
}

const config = deepFreeze({ a: 1, b: { c: 2 } });
config.b.c = 10;
console.log(config.b.c);


//timeout promise

function withTimeout(promise, ms) {
  const timeout = new Promise((_, rej) => setTimeout(() => rej('timeout'), ms));
  return Promise.race([promise, timeout]);
}

withTimeout(new Promise(res => setTimeout(() => res('done'), 1000)), 500)
  .then(console.log)
  .catch(console.error);


  //flatten nested object

  function flatten(obj, prefix = '', res = {}) {
  for (const k in obj) {
    const key = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) flatten(obj[k], key, res);
    else res[key] = obj[k];
  }
  return res;
}

const nested = { a: { b: { c: 1 } }, d: 2 };
console.log(flatten(nested));


//decorator function

function logger(fn) {
  return (...args) => {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

const addd = logger((a, b) => a + b);
add(2, 3);


//async queue

class AsyncQueue {
  constructor() { this.queue = []; this.running = false; }
  enqueue(task) {
    this.queue.push(task);
    if (!this.running) this.run();
  }
  async run() {
    this.running = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.running = false;
  }
}

const qq = new AsyncQueue();
q.enqueue(() => new Promise(res => setTimeout(() => { console.log(1); res(); }, 300)));
q.enqueue(() => new Promise(res => setTimeout(() => { console.log(2); res(); }, 100)));


//reactive proxy

function reactive(obj, cb) {
  return new Proxy(obj, {
    set(target, key, val) {
      target[key] = val;
      cb(key, val);
      return true;
    }
  });
}

const statee = reactive({ count: 0 }, (k, v) => console.log(`${k} changed to ${v}`));
state.count++;

//parallel vs sequential promise execution

const wait = ms => new Promise(r => setTimeout(r, ms, ms));

async function runSequential() {
  const a = await wait(500);
  const b = await wait(300);
  return a + b;
}

async function runParallel() {
  const [a, b] = await Promise.all([wait(500), wait(300)]);
  return a + b;
}

runSequential().then(console.log);
runParallel().then(console.log);


//function once

function once(fn) {
  let called = false, result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once(() => console.log("Initialized"));
init();
init();


//async generator

async function* streamNumbers(limit) {
  for (let i = 1; i <= limit; i++) {
    await new Promise(r => setTimeout(r, 200));
    yield i;
  }
}

(async () => {
  for await (const n of streamNumbers(5)) console.log(n);
})();




//task schedular with priority

class Scheduler {
  constructor() { this.queue = []; this.running = false; }
  add(task, priority = 0) {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
    if (!this.running) this.run();
  }
  async run() {
    this.running = true;
    while (this.queue.length) {
      const { task } = this.queue.shift();
      await task();
    }
    this.running = false;
  }
}

const s = new Scheduler();
s.add(() => Promise.resolve(console.log("low")), 1);
s.add(() => Promise.resolve(console.log("high")), 5);



//proxy for api logger


function apiLogger(api) {
  return new Proxy(api, {
    get(target, prop) {
      return (...args) => {
        console.log(`Calling ${prop} with`, args);
        return target[prop](...args);
      };
    }
  });
}

const api = apiLogger({
  add: (a, b) => a + b,
  mul: (a, b) => a * b
});

console.log(api.add(2, 3));
console.log(api.mul(3, 4));


//custom middleware runner

function compose(middlewares) {
  return function (ctx) {
    let i = -1;
    function dispatch(index) {
      if (index <= i) throw new Error("next called multiple times");
      i = index;
      const fn = middlewares[index];
      if (fn) return fn(ctx, () => dispatch(index + 1));
    }
    return dispatch(0);
  };
}

const fn = compose([
  async (ctx, next) => { ctx.val++; await next(); ctx.val++; },
  async (ctx, next) => { ctx.val *= 2; await next(); }
]);

const ctx = { val: 1 };
fn(ctx).then(() => console.log(ctx));


//parallel map with async function

async function parallelMap(arr, fn, limit) {
  const results = [];
  const executing = new Set();
  for (const [i, val] of arr.entries()) {
    const p = Promise.resolve().then(() => fn(val, i));
    results[i] = p;
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

parallelMap([1,2,3,4,5], x => new Promise(r => setTimeout(() => r(x*2), 300)), 2)
  .then(console.log);




  //reactive store

  function reactive(obj) {
  const listeners = new Set();
  const notify = () => listeners.forEach(fn => fn());
  const proxy = new Proxy(obj, {
    get(t, p) {
      if (currentEffect) listeners.add(currentEffect);
      return Reflect.get(t, p);
    },
    set(t, p, v) {
      const res = Reflect.set(t, p, v);
      notify();
      return res;
    }
  });
  return proxy;
}

let currentEffect = null;
function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const statew = reactive({ count: 0 });
effect(() => console.log("Count:", statew.count));
statew.count++;
statew.count++;

//async task runner


class TaskRunner {
  constructor(limit = 2, retries = 2, timeout = 2000) {
    this.limit = limit;
    this.retries = retries;
    this.timeout = timeout;
    this.queue = [];
    this.running = 0;
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject, attempts: 0 });
      this.run();
    });
  }
  async run() {
    if (this.running >= this.limit || !this.queue.length) return;
    const job = this.queue.shift();
    this.running++;
    try {
      const res = await this.execute(job.task, job.attempts);
      job.resolve(res);
    } catch (err) {
      job.reject(err);
    } finally {
      this.running--;
      this.run();
    }
  }
  async execute(task, attempts) {
    try {
      return await Promise.race([
        task(),
        new Promise((_, rej) => setTimeout(() => rej("timeout"), this.timeout))
      ]);
    } catch (err) {
      if (attempts < this.retries) return this.execute(task, attempts + 1);
      throw err;
    }
  }
}

const runner = new TaskRunner(2);
const makeTask = (id, delay) => () => new Promise(res => setTimeout(() => res(id), delay));
runner.add(makeTask(1, 500)).then(console.log);
runner.add(makeTask(2, 100)).then(console.log);
runner.add(makeTask(3, 700)).then(console.log);


//mini pub

class PubSub {
  constructor() { this.events = {}; }
  subscribe(event, handler) {
    (this.events[event] ||= []).push(handler);
    return () => this.unsubscribe(event, handler);
  }
  unsubscribe(event, handler) {
    this.events[event] = (this.events[event] || []).filter(h => h !== handler);
  }
  publish(event, data) {
    Object.keys(this.events)
      .filter(e => e.startsWith(event))
      .forEach(e => this.events[e].forEach(fn => fn(data)));
  }
}

const pubsub = new PubSub();
const unsubb = pubsub.subscribe("user.login", data => console.log("Login", data));
pubsub.subscribe("user.*", data => console.log("Wildcard", data));
pubsub.publish("user.login", { name: "Alice" });
pubsub.publish("user.logout", { name: "Alice" });
unsub();


//dynamic pipe

class Pipeline {
  constructor() { this.steps = []; }
  use(fn) { this.steps.push(fn); return this; }
  async run(ctx) {
    for (const step of this.steps) ctx = await step(ctx);
    return ctx;
  }
}

const pipeline = new Pipeline()
  .use(async ctx => ({ ...ctx, a: ctx.input + 1 }))
  .use(async ctx => ({ ...ctx, b: ctx.a * 2 }))
  .use(async ctx => ({ ...ctx, result: ctx.b + 5 }));

pipeline.run({ input: 3 }).then(console.log);


//functional pipeline


const pipeline = (...fns) => input =>
  fns.reduce((acc, fn) => (acc instanceof Promise ? acc.then(fn) : fn(acc)), input);

const doublee = x => x * 2;
const asyncAdd = async x => x + 3;
const squaree = x => x * x;

pipeline(double, asyncAdd, square)(2).then(console.log);


//dependency injector


class Container {
  constructor() { this.services = new Map(); }
  register(name, factory) { this.services.set(name, factory); }
  resolve(name) {
    const factory = this.services.get(name);
    if (!factory) throw new Error("Service not found: " + name);
    return factory(this);
  }
}

const c = new Container();
c.register("config", () => ({ url: "https://api.com" }));
c.register("api", c => ({
  fetchData: () => Promise.resolve("Data from " + c.resolve("config").url)
}));
c.resolve("api").fetchData().then(console.log);


//lens utility


const lens = (getter, setter) => ({
  get: getter,
  set: (val, obj) => setter(val, obj)
});

const view = (ln, obj) => ln.get(obj);
const set = (ln, val, obj) => ln.set(val, obj);

const nameLens = lens(
  o => o.user.name,
  (val, o) => ({ ...o, user: { ...o.user, name: val } })
);

const stateee = { user: { name: "Alice", age: 22 } };
console.log(view(nameLens, state));
console.log(set(nameLens, "Bob", state));



//simple actor model

class Actor {
  constructor(behavior) {
    this.behavior = behavior;
    this.queue = [];
    this.processing = false;
  }
  send(msg) {
    this.queue.push(msg);
    if (!this.processing) this.run();
  }
  async run() {
    this.processing = true;
    while (this.queue.length) {
      const msg = this.queue.shift();
      await this.behavior(msg, this);
    }
    this.processing = false;
  }
}

const counter = new Actor(async (msg, self) => {
  if (msg.type === "inc") self.state = (self.state || 0) + 1;
  if (msg.type === "log") console.log("Count:", self.state);
});

counter.send({ type: "inc" });
counter.send({ type: "inc" });
counter.send({ type: "log" });


//promise pool

async function promisePool(tasks, limit) {
  const results = [];
  const errors = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = Promise.resolve().then(task).then(
      r => results.push(r),
      e => errors.push(e)
    );
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) await Promise.race(executing);
  }
  await Promise.allSettled(executing);
  return { results, errors };
}

const taskss = [
  () => Promise.resolve("A"),
  () => Promise.reject("B"),
  () => new Promise(res => setTimeout(() => res("C"), 200))
];

promisePool(tasks, 2).then(console.log);



const depsMap = new Map();

function track(target, key) {
  if (!activeEffect) return;
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

function trigger(key) {
  const deps = depsMap.get(key);
  if (deps) deps.forEach(effect => effect());
}

// let activeEffect = null; // Removed redeclaration to avoid error
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      trigger(key);
      return result;
    }
  });
}

// --- Usage ---
const statet = reactive({ count: 0, double: 0 });

effect(() => {
  console.log(`Count: ${state.count}`);
});

effect(() => {
  state.double = state.count * 2;
  console.log(`Double updated: ${state.double}`);
});

state.count = 1;
state.count = 2;



//custom event emitter

class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  emit(event, ...args) {
    if (this.events[event]) this.events[event].forEach(fn => fn(...args));
  }
  off(event, listener) {
    if (this.events[event]) this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
}

const emitterr = new EventEmitter();
const greet = name => console.log(`Hello ${name}`);
emitter.on('greet', greet);
emitter.emit('greet', 'Bijoy');
emitter.off('greet', greet);


//function debouncer

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const logDebounced = debounce(() => console.log('Typing stopped!'), 1000);
logDebounced(); logDebounced(); logDebounced();


//function throttler
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

const resize = throttle(() => console.log('Resizing...'), 2000);
resize(); resize(); resize();


//memoization utility

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowFib2 = n => n < 2 ? n : slowFib2(n - 1) + slowFib2(n - 2);
const fastFib2 = memoize(slowFib2);
console.log(fastFib2(35));
