/**
 * Comprehensive Infinity Code Curriculum for 6 Programming Languages
 * Complete beginner to advanced coverage with interactive glossary
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

// Comprehensive Glossary definitions for each language
export const glossaries: Record<LanguageId, Glossary> = {
  cpp: {
    'variable': 'A named storage location with a specific data type. Must be declared before use.',
    'function': 'A reusable block of code that performs a specific task. Can return a value.',
    'pointer': 'A variable that stores the memory address of another variable. Powerful but requires careful management.',
    'reference': 'An alias for another variable. Safer alternative to pointers in many cases.',
    'class': 'A user-defined type that encapsulates data (members) and functions (methods).',
    'object': 'An instance of a class. Created from the class blueprint.',
    'constructor': 'A special function that initializes an object when it is created.',
    'destructor': 'A special function that cleans up when an object is destroyed.',
    'inheritance': 'A mechanism where a class can derive properties and behavior from another class.',
    'polymorphism': 'The ability of different classes to be treated through the same interface.',
    'template': 'A blueprint for creating generic classes or functions that work with any data type.',
    'vector': 'A dynamic array from the STL that can grow and shrink in size.',
    'iterator': 'An object that points to elements in a container and allows traversal.',
    'namespace': 'A declarative region that provides scope for identifiers to prevent name conflicts.',
    'smart pointer': 'A class that wraps a raw pointer and automatically manages memory.',
    'unique_ptr': 'A smart pointer that owns and manages an object with exclusive ownership.',
    'shared_ptr': 'A smart pointer that allows multiple pointers to share ownership of an object.',
    'RAII': 'Resource Acquisition Is Initialization. A programming idiom that binds resource lifetime to object lifetime.',
    'lambda': 'An anonymous function that can be defined inline. Useful for short function objects.',
    'move semantics': 'A way to transfer resources from one object to another without copying.',
    'const': 'A keyword that makes a variable or object read-only, preventing modification.',
    'virtual': 'A keyword that enables polymorphism by allowing derived classes to override methods.',
    'override': 'Explicitly marks a function as overriding a base class virtual function.',
    'nullptr': 'A keyword representing a null pointer value. Safer than NULL.',
    'auto': 'A keyword that automatically deduces the type of a variable from its initializer.',
    'range-based loop': 'A loop that iterates over all elements in a container. Syntax: for(auto x : container)',
    'exception': 'An object thrown when an error occurs, allowing error handling separate from main logic.',
  },
  
  python: {
    'variable': 'A named container that stores a value. Python automatically determines the type.',
    'function': 'A reusable block of code defined with def keyword.',
    'list': 'An ordered, mutable collection of items. Created with square brackets [].',
    'tuple': 'An ordered, immutable collection. Created with parentheses ().',
    'dictionary': 'A collection of key-value pairs. Created with curly braces {}.',
    'set': 'An unordered collection of unique items.',
    'loop': 'A control structure that repeats code. Python has for and while loops.',
    'class': 'A blueprint for creating objects with attributes and methods.',
    'object': 'An instance of a class containing data and methods.',
    'method': 'A function defined inside a class that operates on objects.',
    'inheritance': 'A way for a class to inherit attributes and methods from another class.',
    'module': 'A file containing Python code that can be imported and reused.',
    'package': 'A directory containing multiple Python modules and an __init__.py file.',
    'decorator': 'A function that modifies the behavior of another function.',
    'generator': 'A function that yields values one at a time using the yield keyword.',
    'list comprehension': 'A concise way to create lists using the syntax [expr for item in iterable].',
    'lambda': 'A small anonymous function defined with the lambda keyword.',
    'exception': 'An error that occurs during program execution, handled with try/except.',
    'string': 'A sequence of characters. Immutable in Python.',
    'integer': 'A whole number without decimals.',
    'float': 'A number with a decimal point.',
    'boolean': 'A True or False value.',
    'None': 'A special value representing the absence of a value.',
    'with statement': 'A context manager that ensures proper resource cleanup.',
    'async/await': 'Keywords for writing asynchronous code that doesn\'t block.',
  },
  
  typescript: {
    'variable': 'A named storage location with an optional type annotation.',
    'function': 'A reusable block of code that can have typed parameters and return values.',
    'array': 'An ordered collection of elements. Can be typed like number[] or Array<number>.',
    'object': 'A collection of key-value pairs. Can be typed with interfaces or type aliases.',
    'interface': 'A TypeScript structure that defines the shape of an object.',
    'type': 'A way to create custom type definitions including unions, intersections, and aliases.',
    'class': 'A blueprint for creating objects with properties and methods.',
    'enum': 'A way to define a set of named constants.',
    'generic': 'A way to create reusable components that work with multiple types.',
    'union type': 'A type that can be one of several types, defined with the | operator.',
    'intersection type': 'A type that combines multiple types, defined with the & operator.',
    'tuple': 'An array with a fixed number of elements where each element has a specific type.',
    'null': 'A value representing the intentional absence of any object value.',
    'undefined': 'A value automatically assigned to variables that haven\'t been initialized.',
    'never': 'A type for values that never occur, like functions that always throw errors.',
    'any': 'A type that disables type checking. Use sparingly.',
    'unknown': 'A type-safe alternative to any. Must be narrowed before use.',
    'type guard': 'A conditional check that narrows types within a specific scope.',
    'decorator': 'A special declaration that can be attached to classes, methods, or properties.',
    'promise': 'An object representing the eventual completion or failure of an async operation.',
    'async/await': 'Keywords for writing asynchronous code that looks synchronous.',
    'module': 'A file containing code that can export and import functionality.',
    'namespace': 'A way to group related code and avoid naming collisions.',
    'readonly': 'A modifier that prevents properties from being modified after initialization.',
  },
  
  java: {
    'variable': 'A named container for storing data with a declared type.',
    'method': 'A function defined within a class. Java calls them methods.',
    'class': 'A blueprint for objects. All Java code is written inside classes.',
    'object': 'An instance of a class created using the new keyword.',
    'constructor': 'A special method called when creating an object. Same name as the class.',
    'interface': 'A contract that defines methods a class must implement.',
    'abstract class': 'A class that cannot be instantiated and may contain abstract methods.',
    'inheritance': 'A mechanism where a class extends another class to inherit its members.',
    'polymorphism': 'The ability to treat objects of different classes through a common interface.',
    'encapsulation': 'The bundling of data and methods, hiding implementation details.',
    'package': 'A namespace that organizes classes and interfaces.',
    'import': 'A statement that makes classes from other packages available.',
    'static': 'A keyword for class-level members that belong to the class, not instances.',
    'final': 'A keyword making variables constant, methods non-overridable, or classes non-extendable.',
    'this': 'A reference to the current object.',
    'super': 'A reference to the parent class.',
    'override': 'Annotation indicating a method overrides a parent class method.',
    'String': 'An object representing a sequence of characters. Immutable.',
    'ArrayList': 'A resizable array implementation from Java Collections.',
    'HashMap': 'A collection that stores key-value pairs.',
    'generics': 'A way to create classes and methods that work with any type.',
    'exception': 'An error object thrown when something goes wrong.',
    'try-catch': 'A structure for handling exceptions gracefully.',
    'null': 'A special value representing no object reference.',
    'primitive': 'Basic data types: int, double, boolean, char, etc.',
  },
  
  csharp: {
    'variable': 'A named storage location with a declared type.',
    'method': 'A function that belongs to a class or struct.',
    'class': 'A blueprint for creating objects with properties and methods.',
    'object': 'An instance of a class.',
    'constructor': 'A special method that initializes new objects.',
    'property': 'A member that provides a flexible way to read, write, or compute private fields.',
    'interface': 'A contract defining members that implementing classes must provide.',
    'abstract': 'A modifier for classes that cannot be instantiated and methods that must be overridden.',
    'inheritance': 'A mechanism where a class derives from another class.',
    'polymorphism': 'The ability to use objects of different types through a common interface.',
    'encapsulation': 'Hiding internal details and exposing only necessary parts.',
    'namespace': 'A container that organizes code and prevents naming conflicts.',
    'using': 'A directive to import namespaces or create aliases.',
    'static': 'A modifier for class-level members.',
    'virtual': 'A modifier allowing methods to be overridden in derived classes.',
    'override': 'A modifier indicating a method overrides a base class virtual method.',
    'sealed': 'A modifier preventing classes from being inherited or methods from being overridden.',
    'async/await': 'Keywords for writing asynchronous code.',
    'Task': 'A class representing an asynchronous operation.',
    'LINQ': 'Language-Integrated Query. A way to query collections with SQL-like syntax.',
    'lambda': 'An anonymous function using => syntax.',
    'delegate': 'A type that represents references to methods.',
    'event': 'A mechanism for communication between objects.',
    'generic': 'A way to create type-safe reusable components.',
    'List': 'A generic dynamic array from System.Collections.Generic.',
    'Dictionary': 'A generic collection of key-value pairs.',
    'null': 'A value representing no object reference.',
    'nullable': 'A type that can contain null values, marked with ?.',
  },
  
  react: {
    'component': 'A reusable piece of UI. Can be a function or class that returns JSX.',
    'props': 'Short for properties. Data passed from parent to child components. Immutable.',
    'state': 'Data that changes over time and triggers re-renders when updated.',
    'hook': 'A special function that lets you use React features in function components.',
    'JSX': 'JavaScript XML. A syntax extension that looks like HTML.',
    'useState': 'A Hook that adds state to function components.',
    'useEffect': 'A Hook for side effects like data fetching or subscriptions.',
    'useContext': 'A Hook for accessing context values without prop drilling.',
    'useReducer': 'A Hook for managing complex state with a reducer function.',
    'useRef': 'A Hook for persisting values between renders without causing re-renders.',
    'useMemo': 'A Hook that memoizes expensive calculations.',
    'useCallback': 'A Hook that memoizes function definitions.',
    'event': 'An action that occurs in the browser, like onClick or onChange.',
    'render': 'The process of creating React elements and displaying them.',
    'virtual DOM': 'React\'s representation of the actual DOM for efficient updates.',
    'reconciliation': 'The process of comparing virtual DOM trees to determine what changed.',
    'key': 'A special prop for identifying elements in lists to optimize rendering.',
    'children': 'A special prop containing the content between component opening and closing tags.',
    'controlled component': 'A form element whose value is controlled by React state.',
    'uncontrolled component': 'A form element that manages its own state internally.',
    'lifecycle': 'The series of phases a component goes through: mounting, updating, unmounting.',
    'context': 'A way to pass data through the component tree without props.',
    'portal': 'A way to render children into a DOM node outside the parent hierarchy.',
    'fragment': 'A way to group multiple elements without adding extra nodes to the DOM.',
    'memo': 'A higher-order component that prevents unnecessary re-renders.',
  },
};

export const lessonContent: Record<LanguageId, LessonCategory[]> = {
  cpp: [
    {
      id: 'fundamentals',
      title: '1. C++ Fundamentals',
      icon: '🎯',
      topics: [
        {
          id: 'what-is-cpp',
          title: 'What is C++?',
          content: `C++ is a powerful, high-performance programming language created by Bjarne Stroustrup in 1979. It extends the C language with **object-oriented** features while maintaining low-level control over memory and hardware.

**Why Learn C++?**
- **Performance**: Compiles directly to machine code for maximum speed
- **Control**: Direct memory management and hardware access
- **Versatility**: Used in games, operating systems, browsers, databases, embedded systems
- **Industry Standard**: Powers major software like Adobe, Microsoft Office, game engines

**Key Characteristics:**
- **Compiled Language**: Code is translated to machine code before running
- **Statically Typed**: variable types are checked at compile time
- **Multi-Paradigm**: Supports procedural, object-oriented, and generic programming
- **Backwards Compatible**: Can use C code directly in C++`,
          codeExample: `// Your first C++ program
#include <iostream>  // Include input/output library
using namespace std; // Use standard namespace

int main() {
    // Main function - program starts here
    cout << "Hello, Infinity Code!" << endl;
    return 0;  // Return 0 means success
}

// Compile with: g++ hello.cpp -o hello
// Run with: ./hello`,
        },
        {
          id: 'setup',
          title: 'Compiler and IDE Setup',
          content: `To write C++ code, you need a **compiler** (translates code to machine language) and an **IDE** (Integrated Development Environment) or text editor.

**Popular Compilers:**
- **GCC (g++)**: Free, cross-platform, widely used
- **Clang**: Modern, fast, excellent error messages
- **MSVC**: Microsoft Visual C++, best for Windows
- **MinGW**: GCC port for Windows

**Recommended IDEs:**
- **Visual Studio Code**: Lightweight, free, extensible
- **CLion**: Professional, intelligent, paid
- **Visual Studio**: Full-featured, Windows-focused
- **Code::Blocks**: Simple, free, beginner-friendly

**Online Compilers (for practice):**
- Compiler Explorer (godbolt.org)
- OnlineGDB
- Replit`,
          codeExample: `// Test your setup with this program
#include <iostream>
using namespace std;

int main() {
    cout << "Compiler works!" << endl;
    cout << "C++ version: " << __cplusplus << endl;
    return 0;
}

// If you see output, your setup is correct!`,
        },
        {
          id: 'program-structure',
          title: 'Program Structure',
          content: `Every C++ program follows a standard structure with specific components.

**Essential Parts:**
1. **Preprocessor Directives**: Lines starting with # (like #include)
2. **Namespace**: Scope for identifiers (usually std)
3. **Main function**: Entry point where execution begins
4. **Statements**: Individual instructions ending with semicolons
5. **Return Statement**: Signals program completion

**Program Flow:**
1. Preprocessor processes # directives
2. Compiler translates to machine code
3. Linker combines code with libraries
4. Executable file is created
5. Operating system runs the program starting at main()`,
          codeExample: `// Complete program structure
#include <iostream>  // 1. Include header file
#include <string>    // Multiple includes allowed

using namespace std; // 2. Use standard namespace

// 3. Function declarations (optional)
void greet(string name);

// 4. Main function (required!)
int main() {
    string userName = "Phumeh";
    greet(userName);  // 5. Statements
    return 0;         // 6. Return statement
}

// 7. Function definitions
void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}`,
        },
        {
          id: 'syntax-comments',
          title: 'Syntax and Comments',
          content: `C++ syntax rules determine how you write valid code. **Comments** are notes for humans that the compiler ignores.

**Syntax Rules:**
- Statements end with semicolons ;
- Blocks use curly braces { }
- C++ is case-sensitive (Name ≠ name)
- Whitespace (spaces, tabs, newlines) is mostly ignored

**Comment Types:**
- **Single-line**: // Everything after // is ignored
- **Multi-line**: /* Everything between these is ignored */
- **Documentation**: Special comments for generating docs

