import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding JavaScript & TypeScript lessons...');

  // First, create or get the JavaScript & TypeScript topic
  const jsTsTopic = await prisma.topic.upsert({
    where: { slug: 'javascript-typescript-mastery' },
    update: {},
    create: {
      title: 'JavaScript & TypeScript Mastery',
      slug: 'javascript-typescript-mastery',
      description: 'Master the two languages that power the entire web. JavaScript makes websites alive, TypeScript makes them safe at scale.',
      shortDescription: 'The Web Powers - Learn JavaScript and TypeScript together',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 40,
      isPublished: true,
      isFree: false,
      orderIndex: 3,
    },
  });

  console.log('✅ Created topic:', jsTsTopic.title);

  // Create JavaScript Module
  const jsModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: jsTsTopic.id,
        slug: 'javascript-fundamentals',
      },
    },
    update: {},
    create: {
      topicId: jsTsTopic.id,
      title: 'JavaScript Fundamentals',
      slug: 'javascript-fundamentals',
      description: 'Learn JavaScript from basics to advanced concepts including DOM manipulation, async programming, and Node.js',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1200,
    },
  });

  console.log('✅ Created module:', jsModule.title);

  // JavaScript Lessons
  const jsLessons = [
    {
      title: 'Introduction to JavaScript',
      slug: 'intro-to-javascript',
      content: `# JavaScript - The Web King

## What is JavaScript?

<cite index="1-5">Created in 1995 in 10 days, now the most used language in the world.</cite> <cite index="1-6,1-7,1-8">Runs in every browser. No install needed. Makes static HTML come alive: clicks, animations, data loading.</cite>

## Hello World in JavaScript

\`\`\`javascript
console.log("Hello World");
alert("Hello World");
\`\`\`

## Why JavaScript is King

<cite index="1-9">• Only language browsers understand 
• Frontend + Backend (Node.js) 
• Millions of libraries 
• Instant visual feedback</cite>

*Content was rephrased for compliance with licensing restrictions*`,
      videoUrl: '',
      estimatedMinutes: 30,
      orderIndex: 1,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'JavaScript Use Cases and Career Paths',
      slug: 'javascript-use-cases',
      content: `# JavaScript - Good For What?

<cite index="1-11">## Real-World Applications

| Field | What You Build | Real Apps |
|-------|---------------|-----------|
| Frontend Web | Interactive websites | Facebook, Gmail, Netflix.com |
| Backend | Servers with Node.js | Uber, PayPal backend |
| Mobile Apps | React Native apps | Instagram mobile app (partly) |
| Games (Web) | Browser games | Slither.io, 2048 web |
| Real-time | Chat, live updates | WhatsApp Web, Discord web |

## Career Opportunities

Career: Frontend Developer, Fullstack Developer (MERN), Web Developer. Most entry jobs are JavaScript.</cite>

*Content was rephrased for compliance with licensing restrictions*`,
      videoUrl: '',
      estimatedMinutes: 25,
      orderIndex: 2,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'JavaScript Basics: Variables and Data Types',
      slug: 'js-variables-datatypes',
      content: `# JavaScript Basics

## Variables: var, let, const

\`\`\`javascript
var oldWay = "Don't use this";
let changeable = "Use this for values that change";
const permanent = "Use this for constants";
\`\`\`

## Data Types

\`\`\`javascript
// Primitive Types
let text = "Hello";        // String
let number = 42;           // Number
let floating = 3.14;       // Number
let yes = true;            // Boolean
let nothing = null;        // Null
let notDefined;            // Undefined

// Objects
let person = {
  name: "John",
  age: 30
};

// Arrays
let colors = ["red", "green", "blue"];
\`\`\`

## Console.log - Your Best Friend

\`\`\`javascript
console.log("Hello World");
console.log("Value:", number);
console.log(person);
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 45,
      orderIndex: 3,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Operators and Control Flow',
      slug: 'js-operators-control-flow',
      content: `# Operators and Control Flow

## Operators

\`\`\`javascript
// Arithmetic
let sum = 5 + 3;
let diff = 10 - 4;
let product = 6 * 7;
let quotient = 20 / 4;
let remainder = 10 % 3;

// Comparison
5 === 5;   // true (strict equality)
5 == "5";  // true (loose equality)
5 !== 3;   // true
10 > 5;    // true
10 >= 10;  // true

// Logical
true && false;  // AND
true || false;  // OR
!true;          // NOT
\`\`\`

## If-Else Statements

\`\`\`javascript
let age = 18;

if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// Ternary operator
let status = age >= 18 ? "Adult" : "Minor";
\`\`\`

## Switch Statements

\`\`\`javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Regular day");
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 4,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Loops in JavaScript',
      slug: 'js-loops',
      content: `# Loops in JavaScript

## For Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Loop through array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\`

## While Loop

\`\`\`javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`

## Do-While Loop

\`\`\`javascript
let num = 0;
do {
  console.log(num);
  num++;
} while (num < 5);
\`\`\`

## For...of Loop (Modern)

\`\`\`javascript
let colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}
\`\`\`

## For...in Loop (Objects)

\`\`\`javascript
let person = { name: "John", age: 30 };
for (let key in person) {
  console.log(key + ": " + person[key]);
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 40,
      orderIndex: 5,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Functions in JavaScript',
      slug: 'js-functions',
      content: `# Functions in JavaScript

## Function Declaration

\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Alice"));
\`\`\`

## Function Expression

\`\`\`javascript
const add = function(a, b) {
  return a + b;
};

console.log(add(5, 3));
\`\`\`

## Arrow Functions (ES6)

\`\`\`javascript
const multiply = (a, b) => a * b;

const square = x => x * x;

const greetUser = name => {
  const message = "Welcome, " + name;
  return message;
};
\`\`\`

## Callback Functions

\`\`\`javascript
function processUser(name, callback) {
  console.log("Processing " + name);
  callback(name);
}

processUser("John", function(name) {
  console.log("Done with " + name);
});
\`\`\`

## Default Parameters

\`\`\`javascript
function greet(name = "Guest") {
  return "Hello, " + name;
}

console.log(greet());        // "Hello, Guest"
console.log(greet("Alice")); // "Hello, Alice"
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 55,
      orderIndex: 6,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Arrays and Array Methods',
      slug: 'js-arrays',
      content: `# Arrays - The Heart of JavaScript

## Creating Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];
\`\`\`

## Array Methods

\`\`\`javascript
// Add/Remove
fruits.push("grape");      // Add to end
fruits.pop();              // Remove from end
fruits.unshift("mango");   // Add to start
fruits.shift();            // Remove from start

// Finding
let index = fruits.indexOf("banana");
let exists = fruits.includes("apple");

// Slicing
let slice = fruits.slice(1, 3);

// Splicing (modify array)
fruits.splice(1, 1, "kiwi");
\`\`\`

## Modern Array Methods

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// Map - transform each element
let doubled = numbers.map(n => n * 2);

// Filter - keep elements that match
let evens = numbers.filter(n => n % 2 === 0);

// Find - get first match
let found = numbers.find(n => n > 3);

// Reduce - combine into single value
let sum = numbers.reduce((total, n) => total + n, 0);

// ForEach - loop through
numbers.forEach(n => console.log(n));
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 60,
      orderIndex: 7,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Objects and JSON',
      slug: 'js-objects-json',
      content: `# Objects and JSON - Heart of JavaScript

## Creating Objects

\`\`\`javascript
// Object literal
let person = {
  name: "John",
  age: 30,
  city: "New York",
  greet: function() {
    return "Hello, I'm " + this.name;
  }
};

// Accessing properties
console.log(person.name);
console.log(person["age"]);
\`\`\`

## Object Methods

\`\`\`javascript
// Get keys
let keys = Object.keys(person);

// Get values
let values = Object.values(person);

// Get entries
let entries = Object.entries(person);

// Copy object
let copy = Object.assign({}, person);
let spread = { ...person };
\`\`\`

## JSON

\`\`\`javascript
// Object to JSON string
let jsonString = JSON.stringify(person);

// JSON string to object
let parsed = JSON.parse(jsonString);

// Pretty print
let pretty = JSON.stringify(person, null, 2);
\`\`\`

## Destructuring

\`\`\`javascript
let { name, age } = person;
console.log(name); // "John"

// With renaming
let { name: userName } = person;

// Array destructuring
let [first, second] = [1, 2, 3];
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 8,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'DOM Manipulation',
      slug: 'js-dom-manipulation',
      content: `# DOM Manipulation - Make Websites Alive

## Selecting Elements

\`\`\`javascript
// By ID
let header = document.getElementById("header");

// By class
let items = document.getElementsByClassName("item");

// By tag
let paragraphs = document.getElementsByTagName("p");

// Modern selectors (best)
let element = document.querySelector("#header");
let all = document.querySelectorAll(".item");
\`\`\`

## Modifying Content

\`\`\`javascript
// Change text
element.textContent = "New text";
element.innerText = "New text";

// Change HTML
element.innerHTML = "<strong>Bold text</strong>";

// Change attributes
element.setAttribute("class", "active");
element.getAttribute("class");
element.removeAttribute("class");

// Direct property access
element.className = "active";
element.id = "myId";
\`\`\`

## Modifying Styles

\`\`\`javascript
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "20px";

// Add/remove classes
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("show");
element.classList.contains("active");
\`\`\`

## Creating and Adding Elements

\`\`\`javascript
// Create element
let div = document.createElement("div");
div.textContent = "Hello";
div.className = "box";

// Add to document
document.body.appendChild(div);
element.prepend(div);
element.append(div);
element.before(div);
element.after(div);

// Remove element
element.remove();
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 70,
      orderIndex: 9,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Events and Event Handling',
      slug: 'js-events',
      content: `# Events - Making Things Interactive

## Adding Event Listeners

\`\`\`javascript
let button = document.querySelector("#myButton");

// Click event
button.addEventListener("click", function() {
  console.log("Button clicked!");
});

// Arrow function
button.addEventListener("click", () => {
  console.log("Clicked!");
});

// With event object
button.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.type);
});
\`\`\`

## Common Events

\`\`\`javascript
// Mouse events
element.addEventListener("click", handleClick);
element.addEventListener("dblclick", handleDoubleClick);
element.addEventListener("mouseenter", handleMouseEnter);
element.addEventListener("mouseleave", handleMouseLeave);

// Keyboard events
document.addEventListener("keydown", (e) => {
  console.log(e.key);
});

// Form events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
});

input.addEventListener("input", (e) => {
  console.log(e.target.value);
});

input.addEventListener("change", handleChange);
input.addEventListener("focus", handleFocus);
input.addEventListener("blur", handleBlur);
\`\`\`

## Event Delegation

\`\`\`javascript
document.querySelector("#parent").addEventListener("click", (e) => {
  if (e.target.matches(".child")) {
    console.log("Child clicked!");
  }
});
\`\`\`

## Removing Event Listeners

\`\`\`javascript
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 60,
      orderIndex: 10,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'ES6+ Features',
      slug: 'js-es6-features',
      content: `# ES6+ Modern JavaScript Features

## Template Literals

\`\`\`javascript
let name = "Alice";
let age = 25;

// Old way
let message = "Hello, " + name + ". You are " + age;

// New way
let message = \`Hello, \${name}. You are \${age}\`;

// Multi-line
let html = \`
  <div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;
\`\`\`

## Destructuring

\`\`\`javascript
// Array destructuring
let [a, b, c] = [1, 2, 3];
let [first, ...rest] = [1, 2, 3, 4];

// Object destructuring
let { name, age } = person;
let { name: userName, age: userAge } = person;
\`\`\`

## Spread Operator

\`\`\`javascript
// Arrays
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
let combined = [...arr1, ...arr2];

// Objects
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };

// Function arguments
let numbers = [1, 2, 3];
console.log(...numbers);
\`\`\`

## Rest Parameters

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\`

## Enhanced Object Literals

\`\`\`javascript
let name = "John";
let age = 30;

// Shorthand property
let person = { name, age };

// Method shorthand
let obj = {
  greet() {
    return "Hello";
  }
};

// Computed property names
let prop = "name";
let obj = {
  [prop]: "John"
};
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 55,
      orderIndex: 11,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Promises and Async JavaScript',
      slug: 'js-promises-async',
      content: `# Asynchronous JavaScript

## Promises

\`\`\`javascript
// Creating a promise
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

// Using promises
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
\`\`\`

## Async/Await

\`\`\`javascript
async function fetchData() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Using async function
fetchData().then(data => console.log(data));
\`\`\`

## Fetch API

\`\`\`javascript
// GET request
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST request
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "John", age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

## Promise Methods

\`\`\`javascript
// Promise.all - wait for all
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results));

// Promise.race - first to complete
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled - all results
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 65,
      orderIndex: 12,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Error Handling in JavaScript',
      slug: 'js-error-handling',
      content: `# Error Handling

## Try-Catch-Finally

\`\`\`javascript
try {
  // Code that might throw error
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Error occurred:", error.message);
} finally {
  console.log("This always runs");
}
\`\`\`

## Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message);
}
\`\`\`

## Custom Errors

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new ValidationError("Age cannot be negative");
  }
}
\`\`\`

## Async Error Handling

\`\`\`javascript
async function fetchData() {
  try {
    let response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 40,
      orderIndex: 13,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Introduction to Node.js',
      slug: 'intro-to-nodejs',
      content: `# Node.js - JavaScript on the Server

## What is Node.js?

Node.js allows you to run JavaScript outside the browser, on servers and computers.

## NPM - Node Package Manager

\`\`\`bash
# Initialize project
npm init -y

# Install package
npm install express

# Install dev dependency
npm install --save-dev nodemon

# Run script
npm run start
\`\`\`

## Basic Node.js Server

\`\`\`javascript
// Using built-in http module
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## File System Operations

\`\`\`javascript
const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('file.txt', 'Hello World', (err) => {
  if (err) throw err;
  console.log('File written');
});

// Async/await version
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Modules

\`\`\`javascript
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// app.js
const math = require('./math');
console.log(math.add(5, 3));
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 14,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'JavaScript Best Practices',
      slug: 'js-best-practices',
      content: `# JavaScript Best Practices

## Code Quality

\`\`\`javascript
// Use const by default, let when needed, avoid var
const PI = 3.14159;
let counter = 0;

// Use descriptive variable names
const userAge = 25; // Good
const x = 25;       // Bad

// Use strict equality
if (value === 5) {} // Good
if (value == 5) {}  // Bad

// Avoid global variables
(function() {
  let privateVar = "hidden";
})();
\`\`\`

## Performance Tips

\`\`\`javascript
// Cache DOM queries
const element = document.querySelector('.item');
// Use element multiple times

// Use event delegation
document.querySelector('#parent').addEventListener('click', (e) => {
  if (e.target.matches('.child')) {
    // Handle click
  }
});

// Debounce expensive operations
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
\`\`\`

## Security

\`\`\`javascript
// Avoid eval()
// eval(userInput); // NEVER DO THIS

// Sanitize user input
const sanitize = (str) => {
  return str.replace(/[<>]/g, '');
};

// Use textContent instead of innerHTML when possible
element.textContent = userInput;
\`\`\`

## Modern Patterns

\`\`\`javascript
// Use optional chaining
const name = user?.profile?.name;

// Nullish coalescing
const value = input ?? 'default';

// Array methods over loops
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 45,
      orderIndex: 15,
      isPublished: true,
      isFree: false,
    },
  ];

  // Create all JavaScript lessons
  for (const lessonData of jsLessons) {
    const lesson = await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: jsModule.id,
          slug: lessonData.slug,
        },
      },
      update: {},
      create: {
        ...lessonData,
        moduleId: jsModule.id,
      },
    });
    console.log(`  ✅ Created lesson: ${lesson.title}`);
  }

  // Create TypeScript Module
  const tsModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: jsTsTopic.id,
        slug: 'typescript-fundamentals',
      },
    },
    update: {},
    create: {
      topicId: jsTsTopic.id,
      title: 'TypeScript Fundamentals',
      slug: 'typescript-fundamentals',
      description: 'Learn TypeScript - JavaScript with types for safer, scalable applications',
      orderIndex: 2,
      isPublished: true,
      estimatedMinutes: 800,
    },
  });

  console.log('✅ Created module:', tsModule.title);

  // TypeScript Lessons
  const tsLessons = [
    {
      title: 'Introduction to TypeScript',
      slug: 'intro-to-typescript',
      content: `# TypeScript - The Safe JavaScript

## What is TypeScript?

<cite index="1-27,1-28,1-29,1-30">Created by Microsoft in 2012. It's JavaScript + Types. All JS code is valid TS code, but TS catches bugs BEFORE you run. In 2026, all big web apps use TypeScript.</cite>

## Hello World in TypeScript

\`\`\`typescript
let message: string = "Hello World";
console.log(message);
// Type error if you do: message = 123
\`\`\`

## Why TypeScript Wins

<cite index="1-31">• Catches errors early 
• Better autocomplete 
• Required for large apps 
• Same as JS but safer</cite>

*Content was rephrased for compliance with licensing restrictions*`,
      videoUrl: '',
      estimatedMinutes: 35,
      orderIndex: 1,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'TypeScript Use Cases and Career Paths',
      slug: 'typescript-use-cases',
      content: `# TypeScript - Good For What?

<cite index="1-33,1-34">## Real-World Applications

| Field | What You Build | Real Apps |
|-------|---------------|-----------|
| Large Frontend | Big websites with many devs | Slack, Airbnb, Asana |
| Fullstack Type-safe | Frontend + Backend both TS | Discord, Notion |
| Tools | VS Code itself! | VS Code is built in TypeScript |
| Enterprise Web | Safe code for companies | Microsoft Teams |
| Modern Frameworks | React, Angular, Next.js all use TS | All modern React apps |

Career: Frontend Engineer (React + TS), Fullstack TS Dev, Highest paid web track.</cite>

*Content was rephrased for compliance with licensing restrictions*`,
      videoUrl: '',
      estimatedMinutes: 30,
      orderIndex: 2,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'TypeScript Basic Types',
      slug: 'typescript-basic-types',
      content: `# TypeScript Basic Types

## Primitive Types

\`\`\`typescript
// String
let name: string = "Alice";
let greeting: string = \`Hello, \${name}\`;

// Number
let age: number = 25;
let price: number = 19.99;

// Boolean
let isActive: boolean = true;
let hasAccess: boolean = false;

// Array
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuple
let person: [string, number] = ["Alice", 25];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let favoriteColor: Color = Color.Blue;

// Any (avoid when possible)
let anything: any = "string";
anything = 123;
anything = true;

// Unknown (safer than any)
let value: unknown = "hello";
if (typeof value === "string") {
  console.log(value.toUpperCase());
}

// Void
function logMessage(message: string): void {
  console.log(message);
}

// Null and Undefined
let nullable: string | null = null;
let optional: string | undefined = undefined;

// Never (functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 3,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Type Inference and Union Types',
      slug: 'typescript-inference-unions',
      content: `# Type Inference and Union Types

## Type Inference

\`\`\`typescript
// TypeScript infers the type
let message = "Hello"; // string
let count = 42;        // number
let isActive = true;   // boolean

// Inference in functions
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}
\`\`\`

## Union Types

\`\`\`typescript
// Variable can be multiple types
let value: string | number;
value = "hello";
value = 123;

// Function parameter union
function printId(id: string | number) {
  console.log("ID:", id);
}

printId(123);
printId("ABC123");

// Type narrowing
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
\`\`\`

## Literal Types

\`\`\`typescript
// Exact value types
let direction: "up" | "down" | "left" | "right";
direction = "up";    // ✓
// direction = "forward"; // ✗ Error

// Numeric literals
let dice: 1 | 2 | 3 | 4 | 5 | 6;
dice = 3; // ✓

// Boolean literals
let success: true = true;
\`\`\`

## Type Aliases

\`\`\`typescript
type ID = string | number;
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
  console.log("Moving", direction);
}

type Point = {
  x: number;
  y: number;
};

let position: Point = { x: 10, y: 20 };
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 45,
      orderIndex: 4,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Interfaces and Object Typing',
      slug: 'typescript-interfaces',
      content: `# Interfaces and Object Typing

## Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

let user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
\`\`\`

## Extending Interfaces

\`\`\`typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

let employee: Employee = {
  name: "John",
  age: 30,
  employeeId: 12345,
  department: "IT"
};
\`\`\`

## Interface vs Type

\`\`\`typescript
// Interface
interface Point {
  x: number;
  y: number;
}

// Type alias
type Point = {
  x: number;
  y: number;
};

// Both work similarly for objects
// Interfaces can be extended, types can use unions
\`\`\`

## Readonly and Optional

\`\`\`typescript
interface Config {
  readonly apiKey: string;
  timeout?: number;
}

let config: Config = {
  apiKey: "abc123"
};

// config.apiKey = "new"; // Error: readonly
config.timeout = 5000;  // OK: optional
\`\`\`

## Index Signatures

\`\`\`typescript
interface StringDictionary {
  [key: string]: string;
}

let dict: StringDictionary = {
  name: "Alice",
  city: "New York"
};
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 55,
      orderIndex: 5,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Functions with Types',
      slug: 'typescript-functions',
      content: `# Functions with Types

## Function Type Annotations

\`\`\`typescript
// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Void return type
function logMessage(message: string): void {
  console.log(message);
}
\`\`\`

## Optional Parameters

\`\`\`typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return \`\${greeting}, \${name}\`;
  }
  return \`Hello, \${name}\`;
}

greet("Alice");
greet("Bob", "Hi");
\`\`\`

## Default Parameters

\`\`\`typescript
function createUser(name: string, age: number = 18): void {
  console.log(\`\${name} is \${age} years old\`);
}

createUser("Alice");     // Uses default 18
createUser("Bob", 25);   // Uses 25
\`\`\`

## Rest Parameters

\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\`

## Function Types

\`\`\`typescript
// Function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Function type in parameter
function calculate(
  a: number,
  b: number,
  operation: MathOperation
): number {
  return operation(a, b);
}

calculate(5, 3, add);
\`\`\`

## Function Overloads

\`\`\`typescript
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

format("hello");  // "HELLO"
format(3.14159);  // "3.14"
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 6,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Enums in TypeScript',
      slug: 'typescript-enums',
      content: `# Enums in TypeScript

## Numeric Enums

\`\`\`typescript
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

let dir: Direction = Direction.Up;
console.log(dir); // 0

// Custom starting value
enum Status {
  Pending = 1,
  Active,      // 2
  Completed    // 3
}
\`\`\`

## String Enums

\`\`\`typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;
console.log(favoriteColor); // "BLUE"
\`\`\`

## Const Enums

\`\`\`typescript
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L"
}

// More efficient at runtime
let shirtSize: Size = Size.Medium;
\`\`\`

## Enum in Functions

\`\`\`typescript
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

function checkPermission(role: UserRole): boolean {
  if (role === UserRole.Admin) {
    return true;
  }
  return false;
}

checkPermission(UserRole.Admin);
\`\`\`

## Reverse Mapping

\`\`\`typescript
enum Status {
  Active = 1,
  Inactive = 2
}

console.log(Status.Active);   // 1
console.log(Status[1]);        // "Active"
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 40,
      orderIndex: 7,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Generics in TypeScript',
      slug: 'typescript-generics',
      content: `# Generics - Write Flexible Code

## Basic Generics

\`\`\`typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(42);
let str = identity<string>("hello");

// Type inference
let value = identity(true); // TypeScript infers boolean
\`\`\`

## Generic Arrays

\`\`\`typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

let firstNum = getFirst([1, 2, 3]);      // number
let firstName = getFirst(["a", "b"]);    // string
\`\`\`

## Generic Interfaces

\`\`\`typescript
interface Box<T> {
  value: T;
}

let numberBox: Box<number> = { value: 123 };
let stringBox: Box<string> = { value: "hello" };

interface Pair<K, V> {
  key: K;
  value: V;
}

let pair: Pair<string, number> = {
  key: "age",
  value: 25
};
\`\`\`

## Generic Classes

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

let numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);

let stringStack = new Stack<string>();
stringStack.push("hello");
\`\`\`

## Generic Constraints

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");        // ✓
logLength([1, 2, 3]);      // ✓
// logLength(123);         // ✗ Error: number has no length
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 55,
      orderIndex: 8,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Classes in TypeScript',
      slug: 'typescript-classes',
      content: `# Classes in TypeScript

## Basic Class

\`\`\`typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}

let person = new Person("Alice", 25);
console.log(person.greet());
\`\`\`

## Access Modifiers

\`\`\`typescript
class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected owner: string;

  constructor(accountNumber: string, owner: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.owner = owner;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

let account = new BankAccount("123", "Alice");
account.deposit(100);
// account.balance = 1000; // Error: private
\`\`\`

## Readonly Properties

\`\`\`typescript
class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

let user = new User(1, "Alice");
// user.id = 2; // Error: readonly
\`\`\`

## Inheritance

\`\`\`typescript
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number): void {
    console.log(\`\${this.name} moved \${distance}m\`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof! Woof!");
  }
}

let dog = new Dog("Buddy");
dog.bark();
dog.move(10);
\`\`\`

## Abstract Classes

\`\`\`typescript
abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log(\`Area: \${this.getArea()}\`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

let circle = new Circle(5);
circle.describe();
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 60,
      orderIndex: 9,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Modules in TypeScript',
      slug: 'typescript-modules',
      content: `# Modules - Import and Export

## Exporting

\`\`\`typescript
// math.ts

// Named exports
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// Export class
export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Export interface
export interface User {
  id: number;
  name: string;
}

// Default export
export default function divide(a: number, b: number): number {
  return a / b;
}
\`\`\`

## Importing

\`\`\`typescript
// app.ts

// Named imports
import { add, subtract, PI } from './math';

console.log(add(5, 3));
console.log(PI);

// Import all
import * as Math from './math';
console.log(Math.add(10, 5));

// Default import
import divide from './math';
console.log(divide(10, 2));

// Mixed imports
import divide, { add, Calculator } from './math';

// Rename imports
import { add as sum } from './math';
\`\`\`

## Re-exporting

\`\`\`typescript
// index.ts

export { add, subtract } from './math';
export { User, Admin } from './types';
export * from './utils';
\`\`\`

## Type-Only Imports

\`\`\`typescript
// Import only types (removed at runtime)
import type { User } from './types';

// Or individual type imports
import { type User, createUser } from './user';
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 45,
      orderIndex: 10,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'TypeScript Configuration',
      slug: 'typescript-config',
      content: `# TypeScript Configuration

## tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
\`\`\`

## Key Compiler Options

\`\`\`json
{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",
    
    // Module system
    "module": "commonjs",
    
    // Output directory
    "outDir": "./dist",
    
    // Source map for debugging
    "sourceMap": true,
    
    // Strict type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    
    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    
    // Allow JavaScript files
    "allowJs": true,
    "checkJs": false
  }
}
\`\`\`

## Strict Mode Options

\`\`\`json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict checks
    "noImplicitAny": true,       // Error on implicit any
    "strictNullChecks": true,    // Strict null checking
    "strictFunctionTypes": true, // Strict function types
    "noUnusedLocals": true,      // Error on unused variables
    "noUnusedParameters": true,  // Error on unused params
    "noImplicitReturns": true    // Error on missing returns
  }
}
\`\`\`

## Path Mapping

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@models/*": ["models/*"],
      "@utils/*": ["utils/*"],
      "@/*": ["*"]
    }
  }
}
\`\`\`

## Usage

\`\`\`bash
# Compile TypeScript
tsc

# Watch mode
tsc --watch

# Specific file
tsc file.ts

# Initialize config
tsc --init
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 11,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Migrating from JavaScript to TypeScript',
      slug: 'js-to-typescript-migration',
      content: `# Migrating from JavaScript to TypeScript

## Step-by-Step Migration

### 1. Initialize TypeScript

\`\`\`bash
npm install --save-dev typescript @types/node
npx tsc --init
\`\`\`

### 2. Rename Files

\`\`\`bash
# Rename .js to .ts
mv file.js file.ts
mv app.js app.ts
\`\`\`

### 3. Add Type Annotations

\`\`\`typescript
// Before (JavaScript)
function add(a, b) {
  return a + b;
}

// After (TypeScript)
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

### 4. Fix Type Errors

\`\`\`typescript
// JavaScript
let value = null;
value = "hello";
value = 123;

// TypeScript - be explicit
let value: string | number | null = null;
value = "hello";
value = 123;
\`\`\`

### 5. Add Interfaces

\`\`\`typescript
// Before
function createUser(name, age, email) {
  return { name, age, email };
}

// After
interface User {
  name: string;
  age: number;
  email: string;
}

function createUser(name: string, age: number, email: string): User {
  return { name, age, email };
}
\`\`\`

## Migration Strategies

\`\`\`json
// Start with loose config
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "strict": false
  }
}

// Gradually enable strict checks
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
\`\`\`

## Common Patterns

\`\`\`typescript
// Optional properties
interface Config {
  apiKey: string;
  timeout?: number; // Optional
}

// Union types for flexibility
function process(value: string | number) {
  // Handle both types
}

// Type guards
function isString(value: any): value is string {
  return typeof value === "string";
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 55,
      orderIndex: 12,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'TypeScript with React',
      slug: 'typescript-with-react',
      content: `# TypeScript with React

## Function Components

\`\`\`typescript
import React from 'react';

interface Props {
  name: string;
  age: number;
  isActive?: boolean;
}

const User: React.FC<Props> = ({ name, age, isActive = true }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default User;
\`\`\`

## Hooks with TypeScript

\`\`\`typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    setUsers(data);
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\`

## Event Handlers

\`\`\`typescript
function Form() {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
\`\`\`

## Custom Hooks

\`\`\`typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// Usage
const [name, setName] = useLocalStorage<string>('name', 'Guest');
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 60,
      orderIndex: 13,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'Advanced TypeScript Types',
      slug: 'advanced-typescript-types',
      content: `# Advanced TypeScript Types

## Utility Types

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Readonly - make all properties readonly
type ReadonlyUser = Readonly<User>;

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
\`\`\`

## Mapped Types

\`\`\`typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Usage
type OptionalUser = Optional<User>;
\`\`\`

## Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// More complex example
type ExtractArray<T> = T extends (infer U)[] ? U : never;

type Item = ExtractArray<string[]>;  // string
\`\`\`

## Template Literal Types

\`\`\`typescript
type Direction = "up" | "down" | "left" | "right";
type MoveDirection = \`move-\${Direction}\`;
// "move-up" | "move-down" | "move-left" | "move-right"

type HTTPMethod = "GET" | "POST";
type Endpoint = "/users" | "/posts";
type APIRoute = \`\${HTTPMethod} \${Endpoint}\`;
// "GET /users" | "GET /posts" | "POST /users" | "POST /posts"
\`\`\`

## Discriminated Unions

\`\`\`typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 65,
      orderIndex: 14,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      content: `# TypeScript Best Practices

## Use Strict Mode

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Avoid \`any\`

\`\`\`typescript
// Bad
function process(data: any) {
  return data.value;
}

// Good
function process(data: { value: string }) {
  return data.value;
}

// Or use unknown for truly unknown types
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
\`\`\`

## Use Interfaces for Objects

\`\`\`typescript
// Prefer interfaces for object shapes
interface User {
  id: number;
  name: string;
}

// Use type for unions, intersections
type Status = 'active' | 'inactive';
type Result = Success | Error;
\`\`\`

## Type Guards

\`\`\`typescript
function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string'
  );
}

function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // TypeScript knows it's User
  }
}
\`\`\`

## Null Safety

\`\`\`typescript
// Use optional chaining
const userName = user?.profile?.name;

// Use nullish coalescing
const displayName = userName ?? 'Guest';

// Explicit null checks
function greet(name: string | null) {
  if (name !== null) {
    console.log(\`Hello, \${name}\`);
  }
}
\`\`\`

## Prefer Readonly

\`\`\`typescript
interface Config {
  readonly apiKey: string;
  readonly timeout: number;
}

// For arrays
function process(items: readonly string[]) {
  // items.push("new"); // Error: readonly
  return items.map(x => x.toUpperCase());
}
\`\`\`

## Use Enums Carefully

\`\`\`typescript
// String enums are safer
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// Or use const objects
const Status = {
  Active: "ACTIVE",
  Inactive: "INACTIVE"
} as const;

type Status = typeof Status[keyof typeof Status];
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 50,
      orderIndex: 15,
      isPublished: true,
      isFree: false,
    },
  ];

  // Create all TypeScript lessons
  for (const lessonData of tsLessons) {
    const lesson = await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: tsModule.id,
          slug: lessonData.slug,
        },
      },
      update: {},
      create: {
        ...lessonData,
        moduleId: tsModule.id,
      },
    });
    console.log(`  ✅ Created lesson: ${lesson.title}`);
  }

  console.log('\n🎉 Successfully seeded all JavaScript & TypeScript lessons!');
  console.log(`📊 Total: ${jsLessons.length + tsLessons.length} lessons created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
