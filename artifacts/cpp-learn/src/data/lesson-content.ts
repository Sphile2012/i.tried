/**
 * Comprehensive Lesson Content for 6 Programming Languages
 * Based on the Python Programming Guide structure
 */

export type LanguageId = 'typescript' | 'cpp' | 'python' | 'java' | 'csharp' | 'react';

export interface Glossary {
  [term: string]: string;
}

export interface LessonTopic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  glossary?: Glossary;
}

export interface LessonCategory {
  id: string;
  title: string;
  icon: string;
  topics: LessonTopic[];
}

// Glossary definitions for each language
export const glossaries: Record<LanguageId, Glossary> = {
  python: {
    'variable': 'A named container that stores a value. In Python, you don\'t need to declare the type.',
    'function': 'A reusable block of code that performs a specific task. Defined with the def keyword.',
    'list': 'An ordered, mutable collection of items. Created with square brackets [].',
    'dictionary': 'A collection of key-value pairs. Created with curly braces {}.',
    'loop': 'A control structure that repeats a block of code multiple times.',
    'class': 'A blueprint for creating objects with specific attributes and methods.',
    'object': 'An instance of a class containing data and methods.',
    'string': 'A sequence of characters enclosed in quotes.',
    'integer': 'A whole number without decimals.',
    'boolean': 'A True or False value used for logical operations.',
  },
  
  typescript: {
    'variable': 'A named storage location. In TypeScript, you can specify types for better code safety.',
    'function': 'A reusable block of code. Can be typed with parameter and return types.',
    'array': 'An ordered collection of elements. Similar to Python lists.',
    'object': 'A collection of key-value pairs. TypeScript adds type checking.',
    'interface': 'A TypeScript feature that defines the structure of an object.',
    'type': 'A way to define custom types in TypeScript for better type safety.',
    'class': 'A blueprint for creating objects with properties and methods.',
    'string': 'A sequence of characters. TypeScript checks string operations at compile time.',
    'number': 'Numeric values (integers and floats). TypeScript uses one type for both.',
    'boolean': 'A true or false value for logical operations.',
  },
  
  cpp: {
    'variable': 'A named storage location with a specific data type that must be declared.',
    'function': 'A block of code that performs a task. Must specify return type and parameter types.',
    'array': 'A fixed-size collection of elements of the same type.',
    'pointer': 'A variable that stores the memory address of another variable.',
    'class': 'A user-defined type that encapsulates data and functions.',
    'object': 'An instance of a class created in memory.',
    'vector': 'A dynamic array from the Standard Template Library (STL).',
    'string': 'A sequence of characters. C++ provides std::string class.',
    'int': 'Integer type for whole numbers.',
    'bool': 'Boolean type for true/false values.',
  },
  
  java: {
    'variable': 'A named container for storing data. Java is strongly typed.',
    'method': 'A function defined within a class. Java calls them methods, not functions.',
    'array': 'A fixed-size collection of elements of the same type.',
    'object': 'An instance of a class. Everything in Java is an object (except primitives).',
    'class': 'A blueprint for objects. All Java code is written inside classes.',
    'interface': 'A contract that classes can implement, defining method signatures.',
    'String': 'An object that represents a sequence of characters.',
    'int': 'Primitive type for integer numbers.',
    'boolean': 'Primitive type for true/false values.',
    'ArrayList': 'A resizable array implementation from Java Collections.',
  },
  
  csharp: {
    'variable': 'A named storage location. C# is strongly typed like Java.',
    'method': 'A function that belongs to a class or struct.',
    'array': 'A fixed-size collection of elements of the same type.',
    'object': 'An instance of a class. C# is fully object-oriented.',
    'class': 'A blueprint for creating objects with properties and methods.',
    'interface': 'A contract defining members that implementing classes must provide.',
    'string': 'An immutable sequence of characters. Built-in reference type.',
    'int': 'Integer value type for whole numbers.',
    'bool': 'Boolean value type for true/false.',
    'List': 'A dynamic array from System.Collections.Generic.',
  },
  
  react: {
    'component': 'A reusable piece of UI. Can be a function or class that returns JSX.',
    'props': 'Short for properties. Data passed from parent to child components.',
    'state': 'Data that changes over time and triggers re-renders when updated.',
    'hook': 'A special function that lets you use React features like state in function components.',
    'JSX': 'JavaScript XML. A syntax extension that looks like HTML but is JavaScript.',
    'useState': 'A React Hook that adds state to function components.',
    'useEffect': 'A React Hook for side effects like data fetching or subscriptions.',
    'event': 'An action that occurs in the browser, like click or input.',
    'render': 'The process of displaying components on the screen.',
    'virtual DOM': 'React\'s representation of the actual DOM for efficient updates.',
  },
};

