/**
 * Infinity Code - Unified Topic System
 * Ensures consistent topic coverage across all programming languages
 * Each topic has language-specific implementations and examples
 */

export interface TopicExample {
  language: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface UnifiedTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: TopicExample[];
  exercises: {
    title: string;
    description: string;
    hints: string[];
    solution: Record<string, string>; // language -> solution code
  }[];
  prerequisites: string[];
  learningOutcomes: string[];
}

export const unifiedTopics: UnifiedTopic[] = [
  // ============================================
  // PROGRAMMING FUNDAMENTALS
  // ============================================
  {
    id: 'variables',
    name: 'Variables',
    slug: 'variables',
    description: 'Named storage locations in memory that hold values which can change during program execution.',
    category: 'Programming Fundamentals',
    difficulty: 'beginner',
    examples: [
      {
        language: 'JavaScript',
        code: `let age = 25;
const name = "Alice";
var score = 100; // legacy

console.log(age); // 25
console.log(name); // Alice`,
        explanation: 'JavaScript uses let, const, and var for variable declaration. let and const are block-scoped, while var is function-scoped.',
        output: '25\nAlice'
      },
      {
        language: 'Python',
        code: `age = 25
name = "Alice"
score = 100

print(age)  # 25
print(name)  # Alice`,
        explanation: 'Python uses dynamic typing - no explicit type declaration needed. Variables are created when first assigned.',
        output: '25\nAlice'
      },
      {
        language: 'Java',
        code: `int age = 25;
String name = "Alice";
double score = 100.0;

System.out.println(age); // 25
System.out.println(name); // Alice`,
        explanation: 'Java requires explicit type declaration. Each variable must have a specified type (int, String, double, etc.).',
        output: '25\nAlice'
      },
      {
        language: 'C++',
        code: `int age = 25;
std::string name = "Alice";
double score = 100.0;

std::cout << age << std::endl; // 25
std::cout << name << std::endl; // Alice`,
        explanation: 'C++ requires type declaration and uses std::string for text. Variables must be declared with their type.',
        output: '25\nAlice'
      },
      {
        language: 'TypeScript',
        code: `let age: number = 25;
const name: string = "Alice";
let score: number = 100;

console.log(age); // 25
console.log(name); // Alice`,
        explanation: 'TypeScript adds type annotations to JavaScript variables, providing compile-time type checking.',
        output: '25\nAlice'
      }
    ],
    exercises: [
      {
        title: 'Create a User Profile',
        description: 'Create variables to store user information: name, age, email, and isPremium (boolean). Print all values.',
        hints: [
          'Use appropriate data types for each variable',
          'String for name and email, number for age, boolean for isPremium',
          'Use console.log/print to display values'
        ],
        solution: {
          javascript: `let name = "John Doe";
let age = 30;
let email = "john@example.com";
let isPremium = true;

console.log(name, age, email, isPremium);`,
          python: `name = "John Doe"
age = 30
email = "john@example.com"
is_premium = True

print(name, age, email, is_premium)`,
          java: `String name = "John Doe";
int age = 30;
String email = "john@example.com";
boolean isPremium = true;

System.out.println(name + " " + age + " " + email + " " + isPremium);`,
          cpp: `std::string name = "John Doe";
int age = 30;
std::string email = "john@example.com";
bool isPremium = true;

std::cout << name << " " << age << " " << email << " " << isPremium << std::endl;`,
          typescript: `let name: string = "John Doe";
let age: number = 30;
let email: string = "john@example.com";
let isPremium: boolean = true;

console.log(name, age, email, isPremium);`
        }
      }
    ],
    prerequisites: [],
    learningOutcomes: [
      'Understand what variables are and how they store data',
      'Declare variables using appropriate syntax for each language',
      'Choose appropriate data types for different kinds of information',
      'Name variables following language-specific conventions'
    ]
  },

  // ============================================
  // DATA TYPES
  // ============================================
  {
    id: 'data-types',
    name: 'Data Types',
    slug: 'data-types',
    description: 'Categories of data that determine what values a variable can hold and what operations can be performed on it.',
    category: 'Programming Fundamentals',
    difficulty: 'beginner',
    examples: [
      {
        language: 'JavaScript',
        code: `// Primitive types
let text = "Hello";      // string
let number = 42;          // number
let isActive = true;      // boolean
let nothing = null;       // null
let notDefined;           // undefined

// Reference types
let arr = [1, 2, 3];      // array
let obj = { key: "value" }; // object

console.log(typeof text); // "string"
console.log(typeof number); // "number"`,
        explanation: 'JavaScript has 7 primitive types and reference types like arrays and objects. typeof operator returns the type.',
        output: 'string\nnumber'
      },
      {
        language: 'Python',
        code: `# Basic data types
text = "Hello"      # str
number = 42          # int
decimal = 3.14       # float
is_active = True     # bool
nothing = None       # NoneType

# Collections
arr = [1, 2, 3]      # list
obj = {"key": "value"} # dict

print(type(text))    # <class 'str'>
print(type(number))  # <class 'int'>`,
        explanation: 'Python uses dynamic typing with built-in types like str, int, float, bool, and None. Use type() to check the type.',
        output: "<class 'str'>\n<class 'int'>"
      },
      {
        language: 'Java',
        code: `// Primitive types
int number = 42;           // int
double decimal = 3.14;     // double
boolean isActive = true;   // boolean
char grade = 'A';          // char

// Reference types
String text = "Hello";     // String
int[] arr = {1, 2, 3};     // array

System.out.println(number); // 42
System.out.println(decimal); // 3.14`,
        explanation: 'Java has 8 primitive types (int, double, boolean, char, etc.) and reference types like String and arrays.',
        output: '42\n3.14'
      },
      {
        language: 'C++',
        code: `// Primitive types
int number = 42;           // int
double decimal = 3.14;     // double
bool isActive = true;      // bool
char grade = 'A';          // char

// Reference types
std::string text = "Hello"; // string
int arr[] = {1, 2, 3};     // array

std::cout << number << std::endl; // 42
std::cout << decimal << std::endl; // 3.14`,
        explanation: 'C++ has fundamental types (int, double, bool, char) and library types like std::string. Types must be explicitly declared.',
        output: '42\n3.14'
      },
      {
        language: 'TypeScript',
        code: `// Type annotations
let text: string = "Hello";
let number: number = 42;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays and objects
let arr: number[] = [1, 2, 3];
let obj: { key: string } = { key: "value" };

console.log(typeof text); // "string"
console.log(typeof number); // "number"`,
        explanation: 'TypeScript adds static type annotations to JavaScript types, enabling compile-time type checking and better tooling.',
        output: 'string\nnumber'
      }
    ],
    exercises: [
      {
        title: 'Type Identification',
        description: 'Create variables of different data types and use the appropriate method to display their types.',
        hints: [
          'Create at least 5 different types',
          'Use typeof in JavaScript/TypeScript, type() in Python',
          'Java and C++ require explicit type knowledge'
        ],
        solution: {
          javascript: `let str = "Hello";
let num = 42;
let bool = true;
let arr = [1, 2, 3];
let obj = { a: 1 };

console.log(typeof str); // string
console.log(typeof num); // number
console.log(typeof bool); // boolean
console.log(typeof arr); // object
console.log(typeof obj); // object`,
          python: `text = "Hello"
number = 42
is_bool = True
arr = [1, 2, 3]
obj = {"a": 1}

print(type(text))   # <class 'str'>
print(type(number)) # <class 'int'>
print(type(is_bool)) # <class 'bool'>
print(type(arr))    # <class 'list'>
print(type(obj))    # <class 'dict'>`,
          java: `String text = "Hello";
int number = 42;
boolean isBool = true;
int[] arr = {1, 2, 3};

System.out.println("String");
System.out.println("int");
System.out.println("boolean");
System.out.println("int[]");`,
          cpp: `std::string text = "Hello";
int number = 42;
bool isBool = true;
int arr[] = {1, 2, 3};

std::cout << "string" << std::endl;
std::cout << "int" << std::endl;
std::cout << "bool" << std::endl;
std::cout << "int[]" << std::endl;`,
          typescript: `let text: string = "Hello";
let number: number = 42;
let isBool: boolean = true;
let arr: number[] = [1, 2, 3];

console.log(typeof text); // string
console.log(typeof number); // number
console.log(typeof isBool); // boolean
console.log(typeof arr); // object`
        }
      }
    ],
    prerequisites: ['variables'],
    learningOutcomes: [
      'Identify and use primitive data types',
      'Understand the difference between primitive and reference types',
      'Choose appropriate data types for different scenarios',
      'Use type checking methods in each language'
    ]
  },

  // ============================================
  // CONDITIONAL STATEMENTS
  // ============================================
  {
    id: 'conditionals',
    name: 'Conditional Statements',
    slug: 'conditionals',
    description: 'Control flow statements that execute different code blocks based on whether conditions are true or false.',
    category: 'Programming Fundamentals',
    difficulty: 'beginner',
    examples: [
      {
        language: 'JavaScript',
        code: `let age = 18;

if (age < 13) {
  console.log("Child");
} else if (age < 20) {
  console.log("Teenager");
} else {
  console.log("Adult");
}

// Ternary operator
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"`,
        explanation: 'JavaScript uses if-else if-else for multiple conditions and ternary operator (condition ? true : false) for simple decisions.',
        output: 'Teenager\nAdult'
      },
      {
        language: 'Python',
        code: `age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")

# Ternary operator
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult`,
        explanation: 'Python uses if-elif-else with indentation to define code blocks. Python also supports ternary expressions.',
        output: 'Teenager\nAdult'
      },
      {
        language: 'Java',
        code: `int age = 18;

if (age < 13) {
    System.out.println("Child");
} else if (age < 20) {
    System.out.println("Teenager");
} else {
    System.out.println("Adult");
}

// Ternary operator
String status = age >= 18 ? "Adult" : "Minor";
System.out.println(status); // Adult`,
        explanation: 'Java uses if-else if-else with curly braces. The ternary operator works the same way as in JavaScript.',
        output: 'Teenager\nAdult'
      },
      {
        language: 'C++',
        code: `int age = 18;

if (age < 13) {
    std::cout << "Child" << std::endl;
} else if (age < 20) {
    std::cout << "Teenager" << std::endl;
} else {
    std::cout << "Adult" << std::endl;
}

// Ternary operator
std::string status = age >= 18 ? "Adult" : "Minor";
std::cout << status << std::endl; // Adult`,
        explanation: 'C++ uses if-else if-else with curly braces and std::cout for output. Ternary operator syntax is consistent across languages.',
        output: 'Teenager\nAdult'
      },
      {
        language: 'TypeScript',
        code: `let age: number = 18;

if (age < 13) {
  console.log("Child");
} else if (age < 20) {
  console.log("Teenager");
} else {
  console.log("Adult");
}

// Type guard example
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}`,
        explanation: 'TypeScript conditionals work like JavaScript but with added type safety and type guards for narrowing types.',
        output: 'Teenager\nAdult'
      }
    ],
    exercises: [
      {
        title: 'Grade Calculator',
        description: 'Write a program that takes a score (0-100) and prints the corresponding grade: A (90-100), B (80-89), C (70-79), D (60-69), F (0-59).',
        hints: [
          'Use if-else if-else chain',
          'Check ranges from highest to lowest',
          'Consider edge cases like exact boundaries'
        ],
        solution: {
          javascript: `let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(grade); // B`,
          python: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(grade)  # B`,
          java: `int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

System.out.println(grade); // B`,
          cpp: `int score = 85;
std::string grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

std::cout << grade << std::endl; // B`,
          typescript: `let score: number = 85;
let grade: string;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(grade); // B`
        }
      }
    ],
    prerequisites: ['variables', 'data-types'],
    learningOutcomes: [
      'Write if-else statements to control program flow',
      'Use comparison operators in conditions',
      'Implement switch/case statements where appropriate',
      'Apply ternary operators for simple conditions'
    ]
  },

  // ============================================
  // LOOPS
  // ============================================
  {
    id: 'loops',
    name: 'Loops',
    slug: 'loops',
    description: 'Control flow statements that repeatedly execute a block of code while a condition is true or for a specified number of iterations.',
    category: 'Programming Fundamentals',
    difficulty: 'beginner',
    examples: [
      {
        language: 'JavaScript',
        code: `// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let j = 0;
while (j < 3) {
  console.log(j); // 0, 1, 2
  j++;
}

// For...of loop (arrays)
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item);
}

// For...in loop (objects)
const obj = { x: 1, y: 2 };
for (const key in obj) {
  console.log(key); // x, y
}`,
        explanation: 'JavaScript provides for, while, do-while, for...of (for iterables), and for...in (for object properties) loops.',
        output: '0\n1\n2\n3\n4\n0\n1\n2\na\nb\nc\nx\ny'
      },
      {
        language: 'Python',
        code: `# For loop with range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# While loop
j = 0
while j < 3:
    print(j)  # 0, 1, 2
    j += 1

# For loop over list
arr = ['a', 'b', 'c']
for item in arr:
    print(item)

# For loop with enumerate
for index, value in enumerate(arr):
    print(f"{index}: {value}")`,
        explanation: 'Python uses for loops primarily for iteration over sequences. range() generates number sequences. while loops work similarly to other languages.',
        output: '0\n1\n2\n3\n4\n0\n1\n2\na\nb\nc\n0: a\n1: b\n2: c'
      },
      {
        language: 'Java',
        code: `// For loop
for (int i = 0; i < 5; i++) {
    System.out.println(i); // 0, 1, 2, 3, 4
}

// While loop
int j = 0;
while (j < 3) {
    System.out.println(j); // 0, 1, 2
    j++;
}

// Enhanced for loop (arrays)
int[] arr = {1, 2, 3};
for (int num : arr) {
    System.out.println(num);
}

// Do-while loop
int k = 0;
do {
    System.out.println(k);
    k++;
} while (k < 3);`,
        explanation: 'Java provides for, while, do-while, and enhanced for-each loops. The enhanced for loop simplifies array/collection iteration.',
        output: '0\n1\n2\n3\n4\n0\n1\n2\n1\n2\n3\n0\n1\n2'
      },
      {
        language: 'C++',
        code: `// For loop
for (int i = 0; i < 5; i++) {
    std::cout << i << std::endl; // 0, 1, 2, 3, 4
}

// While loop
int j = 0;
while (j < 3) {
    std::cout << j << std::endl; // 0, 1, 2
    j++;
}

// Range-based for loop (C++11)
int arr[] = {1, 2, 3};
for (int num : arr) {
    std::cout << num << std::endl;
}

// Do-while loop
int k = 0;
do {
    std::cout << k << std::endl;
    k++;
} while (k < 3);`,
        explanation: 'C++ supports traditional for, while, do-while, and range-based for loops (C++11). Range-based for simplifies container iteration.',
        output: '0\n1\n2\n3\n4\n0\n1\n2\n1\n2\n3\n0\n1\n2'
      },
      {
        language: 'TypeScript',
        code: `// For loop with type annotations
for (let i: number = 0; i < 5; i++) {
  console.log(i);
}

// For...of with typed arrays
const numbers: number[] = [1, 2, 3];
for (const num of numbers) {
  console.log(num);
}

// For...in with typed objects
interface Point { x: number; y: number; }
const point: Point = { x: 1, y: 2 };
for (const key in point) {
  console.log(key); // x, y
}`,
        explanation: 'TypeScript loops work identically to JavaScript but with added type safety for loop variables and iterated collections.',
        output: '0\n1\n2\n3\n4\n1\n2\n3\nx\ny'
      }
    ],
    exercises: [
      {
        title: 'Multiplication Table',
        description: 'Create a program that prints the multiplication table for a given number (e.g., for 5: 5x1=5, 5x2=10, ..., 5x10=50).',
        hints: [
          'Use a for loop from 1 to 10',
          'Multiply the loop counter by the given number',
          'Format the output as shown in the description'
        ],
        solution: {
          javascript: `let num = 5;
for (let i = 1; i <= 10; i++) {
  console.log(\`\${num}x\${i}=\${num * i}\`);
}`,
          python: `num = 5
for i in range(1, 11):
    print(f"{num}x{i}={num * i}")`,
          java: `int num = 5;
for (int i = 1; i <= 10; i++) {
    System.out.println(num + "x" + i + "=" + (num * i));
}`,
          cpp: `int num = 5;
for (int i = 1; i <= 10; i++) {
    std::cout << num << "x" << i << "=" << (num * i) << std::endl;
}`,
          typescript: `let num: number = 5;
for (let i: number = 1; i <= 10; i++) {
  console.log(\`\${num}x\${i}=\${num * i}\`);
}`
        }
      }
    ],
    prerequisites: ['variables', 'conditionals'],
    learningOutcomes: [
      'Write for loops to iterate a specific number of times',
      'Use while loops for condition-based iteration',
      'Iterate over arrays and collections',
      'Control loop execution with break and continue'
    ]
  },

  // ============================================
  // FUNCTIONS
  // ============================================
  {
    id: 'functions',
    name: 'Functions',
    slug: 'functions',
    description: 'Reusable blocks of code that perform a specific task, optionally taking parameters and returning values.',
    category: 'Programming Fundamentals',
    difficulty: 'beginner',
    examples: [
      {
        language: 'JavaScript',
        code: `// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function(a, b) {
  return a - b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Default parameters
function greet(name = "Guest") {
  return \`Hello, \${name}!\`;
}

console.log(add(5, 3)); // 8
console.log(greet()); // Hello, Guest!
console.log(greet("Alice")); // Hello, Alice!`,
        explanation: 'JavaScript supports function declarations, expressions, arrow functions, default parameters, and rest parameters.',
        output: '8\nHello, Guest!\nHello, Alice!'
      },
      {
        language: 'Python',
        code: `# Function definition
def add(a, b):
    return a + b

# Default parameters
def greet(name="Guest"):
    return f"Hello, {name}!"

# Variable arguments
def sum_all(*args):
    return sum(args)

print(add(5, 3))  # 8
print(greet())  # Hello, Guest!
print(greet("Alice"))  # Hello, Alice!
print(sum_all(1, 2, 3, 4))  # 10`,
        explanation: 'Python uses def keyword for functions. Supports default parameters, *args for variable positional arguments, and **kwargs for keyword arguments.',
        output: '8\nHello, Guest!\nHello, Alice!\n10'
      },
      {
        language: 'Java',
        code: `// Method definition
public static int add(int a, int b) {
    return a + b;
}

// Method overloading
public static int add(int a, int b, int c) {
    return a + b + c;
}

// Varargs
public static int sumAll(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

System.out.println(add(5, 3)); // 8
System.out.println(add(1, 2, 3)); // 6
System.out.println(sumAll(1, 2, 3, 4)); // 10`,
        explanation: 'Java uses methods (functions in classes). Supports method overloading (same name, different parameters) and varargs for variable arguments.',
        output: '8\n6\n10'
      },
      {
        language: 'C++',
        code: `// Function definition
int add(int a, int b) {
    return a + b;
}

// Default parameters
std::string greet(std::string name = "Guest") {
    return "Hello, " + name + "!";
}

// Function overloading
double add(double a, double b) {
    return a + b;
}

// Variadic templates (C++11)
template<typename... Args>
auto sumAll(Args... args) {
    return (args + ...);
}

std::cout << add(5, 3) << std::endl; // 8
std::cout << greet() << std::endl; // Hello, Guest!`,
        explanation: 'C++ supports function overloading, default parameters, and templates for generic programming. Variadic templates handle variable arguments.',
        output: '8\nHello, Guest!'
      },
      {
        language: 'TypeScript',
        code: `// Typed function
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameters
function greet(name?: string): string {
  return \`Hello, \${name || "Guest"}!\`;
}

// Function type
const multiply: (a: number, b: number) => number = (a, b) => a * b;

// Generics
function identity<T>(arg: T): T {
  return arg;
}

console.log(add(5, 3)); // 8
console.log(greet()); // Hello, Guest!
console.log(multiply(4, 5)); // 20
console.log(identity<string>("Hello")); // Hello`,
        explanation: 'TypeScript adds type annotations to function parameters and return types, plus generics for reusable type-safe functions.',
        output: '8\nHello, Guest!\n20\nHello'
      }
    ],
    exercises: [
      {
        title: 'Calculator Functions',
        description: 'Create functions for basic arithmetic operations: add, subtract, multiply, divide. Each should take two numbers and return the result.',
        hints: [
          'Define separate functions for each operation',
          'Handle division by zero case',
          'Test with different number combinations'
        ],
        solution: {
          javascript: `function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
}

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(10, 5)); // 50
console.log(divide(10, 5)); // 2`,
          python: `def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0: return "Cannot divide by zero"
    return a / b

print(add(10, 5)) # 15
print(subtract(10, 5)) # 5
print(multiply(10, 5)) # 50
print(divide(10, 5)) # 2.0`,
          java: `public static int add(int a, int b) { return a + b; }
public static int subtract(int a, int b) { return a - b; }
public static int multiply(int a, int b) { return a * b; }
public static double divide(int a, int b) {
    if (b == 0) return -1; // error case
    return (double) a / b;
}

System.out.println(add(10, 5)); // 15
System.out.println(subtract(10, 5)); // 5
System.out.println(multiply(10, 5)); // 50
System.out.println(divide(10, 5)); // 2.0`,
          cpp: `int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
double divide(int a, int b) {
    if (b == 0) return -1; // error case
    return static_cast<double>(a) / b;
}

std::cout << add(10, 5) << std::endl; // 15
std::cout << subtract(10, 5) << std::endl; // 5
std::cout << multiply(10, 5) << std::endl; // 50
std::cout << divide(10, 5) << std::endl; // 2`,
          typescript: `function add(a: number, b: number): number { return a + b; }
function subtract(a: number, b: number): number { return a - b; }
function multiply(a: number, b: number): number { return a * b; }
function divide(a: number, b: number): number {
  if (b === 0) return -1; // error case
  return a / b;
}

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(10, 5)); // 50
console.log(divide(10, 5)); // 2`
        }
      }
    ],
    prerequisites: ['variables', 'conditionals'],
    learningOutcomes: [
      'Define and call functions with parameters',
      'Use return statements to send values back',
      'Understand scope and variable visibility',
      'Apply default and optional parameters'
    ]
  }
];

/**
 * Get topics by category
 */
export function getTopicsByCategory(category: string): UnifiedTopic[] {
  return unifiedTopics.filter(topic => topic.category === category);
}

/**
 * Get topics by difficulty
 */
export function getTopicsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): UnifiedTopic[] {
  return unifiedTopics.filter(topic => topic.difficulty === difficulty);
}

/**
 * Get topic by slug
 */
export function getTopicBySlug(slug: string): UnifiedTopic | undefined {
  return unifiedTopics.find(topic => topic.slug === slug);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(unifiedTopics.map(topic => topic.category));
  return Array.from(categories);
}

/**
 * Get example code for a specific language
 */
export function getExampleForLanguage(topic: UnifiedTopic, language: string): TopicExample | undefined {
  return topic.examples.find(example => example.language.toLowerCase() === language.toLowerCase());
}

/**
 * Get solution for a specific language
 */
export function getSolutionForLanguage(exercise: UnifiedTopic['exercises'][0], language: string): string | undefined {
  return exercise.solution[language.toLowerCase()];
}