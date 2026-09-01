/**
 * Comprehensive Curriculum for 6 Languages
 * Python, C++, JavaScript, Java, TypeScript, C#
 * 
 * Structure: Shared Foundation + Language-Specific Deep Dives
 */

import type { LanguageId } from './languages';

export interface LessonStructure {
  id: string;
  title: string;
  category: 'foundation' | 'intermediate' | 'advanced' | 'language-specific';
  order: number;
  duration: string;
  xpReward: number;
  conceptText: string;
  diagram?: string; // URL or description
  codeExamples: Record<LanguageId, string>;
  hints: string[];
  commonErrors: Record<LanguageId, string[]>;
  quiz: QuizQuestion[];
  tryIt?: string; // Starter code challenge
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// SHARED FOUNDATION - All 6 languages
export const FOUNDATION_LESSONS: LessonStructure[] = [
  {
    id: 'hello-world',
    title: 'Hello World - Your First Program',
    category: 'foundation',
    order: 1,
    duration: '5 min',
    xpReward: 10,
    conceptText: `Every programming journey begins with a single line of code. The "Hello, World!" program is a time-honored tradition that dates back to the 1970s. It serves as your first conversation with the computer, a simple greeting that confirms everything is working correctly.

When you write your first program, you're not just printing text to the screen. You're establishing a fundamental relationship with the machine. The computer receives your instructions, processes them, and responds. This back-and-forth forms the foundation of all programming.

Different languages have different ways of expressing this simple greeting. Python keeps it minimal and readable. C++ requires more ceremony with its includes and main function. Java wraps everything in classes. JavaScript lives in the browser console. Each language reflects its design philosophy in this first program.

Understanding how each language handles output will help you grasp its broader approach to programming. Some languages prioritize simplicity. Others emphasize structure and type safety. As you progress, you'll appreciate why each language makes these choices.`,
    diagram: 'Simple input/output flow diagram',
    codeExamples: {
      python: `# Python - Simple and clean
print("Hello, World!")`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      javascript: `// JavaScript
console.log("Hello, World!");`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      typescript: `// TypeScript
console.log("Hello, World!");`,
      csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    },
    hints: [
      'In Python, the print function is built into the language core and requires no imports.',
      'C++ needs the iostream library included at the top to access console output functionality.',
      'Java requires all executable code to live inside a class with a specific main method signature.',
    ],
    commonErrors: {
      python: ['Forgetting quotes around text', 'Using Print instead of print (case sensitive)'],
      cpp: ['Missing semicolon', 'Forgetting to include iostream', 'Not returning 0 from main'],
      javascript: ['Using Console.log instead of console.log', 'Missing quotes'],
      java: ['Missing semicolon', 'Wrong class name', 'Missing main method signature'],
      typescript: ['Same as JavaScript - missing quotes, wrong case'],
      csharp: ['Missing semicolon', 'Forgetting using System', 'Wrong Console case'],
    },
    quiz: [
      {
        question: 'Which language requires a class to run code?',
        options: ['Python', 'C++', 'Java', 'JavaScript'],
        correctAnswer: 2,
        explanation: 'Java requires all code to be inside a class with a main method.',
      },
      {
        question: 'What does cout << do in C++?',
        options: ['Inputs data', 'Outputs to console', 'Declares variable', 'None'],
        correctAnswer: 1,
        explanation: 'cout << is used to output data to the console in C++.',
      },
    ],
    tryIt: 'Modify the code to print your name instead of "Hello, World!"',
  },
  {
    id: 'variables-basics',
    title: 'Variables - Storing Data',
    category: 'foundation',
    order: 2,
    duration: '8 min',
    xpReward: 15,
    conceptText: `Variables are the fundamental building blocks of programming. Think of them as labeled containers that hold information in your computer's memory. When you create a variable, you're asking the computer to set aside a piece of memory and give it a name you can reference later.

The concept of a variable mirrors how we use symbols in mathematics. Just as "x" can represent a number in an equation, a variable in programming can represent any value. The difference is that programming variables can hold many types of data: numbers, text, true/false values, and complex structures.

Different programming languages handle variables in distinct ways. Python uses dynamic typing, meaning you don't declare what type of data a variable will hold. The language figures it out automatically. C++, Java, and C# use static typing, requiring you to specify whether a variable holds an integer, a string, or another type. TypeScript adds types to JavaScript, giving you the best of both worlds.

These typing differences reflect deeper philosophical divisions in language design. Dynamic typing prioritizes flexibility and rapid development. Static typing emphasizes safety and catches errors before your code runs. Neither approach is inherently superior. Each serves different needs.

When you name a variable, you're making a choice about code readability. Good variable names act as documentation, making your code self-explanatory. Poor names create confusion and technical debt. Python encourages snake_case. Java and C# prefer camelCase. These conventions create consistency within each language's ecosystem.`,
    diagram: 'Memory box diagram showing variable storage',
    codeExamples: {
      python: `# Python - Dynamic typing
name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"{name} is {age} years old")`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    string name = "Alice";
    int age = 25;
    double height = 5.6;
    bool isStudent = true;
    
    cout << name << " is " << age << " years old" << endl;
    return 0;
}`,
      javascript: `// JavaScript - let for variables
let name = "Alice";
let age = 25;
let height = 5.6;
let isStudent = true;

console.log(\`\${name} is \${age} years old\`);`,
      java: `public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;
        
        System.out.println(name + " is " + age + " years old");
    }
}`,
      typescript: `// TypeScript - with type annotations
let name: string = "Alice";
let age: number = 25;
let height: number = 5.6;
let isStudent: boolean = true;

console.log(\`\${name} is \${age} years old\`);`,
      csharp: `using System;

class Program {
    static void Main() {
        string name = "Alice";
        int age = 25;
        double height = 5.6;
        bool isStudent = true;
        
        Console.WriteLine($"{name} is {age} years old");
    }
}`,
    },
    hints: [
      'Python determines variable types automatically based on the value you assign.',
      'C++ and Java require explicit type declarations before the variable name.',
      'TypeScript adds optional type annotations to JavaScript for additional safety checks.',
    ],
    commonErrors: {
      python: ['Using camelCase instead of snake_case'],
      cpp: ['Forgetting semicolons', 'Using undefined types'],
      javascript: ['Using var instead of let', 'Forgetting to declare with let/const'],
      java: ['Wrong type declaration', 'Missing semicolon'],
      typescript: ['Type mismatch', 'Missing type annotation'],
      csharp: ['Wrong type case (String vs string)', 'Missing semicolon'],
    },
    quiz: [
      {
        question: 'Which language requires explicit type declarations?',
        options: ['Python', 'JavaScript', 'C++', 'All of them'],
        correctAnswer: 2,
        explanation: 'C++ requires you to declare types like int, string, double explicitly.',
      },
    ],
    tryIt: 'Create variables for your own name, age, and favorite number, then print them.',
  },
];

// INTERMEDIATE LESSONS - Control Flow
export const CONTROL_FLOW_LESSONS: LessonStructure[] = [
  {
    id: 'for-loops',
    title: 'For Loops - Repeat Code',
    category: 'intermediate',
    order: 10,
    duration: '10 min',
    xpReward: 20,
    conceptText: `Computers excel at repetition. What would take a human hours to repeat a thousand times takes a computer microseconds. The for loop is your tool for harnessing this power, allowing you to execute the same block of code multiple times with systematic variation.

Imagine you need to process a list of customer orders, send birthday emails to a hundred users, or calculate the first fifty Fibonacci numbers. Writing the same code fifty times would be tedious and error-prone. A for loop lets you write it once and execute it as many times as needed.

The structure of a for loop reveals fundamental differences between language families. Python's approach emphasizes readability, using the range function to generate numbers. C-style languages like C++, Java, JavaScript, TypeScript, and C# use a three-part syntax: initialization, condition, and increment. This verbose syntax offers precise control but requires more ceremony.

Understanding loops means understanding how computers track state through iterations. Each time the loop executes, a counter variable changes. This variable becomes your lens into each iteration, letting you access different elements of a list or perform calculations that depend on the current position.

The for loop is more than a mechanism for repetition. It's a fundamental control structure that shapes how you think about problems. When you see a task that requires doing something multiple times, your mind should immediately consider loops. This pattern recognition is central to developing programming intuition.`,
    diagram: 'Loop flowchart with initialization, condition, increment',
    codeExamples: {
      python: `# Python - range() function
for i in range(5):
    print(i)

# Loop with custom range
for i in range(1, 11):
    print(f"Number: {i}")`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << i << endl;
    }
    
    for (int i = 1; i <= 10; i++) {
        cout << "Number: " << i << endl;
    }
    return 0;
}`,
      javascript: `// JavaScript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

for (let i = 1; i <= 10; i++) {
    console.log(\`Number: \${i}\`);
}`,
      java: `public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
        
        for (int i = 1; i <= 10; i++) {
            System.out.println("Number: " + i);
        }
    }
}`,
      typescript: `// TypeScript
for (let i: number = 0; i < 5; i++) {
    console.log(i);
}

for (let i: number = 1; i <= 10; i++) {
    console.log(\`Number: \${i}\`);
}`,
      csharp: `using System;

class Program {
    static void Main() {
        for (int i = 0; i < 5; i++) {
            Console.WriteLine(i);
        }
        
        for (int i = 1; i <= 10; i++) {
            Console.WriteLine($"Number: {i}");
        }
    }
}`,
    },
    hints: [
      'Python uses the range function, which generates numbers from start to end minus one.',
      'C-style languages use a three-part syntax in parentheses: initialization, condition, and increment.',
      'Remember to use let in JavaScript and TypeScript to properly scope the loop variable.',
    ],
    commonErrors: {
      python: ['Using C-style for loop syntax', 'Forgetting colon after for'],
      cpp: ['Infinite loop from wrong condition', 'Using assignment operator instead of comparison'],
      javascript: ['Using var instead of let', 'Off-by-one errors in loop conditions'],
      java: ['Missing semicolons in for declaration'],
      typescript: ['Type errors with counter variable'],
      csharp: ['Using less than or equal when you meant less than'],
    },
    quiz: [
      {
        question: 'What does range(5) give in Python?',
        options: ['1 to 5', '0 to 5', '0 to 4', '1 to 4'],
        correctAnswer: 2,
        explanation: 'range(5) generates numbers from 0 to 4 (5 numbers total).',
      },
    ],
    tryIt: 'Write a loop that prints even numbers from 0 to 20.',
  },
];

// CONDITIONAL LESSONS
export const CONDITIONAL_LESSONS: LessonStructure[] = [
  {
    id: 'if-statements',
    title: 'Conditional Logic - Making Decisions',
    category: 'intermediate',
    order: 5,
    duration: '12 min',
    xpReward: 20,
    conceptText: `Programming would be useless if code could only execute in straight lines. The power of software lies in its ability to make decisions based on conditions. If-statements give your programs the intelligence to respond differently to different situations.

Think about how you make decisions in daily life. If it's raining, you take an umbrella. If you're hungry, you eat. If a package arrives, you open it. Conditional statements bring this same decision-making capability to code.

Every if-statement evaluates a condition that results in true or false. When the condition is true, the code inside the if-block executes. When false, the program skips that block and continues. This binary choice forms the foundation of program logic.

Different languages express conditionals with subtle variations in syntax. Python uses colons and indentation to define blocks. C-family languages use parentheses around conditions and curly braces for blocks. These syntactic differences reflect each language's philosophy about readability versus flexibility.

Conditional logic becomes more sophisticated with else and else-if clauses. An else block provides an alternative path when the initial condition fails. Else-if clauses allow multiple conditions to be checked in sequence. Together, these constructs let you model complex decision trees.

Understanding conditionals means understanding boolean logic. Conditions can combine multiple checks using AND, OR, and NOT operators. You can ask whether a user is both logged in AND has premium status. You can check if a number is less than zero OR greater than one hundred. These logical combinations unlock powerful conditional behavior.`,
    diagram: 'Decision tree flowchart',
    codeExamples: {
      python: `# Python - Clean syntax with colons
age = 18

if age >= 18:
    print("You can vote")
else:
    print("Too young to vote")

# Multiple conditions
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int age = 18;
    
    if (age >= 18) {
        cout << "You can vote" << endl;
    } else {
        cout << "Too young to vote" << endl;
    }
    
    // Multiple conditions
    int score = 85;
    
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript
let age = 18;

if (age >= 18) {
    console.log("You can vote");
} else {
    console.log("Too young to vote");
}

// Multiple conditions
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}`,
      java: `public class Main {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("You can vote");
        } else {
            System.out.println("Too young to vote");
        }
        
        // Multiple conditions
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
    }
}`,
      typescript: `// TypeScript
let age: number = 18;

if (age >= 18) {
    console.log("You can vote");
} else {
    console.log("Too young to vote");
}

// Multiple conditions
let score: number = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}`,
      csharp: `using System;

class Program {
    static void Main() {
        int age = 18;
        
        if (age >= 18) {
            Console.WriteLine("You can vote");
        } else {
            Console.WriteLine("Too young to vote");
        }
        
        // Multiple conditions
        int score = 85;
        
        if (score >= 90) {
            Console.WriteLine("Grade: A");
        } else if (score >= 80) {
            Console.WriteLine("Grade: B");
        } else if (score >= 70) {
            Console.WriteLine("Grade: C");
        } else {
            Console.WriteLine("Grade: F");
        }
    }
}`,
    },
    hints: [
      'Python uses elif for else-if, while most other languages use else if as two words.',
      'Remember that conditions must evaluate to boolean values (true or false).',
      'The else block is optional and executes only when all previous conditions fail.',
    ],
    commonErrors: {
      python: ['Forgetting colon after condition', 'Wrong indentation for code blocks'],
      cpp: ['Missing parentheses around condition', 'Using assignment (=) instead of comparison (==)'],
      javascript: ['Using assignment (=) instead of comparison (===)', 'Missing curly braces for multi-line blocks'],
      java: ['Missing parentheses or braces', 'Using = instead of =='],
      typescript: ['Same as JavaScript - type mismatches in conditions'],
      csharp: ['Missing parentheses around conditions', 'Using = instead of =='],
    },
    quiz: [
      {
        question: 'What happens when an if condition is false and there is no else block?',
        options: ['Program crashes', 'Code inside if executes anyway', 'Program skips the if block and continues', 'Compiler error'],
        correctAnswer: 2,
        explanation: 'When an if condition is false and no else block exists, the program simply skips the if block and continues executing the next statement.',
      },
    ],
    tryIt: 'Write a program that checks if a number is positive, negative, or zero, and prints the result.',
  },
];

// FUNCTION LESSONS
export const FUNCTION_LESSONS: LessonStructure[] = [
  {
    id: 'functions-basics',
    title: 'Functions - Reusable Code Blocks',
    category: 'intermediate',
    order: 15,
    duration: '15 min',
    xpReward: 25,
    conceptText: `Functions are the building blocks of organized code. Instead of writing the same logic repeatedly, you define it once in a function and call it whenever needed. This principle, called "Don't Repeat Yourself" or DRY, is fundamental to good programming.

Think of a function as a recipe. You write down the steps once, give the recipe a name, and then you can follow those steps whenever you want to make that dish. Similarly, a function packages a series of instructions under a single name that you can invoke anywhere in your program.

Functions accept inputs called parameters and can return outputs. When you call a function with specific values (called arguments), it processes those values and gives you back a result. This input-output model makes functions incredibly versatile. The same function can perform its task on different data each time it's called.

Different programming languages have different philosophies about functions. Python and JavaScript treat functions as first-class citizens that can be passed around like any other value. C++ embeds functions within the program structure with strict type requirements. Java wraps functions inside classes as methods. TypeScript adds type annotations to ensure functions receive and return the correct types. C# blends object-oriented and functional approaches.

The true power of functions emerges when you combine them. Complex programs are built by composing many small, focused functions. Each function does one thing well. Together, they create sophisticated behavior. This compositional approach makes code easier to understand, test, and modify.

Learning to write good functions means learning to think in abstractions. When you identify a pattern that repeats in your code, you extract it into a function. When you see a complex task, you break it down into smaller functions. This decomposition is the essence of software design.`,
    diagram: 'Function input-output diagram',
    codeExamples: {
      python: `# Python - Functions with def
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

def calculate_average(numbers):
    total = sum(numbers)
    return total / len(numbers)

# Calling functions
message = greet("Alice")
print(message)

result = add(5, 3)
print(f"Sum: {result}")

scores = [85, 90, 78, 92]
avg = calculate_average(scores)
print(f"Average: {avg}")`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Function declarations
string greet(string name) {
    return "Hello, " + name + "!";
}

int add(int a, int b) {
    return a + b;
}

double calculateAverage(vector<int> numbers) {
    int total = 0;
    for(int num : numbers) {
        total += num;
    }
    return (double)total / numbers.size();
}

int main() {
    // Calling functions
    string message = greet("Alice");
    cout << message << endl;
    
    int result = add(5, 3);
    cout << "Sum: " << result << endl;
    
    vector<int> scores = {85, 90, 78, 92};
    double avg = calculateAverage(scores);
    cout << "Average: " << avg << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Functions
function greet(name) {
    return \`Hello, \${name}!\`;
}

function add(a, b) {
    return a + b;
}

function calculateAverage(numbers) {
    const total = numbers.reduce((sum, num) => sum + num, 0);
    return total / numbers.length;
}

// Calling functions
let message = greet("Alice");
console.log(message);

let result = add(5, 3);
console.log(\`Sum: \${result}\`);

let scores = [85, 90, 78, 92];
let avg = calculateAverage(scores);
console.log(\`Average: \${avg}\`);`,
      java: `public class Main {
    // Method definitions
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static double calculateAverage(int[] numbers) {
        int total = 0;
        for(int num : numbers) {
            total += num;
        }
        return (double)total / numbers.length;
    }
    
    public static void main(String[] args) {
        // Calling methods
        String message = greet("Alice");
        System.out.println(message);
        
        int result = add(5, 3);
        System.out.println("Sum: " + result);
        
        int[] scores = {85, 90, 78, 92};
        double avg = calculateAverage(scores);
        System.out.println("Average: " + avg);
    }
}`,
      typescript: `// TypeScript - Functions with type annotations
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

function add(a: number, b: number): number {
    return a + b;
}

function calculateAverage(numbers: number[]): number {
    const total = numbers.reduce((sum, num) => sum + num, 0);
    return total / numbers.length;
}

// Calling functions
let message: string = greet("Alice");
console.log(message);

let result: number = add(5, 3);
console.log(\`Sum: \${result}\`);

let scores: number[] = [85, 90, 78, 92];
let avg: number = calculateAverage(scores);
console.log(\`Average: \${avg}\`);`,
      csharp: `using System;
using System.Linq;

class Program {
    // Method definitions
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static int Add(int a, int b) {
        return a + b;
    }
    
    static double CalculateAverage(int[] numbers) {
        return numbers.Average();
    }
    
    static void Main() {
        // Calling methods
        string message = Greet("Alice");
        Console.WriteLine(message);
        
        int result = Add(5, 3);
        Console.WriteLine($"Sum: {result}");
        
        int[] scores = {85, 90, 78, 92};
        double avg = CalculateAverage(scores);
        Console.WriteLine($"Average: {avg}");
    }
}`,
    },
    hints: [
      'Functions must be defined before they are called in most languages, though some allow forward declarations.',
      'The return keyword sends a value back to the caller and immediately exits the function.',
      'Functions without a return statement or with return type void do not send back a value.',
    ],
    commonErrors: {
      python: ['Forgetting to return a value', 'Calling function before defining it'],
      cpp: ['Forgetting return type', 'Missing semicolon after function declaration', 'Type mismatch in return value'],
      javascript: ['Using function before declaration in some contexts', 'Forgetting return statement'],
      java: ['Wrong return type', 'Methods must be inside a class', 'Missing static keyword'],
      typescript: ['Type mismatch between declared return type and actual return value', 'Incorrect parameter types'],
      csharp: ['Wrong return type declaration', 'Missing static keyword in Main class methods'],
    },
    quiz: [
      {
        question: 'What is the purpose of parameters in a function?',
        options: ['To make functions longer', 'To allow functions to accept inputs', 'To return multiple values', 'To make functions run faster'],
        correctAnswer: 1,
        explanation: 'Parameters allow functions to accept inputs (arguments) so the same function can work with different data.',
      },
    ],
    tryIt: 'Create a function that takes two numbers and returns the larger one.',
  },
];

// ARRAY LESSONS
export const ARRAY_LESSONS: LessonStructure[] = [
  {
    id: 'arrays-basics',
    title: 'Arrays - Collections of Data',
    category: 'intermediate',
    order: 20,
    duration: '15 min',
    xpReward: 25,
    conceptText: `Arrays solve a fundamental problem in programming: how do you store and work with multiple related values? Instead of creating separate variables for each item, arrays let you group them together under a single name. This organization is essential for handling real-world data.

Imagine you're building a gradebook application. You need to store test scores for thirty students. Without arrays, you would need thirty individual variables. With an array, you have one structure containing all scores. You can then easily perform operations like calculating the average or finding the highest score.

An array is an ordered collection where each element has a position called an index. Most programming languages start counting from zero, so the first element is at index zero, the second at index one, and so on. This zero-based indexing is a convention inherited from how memory addresses work in computer hardware.

Different languages provide different array capabilities and syntax. Python offers lists with dynamic sizing and built-in methods for manipulation. JavaScript arrays are incredibly flexible, functioning almost like hybrid array-objects. C++ provides both basic arrays and the powerful vector container from the Standard Template Library. Java has fixed-size arrays plus the ArrayList class for dynamic sizing. TypeScript adds type safety to JavaScript arrays, ensuring all elements are the correct type. C# offers arrays and the List collection class with extensive methods.

Working with arrays means understanding iteration. You rarely care about just one element. Usually, you want to process all elements or find specific ones that match criteria. Loops become your primary tool for traversing arrays, examining each element in turn and performing operations on them.

Arrays are the gateway to understanding data structures. Once you master basic arrays, you'll move on to multi-dimensional arrays for grids and matrices, linked lists for dynamic insertion, hash tables for fast lookup, and trees for hierarchical data. These advanced structures build on the fundamental concept of organizing multiple values together. Every data structure is ultimately about efficient storage and retrieval of collections.`,
    diagram: 'Array memory layout with indices',
    codeExamples: {
      python: `# Python - Lists (dynamic arrays)
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]

# Accessing elements
print(numbers[0])  # First element: 1
print(names[2])    # Third element: Charlie

# Modifying elements
numbers[0] = 10
print(numbers)     # [10, 2, 3, 4, 5]

# Array methods
numbers.append(6)  # Add to end
print(f"Length: {len(numbers)}")

# Looping through array
for name in names:
    print(f"Hello, {name}")`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // C++ - Using vector (dynamic array)
    vector<int> numbers = {1, 2, 3, 4, 5};
    vector<string> names = {"Alice", "Bob", "Charlie"};
    
    // Accessing elements
    cout << numbers[0] << endl;  // First: 1
    cout << names[2] << endl;    // Third: Charlie
    
    // Modifying elements
    numbers[0] = 10;
    
    // Vector methods
    numbers.push_back(6);  // Add to end
    cout << "Size: " << numbers.size() << endl;
    
    // Looping through vector
    for(string name : names) {
        cout << "Hello, " << name << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - Arrays
let numbers = [1, 2, 3, 4, 5];
let names = ["Alice", "Bob", "Charlie"];

// Accessing elements
console.log(numbers[0]);  // First: 1
console.log(names[2]);    // Third: Charlie

// Modifying elements
numbers[0] = 10;
console.log(numbers);     // [10, 2, 3, 4, 5]

// Array methods
numbers.push(6);  // Add to end
console.log(\`Length: \${numbers.length}\`);

// Looping through array
names.forEach(name => {
    console.log(\`Hello, \${name}\`);
});`,
      java: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Java - Using ArrayList (dynamic)
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        numbers.add(4);
        numbers.add(5);
        
        ArrayList<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        
        // Accessing elements
        System.out.println(numbers.get(0));  // First: 1
        System.out.println(names.get(2));    // Third: Charlie
        
        // Modifying elements
        numbers.set(0, 10);
        
        // ArrayList methods
        numbers.add(6);  // Add to end
        System.out.println("Size: " + numbers.size());
        
        // Looping through ArrayList
        for(String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}`,
      typescript: `// TypeScript - Typed arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Accessing elements
console.log(numbers[0]);  // First: 1
console.log(names[2]);    // Third: Charlie

// Modifying elements
numbers[0] = 10;
console.log(numbers);     // [10, 2, 3, 4, 5]

// Array methods
numbers.push(6);  // Add to end
console.log(\`Length: \${numbers.length}\`);

// Looping through array
names.forEach((name: string) => {
    console.log(\`Hello, \${name}\`);
});`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // C# - Using List (dynamic)
        List<int> numbers = new List<int> {1, 2, 3, 4, 5};
        List<string> names = new List<string> {"Alice", "Bob", "Charlie"};
        
        // Accessing elements
        Console.WriteLine(numbers[0]);  // First: 1
        Console.WriteLine(names[2]);    // Third: Charlie
        
        // Modifying elements
        numbers[0] = 10;
        
        // List methods
        numbers.Add(6);  // Add to end
        Console.WriteLine($"Count: {numbers.Count}");
        
        // Looping through List
        foreach(string name in names) {
            Console.WriteLine($"Hello, {name}");
        }
    }
}`,
    },
    hints: [
      'Array indices start at zero in all six languages, so the first element is always at position zero.',
      'Accessing an index that does not exist will cause an error or return undefined depending on the language.',
      'Dynamic arrays like Python lists and JavaScript arrays can grow in size, while some arrays have fixed sizes.',
    ],
    commonErrors: {
      python: ['Index out of range error', 'Forgetting arrays are mutable', 'Using wrong method names'],
      cpp: ['Accessing out of bounds index causes undefined behavior', 'Confusing size() vs capacity()'],
      javascript: ['Accessing undefined indices returns undefined not an error', 'Confusing array methods'],
      java: ['IndexOutOfBoundsException', 'Confusing array vs ArrayList syntax'],
      typescript: ['Type mismatches when adding elements', 'Forgetting array type annotations'],
      csharp: ['Index out of range', 'Confusing Count vs Length properties'],
    },
    quiz: [
      {
        question: 'What is the index of the first element in an array?',
        options: ['1', '0', '-1', 'Depends on language'],
        correctAnswer: 1,
        explanation: 'In all six languages covered, arrays use zero-based indexing, meaning the first element is at index 0.',
      },
    ],
    tryIt: 'Create an array of five favorite foods and print the third one using a loop.',
  },
];

// OOP LESSONS - Classes and Objects
export const OOP_LESSONS: LessonStructure[] = [
  {
    id: 'classes-objects',
    title: 'Classes and Objects - Building Your Own Types',
    category: 'advanced',
    order: 25,
    duration: '20 min',
    xpReward: 30,
    conceptText: `Object-Oriented Programming represents a fundamental shift in how we think about code organization. Instead of organizing programs around functions that manipulate data, OOP organizes programs around objects that combine data and the functions that operate on that data. This paradigm has dominated software development for decades.

A class is a blueprint or template for creating objects. Think of a class like an architectural blueprint for a house. The blueprint specifies what rooms the house will have, where the doors and windows go, and how everything connects. But the blueprint itself is not a house. You use the blueprint to build actual houses, each one an independent structure that follows the same design.

Objects are instances of classes. When you create an object from a class, you're instantiating that class. Each object has its own copy of the data defined in the class, but shares the methods. If your Person class has properties for name and age, each Person object you create will have its own name and age values.

The power of classes emerges from encapsulation. Instead of scattered variables and functions throughout your code, you group related data and behavior together. A Car class contains both the car's properties like color and speed, and the methods like accelerate and brake. This organization mirrors how we naturally think about real-world objects.

Different languages implement classes with varying philosophies. Python offers a flexible, dynamic approach where you can add properties to objects at runtime. C++ provides low-level control with manual memory management and multiple inheritance. Java enforces strict class-based structure where everything must live inside a class. JavaScript uses prototype-based inheritance but now supports class syntax. TypeScript adds static type checking to JavaScript's classes. C# provides modern features like properties and LINQ while maintaining strong typing.

Learning OOP means learning to think in terms of objects and their relationships. You identify the nouns in your problem domain and model them as classes. You determine what data each object needs to track and what actions it should perform. This object-oriented thinking becomes a powerful tool for managing complexity in large software systems.`,
    diagram: 'Class blueprint vs object instances diagram',
    codeExamples: {
      python: `# Python - Classes and Objects
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old"
    
    def have_birthday(self):
        self.age += 1
        return f"{self.name} is now {self.age}!"

# Creating objects
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

# Using objects
print(person1.introduce())
print(person2.introduce())
person1.have_birthday()
print(person1.age)  # 26`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// Class definition
class Person {
private:
    string name;
    int age;

public:
    // Constructor
    Person(string n, int a) {
        name = n;
        age = a;
    }
    
    // Methods
    string introduce() {
        return "Hi, I'm " + name + " and I'm " + to_string(age) + " years old";
    }
    
    string haveBirthday() {
        age++;
        return name + " is now " + to_string(age) + "!";
    }
    
    int getAge() {
        return age;
    }
};

int main() {
    // Creating objects
    Person person1("Alice", 25);
    Person person2("Bob", 30);
    
    // Using objects
    cout << person1.introduce() << endl;
    cout << person2.introduce() << endl;
    person1.haveBirthday();
    cout << person1.getAge() << endl;  // 26
    
    return 0;
}`,
      javascript: `// JavaScript - Classes and Objects
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
    }
    
    haveBirthday() {
        this.age++;
        return \`\${this.name} is now \${this.age}!\`;
    }
}

// Creating objects
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

// Using objects
console.log(person1.introduce());
console.log(person2.introduce());
person1.haveBirthday();
console.log(person1.age);  // 26`,
      java: `// Java - Classes and Objects
public class Main {
    public static void main(String[] args) {
        // Creating objects
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);
        
        // Using objects
        System.out.println(person1.introduce());
        System.out.println(person2.introduce());
        person1.haveBirthday();
        System.out.println(person1.getAge());  // 26
    }
}

class Person {
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public String introduce() {
        return "Hi, I'm " + name + " and I'm " + age + " years old";
    }
    
    public String haveBirthday() {
        age++;
        return name + " is now " + age + "!";
    }
    
    public int getAge() {
        return age;
    }
}`,
      typescript: `// TypeScript - Classes and Objects with types
class Person {
    private name: string;
    private age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    introduce(): string {
        return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
    }
    
    haveBirthday(): string {
        this.age++;
        return \`\${this.name} is now \${this.age}!\`;
    }
    
    getAge(): number {
        return this.age;
    }
}

// Creating objects
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

// Using objects
console.log(person1.introduce());
console.log(person2.introduce());
person1.haveBirthday();
console.log(person1.getAge());  // 26`,
      csharp: `using System;

// C# - Classes and Objects with Properties
class Person {
    private string name;
    private int age;
    
    // Constructor
    public Person(string name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public string Introduce() {
        return $"Hi, I'm {name} and I'm {age} years old";
    }
    
    public string HaveBirthday() {
        age++;
        return $"{name} is now {age}!";
    }
    
    // Property (C# feature)
    public int Age {
        get { return age; }
    }
}

class Program {
    static void Main() {
        // Creating objects
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);
        
        // Using objects
        Console.WriteLine(person1.Introduce());
        Console.WriteLine(person2.Introduce());
        person1.HaveBirthday();
        Console.WriteLine(person1.Age);  // 26
    }
}`,
    },
    hints: [
      'The constructor is a special method that runs automatically when you create a new object.',
      'Private variables can only be accessed within the class, while public methods can be called from outside.',
      'Each object created from a class has its own independent copy of the data but shares the methods.',
    ],
    commonErrors: {
      python: ['Forgetting self parameter in methods', 'Not calling __init__ with proper arguments', 'Accessing nonexistent attributes'],
      cpp: ['Forgetting semicolon after class definition', 'Not defining constructor', 'Memory leaks with dynamic objects'],
      javascript: ['Forgetting new keyword when creating objects', 'Incorrect this binding', 'Missing constructor'],
      java: ['Wrong access modifiers', 'Forgetting to instantiate with new', 'Class name must match filename'],
      typescript: ['Type mismatches in constructor', 'Incorrect access modifier usage', 'Missing type annotations'],
      csharp: ['Wrong capitalization (C# uses PascalCase for methods)', 'Forgetting access modifiers', 'Property syntax confusion'],
    },
    quiz: [
      {
        question: 'What is the difference between a class and an object?',
        options: ['They are the same thing', 'A class is a blueprint, an object is an instance', 'An object is a blueprint, a class is an instance', 'Objects contain classes'],
        correctAnswer: 1,
        explanation: 'A class is a blueprint or template that defines the structure and behavior. An object is a specific instance created from that class with actual data.',
      },
      {
        question: 'What is a constructor?',
        options: ['A method to destroy objects', 'A method that runs when an object is created', 'A method that returns the class name', 'A variable inside a class'],
        correctAnswer: 1,
        explanation: 'A constructor is a special method that automatically runs when you create a new object. It typically initializes the object\'s data.',
      },
    ],
    tryIt: 'Create a Car class with properties for brand and speed, and methods to accelerate and brake.',
  },
  {
    id: 'inheritance',
    title: 'Inheritance - Building on Existing Classes',
    category: 'advanced',
    order: 30,
    duration: '20 min',
    xpReward: 30,
    conceptText: `Inheritance is one of the fundamental pillars of object-oriented programming. It allows you to create new classes based on existing ones, inheriting their properties and methods while adding new functionality or modifying existing behavior. This mechanism promotes code reuse and establishes hierarchical relationships between classes.

Think of inheritance like family relationships. A child inherits traits from their parents but also develops unique characteristics. In programming, when class B inherits from class A, we say B is a subclass or derived class, and A is the superclass or base class. The subclass automatically receives all the public and protected members of the superclass.

The power of inheritance lies in specialization. You can define general behavior in a base class and create specialized versions through subclasses. For example, you might have a base Animal class with common properties like age and methods like eat. Then you create Dog and Cat subclasses that inherit from Animal but add their own unique methods like bark or meow.

Inheritance supports the principle of code reuse. When multiple classes share common functionality, you extract that commonality into a base class. Changes to the base class automatically propagate to all subclasses. This reduces duplication and makes maintenance easier. If you fix a bug in the base class method, all derived classes benefit from the fix.

Different languages handle inheritance differently. Python supports multiple inheritance where a class can inherit from multiple base classes. C++ also allows multiple inheritance with complex rules. Java and C# restrict classes to single inheritance from one base class but allow implementing multiple interfaces. JavaScript uses prototype-based inheritance, though modern JavaScript supports class syntax. TypeScript adds type checking to JavaScript's inheritance model.

Understanding inheritance means understanding the "is-a" relationship. A Dog is an Animal. A Student is a Person. When this relationship holds true, inheritance is appropriate. When it doesn't hold, composition might be better. Not every code reuse situation calls for inheritance. Sometimes having an object as a property is clearer than inheriting from it.`,
    diagram: 'Inheritance tree diagram showing base class and derived classes',
    codeExamples: {
      python: `# Python - Inheritance
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def eat(self):
        return f"{self.name} is eating"
    
    def sleep(self):
        return f"{self.name} is sleeping"

# Dog inherits from Animal
class Dog(Animal):
    def bark(self):
        return f"{self.name} says Woof!"
    
    def fetch(self):
        return f"{self.name} is fetching the ball"

# Cat inherits from Animal
class Cat(Animal):
    def meow(self):
        return f"{self.name} says Meow!"

# Using inheritance
dog = Dog("Buddy", 3)
print(dog.eat())      # Inherited method
print(dog.bark())     # Dog-specific method

cat = Cat("Whiskers", 2)
print(cat.eat())      # Inherited method
print(cat.meow())     # Cat-specific method`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
    int age;

public:
    Animal(string n, int a) : name(n), age(a) {}
    
    string eat() {
        return name + " is eating";
    }
    
    string sleep() {
        return name + " is sleeping";
    }
};

// Derived class
class Dog : public Animal {
public:
    Dog(string n, int a) : Animal(n, a) {}
    
    string bark() {
        return name + " says Woof!";
    }
    
    string fetch() {
        return name + " is fetching the ball";
    }
};

// Another derived class
class Cat : public Animal {
public:
    Cat(string n, int a) : Animal(n, a) {}
    
    string meow() {
        return name + " says Meow!";
    }
};

int main() {
    Dog dog("Buddy", 3);
    cout << dog.eat() << endl;    // Inherited
    cout << dog.bark() << endl;   // Dog-specific
    
    Cat cat("Whiskers", 2);
    cout << cat.eat() << endl;    // Inherited
    cout << cat.meow() << endl;   // Cat-specific
    
    return 0;
}`,
      javascript: `// JavaScript - Inheritance with extends
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    eat() {
        return \`\${this.name} is eating\`;
    }
    
    sleep() {
        return \`\${this.name} is sleeping\`;
    }
}

// Dog extends Animal
class Dog extends Animal {
    bark() {
        return \`\${this.name} says Woof!\`;
    }
    
    fetch() {
        return \`\${this.name} is fetching the ball\`;
    }
}

// Cat extends Animal
class Cat extends Animal {
    meow() {
        return \`\${this.name} says Meow!\`;
    }
}

// Using inheritance
const dog = new Dog("Buddy", 3);
console.log(dog.eat());     // Inherited
console.log(dog.bark());    // Dog-specific

const cat = new Cat("Whiskers", 2);
console.log(cat.eat());     // Inherited
console.log(cat.meow());    // Cat-specific`,
      java: `// Java - Inheritance with extends
class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String eat() {
        return name + " is eating";
    }
    
    public String sleep() {
        return name + " is sleeping";
    }
}

class Dog extends Animal {
    public Dog(String name, int age) {
        super(name, age);  // Call parent constructor
    }
    
    public String bark() {
        return name + " says Woof!";
    }
    
    public String fetch() {
        return name + " is fetching the ball";
    }
}

class Cat extends Animal {
    public Cat(String name, int age) {
        super(name, age);
    }
    
    public String meow() {
        return name + " says Meow!";
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3);
        System.out.println(dog.eat());    // Inherited
        System.out.println(dog.bark());   // Dog-specific
        
        Cat cat = new Cat("Whiskers", 2);
        System.out.println(cat.eat());    // Inherited
        System.out.println(cat.meow());   // Cat-specific
    }
}`,
      typescript: `// TypeScript - Inheritance with type safety
class Animal {
    protected name: string;
    protected age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    eat(): string {
        return \`\${this.name} is eating\`;
    }
    
    sleep(): string {
        return \`\${this.name} is sleeping\`;
    }
}

class Dog extends Animal {
    bark(): string {
        return \`\${this.name} says Woof!\`;
    }
    
    fetch(): string {
        return \`\${this.name} is fetching the ball\`;
    }
}

class Cat extends Animal {
    meow(): string {
        return \`\${this.name} says Meow!\`;
    }
}

// Using inheritance
const dog = new Dog("Buddy", 3);
console.log(dog.eat());     // Inherited
console.log(dog.bark());    // Dog-specific

const cat = new Cat("Whiskers", 2);
console.log(cat.eat());     // Inherited
console.log(cat.meow());    // Cat-specific`,
      csharp: `using System;

// C# - Inheritance
class Animal {
    protected string name;
    protected int age;
    
    public Animal(string name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public string Eat() {
        return $"{name} is eating";
    }
    
    public string Sleep() {
        return $"{name} is sleeping";
    }
}

class Dog : Animal {
    public Dog(string name, int age) : base(name, age) {
    }
    
    public string Bark() {
        return $"{name} says Woof!";
    }
    
    public string Fetch() {
        return $"{name} is fetching the ball";
    }
}

class Cat : Animal {
    public Cat(string name, int age) : base(name, age) {
    }
    
    public string Meow() {
        return $"{name} says Meow!";
    }
}

class Program {
    static void Main() {
        Dog dog = new Dog("Buddy", 3);
        Console.WriteLine(dog.Eat());    // Inherited
        Console.WriteLine(dog.Bark());   // Dog-specific
        
        Cat cat = new Cat("Whiskers", 2);
        Console.WriteLine(cat.Eat());    // Inherited
        Console.WriteLine(cat.Meow());   // Cat-specific
    }
}`,
    },
    hints: [
      'The super or base keyword is used to call the parent class constructor from the child class.',
      'Protected members are accessible in the class and its subclasses, but not from outside.',
      'Subclasses inherit all public and protected members but not private ones.',
    ],
    commonErrors: {
      python: ['Forgetting to call parent constructor with super()', 'Trying to access private variables from parent'],
      cpp: ['Forgetting public inheritance keyword', 'Not calling base constructor', 'Protected vs private confusion'],
      javascript: ['Forgetting to call super() in constructor', 'Incorrect method overriding'],
      java: ['Forgetting super() call in constructor', 'Wrong access modifier prevents inheritance'],
      typescript: ['Type mismatches in inherited properties', 'Forgetting super() in constructor'],
      csharp: ['Forgetting base() call', 'Using wrong access modifiers', 'Circular inheritance'],
    },
    quiz: [
      {
        question: 'What does a subclass inherit from its superclass?',
        options: ['Only public methods', 'Only private members', 'Public and protected members', 'Nothing automatically'],
        correctAnswer: 2,
        explanation: 'A subclass inherits all public and protected members from its superclass. Private members exist but cannot be directly accessed by the subclass.',
      },
    ],
    tryIt: 'Create a Vehicle base class and Car and Motorcycle subclasses that inherit from it with their own unique methods.',
  },
];

// WEB DEVELOPMENT LESSONS - JavaScript & TypeScript Specific
export const WEB_LESSONS: LessonStructure[] = [
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation - Controlling Web Pages',
    category: 'language-specific',
    order: 40,
    duration: '18 min',
    xpReward: 35,
    conceptText: `The Document Object Model, or DOM, is the bridge between your JavaScript code and the HTML that browsers display. When a web page loads, the browser parses the HTML and creates a tree-like structure representing every element on the page. This structure is the DOM, and JavaScript can read and modify it to create dynamic, interactive web experiences.

Think of the DOM as a living blueprint of your web page. Every HTML tag becomes a node in this tree. The document itself is the root. Inside it, you have the html element, which contains head and body elements, which contain their own children. JavaScript can traverse this tree, find specific elements, and manipulate them in real time.

The getElementById method is your primary tool for accessing elements. You give an element an id attribute in your HTML, then use that id to grab a reference to the element in JavaScript. Once you have that reference, you can change its text content with innerHTML or textContent, modify its styling with the style property, or add event listeners to respond to user interactions.

Event listeners are how you make web pages interactive. Instead of code that runs once and stops, you attach functions to events like clicks, key presses, or mouse movements. When the user performs that action, your function executes. This event-driven programming model is fundamental to web development. Your code sits idle, waiting for user input, then springs into action when needed.

JavaScript and TypeScript share the same DOM API, but TypeScript adds type safety. When you call getElementById in TypeScript, you can specify what type of element you expect to receive. If you try to access properties that don't exist on that element type, TypeScript catches the error before your code runs. This prevents entire categories of runtime errors.

Modern web development often involves frameworks like React or Vue that abstract away direct DOM manipulation. But understanding the DOM is essential. These frameworks ultimately manipulate the DOM themselves. When you understand what happens under the hood, you can debug problems, optimize performance, and choose the right tool for each task.`,
    diagram: 'DOM tree structure showing html, head, body hierarchy',
    codeExamples: {
      python: `# Python - Not applicable for web DOM
# Python runs on the server, not in the browser
# Use frameworks like Flask or Django to generate HTML
# that JavaScript will then manipulate in the browser

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <html>
        <body>
            <h1 id="title">Hello from Python!</h1>
            <script>
                // This JavaScript runs in the browser
                document.getElementById('title').style.color = 'blue';
            </script>
        </body>
    </html>
    '''`,
      cpp: `// C++ - Not applicable for web DOM
// C++ runs natively, not in browsers
// Use C++ for backend servers or WebAssembly

// Example: C++ backend serving HTML with DOM manipulation
#include <iostream>
#include <string>

int main() {
    std::string html = R"(
        <html>
            <body>
                <h1 id="title">Hello from C++!</h1>
                <script>
                    document.getElementById('title').style.color = 'blue';
                </script>
            </body>
        </html>
    )";
    
    std::cout << html << std::endl;
    return 0;
}`,
      javascript: `// JavaScript - Direct DOM Manipulation
// Get element by ID
const title = document.getElementById('title');
title.innerHTML = 'Welcome to JavaScript!';
title.style.color = 'blue';
title.style.fontSize = '24px';

// Get elements by class name
const buttons = document.getElementsByClassName('btn');
for(let btn of buttons) {
    btn.style.backgroundColor = 'green';
}

// Query selector (modern approach)
const header = document.querySelector('.header');
header.textContent = 'New Header Text';

// Add event listener
const button = document.getElementById('myButton');
button.addEventListener('click', function() {
    alert('Button clicked!');
    button.style.backgroundColor = 'red';
});

// Create new elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Dynamically created!';
document.body.appendChild(newDiv);`,
      java: `// Java - Not applicable for web DOM
// Java runs on the JVM, not in browsers
// Use Java for backend with frameworks like Spring

import javax.servlet.http.*;
import java.io.PrintWriter;

public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, 
                         HttpServletResponse response) {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<html><body>");
        out.println("<h1 id='title'>Hello from Java!</h1>");
        out.println("<script>");
        out.println("document.getElementById('title').style.color = 'blue';");
        out.println("</script>");
        out.println("</body></html>");
    }
}`,
      typescript: `// TypeScript - Type-Safe DOM Manipulation
// Get element with type assertion
const title = document.getElementById('title') as HTMLHeadingElement;
title.innerHTML = 'Welcome to TypeScript!';
title.style.color = 'blue';
title.style.fontSize = '24px';

// Type-safe element query
const button = document.getElementById('myButton') as HTMLButtonElement;
if (button) {
    button.addEventListener('click', (event: MouseEvent) => {
        alert('Button clicked!');
        button.style.backgroundColor = 'red';
    });
}

// Query selector with type
const header = document.querySelector<HTMLElement>('.header');
if (header) {
    header.textContent = 'New Header Text';
}

// Create typed elements
const newDiv: HTMLDivElement = document.createElement('div');
newDiv.textContent = 'Dynamically created!';
newDiv.className = 'generated';
document.body.appendChild(newDiv);`,
      csharp: `// C# - Not applicable for web DOM
// C# runs on .NET runtime, not in browsers
// Use C# with ASP.NET or Blazor for web

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller {
    public IActionResult Index() {
        return Content(@"
            <html>
                <body>
                    <h1 id='title'>Hello from C#!</h1>
                    <script>
                        document.getElementById('title').style.color = 'blue';
                    </script>
                </body>
            </html>
        ", "text/html");
    }
}

// Note: Blazor allows C# to run in browser via WebAssembly`,
    },
    hints: [
      'getElementById returns null if no element with that ID exists, so always check before using the element.',
      'innerHTML can execute scripts if you insert user input, creating security risks. Use textContent for plain text.',
      'TypeScript requires type assertions or null checks when working with DOM elements for type safety.',
    ],
    commonErrors: {
      python: ['Confusing server-side Python with client-side JavaScript', 'Trying to use DOM APIs in Python code'],
      cpp: ['Attempting to manipulate DOM from C++', 'Confusing server code with browser code'],
      javascript: ['Forgetting to check if element exists before accessing', 'Running script before DOM is loaded', 'Using innerHTML with user input (XSS vulnerability)'],
      java: ['Mixing server-side Java with client-side JavaScript', 'Trying to access DOM from Java code'],
      typescript: ['Not handling null return values from getElementById', 'Missing type assertions for specific element types', 'Forgetting to check if element exists'],
      csharp: ['Confusing C# backend with JavaScript frontend', 'Trying to manipulate DOM directly from C#'],
    },
    quiz: [
      {
        question: 'Which languages can directly manipulate the browser DOM?',
        options: ['All six languages', 'Only JavaScript and TypeScript', 'Only Python and JavaScript', 'Only C++ and Java'],
        correctAnswer: 1,
        explanation: 'Only JavaScript and TypeScript run directly in web browsers and can manipulate the DOM. Other languages run on servers and generate HTML for browsers.',
      },
      {
        question: 'What method gets an element by its ID attribute?',
        options: ['getElementByClass', 'getElementById', 'querySelector', 'findElement'],
        correctAnswer: 1,
        explanation: 'getElementById is the standard method to retrieve an element using its id attribute.',
      },
    ],
    tryIt: 'Create an HTML button with an ID, then use JavaScript to change its text when clicked.',
  },
  {
    id: 'async-programming',
    title: 'Async Programming - Handling Delays',
    category: 'language-specific',
    order: 45,
    duration: '22 min',
    xpReward: 40,
    conceptText: `Asynchronous programming is one of the most important concepts in modern JavaScript and TypeScript development. When you make a network request, read a file, or query a database, these operations take time. If your code waited for each operation to complete before moving to the next line, your application would freeze. Async programming solves this problem by allowing operations to run in the background while your code continues executing.

Think about ordering food at a restaurant. You place your order and receive a number. You don't stand at the counter waiting. You sit down, check your phone, and chat with friends. When your order is ready, the restaurant calls your number. Asynchronous programming works the same way. You initiate an operation, continue with other tasks, and handle the result when it arrives.

JavaScript originally handled async operations with callbacks. You pass a function that executes when the operation completes. This worked but led to "callback hell" when multiple async operations needed to happen in sequence. Callbacks nested inside callbacks created pyramids of code that were difficult to read and maintain.

Promises were introduced to solve callback hell. A Promise represents a value that will be available in the future. It has three states: pending, fulfilled, or rejected. You attach handlers with then for success and catch for errors. Promises can be chained, making sequential async operations readable. If any step fails, the error propagates to the nearest catch handler.

The async/await syntax provides an even cleaner way to work with Promises. You mark a function as async, which allows you to use the await keyword inside it. When you await a Promise, execution pauses until the Promise resolves, but your code looks like synchronous code. This makes async logic much easier to understand and debug.

TypeScript enhances async programming with type safety. You can specify the type of data a Promise will resolve to. TypeScript checks that you handle Promises correctly and don't treat async values as if they were immediately available. This prevents common bugs where developers forget to await a Promise and try to use its value before it resolves.`,
    diagram: 'Timeline showing async operations running in parallel with code execution',
    codeExamples: {
      python: `# Python - Async with asyncio
import asyncio
import aiohttp

# Async function with async/await
async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

# Multiple async operations
async def main():
    print("Starting fetch...")
    
    # Await one operation
    data = await fetch_data('https://api.example.com/data')
    print(f"Received: {data[:50]}")
    
    # Run multiple operations in parallel
    results = await asyncio.gather(
        fetch_data('https://api.example.com/users'),
        fetch_data('https://api.example.com/posts'),
        fetch_data('https://api.example.com/comments')
    )
    
    print(f"Fetched {len(results)} resources")

# Run async code
asyncio.run(main())`,
      cpp: `// C++ - Async with std::async and futures
#include <iostream>
#include <future>
#include <thread>
#include <chrono>

using namespace std;

// Simulate async operation
int fetchData(string url) {
    this_thread::sleep_for(chrono::seconds(2));
    cout << "Fetched from: " << url << endl;
    return 42;
}

int main() {
    cout << "Starting async operations..." << endl;
    
    // Launch async operation
    future<int> result = async(launch::async, fetchData, 
                                "https://api.example.com");
    
    // Do other work while waiting
    cout << "Doing other work..." << endl;
    
    // Get result (blocks until ready)
    int data = result.get();
    cout << "Result: " << data << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Promises and Async/Await

// Using Promises
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log('Received:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Using async/await (cleaner)
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log('Received:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Multiple async operations in parallel
async function fetchMultiple() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetch('https://api.example.com/users').then(r => r.json()),
            fetch('https://api.example.com/posts').then(r => r.json()),
            fetch('https://api.example.com/comments').then(r => r.json())
        ]);
        
        console.log('Fetched all data:', users.length, posts.length);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();`,
      java: `// Java - Async with CompletableFuture
import java.util.concurrent.CompletableFuture;
import java.net.http.*;
import java.net.URI;

public class Main {
    // Async HTTP request
    public static CompletableFuture<String> fetchData(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .build();
        
        return client.sendAsync(request, 
                               HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body);
    }
    
    public static void main(String[] args) {
        System.out.println("Starting fetch...");
        
        // Async operation with callback
        fetchData("https://api.example.com/data")
            .thenAccept(data -> {
                System.out.println("Received: " + data.substring(0, 50));
            })
            .exceptionally(error -> {
                System.err.println("Error: " + error.getMessage());
                return null;
            });
        
        // Multiple async operations
        CompletableFuture<String> users = fetchData("https://api.example.com/users");
        CompletableFuture<String> posts = fetchData("https://api.example.com/posts");
        
        CompletableFuture.allOf(users, posts)
            .thenRun(() -> {
                System.out.println("All requests completed");
            });
    }
}`,
      typescript: `// TypeScript - Type-Safe Async/Await

// Define response type
interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiResponse<T> {
    data: T;
    status: string;
}

// Async function with typed return
async function fetchUser(id: number): Promise<User> {
    try {
        const response = await fetch(\`https://api.example.com/users/\${id}\`);
        const data: ApiResponse<User> = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Multiple async operations with types
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
    try {
        const promises: Promise<User>[] = ids.map(id => fetchUser(id));
        const users: User[] = await Promise.all(promises);
        return users;
    } catch (error) {
        console.error('Error fetching multiple users:', error);
        return [];
    }
}

// Using the typed async functions
async function main(): Promise<void> {
    const user = await fetchUser(1);
    console.log(\`User: \${user.name}\`);
    
    const users = await fetchMultipleUsers([1, 2, 3]);
    console.log(\`Fetched \${users.length} users\`);
}

main();`,
      csharp: `// C# - Async/Await with Task
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
    // Async method returning Task
    static async Task<string> FetchDataAsync(string url) {
        using (HttpClient client = new HttpClient()) {
            try {
                string result = await client.GetStringAsync(url);
                return result;
            } catch (Exception ex) {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
    }
    
    // Multiple async operations
    static async Task Main() {
        Console.WriteLine("Starting fetch...");
        
        // Await one operation
        string data = await FetchDataAsync("https://api.example.com/data");
        Console.WriteLine($"Received: {data.Substring(0, 50)}");
        
        // Run multiple operations in parallel
        Task<string> task1 = FetchDataAsync("https://api.example.com/users");
        Task<string> task2 = FetchDataAsync("https://api.example.com/posts");
        
        await Task.WhenAll(task1, task2);
        
        Console.WriteLine("All requests completed");
    }
}`,
    },
    hints: [
      'Always use await when calling async functions, or you will receive a Promise instead of the actual value.',
      'Async functions automatically return Promises, even if you return a regular value inside them.',
      'Use Promise.all to run multiple async operations in parallel instead of awaiting them one by one.',
    ],
    commonErrors: {
      python: ['Forgetting to use await with async functions', 'Not using asyncio.run() to start async code', 'Mixing sync and async code incorrectly'],
      cpp: ['Not calling .get() on futures', 'Deadlocks from incorrect future handling', 'Forgetting to check if future is ready'],
      javascript: ['Forgetting await and treating Promise as the resolved value', 'Not handling errors with try/catch in async functions', 'Creating accidental infinite loops with async recursion'],
      java: ['Not handling CompletableFuture correctly', 'Blocking the main thread waiting for async results', 'Missing exception handling'],
      typescript: ['Type mismatches in Promise return types', 'Forgetting await and using Promise type instead of resolved type', 'Not properly typing async function parameters'],
      csharp: ['Using Task.Result instead of await (can cause deadlocks)', 'Not making method async when using await', 'Forgetting to return Task from async methods'],
    },
    quiz: [
      {
        question: 'What does the await keyword do?',
        options: ['Stops all code execution', 'Pauses async function until Promise resolves', 'Makes code run faster', 'Creates a new Promise'],
        correctAnswer: 1,
        explanation: 'The await keyword pauses execution of the async function until the Promise resolves, then returns the resolved value.',
      },
      {
        question: 'How do you run multiple async operations in parallel?',
        options: ['Call them with await one after another', 'Use Promise.all with an array', 'Use setTimeout', 'You cannot run them in parallel'],
        correctAnswer: 1,
        explanation: 'Promise.all accepts an array of Promises and waits for all of them to complete in parallel.',
      },
    ],
    tryIt: 'Create an async function that simulates a 2-second delay using setTimeout wrapped in a Promise, then await it.',
  },
  {
    id: 'typescript-types',
    title: 'TypeScript Types - Safety Through Types',
    category: 'language-specific',
    order: 50,
    duration: '20 min',
    xpReward: 40,
    conceptText: `TypeScript is JavaScript with types. While JavaScript is dynamically typed and allows variables to hold any value, TypeScript adds optional static typing. You can declare what type of data a variable should hold, and TypeScript checks at compile time that your code respects those declarations. This catches entire categories of bugs before your code runs.

Consider a function that calculates the area of a rectangle. In JavaScript, someone could accidentally pass strings instead of numbers, causing the multiplication to produce unexpected results or NaN. In TypeScript, you declare the parameters as numbers. If anyone tries to pass strings, TypeScript flags the error immediately in your editor, before you even save the file.

TypeScript's type system goes far beyond simple types like number, string, and boolean. Interfaces let you define the shape of objects, specifying what properties they must have and what types those properties should be. This is invaluable when working with API responses or complex data structures. You define the interface once, and TypeScript ensures that object matches everywhere it's used.

Generics are TypeScript's way of writing reusable code that works with multiple types while maintaining type safety. A generic function can operate on arrays of numbers, arrays of strings, or arrays of any type, but TypeScript tracks what specific type you're using in each call. This gives you the flexibility of dynamic typing with the safety of static typing.

Union types allow a value to be one of several types. A variable might be a string or null. A function might return a User object or an Error. TypeScript tracks which type you're currently working with and ensures you handle all cases. This eliminates bugs where you forget to check if a value might be null or undefined.

Type inference means you don't always have to write types explicitly. TypeScript is smart enough to figure out types from context. When you write const x = 5, TypeScript knows x is a number. When you return a string from a function, TypeScript knows the function's return type is string. You get type safety without verbose type annotations everywhere.`,
    diagram: 'Split screen: JavaScript bug vs TypeScript catching it with red underline',
    codeExamples: {
      python: `# Python - Dynamic typing with optional type hints
from typing import List, Dict, Optional, Union

# Type hints (not enforced at runtime)
def greet(name: str) -> str:
    return f"Hello, {name}"

def calculate_area(width: float, height: float) -> float:
    return width * height

# Generic types with List
def get_first(items: List[int]) -> Optional[int]:
    return items[0] if items else None

# Union types
def process_id(id: Union[int, str]) -> str:
    return f"ID: {id}"

# Dictionary with typed keys/values
user: Dict[str, Union[str, int]] = {
    "name": "Alice",
    "age": 25
}

# Type hints help IDE but don't prevent errors
result = greet(123)  # Works at runtime but type checker warns`,
      cpp: `// C++ - Strong static typing
#include <iostream>
#include <string>
#include <vector>
#include <optional>
using namespace std;

// Strongly typed function
string greet(string name) {
    return "Hello, " + name;
}

double calculateArea(double width, double height) {
    return width * height;
}

// Templates (similar to TypeScript generics)
template<typename T>
optional<T> getFirst(vector<T> items) {
    if (items.empty()) return nullopt;
    return items[0];
}

// Type safety enforced at compile time
int main() {
    string message = greet("Alice");
    
    // This would cause compile error:
    // string message = greet(123);
    
    double area = calculateArea(5.0, 10.0);
    
    vector<int> numbers = {1, 2, 3};
    optional<int> first = getFirst(numbers);
    
    return 0;
}`,
      javascript: `// JavaScript - Dynamic typing (no compile-time checks)

function greet(name) {
    return \`Hello, \${name}\`;
}

function calculateArea(width, height) {
    return width * height;
}

function getFirst(items) {
    return items[0];
}

// No type checking - these all work but might cause bugs
let message = greet("Alice");
let buggyMessage = greet(123);  // No error, returns "Hello, 123"

let area = calculateArea(5, 10);  // 50
let buggyArea = calculateArea("5", "10");  // "510" - string concatenation!

let user = {
    name: "Alice",
    age: 25
};

// Typo in property name - no error until runtime
console.log(user.naem);  // undefined, no error`,
      java: `// Java - Strong static typing
import java.util.*;

public class Main {
    // Strongly typed methods
    public static String greet(String name) {
        return "Hello, " + name;
    }
    
    public static double calculateArea(double width, double height) {
        return width * height;
    }
    
    // Generics (similar to TypeScript)
    public static <T> Optional<T> getFirst(List<T> items) {
        return items.isEmpty() ? Optional.empty() : Optional.of(items.get(0));
    }
    
    public static void main(String[] args) {
        String message = greet("Alice");
        
        // Compile error - type mismatch:
        // String message = greet(123);
        
        double area = calculateArea(5.0, 10.0);
        
        List<Integer> numbers = Arrays.asList(1, 2, 3);
        Optional<Integer> first = getFirst(numbers);
        
        // Type safety enforced at compile time
    }
}`,
      typescript: `// TypeScript - Static typing for JavaScript

// Basic types
function greet(name: string): string {
    return \`Hello, \${name}\`;
}

function calculateArea(width: number, height: number): number {
    return width * height;
}

// TypeScript catches errors at compile time
let message: string = greet("Alice");
// Error: Argument of type 'number' is not assignable to parameter of type 'string'
// let buggyMessage = greet(123);

let area: number = calculateArea(5, 10);
// Error: Argument of type 'string' is not assignable to parameter of type 'number'
// let buggyArea = calculateArea("5", "10");

// Interface for object shape
interface User {
    name: string;
    age: number;
    email?: string;  // Optional property
}

let user: User = {
    name: "Alice",
    age: 25
};

// Error: Property 'naem' does not exist on type 'User'
// console.log(user.naem);

// Generics
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

let numbers: number[] = [1, 2, 3];
let first: number | undefined = getFirst(numbers);

let names: string[] = ["Alice", "Bob"];
let firstName: string | undefined = getFirst(names);

// Union types
function processId(id: string | number): string {
    return \`ID: \${id}\`;
}

processId(123);    // OK
processId("abc");  // OK
// processId(true); // Error: Argument of type 'boolean' is not assignable

// Type aliases
type Status = "pending" | "approved" | "rejected";

function updateStatus(status: Status): void {
    console.log(\`Status: \${status}\`);
}

updateStatus("approved");  // OK
// updateStatus("invalid");  // Error: not one of the allowed values`,
      csharp: `// C# - Strong static typing with modern features
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    // Strongly typed methods
    static string Greet(string name) {
        return $"Hello, {name}";
    }
    
    static double CalculateArea(double width, double height) {
        return width * height;
    }
    
    // Generics
    static T? GetFirst<T>(List<T> items) {
        return items.Count > 0 ? items[0] : default(T);
    }
    
    static void Main() {
        string message = Greet("Alice");
        
        // Compile error - type mismatch:
        // string message = Greet(123);
        
        double area = CalculateArea(5.0, 10.0);
        
        List<int> numbers = new List<int> {1, 2, 3};
        int? first = GetFirst(numbers);
        
        // Type safety enforced at compile time
        
        // Modern C# features
        var user = new { Name = "Alice", Age = 25 };  // Anonymous type
        Console.WriteLine(user.Name);
    }
}`,
    },
    hints: [
      'TypeScript is a superset of JavaScript, meaning all valid JavaScript is valid TypeScript.',
      'Use interfaces to define object shapes and ensure consistency across your codebase.',
      'The any type disables type checking and should be avoided unless absolutely necessary.',
    ],
    commonErrors: {
      python: ['Type hints are not enforced at runtime', 'Incorrect type hint syntax', 'Forgetting to import typing module'],
      cpp: ['Template syntax complexity', 'Linker errors with templates', 'Type deduction failures'],
      javascript: ['No compile-time type checking', 'Runtime type errors from incorrect assumptions', 'Using wrong property names without warnings'],
      java: ['Generic type erasure issues', 'Incorrect wildcard usage', 'Type casting errors'],
      typescript: ['Using any type excessively', 'Not handling null/undefined with union types', 'Incorrect type assertions', 'Forgetting to define interfaces for complex objects'],
      csharp: ['Nullable reference type confusion', 'Generic constraint violations', 'Implicit type conversion errors'],
    },
    quiz: [
      {
        question: 'What is the main benefit of TypeScript over JavaScript?',
        options: ['It runs faster', 'It catches type errors at compile time', 'It has more features', 'It works in browsers'],
        correctAnswer: 1,
        explanation: 'TypeScript\'s main benefit is catching type-related errors at compile time before the code runs, preventing entire categories of runtime bugs.',
      },
      {
        question: 'What does the union type "string | number" mean?',
        options: ['A string and a number combined', 'Either a string or a number', 'A string converted to number', 'An error'],
        correctAnswer: 1,
        explanation: 'A union type allows a value to be one of several types. "string | number" means the value can be either a string or a number.',
      },
    ],
    tryIt: 'Create a TypeScript interface for a Book with title (string), pages (number), and optional author (string), then create an object matching it.',
  },
];

// PYTHON-SPECIFIC LESSONS
export const PYTHON_LESSONS: LessonStructure[] = [
  {
    id: 'python-list-comprehensions',
    title: 'List Comprehensions - Elegant Data Transformation',
    category: 'language-specific',
    order: 55,
    duration: '15 min',
    xpReward: 35,
    conceptText: `List comprehensions are one of Python's most elegant features. They provide a concise way to create lists based on existing sequences. Where other languages require explicit loops with multiple lines of code, Python lets you express the same logic in a single readable line. This feature embodies Python's philosophy of making code clear and expressive.

Consider the task of creating a list of squared numbers from one to ten. In most languages, you would initialize an empty list, write a loop, calculate each square, and append it to the list. Python's list comprehension lets you express this entire operation in one line: squares = [x**2 for x in range(1, 11)]. The intent is immediately clear.

The syntax follows a natural English-like structure. You specify what you want to create, followed by a for clause describing where the data comes from, optionally followed by conditions that filter the results. This reads almost like a mathematical set-builder notation, which many programmers find intuitive.

List comprehensions are not just about brevity. They are also more efficient than equivalent loops because Python optimizes them internally. When you use a list comprehension, Python allocates memory for the entire list at once, rather than growing it element by element. For large datasets, this performance difference can be significant.

The power of list comprehensions extends beyond simple transformations. You can nest them to work with multi-dimensional data. You can include conditional logic to filter elements. You can even chain multiple for clauses to generate combinations. However, with great power comes the temptation to write overly complex comprehensions that sacrifice readability for cleverness.

While other languages have adopted similar features, list comprehensions remain distinctly Pythonic. Understanding them is essential for reading and writing idiomatic Python code. They appear throughout Python libraries and frameworks. When you see elegant, compact data processing in Python, comprehensions are often at work.`,
    diagram: 'Visual showing loop vs list comprehension side by side',
    codeExamples: {
      python: `# Python - List Comprehensions

# Basic comprehension - squares
squares = [x**2 for x in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# With condition - only even squares
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Transform strings
names = ["alice", "bob", "charlie"]
capitalized = [name.upper() for name in names]
print(capitalized)  # ['ALICE', 'BOB', 'CHARLIE']

# Extract from objects
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35}
]
names_only = [user["name"] for user in users]
print(names_only)  # ['Alice', 'Bob', 'Charlie']

# Nested comprehension - flatten matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Dictionary comprehension
numbers = [1, 2, 3, 4, 5]
squared_dict = {x: x**2 for x in numbers}
print(squared_dict)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Set comprehension
numbers_with_duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique_squares = {x**2 for x in numbers_with_duplicates}
print(unique_squares)  # {1, 4, 9, 16, 25}`,
      cpp: `// C++ - No direct equivalent, use loops or algorithms
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // Generate squares using transform
    vector<int> numbers(10);
    iota(numbers.begin(), numbers.end(), 1);  // Fill with 1-10
    
    vector<int> squares(10);
    transform(numbers.begin(), numbers.end(), squares.begin(),
              [](int x) { return x * x; });
    
    // Filter even squares
    vector<int> even_squares;
    for(int x : numbers) {
        if(x % 2 == 0) {
            even_squares.push_back(x * x);
        }
    }
    
    // C++20 ranges provide similar functionality
    // auto squares = numbers | views::transform([](int x) { return x*x; });
    
    return 0;
}`,
      javascript: `// JavaScript - Array methods provide similar functionality

// Basic transformation - squares
const squares = Array.from({length: 10}, (_, i) => (i + 1) ** 2);
console.log(squares);  // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Using map
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const squaresMap = numbers.map(x => x ** 2);

// With filter - only even squares
const evenSquares = numbers
    .filter(x => x % 2 === 0)
    .map(x => x ** 2);
console.log(evenSquares);  // [4, 16, 36, 64, 100]

// Transform strings
const names = ["alice", "bob", "charlie"];
const capitalized = names.map(name => name.toUpperCase());
console.log(capitalized);  // ['ALICE', 'BOB', 'CHARLIE']

// Extract from objects
const users = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];
const namesOnly = users.map(user => user.name);
console.log(namesOnly);  // ['Alice', 'Bob', 'Charlie']

// Flatten matrix
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flattened = matrix.flat();
console.log(flattened);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
      java: `// Java - Use Streams for functional transformations
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Generate squares using streams
        List<Integer> squares = IntStream.rangeClosed(1, 10)
            .map(x -> x * x)
            .boxed()
            .collect(Collectors.toList());
        System.out.println(squares);
        
        // Filter even squares
        List<Integer> evenSquares = IntStream.rangeClosed(1, 10)
            .filter(x -> x % 2 == 0)
            .map(x -> x * x)
            .boxed()
            .collect(Collectors.toList());
        System.out.println(evenSquares);
        
        // Transform strings
        List<String> names = Arrays.asList("alice", "bob", "charlie");
        List<String> capitalized = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println(capitalized);
        
        // Extract from objects
        class User {
            String name;
            int age;
            User(String name, int age) {
                this.name = name;
                this.age = age;
            }
        }
        
        List<User> users = Arrays.asList(
            new User("Alice", 25),
            new User("Bob", 30)
        );
        
        List<String> namesOnly = users.stream()
            .map(user -> user.name)
            .collect(Collectors.toList());
        System.out.println(namesOnly);
    }
}`,
      typescript: `// TypeScript - Array methods with type safety

// Basic transformation - squares
const squares: number[] = Array.from({length: 10}, (_, i) => (i + 1) ** 2);
console.log(squares);

// Using map with types
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const squaresMap: number[] = numbers.map((x: number) => x ** 2);

// With filter - only even squares
const evenSquares: number[] = numbers
    .filter((x: number) => x % 2 === 0)
    .map((x: number) => x ** 2);
console.log(evenSquares);

// Transform strings with type safety
const names: string[] = ["alice", "bob", "charlie"];
const capitalized: string[] = names.map((name: string) => name.toUpperCase());

// Extract from typed objects
interface User {
    name: string;
    age: number;
}

const users: User[] = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];

const namesOnly: string[] = users.map((user: User) => user.name);
console.log(namesOnly);

// Type-safe flattening
const matrix: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flattened: number[] = matrix.flat();
console.log(flattened);`,
      csharp: `// C# - LINQ provides similar functionality
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Generate squares using LINQ
        var squares = Enumerable.Range(1, 10)
            .Select(x => x * x)
            .ToList();
        Console.WriteLine(string.Join(", ", squares));
        
        // Filter even squares
        var evenSquares = Enumerable.Range(1, 10)
            .Where(x => x % 2 == 0)
            .Select(x => x * x)
            .ToList();
        Console.WriteLine(string.Join(", ", evenSquares));
        
        // Transform strings
        var names = new List<string> {"alice", "bob", "charlie"};
        var capitalized = names.Select(name => name.ToUpper()).ToList();
        Console.WriteLine(string.Join(", ", capitalized));
        
        // Extract from objects
        var users = new List<dynamic> {
            new {Name = "Alice", Age = 25},
            new {Name = "Bob", Age = 30},
            new {Name = "Charlie", Age = 35}
        };
        
        var namesOnly = users.Select(user => user.Name).ToList();
        Console.WriteLine(string.Join(", ", namesOnly));
        
        // Flatten matrix
        var matrix = new List<List<int>> {
            new List<int> {1, 2, 3},
            new List<int> {4, 5, 6},
            new List<int> {7, 8, 9}
        };
        var flattened = matrix.SelectMany(row => row).ToList();
        Console.WriteLine(string.Join(", ", flattened));
    }
}`,
    },
    hints: [
      'List comprehensions are more efficient than equivalent for loops with append operations.',
      'Keep comprehensions readable - if they get too complex, use a regular loop instead.',
      'You can use comprehensions for lists, sets, and dictionaries by changing the brackets.',
    ],
    commonErrors: {
      python: ['Overly complex nested comprehensions that hurt readability', 'Forgetting brackets around comprehension', 'Using comprehension when loop with break/continue is needed'],
      cpp: ['Verbose syntax compared to Python', 'Algorithm choice complexity', 'Iterator invalidation issues'],
      javascript: ['Forgetting to chain filter before map for filtering', 'Mutating arrays during map operations', 'Not understanding the difference between map and forEach'],
      java: ['Forgetting to collect stream results', 'Not boxing primitive streams', 'Stream reuse errors'],
      typescript: ['Type inference failures in complex chains', 'Not properly typing lambda parameters', 'Confusion between Array methods'],
      csharp: ['Forgetting ToList() to materialize LINQ queries', 'Deferred execution confusion', 'Multiple enumeration performance issues'],
    },
    quiz: [
      {
        question: 'What is the main advantage of Python list comprehensions?',
        options: ['They run faster than all other approaches', 'They are more concise and readable', 'They use less memory', 'They can do things loops cannot'],
        correctAnswer: 1,
        explanation: 'List comprehensions are valued primarily for their concise, readable syntax that expresses transformations elegantly.',
      },
    ],
    tryIt: 'Create a list comprehension that generates the first 10 even numbers squared.',
  },
  {
    id: 'cpp-pointers',
    title: 'Pointers - Direct Memory Access',
    category: 'language-specific',
    order: 60,
    duration: '25 min',
    xpReward: 45,
    conceptText: `Pointers are one of the most powerful and dangerous features in C++. They give you direct access to memory addresses, allowing you to manipulate data at the lowest level. This power enables efficient algorithms and data structures, but it also opens the door to bugs that can crash your program or create security vulnerabilities. Understanding pointers is essential for mastering C++.

Every variable in your program occupies a location in memory. That location has an address, represented as a hexadecimal number. A pointer is simply a variable that stores a memory address. Instead of holding a value directly, a pointer holds the address where a value is stored. This level of indirection enables dynamic memory allocation, efficient function parameters, and complex data structures.

The syntax for pointers uses two special operators. The asterisk operator declares a pointer and dereferences it to access the value at the stored address. The ampersand operator gets the address of a variable. When you write int* ptr, you are declaring a pointer to an integer. When you write ptr = &x, you are storing the address of variable x in the pointer. When you write *ptr, you are accessing the value stored at that address.

Pointers enable dynamic memory allocation. Instead of declaring all variables at compile time, you can allocate memory at runtime using new. This lets you create data structures whose size depends on user input or runtime conditions. However, every allocation requires a corresponding deallocation using delete. Forgetting to free memory causes memory leaks. Accessing freed memory causes undefined behavior. These memory management challenges make C++ both powerful and dangerous.

Modern C++ provides smart pointers that automate memory management. unique_ptr ensures exactly one owner for dynamically allocated memory and automatically deletes it when the owner goes out of scope. shared_ptr allows multiple owners and uses reference counting to delete memory when the last owner releases it. These smart pointers eliminate most manual memory management while preserving the power of pointers.

Other languages handle memory differently. Java and C# use garbage collection, automatically freeing unused memory. Python uses reference counting combined with cycle detection. JavaScript relies on garbage collection. TypeScript compiles to JavaScript and uses the same memory model. Only C and C++ expose pointers directly, giving programmers control but requiring careful discipline.`,
    diagram: 'Memory diagram showing variable address, pointer storing that address, and dereferencing',
    codeExamples: {
      python: `# Python - No explicit pointers, but understanding references

# Variables are references to objects
x = 42
y = x  # y refers to the same object as x

print(f"x: {x}, y: {y}")  # Both are 42
print(f"x is y: {x is y}")  # True - same object

# Mutable objects show reference behavior
list1 = [1, 2, 3]
list2 = list1  # Both refer to same list
list2.append(4)

print(f"list1: {list1}")  # [1, 2, 3, 4]
print(f"list2: {list2}")  # [1, 2, 3, 4]

# Get object ID (similar to address)
print(f"ID of list1: {id(list1)}")
print(f"ID of list2: {id(list2)}")  # Same ID

# Copy to avoid shared reference
list3 = list1.copy()
list3.append(5)
print(f"list1: {list1}")  # [1, 2, 3, 4]
print(f"list3: {list3}")  # [1, 2, 3, 4, 5]`,
      cpp: `// C++ - Pointers with direct memory access
#include <iostream>
#include <memory>
using namespace std;

int main() {
    // Basic pointer usage
    int x = 42;
    int* ptr = &x;  // ptr stores address of x
    
    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << &x << endl;
    cout << "Value of ptr: " << ptr << endl;
    cout << "Value at ptr: " << *ptr << endl;
    
    // Modify through pointer
    *ptr = 100;
    cout << "x after modification: " << x << endl;
    
    // Dynamic memory allocation
    int* dynamicPtr = new int(50);
    cout << "Dynamic value: " << *dynamicPtr << endl;
    delete dynamicPtr;  // Must free memory
    
    // Array pointers
    int arr[] = {1, 2, 3, 4, 5};
    int* arrPtr = arr;
    cout << "First element: " << *arrPtr << endl;
    cout << "Second element: " << *(arrPtr + 1) << endl;
    
    // Smart pointers (modern C++)
    unique_ptr<int> smartPtr = make_unique<int>(75);
    cout << "Smart pointer value: " << *smartPtr << endl;
    // Automatically deleted when out of scope
    
    // Shared pointer
    shared_ptr<int> sharedPtr1 = make_shared<int>(200);
    shared_ptr<int> sharedPtr2 = sharedPtr1;
    cout << "Shared value: " << *sharedPtr1 << endl;
    cout << "Reference count: " << sharedPtr1.use_count() << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Objects are references, primitives are values

// Primitive values (copied)
let x = 42;
let y = x;  // y gets a copy of the value
y = 100;

console.log(\`x: \${x}\`);  // 42
console.log(\`y: \${y}\`);  // 100

// Objects are references
let obj1 = {value: 42};
let obj2 = obj1;  // obj2 refers to same object
obj2.value = 100;

console.log(\`obj1.value: \${obj1.value}\`);  // 100
console.log(\`obj2.value: \${obj2.value}\`);  // 100

// Arrays are also references
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);

console.log(\`arr1: \${arr1}\`);  // [1, 2, 3, 4]
console.log(\`arr2: \${arr2}\`);  // [1, 2, 3, 4]

// Create copies to avoid shared references
let arr3 = [...arr1];  // Spread operator
arr3.push(5);
console.log(\`arr1: \${arr1}\`);  // [1, 2, 3, 4]
console.log(\`arr3: \${arr3}\`);  // [1, 2, 3, 4, 5]`,
      java: `// Java - References but no pointer arithmetic
public class Main {
    public static void main(String[] args) {
        // Primitives are values (copied)
        int x = 42;
        int y = x;
        y = 100;
        
        System.out.println("x: " + x);  // 42
        System.out.println("y: " + y);  // 100
        
        // Objects are references
        class Box {
            int value;
            Box(int v) { value = v; }
        }
        
        Box box1 = new Box(42);
        Box box2 = box1;  // Both refer to same object
        box2.value = 100;
        
        System.out.println("box1.value: " + box1.value);  // 100
        System.out.println("box2.value: " + box2.value);  // 100
        
        // Arrays are also references
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;
        arr2[0] = 999;
        
        System.out.println("arr1[0]: " + arr1[0]);  // 999
        
        // Create copy to avoid shared reference
        int[] arr3 = arr1.clone();
        arr3[0] = 111;
        System.out.println("arr1[0]: " + arr1[0]);  // 999
        System.out.println("arr3[0]: " + arr3[0]);  // 111
    }
}`,
      typescript: `// TypeScript - Same as JavaScript with type safety

// Primitive values (copied)
let x: number = 42;
let y: number = x;
y = 100;

console.log(\`x: \${x}\`);  // 42
console.log(\`y: \${y}\`);  // 100

// Objects are references
interface Box {
    value: number;
}

let obj1: Box = {value: 42};
let obj2: Box = obj1;  // Both refer to same object
obj2.value = 100;

console.log(\`obj1.value: \${obj1.value}\`);  // 100
console.log(\`obj2.value: \${obj2.value}\`);  // 100

// Arrays are references
let arr1: number[] = [1, 2, 3];
let arr2: number[] = arr1;
arr2.push(4);

console.log(\`arr1: \${arr1}\`);  // [1, 2, 3, 4]
console.log(\`arr2: \${arr2}\`);  // [1, 2, 3, 4]

// Create typed copy
let arr3: number[] = [...arr1];
arr3.push(5);
console.log(\`arr1: \${arr1}\`);  // [1, 2, 3, 4]
console.log(\`arr3: \${arr3}\`);  // [1, 2, 3, 4, 5]`,
      csharp: `// C# - References with garbage collection
using System;

class Program {
    static void Main() {
        // Value types (copied)
        int x = 42;
        int y = x;
        y = 100;
        
        Console.WriteLine($"x: {x}");  // 42
        Console.WriteLine($"y: {y}");  // 100
        
        // Reference types
        class Box {
            public int Value;
            public Box(int v) { Value = v; }
        }
        
        Box box1 = new Box(42);
        Box box2 = box1;  // Both refer to same object
        box2.Value = 100;
        
        Console.WriteLine($"box1.Value: {box1.Value}");  // 100
        Console.WriteLine($"box2.Value: {box2.Value}");  // 100
        
        // Arrays are reference types
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;
        arr2[0] = 999;
        
        Console.WriteLine($"arr1[0]: {arr1[0]}");  // 999
        
        // Create copy
        int[] arr3 = (int[])arr1.Clone();
        arr3[0] = 111;
        Console.WriteLine($"arr1[0]: {arr1[0]}");  // 999
        Console.WriteLine($"arr3[0]: {arr3[0]}");  // 111
        
        // Memory is automatically managed (garbage collected)
    }
}`,
    },
    hints: [
      'Always initialize pointers to nullptr if not immediately assigning them to prevent dangling pointers.',
      'Every new must have a corresponding delete, or use smart pointers to avoid manual memory management.',
      'Dereferencing a null or dangling pointer causes undefined behavior and often crashes.',
    ],
    commonErrors: {
      python: ['Confusing object identity with equality', 'Unintended shared references with mutable objects', 'Not using copy when needed'],
      cpp: ['Memory leaks from forgetting delete', 'Dangling pointers after delete', 'Null pointer dereference', 'Using pointer after delete (use-after-free)', 'Pointer arithmetic errors'],
      javascript: ['Unintended object mutation through references', 'Shallow vs deep copy confusion', 'Not understanding primitive vs reference types'],
      java: ['Null pointer exceptions', 'Not understanding reference vs value semantics', 'Shallow copy issues'],
      typescript: ['Same as JavaScript plus type assertion errors with null checks', 'Forgetting to check for null/undefined'],
      csharp: ['Null reference exceptions', 'Confusion between value and reference types', 'Boxing/unboxing performance issues'],
    },
    quiz: [
      {
        question: 'Which language gives you direct access to memory addresses through pointers?',
        options: ['Python', 'C++', 'JavaScript', 'Java'],
        correctAnswer: 1,
        explanation: 'C++ is the only language among these that provides direct pointer access and manual memory management.',
      },
      {
        question: 'What does the & operator do in C++?',
        options: ['Dereference a pointer', 'Get the address of a variable', 'Allocate memory', 'Delete memory'],
        correctAnswer: 1,
        explanation: 'The & operator gets the address of a variable, which can then be stored in a pointer.',
      },
    ],
    tryIt: 'In your language, create two variables pointing to the same object, modify one, and see if the other changes.',
  },
];