export const lessonContent: Record<LanguageId, LessonCategory[]> = {
  python: [
    {
      id: 'what-is-python',
      title: 'What is Python?',
      icon: '🐍',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to Python',
          content: `Python is a high-level, general-purpose programming language. "High-level" means it reads almost like plain English, so you don't have to talk to the computer in 1s and 0s or manage memory addresses yourself.

**Key Features:**
- **Easy to read & write** – uses indentation instead of curly braces
- **Interpreted language** – runs line-by-line, no separate compile step
- **Dynamically typed** – no need to declare variable types
- **Huge standard library** – "batteries included" philosophy
- **Cross-platform** – runs on Windows, macOS, and Linux`,
          codeExample: `# Hello World in Python
print("Hello, World!")

# Variables are easy
name = "Phumeh"
age = 21
is_student = True`,
        },
      ],
    },
    {
      id: 'syntax-basics',
      title: 'Python Syntax Basics',
      icon: '📝',
      topics: [
        {
          id: 'variables',
          title: 'Variables and Data Types',
          content: `A **variable** is a named container that stores a value. Python automatically figures out the type.

**Common Data Types:**
- **int** – whole numbers (e.g., 42)
- **float** – decimal numbers (e.g., 3.14)
- **str** – text in quotes (e.g., "hello")
- **bool** – True or False
- **list** – ordered collection [1, 2, 3]
- **dict** – key-value pairs {"name": "John"}`,
          codeExample: `# Variables
name = "Phumeh"
age = 21
height = 1.75
is_learning = True

# Lists
fruits = ["apple", "banana", "cherry"]

# Dictionaries
person = {
    "name": "Phumeh",
    "age": 21,
    "skills": ["Python", "C++"]
}`,
        },
      ],
    },
  ],
  
  typescript: [
    {
      id: 'what-is-typescript',
      title: 'What is TypeScript?',
      icon: '💙',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to TypeScript',
          content: `TypeScript is JavaScript with syntax for types. It's a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

**Key Features:**
- **Static Type Checking** – catch errors before runtime
- **Modern JavaScript Features** – use latest JS features
- **Better IDE Support** – autocomplete and refactoring
- **Compiles to JavaScript** – runs anywhere JS runs
- **Gradual Adoption** – can add types incrementally`,
          codeExample: `// Hello World in TypeScript
console.log("Hello, World!");

// Variables with types
let name: string = "Phumeh";
let age: number = 21;
let isStudent: boolean = true;`,
        },
      ],
    },
  ],
  
  cpp: [
    {
      id: 'what-is-cpp',
      title: 'What is C++?',
      icon: '⚡',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to C++',
          content: `C++ is a powerful, high-performance programming language. It's compiled, statically typed, and supports object-oriented, procedural, and generic programming.

**Key Features:**
- **High Performance** – compiles to native machine code
- **Low-level Control** – direct memory management
- **Object-Oriented** – classes, inheritance, polymorphism
- **Standard Template Library (STL)** – powerful data structures
- **Multi-paradigm** – supports multiple programming styles`,
          codeExample: `// Hello World in C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Variables must be declared with types
    string name = "Phumeh";
    int age = 21;
    bool isStudent = true;
    
    return 0;
}`,
        },
      ],
    },
  ],
  
  java: [
    {
      id: 'what-is-java',
      title: 'What is Java?',
      icon: '☕',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to Java',
          content: `Java is a class-based, object-oriented programming language. It's designed to have as few implementation dependencies as possible – "write once, run anywhere."

**Key Features:**
- **Object-Oriented** – everything is an object
- **Platform Independent** – runs on JVM (Java Virtual Machine)
- **Strongly Typed** – strict type checking
- **Automatic Memory Management** – garbage collection
- **Rich Standard Library** – comprehensive APIs`,
          codeExample: `// Hello World in Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables
        String name = "Phumeh";
        int age = 21;
        boolean isStudent = true;
    }
}`,
        },
      ],
    },
  ],
  
  csharp: [
    {
      id: 'what-is-csharp',
      title: 'What is C#?',
      icon: '🎯',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to C#',
          content: `C# (C-Sharp) is a modern, object-oriented programming language developed by Microsoft. It runs on the .NET platform and is used for building Windows apps, web apps, games, and more.

**Key Features:**
- **Modern and Simple** – clean, readable syntax
- **Type-Safe** – strong type checking
- **Object-Oriented** – full OOP support
- **Cross-Platform** – runs on .NET Core/5+
- **Rich Ecosystem** – extensive .NET libraries`,
          codeExample: `// Hello World in C#
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        
        // Variables
        string name = "Phumeh";
        int age = 21;
        bool isStudent = true;
    }
}`,
        },
      ],
    },
  ],
  
  react: [
    {
      id: 'what-is-react',
      title: 'What is React?',
      icon: '⚛️',
      topics: [
        {
          id: 'intro',
          title: 'Introduction to React',
          content: `React is a JavaScript library for building user interfaces. It lets you create reusable UI components and efficiently update the DOM when data changes.

**Key Features:**
- **Component-Based** – build encapsulated components
- **Declarative** – describe what UI should look like
- **Virtual DOM** – efficient updates and rendering
- **JSX** – write HTML-like code in JavaScript
- **Hooks** – use state and effects in functions`,
          codeExample: `// Hello World in React
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("Phumeh");
  const [age, setAge] = useState(21);
  
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>My name is {name}</p>
      <p>I am {age} years old</p>
    </div>
  );
}

export default App;`,
        },
      ],
    },
  ],
};