**Best Practices:**
- Explain WHY, not WHAT (code shows what)
- Keep comments up-to-date
- Use meaningful names instead of excessive comments`,
          codeExample: `// Single-line comment

/* 
   Multi-line comment
   Can span multiple lines
   Useful for longer explanations
*/

#include <iostream>
using namespace std;

int main() {
    // Declare and initialize a variable
    int score = 100;
    
    /* 
       TODO: Add user input validation
       This is temporary placeholder code
    */
    cout << "Score: " << score << endl;
    
    // Don't write this: int x = 5; // declare x
    // Do write this: int playerHealth = 100; // self-explanatory
    
    return 0;
}`,
        },
        {
          id: 'variables-datatypes',
          title: 'Variables and Data Types',
          content: `A **variable** is a named storage location in memory. Every variable has a **data type** that determines what kind of data it can hold and how much memory it uses.

**Fundamental Data Types:**
- **int**: Integer numbers (4 bytes: -2.1B to 2.1B)
- **double**: Floating-point numbers (8 bytes: ±1.7E-308 to ±1.7E+308)
- **float**: Smaller floating-point (4 bytes: ±3.4E-38 to ±3.4E+38)
- **char**: Single character (1 byte: 'A', 'z', '7', '@')
- **bool**: Boolean true or false (1 byte)
- **string**: Sequence of characters (from <string> library)