// JAVA-SPECIFIC LESSONS
export const JAVA_LESSONS: LessonStructure[] = [
  {
    id: 'java-collections',
    title: 'Collections Framework - Managing Data Structures',
    category: 'language-specific',
    order: 65,
    duration: '20 min',
    xpReward: 40,
    conceptText: `The Java Collections Framework is one of the most powerful features of the language. It provides a unified architecture for storing and manipulating groups of objects. Instead of manually implementing data structures like lists, sets, and maps, Java provides highly optimized implementations that handle the complexity for you. Understanding this framework is essential for writing professional Java code.

At the heart of the framework are interfaces that define standard behaviors. The List interface represents ordered collections that allow duplicates. The Set interface represents collections that forbid duplicates. The Map interface represents key-value associations. These interfaces establish contracts that all implementations must follow, allowing you to write code against the interface and swap implementations as needed.

ArrayList and LinkedList both implement the List interface but with different performance characteristics. ArrayList uses a dynamic array internally, providing fast random access but slower insertion in the middle. LinkedList uses a doubly-linked structure, providing fast insertion anywhere but slower random access. Choosing the right implementation depends on your access patterns.

The framework distinguishes between Collection types. Lists maintain insertion order and allow indexed access. Sets eliminate duplicates automatically. HashSet provides fast operations using hashing. TreeSet keeps elements sorted. LinkedHashSet preserves insertion order. Each serves different needs, and selecting the right one impacts both correctness and performance.

Maps deserve special attention because they are not technically Collections but are considered part of the framework. HashMap provides fast key-based lookup using hash codes. TreeMap keeps keys sorted. LinkedHashMap preserves insertion order. Understanding when to use each map type is crucial for efficient data management.

While other languages have similar structures, Java's framework is notable for its consistency and completeness. Python has lists, sets, and dictionaries built into the language. JavaScript has arrays, Sets, and Maps. C++ has the Standard Template Library. C# has its own collections namespace. TypeScript uses JavaScript's structures with added type safety. Java's approach emphasizes interfaces, explicit types, and predictable behavior.`,
    diagram: 'Collections hierarchy diagram showing List, Set, Map interfaces and their implementations',
    codeExamples: {
      python: `# Python - Built-in collections

# List (like ArrayList)
my_list = [1, 2, 3, 4, 5]
my_list.append(6)
my_list.insert(0, 0)  # Insert at index
print(f"List: {my_list}")
print(f"Element at index 2: {my_list[2]}")

# Set (like HashSet)
my_set = {1, 2, 3, 4, 5}
my_set.add(6)
my_set.add(3)  # Duplicate ignored
print(f"Set: {my_set}")
print(f"Contains 3: {3 in my_set}")

# Dictionary (like HashMap)
my_dict = {"name": "Alice", "age": 25, "city": "NYC"}
my_dict["email"] = "alice@example.com"
print(f"Dictionary: {my_dict}")
print(f"Name: {my_dict['name']}")

# Iteration
for item in my_list:
    print(item)

for key, value in my_dict.items():
    print(f"{key}: {value}")`,
      cpp: `// C++ - Standard Template Library (STL)
#include <iostream>
#include <vector>
#include <list>
#include <set>
#include <map>
using namespace std;

int main() {
    // Vector (like ArrayList)
    vector<int> myVector = {1, 2, 3, 4, 5};
    myVector.push_back(6);
    myVector.insert(myVector.begin(), 0);
    cout << "Vector element at 2: " << myVector[2] << endl;
    
    // List (doubly-linked)
    list<int> myList = {1, 2, 3};
    myList.push_back(4);
    myList.push_front(0);
    
    // Set (like TreeSet - sorted)
    set<int> mySet = {1, 2, 3, 4, 5};
    mySet.insert(6);
    mySet.insert(3);  // Duplicate ignored
    cout << "Set contains 3: " << (mySet.count(3) > 0) << endl;
    
    // Map (like TreeMap - sorted keys)
    map<string, int> myMap;
    myMap["Alice"] = 25;
    myMap["Bob"] = 30;
    cout << "Alice's age: " << myMap["Alice"] << endl;
    
    // Iteration
    for(int item : myVector) {
        cout << item << " ";
    }
    cout << endl;
    
    for(const auto& pair : myMap) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - Built-in collections

// Array (like ArrayList)
let myArray = [1, 2, 3, 4, 5];
myArray.push(6);
myArray.unshift(0);  // Add to beginning
console.log(\`Array: \${myArray}\`);
console.log(\`Element at index 2: \${myArray[2]}\`);

// Set (like HashSet)
let mySet = new Set([1, 2, 3, 4, 5]);
mySet.add(6);
mySet.add(3);  // Duplicate ignored
console.log(\`Set size: \${mySet.size}\`);
console.log(\`Contains 3: \${mySet.has(3)}\`);

// Map (like HashMap)
let myMap = new Map();
myMap.set("name", "Alice");
myMap.set("age", 25);
myMap.set("city", "NYC");
console.log(\`Name: \${myMap.get("name")}\`);

// Object as map (alternative)
let objMap = {
    name: "Alice",
    age: 25,
    city: "NYC"
};

// Iteration
myArray.forEach(item => console.log(item));

myMap.forEach((value, key) => {
    console.log(\`\${key}: \${value}\`);
});`,
      java: `// Java - Collections Framework
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ArrayList - dynamic array
        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(1);
        arrayList.add(2);
        arrayList.add(3);
        arrayList.add(0, 0);  // Insert at index
        System.out.println("ArrayList: " + arrayList);
        System.out.println("Element at 2: " + arrayList.get(2));
        
        // LinkedList - doubly-linked list
        List<Integer> linkedList = new LinkedList<>();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        
        // HashSet - unordered, no duplicates
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(1);
        hashSet.add(2);
        hashSet.add(3);
        hashSet.add(3);  // Duplicate ignored
        System.out.println("HashSet: " + hashSet);
        System.out.println("Contains 3: " + hashSet.contains(3));
        
        // TreeSet - sorted, no duplicates
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(3);
        treeSet.add(1);
        treeSet.add(2);
        System.out.println("TreeSet (sorted): " + treeSet);
        
        // HashMap - key-value pairs
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Alice", 25);
        hashMap.put("Bob", 30);
        hashMap.put("Charlie", 35);
        System.out.println("HashMap: " + hashMap);
        System.out.println("Alice's age: " + hashMap.get("Alice"));
        
        // Iteration
        for(Integer item : arrayList) {
            System.out.println(item);
        }
        
        for(Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Streams (Java 8+)
        arrayList.stream()
            .filter(x -> x > 1)
            .forEach(System.out::println);
    }
}`,
      typescript: `// TypeScript - Type-safe collections

// Array (like ArrayList)
let myArray: number[] = [1, 2, 3, 4, 5];
myArray.push(6);
myArray.unshift(0);
console.log(\`Array: \${myArray}\`);
console.log(\`Element at index 2: \${myArray[2]}\`);

// Set (like HashSet)
let mySet: Set<number> = new Set([1, 2, 3, 4, 5]);
mySet.add(6);
mySet.add(3);  // Duplicate ignored
console.log(\`Set size: \${mySet.size}\`);
console.log(\`Contains 3: \${mySet.has(3)}\`);

// Map (like HashMap)
let myMap: Map<string, number> = new Map();
myMap.set("Alice", 25);
myMap.set("Bob", 30);
myMap.set("Charlie", 35);
console.log(\`Alice's age: \${myMap.get("Alice")}\`);

// Type-safe interface
interface User {
    name: string;
    age: number;
}

let users: User[] = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30}
];

// Iteration with types
myArray.forEach((item: number) => console.log(item));

myMap.forEach((value: number, key: string) => {
    console.log(\`\${key}: \${value}\`);
});`,
      csharp: `// C# - Collections with LINQ
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // List (like ArrayList)
        List<int> myList = new List<int> {1, 2, 3, 4, 5};
        myList.Add(6);
        myList.Insert(0, 0);
        Console.WriteLine($"List element at 2: {myList[2]}");
        
        // HashSet - unordered, no duplicates
        HashSet<int> mySet = new HashSet<int> {1, 2, 3, 4, 5};
        mySet.Add(6);
        mySet.Add(3);  // Duplicate ignored
        Console.WriteLine($"Set count: {mySet.Count}");
        Console.WriteLine($"Contains 3: {mySet.Contains(3)}");
        
        // Dictionary (like HashMap)
        Dictionary<string, int> myDict = new Dictionary<string, int>();
        myDict["Alice"] = 25;
        myDict["Bob"] = 30;
        myDict["Charlie"] = 35;
        Console.WriteLine($"Alice's age: {myDict["Alice"]}");
        
        // SortedSet (like TreeSet)
        SortedSet<int> sortedSet = new SortedSet<int> {3, 1, 2};
        Console.WriteLine($"SortedSet: {string.Join(", ", sortedSet)}");
        
        // Iteration
        foreach(int item in myList) {
            Console.WriteLine(item);
        }
        
        foreach(var pair in myDict) {
            Console.WriteLine($"{pair.Key}: {pair.Value}");
        }
        
        // LINQ operations
        var filtered = myList.Where(x => x > 2).ToList();
        Console.WriteLine($"Filtered: {string.Join(", ", filtered)}");
    }
}`,
    },
    hints: [
      'Choose ArrayList for random access, LinkedList for frequent insertions/deletions at both ends.',
      'Use HashSet when you need fast lookups and don\'t care about order, TreeSet when you need sorted elements.',
      'HashMap provides O(1) average-case lookup, TreeMap provides O(log n) with sorted keys.',
    ],
    commonErrors: {
      python: ['Modifying list while iterating over it', 'Using mutable objects as dictionary keys', 'Not handling KeyError when accessing dict'],
      cpp: ['Iterator invalidation after modifying container', 'Using wrong container for use case', 'Not checking if key exists before access'],
      javascript: ['Confusing array methods (push vs concat)', 'Using array when Set would be better', 'Not checking if Map key exists'],
      java: ['ConcurrentModificationException when modifying while iterating', 'Using wrong collection type', 'Not checking null returns from get()', 'Forgetting to override equals() and hashCode()'],
      typescript: ['Type mismatches in generic collections', 'Not checking for undefined from Map.get()', 'Array mutability issues'],
      csharp: ['Modifying collection during foreach', 'Not handling KeyNotFoundException', 'Confusion between List and IEnumerable'],
    },
    quiz: [
      {
        question: 'When should you use ArrayList over LinkedList in Java?',
        options: ['When you need fast random access by index', 'When you need fast insertion at the beginning', 'When you need less memory', 'Always use ArrayList'],
        correctAnswer: 0,
        explanation: 'ArrayList provides O(1) random access by index using an array internally, while LinkedList requires O(n) traversal.',
      },
    ],
    tryIt: 'Create a HashMap/Dictionary mapping student names to their test scores, then iterate and print all entries.',
  },
];

