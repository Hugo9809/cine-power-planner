---
name: javascript-patterns
description: Comprehensive JavaScript reference covering essential concepts. Use when explaining JS concepts, debugging JavaScript issues, or reviewing code for JS best practices.
---

# JavaScript Patterns & Best Practices

> Essential JavaScript concepts for Vanilla JS development.

## When to Use This Skill

- Explaining JavaScript concepts
- Debugging tricky JS behavior
- Reviewing code for JS best practices
- Understanding language quirks

---

## 1. Fundamentals

### 1.1 Primitive Types

```javascript
const str = "hello";      // String
const num = 42;           // Number
const bool = true;        // Boolean
let undef;                // Undefined
const empty = null;       // Null
const sym = Symbol("id"); // Symbol
```

**Falsy values** (8 total):
`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

### 1.2 Equality

```javascript
// Always use ===
"5" == 5;   // true  (coerces - avoid)
"5" === 5;  // false (strict - use this)
```

---

## 2. Scope & Closures

### 2.1 var vs let vs const

```javascript
var x = 1;   // Function scoped, hoisted (avoid)
let y = 1;   // Block scoped
const z = 1; // Block scoped, can't reassign

// BUT: const objects ARE mutable
const obj = { a: 1 };
obj.a = 2; // OK
```

### 2.2 Closures

A closure is a function that remembers its lexical scope:

```javascript
function createCounter() {
  let count = 0;
  return {
    increment() { return ++count; },
    getCount() { return count; }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```

---

## 3. Async Patterns

### 3.1 Promises

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

### 3.2 async/await

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

### 3.3 Event Loop

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
// Microtasks (Promises) run before macrotasks (setTimeout)
```

---

## 4. Functional Patterns

### 4.1 map, filter, reduce

```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

// map: transform
const names = users.map(u => u.name); // ["Alice", "Bob"]

// filter: keep matching
const adults = users.filter(u => u.age >= 30); // [{ name: "Bob", ... }]

// reduce: accumulate
const totalAge = users.reduce((sum, u) => sum + u.age, 0); // 55
```

---

## 5. Modern JavaScript (ES6+)

### 5.1 Destructuring

```javascript
const [first, second, ...rest] = [1, 2, 3, 4];
const { name, age = 0 } = { name: "Alice" };
```

### 5.2 Spread & Rest

```javascript
const arr2 = [...arr1, 4, 5];
const obj2 = { ...obj1, newProp: 1 };

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

### 5.3 Optional Chaining & Nullish Coalescing

```javascript
const city = user?.address?.city;       // undefined if any null
const value = null ?? "default";        // "default"
const zero = 0 ?? "default";            // 0 (not nullish!)
```

---

## Quick Reference

| Concept | Key Point |
|---------|-----------|
| `==` vs `===` | Always use `===` |
| `var` vs `let` | Prefer `let`/`const` |
| Closures | Function + lexical scope |
| Event loop | Microtasks before macrotasks |
| `??` vs `||` | `??` only checks null/undefined |