**Variable Declaration:**
type variableName = value;

**Naming Rules:**
- Must start with letter or underscore
- Can contain letters, digits, underscores
- Cannot use C++ keywords (int, if, class, etc.)
- Case-sensitive`,
          codeExample: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Integer types
    int age = 21;
    long bigNumber = 1000000000L;
    short smallNumber = 32000;
    
    // Floating-point types
    double pi = 3.14159265359;
    float temperature = 36.6f;  // f suffix for float
    
    // Character and string
    char grade = 'A';
    string name = "Phumeh";
    
    // Boolean
    bool isStudent = true;
    bool hasLicense = false;
    
    // Display
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Grade: " << grade << endl;
    cout << "Pi: " << pi << endl;
    cout << "Student: " << isStudent << endl;  // 1 for true
    
    return 0;
}`,
        },
        {
          id: 'constants',
          title: 'Constants',
          content: `**Constants** are variables whose values cannot be changed after initialization. They make code safer and more readable by preventing accidental modifications.

**Why Use Constants?**
- **Safety**: Prevents bugs from accidental changes
- **Clarity**: Makes intent clear (this value shouldn't change)
- **Optimization**: Compiler can optimize constant values
- **Maintainability**: Change one definition instead of many magic numbers

**Ways to Define Constants:**
1. **const keyword**: Traditional C++ way
2. **constexpr**: Compile-time constants (C++11+)
3. **#define**: Preprocessor macro (old C way, avoid in modern C++)

**Naming Convention:**
- ALL_CAPS_WITH_UNDERSCORES or kCamelCase`,
          codeExample: `#include <iostream>
using namespace std;

// Global constants
const double PI = 3.14159265359;
const int MAX_STUDENTS = 100;
constexpr int DAYS_IN_WEEK = 7;  // Compile-time constant

int main() {
    // Local constants
    const string SCHOOL_NAME = "Infinity Code";
    const int PASSING_GRADE = 50;
    
    // Calculate area
    const double radius = 5.0;
    double area = PI * radius * radius;
    
    cout << "Area: " << area << endl;
    cout << "Days in week: " << DAYS_IN_WEEK << endl;
    
    // This would cause an error:
    // PI = 3.14;  // Error: cannot modify const
    
    // constexpr must be known at compile time
    constexpr int HOURS_IN_DAY = 24;
    constexpr int MINUTES = HOURS_IN_DAY * 60;  // OK
    
    return 0;
}`,
        },
        {
          id: 'input-output',
          title: 'Input and Output',
          content: `**Input** reads data from the user. **Output** displays data to the screen. C++ uses streams from the <iostream> library.

**Output with cout:**
- **cout**: Character output stream
- **<<**: Insertion operator (sends data to cout)
- **endl**: End line (newline + flush buffer)

**Input with cin:**
- **cin**: Character input stream
- **>>**: Extraction operator (gets data from cin)
- Stops at whitespace (space, tab, newline)

**For strings with spaces:**
- Use getline(cin, variable)

**Common Issues:**
- cin leaves newline in buffer after >>
- Use cin.ignore() to clear buffer before getline()`,
          codeExample: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Output
    cout << "Welcome to Infinity Code!" << endl;
    cout << "Enter your details:" << endl;
    
    // Input basic types
    string firstName;
    int age;
    double height;
    
    cout << "First name: ";
    cin >> firstName;  // Stops at space
    
    cout << "Age: ";
    cin >> age;
    
    cout << "Height (m): ";
    cin >> height;
    
    // Clear buffer before getline
    cin.ignore();
    
    // Input string with spaces
    string fullName;
    cout << "Full name: ";
    getline(cin, fullName);
    
    // Output results
    cout << "\n--- Your Profile ---" << endl;
    cout << "Name: " << fullName << endl;
    cout << "First: " << firstName << endl;
    cout << "Age: " << age << " years" << endl;
    cout << "Height: " << height << " meters" << endl;
    
    return 0;
}`,
        },
        {
          id: 'operators',
          title: 'Operators',
          content: `**Operators** are symbols that perform operations on variables and values.