// C#-SPECIFIC LESSONS
export const CSHARP_LESSONS: LessonStructure[] = [
  {
    id: 'csharp-properties',
    title: 'Properties - Smart Field Access',
    category: 'language-specific',
    order: 70,
    duration: '18 min',
    xpReward: 35,
    conceptText: `Properties are one of C#'s most elegant features, bridging the gap between fields and methods. They look like fields when you use them but can execute code when you get or set their values. This enables encapsulation without sacrificing the convenience of simple field access. Understanding properties is essential for writing idiomatic C# code.

In many languages, you expose private fields through getter and setter methods. If you have a private field name, you write getName() and setName(string) methods. This works but creates verbose code. Users must call person.getName() instead of simply accessing person.name. C# properties solve this by providing method-like behavior with field-like syntax.

A property has get and set accessors that execute when you read or write the property. You can include validation in the setter, ensuring age is never negative. You can calculate the value in the getter, deriving fullName from firstName and lastName. You can make properties read-only by omitting the setter, or write-only by omitting the getter. This flexibility makes properties incredibly powerful.

Auto-implemented properties take convenience further. When you don't need custom logic in get or set, C# generates a private backing field automatically. You write public string Name { get; set; } and C# creates the field and accessors for you. This reduces boilerplate while maintaining the ability to add logic later without breaking calling code.

Properties support different access levels for get and set. You might make get public but set private, allowing anyone to read the value but only the class to modify it. This fine-grained control enables better encapsulation than simple fields while remaining easy to use. Properties can also be virtual, allowing derived classes to override the behavior.

Other languages handle this differently. Java uses explicit getter and setter methods. Python uses property decorators to turn method calls into attribute access. JavaScript uses get and set keywords but less commonly. C++ can use operator overloading. TypeScript follows JavaScript. C# properties are unique in combining convenient syntax with powerful semantics, making them a defining feature of the language.`,
    diagram: 'Diagram showing property with backing field, get accessor, set accessor, and usage',
    codeExamples: {
      python: `# Python - Properties using decorators

class Person:
    def __init__(self, name, age):
        self._name = name  # Convention: _ means private
        self._age = age
    
    # Property with getter
    @property
    def name(self):
        return self._name
    
    # Property with setter
    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value
    
    # Property with getter (read-only)
    @property
    def age(self):
        return self._age
    
    # Computed property
    @property
    def info(self):
        return f"{self._name} is {self._age} years old"

# Usage looks like field access
person = Person("Alice", 25)
print(person.name)  # Calls getter
person.name = "Bob"  # Calls setter
print(person.info)  # Computed property`,
      cpp: `// C++ - Getter/setter methods (no built-in properties)
#include <iostream>
#include <string>
using namespace std;

class Person {
private:
    string name;
    int age;

public:
    Person(string n, int a) : name(n), age(a) {}
    
    // Getter methods
    string getName() const {
        return name;
    }
    
    int getAge() const {
        return age;
    }
    
    // Setter methods with validation
    void setName(string n) {
        if (n.empty()) {
            throw invalid_argument("Name cannot be empty");
        }
        name = n;
    }
    
    // Computed value
    string getInfo() const {
        return name + " is " + to_string(age) + " years old";
    }
};

int main() {
    Person person("Alice", 25);
    cout << person.getName() << endl;
    person.setName("Bob");
    cout << person.getInfo() << endl;
    return 0;
}`,
      javascript: `// JavaScript - Getters and setters

class Person {
    constructor(name, age) {
        this._name = name;  // Convention: _ means private
        this._age = age;
    }
    
    // Getter
    get name() {
        return this._name;
    }
    
    // Setter with validation
    set name(value) {
        if (!value) {
            throw new Error("Name cannot be empty");
        }
        this._name = value;
    }
    
    // Read-only getter
    get age() {
        return this._age;
    }
    
    // Computed property
    get info() {
        return \`\${this._name} is \${this._age} years old\`;
    }
}

// Usage looks like field access
let person = new Person("Alice", 25);
console.log(person.name);  // Calls getter
person.name = "Bob";  // Calls setter
console.log(person.info);  // Computed property`,
      java: `// Java - Explicit getter/setter methods
public class Main {
    public static void main(String[] args) {
        Person person = new Person("Alice", 25);
        System.out.println(person.getName());
        person.setName("Bob");
        System.out.println(person.getInfo());
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods with validation
    public void setName(String name) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name;
    }
    
    // Computed value
    public String getInfo() {
        return name + " is " + age + " years old";
    }
}`,
      typescript: `// TypeScript - Getters and setters with types

class Person {
    private _name: string;
    private _age: number;
    
    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }
    
    // Getter with type
    get name(): string {
        return this._name;
    }
    
    // Setter with validation
    set name(value: string) {
        if (!value) {
            throw new Error("Name cannot be empty");
        }
        this._name = value;
    }
    
    // Read-only getter
    get age(): number {
        return this._age;
    }
    
    // Computed property
    get info(): string {
        return \`\${this._name} is \${this._age} years old\`;
    }
}

// Usage looks like field access
let person = new Person("Alice", 25);
console.log(person.name);  // Calls getter
person.name = "Bob";  // Calls setter
console.log(person.info);  // Computed property`,
      csharp: `// C# - Properties (the cleanest syntax!)
using System;

class Person {
    private string _name;
    private int _age;
    
    // Full property with backing field
    public string Name {
        get { return _name; }
        set {
            if (string.IsNullOrEmpty(value)) {
                throw new ArgumentException("Name cannot be empty");
            }
            _name = value;
        }
    }
    
    // Auto-implemented property (C# generates backing field)
    public string Email { get; set; }
    
    // Read-only property
    public int Age {
        get { return _age; }
    }
    
    // Property with different access levels
    public DateTime CreatedAt { get; private set; }
    
    // Computed property
    public string Info {
        get { return $"{_name} is {_age} years old"; }
    }
    
    // Modern C# expression-bodied property
    public string ShortInfo => $"{_name}, {_age}";
    
    public Person(string name, int age) {
        _name = name;
        _age = age;
        CreatedAt = DateTime.Now;
    }
}

class Program {
    static void Main() {
        Person person = new Person("Alice", 25);
        
        // Usage looks exactly like field access
        Console.WriteLine(person.Name);  // Calls getter
        person.Name = "Bob";  // Calls setter
        person.Email = "bob@example.com";
        Console.WriteLine(person.Info);  // Computed property
        Console.WriteLine(person.ShortInfo);
    }
}`,
    },
    hints: [
      'Use auto-implemented properties when you don\'t need custom logic, but want the flexibility to add it later.',
      'Properties can have different access levels for get and set, enabling fine-grained encapsulation.',
      'Expression-bodied properties (=>) are perfect for simple computed values.',
    ],
    commonErrors: {
      python: ['Forgetting @property decorator', 'Recursive calls in property methods', 'Not using _ convention for backing fields'],
      cpp: ['Verbose getter/setter code', 'Forgetting const on getter methods', 'No easy way to add logic without changing interface'],
      javascript: ['Forgetting get/set keywords', 'Accidental recursion with same property name', 'No true private fields (until # syntax)'],
      java: ['Forgetting to generate getters/setters', 'Verbose method names', 'Cannot change to property without breaking code'],
      typescript: ['Type mismatches in getters/setters', 'Same recursion issues as JavaScript', 'Forgetting to mark backing fields private'],
      csharp: ['Infinite recursion by using same name for property and backing field', 'Forgetting validation in setters', 'Not using auto-properties when appropriate'],
    },
    quiz: [
      {
        question: 'What is the main advantage of C# properties over public fields?',
        options: ['They use less memory', 'They allow adding logic without changing calling code', 'They are faster', 'They are easier to write'],
        correctAnswer: 1,
        explanation: 'Properties allow you to add validation, computation, or other logic later without changing how the property is accessed.',
      },
    ],
    tryIt: 'Create a class with an auto-property for Name and a computed property that returns the name in uppercase.',
  },
];

// ADVANCED PROGRAMMING LESSONS
export const ADVANCED_LESSONS: LessonStructure[] = [
  {
    id: 'exception-handling',
    title: 'Exception Handling - Dealing with Errors',
    category: 'advanced',
    order: 75,
    duration: '20 min',
    xpReward: 40,
    conceptText: `Exception handling is how programs deal with errors and unexpected conditions. When something goes wrong during execution, the program can throw an exception rather than crashing. This exception propagates up the call stack until something catches and handles it. This mechanism separates normal code flow from error handling, making both clearer and more maintainable.

Think about what happens when you try to divide by zero, access a file that doesn't exist, or parse invalid JSON. Without exception handling, these errors would crash your program. With exceptions, you can detect these problems, handle them gracefully, and continue execution or fail elegantly with a helpful error message.

The try-catch pattern is universal across modern languages. You wrap risky code in a try block. If an exception occurs, execution immediately jumps to the corresponding catch block. The catch block receives the exception object, which contains information about what went wrong. You can then log the error, retry the operation, return a default value, or propagate the exception further.

Different languages have different philosophies about exceptions. Python uses exceptions extensively, even for control flow like StopIteration. Java has checked exceptions that must be declared in method signatures, forcing you to handle them. C++ has exceptions but many C++ codebases avoid them for performance reasons. JavaScript uses exceptions for errors but also provides error-first callbacks and Promise rejections. C# combines checked and unchecked exceptions with nullable reference types.

Finally blocks provide cleanup guarantees. Code in a finally block executes whether an exception occurred or not. This is crucial for releasing resources like file handles or database connections. Python also has context managers with the with statement. Java and C# have try-with-resources and using statements respectively. These ensure resources are cleaned up automatically.

Proper exception handling is an art. You should catch specific exceptions rather than generic ones. You should handle exceptions at the appropriate level of abstraction. You should never silently swallow exceptions without logging. And you should use exceptions for exceptional conditions, not normal control flow. These practices lead to robust, maintainable code.`,
    diagram: 'Flowchart showing try-catch-finally execution paths',
    codeExamples: {
      python: `# Python - Exception Handling with try-except

# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exception types
try:
    number = int("not a number")
except ValueError:
    print("Invalid number format")
except TypeError:
    print("Type error occurred")

# Catching multiple exceptions
try:
    risky_operation()
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Generic exception (use sparingly)
try:
    dangerous_code()
except Exception as e:
    print(f"Unexpected error: {e}")

# Finally block (always executes)
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    if 'file' in locals():
        file.close()
    print("Cleanup complete")

# Context manager (preferred for resources)
try:
    with open("data.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems invalid")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")`,
      cpp: `// C++ - Exception Handling with try-catch
#include <iostream>
#include <stdexcept>
#include <fstream>
using namespace std;

// Custom exception class
class InvalidAgeException : public exception {
    const char* what() const noexcept override {
        return "Age is invalid";
    }
};

int validateAge(int age) {
    if (age < 0) {
        throw invalid_argument("Age cannot be negative");
    }
    if (age > 150) {
        throw InvalidAgeException();
    }
    return age;
}

int main() {
    // Basic try-catch
    try {
        int result = 10 / 0;  // Undefined behavior in C++
    } catch (exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    // Catching specific exceptions
    try {
        validateAge(-5);
    } catch (invalid_argument& e) {
        cout << "Invalid argument: " << e.what() << endl;
    } catch (InvalidAgeException& e) {
        cout << "Custom error: " << e.what() << endl;
    }
    
    // RAII for automatic cleanup (preferred in C++)
    try {
        ifstream file("data.txt");
        if (!file) {
            throw runtime_error("File not found");
        }
        // File automatically closed when out of scope
    } catch (exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    // Catch all exceptions
    try {
        throw 42;
    } catch (...) {
        cout << "Unknown exception caught" << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - Exception Handling with try-catch

// Basic try-catch
try {
    let result = riskyFunction();
} catch (error) {
    console.log(\`Error occurred: \${error.message}\`);
}

// Catching specific error types
try {
    JSON.parse("invalid json");
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log("Invalid JSON syntax");
    } else {
        console.log("Other error:", error);
    }
}

// Finally block (always executes)
let file = null;
try {
    file = openFile("data.txt");
    let content = file.read();
} catch (error) {
    console.log(\`Error: \${error.message}\`);
} finally {
    if (file) {
        file.close();
    }
    console.log("Cleanup complete");
}

// Throwing exceptions
function validateAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative");
    }
    if (age > 150) {
        throw new RangeError("Age seems invalid");
    }
    return age;
}

try {
    validateAge(-5);
} catch (error) {
    console.log(\`Validation error: \${error.message}\`);
}

// Async exception handling
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(\`Fetch error: \${error.message}\`);
        return null;
    }
}

// Promise error handling
fetch('https://api.example.com/data')
    .then(response => response.json())
    .catch(error => console.log(\`Error: \${error.message}\`))
    .finally(() => console.log('Request complete'));`,
      java: `// Java - Exception Handling with checked and unchecked exceptions
import java.io.*;

public class Main {
    // Checked exception must be declared
    public static void readFile(String filename) throws IOException {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filename));
            String line = reader.readLine();
            System.out.println(line);
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.out.println("Error closing file");
                }
            }
        }
    }
    
    // Try-with-resources (automatic cleanup)
    public static void readFileModern(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }
        // Reader automatically closed
    }
    
    // Custom exception
    static class InvalidAgeException extends Exception {
        public InvalidAgeException(String message) {
            super(message);
        }
    }
    
    public static int validateAge(int age) throws InvalidAgeException {
        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative");
        }
        if (age > 150) {
            throw new InvalidAgeException("Age seems invalid");
        }
        return age;
    }
    
    public static void main(String[] args) {
        // Handling exceptions
        try {
            validateAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
        
        // Multiple catch blocks
        try {
            int result = Integer.parseInt("not a number");
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format");
        } catch (Exception e) {
            System.out.println("Other error: " + e.getMessage());
        }
    }
}`,
      typescript: `// TypeScript - Exception Handling with type safety

// Basic try-catch with typed error
try {
    let result = riskyFunction();
} catch (error) {
    if (error instanceof Error) {
        console.log(\`Error: \${error.message}\`);
    }
}

// Custom error class
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

class InvalidAgeError extends ValidationError {
    constructor(age: number) {
        super(\`Invalid age: \${age}\`);
    }
}

// Function that throws typed errors
function validateAge(age: number): number {
    if (age < 0) {
        throw new InvalidAgeError(age);
    }
    if (age > 150) {
        throw new ValidationError("Age seems unrealistic");
    }
    return age;
}

// Catching typed exceptions
try {
    validateAge(-5);
} catch (error) {
    if (error instanceof InvalidAgeError) {
        console.log("Invalid age error:", error.message);
    } else if (error instanceof ValidationError) {
        console.log("Validation error:", error.message);
    } else if (error instanceof Error) {
        console.log("General error:", error.message);
    }
}

// Async exception handling with types
async function fetchData(url: string): Promise<any> {
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(\`HTTP error: \${response.status}\`);
        }
        const data: any = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(\`Fetch error: \${error.message}\`);
        }
        return null;
    } finally {
        console.log('Request complete');
    }
}

// Result type pattern (alternative to exceptions)
type Result<T, E = Error> = 
    | { success: true; value: T }
    | { success: false; error: E };

function divide(a: number, b: number): Result<number> {
    if (b === 0) {
        return { success: false, error: new Error("Division by zero") };
    }
    return { success: true, value: a / b };
}

const result = divide(10, 2);
if (result.success) {
    console.log(\`Result: \${result.value}\`);
} else {
    console.log(\`Error: \${result.error.message}\`);
}`,
      csharp: `// C# - Exception Handling with modern features
using System;
using System.IO;

class Program {
    // Custom exception
    public class InvalidAgeException : Exception {
        public InvalidAgeException(string message) : base(message) { }
    }
    
    public static int ValidateAge(int age) {
        if (age < 0) {
            throw new ArgumentException("Age cannot be negative");
        }
        if (age > 150) {
            throw new InvalidAgeException("Age seems invalid");
        }
        return age;
    }
    
    // Method with exception documentation
    /// <exception cref="FileNotFoundException">File does not exist</exception>
    /// <exception cref="IOException">IO error occurred</exception>
    public static void ReadFile(string filename) {
        StreamReader reader = null;
        try {
            reader = new StreamReader(filename);
            string line = reader.ReadLine();
            Console.WriteLine(line);
        } catch (FileNotFoundException e) {
            Console.WriteLine($"File not found: {e.Message}");
        } catch (IOException e) {
            Console.WriteLine($"IO error: {e.Message}");
        } finally {
            reader?.Close();
            Console.WriteLine("Cleanup complete");
        }
    }
    
    // Using statement (automatic disposal)
    public static void ReadFileModern(string filename) {
        try {
            using (StreamReader reader = new StreamReader(filename)) {
                string line = reader.ReadLine();
                Console.WriteLine(line);
            }  // Reader automatically disposed here
        } catch (FileNotFoundException e) {
            Console.WriteLine($"File not found: {e.Message}");
        } catch (IOException e) {
            Console.WriteLine($"IO error: {e.Message}");
        }
    }
    
    static void Main() {
        // Basic try-catch
        try {
            ValidateAge(-5);
        } catch (InvalidAgeException e) {
            Console.WriteLine($"Validation error: {e.Message}");
        } catch (ArgumentException e) {
            Console.WriteLine($"Argument error: {e.Message}");
        } catch (Exception e) {
            Console.WriteLine($"Unexpected error: {e.Message}");
        }
        
        // Exception filters (C# 6+)
        try {
            throw new Exception("Test");
        } catch (Exception e) when (e.Message.Contains("Test")) {
            Console.WriteLine("Caught test exception");
        }
        
        // Async exception handling
        try {
            var task = FetchDataAsync();
            task.Wait();
        } catch (AggregateException ae) {
            foreach (var e in ae.InnerExceptions) {
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }
    
    static async System.Threading.Tasks.Task FetchDataAsync() {
        throw new InvalidOperationException("Async error");
    }
}`,
    },
    hints: [
      'Catch specific exceptions before generic ones to handle different errors appropriately.',
      'Always clean up resources in finally blocks or use language-specific automatic cleanup features.',
      'Never catch exceptions without logging or handling them - silent failures are hard to debug.',
    ],
    commonErrors: {
      python: ['Catching Exception too broadly', 'Not closing resources properly', 'Using exceptions for control flow excessively'],
      cpp: ['Not catching exceptions by reference (causing slicing)', 'Throwing exceptions in destructors', 'Memory leaks when exceptions bypass cleanup'],
      javascript: ['Not checking error types in catch blocks', 'Forgetting to handle Promise rejections', 'Not propagating errors appropriately'],
      java: ['Catching Exception instead of specific types', 'Empty catch blocks', 'Not closing resources in finally', 'Swallowing InterruptedException'],
      typescript: ['Not type-checking errors in catch blocks', 'Assuming error is always Error type', 'Not handling async errors'],
      csharp: ['Catching Exception too broadly', 'Not using using statements for IDisposable', 'Rethrowing with "throw ex" instead of "throw"'],
    },
    quiz: [
      {
        question: 'What is the purpose of a finally block?',
        options: ['To catch exceptions', 'To execute code whether exception occurred or not', 'To throw exceptions', 'To prevent exceptions'],
        correctAnswer: 1,
        explanation: 'A finally block always executes, whether an exception occurred or not, making it perfect for cleanup operations.',
      },
    ],
    tryIt: 'Write code that tries to parse a string to an integer, catches the exception if it fails, and logs an error message.',
  },
];