**Arithmetic Operators:**
- **+** Addition
- **-** Subtraction
- ***** Multiplication
- **/** Division (integer division if both operands are integers!)
- **%** Modulo (remainder)

**Comparison Operators:**
- **==** Equal to
- **!=** Not equal to
- **<** Less than
- **>** Greater than
- **<=** Less than or equal
- **>=** Greater than or equal

**Logical Operators:**
- **&&** AND (both must be true)
- **||** OR (at least one must be true)
- **!** NOT (inverts boolean)

**Assignment Operators:**
- **=** Assign
- **+=** Add and assign (a += 5 means a = a + 5)
- **-=, *=, /=, %=** Similar compound assignments

**Increment/Decrement:**
- **++** Increment by 1
- **--** Decrement by 1`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    // Arithmetic
    int a = 10, b = 3;
    cout << "a + b = " << (a + b) << endl;  // 13
    cout << "a - b = " << (a - b) << endl;  // 7
    cout << "a * b = " << (a * b) << endl;  // 30
    cout << "a / b = " << (a / b) << endl;  // 3 (integer division!)
    cout << "a % b = " << (a % b) << endl;  // 1 (remainder)
    
    // Floating-point division
    double c = 10.0, d = 3.0;
    cout << "c / d = " << (c / d) << endl;  // 3.33333
    
    // Comparison
    cout << "a == b: " << (a == b) << endl;  // 0 (false)
    cout << "a > b: " << (a > b) << endl;    // 1 (true)
    
    // Logical
    bool isAdult = true;
    bool hasLicense = false;
    cout << "Can drive: " << (isAdult && hasLicense) << endl;  // 0
    cout << "Is minor: " << (!isAdult) << endl;  // 0
    
    // Increment
    int x = 5;
    x++;  // x is now 6
    ++x;  // x is now 7
    cout << "x: " << x << endl;
    
    // Compound assignment
    x += 3;  // x = x + 3, x is now 10
    cout << "x: " << x << endl;
    
    return 0;
}`,
        },
        {
          id: 'type-casting',
          title: 'Type Casting',
          content: `**Type casting** converts a value from one data type to another. C++ has two types of casting.

**Implicit Casting (Automatic):**
- Compiler converts automatically
- From smaller to larger type (safe)
- Example: int to double

**Explicit Casting (Manual):**
- You force the conversion
- Needed when converting to smaller type
- Can lose data (double to int loses decimals)

**C++ Style Casting (Preferred):**
- **static_cast<type>(value)**: Safe conversions
- **dynamic_cast<type>(value)**: Runtime polymorphic casts
- **const_cast<type>(value)**: Remove const
- **reinterpret_cast<type>(value)**: Low-level reinterpretation

**C Style Casting (Old, Avoid):**
- (type)value or type(value)
- Less safe, harder to search in code

**Common Use Cases:**
- Division: int/int gives int, cast one to double
- User input: string to int using stoi()
- Pointer conversions`,
          codeExample: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Implicit casting (automatic)
    int intNum = 10;
    double doubleNum = intNum;  // int -> double (safe)
    cout << "Double: " << doubleNum << endl;  // 10.0
    
    // Explicit casting (manual)
    double pi = 3.14159;
    int piInt = static_cast<int>(pi);  // double -> int (loses .14159)
    cout << "Pi as int: " << piInt << endl;  // 3
    
    // Integer division problem
    int a = 7, b = 2;
    cout << "7 / 2 = " << (a / b) << endl;  // 3 (both int)
    
    // Solution: cast one to double
    double result = static_cast<double>(a) / b;
    cout << "7 / 2.0 = " << result << endl;  // 3.5
    
    // String to number
    string numStr = "42";
    int num = stoi(numStr);  // string to int
    cout << "Number: " << num << endl;
    
    // Number to string
    int score = 100;
    string scoreStr = to_string(score);
    cout << "Score string: " << scoreStr << endl;
    
    // Char to int (ASCII value)
    char letter = 'A';
    int ascii = static_cast<int>(letter);
    cout << "ASCII of A: " << ascii << endl;  // 65
    
    return 0;
}`,
        },
      ],
    },
    {
      id: 'control-flow',
      title: '2. Control Flow',
      icon: '🔀',
      topics: [
        {
          id: 'if-else',
          title: 'If, Else, Else If',
          content: `**Conditional statements** allow your program to make decisions and execute different code based on conditions.

**if Statement:**
- Executes code block if condition is true
- Syntax: if (condition) { code }

**else Statement:**
- Executes when if condition is false
- Optional, used with if

**else if Statement:**
- Tests additional conditions
- Can have multiple else if
- Only first true condition executes

**Nested If:**
- If statement inside another if
- Use for complex conditions

**Ternary Operator:**
- Short form: condition ? valueIfTrue : valueIfFalse
- Use for simple assignments`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    // Simple if
    int age = 21;
    if (age >= 18) {
        cout << "You are an adult." << endl;
    }
    
    // If-else
    int score = 75;
    if (score >= 50) {
        cout << "Passed!" << endl;
    } else {
        cout << "Failed." << endl;
    }
    
    // Else if (multiple conditions)
    int grade = 85;
    if (grade >= 90) {
        cout << "Grade: A" << endl;
    } else if (grade >= 80) {
        cout << "Grade: B" << endl;
    } else if (grade >= 70) {
        cout << "Grade: C" << endl;
    } else if (grade >= 60) {
        cout << "Grade: D" << endl;
    } else {
        cout << "Grade: F" << endl;
    }
    
    // Nested if
    bool hasTicket = true;
    bool isVIP = false;
    if (hasTicket) {
        if (isVIP) {
            cout << "VIP entrance" << endl;
        } else {
            cout << "General entrance" << endl;
        }
    } else {
        cout << "No entry" << endl;
    }
    
    // Ternary operator
    int num = 10;
    string result = (num % 2 == 0) ? "Even" : "Odd";
    cout << num << " is " << result << endl;
    
    return 0;
}`,
        },
        {
          id: 'switch',
          title: 'Switch Statement',
          content: `**Switch statement** tests a variable against multiple values. It's cleaner than many if-else statements when checking one variable against several constant values.

**How It Works:**
1. Evaluate the expression once
2. Compare with each case value
3. Execute matching case block
4. Break exits the switch
5. Default executes if no match

**Key Points:**
- Cases must be constant values (no variables or ranges)
- Break is important! Without it, execution "falls through" to next case
- Default is optional but recommended
- Can only test for equality (==)

**When to Use:**
- Multiple specific values to test
- Better readability than many if-else
- Menu systems, command processing

**When NOT to Use:**
- Range checking (use if-else)
- String comparison (use if-else)
- Complex conditions`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    // Basic switch
    int day = 3;
    
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        case 4:
            cout << "Thursday" << endl;
            break;
        case 5:
            cout << "Friday" << endl;
            break;
        case 6:
        case 7:
            cout << "Weekend!" << endl;
            break;
        default:
            cout << "Invalid day" << endl;
    }
    
    // Menu system example
    char choice;
    cout << "\n--- Menu ---" << endl;
    cout << "A. Add" << endl;
    cout << "S. Subtract" << endl;
    cout << "M. Multiply" << endl;
    cout << "Choice: ";
    cin >> choice;
    
    int a = 10, b = 5;
    
    switch (choice) {
        case 'A':
        case 'a':
            cout << "Result: " << (a + b) << endl;
            break;
        case 'S':
        case 's':
            cout << "Result: " << (a - b) << endl;
            break;
        case 'M':
        case 'm':
            cout << "Result: " << (a * b) << endl;
            break;
        default:
            cout << "Invalid choice" << endl;
    }
    
    return 0;
}`,
        },
      ],
    },
  ],
  // Continue with other languages...
  python: [],
  typescript: [],
  java: [],
  csharp: [],
  react: [],
};