// MORE CONTROL FLOW LESSONS
export const MORE_CONTROL_FLOW_LESSONS: LessonStructure[] = [
  {
    id: 'while-loops',
    title: 'While Loops - Conditional Repetition',
    category: 'intermediate',
    order: 80,
    duration: '12 min',
    xpReward: 20,
    conceptText: `While loops represent a different approach to repetition compared to for loops. Where for loops excel at iterating a known number of times, while loops continue executing as long as a condition remains true. This makes them perfect for situations where you don't know in advance how many iterations you'll need. The loop keeps running until something in your code changes the condition to false.

Think about reading lines from a file until you reach the end. You don't know how many lines the file contains. A while loop checks before each iteration whether there are more lines to read. When the file ends, the condition becomes false and the loop stops. This pattern appears throughout programming whenever you need to continue until a specific condition is met.

The fundamental structure of a while loop is simple. You provide a boolean condition, and the loop body executes repeatedly as long as that condition evaluates to true. Before each iteration, the program checks the condition. If true, it executes the body. If false, it skips the body and continues with the code after the loop. This check-before-execute behavior means the body might never run if the condition starts false.

While loops carry a significant danger: infinite loops. If your condition never becomes false, the loop runs forever, freezing your program. This happens when you forget to modify the variables that the condition depends on. If you check whether x is less than ten but never increment x inside the loop, the condition stays true forever. Infinite loops are among the most common bugs beginners encounter.

Different languages handle while loops with nearly identical syntax. Python, JavaScript, Java, C++, TypeScript, and C# all use the keyword while followed by a condition in parentheses. The consistency across languages makes while loops easy to transfer between languages. The main differences appear in how each language handles boolean expressions and loop control statements.

Do-while loops provide a variation where the condition check happens after each iteration instead of before. This guarantees the loop body executes at least once. When you need to prompt the user for input and keep asking until they provide valid input, do-while ensures they get prompted at least one time. Not all languages support do-while, but the pattern appears in most mainstream languages.`,
    diagram: 'Flowchart showing while loop condition check and body execution',
    codeExamples: {
      python: `# Python - While loops

# Basic while loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# While loop with user input simulation
password = ""
attempts = 0
max_attempts = 3

while password != "secret" and attempts < max_attempts:
    password = input("Enter password: ")
    attempts += 1
    if password != "secret":
        print(f"Wrong! {max_attempts - attempts} attempts left")

if password == "secret":
    print("Access granted!")
else:
    print("Too many failed attempts")

# While loop reading from list
numbers = [1, 2, 3, 4, 5]
index = 0
while index < len(numbers):
    print(numbers[index])
    index += 1

# While loop with break
total = 0
while True:
    num = int(input("Enter number (0 to stop): "))
    if num == 0:
        break
    total += num
print(f"Total: {total}")

# While loop with continue
count = 0
while count < 10:
    count += 1
    if count % 2 == 0:
        continue  # Skip even numbers
    print(count)`,
      cpp: `// C++ - While loops
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Basic while loop
    int count = 0;
    while (count < 5) {
        cout << "Count: " << count << endl;
        count++;
    }
    
    // While loop with condition
    int sum = 0;
    int num = 1;
    while (num <= 10) {
        sum += num;
        num++;
    }
    cout << "Sum: " << sum << endl;
    
    // Do-while loop (executes at least once)
    int attempts = 0;
    string password;
    do {
        cout << "Enter password: ";
        cin >> password;
        attempts++;
    } while (password != "secret" && attempts < 3);
    
    if (password == "secret") {
        cout << "Access granted!" << endl;
    } else {
        cout << "Too many attempts" << endl;
    }
    
    // While loop with break
    int total = 0;
    while (true) {
        int input;
        cout << "Enter number (0 to stop): ";
        cin >> input;
        if (input == 0) {
            break;
        }
        total += input;
    }
    cout << "Total: " << total << endl;
    
    // While loop with continue
    int counter = 0;
    while (counter < 10) {
        counter++;
        if (counter % 2 == 0) {
            continue;  // Skip even numbers
        }
        cout << counter << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - While loops

// Basic while loop
let count = 0;
while (count < 5) {
    console.log(\`Count: \${count}\`);
    count++;
}

// While loop with condition
let sum = 0;
let num = 1;
while (num <= 10) {
    sum += num;
    num++;
}
console.log(\`Sum: \${sum}\`);

// Do-while loop (executes at least once)
let attempts = 0;
let password;
do {
    password = prompt("Enter password:");
    attempts++;
} while (password !== "secret" && attempts < 3);

if (password === "secret") {
    console.log("Access granted!");
} else {
    console.log("Too many attempts");
}

// While loop with array
let numbers = [1, 2, 3, 4, 5];
let index = 0;
while (index < numbers.length) {
    console.log(numbers[index]);
    index++;
}

// While loop with break
let total = 0;
while (true) {
    let input = parseInt(prompt("Enter number (0 to stop):"));
    if (input === 0) {
        break;
    }
    total += input;
}
console.log(\`Total: \${total}\`);

// While loop with continue
let counter = 0;
while (counter < 10) {
    counter++;
    if (counter % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(counter);
}`,
      java: `// Java - While loops
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Basic while loop
        int count = 0;
        while (count < 5) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // While loop with condition
        int sum = 0;
        int num = 1;
        while (num <= 10) {
            sum += num;
            num++;
        }
        System.out.println("Sum: " + sum);
        
        // Do-while loop (executes at least once)
        Scanner scanner = new Scanner(System.in);
        int attempts = 0;
        String password;
        do {
            System.out.print("Enter password: ");
            password = scanner.nextLine();
            attempts++;
        } while (!password.equals("secret") && attempts < 3);
        
        if (password.equals("secret")) {
            System.out.println("Access granted!");
        } else {
            System.out.println("Too many attempts");
        }
        
        // While loop with array
        int[] numbers = {1, 2, 3, 4, 5};
        int index = 0;
        while (index < numbers.length) {
            System.out.println(numbers[index]);
            index++;
        }
        
        // While loop with break
        int total = 0;
        while (true) {
            System.out.print("Enter number (0 to stop): ");
            int input = scanner.nextInt();
            if (input == 0) {
                break;
            }
            total += input;
        }
        System.out.println("Total: " + total);
        
        // While loop with continue
        int counter = 0;
        while (counter < 10) {
            counter++;
            if (counter % 2 == 0) {
                continue;  // Skip even numbers
            }
            System.out.println(counter);
        }
    }
}`,
      typescript: `// TypeScript - While loops with types

// Basic while loop
let count: number = 0;
while (count < 5) {
    console.log(\`Count: \${count}\`);
    count++;
}

// While loop with condition
let sum: number = 0;
let num: number = 1;
while (num <= 10) {
    sum += num;
    num++;
}
console.log(\`Sum: \${sum}\`);

// While loop with typed array
let numbers: number[] = [1, 2, 3, 4, 5];
let index: number = 0;
while (index < numbers.length) {
    console.log(numbers[index]);
    index++;
}

// While loop with break and type safety
let total: number = 0;
while (true) {
    let input: number = parseInt(prompt("Enter number (0 to stop):") || "0");
    if (input === 0) {
        break;
    }
    total += input;
}
console.log(\`Total: \${total}\`);

// While loop with continue
let counter: number = 0;
while (counter < 10) {
    counter++;
    if (counter % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(counter);
}

// Type-safe condition function
function processUntilCondition(items: string[]): void {
    let i: number = 0;
    while (i < items.length) {
        const item: string = items[i];
        console.log(\`Processing: \${item}\`);
        i++;
    }
}

processUntilCondition(["a", "b", "c"]);`,
      csharp: `// C# - While loops
using System;

class Program {
    static void Main() {
        // Basic while loop
        int count = 0;
        while (count < 5) {
            Console.WriteLine($"Count: {count}");
            count++;
        }
        
        // While loop with condition
        int sum = 0;
        int num = 1;
        while (num <= 10) {
            sum += num;
            num++;
        }
        Console.WriteLine($"Sum: {sum}");
        
        // Do-while loop (executes at least once)
        int attempts = 0;
        string password;
        do {
            Console.Write("Enter password: ");
            password = Console.ReadLine();
            attempts++;
        } while (password != "secret" && attempts < 3);
        
        if (password == "secret") {
            Console.WriteLine("Access granted!");
        } else {
            Console.WriteLine("Too many attempts");
        }
        
        // While loop with array
        int[] numbers = {1, 2, 3, 4, 5};
        int index = 0;
        while (index < numbers.Length) {
            Console.WriteLine(numbers[index]);
            index++;
        }
        
        // While loop with break
        int total = 0;
        while (true) {
            Console.Write("Enter number (0 to stop): ");
            int input = int.Parse(Console.ReadLine());
            if (input == 0) {
                break;
            }
            total += input;
        }
        Console.WriteLine($"Total: {total}");
        
        // While loop with continue
        int counter = 0;
        while (counter < 10) {
            counter++;
            if (counter % 2 == 0) {
                continue;  // Skip even numbers
            }
            Console.WriteLine(counter);
        }
    }
}`,
    },
    hints: [
      'Always ensure the loop condition will eventually become false to avoid infinite loops.',
      'Use break to exit a loop early, and continue to skip the rest of the current iteration.',
      'Do-while loops guarantee at least one execution, useful for menu systems and input validation.',
    ],
    commonErrors: {
      python: ['Infinite loops from forgetting to update condition variables', 'Using assignment (=) instead of comparison (==)', 'Indentation errors in loop body'],
      cpp: ['Infinite loops from incorrect condition updates', 'Using assignment (=) instead of comparison (==)', 'Forgetting to increment counter'],
      javascript: ['Infinite loops', 'Using assignment (=) instead of comparison (===)', 'Forgetting to update counter'],
      java: ['Infinite loops from logic errors', 'Using assignment (=) instead of comparison (==)', 'Off-by-one errors'],
      typescript: ['Same as JavaScript plus type errors in conditions', 'Not handling null/undefined properly'],
      csharp: ['Infinite loops', 'Using assignment (=) instead of comparison (==)', 'Not breaking out of intentional infinite loops'],
    },
    quiz: [
      {
        question: 'What is the main difference between a while loop and a for loop?',
        options: ['While is faster', 'While checks condition before each iteration', 'For cannot be infinite', 'There is no difference'],
        correctAnswer: 1,
        explanation: 'While loops check the condition before each iteration and continue as long as it is true, making them ideal for unknown iteration counts.',
      },
      {
        question: 'When does a do-while loop check its condition?',
        options: ['Before first iteration', 'After each iteration', 'Never', 'Only once'],
        correctAnswer: 1,
        explanation: 'Do-while loops check the condition after each iteration, guaranteeing the body executes at least once.',
      },
    ],
    tryIt: 'Write a while loop that prints numbers from 10 down to 1, then prints "Liftoff!"',
  },
  {
    id: 'string-manipulation',
    title: 'String Manipulation - Working with Text',
    category: 'intermediate',
    order: 85,
    duration: '18 min',
    xpReward: 30,
    conceptText: `Strings are fundamental to programming because so much of what programs do involves text. User input comes as strings. File content is strings. Web pages are strings. Understanding how to manipulate text effectively is essential for any programmer. Every language provides rich functionality for creating, modifying, searching, and transforming strings.

A string is a sequence of characters. In some languages, characters are individual letters or symbols. In others, they might be bytes or Unicode code points. These implementation details affect performance and behavior, but the conceptual model remains consistent. You can think of a string as an array of characters that you can access, iterate over, and modify.

String concatenation combines multiple strings into one. The plus operator works in most languages, joining strings end to end. Modern languages also provide template literals or string formatting that lets you embed expressions directly in strings. Instead of concatenating "Hello " with a name variable and an exclamation mark, you write a single template string with the variable interpolated. This makes code more readable and less error-prone.

Searching within strings is a common operation. You might need to find whether an email contains an at sign, locate where a substring appears, or check if text starts with a particular prefix. Languages provide methods like contains, indexOf, startsWith, and endsWith. Regular expressions take searching further, letting you match complex patterns. A regex can find all email addresses in text or validate that a string matches a specific format.

String immutability varies by language. In Python, Java, JavaScript, TypeScript, and C#, strings are immutable. When you modify a string, you create a new string rather than changing the original. This prevents bugs but means repeated modifications can be inefficient. C++ strings are mutable, allowing direct modification. Understanding your language's approach to string immutability affects how you write efficient string processing code.

Every language provides methods for common string operations. Converting to uppercase or lowercase. Trimming whitespace from the ends. Splitting strings into arrays on delimiters. Replacing substrings. Checking length. These operations appear across all six languages, though method names and exact behavior differ. Learning the string library for your language unlocks powerful text processing capabilities.`,
    diagram: 'String memory layout and common operations visualization',
    codeExamples: {
      python: `# Python - String Manipulation

# String creation and concatenation
first_name = "Alice"
last_name = "Johnson"
full_name = first_name + " " + last_name
print(full_name)  # Alice Johnson

# String formatting (modern f-strings)
age = 25
message = f"{first_name} is {age} years old"
print(message)

# Old-style formatting
message2 = "{} is {} years old".format(first_name, age)
print(message2)

# String methods
text = "  Hello, World!  "
print(text.upper())        # HELLO, WORLD!
print(text.lower())        # hello, world!
print(text.strip())        # Hello, World! (removes whitespace)
print(text.replace("World", "Python"))  # Hello, Python!

# String searching
email = "alice@example.com"
print("@" in email)              # True
print(email.index("@"))          # 5
print(email.startswith("alice")) # True
print(email.endswith(".com"))    # True

# String splitting and joining
sentence = "Python is awesome"
words = sentence.split()         # ['Python', 'is', 'awesome']
print(words)
rejoined = " ".join(words)       # Python is awesome
print(rejoined)

# String slicing
text = "Hello, World!"
print(text[0:5])      # Hello
print(text[7:])       # World!
print(text[:5])       # Hello
print(text[-6:])      # World!

# Multi-line strings
multiline = """This is
a multi-line
string"""
print(multiline)

# String length
print(len("Hello"))   # 5

# Character iteration
for char in "Hello":
    print(char)`,
      cpp: `// C++ - String Manipulation
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

int main() {
    // String creation and concatenation
    string firstName = "Alice";
    string lastName = "Johnson";
    string fullName = firstName + " " + lastName;
    cout << fullName << endl;
    
    // String with numbers
    int age = 25;
    string message = firstName + " is " + to_string(age) + " years old";
    cout << message << endl;
    
    // String methods
    string text = "  Hello, World!  ";
    
    // Convert to uppercase (transform)
    string upper = text;
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << upper << endl;
    
    // Convert to lowercase
    string lower = text;
    transform(lower.begin(), lower.end(), lower.begin(), ::tolower);
    cout << lower << endl;
    
    // Find substring
    string email = "alice@example.com";
    size_t pos = email.find("@");
    cout << "@ at position: " << pos << endl;
    
    // Check if contains
    if (email.find("@") != string::npos) {
        cout << "Email contains @" << endl;
    }
    
    // Replace substring
    string original = "Hello, World!";
    size_t position = original.find("World");
    if (position != string::npos) {
        original.replace(position, 5, "C++");
    }
    cout << original << endl;
    
    // String length
    cout << "Length: " << text.length() << endl;
    
    // Substring
    string sub = text.substr(2, 5);  // Start at 2, length 5
    cout << sub << endl;
    
    // Character access
    cout << "First char: " << text[0] << endl;
    
    // Iterate characters
    for (char c : "Hello") {
        cout << c << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - String Manipulation

// String creation and concatenation
let firstName = "Alice";
let lastName = "Johnson";
let fullName = firstName + " " + lastName;
console.log(fullName);

// Template literals (modern way)
let age = 25;
let message = \`\${firstName} is \${age} years old\`;
console.log(message);

// Multi-line strings with template literals
let multiline = \`This is
a multi-line
string\`;
console.log(multiline);

// String methods
let text = "  Hello, World!  ";
console.log(text.toUpperCase());     // HELLO, WORLD!
console.log(text.toLowerCase());     // hello, world!
console.log(text.trim());            // Hello, World!
console.log(text.replace("World", "JavaScript"));

// String searching
let email = "alice@example.com";
console.log(email.includes("@"));         // true
console.log(email.indexOf("@"));          // 5
console.log(email.startsWith("alice"));   // true
console.log(email.endsWith(".com"));      // true

// String splitting and joining
let sentence = "JavaScript is awesome";
let words = sentence.split(" ");
console.log(words);  // ['JavaScript', 'is', 'awesome']
let rejoined = words.join(" ");
console.log(rejoined);

// String slicing
console.log(text.slice(0, 5));     // Hello
console.log(text.slice(7));        // World!
console.log(text.slice(-6));       // World!

// String length
console.log("Hello".length);       // 5

// Character access
console.log(text[0]);              // First character
console.log(text.charAt(0));       // First character

// Character iteration
for (let char of "Hello") {
    console.log(char);
}

// Repeat string
console.log("Ha".repeat(3));       // HaHaHa`,
      java: `// Java - String Manipulation
public class Main {
    public static void main(String[] args) {
        // String creation and concatenation
        String firstName = "Alice";
        String lastName = "Johnson";
        String fullName = firstName + " " + lastName;
        System.out.println(fullName);
        
        // String formatting
        int age = 25;
        String message = String.format("%s is %d years old", firstName, age);
        System.out.println(message);
        
        // String methods
        String text = "  Hello, World!  ";
        System.out.println(text.toUpperCase());      // HELLO, WORLD!
        System.out.println(text.toLowerCase());      // hello, world!
        System.out.println(text.trim());             // Hello, World!
        System.out.println(text.replace("World", "Java"));
        
        // String searching
        String email = "alice@example.com";
        System.out.println(email.contains("@"));           // true
        System.out.println(email.indexOf("@"));            // 5
        System.out.println(email.startsWith("alice"));     // true
        System.out.println(email.endsWith(".com"));        // true
        
        // String splitting and joining
        String sentence = "Java is awesome";
        String[] words = sentence.split(" ");
        for (String word : words) {
            System.out.println(word);
        }
        String rejoined = String.join(" ", words);
        System.out.println(rejoined);
        
        // Substring
        System.out.println(text.substring(2, 7));    // Start 2, end 7
        System.out.println(text.substring(7));       // From 7 to end
        
        // String length
        System.out.println("Hello".length());        // 5
        
        // Character access
        System.out.println(text.charAt(0));          // First character
        
        // Character iteration
        for (int i = 0; i < "Hello".length(); i++) {
            System.out.println("Hello".charAt(i));
        }
        
        // String comparison
        String str1 = "Hello";
        String str2 = "Hello";
        System.out.println(str1.equals(str2));       // true (content)
        System.out.println(str1 == str2);            // true (same object)
        
        // StringBuilder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        System.out.println(sb.toString());
    }
}`,
      typescript: `// TypeScript - String Manipulation with types

// String creation and concatenation
let firstName: string = "Alice";
let lastName: string = "Johnson";
let fullName: string = firstName + " " + lastName;
console.log(fullName);

// Template literals (type-safe)
let age: number = 25;
let message: string = \`\${firstName} is \${age} years old\`;
console.log(message);

// String methods with type safety
let text: string = "  Hello, World!  ";
console.log(text.toUpperCase());     // HELLO, WORLD!
console.log(text.toLowerCase());     // hello, world!
console.log(text.trim());            // Hello, World!
console.log(text.replace("World", "TypeScript"));

// String searching (type-safe returns)
let email: string = "alice@example.com";
let hasAt: boolean = email.includes("@");
let atIndex: number = email.indexOf("@");
let startsWithAlice: boolean = email.startsWith("alice");
let endsWithCom: boolean = email.endsWith(".com");

console.log(hasAt, atIndex, startsWithAlice, endsWithCom);

// String splitting (typed array)
let sentence: string = "TypeScript is awesome";
let words: string[] = sentence.split(" ");
console.log(words);
let rejoined: string = words.join(" ");
console.log(rejoined);

// String slicing
console.log(text.slice(0, 5));
console.log(text.slice(7));

// String length
let length: number = "Hello".length;
console.log(length);

// Type-safe string operations
function formatEmail(name: string, domain: string): string {
    return \`\${name.toLowerCase()}@\${domain.toLowerCase()}\`;
}

console.log(formatEmail("Alice", "Example.COM"));

// String literal types
type Status = "pending" | "approved" | "rejected";
let status: Status = "approved";
console.log(status.toUpperCase());`,
      csharp: `// C# - String Manipulation
using System;
using System.Linq;

class Program {
    static void Main() {
        // String creation and concatenation
        string firstName = "Alice";
        string lastName = "Johnson";
        string fullName = firstName + " " + lastName;
        Console.WriteLine(fullName);
        
        // String interpolation (modern C#)
        int age = 25;
        string message = $"{firstName} is {age} years old";
        Console.WriteLine(message);
        
        // String methods
        string text = "  Hello, World!  ";
        Console.WriteLine(text.ToUpper());       // HELLO, WORLD!
        Console.WriteLine(text.ToLower());       // hello, world!
        Console.WriteLine(text.Trim());          // Hello, World!
        Console.WriteLine(text.Replace("World", "C#"));
        
        // String searching
        string email = "alice@example.com";
        Console.WriteLine(email.Contains("@"));          // true
        Console.WriteLine(email.IndexOf("@"));           // 5
        Console.WriteLine(email.StartsWith("alice"));    // true
        Console.WriteLine(email.EndsWith(".com"));       // true
        
        // String splitting and joining
        string sentence = "C# is awesome";
        string[] words = sentence.Split(' ');
        foreach (string word in words) {
            Console.WriteLine(word);
        }
        string rejoined = string.Join(" ", words);
        Console.WriteLine(rejoined);
        
        // Substring
        Console.WriteLine(text.Substring(2, 5));   // Start 2, length 5
        Console.WriteLine(text.Substring(7));      // From 7 to end
        
        // String length
        Console.WriteLine("Hello".Length);         // 5
        
        // Character access
        Console.WriteLine(text[0]);                // First character
        
        // Character iteration
        foreach (char c in "Hello") {
            Console.WriteLine(c);
        }
        
        // String comparison
        string str1 = "Hello";
        string str2 = "Hello";
        Console.WriteLine(str1 == str2);           // true
        Console.WriteLine(str1.Equals(str2));      // true
        
        // StringBuilder for efficient concatenation
        var sb = new System.Text.StringBuilder();
        sb.Append("Hello");
        sb.Append(" ");
        sb.Append("World");
        Console.WriteLine(sb.ToString());
        
        // LINQ on strings
        string result = new string(
            "Hello".Where(c => c != 'l').ToArray()
        );
        Console.WriteLine(result);  // Heo
    }
}`,
    },
    hints: [
      'Strings are immutable in most languages, so operations like replace create new strings.',
      'Use template literals or string interpolation instead of concatenation for readability.',
      'For many string modifications, use StringBuilder (Java/C#) or join list (Python) for efficiency.',
    ],
    commonErrors: {
      python: ['Forgetting strings are immutable', 'Using + for large string concatenations (inefficient)', 'Index out of range errors'],
      cpp: ['Confusing C-style strings with std::string', 'Not checking if find returns npos', 'Buffer overflows with C-style strings'],
      javascript: ['Comparing strings with == instead of ===', 'Forgetting string methods return new strings', 'Not handling empty strings'],
      java: ['Using == to compare strings instead of .equals()', 'Inefficient string concatenation in loops', 'NullPointerException'],
      typescript: ['Same as JavaScript plus type mismatches', 'Not checking for null/undefined', 'Type assertions gone wrong'],
      csharp: ['Using == when Equals is more appropriate', 'Not using StringBuilder for many concatenations', 'Null reference exceptions'],
    },
    quiz: [
      {
        question: 'Why are strings immutable in most languages?',
        options: ['To save memory', 'To prevent bugs and enable optimizations', 'To make them slower', 'They are not immutable'],
        correctAnswer: 1,
        explanation: 'String immutability prevents bugs from unexpected modifications and enables optimizations like string interning.',
      },
      {
        question: 'Which is more efficient for building a string in a loop?',
        options: ['Concatenating with +', 'Using StringBuilder/StringBuffer', 'No difference', 'Using arrays'],
        correctAnswer: 1,
        explanation: 'StringBuilder avoids creating many intermediate string objects, making it much more efficient for repeated concatenation.',
      },
    ],
    tryIt: 'Create a function that takes a full name string and returns it with the last name first, followed by a comma and the first name.',
  },
];

// MORE CONTROL FLOW LESSONS
export const MORE_CONTROL_FLOW_LESSONS: LessonStructure[] = [
  {
    id: 'while-loops',
    title: 'While Loops - Conditional Repetition',
    category: 'intermediate',
    order: 80,
    duration: '12 min',
    xpReward: 25,
    conceptText: `While loops represent a different approach to repetition than for loops. Instead of iterating a specific number of times, while loops continue executing as long as a condition remains true. This makes them ideal for situations where you don't know in advance how many iterations you need. The loop runs until something happens that makes the condition false.

Think about reading input until the user types "quit", or processing items from a queue until it's empty, or retrying a network request until it succeeds. These scenarios don't have a predetermined iteration count. You need to keep looping while a condition holds. This is where while loops excel.

The structure of a while loop is simpler than a for loop. You specify only a condition. Before each iteration, the program evaluates that condition. If true, the loop body executes. If false, the loop terminates and execution continues with the next statement. This simplicity makes while loops more flexible but also more prone to infinite loops if you forget to update the condition.

Infinite loops are a common pitfall with while loops. If the condition never becomes false, the loop runs forever. Your program appears to freeze. Always ensure that something inside the loop will eventually make the condition false. Usually this means modifying a variable that the condition tests, or including a break statement that exits the loop under certain circumstances.

Different languages use virtually identical syntax for while loops. Python, JavaScript, TypeScript, Java, C++, and C# all use the keyword while followed by a condition in parentheses or not, then a code block. This consistency across languages makes while loops easy to recognize. The key difference lies in how each language handles the condition expression and what counts as true or false.

Do-while loops, available in some languages, guarantee at least one execution before checking the condition. The condition check happens at the end rather than the beginning. This is useful when you need to execute the loop body once before deciding whether to continue. Not all languages have do-while, but the concept appears in various forms across programming paradigms.`,
    diagram: 'Flowchart showing while loop with condition check and loop body',
    codeExamples: {
      python: `# Python - While loops

# Basic while loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Loop until user input
user_input = ""
while user_input != "quit":
    user_input = input("Enter command (or 'quit'): ")
    print(f"You entered: {user_input}")

# Processing until empty
items = [1, 2, 3, 4, 5]
while items:
    item = items.pop()
    print(f"Processing: {item}")

# Break statement
count = 0
while True:
    print(f"Count: {count}")
    count += 1
    if count >= 5:
        break

# Continue statement
count = 0
while count < 10:
    count += 1
    if count % 2 == 0:
        continue  # Skip even numbers
    print(f"Odd number: {count}")

# While with else (Python-specific)
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Loop completed normally")`,
      cpp: `// C++ - While loops
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // Basic while loop
    int count = 0;
    while (count < 5) {
        cout << "Count: " << count << endl;
        count++;
    }
    
    // Do-while loop (executes at least once)
    int num;
    do {
        cout << "Enter a positive number: ";
        cin >> num;
    } while (num <= 0);
    
    // Processing vector
    vector<int> items = {1, 2, 3, 4, 5};
    while (!items.empty()) {
        int item = items.back();
        items.pop_back();
        cout << "Processing: " << item << endl;
    }
    
    // Break statement
    count = 0;
    while (true) {
        cout << "Count: " << count << endl;
        count++;
        if (count >= 5) {
            break;
        }
    }
    
    // Continue statement
    count = 0;
    while (count < 10) {
        count++;
        if (count % 2 == 0) {
            continue;
        }
        cout << "Odd number: " << count << endl;
    }
    
    return 0;
}`,
      javascript: `// JavaScript - While loops

// Basic while loop
let count = 0;
while (count < 5) {
    console.log(\`Count: \${count}\`);
    count++;
}

// Do-while loop (executes at least once)
let num;
do {
    num = parseInt(prompt("Enter a positive number:"));
} while (num <= 0 || isNaN(num));

// Processing array
let items = [1, 2, 3, 4, 5];
while (items.length > 0) {
    let item = items.pop();
    console.log(\`Processing: \${item}\`);
}

// Break statement
count = 0;
while (true) {
    console.log(\`Count: \${count}\`);
    count++;
    if (count >= 5) {
        break;
    }
}

// Continue statement
count = 0;
while (count < 10) {
    count++;
    if (count % 2 === 0) {
        continue;
    }
    console.log(\`Odd number: \${count}\`);
}

// Reading from stream
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let running = true;
function processInput() {
    while (running) {
        rl.question('Command: ', (answer) => {
            if (answer === 'quit') {
                running = false;
                rl.close();
            }
        });
    }
}`,
      java: `// Java - While loops
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Basic while loop
        int count = 0;
        while (count < 5) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // Do-while loop (executes at least once)
        Scanner scanner = new Scanner(System.in);
        int num;
        do {
            System.out.print("Enter a positive number: ");
            num = scanner.nextInt();
        } while (num <= 0);
        
        // Processing list
        List<Integer> items = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        while (!items.isEmpty()) {
            int item = items.remove(items.size() - 1);
            System.out.println("Processing: " + item);
        }
        
        // Break statement
        count = 0;
        while (true) {
            System.out.println("Count: " + count);
            count++;
            if (count >= 5) {
                break;
            }
        }
        
        // Continue statement
        count = 0;
        while (count < 10) {
            count++;
            if (count % 2 == 0) {
                continue;
            }
            System.out.println("Odd number: " + count);
        }
        
        scanner.close();
    }
}`,
      typescript: `// TypeScript - While loops with types

// Basic while loop
let count: number = 0;
while (count < 5) {
    console.log(\`Count: \${count}\`);
    count++;
}

// Do-while loop (executes at least once)
let num: number;
do {
    num = parseInt(prompt("Enter a positive number:") || "0");
} while (num <= 0 || isNaN(num));

// Processing array with types
let items: number[] = [1, 2, 3, 4, 5];
while (items.length > 0) {
    let item: number | undefined = items.pop();
    if (item !== undefined) {
        console.log(\`Processing: \${item}\`);
    }
}

// Break statement
count = 0;
while (true) {
    console.log(\`Count: \${count}\`);
    count++;
    if (count >= 5) {
        break;
    }
}

// Continue statement
count = 0;
while (count < 10) {
    count++;
    if (count % 2 === 0) {
        continue;
    }
    console.log(\`Odd number: \${count}\`);
}

// Type-safe loop condition
interface Task {
    id: number;
    completed: boolean;
}

let tasks: Task[] = [
    {id: 1, completed: false},
    {id: 2, completed: true},
    {id: 3, completed: false}
];

let index: number = 0;
while (index < tasks.length) {
    if (!tasks[index].completed) {
        console.log(\`Processing task \${tasks[index].id}\`);
    }
    index++;
}`,
      csharp: `// C# - While loops
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Basic while loop
        int count = 0;
        while (count < 5) {
            Console.WriteLine($"Count: {count}");
            count++;
        }
        
        // Do-while loop (executes at least once)
        int num;
        do {
            Console.Write("Enter a positive number: ");
            num = int.Parse(Console.ReadLine());
        } while (num <= 0);
        
        // Processing list
        List<int> items = new List<int> {1, 2, 3, 4, 5};
        while (items.Count > 0) {
            int item = items[items.Count - 1];
            items.RemoveAt(items.Count - 1);
            Console.WriteLine($"Processing: {item}");
        }
        
        // Break statement
        count = 0;
        while (true) {
            Console.WriteLine($"Count: {count}");
            count++;
            if (count >= 5) {
                break;
            }
        }
        
        // Continue statement
        count = 0;
        while (count < 10) {
            count++;
            if (count % 2 == 0) {
                continue;
            }
            Console.WriteLine($"Odd number: {count}");
        }
    }
}`,
    },
    hints: [
      'Always ensure the loop condition will eventually become false to avoid infinite loops.',
      'Use break to exit a loop early when a specific condition is met.',
      'Use continue to skip the rest of the current iteration and move to the next one.',
    ],
    commonErrors: {
      python: ['Infinite loop from never updating condition variable', 'Indentation errors in loop body', 'Modifying list while iterating'],
      cpp: ['Infinite loop from condition always true', 'Forgetting to increment counter', 'Using assignment (=) instead of comparison (==)'],
      javascript: ['Infinite loop blocking browser', 'Not handling asynchronous operations in loops', 'Type coercion in conditions'],
      java: ['Infinite loops', 'Off-by-one errors', 'ConcurrentModificationException when modifying collections'],
      typescript: ['Same as JavaScript plus type checking issues', 'Null/undefined in condition checks'],
      csharp: ['Infinite loops', 'Modifying collection during iteration', 'Not handling nullable types in conditions'],
    },
    quiz: [
      {
        question: 'What is the main difference between for loops and while loops?',
        options: ['While loops are faster', 'For loops iterate a specific number of times, while loops run until a condition is false', 'While loops cannot use break', 'They are exactly the same'],
        correctAnswer: 1,
        explanation: 'For loops are typically used when you know how many iterations you need, while loops continue until a condition becomes false.',
      },
    ],
    tryIt: 'Create a while loop that counts down from 10 to 0, printing each number.',
  },
  {
    id: 'string-manipulation',
    title: 'String Manipulation - Working with Text',
    category: 'intermediate',
    order: 85,
    duration: '18 min',
    xpReward: 30,
    conceptText: `Strings are fundamental to programming. Nearly every program processes text in some form, whether it's user input, file contents, network data, or output messages. Understanding how to manipulate strings efficiently is essential for building practical applications. Each programming language provides powerful tools for working with text, though the specific approaches vary.

A string is a sequence of characters. But this simple definition hides complexity. How are strings stored in memory? Are they mutable or immutable? How is their length calculated? Can they be indexed like arrays? These questions have different answers across languages. Python and Java treat strings as immutable objects. JavaScript and TypeScript follow the same pattern. C++ offers both mutable strings and character arrays. C# provides immutable strings plus a StringBuilder for efficient concatenation.

String concatenation combines multiple strings into one. The most straightforward approach uses the plus operator. However, this can be inefficient when concatenating many strings, because each concatenation creates a new string object. Modern languages provide better alternatives: template literals in JavaScript and TypeScript, f-strings in Python, StringBuilder in Java and C#, and stringstream in C++.

Searching within strings is a common operation. You might need to find whether a substring exists, locate its position, or extract parts of the string. Languages provide methods like contains, indexOf, substring, and split. Regular expressions offer even more powerful pattern matching, letting you find complex patterns and extract structured data from text.

String formatting lets you inject values into text templates. This is crucial for building user-facing messages, log entries, and formatted output. Python's f-strings provide elegant syntax. JavaScript and TypeScript use template literals with dollar-sign placeholders. C++ uses stringstream or printf-style formatting. Java offers String.format. C# provides string interpolation with dollar signs. Each approach balances readability and power.

Case conversion, trimming whitespace, replacing substrings, splitting on delimiters, and joining arrays into strings are everyday string operations. Mastering these basics enables you to process user input, parse data formats, generate output, and work with APIs. String manipulation is not glamorous, but it's the foundation of practical programming.`,
    diagram: 'String operations diagram showing concatenation, substring, and splitting',
    codeExamples: {
      python: `# Python - String manipulation

# Basic string operations
text = "Hello, World!"
print(f"Length: {len(text)}")
print(f"Uppercase: {text.upper()}")
print(f"Lowercase: {text.lower()}")

# String concatenation
first = "Hello"
last = "World"
greeting = first + " " + last
print(greeting)

# F-strings (formatted string literals)
name = "Alice"
age = 25
message = f"{name} is {age} years old"
print(message)

# Substring and indexing
text = "Python Programming"
print(f"First char: {text[0]}")
print(f"Last char: {text[-1]}")
print(f"Substring: {text[0:6]}")  # "Python"
print(f"From index 7: {text[7:]}")  # "Programming"

# String searching
text = "Hello, World!"
print(f"Contains 'World': {'World' in text}")
print(f"Index of 'World': {text.find('World')}")
print(f"Starts with 'Hello': {text.startswith('Hello')}")
print(f"Ends with '!': {text.endswith('!')}")

# String replacement
text = "Hello, World!"
new_text = text.replace("World", "Python")
print(new_text)  # "Hello, Python!"

# Splitting and joining
sentence = "Python is amazing"
words = sentence.split(" ")
print(words)  # ['Python', 'is', 'amazing']

joined = "-".join(words)
print(joined)  # "Python-is-amazing"

# Trimming whitespace
text = "  Hello  "
print(f"Trimmed: '{text.strip()}'")
print(f"Left trim: '{text.lstrip()}'")
print(f"Right trim: '{text.rstrip()}'")

# Character checking
print(f"Is digit: {'123'.isdigit()}")
print(f"Is alpha: {'abc'.isalpha()}")
print(f"Is alphanumeric: {'abc123'.isalnum()}")`,
      cpp: `// C++ - String manipulation
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    // Basic string operations
    string text = "Hello, World!";
    cout << "Length: " << text.length() << endl;
    
    // Case conversion
    string upper = text;
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << "Uppercase: " << upper << endl;
    
    // String concatenation
    string first = "Hello";
    string last = "World";
    string greeting = first + " " + last;
    cout << greeting << endl;
    
    // String formatting with stringstream
    string name = "Alice";
    int age = 25;
    stringstream ss;
    ss << name << " is " << age << " years old";
    cout << ss.str() << endl;
    
    // Substring and indexing
    text = "C++ Programming";
    cout << "First char: " << text[0] << endl;
    cout << "Substring: " << text.substr(0, 3) << endl;  // "C++"
    cout << "From index 4: " << text.substr(4) << endl;
    
    // String searching
    text = "Hello, World!";
    size_t pos = text.find("World");
    if (pos != string::npos) {
        cout << "Found 'World' at: " << pos << endl;
    }
    
    // String replacement
    text = "Hello, World!";
    text.replace(text.find("World"), 5, "C++");
    cout << text << endl;
    
    // Splitting (manual)
    string sentence = "C++ is powerful";
    stringstream ss2(sentence);
    string word;
    vector<string> words;
    while (ss2 >> word) {
        words.push_back(word);
    }
    
    // Trimming (manual or use algorithms)
    text = "  Hello  ";
    text.erase(0, text.find_first_not_of(" "));
    text.erase(text.find_last_not_of(" ") + 1);
    cout << "Trimmed: '" << text << "'" << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - String manipulation

// Basic string operations
let text = "Hello, World!";
console.log(\`Length: \${text.length}\`);
console.log(\`Uppercase: \${text.toUpperCase()}\`);
console.log(\`Lowercase: \${text.toLowerCase()}\`);

// String concatenation
let first = "Hello";
let last = "World";
let greeting = first + " " + last;
console.log(greeting);

// Template literals
let name = "Alice";
let age = 25;
let message = \`\${name} is \${age} years old\`;
console.log(message);

// Substring and indexing
text = "JavaScript Programming";
console.log(\`First char: \${text[0]}\`);
console.log(\`Last char: \${text[text.length - 1]}\`);
console.log(\`Substring: \${text.substring(0, 10)}\`);  // "JavaScript"
console.log(\`Slice: \${text.slice(11)}\`);  // "Programming"

// String searching
text = "Hello, World!";
console.log(\`Includes 'World': \${text.includes('World')}\`);
console.log(\`Index of 'World': \${text.indexOf('World')}\`);
console.log(\`Starts with 'Hello': \${text.startsWith('Hello')}\`);
console.log(\`Ends with '!': \${text.endsWith('!')}\`);

// String replacement
text = "Hello, World!";
let newText = text.replace("World", "JavaScript");
console.log(newText);  // "Hello, JavaScript!"

// Replace all occurrences
text = "a b a c a";
let allReplaced = text.replaceAll("a", "x");
console.log(allReplaced);  // "x b x c x"

// Splitting and joining
let sentence = "JavaScript is versatile";
let words = sentence.split(" ");
console.log(words);  // ['JavaScript', 'is', 'versatile']

let joined = words.join("-");
console.log(joined);  // "JavaScript-is-versatile"

// Trimming whitespace
text = "  Hello  ";
console.log(\`Trimmed: '\${text.trim()}'\`);
console.log(\`Left trim: '\${text.trimStart()}'\`);
console.log(\`Right trim: '\${text.trimEnd()}'\`);

// Padding
let num = "5";
console.log(num.padStart(3, "0"));  // "005"
console.log(num.padEnd(3, "0"));    // "500"`,
      java: `// Java - String manipulation
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Basic string operations
        String text = "Hello, World!";
        System.out.println("Length: " + text.length());
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());
        
        // String concatenation
        String first = "Hello";
        String last = "World";
        String greeting = first + " " + last;
        System.out.println(greeting);
        
        // String formatting
        String name = "Alice";
        int age = 25;
        String message = String.format("%s is %d years old", name, age);
        System.out.println(message);
        
        // StringBuilder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        sb.append("Java");
        sb.append(" ");
        sb.append("Programming");
        System.out.println(sb.toString());
        
        // Substring and indexing
        text = "Java Programming";
        System.out.println("First char: " + text.charAt(0));
        System.out.println("Substring: " + text.substring(0, 4));  // "Java"
        System.out.println("From index 5: " + text.substring(5));
        
        // String searching
        text = "Hello, World!";
        System.out.println("Contains 'World': " + text.contains("World"));
        System.out.println("Index of 'World': " + text.indexOf("World"));
        System.out.println("Starts with 'Hello': " + text.startsWith("Hello"));
        System.out.println("Ends with '!': " + text.endsWith("!"));
        
        // String replacement
        text = "Hello, World!";
        String newText = text.replace("World", "Java");
        System.out.println(newText);
        
        // Splitting and joining
        String sentence = "Java is powerful";
        String[] words = sentence.split(" ");
        System.out.println(Arrays.toString(words));
        
        String joined = String.join("-", words);
        System.out.println(joined);
        
        // Trimming whitespace
        text = "  Hello  ";
        System.out.println("Trimmed: '" + text.trim() + "'");
        
        // Character checking
        System.out.println("Is empty: " + "".isEmpty());
        System.out.println("Is blank: " + "   ".isBlank());
    }
}`,
      typescript: `// TypeScript - String manipulation with types

// Basic string operations
let text: string = "Hello, World!";
console.log(\`Length: \${text.length}\`);
console.log(\`Uppercase: \${text.toUpperCase()}\`);
console.log(\`Lowercase: \${text.toLowerCase()}\`);

// String concatenation with types
let first: string = "Hello";
let last: string = "World";
let greeting: string = first + " " + last;
console.log(greeting);

// Template literals with types
let name: string = "Alice";
let age: number = 25;
let message: string = \`\${name} is \${age} years old\`;
console.log(message);

// Substring and indexing
text = "TypeScript Programming";
console.log(\`First char: \${text[0]}\`);
console.log(\`Substring: \${text.substring(0, 10)}\`);

// String searching with type safety
text = "Hello, World!";
let includesWorld: boolean = text.includes('World');
let indexOfWorld: number = text.indexOf('World');
console.log(\`Includes 'World': \${includesWorld}\`);
console.log(\`Index: \${indexOfWorld}\`);

// String replacement
text = "Hello, World!";
let newText: string = text.replace("World", "TypeScript");
console.log(newText);

// Splitting with typed array
let sentence: string = "TypeScript is typed";
let words: string[] = sentence.split(" ");
console.log(words);

let joined: string = words.join("-");
console.log(joined);

// Type-safe string operations
interface User {
    firstName: string;
    lastName: string;
}

function getFullName(user: User): string {
    return \`\${user.firstName} \${user.lastName}\`;
}

let user: User = {firstName: "John", lastName: "Doe"};
console.log(getFullName(user));

// String literal types
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): string {
    return \`Moving \${direction}\`;
}

console.log(move("north"));  // OK
// console.log(move("up"));  // Error: not in type`,
      csharp: `// C# - String manipulation
using System;
using System.Text;
using System.Linq;

class Program {
    static void Main() {
        // Basic string operations
        string text = "Hello, World!";
        Console.WriteLine($"Length: {text.Length}");
        Console.WriteLine($"Uppercase: {text.ToUpper()}");
        Console.WriteLine($"Lowercase: {text.ToLower()}");
        
        // String concatenation
        string first = "Hello";
        string last = "World";
        string greeting = first + " " + last;
        Console.WriteLine(greeting);
        
        // String interpolation
        string name = "Alice";
        int age = 25;
        string message = $"{name} is {age} years old";
        Console.WriteLine(message);
        
        // StringBuilder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        sb.Append("C#");
        sb.Append(" ");
        sb.Append("Programming");
        Console.WriteLine(sb.ToString());
        
        // Substring and indexing
        text = "C# Programming";
        Console.WriteLine($"First char: {text[0]}");
        Console.WriteLine($"Substring: {text.Substring(0, 2)}");  // "C#"
        Console.WriteLine($"From index 3: {text.Substring(3)}");
        
        // String searching
        text = "Hello, World!";
        Console.WriteLine($"Contains 'World': {text.Contains("World")}");
        Console.WriteLine($"Index of 'World': {text.IndexOf("World")}");
        Console.WriteLine($"Starts with 'Hello': {text.StartsWith("Hello")}");
        Console.WriteLine($"Ends with '!': {text.EndsWith("!")}");
        
        // String replacement
        text = "Hello, World!";
        string newText = text.Replace("World", "C#");
        Console.WriteLine(newText);
        
        // Splitting and joining
        string sentence = "C# is modern";
        string[] words = sentence.Split(' ');
        Console.WriteLine(string.Join(", ", words));
        
        string joined = string.Join("-", words);
        Console.WriteLine(joined);
        
        // Trimming whitespace
        text = "  Hello  ";
        Console.WriteLine($"Trimmed: '{text.Trim()}'");
        Console.WriteLine($"Left trim: '{text.TrimStart()}'");
        Console.WriteLine($"Right trim: '{text.TrimEnd()}'");
        
        // LINQ with strings
        string result = new string(text.Where(c => !char.IsWhiteSpace(c)).ToArray());
        Console.WriteLine($"No spaces: '{result}'");
    }
}`,
    },
    hints: [
      'Strings are immutable in most languages - operations like replace return new strings rather than modifying the original.',
      'Use StringBuilder (Java/C#) or similar tools when concatenating many strings in a loop for better performance.',
      'Template literals and f-strings provide cleaner syntax than string concatenation for formatted output.',
    ],
    commonErrors: {
      python: ['Forgetting strings are immutable', 'Concatenating in loops without join', 'Wrong slice indices'],
      cpp: ['Buffer overflows with C-style strings', 'Not handling empty strings', 'Inefficient string concatenation in loops'],
      javascript: ['Confusing substring, substr, and slice methods', 'Not handling null/undefined strings', 'Type coercion surprises'],
      java: ['Using + for concatenation in loops instead of StringBuilder', 'Comparing strings with == instead of equals()', 'Not handling null strings'],
      typescript: ['Same as JavaScript plus type safety issues', 'Not handling null/undefined in string operations'],
      csharp: ['Using + for concatenation in loops instead of StringBuilder', 'Comparing with == when case-insensitive comparison needed', 'Not handling null strings'],
    },
    quiz: [
      {
        question: 'Why is StringBuilder recommended for concatenating many strings in a loop?',
        options: ['It makes code shorter', 'It avoids creating many temporary string objects', 'It is required by the language', 'It handles null values better'],
        correctAnswer: 1,
        explanation: 'StringBuilder is more efficient because strings are immutable, so each concatenation with + creates a new string object. StringBuilder modifies a mutable buffer.',
      },
    ],
    tryIt: 'Create a string with your name, convert it to uppercase, reverse it, and print the result.',
  },
];

// RECURSION AND ADVANCED LESSONS
export const RECURSION_LESSONS: LessonStructure[] = [
  {
    id: 'recursion-basics',
    title: 'Recursion - Functions Calling Themselves',
    category: 'advanced',
    order: 90,
    duration: '20 min',
    xpReward: 40,
    conceptText: `Recursion is one of the most elegant and powerful concepts in programming. A recursive function is one that calls itself, breaking down a problem into smaller instances of the same problem until reaching a base case that can be solved directly. This approach mirrors how we naturally think about certain problems and enables concise solutions to complex challenges.

Consider calculating a factorial. Five factorial equals five times four factorial, which equals four times three factorial, and so on. Eventually you reach one factorial, which equals one. This is the base case that stops the recursion. Each recursive call solves a smaller version of the original problem until the solution becomes trivial.

The key to recursion is the base case. Without it, your function calls itself forever, leading to a stack overflow error. Every recursive function needs at least one condition that stops the recursion and returns a value without making another recursive call. This base case is crucial for the function to eventually terminate.

Understanding the call stack helps demystify recursion. When a function calls itself, the original call pauses and waits. The new call executes, potentially making its own recursive call. Each call creates a new frame on the call stack with its own local variables. When a call completes, its frame is removed and control returns to the previous call. This stack of waiting function calls grows with each recursion and shrinks as they complete.

Different languages handle recursion with varying efficiency. Some languages optimize tail recursion, where the recursive call is the last operation in the function. This optimization reuses the current stack frame instead of creating a new one, preventing stack overflow for deep recursion. Python lacks this optimization. JavaScript recently added it. C++ and Java compilers may optimize tail recursion. Functional languages like Scheme guarantee it.

Recursion shines with naturally recursive problems like tree traversal, graph exploration, divide-and-conquer algorithms, and mathematical sequences. The recursive solution often mirrors the problem definition more directly than an iterative approach. However, recursion can be less efficient due to function call overhead and stack space usage. Understanding when to use recursion versus iteration is an important programming skill.`,
    diagram: 'Call stack diagram showing recursive function calls building up and unwinding',
    codeExamples: {
      python: `# Python - Recursion examples

# Basic factorial
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(f"5! = {factorial(5)}")  # 120

# Fibonacci sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Fibonacci 7: {fibonacci(7)}")  # 13

# Sum of list (recursive)
def sum_list(numbers):
    if not numbers:
        return 0
    return numbers[0] + sum_list(numbers[1:])

print(f"Sum: {sum_list([1, 2, 3, 4, 5])}")  # 15

# Countdown
def countdown(n):
    if n <= 0:
        print("Blast off!")
        return
    print(n)
    countdown(n - 1)

countdown(5)

# Binary search (recursive)
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)

arr = [1, 3, 5, 7, 9, 11, 13]
result = binary_search(arr, 7, 0, len(arr) - 1)
print(f"Found at index: {result}")`,
      cpp: `// C++ - Recursion examples
#include <iostream>
#include <vector>
using namespace std;

// Basic factorial
int factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

// Fibonacci sequence
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Sum of array
int sumArray(vector<int>& arr, int index) {
    if (index >= arr.size()) {
        return 0;
    }
    return arr[index] + sumArray(arr, index + 1);
}

// Countdown
void countdown(int n) {
    if (n <= 0) {
        cout << "Blast off!" << endl;
        return;
    }
    cout << n << endl;
    countdown(n - 1);
}

// Binary search
int binarySearch(vector<int>& arr, int target, int left, int right) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    } else {
        return binarySearch(arr, target, mid + 1, right);
    }
}

int main() {
    cout << "5! = " << factorial(5) << endl;
    cout << "Fibonacci 7: " << fibonacci(7) << endl;
    
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Sum: " << sumArray(numbers, 0) << endl;
    
    countdown(5);
    
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << "Found at index: " << binarySearch(arr, 7, 0, arr.size() - 1) << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Recursion examples

// Basic factorial
function factorial(n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

console.log(\`5! = \${factorial(5)}\`);  // 120

// Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(\`Fibonacci 7: \${fibonacci(7)}\`);  // 13

// Sum of array
function sumArray(arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr[0] + sumArray(arr.slice(1));
}

console.log(\`Sum: \${sumArray([1, 2, 3, 4, 5])}\`);  // 15

// Countdown
function countdown(n) {
    if (n <= 0) {
        console.log("Blast off!");
        return;
    }
    console.log(n);
    countdown(n - 1);
}

countdown(5);

// Binary search (recursive)
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    } else {
        return binarySearch(arr, target, mid + 1, right);
    }
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(\`Found at index: \${binarySearch(arr, 7)}\`);

// Flatten nested arrays (deep recursion)
function flatten(arr) {
    let result = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

const nested = [1, [2, [3, 4], 5], 6];
console.log(flatten(nested));  // [1, 2, 3, 4, 5, 6]`,
      java: `// Java - Recursion examples
import java.util.*;

public class Main {
    // Basic factorial
    public static int factorial(int n) {
        // Base case
        if (n <= 1) {
            return 1;
        }
        // Recursive case
        return n * factorial(n - 1);
    }
    
    // Fibonacci sequence
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Sum of array
    public static int sumArray(int[] arr, int index) {
        if (index >= arr.length) {
            return 0;
        }
        return arr[index] + sumArray(arr, index + 1);
    }
    
    // Countdown
    public static void countdown(int n) {
        if (n <= 0) {
            System.out.println("Blast off!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);
    }
    
    // Binary search
    public static int binarySearch(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] > target) {
            return binarySearch(arr, target, left, mid - 1);
        } else {
            return binarySearch(arr, target, mid + 1, right);
        }
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("Fibonacci 7: " + fibonacci(7));
        
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Sum: " + sumArray(numbers, 0));
        
        countdown(5);
        
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        System.out.println("Found at index: " + binarySearch(arr, 7, 0, arr.length - 1));
    }
}`,
      typescript: `// TypeScript - Recursion with type safety

// Basic factorial
function factorial(n: number): number {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

console.log(\`5! = \${factorial(5)}\`);

// Fibonacci sequence
function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(\`Fibonacci 7: \${fibonacci(7)}\`);

// Sum of array with types
function sumArray(arr: number[]): number {
    if (arr.length === 0) {
        return 0;
    }
    return arr[0] + sumArray(arr.slice(1));
}

console.log(\`Sum: \${sumArray([1, 2, 3, 4, 5])}\`);

// Countdown
function countdown(n: number): void {
    if (n <= 0) {
        console.log("Blast off!");
        return;
    }
    console.log(n);
    countdown(n - 1);
}

countdown(5);

// Binary search with typed parameters
function binarySearch(
    arr: number[], 
    target: number, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) {
        return -1;
    }
    
    const mid: number = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    } else {
        return binarySearch(arr, target, mid + 1, right);
    }
}

const arr: number[] = [1, 3, 5, 7, 9, 11, 13];
console.log(\`Found at index: \${binarySearch(arr, 7)}\`);

// Tree node type
interface TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
}

// Tree traversal (recursive)
function traverseTree<T>(node: TreeNode<T>, depth: number = 0): void {
    console.log(\`\${'  '.repeat(depth)}\${node.value}\`);
    for (const child of node.children) {
        traverseTree(child, depth + 1);
    }
}

const tree: TreeNode<string> = {
    value: 'root',
    children: [
        { value: 'child1', children: [] },
        { value: 'child2', children: [
            { value: 'grandchild', children: [] }
        ]}
    ]
};

traverseTree(tree);`,
      csharp: `// C# - Recursion examples
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    // Basic factorial
    static int Factorial(int n) {
        // Base case
        if (n <= 1) {
            return 1;
        }
        // Recursive case
        return n * Factorial(n - 1);
    }
    
    // Fibonacci sequence
    static int Fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    // Sum of array
    static int SumArray(int[] arr, int index = 0) {
        if (index >= arr.Length) {
            return 0;
        }
        return arr[index] + SumArray(arr, index + 1);
    }
    
    // Countdown
    static void Countdown(int n) {
        if (n <= 0) {
            Console.WriteLine("Blast off!");
            return;
        }
        Console.WriteLine(n);
        Countdown(n - 1);
    }
    
    // Binary search
    static int BinarySearch(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] > target) {
            return BinarySearch(arr, target, left, mid - 1);
        } else {
            return BinarySearch(arr, target, mid + 1, right);
        }
    }
    
    // Reverse string (recursive)
    static string ReverseString(string str) {
        if (str.Length <= 1) {
            return str;
        }
        return ReverseString(str.Substring(1)) + str[0];
    }
    
    static void Main() {
        Console.WriteLine($"5! = {Factorial(5)}");
        Console.WriteLine($"Fibonacci 7: {Fibonacci(7)}");
        
        int[] numbers = {1, 2, 3, 4, 5};
        Console.WriteLine($"Sum: {SumArray(numbers)}");
        
        Countdown(5);
        
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        Console.WriteLine($"Found at index: {BinarySearch(arr, 7, 0, arr.Length - 1)}");
        
        Console.WriteLine($"Reversed: {ReverseString("hello")}");
    }
}`,
    },
    hints: [
      'Always define a base case that stops the recursion to prevent infinite loops and stack overflow.',
      'Each recursive call should work on a smaller or simpler version of the problem.',
      'The call stack has limited size - very deep recursion can cause stack overflow errors.',
    ],
    commonErrors: {
      python: ['Missing base case causing infinite recursion', 'Maximum recursion depth exceeded', 'Incorrect slice indexing in recursive calls'],
      cpp: ['Stack overflow from deep recursion', 'Missing return statement in recursive case', 'Passing arrays incorrectly to recursive calls'],
      javascript: ['Maximum call stack size exceeded', 'Forgetting to return the recursive call result', 'Creating new arrays unnecessarily in each call'],
      java: ['StackOverflowError from missing base case', 'Index errors in array recursion', 'Not passing updated indices to recursive calls'],
      typescript: ['Same as JavaScript plus type mismatches in return values', 'Generic type errors in tree recursion'],
      csharp: ['StackOverflowException', 'Incorrect string manipulation in recursive calls', 'Not handling empty collections in base case'],
    },
    quiz: [
      {
        question: 'What is the most important part of a recursive function?',
        options: ['The recursive call', 'The base case', 'The parameters', 'The return type'],
        correctAnswer: 1,
        explanation: 'The base case is crucial because it stops the recursion. Without it, the function would call itself forever, causing a stack overflow.',
      },
      {
        question: 'What happens when a recursive function calls itself?',
        options: ['The previous call is deleted', 'The previous call waits on the stack', 'Both calls run simultaneously', 'The program crashes'],
        correctAnswer: 1,
        explanation: 'When a function calls itself, the current call is paused and placed on the call stack while the new call executes.',
      },
    ],
    tryIt: 'Write a recursive function to calculate the power of a number (x^n) without using built-in exponentiation.',
  },
];

// DATA STRUCTURES LESSONS
export const DATA_STRUCTURE_LESSONS: LessonStructure[] = [
  {
    id: 'dictionaries-maps',
    title: 'Dictionaries and Maps - Key-Value Storage',
    category: 'intermediate',
    order: 95,
    duration: '18 min',
    xpReward: 30,
    conceptText: `Dictionaries and maps solve a fundamental problem: how do you efficiently store and retrieve data by a meaningful key rather than a numeric index? While arrays require you to remember positions, dictionaries let you use descriptive keys. This key-value storage pattern is ubiquitous in programming, powering everything from configuration files to database caching.

Think about a real dictionary. You look up words alphabetically, not by page number. Similarly, programming dictionaries map keys to values. You store a person's age under their name as the key. You look up a product's price using its ID. This direct access by key makes operations fast and code more readable than searching through arrays.

Different languages use different names for this data structure but the concept remains consistent. Python calls them dictionaries or dicts. JavaScript and TypeScript use objects and Maps. Java provides HashMap, TreeMap, and LinkedHashMap. C++ offers map and unordered_map from the Standard Template Library. C# has Dictionary and Hashtable. Despite naming differences, all provide key-value storage with efficient lookup.

The implementation matters for performance. Hash-based structures like Python's dict, JavaScript's Map, Java's HashMap, and C#'s Dictionary use hash functions to achieve average O(1) lookup time. Tree-based structures like Java's TreeMap and C++'s map keep keys sorted and provide O(log n) lookup. Understanding these performance characteristics helps you choose the right structure.

Keys must be unique within a dictionary. If you add a value with an existing key, it replaces the old value. This property makes dictionaries perfect for deduplication and counting occurrences. You can build a word frequency counter by using words as keys and incrementing their values. You can track user sessions by storing session data under user IDs.

Working with dictionaries means understanding iteration. Unlike arrays with numeric indices, dictionaries require iterating over keys, values, or key-value pairs. Each language provides methods for these iterations. Python offers keys(), values(), and items(). JavaScript Maps have keys(), values(), and entries(). Java uses keySet(), values(), and entrySet(). These iteration patterns enable processing entire dictionaries efficiently.`,
    diagram: 'Hash table diagram showing keys hashing to values',
    codeExamples: {
      python: `# Python - Dictionaries

# Creating dictionaries
person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}

# Accessing values
print(person["name"])  # Alice
print(person.get("age"))  # 25
print(person.get("email", "Not found"))  # Not found

# Adding/updating values
person["email"] = "alice@example.com"
person["age"] = 26  # Update existing

# Checking keys
if "name" in person:
    print("Name exists")

# Removing items
person.pop("city")
del person["email"]

# Iterating
for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key} = {value}")

# Dictionary methods
print(person.keys())    # Keys
print(person.values())  # Values

# Word frequency counter
text = "hello world hello python world"
word_count = {}
for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1

print(word_count)  # {'hello': 2, 'world': 2, 'python': 1}

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Nested dictionaries
students = {
    "alice": {"age": 20, "grade": "A"},
    "bob": {"age": 21, "grade": "B"}
}
print(students["alice"]["grade"])`,
      cpp: `// C++ - Map and unordered_map
#include <iostream>
#include <map>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    // Creating map (sorted keys)
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 35;
    
    // Accessing values
    cout << "Alice's age: " << ages["Alice"] << endl;
    
    // Check if key exists
    if (ages.find("Alice") != ages.end()) {
        cout << "Alice found" << endl;
    }
    
    // Iterating
    for (const auto& pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // Unordered map (faster, unsorted)
    unordered_map<string, string> capitals;
    capitals["USA"] = "Washington DC";
    capitals["UK"] = "London";
    capitals["France"] = "Paris";
    
    // Word frequency counter
    string text = "hello world hello cpp world";
    unordered_map<string, int> wordCount;
    
    // Simple word counting (manual tokenization)
    string word;
    for (char c : text) {
        if (c == ' ') {
            if (!word.empty()) {
                wordCount[word]++;
                word.clear();
            }
        } else {
            word += c;
        }
    }
    if (!word.empty()) {
        wordCount[word]++;
    }
    
    for (const auto& pair : wordCount) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // Removing items
    ages.erase("Bob");
    
    // Size
    cout << "Map size: " << ages.size() << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Objects and Maps

// Using objects as dictionaries
let person = {
    name: "Alice",
    age: 25,
    city: "NYC"
};

// Accessing values
console.log(person.name);       // Alice
console.log(person["age"]);     // 25

// Adding/updating
person.email = "alice@example.com";
person.age = 26;

// Checking keys
if ("name" in person) {
    console.log("Name exists");
}

// Deleting
delete person.city;

// Iterating object
for (let key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}

Object.keys(person).forEach(key => {
    console.log(\`\${key} = \${person[key]}\`);
});

// Map object (better for key-value storage)
let userAges = new Map();
userAges.set("Alice", 25);
userAges.set("Bob", 30);
userAges.set("Charlie", 35);

// Map operations
console.log(userAges.get("Alice"));  // 25
console.log(userAges.has("Bob"));    // true
console.log(userAges.size);          // 3

// Iterating Map
for (let [key, value] of userAges) {
    console.log(\`\${key}: \${value}\`);
}

userAges.forEach((value, key) => {
    console.log(\`\${key} = \${value}\`);
});

// Word frequency counter
let text = "hello world hello javascript world";
let wordCount = new Map();

text.split(" ").forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
});

console.log(wordCount);

// Convert between Object and Map
let obj = {a: 1, b: 2};
let map = new Map(Object.entries(obj));
let backToObj = Object.fromEntries(map);`,
      java: `// Java - HashMap and TreeMap
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // HashMap (unsorted, O(1) lookup)
        HashMap<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        
        // Accessing values
        System.out.println("Alice's age: " + ages.get("Alice"));
        
        // Check if key exists
        if (ages.containsKey("Alice")) {
            System.out.println("Alice found");
        }
        
        // Updating
        ages.put("Alice", 26);
        
        // Removing
        ages.remove("Bob");
        
        // Iterating
        for (String key : ages.keySet()) {
            System.out.println(key + ": " + ages.get(key));
        }
        
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
        
        // TreeMap (sorted keys, O(log n) lookup)
        TreeMap<String, String> capitals = new TreeMap<>();
        capitals.put("USA", "Washington DC");
        capitals.put("UK", "London");
        capitals.put("France", "Paris");
        
        System.out.println(capitals);  // Sorted by key
        
        // Word frequency counter
        String text = "hello world hello java world";
        HashMap<String, Integer> wordCount = new HashMap<>();
        
        for (String word : text.split(" ")) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        
        System.out.println(wordCount);
        
        // Get methods
        System.out.println("Keys: " + ages.keySet());
        System.out.println("Values: " + ages.values());
        System.out.println("Size: " + ages.size());
        
        // LinkedHashMap (maintains insertion order)
        LinkedHashMap<String, Integer> ordered = new LinkedHashMap<>();
        ordered.put("first", 1);
        ordered.put("second", 2);
        ordered.put("third", 3);
        System.out.println(ordered);
    }
}`,
      typescript: `// TypeScript - Objects and Maps with types

// Using interface for object
interface Person {
    name: string;
    age: number;
    city?: string;
}

let person: Person = {
    name: "Alice",
    age: 25,
    city: "NYC"
};

// Accessing values
console.log(person.name);
console.log(person.age);

// Type-safe Map
let userAges: Map<string, number> = new Map();
userAges.set("Alice", 25);
userAges.set("Bob", 30);
userAges.set("Charlie", 35);

// Map operations with types
let age: number | undefined = userAges.get("Alice");
let hasUser: boolean = userAges.has("Bob");
let size: number = userAges.size;

// Iterating with types
for (let [key, value] of userAges) {
    console.log(\`\${key}: \${value}\`);
}

userAges.forEach((value: number, key: string) => {
    console.log(\`\${key} = \${value}\`);
});

// Record type (like dictionary)
type Config = Record<string, string>;

let config: Config = {
    host: "localhost",
    port: "8080",
    env: "development"
};

// Type-safe word counter
function countWords(text: string): Map<string, number> {
    const wordCount = new Map<string, number>();
    
    text.split(" ").forEach((word: string) => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });
    
    return wordCount;
}

const counts: Map<string, number> = countWords("hello world hello typescript world");
console.log(counts);

// Nested typed structures
interface StudentGrades {
    [subject: string]: number;
}

interface Students {
    [name: string]: StudentGrades;
}

const students: Students = {
    alice: { math: 90, english: 85 },
    bob: { math: 75, english: 95 }
};

console.log(students.alice.math);`,
      csharp: `// C# - Dictionary
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // Creating Dictionary
        Dictionary<string, int> ages = new Dictionary<string, int>();
        ages["Alice"] = 25;
        ages["Bob"] = 30;
        ages["Charlie"] = 35;
        
        // Alternative initialization
        var capitals = new Dictionary<string, string>
        {
            {"USA", "Washington DC"},
            {"UK", "London"},
            {"France", "Paris"}
        };
        
        // Accessing values
        Console.WriteLine($"Alice's age: {ages["Alice"]}");
        
        // Safe access with TryGetValue
        if (ages.TryGetValue("Alice", out int age)) {
            Console.WriteLine($"Found: {age}");
        }
        
        // Check if key exists
        if (ages.ContainsKey("Alice")) {
            Console.WriteLine("Alice found");
        }
        
        // Adding/updating
        ages["Alice"] = 26;  // Update
        ages.Add("David", 28);  // Add
        
        // Removing
        ages.Remove("Bob");
        
        // Iterating
        foreach (var key in ages.Keys) {
            Console.WriteLine($"{key}: {ages[key]}");
        }
        
        foreach (var pair in ages) {
            Console.WriteLine($"{pair.Key} = {pair.Value}");
        }
        
        // Word frequency counter
        string text = "hello world hello csharp world";
        Dictionary<string, int> wordCount = new Dictionary<string, int>();
        
        foreach (string word in text.Split(' ')) {
            if (wordCount.ContainsKey(word)) {
                wordCount[word]++;
            } else {
                wordCount[word] = 1;
            }
        }
        
        foreach (var pair in wordCount) {
            Console.WriteLine($"{pair.Key}: {pair.Value}");
        }
        
        // LINQ with dictionaries
        var filtered = ages.Where(pair => pair.Value > 25)
                           .ToDictionary(pair => pair.Key, pair => pair.Value);
        
        Console.WriteLine($"Count: {ages.Count}");
    }
}`,
    },
    hints: [
      'Dictionaries provide O(1) average-case lookup time, much faster than searching through arrays.',
      'Keys must be unique - adding a value with an existing key replaces the old value.',
      'Use get() method in Python or TryGetValue in C# to safely access keys that might not exist.',
    ],
    commonErrors: {
      python: ['KeyError when accessing non-existent key', 'Using mutable objects as keys', 'Modifying dictionary while iterating'],
      cpp: ['Accessing non-existent key creates it with default value', 'Iterator invalidation when modifying map', 'Not checking if key exists before access'],
      javascript: ['Confusing object properties with Map methods', 'Using objects when Map would be better', 'Not handling undefined from Map.get()'],
      java: ['NullPointerException from get() on missing key', 'Not using getOrDefault()', 'ConcurrentModificationException during iteration'],
      typescript: ['Type errors with undefined from Map.get()', 'Not properly typing dictionary objects', 'Confusion between Record type and Map'],
      csharp: ['KeyNotFoundException when key does not exist', 'Not using TryGetValue for safe access', 'Boxing/unboxing with older Hashtable'],
    },
    quiz: [
      {
        question: 'What is the main advantage of dictionaries over arrays?',
        options: ['They use less memory', 'You can access values by meaningful keys instead of numeric indices', 'They are faster at all operations', 'They can store more data'],
        correctAnswer: 1,
        explanation: 'Dictionaries let you use meaningful keys (like names or IDs) instead of remembering numeric positions, making code more readable and enabling fast direct access.',
      },
    ],
    tryIt: 'Create a dictionary to count how many times each letter appears in the word "programming".',
  },
];

// MORE DATA STRUCTURES
export const MORE_DATA_STRUCTURES: LessonStructure[] = [
  {
    id: 'sets-basics',
    title: 'Sets - Unique Collections',
    category: 'intermediate',
    order: 100,
    duration: '15 min',
    xpReward: 25,
    conceptText: `Sets are collections that automatically eliminate duplicates. Unlike arrays or lists where the same value can appear multiple times, sets ensure each element appears exactly once. This uniqueness property makes sets perfect for membership testing, removing duplicates, and mathematical set operations like union, intersection, and difference.

Think about tracking which users have visited your website today. You don't care if someone visits multiple times. You just want to know if they visited at all. A set naturally handles this by storing each user ID once. Add the same ID a hundred times and the set still contains it once. This automatic deduplication is the core value proposition of sets.

Sets optimize membership testing. Checking if an element exists in a list requires scanning every element, taking O(n) time. Sets use hash tables internally, providing O(1) average-case lookup. When you need to frequently check "does this exist?", sets dramatically outperform lists. This performance difference becomes critical with large datasets.

Different languages provide set implementations with subtle variations. Python offers built-in sets with familiar syntax. JavaScript introduced Set in ES6. Java provides HashSet for unordered sets and TreeSet for sorted sets. C++ has set (sorted) and unordered_set (hash-based). C# offers HashSet and SortedSet. TypeScript uses JavaScript's Set with added type safety. All share the core uniqueness guarantee but differ in ordering and performance.

Mathematical set operations become natural with set data structures. Union combines two sets, keeping all unique elements. Intersection finds common elements. Difference identifies elements in one set but not another. Symmetric difference finds elements in either set but not both. These operations appear throughout programming, from filtering data to implementing recommendation algorithms.

Sets have limitations. They cannot maintain insertion order in some languages. They cannot store duplicate values by definition. They do not support indexing because elements have no position. If you need these features, other data structures serve better. Understanding when sets are appropriate versus when lists or dictionaries work better is key to efficient programming.`,
    diagram: 'Venn diagram showing set operations: union, intersection, difference',
    codeExamples: {
      python: `# Python - Sets

# Creating sets
numbers = {1, 2, 3, 4, 5}
fruits = set(['apple', 'banana', 'cherry'])

# Empty set (not {} which creates dict)
empty = set()

# Adding elements
numbers.add(6)
numbers.add(3)  # Duplicate ignored

# Removing elements
numbers.remove(1)  # Raises error if not found
numbers.discard(10)  # No error if not found

# Membership testing (fast O(1))
if 3 in numbers:
    print("3 exists")

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)  # Union: {1, 2, 3, 4, 5, 6}
print(a & b)  # Intersection: {3, 4}
print(a - b)  # Difference: {1, 2}
print(a ^ b)  # Symmetric difference: {1, 2, 5, 6}

# Alternative methods
print(a.union(b))
print(a.intersection(b))
print(a.difference(b))

# Remove duplicates from list
numbers_list = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(numbers_list))
print(unique)  # [1, 2, 3, 4]

# Subsets and supersets
x = {1, 2}
y = {1, 2, 3, 4}
print(x.issubset(y))    # True
print(y.issuperset(x))  # True

# Frozen set (immutable)
frozen = frozenset([1, 2, 3])
# frozen.add(4)  # Error: cannot modify

# Set comprehension
squares = {x**2 for x in range(6)}
print(squares)  # {0, 1, 4, 9, 16, 25}`,
      cpp: `// C++ - set and unordered_set
#include <iostream>
#include <set>
#include <unordered_set>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Set (sorted, tree-based)
    set<int> numbers;
    numbers.insert(3);
    numbers.insert(1);
    numbers.insert(4);
    numbers.insert(1);  // Duplicate ignored
    
    // Set is automatically sorted
    for (int num : numbers) {
        cout << num << " ";  // 1 3 4
    }
    cout << endl;
    
    // Unordered set (hash-based, faster)
    unordered_set<string> fruits;
    fruits.insert("apple");
    fruits.insert("banana");
    fruits.insert("cherry");
    fruits.insert("apple");  // Duplicate ignored
    
    // Membership testing
    if (fruits.find("apple") != fruits.end()) {
        cout << "Apple exists" << endl;
    }
    
    // Removing
    fruits.erase("banana");
    
    // Set operations (requires sorted sets)
    set<int> a = {1, 2, 3, 4};
    set<int> b = {3, 4, 5, 6};
    
    // Union
    set<int> unionSet;
    set_union(a.begin(), a.end(), b.begin(), b.end(),
              inserter(unionSet, unionSet.begin()));
    
    // Intersection
    set<int> intersectSet;
    set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                    inserter(intersectSet, intersectSet.begin()));
    
    // Difference
    set<int> diffSet;
    set_difference(a.begin(), a.end(), b.begin(), b.end(),
                   inserter(diffSet, diffSet.begin()));
    
    // Remove duplicates from vector
    vector<int> vec = {1, 2, 2, 3, 3, 3, 4};
    set<int> uniqueSet(vec.begin(), vec.end());
    vector<int> unique(uniqueSet.begin(), uniqueSet.end());
    
    // Size
    cout << "Set size: " << numbers.size() << endl;
    
    return 0;
}`,
      javascript: `// JavaScript - Set

// Creating sets
let numbers = new Set([1, 2, 3, 4, 5]);
let fruits = new Set();

// Adding elements
numbers.add(6);
numbers.add(3);  // Duplicate ignored

fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");

// Removing
numbers.delete(1);

// Membership testing
if (numbers.has(3)) {
    console.log("3 exists");
}

// Size
console.log(\`Size: \${numbers.size}\`);

// Iterating
for (let num of numbers) {
    console.log(num);
}

numbers.forEach(num => {
    console.log(num);
});

// Convert to array
let arr = Array.from(numbers);
let arr2 = [...numbers];

// Set operations (manual implementation)
let a = new Set([1, 2, 3, 4]);
let b = new Set([3, 4, 5, 6]);

// Union
let union = new Set([...a, ...b]);
console.log(union);  // Set {1, 2, 3, 4, 5, 6}

// Intersection
let intersection = new Set([...a].filter(x => b.has(x)));
console.log(intersection);  // Set {3, 4}

// Difference
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference);  // Set {1, 2}

// Symmetric difference
let symDiff = new Set([
    ...[...a].filter(x => !b.has(x)),
    ...[...b].filter(x => !a.has(x))
]);

// Remove duplicates from array
let duplicates = [1, 2, 2, 3, 3, 3, 4];
let unique = [...new Set(duplicates)];
console.log(unique);  // [1, 2, 3, 4]

// Clear set
numbers.clear();
console.log(\`Empty: \${numbers.size === 0}\`);`,
      java: `// Java - HashSet and TreeSet
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // HashSet (unordered, fast)
        HashSet<Integer> numbers = new HashSet<>();
        numbers.add(3);
        numbers.add(1);
        numbers.add(4);
        numbers.add(1);  // Duplicate ignored
        
        System.out.println(numbers);  // [1, 3, 4] - unordered
        
        // TreeSet (sorted)
        TreeSet<String> fruits = new TreeSet<>();
        fruits.add("banana");
        fruits.add("apple");
        fruits.add("cherry");
        
        System.out.println(fruits);  // [apple, banana, cherry] - sorted
        
        // Membership testing
        if (numbers.contains(3)) {
            System.out.println("3 exists");
        }
        
        // Removing
        numbers.remove(1);
        
        // Set operations
        Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3, 4));
        Set<Integer> b = new HashSet<>(Arrays.asList(3, 4, 5, 6));
        
        // Union
        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);
        System.out.println("Union: " + union);
        
        // Intersection
        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        System.out.println("Intersection: " + intersection);
        
        // Difference
        Set<Integer> difference = new HashSet<>(a);
        difference.removeAll(b);
        System.out.println("Difference: " + difference);
        
        // Remove duplicates from list
        List<Integer> list = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
        Set<Integer> uniqueSet = new HashSet<>(list);
        List<Integer> unique = new ArrayList<>(uniqueSet);
        
        // Iterating
        for (Integer num : numbers) {
            System.out.println(num);
        }
        
        // Size
        System.out.println("Size: " + numbers.size());
    }
}`,
      typescript: `// TypeScript - Set with type safety

// Creating typed sets
let numbers: Set<number> = new Set([1, 2, 3, 4, 5]);
let fruits: Set<string> = new Set();

// Adding with type safety
numbers.add(6);
// numbers.add("7");  // Error: string not assignable to number

fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");

// Membership testing
let exists: boolean = numbers.has(3);

// Size
let size: number = numbers.size;

// Iterating with types
for (let num of numbers) {
    console.log(num);  // num is typed as number
}

// Type-safe set operations
function union<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]);
}

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => b.has(x)));
}

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => !b.has(x)));
}

let a: Set<number> = new Set([1, 2, 3, 4]);
let b: Set<number> = new Set([3, 4, 5, 6]);

console.log(union(a, b));
console.log(intersection(a, b));
console.log(difference(a, b));

// Remove duplicates with types
function removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

let duplicates: number[] = [1, 2, 2, 3, 3, 3, 4];
let unique: number[] = removeDuplicates(duplicates);

// Custom object sets
interface User {
    id: number;
    name: string;
}

let users: Set<User> = new Set();
users.add({ id: 1, name: "Alice" });
users.add({ id: 2, name: "Bob" });

// Note: Objects compared by reference
console.log(users.size);  // 2`,
      csharp: `// C# - HashSet and SortedSet
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // HashSet (unordered, fast)
        HashSet<int> numbers = new HashSet<int>();
        numbers.Add(3);
        numbers.Add(1);
        numbers.Add(4);
        numbers.Add(1);  // Duplicate ignored, returns false
        
        Console.WriteLine(string.Join(", ", numbers));
        
        // SortedSet (ordered)
        SortedSet<string> fruits = new SortedSet<string>();
        fruits.Add("banana");
        fruits.Add("apple");
        fruits.Add("cherry");
        
        Console.WriteLine(string.Join(", ", fruits));  // Sorted
        
        // Membership testing
        if (numbers.Contains(3)) {
            Console.WriteLine("3 exists");
        }
        
        // Removing
        numbers.Remove(1);
        
        // Set operations (built-in!)
        var a = new HashSet<int> {1, 2, 3, 4};
        var b = new HashSet<int> {3, 4, 5, 6};
        
        // Union
        var union = new HashSet<int>(a);
        union.UnionWith(b);
        Console.WriteLine("Union: " + string.Join(", ", union));
        
        // Intersection
        var intersection = new HashSet<int>(a);
        intersection.IntersectWith(b);
        Console.WriteLine("Intersection: " + string.Join(", ", intersection));
        
        // Difference
        var difference = new HashSet<int>(a);
        difference.ExceptWith(b);
        Console.WriteLine("Difference: " + string.Join(", ", difference));
        
        // Symmetric difference
        var symDiff = new HashSet<int>(a);
        symDiff.SymmetricExceptWith(b);
        Console.WriteLine("Symmetric Diff: " + string.Join(", ", symDiff));
        
        // Remove duplicates from list
        var list = new List<int> {1, 2, 2, 3, 3, 3, 4};
        var unique = new HashSet<int>(list).ToList();
        
        // Subset checking
        var x = new HashSet<int> {1, 2};
        var y = new HashSet<int> {1, 2, 3, 4};
        Console.WriteLine($"Subset: {x.IsSubsetOf(y)}");
        
        // LINQ with sets
        var filtered = numbers.Where(n => n > 2).ToHashSet();
        
        Console.WriteLine($"Count: {numbers.Count}");
    }
}`,
    },
    hints: [
      'Sets automatically remove duplicates - adding the same element twice has no effect.',
      'Membership testing in sets is O(1) on average, much faster than O(n) in lists.',
      'Use sets when you need unique elements or fast membership checking.',
    ],
    commonErrors: {
      python: ['Using {} to create empty set (creates dict instead)', 'Trying to add mutable objects like lists', 'Expecting sets to maintain order in older Python versions'],
      cpp: ['Not realizing set is sorted while unordered_set is not', 'Performance issues using set when unordered_set would be faster', 'Iterator invalidation when modifying'],
      javascript: ['Thinking Set will deep-compare objects (uses reference equality)', 'Expecting specific iteration order', 'Not converting Set to Array for array methods'],
      java: ['Confusing HashSet and TreeSet performance characteristics', 'Not overriding equals() and hashCode() for custom objects', 'Modifying objects after adding to set'],
      typescript: ['Type errors with Set operations on different types', 'Not understanding reference equality for objects in Sets'],
      csharp: ['Not using built-in set operation methods', 'Confusing HashSet and SortedSet', 'Not implementing GetHashCode() for custom types'],
    },
    quiz: [
      {
        question: 'What is the main characteristic of a Set?',
        options: ['Elements are sorted', 'Elements are unique', 'Elements have indices', 'Elements can be duplicated'],
        correctAnswer: 1,
        explanation: 'The defining characteristic of a Set is that it contains only unique elements - duplicates are automatically removed.',
      },
    ],
    tryIt: 'Create a set of numbers, add some duplicates, and verify that the set contains each number only once.',
  },
];

// LAMBDA AND FUNCTIONAL PROGRAMMING
export const LAMBDA_LESSONS: LessonStructure[] = [
  {
    id: 'lambda-expressions',
    title: 'Lambda Expressions - Anonymous Functions',
    category: 'advanced',
    order: 105,
    duration: '18 min',
    xpReward: 35,
    conceptText: `Lambda expressions are anonymous functions defined inline without a formal name. They provide a concise way to write small functions that are used once or passed as arguments to other functions. This functional programming concept enables elegant code for operations like filtering, mapping, and sorting data collections.

Think about sorting a list of people by age. You could define a named function that extracts the age and pass it to the sort function. Or you could write a lambda expression right where you need it, making the code more compact and readable. Lambda expressions excel when the function logic is simple and used in a single place.

The syntax varies dramatically across languages but the concept remains consistent. Python uses the lambda keyword followed by parameters and an expression. JavaScript provides arrow function syntax with various shorthand forms. Java introduced lambda expressions in version 8 with a distinctive arrow notation. C++ uses square bracket syntax to capture variables from the surrounding scope. C# offers lambda expressions similar to Java but with additional features.

Lambda expressions are particularly powerful with higher-order functions. Functions like map, filter, and reduce transform collections by applying a function to each element. Instead of defining separate named functions, you write lambdas inline. This functional programming style leads to declarative code that describes what you want rather than how to compute it step by step.

Variable capture is a crucial lambda concept. Lambdas can access variables from their enclosing scope, not just their parameters. This closure behavior lets lambdas "remember" their environment. Python lambdas capture by reference. JavaScript arrow functions capture lexically. C++ requires explicit capture specifications. Java captures effectively final variables. Understanding capture semantics prevents subtle bugs.

Lambda expressions have limitations. They typically support only single expressions, not full statement blocks. Complex logic belongs in named functions for readability. Debugging lambdas can be harder because they lack names in stack traces. Use lambdas for simple transformations and named functions when logic complexity grows. The goal is clear, maintainable code.`,
    diagram: 'Lambda expression anatomy diagram showing parameters, arrow, and expression',
    codeExamples: {
      python: `# Python - Lambda expressions

# Basic lambda
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with multiple parameters
add = lambda a, b: a + b
print(add(3, 4))  # 7

# Using with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Using with filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# Using with sorted
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]
sorted_by_age = sorted(people, key=lambda p: p["age"])
print([p["name"] for p in sorted_by_age])  # ['Bob', 'Alice', 'Charlie']

# Lambda in reduce
from functools import reduce
product = reduce(lambda x, y: x * y, [1, 2, 3, 4])
print(product)  # 24

# Lambda limitations - single expression only
# Can't use if statements, only conditional expressions
max_func = lambda a, b: a if a > b else b
print(max_func(5, 3))  # 5

# List comprehension often better than map/filter with lambda
squared_comp = [x ** 2 for x in numbers]
evens_comp = [x for x in numbers if x % 2 == 0]`,
      cpp: `// C++ - Lambda expressions
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // Basic lambda
    auto square = [](int x) { return x * x; };
    cout << square(5) << endl;  // 25
    
    // Lambda with multiple parameters
    auto add = [](int a, int b) { return a + b; };
    cout << add(3, 4) << endl;  // 7
    
    // Using with transform (like map)
    vector<int> numbers = {1, 2, 3, 4, 5};
    vector<int> squared(numbers.size());
    transform(numbers.begin(), numbers.end(), squared.begin(),
              [](int x) { return x * x; });
    
    // Using with for_each
    for_each(numbers.begin(), numbers.end(),
             [](int x) { cout << x << " "; });
    cout << endl;
    
    // Using with sort
    vector<int> values = {3, 1, 4, 1, 5, 9};
    sort(values.begin(), values.end(),
         [](int a, int b) { return a > b; });  // Descending
    
    // Capture by value [=]
    int multiplier = 10;
    auto multiply = [=](int x) { return x * multiplier; };
    cout << multiply(5) << endl;  // 50
    
    // Capture by reference [&]
    int total = 0;
    for_each(numbers.begin(), numbers.end(),
             [&total](int x) { total += x; });
    cout << "Total: " << total << endl;
    
    // Capture specific variables
    int a = 5, b = 10;
    auto func = [a, &b]() { return a + b; };
    
    // Mutable lambda (can modify captured values)
    int count = 0;
    auto counter = [count]() mutable { return ++count; };
    cout << counter() << endl;  // 1
    cout << counter() << endl;  // 2
    
    // Using with accumulate (reduce)
    int product = accumulate(numbers.begin(), numbers.end(), 1,
                            [](int acc, int x) { return acc * x; });
    
    return 0;
}`,
      javascript: `// JavaScript - Arrow functions (lambda)

// Basic arrow function
const square = x => x ** 2;
console.log(square(5));  // 25

// With multiple parameters
const add = (a, b) => a + b;
console.log(add(3, 4));  // 7

// With curly braces for multiple statements
const greet = name => {
    const message = \`Hello, \${name}!\`;
    return message;
};

// Using with map
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x ** 2);
console.log(squared);  // [1, 4, 9, 16, 25]

// Using with filter
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens);  // [2, 4]

// Using with reduce
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum);  // 15

// Using with sort
const people = [
    {name: "Alice", age: 30},
    {name: "Bob", age: 25},
    {name: "Charlie", age: 35}
];
const sortedByAge = people.sort((a, b) => a.age - b.age);
console.log(sortedByAge.map(p => p.name));

// Chaining array methods with arrows
const result = numbers
    .filter(x => x > 2)
    .map(x => x ** 2)
    .reduce((sum, x) => sum + x, 0);

// Arrow functions and 'this' binding
const obj = {
    value: 42,
    regularFunc: function() {
        return this.value;  // 'this' is obj
    },
    arrowFunc: () => {
        // Arrow function doesn't have its own 'this'
        // Uses 'this' from enclosing scope
    }
};

// Immediately Invoked Function Expression (IIFE)
const result2 = ((x, y) => x + y)(3, 4);  // 7

// Currying with arrows
const multiply = x => y => x * y;
const double = multiply(2);
console.log(double(5));  // 10`,
      java: `// Java - Lambda expressions (Java 8+)
import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // Basic lambda
        Function<Integer, Integer> square = x -> x * x;
        System.out.println(square.apply(5));  // 25
        
        // Lambda with multiple parameters
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        System.out.println(add.apply(3, 4));  // 7
        
        // Using with streams (map)
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> squared = numbers.stream()
            .map(x -> x * x)
            .collect(Collectors.toList());
        System.out.println(squared);
        
        // Using with filter
        List<Integer> evens = numbers.stream()
            .filter(x -> x % 2 == 0)
            .collect(Collectors.toList());
        System.out.println(evens);
        
        // Using with reduce
        int sum = numbers.stream()
            .reduce(0, (acc, x) -> acc + x);
        System.out.println("Sum: " + sum);
        
        // Using with sort
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob");
        names.sort((a, b) -> a.compareTo(b));
        System.out.println(names);
        
        // Predicate lambda
        Predicate<Integer> isEven = x -> x % 2 == 0;
        System.out.println(isEven.test(4));  // true
        
        // Consumer lambda
        Consumer<String> printer = s -> System.out.println(s);
        names.forEach(printer);
        
        // Supplier lambda
        Supplier<Double> randomSupplier = () -> Math.random();
        System.out.println(randomSupplier.get());
        
        // Method reference (alternative to lambda)
        names.forEach(System.out::println);
        
        // Custom functional interface
        interface Calculator {
            int calculate(int a, int b);
        }
        
        Calculator multiply = (a, b) -> a * b;
        System.out.println(multiply.calculate(5, 3));
        
        // Lambda with multiple statements
        BiFunction<Integer, Integer, Integer> complexCalc = (a, b) -> {
            int result = a + b;
            result *= 2;
            return result;
        };
    }
}`,
      typescript: `// TypeScript - Typed arrow functions

// Basic typed arrow function
const square: (x: number) => number = x => x ** 2;
console.log(square(5));  // 25

// With multiple parameters
const add: (a: number, b: number) => number = (a, b) => a + b;
console.log(add(3, 4));  // 7

// Type inference
const multiply = (a: number, b: number): number => a * b;

// Using with typed arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const squared: number[] = numbers.map((x: number) => x ** 2);

// Type-safe filter
const evens: number[] = numbers.filter((x: number) => x % 2 === 0);

// Type-safe reduce
const sum: number = numbers.reduce((acc: number, x: number) => acc + x, 0);

// Generic arrow function
const identity = <T>(value: T): T => value;
console.log(identity<number>(42));
console.log(identity<string>("hello"));

// Arrow function with object type
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    {name: "Alice", age: 30},
    {name: "Bob", age: 25},
    {name: "Charlie", age: 35}
];

const sortedByAge: Person[] = people.sort((a, b) => a.age - b.age);

// Type-safe callback
const processNumbers = (
    nums: number[], 
    callback: (n: number) => number
): number[] => {
    return nums.map(callback);
};

const doubled = processNumbers(numbers, x => x * 2);

// Function type aliases
type BinaryOperation = (a: number, b: number) => number;

const subtract: BinaryOperation = (a, b) => a - b;
const divide: BinaryOperation = (a, b) => a / b;

// Optional and default parameters
const greet = (name: string, greeting: string = "Hello"): string => {
    return \`\${greeting}, \${name}!\`;
};

// Rest parameters
const sumAll = (...nums: number[]): number => {
    return nums.reduce((acc, n) => acc + n, 0);
};

console.log(sumAll(1, 2, 3, 4, 5));  // 15

// Async arrow functions
const fetchData = async (url: string): Promise<any> => {
    const response = await fetch(url);
    return response.json();
};`,
      csharp: `// C# - Lambda expressions
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        // Basic lambda
        Func<int, int> square = x => x * x;
        Console.WriteLine(square(5));  // 25
        
        // Lambda with multiple parameters
        Func<int, int, int> add = (a, b) => a + b;
        Console.WriteLine(add(3, 4));  // 7
        
        // Using with LINQ (like map)
        List<int> numbers = new List<int> {1, 2, 3, 4, 5};
        var squared = numbers.Select(x => x * x).ToList();
        Console.WriteLine(string.Join(", ", squared));
        
        // Using with Where (filter)
        var evens = numbers.Where(x => x % 2 == 0).ToList();
        Console.WriteLine(string.Join(", ", evens));
        
        // Using with Aggregate (reduce)
        var sum = numbers.Aggregate((acc, x) => acc + x);
        Console.WriteLine($"Sum: {sum}");
        
        // Using with OrderBy
        var people = new List<dynamic> {
            new {Name = "Charlie", Age = 35},
            new {Name = "Alice", Age = 30},
            new {Name = "Bob", Age = 25}
        };
        var sortedByAge = people.OrderBy(p => p.Age);
        
        // Predicate lambda
        Predicate<int> isEven = x => x % 2 == 0;
        Console.WriteLine(isEven(4));  // true
        
        // Action lambda (void return)
        Action<string> printer = s => Console.WriteLine(s);
        printer("Hello from lambda");
        
        // Func with multiple statements
        Func<int, int, int> complexCalc = (a, b) => {
            int result = a + b;
            result *= 2;
            return result;
        };
        
        // Using lambda with ForEach
        numbers.ForEach(x => Console.WriteLine(x * 2));
        
        // LINQ query with lambdas
        var result = numbers
            .Where(x => x > 2)
            .Select(x => x * x)
            .OrderByDescending(x => x)
            .ToList();
        
        // Capturing variables
        int multiplier = 10;
        var multiply = numbers.Select(x => x * multiplier);
        
        // Expression-bodied members (similar to lambdas)
        // Covered in Properties lesson
    }
}`,
    },
    hints: [
      'Lambda expressions are best for simple, one-line operations passed to higher-order functions.',
      'Arrow functions in JavaScript do not have their own "this" - they use lexical scoping.',
      'In C++, be careful with capture clauses - capture by value [=] or by reference [&].',
    ],
    commonErrors: {
      python: ['Using multiple statements in lambda (only expressions allowed)', 'Forgetting parentheses when lambda has no parameters', 'Using lambda when named function would be clearer'],
      cpp: ['Forgetting capture clause brackets', 'Capturing variables that go out of scope', 'Confusion between value and reference capture', 'Modifying captured values without mutable keyword'],
      javascript: ['Confusing regular functions and arrow functions with "this" binding', 'Forgetting parentheses around multiple parameters', 'Missing return statement in multi-line arrow functions'],
      java: ['Using lambda when method reference would be clearer', 'Not understanding functional interface requirements', 'Trying to modify non-final captured variables'],
      typescript: ['Type inference failures with complex lambdas', 'Not properly typing lambda parameters', 'Missing return type annotations'],
      csharp: ['Confusing Func, Action, and Predicate', 'Not using expression-bodied members when appropriate', 'Closure capture issues with loop variables'],
    },
    quiz: [
      {
        question: 'What is the main purpose of lambda expressions?',
        options: ['To make code run faster', 'To create concise anonymous functions', 'To replace all named functions', 'To handle errors'],
        correctAnswer: 1,
        explanation: 'Lambda expressions provide a concise way to write anonymous functions, especially useful when passing functions as arguments.',
      },
    ],
    tryIt: 'Use a lambda expression to filter a list of numbers, keeping only those greater than 10.',
  },
];

// TUPLES AND ENUMS
export const TUPLES_ENUMS_LESSONS: LessonStructure[] = [
  {
    id: 'tuples-basics',
    title: 'Tuples - Immutable Sequences',
    category: 'intermediate',
    order: 110,
    duration: '15 min',
    xpReward: 25,
    conceptText: `Tuples are ordered collections similar to arrays but with a key difference: they are immutable. Once created, you cannot modify a tuple's contents. This immutability makes tuples useful for representing fixed collections of related values, like coordinates, RGB colors, or function return values. The guarantee that data won't change provides safety in concurrent programming and enables tuples as dictionary keys.

Think about representing a point in 2D space. You need exactly two values: x and y coordinates. A tuple naturally expresses this fixed pairing. Or consider a date: year, month, and day form a natural tuple. The immutability ensures no code accidentally changes the year to an invalid value. Tuples communicate intent: this data belongs together and should not be modified.

Different languages provide varying levels of tuple support. Python has built-in tuples with parentheses syntax. JavaScript and TypeScript lack dedicated tuple types but use arrays with tuple type annotations in TypeScript. Java traditionally lacked tuples, requiring custom classes or records. C++ provides std::tuple and std::pair in the Standard Template Library. C# offers tuples with named or positional syntax. Some languages embrace tuples as first-class citizens while others require workarounds.

Tuples excel at returning multiple values from functions. Instead of creating a custom class or using output parameters, functions can return a tuple packing several values together. The caller unpacks the tuple through destructuring or indexing. This pattern appears frequently in Python where functions often return success status and result as a tuple, or coordinates as a pair.

The immutability constraint has implications. You cannot append to tuples or change elements. This prevents accidental modifications but requires creating new tuples when you need different contents. Some languages optimize tuple operations knowing they are immutable. Others use tuples primarily for type safety rather than performance. Understanding these tradeoffs guides when to use tuples versus lists or custom classes.

Tuple unpacking is a powerful feature enabling elegant code. Instead of accessing tuple elements by index, you assign them to multiple variables in one statement. Python excels at unpacking with syntax that mirrors tuple creation. JavaScript uses destructuring assignment. Other languages provide similar capabilities with varying syntax. This pattern makes code more readable than index-based access.`,
    diagram: 'Tuple diagram showing immutable ordered collection',
    codeExamples: {
      python: `# Python - Tuples (immutable)

# Creating tuples
point = (3, 4)
rgb = (255, 128, 0)
empty = ()
single = (42,)  # Comma needed for single element

# Accessing elements
x, y = point
print(f"x: {x}, y: {y}")

# By index
print(point[0])  # 3
print(rgb[1])   # 128

# Tuples are immutable
# point[0] = 5  # Error: tuple doesn't support item assignment

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Sum: {total}")

# Named tuples (more readable)
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)
print(p[0], p[1])  # Can still use indices

# Tuple unpacking in loops
points = [(1, 2), (3, 4), (5, 6)]
for x, y in points:
    print(f"Point: ({x}, {y})")

# Swapping variables with tuples
a, b = 10, 20
a, b = b, a  # Swap
print(f"a: {a}, b: {b}")

# Tuples as dictionary keys (immutable requirement)
locations = {
    (0, 0): "origin",
    (1, 0): "right",
    (0, 1): "up"
}

# Tuple methods (only 2)
numbers = (1, 2, 2, 3, 2)
print(numbers.count(2))  # 3
print(numbers.index(3))  # 3

# Converting between list and tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
back_to_list = list(my_tuple)`,
      cpp: `// C++ - std::tuple and std::pair
#include <iostream>
#include <tuple>
#include <utility>
#include <string>
using namespace std;

// Function returning tuple
tuple<int, int, int> getStats(const vector<int>& nums) {
    int min = *min_element(nums.begin(), nums.end());
    int max = *max_element(nums.begin(), nums.end());
    int sum = accumulate(nums.begin(), nums.end(), 0);
    return make_tuple(min, max, sum);
}

int main() {
    // Creating tuple
    tuple<int, int> point(3, 4);
    tuple<int, int, int> rgb(255, 128, 0);
    
    // Accessing elements (by index)
    cout << "x: " << get<0>(point) << endl;
    cout << "y: " << get<1>(point) << endl;
    
    // Structured binding (C++17)
    auto [x, y] = point;
    cout << "x: " << x << ", y: " << y << endl;
    
    // Multiple return values
    auto [minimum, maximum, total] = getStats({1, 2, 3, 4, 5});
    cout << "Min: " << minimum << ", Max: " << maximum << endl;
    
    // std::pair (2-element tuple)
    pair<string, int> person("Alice", 25);
    cout << person.first << " is " << person.second << endl;
    
    // Making pairs/tuples
    auto p = make_pair(10, 20);
    auto t = make_tuple(1, 2.5, "hello");
    
    // Tuple size and type
    cout << "Tuple size: " << tuple_size<decltype(t)>::value << endl;
    
    // Comparing tuples (lexicographic)
    tuple<int, int> t1(1, 2);
    tuple<int, int> t2(1, 3);
    if (t1 < t2) {
        cout << "t1 < t2" << endl;
    }
    
    // Swapping
    swap(t1, t2);
    
    // Tuple concatenation
    auto combined = tuple_cat(point, rgb);
    
    return 0;
}`,
      javascript: `// JavaScript - Arrays as tuples (no native tuple type)

// Creating "tuples" (actually arrays)
const point = [3, 4];
const rgb = [255, 128, 0];

// Destructuring (unpacking)
const [x, y] = point;
console.log(\`x: \${x}, y: \${y}\`);

// Multiple return values
function getStats(numbers) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const sum = numbers.reduce((a, b) => a + b, 0);
    return [min, max, sum];
}

const [minimum, maximum, total] = getStats([1, 2, 3, 4, 5]);
console.log(\`Min: \${minimum}, Max: \${maximum}, Sum: \${total}\`);

// Swapping with destructuring
let a = 10, b = 20;
[a, b] = [b, a];
console.log(\`a: \${a}, b: \${b}\`);

// Rest in destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest);  // 1 2 [3, 4, 5]

// Nested destructuring
const person = ["Alice", 25, ["reading", "coding"]];
const [name, age, [hobby1, hobby2]] = person;

// Ignoring values
const [, , third] = [1, 2, 3, 4];
console.log(third);  // 3

// Default values in destructuring
const [p, q, r = 0] = [1, 2];
console.log(r);  // 0

// Note: JavaScript arrays are mutable
// To simulate immutability, use Object.freeze()
const immutablePoint = Object.freeze([3, 4]);
// immutablePoint[0] = 5;  // Error in strict mode

// Using objects for named tuple-like behavior
const pointObj = {x: 3, y: 4};
const {x: px, y: py} = pointObj;`,
      java: `// Java - No native tuples, use Records (Java 16+) or custom classes
import java.util.*;

// Record (immutable tuple-like, Java 16+)
record Point(int x, int y) {}
record Stats(int min, int max, int sum) {}

public class Main {
    // Multiple return using record
    static Stats getStats(List<Integer> numbers) {
        int min = Collections.min(numbers);
        int max = Collections.max(numbers);
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        return new Stats(min, max, sum);
    }
    
    public static void main(String[] args) {
        // Using records as tuples
        Point point = new Point(3, 4);
        System.out.println("x: " + point.x() + ", y: " + point.y());
        
        // Records are immutable
        // point.x = 5;  // Error: cannot assign
        
        // Multiple return values
        Stats stats = getStats(Arrays.asList(1, 2, 3, 4, 5));
        System.out.println("Min: " + stats.min() + ", Max: " + stats.max());
        
        // Pre-Java 16: Custom classes or libraries
        // Apache Commons Pair, Vavr Tuple, etc.
        
        // Using Map.Entry as pair
        Map.Entry<String, Integer> entry = Map.entry("Alice", 25);
        System.out.println(entry.getKey() + " is " + entry.getValue());
        
        // Using arrays (mutable, not ideal)
        int[] arrayPoint = {3, 4};
        
        // Using List (also mutable)
        List<Integer> listPoint = List.of(3, 4);  // Immutable list
        // listPoint.set(0, 5);  // Error: UnsupportedOperationException
    }
}`,
      typescript: `// TypeScript - Tuple types

// Tuple type definition
let point: [number, number] = [3, 4];
let rgb: [number, number, number] = [255, 128, 0];

// Accessing elements
const x = point[0];
const y = point[1];

// Destructuring
const [px, py] = point;
console.log(\`x: \${px}, y: \${py}\`);

// Function returning tuple
function getStats(numbers: number[]): [number, number, number] {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const sum = numbers.reduce((a, b) => a + b, 0);
    return [min, max, sum];
}

const [minimum, maximum, total] = getStats([1, 2, 3, 4, 5]);

// Named tuples (labeled tuple elements)
type LabeledPoint = [x: number, y: number];
let labeledPoint: LabeledPoint = [3, 4];

// Readonly tuples (immutable)
let readonlyPoint: readonly [number, number] = [3, 4];
// readonlyPoint[0] = 5;  // Error: cannot assign

// Optional tuple elements
type Response = [success: boolean, data?: string];
const success: Response = [true, "Data loaded"];
const failure: Response = [false];

// Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];
const mixed: StringNumberBooleans = ["hello", 42, true, false, true];

// Tuple type inference
const inferredTuple = [3, 4] as const;  // Type: readonly [3, 4]

// Generic tuple types
function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const pair = createPair("age", 25);  // [string, number]

// Swapping with type safety
let a: number = 10, b: number = 20;
[a, b] = [b, a];

// Multiple return values with types
function divideWithRemainder(dividend: number, divisor: number): [quotient: number, remainder: number] {
    return [Math.floor(dividend / divisor), dividend % divisor];
}

const [quotient, remainder] = divideWithRemainder(17, 5);

// Array vs Tuple types
let array: number[] = [1, 2, 3];  // Variable length
let tuple: [number, number] = [1, 2];  // Fixed length`,
      csharp: `// C# - Tuples (built-in since C# 7)
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    // Function returning tuple
    static (int min, int max, int sum) GetStats(List<int> numbers) {
        return (numbers.Min(), numbers.Max(), numbers.Sum());
    }
    
    static void Main() {
        // Creating tuples
        var point = (3, 4);
        var rgb = (255, 128, 0);
        
        // Named tuple elements
        var namedPoint = (x: 3, y: 4);
        Console.WriteLine($"x: {namedPoint.x}, y: {namedPoint.y}");
        
        // Accessing by position
        Console.WriteLine($"x: {point.Item1}, y: {point.Item2}");
        
        // Tuple deconstruction
        var (x, y) = point;
        Console.WriteLine($"x: {x}, y: {y}");
        
        // Multiple return values
        var (min, max, sum) = GetStats(new List<int> {1, 2, 3, 4, 5});
        Console.WriteLine($"Min: {min}, Max: {max}, Sum: {sum}");
        
        // Discarding values
        var (_, maximum, _) = GetStats(new List<int> {1, 2, 3});
        
        // Tuple types
        (int x, int y) typedPoint = (3, 4);
        
        // Tuple equality
        var t1 = (1, 2);
        var t2 = (1, 2);
        Console.WriteLine(t1 == t2);  // True
        
        // Swapping
        int a = 10, b = 20;
        (a, b) = (b, a);
        Console.WriteLine($"a: {a}, b: {b}");
        
        // Tuple as dictionary key
        var locations = new Dictionary<(int, int), string>
        {
            {(0, 0), "origin"},
            {(1, 0), "right"},
            {(0, 1), "up"}
        };
        
        // Nested tuples
        var nested = ((1, 2), (3, 4));
        
        // ValueTuple (struct) vs older Tuple (class)
        var valueTuple = (1, 2);  // ValueTuple (preferred)
        var oldTuple = Tuple.Create(1, 2);  // Old style
        
        // Custom deconstruction
        class Person {
            public string Name { get; set; }
            public int Age { get; set; }
            
            public void Deconstruct(out string name, out int age) {
                name = Name;
                age = Age;
            }
        }
        
        var person = new Person {Name = "Alice", Age = 25};
        var (name, age) = person;
    }
}`,
    },
    hints: [
      'Tuples are immutable in most languages - use them when you need fixed, unchangeable collections.',
      'Tuple unpacking/destructuring makes code more readable than accessing by index.',
      'Use tuples for multiple return values instead of creating custom classes for simple cases.',
    ],
    commonErrors: {
      python: ['Forgetting comma for single-element tuples', 'Trying to modify tuple elements', 'Confusing tuple with list syntax', 'Using mutable objects in tuples as dict keys'],
      cpp: ['Not including <tuple> header', 'Using wrong index with get<N>()', 'Forgetting structured binding requires C++17', 'Type mismatch in tuple elements'],
      javascript: ['Treating arrays as truly immutable tuples', 'Not using const for tuple-like arrays', 'Forgetting arrays in JS are always mutable'],
      java: ['Using tuples in older Java versions without Records', 'Not understanding Record immutability', 'Creating unnecessary custom classes'],
      typescript: ['Not using tuple types for fixed-length arrays', 'Type mismatches in tuple positions', 'Forgetting readonly for immutable tuples', 'Not using labeled tuple elements'],
      csharp: ['Confusing ValueTuple with older Tuple class', 'Not using named tuple elements', 'Forgetting tuples are value types (copied not referenced)'],
    },
    quiz: [
      {
        question: 'What is the key characteristic that distinguishes tuples from lists/arrays?',
        options: ['Tuples are faster', 'Tuples are immutable', 'Tuples can only hold numbers', 'Tuples have no length limit'],
        correctAnswer: 1,
        explanation: 'The key characteristic of tuples is immutability - once created, their contents cannot be modified, unlike lists/arrays.',
      },
    ],
    tryIt: 'Create a function that returns a tuple with three values: minimum, maximum, and average of a list of numbers.',
  },
];

// SWITCH AND ENUMS
export const SWITCH_ENUM_LESSONS: LessonStructure[] = [
  {
    id: 'switch-statements',
    title: 'Switch Statements - Multi-Way Branching',
    category: 'intermediate',
    order: 115,
    duration: '15 min',
    xpReward: 25,
    conceptText: `Switch statements provide a cleaner alternative to long chains of if-else statements when you need to compare a single value against multiple possibilities. Instead of writing many if-else blocks testing the same variable, a switch statement expresses the logic more clearly. This multi-way branching structure improves readability and often performs better than equivalent if-else chains.

Think about processing user menu selections. The user enters a number from one to five, and each number triggers different behavior. You could write five if-else statements checking the value, but a switch statement makes the parallel structure obvious. Each case represents one possibility, and the break statement prevents falling through to subsequent cases. The default case handles invalid inputs.

Different languages implement switches with varying capabilities and syntax. C-style languages like C++, Java, and C# use similar syntax with case labels and break statements. Python lacks a traditional switch statement until version 3.10, which introduced match-case with pattern matching. JavaScript supports switches but with quirks around type coercion. TypeScript adds type safety to JavaScript switches. Understanding these differences helps you write idiomatic code in each language.

Fall-through behavior is a powerful but dangerous feature. If you omit the break statement, execution continues into the next case. This allows multiple cases to share code but creates bugs when forgotten accidentally. Some languages like Swift require explicit fall-through. Others like C++ and Java make it the default behavior. Always be conscious of whether your breaks are intentional.

Switch statements have limitations. Most languages restrict switches to discrete values like integers, characters, or enums. Python's match statement supports rich pattern matching including ranges and guards. Java has evolved to support strings and later pattern matching. C++ traditionally supports integral types and enums. Understanding what your language's switch can handle determines when to use it versus if-else chains.

Modern languages are enhancing switches with pattern matching and expressions. Switch expressions return values, enabling functional programming styles. Pattern matching extends switches to destructure data structures. These features blur the line between switches and more general pattern matching systems. Learning these modern capabilities prepares you for evolving language features.`,
    diagram: 'Flowchart showing switch statement with multiple case branches',
    codeExamples: {
      python: `# Python - Match-case (Python 3.10+)
# No traditional switch statement in older Python

def process_command(command):
    # Old style: if-elif-else chain (pre-3.10)
    if command == "start":
        return "Starting..."
    elif command == "stop":
        return "Stopping..."
    elif command == "pause":
        return "Pausing..."
    else:
        return "Unknown command"

# Python 3.10+ match-case
def process_command_match(command):
    match command:
        case "start":
            return "Starting..."
        case "stop":
            return "Stopping..."
        case "pause":
            return "Pausing..."
        case _:  # Default case
            return "Unknown command"

print(process_command_match("start"))

# Pattern matching with values
def check_number(value):
    match value:
        case 0:
            return "Zero"
        case 1 | 2 | 3:  # Multiple patterns
            return "Small number"
        case n if n > 100:  # Guard clause
            return "Large number"
        case _:
            return "Other number"

# Pattern matching with types
def describe(value):
    match value:
        case int():
            return "Integer"
        case str():
            return "String"
        case list():
            return "List"
        case _:
            return "Something else"

# Destructuring in match
def process_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"Y-axis at {y}"
        case (x, 0):
            return f"X-axis at {x}"
        case (x, y):
            return f"Point at ({x}, {y})"

print(process_point((0, 0)))
print(process_point((5, 0)))`,
      cpp: `// C++ - Switch statement
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Basic switch
    int choice = 2;
    
    switch (choice) {
        case 1:
            cout << "Option 1" << endl;
            break;
        case 2:
            cout << "Option 2" << endl;
            break;
        case 3:
            cout << "Option 3" << endl;
            break;
        default:
            cout << "Invalid option" << endl;
    }
    
    // Switch with fall-through (intentional)
    int day = 3;
    
    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            cout << "Weekday" << endl;
            break;
        case 6:
        case 7:
            cout << "Weekend" << endl;
            break;
        default:
            cout << "Invalid day" << endl;
    }
    
    // Switch with char
    char grade = 'B';
    
    switch (grade) {
        case 'A':
            cout << "Excellent!" << endl;
            break;
        case 'B':
            cout << "Good" << endl;
            break;
        case 'C':
            cout << "Fair" << endl;
            break;
        case 'D':
        case 'F':
            cout << "Poor" << endl;
            break;
        default:
            cout << "Invalid grade" << endl;
    }
    
    // Switch with enum
    enum Color { RED, GREEN, BLUE };
    Color color = GREEN;
    
    switch (color) {
        case RED:
            cout << "Red color" << endl;
            break;
        case GREEN:
            cout << "Green color" << endl;
            break;
        case BLUE:
            cout << "Blue color" << endl;
            break;
    }
    
    // Cannot switch on strings in C++ (use if-else or map)
    
    return 0;
}`,
      javascript: `// JavaScript - Switch statement

// Basic switch
let choice = 2;

switch (choice) {
    case 1:
        console.log("Option 1");
        break;
    case 2:
        console.log("Option 2");
        break;
    case 3:
        console.log("Option 3");
        break;
    default:
        console.log("Invalid option");
}

// Switch with strings
let command = "start";

switch (command) {
    case "start":
        console.log("Starting...");
        break;
    case "stop":
        console.log("Stopping...");
        break;
    case "pause":
        console.log("Pausing...");
        break;
    default:
        console.log("Unknown command");
}

// Multiple cases (fall-through)
let day = 3;

switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        console.log("Weekday");
        break;
    case 6:
    case 7:
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}

// Type coercion warning!
let value = "2";

switch (value) {
    case 1:
        console.log("One");
        break;
    case "2":  // Matches! (string equality)
        console.log("Two (string)");
        break;
    case 2:  // Won't match (number)
        console.log("Two (number)");
        break;
}

// Switch expression pattern (return from switch)
function getGrade(score) {
    switch (true) {
        case score >= 90:
            return "A";
        case score >= 80:
            return "B";
        case score >= 70:
            return "C";
        case score >= 60:
            return "D";
        default:
            return "F";
    }
}

console.log(getGrade(85));  // B

// Modern alternative: object lookup
const commands = {
    start: () => "Starting...",
    stop: () => "Stopping...",
    pause: () => "Pausing..."
};

const result = commands[command]?.() || "Unknown command";`,
      java: `// Java - Switch statement
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Basic switch
        int choice = 2;
        
        switch (choice) {
            case 1:
                System.out.println("Option 1");
                break;
            case 2:
                System.out.println("Option 2");
                break;
            case 3:
                System.out.println("Option 3");
                break;
            default:
                System.out.println("Invalid option");
        }
        
        // Switch with strings (Java 7+)
        String command = "start";
        
        switch (command) {
            case "start":
                System.out.println("Starting...");
                break;
            case "stop":
                System.out.println("Stopping...");
                break;
            case "pause":
                System.out.println("Pausing...");
                break;
            default:
                System.out.println("Unknown command");
        }
        
        // Switch expression (Java 14+)
        String message = switch (choice) {
            case 1 -> "Option One";
            case 2 -> "Option Two";
            case 3 -> "Option Three";
            default -> "Invalid";
        };
        System.out.println(message);
        
        // Multiple cases with arrow syntax
        int day = 3;
        String dayType = switch (day) {
            case 1, 2, 3, 4, 5 -> "Weekday";
            case 6, 7 -> "Weekend";
            default -> "Invalid";
        };
        
        // Switch with enum
        enum Color { RED, GREEN, BLUE }
        Color color = Color.GREEN;
        
        switch (color) {
            case RED:
                System.out.println("Red");
                break;
            case GREEN:
                System.out.println("Green");
                break;
            case BLUE:
                System.out.println("Blue");
                break;
        }
        
        // Pattern matching (Java 17+)
        Object obj = "Hello";
        
        String result = switch (obj) {
            case Integer i -> "Integer: " + i;
            case String s -> "String: " + s;
            case null -> "Null";
            default -> "Other";
        };
    }
}`,
      typescript: `// TypeScript - Switch with type safety

// Basic switch
let choice: number = 2;

switch (choice) {
    case 1:
        console.log("Option 1");
        break;
    case 2:
        console.log("Option 2");
        break;
    case 3:
        console.log("Option 3");
        break;
    default:
        console.log("Invalid option");
}

// Switch with string literal types
type Command = "start" | "stop" | "pause";

function processCommand(command: Command): string {
    switch (command) {
        case "start":
            return "Starting...";
        case "stop":
            return "Stopping...";
        case "pause":
            return "Pausing...";
        // No default needed - all cases covered (exhaustive)
    }
}

// Exhaustiveness checking with never
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status): void {
    switch (status) {
        case "pending":
            console.log("Pending");
            break;
        case "approved":
            console.log("Approved");
            break;
        case "rejected":
            console.log("Rejected");
            break;
        default:
            // TypeScript ensures all cases are handled
            const _exhaustive: never = status;
            throw new Error(\`Unhandled status: \${status}\`);
    }
}

// Type narrowing in switch
type Shape = 
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript knows shape.radius exists here
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            // TypeScript knows shape.width and height exist
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}

// Enum switch
enum Color {
    Red,
    Green,
    Blue
}

function describeColor(color: Color): string {
    switch (color) {
        case Color.Red:
            return "Red color";
        case Color.Green:
            return "Green color";
        case Color.Blue:
            return "Blue color";
    }
}

// Switch expression pattern
function getGrade(score: number): string {
    switch (true) {
        case score >= 90:
            return "A";
        case score >= 80:
            return "B";
        case score >= 70:
            return "C";
        case score >= 60:
            return "D";
        default:
            return "F";
    }
}`,
      csharp: `// C# - Switch statement and expression
using System;

class Program {
    static void Main() {
        // Basic switch
        int choice = 2;
        
        switch (choice) {
            case 1:
                Console.WriteLine("Option 1");
                break;
            case 2:
                Console.WriteLine("Option 2");
                break;
            case 3:
                Console.WriteLine("Option 3");
                break;
            default:
                Console.WriteLine("Invalid option");
                break;
        }
        
        // Switch with strings
        string command = "start";
        
        switch (command) {
            case "start":
                Console.WriteLine("Starting...");
                break;
            case "stop":
                Console.WriteLine("Stopping...");
                break;
            case "pause":
                Console.WriteLine("Pausing...");
                break;
            default:
                Console.WriteLine("Unknown command");
                break;
        }
        
        // Switch expression (C# 8+)
        string message = choice switch {
            1 => "Option One",
            2 => "Option Two",
            3 => "Option Three",
            _ => "Invalid"
        };
        
        // Pattern matching
        object obj = "Hello";
        
        string result = obj switch {
            int i => $"Integer: {i}",
            string s => $"String: {s}",
            null => "Null",
            _ => "Other"
        };
        
        // When clause (guard)
        int number = 15;
        
        string category = number switch {
            < 0 => "Negative",
            0 => "Zero",
            > 0 and < 10 => "Small positive",
            >= 10 and < 100 => "Medium positive",
            _ => "Large positive"
        };
        
        // Tuple patterns
        (int x, int y) point = (0, 0);
        
        string location = point switch {
            (0, 0) => "Origin",
            (0, _) => "Y-axis",
            (_, 0) => "X-axis",
            _ => "Somewhere else"
        };
        
        // Type patterns with properties
        Shape shape = new Circle { Radius = 5 };
        
        string description = shape switch {
            Circle { Radius: > 10 } => "Large circle",
            Circle c => $"Circle with radius {c.Radius}",
            Rectangle { Width: var w, Height: var h } when w == h => "Square",
            Rectangle r => $"Rectangle {r.Width}x{r.Height}",
            _ => "Unknown shape"
        };
    }
}

abstract class Shape { }
class Circle : Shape { public double Radius { get; set; } }
class Rectangle : Shape { 
    public double Width { get; set; }
    public double Height { get; set; }
}`,
    },
    hints: [
      'Always include a default case to handle unexpected values.',
      'Remember to add break statements to prevent fall-through (except when intentional).',
      'Switch expressions (in modern languages) can make code more concise and functional.',
    ],
    commonErrors: {
      python: ['Using switch syntax in Python < 3.10', 'Not understanding match-case pattern matching', 'Forgetting underscore for default case'],
      cpp: ['Forgetting break statements', 'Trying to switch on strings', 'Declaring variables in case without braces', 'Not initializing enum values'],
      javascript: ['Forgetting break statements', 'Type coercion surprises with == comparison', 'Fall-through bugs', 'Not handling all cases'],
      java: ['Missing break statements', 'Not handling all enum values', 'Using non-constant case expressions', 'Forgetting arrow syntax needs no break'],
      typescript: ['Not using exhaustiveness checking', 'Missing cases in union type switches', 'Type narrowing not working due to missing breaks'],
      csharp: ['Forgetting break in traditional switch', 'Not understanding switch expression syntax', 'Pattern matching type errors', 'When clause logic errors'],
    },
    quiz: [
      {
        question: 'What happens if you forget a break statement in a switch case?',
        options: ['Compiler error', 'Runtime error', 'Execution falls through to the next case', 'Nothing, it works fine'],
        correctAnswer: 2,
        explanation: 'Without a break statement, execution continues into the next case (fall-through), which is usually unintentional and causes bugs.',
      },
    ],
    tryIt: 'Write a switch statement that converts a number (1-7) to a day of the week name.',
  },
];

// Helper function to get all lessons
export const getAllLessons = (): LessonStructure[] => {
  return [
    ...FOUNDATION_LESSONS,
    ...CONDITIONAL_LESSONS,
    ...CONTROL_FLOW_LESSONS,
    ...FUNCTION_LESSONS,
    ...ARRAY_LESSONS,
    ...OOP_LESSONS,
    ...WEB_LESSONS,
    ...PYTHON_LESSONS,
    ...JAVA_LESSONS,
    ...CSHARP_LESSONS,
    ...ADVANCED_LESSONS,
    ...MORE_CONTROL_FLOW_LESSONS,
    ...RECURSION_LESSONS,
    ...DATA_STRUCTURE_LESSONS,
    ...MORE_DATA_STRUCTURES,
    ...LAMBDA_LESSONS,
    ...TUPLES_ENUMS_LESSONS
  ];
};

// Helper to get lessons by category
export const getLessonsByCategory = (category: LessonStructure['category']) => {
  return getAllLessons().filter(lesson => lesson.category === category);
};

// Helper to get lesson by ID
export const getLessonById = (id: string) => {
  return getAllLessons().find(lesson => lesson.id === id);
};
