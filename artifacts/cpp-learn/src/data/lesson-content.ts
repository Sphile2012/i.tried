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
      icon: 'Target',
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
      icon: 'Flow',
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
          content: `**Switch statement** tests a variable against multiple values. Cleaner than many if-else when checking one variable.

**How It Works:**
1. Evaluate expression once
2. Compare with each case
3. Execute matching case
4. break exits switch
5. default executes if no match

**Key Points:**
- Cases must be constants
- break is important!
- Can only test equality
- Use for menu systems`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
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
        default:
            cout << "Other day" << endl;
    }
    
    return 0;
}`,
        },
        {
          id: 'for-loop',
          title: 'For Loop',
          content: `**for loop** repeats code a specific number of times. Best when you know iteration count.

**Syntax:**
for (init; condition; increment) { code }

**How It Works:**
1. Init runs once
2. Check condition
3. Execute code if true
4. Run increment
5. Repeat from step 2

**Common Uses:**
- Count 0 to n-1
- Array iteration
- Nested loops`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    // Count 1 to 5
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // Array iteration
    int arr[] = {10, 20, 30};
    for (int i = 0; i < 3; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
        },
        {
          id: 'while-loop',
          title: 'While Loop',
          content: `**while loop** repeats while condition is true. Best when iteration count is unknown.

**Syntax:**
while (condition) { code }

**Key Points:**
- Condition checked BEFORE execution
- Must make condition false eventually
- Risk of infinite loop

**Use Cases:**
- Input validation
- Unknown data amount
- Menu systems`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    int count = 1;
    while (count <= 5) {
        cout << count << " ";
        count++;
    }
    cout << endl;
    
    // Input validation
    int num;
    cout << "Enter positive: ";
    cin >> num;
    while (num <= 0) {
        cout << "Invalid! Try again: ";
        cin >> num;
    }
    cout << "Valid: " << num << endl;
    
    return 0;
}`,
        },
        {
          id: 'do-while',
          title: 'Do-While Loop',
          content: `**do-while loop** executes at least once, then checks condition.

**Syntax:**
do { code } while (condition);

**Difference:**
- while: Check first, maybe execute
- do-while: Execute first, then check

**Perfect For:**
- Menus (must show once)
- Input validation`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    int num;
    do {
        cout << "Enter positive: ";
        cin >> num;
    } while (num <= 0);
    
    cout << "You entered: " << num << endl;
    return 0;
}`,
        },
        {
          id: 'break-continue',
          title: 'Break and Continue',
          content: `**break** exits loop immediately. **continue** skips to next iteration.

**break:**
- Exits loop completely
- Continues after loop

**continue:**
- Skips rest of iteration
- Goes to next iteration

**Use Cases:**
- break: Found what you need
- continue: Skip invalid data`,
          codeExample: `#include <iostream>
using namespace std;

int main() {
    // break example
    for (int i = 1; i <= 10; i++) {
        if (i == 6) break;
        cout << i << " ";
    }
    cout << endl;
    
    // continue example (skip evens)
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        cout << i << " ";  // Only odds
    }
    cout << endl;
    
    return 0;
}`,
        },
      ],
    },
    {
      id: 'functions',
      title: '3. Functions',
      icon: 'Gear',
      topics: [
        {
          id: 'function-basics',
          title: 'Function Basics',
          content: `A **function** is a reusable code block that performs a task.

**Parts:**
1. Return type
2. Name
3. Parameters
4. Body
5. Return statement

**Why Use?**
- Reusability
- Organization
- Maintenance
- Readability`,
          codeExample: `#include <iostream>
using namespace std;

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    cout << "Sum: " << result << endl;
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`,
        },
      ],
    },
  ],
  python: [
    {
      id: 'fundamentals',
      title: '1. Python Fundamentals',
      icon: 'Target',
      topics: [
        {
          id: 'what-is-python',
          title: 'What is Python?',
          content: `Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It emphasizes code readability with significant indentation and dynamic semantics.

**Why Learn Python?**
- **Easy to Learn**: Clean, readable syntax close to English
- **Versatile**: Web development, data science, AI, automation, scripting
- **Large Community**: Extensive libraries and frameworks
- **High Demand**: One of the most sought-after skills

**Key Characteristics:**
- **Interpreted**: Code runs line by line
- **Dynamically Typed**: No need to declare variable types
- **Multi-Paradigm**: Supports procedural, OOP, and functional programming
- **Cross-Platform**: Runs on Windows, Mac, Linux`,
          codeExample: `# Your first Python program
print("Hello, Infinity Code!")

# Variables (no type declaration needed!)
name = "Phumeh"
age = 21
height = 1.75
is_student = True

# Display
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Student: {is_student}")`,
        },
        {
          id: 'variables-datatypes',
          title: 'Variables and Data Types',
          content: `Python has several built-in data types. Variables are created when you first assign a value.

**Numeric Types:**
- **int**: Whole numbers (42, -17, 0)
- **float**: Decimal numbers (3.14, -0.5)
- **complex**: Complex numbers (3+4j)

**Sequence Types:**
- **str**: Text strings ("Hello")
- **list**: Ordered, mutable [1, 2, 3]
- **tuple**: Ordered, immutable (1, 2, 3)

**Mapping Type:**
- **dict**: Key-value pairs {"name": "John"}

**Boolean Type:**
- **bool**: True or False

**None Type:**
- **NoneType**: None (absence of value)`,
          codeExample: `# Numbers
age = 25           # int
price = 19.99      # float
complex_num = 3 + 4j  # complex

# Strings
name = "Python"
message = 'Hello World'
multi_line = """This is
a multi-line string"""

# Lists (mutable)
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")  # Add item
fruits[0] = "apricot"    # Modify

# Tuples (immutable)
coordinates = (10, 20)
colors = ("red", "green", "blue")

# Dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}
print(person["name"])  # Access value

# Booleans
is_active = True
is_admin = False

# None
result = None  # No value

print(type(age))      # <class 'int'>
print(type(fruits))   # <class 'list'>
print(type(person))   # <class 'dict'>`,
        },
        {
          id: 'operators',
          title: 'Operators',
          content: `Operators perform operations on variables and values.

**Arithmetic:** +, -, *, /, // (floor), ** (power), % (modulo)

**Comparison:** ==, !=, <, >, <=, >=

**Logical:** and, or, not

**Identity:** is, is not

**Membership:** in, not in

**Bitwise:** &, |, ^, ~, <<, >>`,
          codeExample: `# Arithmetic
a, b = 10, 3
print(a + b)   # 13
print(a / b)   # 3.333...
print(a // b)  # 3 (floor division)
print(a ** b)  # 1000 (power)
print(a % b)   # 1 (remainder)

# Comparison
print(a == b)  # False
print(a > b)   # True
print(a != b)  # True

# Logical
x, y = True, False
print(x and y)  # False
print(x or y)   # True
print(not x)    # False

# Membership
fruits = ["apple", "banana"]
print("apple" in fruits)    # True
print("orange" not in fruits)  # True

# Identity
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b)   # True (same object)
print(a is c)   # False (different objects)
print(a == c)   # True (same values)`,
        },
        {
          id: 'control-flow',
          title: 'Control Flow',
          content: `Control flow statements control the order of code execution.

**if, elif, else:** Conditional execution

**for loop:** Iterate over sequences

**while loop:** Repeat while condition is true

**break:** Exit loop

**continue:** Skip to next iteration

**pass:** Do nothing (placeholder)`,
          codeExample: `# If-elif-else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Grade: {grade}")

# For loop
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4

# Iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count, end=" ")
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i, end=" ")  # 0 1 2 4 5 6`,
        },
        {
          id: 'functions',
          title: 'Functions',
          content: `Functions are reusable blocks of code defined with def.

**Syntax:**
def function_name(parameters):
    """docstring"""
    return value

**Key Concepts:**
- Default parameters
- Variable arguments (*args, **kwargs)
- Lambda functions
- Scope (local, global)`,
          codeExample: `# Basic function
def greet(name):
    """Return a greeting message"""
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Default parameter
def power(base, exp=2):
    return base ** exp

print(power(3))     # 9
print(power(3, 3))  # 27

# Variable arguments
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))  # 10

# Keyword arguments
def create_person(**kwargs):
    return kwargs

person = create_person(name="Bob", age=25)
print(person)  # {'name': 'Bob', 'age': 25}

# Lambda (anonymous function)
square = lambda x: x ** 2
print(square(5))  # 25

# Using with map
numbers = [1, 2, 3, 4]
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16]`,
        },
        {
          id: 'list-comprehension',
          title: 'List Comprehension',
          content: `List comprehension provides a concise way to create lists.

**Syntax:**
[expression for item in iterable if condition]

**Benefits:**
- More readable
- Faster than for loops
- Functional programming style`,
          codeExample: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique_lengths = {len(word) for word in ["hello", "world", "python"]}
print(unique_lengths)  # {5, 6}`,
        },
      ],
    },
    {
      id: 'data-structures',
      title: '2. Data Structures',
      icon: 'Box',
      topics: [
        {
          id: 'lists-tuples',
          title: 'Lists and Tuples',
          content: `**Lists** are ordered, mutable collections.
**Tuples** are ordered, immutable collections.

**List Methods:**
- append(), extend(), insert()
- remove(), pop(), clear()
- sort(), reverse()
- index(), count()

**Tuple:**
- Faster than lists
- Can be used as dictionary keys
- Immutable - cannot change after creation`,
          codeExample: `# Lists
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits.insert(0, "apricot")
fruits.remove("banana")

# Slicing
print(fruits[0:2])   # ['apricot', 'apple']
print(fruits[-1])    # Last item
print(fruits[::-1])  # Reversed

# List unpacking
a, b, c = fruits
print(a, b, c)

# Tuples
coordinates = (10, 20)
x, y = coordinates  # Unpacking
print(f"({x}, {y})")

# Named tuple
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # 10 20`,
        },
        {
          id: 'dictionaries-sets',
          title: 'Dictionaries and Sets',
          content: `**Dictionary** is an unordered collection of key-value pairs.
**Set** is an unordered collection of unique elements.

**Dict Methods:**
- keys(), values(), items()
- get(), setdefault()
- update(), pop()

**Set Operations:**
- union (|), intersection (&)
- difference (-), symmetric_difference (^)`,
          codeExample: `# Dictionary
person = {"name": "Alice", "age": 30}
person["city"] = "NYC"  # Add
person["age"] = 31      # Update

# Safe access
print(person.get("email", "Not provided"))

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")

# Sets
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

print(set_a | set_b)  # Union: {1, 2, 3, 4, 5, 6, 7, 8}
print(set_a & set_b)  # Intersection: {4, 5}
print(set_a - set_b)  # Difference: {1, 2, 3}
print(set_a ^ set_b)  # Symmetric diff: {1, 2, 3, 6, 7, 8}`,
        },
      ],
    },
    {
      id: 'oop',
      title: '3. Object-Oriented Programming',
      icon: 'Build',
      topics: [
        {
          id: 'classes-objects',
          title: 'Classes and Objects',
          content: `**Class** is a blueprint for creating objects.
**Object** is an instance of a class.

**Key Concepts:**
- __init__ method (constructor)
- self parameter
- Instance and class attributes
- Instance and class methods`,
          codeExample: `class Person:
    # Class attribute
    species = "Homo sapiens"
    
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age
    
    # Instance method
    def greet(self):
        return f"Hi, I'm {self.name}"
    
    # Class method
    @classmethod
    def get_species(cls):
        return cls.species
    
    # Static method
    @staticmethod
    def is_adult(age):
        return age >= 18
    
    # String representation
    def __str__(self):
        return f"Person({self.name}, {self.age})"

# Create objects
alice = Person("Alice", 30)
bob = Person("Bob", 25)

print(alice.greet())        # Hi, I'm Alice
print(Person.get_species()) # Homo sapiens
print(Person.is_adult(20))  # True
print(alice)                # Person(Alice, 30)`,
        },
        {
          id: 'inheritance',
          title: 'Inheritance',
          content: `**Inheritance** allows a class to inherit attributes and methods from another class.

**Key Concepts:**
- Parent/Base class
- Child/Derived class
- super() function
- Method overriding
- Multiple inheritance`,
          codeExample: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    
    # Method overriding
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers")

print(dog.name)     # Buddy
print(dog.speak())  # Woof!
print(cat.speak())  # Meow!

# isinstance check
print(isinstance(dog, Dog))    # True
print(isinstance(dog, Animal)) # True`,
        },
      ],
    },
  ],
  typescript: [
    {
      id: 'fundamentals',
      title: '1. TypeScript Fundamentals',
      icon: 'Target',
      topics: [
        {
          id: 'what-is-typescript',
          title: 'What is TypeScript?',
          content: `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Created by Microsoft in 2012.

**Why TypeScript?**
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocompletion, navigation, refactoring
- **Modern JavaScript**: Use latest ES features
- **Scalability**: Better for large codebases

**Key Features:**
- Static type checking
- Interfaces and generics
- Enums and tuples
- Advanced type inference`,
          codeExample: `// TypeScript file: hello.ts
const greeting: string = "Hello, TypeScript!";
console.log(greeting);

// Type annotations
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["coding", "reading"];

// Interface
interface Person {
  name: string;
  age: number;
  email?: string; // Optional
}

const user: Person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Type alias
type ID = string | number;
const userId: ID = "abc123";

// Compile with: tsc hello.ts
// Run with: node hello.js`,
        },
        {
          id: 'basic-types',
          title: 'Basic Types',
          content: `TypeScript provides several basic types for type safety.

**Primitive Types:**
- string, number, boolean
- null, undefined
- void, never
- any, unknown

**Special Types:**
- Array types: number[], Array<string>
- Tuple: [string, number]
- Enum: enum { Red, Green, Blue }
- Union: string | number
- Intersection: TypeA & TypeB`,
          codeExample: `// String
let name: string = "TypeScript";

// Number (no int/float distinction)
let age: number = 25;
let pi: number = 3.14;

// Boolean
let isActive: boolean = true;

// Array
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuple (fixed length, known types)
let tuple: [string, number] = ["Alice", 30];
console.log(tuple[0]); // "Alice"

// Enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
let favoriteColor: Color = Color.Blue;

// Any (avoid when possible)
let flexible: any = 4;
flexible = "now a string";

// Unknown (type-safe any)
let unknownValue: unknown = "hello";
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

// Void (no return value)
function log(message: string): void {
  console.log(message);
}

// Never (never returns)
function throwError(msg: string): never {
  throw new Error(msg);
}

// Union types
let id: string | number;
id = "abc123";
id = 123;

// Type inference (TypeScript figures out the type)
let inferred = "hello"; // TypeScript knows this is string`,
        },
        {
          id: 'interfaces-types',
          title: 'Interfaces and Type Aliases',
          content: `**Interfaces** define the shape of objects.
**Type Aliases** create custom type names.

**Interface Features:**
- Optional properties (?)
- Readonly properties
- Function types
- Index signatures
- Extending interfaces

**Type vs Interface:**
- Interfaces can be extended and merged
- Types support unions, intersections, mapped types`,
          codeExample: `// Interface
interface User {
  id: number;
  name: string;
  email?: string;        // Optional
  readonly createdAt: Date; // Readonly
}

interface Employee extends User {
  department: string;
  salary: number;
}

const employee: Employee = {
  id: 1,
  name: "Alice",
  email: "alice@company.com",
  createdAt: new Date(),
  department: "Engineering",
  salary: 100000
};

// Type Alias
type Point = {
  x: number;
  y: number;
};

type Color = "red" | "green" | "blue";

type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Using type alias
const point: Point = { x: 10, y: 20 };
const color: Color = "red";

// Intersection type
type Person = User & { phone?: string };

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const stringContainer: Container<string> = {
  value: "hello",
  getValue() { return this.value; }
};`,
        },
        {
          id: 'generics',
          title: 'Generics',
          content: `**Generics** allow creating reusable components that work with multiple types.

**Use Cases:**
- Generic functions
- Generic classes
- Generic interfaces
- Type constraints

**Benefits:**
- Type safety with flexibility
- Code reusability
- DRY principle`,
          codeExample: `// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>("hello");
const output2 = identity<number>(42);

// Generic with constraint
function logLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

logLength("hello");      // OK
logLength([1, 2, 3]);    // OK
// logLength(123);       // Error: no length property

// Generic interface
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const entry1: KeyValuePair<string, number> = {
  key: "age",
  value: 30
};

// Generic class
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2`,
        },
      ],
    },
    {
      id: 'advanced-types',
      title: '2. Advanced Types',
      icon: 'Tools',
      topics: [
        {
          id: 'type-guards',
          title: 'Type Guards and Narrowing',
          content: `**Type guards** are expressions that perform runtime checks to narrow down types.

**Type Guard Methods:**
- typeof
- instanceof
- in operator
- Type predicates
- Discriminated unions`,
          codeExample: `// typeof guard
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// instanceof guard
class Dog { bark() { return "Woof!"; } }
class Cat { meow() { return "Meow!"; } }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark());
  } else {
    console.log(animal.meow());
  }
}

// Type predicate
function isFish(pet: Dog | Cat): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

// Discriminated union
interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}

// "in" operator guard
interface Admin { name: string; permissions: string[]; }
interface User { name: string; email: string; }

function printName(person: Admin | User) {
  if ("permissions" in person) {
    console.log('Admin: ' + person.name);
  } else {
    console.log('User: ' + person.name);
  }
}`,
        },
        {
          id: 'utility-types',
          title: 'Utility Types',
          content: `TypeScript provides built-in utility types for common transformations.

**Common Utility Types:**
- Partial<T>: All properties optional
- Required<T>: All properties required
- Readonly<T>: All properties readonly
- Pick<T, K>: Select specific properties
- Omit<T, K>: Exclude specific properties
- Record<K, V>: Map keys to values`,
          codeExample: `interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Partial - all properties optional
type UpdateProduct = Partial<Product>;
const update: UpdateProduct = { price: 99.99 };

// Required - all properties required
type RequiredProduct = Required<UpdateProduct>;

// Readonly - cannot modify properties
const config: Readonly<Product> = {
  id: 1, name: "Laptop", price: 999, description: "A laptop"
};
// config.price = 899; // Error!

// Pick - select specific properties
type ProductSummary = Pick<Product, "id" | "name">;
const summary: ProductSummary = { id: 1, name: "Laptop" };

// Omit - exclude specific properties
type ProductWithoutId = Omit<Product, "id">;

// Record - create object type with specific keys
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// ReturnType - extract return type of function
function getUser() { return { id: 1, name: "Alice" }; }
type User = ReturnType<typeof getUser>;

// Parameters - extract parameter types
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>; // [string, number]`,
        },
      ],
    },
  ],
  java: [
    {
      id: 'fundamentals',
      title: '1. Java Fundamentals',
      icon: 'Java',
      topics: [
        {
          id: 'what-is-java',
          title: 'What is Java?',
          content: `Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle) in 1995.

**Why Learn Java?**
- **Platform Independent**: Write Once, Run Anywhere (WORA)
- **Enterprise Standard**: Widely used in large-scale applications
- **Android Development**: Primary language for Android apps
- **Robust Ecosystem**: Spring, Hibernate, Maven, Gradle

**Key Characteristics:**
- Compiled to bytecode, runs on JVM
- Strongly typed and statically typed
- Automatic memory management (garbage collection)
- Multi-threading support`,
          codeExample: `// Main.java
public class Main {
    // Main method - entry point
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        
        // Variables
        String name = "Phumeh";
        int age = 21;
        double salary = 50000.50;
        boolean isStudent = true;
        
        // Output
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.printf("Salary: $%.2f%n", salary);
    }
}

// Compile: javac Main.java
// Run: java Main`,
        },
        {
          id: 'data-types',
          title: 'Data Types and Variables',
          content: `Java has two categories of data types:

**Primitive Types:**
- byte, short, int, long (integers)
- float, double (floating-point)
- char (single character)
- boolean (true/false)

**Reference Types:**
- String, Arrays, Classes, Interfaces

**Variable Declaration:**
type variableName = value;`,
          codeExample: `public class DataTypes {
    public static void main(String[] args) {
        // Integer types
        byte b = 127;
        short s = 32000;
        int i = 100000;
        long l = 1000000000L;
        
        // Floating-point
        float f = 3.14f;    // f suffix required
        double d = 3.14159265359;
        
        // Character
        char grade = 'A';
        
        // Boolean
        boolean isJavaFun = true;
        
        // String (reference type)
        String message = "Hello Java!";
        
        // Type conversion
        int numInt = 10;
        double numDouble = numInt;  // Automatic (widening)
        
        double pi = 3.14;
        int piInt = (int) pi;  // Manual cast (narrowing)
        
        // Constants
        final double PI = 3.14159;
        // PI = 3.14;  // Error: cannot modify final
        
        System.out.println("Grade: " + grade);
        System.out.println("Message: " + message);
    }
}`,
        },
        {
          id: 'operators',
          title: 'Operators',
          content: `Java supports various operators for operations.

**Arithmetic:** +, -, *, /, %, ++, --

**Comparison:** ==, !=, <, >, <=, >=

**Logical:** &&, ||, !

**Bitwise:** &, |, ^, ~, <<, >>, >>>

**Assignment:** =, +=, -=, *=, /=, %=`,
          codeExample: `public class Operators {
    public static void main(String[] args) {
        // Arithmetic
        int a = 10, b = 3;
        System.out.println("a + b = " + (a + b));  // 13
        System.out.println("a / b = " + (a / b));  // 3 (integer)
        System.out.println("a % b = " + (a % b));  // 1
        
        // Comparison
        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a > b: " + (a > b));    // true
        
        // Logical
        boolean x = true, y = false;
        System.out.println("x && y: " + (x && y));  // false
        System.out.println("x || y: " + (x || y));  // true
        System.out.println("!x: " + (!x));          // false
        
        // Increment
        int count = 5;
        count++;  // Post-increment
        ++count;  // Pre-increment
        
        // Ternary
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);  // 10
    }
}`,
        },
        {
          id: 'control-flow',
          title: 'Control Flow',
          content: `Control flow statements control program execution order.

**Conditional:**
- if, else if, else
- switch

**Loops:**
- for, enhanced for (for-each)
- while, do-while

**Branching:**
- break, continue, return`,
          codeExample: `public class ControlFlow {
    public static void main(String[] args) {
        // If-else
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }
        
        // Switch
        int day = 3;
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // Enhanced for
        String[] fruits = {"apple", "banana", "cherry"};
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // While
        int count = 0;
        while (count < 3) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // Break and continue
        for (int i = 0; i < 10; i++) {
            if (i == 3) continue;  // Skip 3
            if (i == 7) break;     // Stop at 7
            System.out.print(i + " ");
        }
    }
}`,
        },
        {
          id: 'methods',
          title: 'Methods',
          content: `Methods are blocks of code that perform specific tasks.

**Method Structure:**
accessModifier returnType methodName(parameters) { }

**Key Concepts:**
- Method overloading
- Pass by value
- Varargs
- Recursion`,
          codeExample: `public class Methods {
    // Basic method
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method overloading
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Varargs
    public static int sumAll(int... numbers) {
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        return sum;
    }
    
    // Recursive method
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("5 + 3 = " + add(5, 3));
        System.out.println("5.5 + 3.2 = " + add(5.5, 3.2));
        System.out.println("Sum: " + sumAll(1, 2, 3, 4, 5));
        System.out.println("5! = " + factorial(5));  // 120
    }
}`,
        },
      ],
    },
    {
      id: 'oop',
      title: '2. Object-Oriented Programming',
      icon: 'Build',
      topics: [
        {
          id: 'classes-objects',
          title: 'Classes and Objects',
          content: `**Class** is a blueprint for creating objects.
**Object** is an instance of a class.

**Key Concepts:**
- Fields (instance variables)
- Constructors
- Methods
- this keyword
- Access modifiers`,
          codeExample: `// Class definition
class Person {
    // Fields
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
    
    // Setter methods
    public void setAge(int age) {
        if (age > 0) this.age = age;
    }
    
    // Instance method
    public void greet() {
        System.out.println("Hi, I'm " + name);
    }
    
    // Override toString
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// Main class
public class Main {
    public static void main(String[] args) {
        // Create objects
        Person alice = new Person("Alice", 30);
        Person bob = new Person("Bob", 25);
        
        alice.greet();  // Hi, I'm Alice
        System.out.println(bob);  // Person{name='Bob', age=25}
        
        bob.setAge(26);
        System.out.println("Bob is " + bob.getAge());
    }
}`,
        },
        {
          id: 'inheritance-polymorphism',
          title: 'Inheritance and Polymorphism',
          content: `**Inheritance** allows a class to inherit from another.
**Polymorphism** allows objects to be treated through a common interface.

**Key Concepts:**
- extends keyword
- super keyword
- Method overriding
- Abstract classes
- Interfaces`,
          codeExample: `// Abstract class
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract method
    public abstract void makeSound();
    
    // Concrete method
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Interface
interface Swimmable {
    void swim();
}

// Subclass
class Dog extends Animal implements Swimmable {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof!");
    }
    
    @Override
    public void swim() {
        System.out.println(name + " is swimming");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Meow!");
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        // Polymorphism
        Animal dog = new Dog("Buddy");
        Animal cat = new Cat("Whiskers");
        
        dog.makeSound();  // Buddy says: Woof!
        cat.makeSound();  // Whiskers says: Meow!
        
        // instanceof check
        if (dog instanceof Dog) {
            ((Dog) dog).swim();
        }
    }
}`,
        },
      ],
    },
  ],
  csharp: [
    {
      id: 'fundamentals',
      title: '1. C# Fundamentals',
      icon: 'Target',
      topics: [
        {
          id: 'what-is-csharp',
          title: 'What is C#?',
          content: `C# (C Sharp) is a modern, object-oriented programming language developed by Microsoft in 2000.

**Why Learn C#?**
- **Versatile**: Web, desktop, mobile, games (Unity)
- **.NET Ecosystem**: Rich libraries and frameworks
- **Enterprise Ready**: Widely used in business applications
- **Modern Features**: LINQ, async/await, properties

**Key Characteristics:**
- Compiled to Intermediate Language (IL)
- Runs on .NET runtime (CLR)
- Type-safe and memory-safe
- Cross-platform with .NET Core`,
          codeExample: `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, C#!");
            
            // Variables
            string name = "Phumeh";
            int age = 21;
            double salary = 50000.50;
            bool isStudent = true;
            
            // String interpolation
            Console.WriteLine($"Name: {name}");
            Console.WriteLine($"Age: {age}");
            Console.WriteLine($"Salary: \${salary:F2}");
        }
    }
}

// Run with: dotnet run`,
        },
        {
          id: 'data-types',
          title: 'Data Types and Variables',
          content: `C# is a strongly typed language with value and reference types.

**Value Types:**
- int, long, float, double, decimal
- bool, char
- struct, enum

**Reference Types:**
- string, object
- class, interface, delegate
- array, dynamic

**Variable Declaration:**
- var for implicit typing
- const for constants`,
          codeExample: `using System;

class DataTypes
{
    static void Main()
    {
        // Integer types
        int num = 100;
        long bigNum = 1000000000L;
        
        // Floating-point
        float pi = 3.14f;
        double d = 3.14159;
        decimal money = 19.99m;
        
        // String
        string name = "C#";
        string path = @"C:\Users\Name";  // Verbatim
        
        // Boolean
        bool isActive = true;
        
        // Char
        char grade = 'A';
        
        // Implicit typing
        var message = "Hello";  // Compiler infers string
        var numbers = new[] { 1, 2, 3 };  // int[]
        
        // Constants
        const double PI = 3.14159;
        // PI = 3.14;  // Error: const is readonly
        
        // Nullable types
        int? nullableInt = null;
        
        Console.WriteLine($"Name: {name}");
        Console.WriteLine($"Money: \${money}");
    }
}`,
        },
        {
          id: 'properties',
          title: 'Properties and Auto-Properties',
          content: `Properties provide flexible access to class fields.

**Auto-Properties:**
- Automatic backing field
- Get and set accessors
- Init-only properties (C# 9+)

**Property Features:**
- Read-only properties
- Computed properties
- Expression-bodied properties`,
          codeExample: `class Person
{
    // Auto-property
    public string Name { get; set; }
    
    // Read-only auto-property
    public int Id { get; }
    
    // Property with backing field
    private int age;
    public int Age
    {
        get { return age; }
        set
        {
            if (value < 0 || value > 150)
                throw new ArgumentException("Invalid age");
            age = value;
        }
    }
    
    // Computed property
    public string FullName => $"{FirstName} {LastName}";
    
    // Init-only (C# 9+)
    public string Email { get; init; }
    
    public Person(string name, int id)
    {
        Name = name;
        Id = id;
    }
}

// Usage
var person = new Person("Alice", 1)
{
    Age = 30,
    Email = "alice@example.com"
};

Console.WriteLine(person.FullName);  // Alice undefined
// person.Email = "new@example.com";  // Error: init-only`,
        },
      ],
    },
    {
      id: 'linq',
      title: '2. LINQ (Language Integrated Query)',
      icon: 'Search',
      topics: [
        {
          id: 'linq-basics',
          title: 'LINQ Basics',
          content: `LINQ provides query capabilities directly in C#.

**Query Syntax vs Method Syntax:**
- Query: from x in collection where condition select x
- Method: collection.Where(condition).Select(x => x)

**Common Operators:**
- Where, Select, OrderBy
- First, Single, Any, All
- GroupBy, Join, SelectMany`,
          codeExample: `using System;
using System.Linq;
using System.Collections.Generic;

class LinqDemo
{
    static void Main()
    {
        var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        
        // Query syntax
        var evens = from n in numbers
                    where n % 2 == 0
                    select n;
        
        // Method syntax
        var odds = numbers.Where(n => n % 2 != 0);
        
        Console.WriteLine("Evens: " + string.Join(", ", evens));
        Console.WriteLine("Odds: " + string.Join(", ", odds));
        
        // More operations
        var squares = numbers.Select(n => n * n);
        var firstThree = numbers.Take(3);
        var skipTwo = numbers.Skip(2);
        var ordered = numbers.OrderByDescending(n => n);
        
        // Aggregation
        Console.WriteLine($"Sum: {numbers.Sum()}");
        Console.WriteLine($"Average: {numbers.Average()}");
        Console.WriteLine($"Max: {numbers.Max()}");
        Console.WriteLine($"Count: {numbers.Count()}");
        
        // Any and All
        bool hasEven = numbers.Any(n => n % 2 == 0);
        bool allPositive = numbers.All(n => n > 0);
        
        // First and Single
        int first = numbers.First();
        int firstEven = numbers.First(n => n % 2 == 0);
        // int onlyOne = numbers.Single(n => n > 10);  // Throws if not exactly one
    }
}`,
        },
      ],
    },
  ],
  react: [
    {
      id: 'fundamentals',
      title: '1. React Fundamentals',
      icon: 'React',
      topics: [
        {
          id: 'what-is-react',
          title: 'What is React?',
          content: `React is a JavaScript library for building user interfaces, developed by Facebook in 2013.

**Why React?**
- **Component-Based**: Reusable UI pieces
- **Virtual DOM**: Efficient updates
- **Declarative**: Describe what you want
- **Large Ecosystem**: Rich tools and libraries

**Key Concepts:**
- JSX syntax
- Components (functional and class)
- Props and state
- Hooks`,
          codeExample: `import React from 'react';
import ReactDOM from 'react-dom/client';

// Functional Component
function App() {
  const name = "React";
  
  return (
    <div className="app">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

// Render to DOM
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);`,
        },
        {
          id: 'jsx',
          title: 'JSX Syntax',
          content: `JSX is a syntax extension for JavaScript that looks like HTML.

**JSX Rules:**
- Return single parent element
- Use className instead of class
- Close all tags
- JavaScript expressions in {}

**JSX Features:**
- Embed expressions
- Conditional rendering
- Lists and keys
- Fragments`,
          codeExample: `import React from 'react';

function JSXDemo() {
  const name = "React";
  const items = ["Apple", "Banana", "Cherry"];
  const isLoggedIn = true;
  
  return (
    <div>
      {/* JavaScript expressions */}
      <h1>Hello, {name}!</h1>
      <p>2 + 2 = {2 + 2}</p>
      
      {/* Conditional rendering */}
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please log in.</p>
      )}
      
      {/* Lists with keys */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* Fragment for multiple elements */}
      <>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </>
    </div>
  );
}

export default JSXDemo;`,
        },
        {
          id: 'props-state',
          title: 'Props and State',
          content: `**Props** (properties) are passed from parent to child.
**State** is internal data that triggers re-renders when changed.

**Key Differences:**
- Props: Read-only, passed down
- State: Mutable, managed within component

**useState Hook:**
- Returns [value, setValue]
- Triggers re-render on update`,
          codeExample: `import React, { useState } from 'react';

// Component with props
function Greeting({ name, greeting = "Hello" }) {
  return <h1>{greeting}, {name}!</h1>;
}

// Component with state
function Counter() {
  // State declaration
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  const increment = () => {
    setCount(count + step);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Step: {step}</p>
      <button onClick={increment}>+{step}</button>
      <button onClick={reset}>Reset</button>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
    </div>
  );
}

// Parent component
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" greeting="Hi" />
      <Counter />
    </div>
  );
}

export default App;`,
        },
        {
          id: 'effects',
          title: 'useEffect Hook',
          content: `useEffect handles side effects in functional components.

**Common Use Cases:**
- Data fetching
- Subscriptions
- DOM manipulation
- Cleanup

**Dependency Array:**
- []: Run once on mount
- [dep]: Run when dep changes
- No array: Run on every render`,
          codeExample: `import React, { useState, useEffect } from 'react';

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  
  // Run on mount and when count changes
  useEffect(() => {
    console.log(\`Count is now: \${count}\`);
    
    // Cleanup function
    return () => {
      console.log(\`Cleaning up count: \${count}\`);
    };
  }, [count]);
  
  // Run only on mount
  useEffect(() => {
    console.log('Component mounted');
    
    // Fetch data
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default EffectDemo;`,
        },
      ],
    },
    {
      id: 'advanced-hooks',
      title: '2. Advanced Hooks',
      icon: 'Tools',
      topics: [
        {
          id: 'custom-hooks',
          title: 'Custom Hooks',
          content: `Custom hooks are reusable functions that use React hooks.

**Naming Convention:**
- Start with "use" (e.g., useCounter, useFetch)

**Benefits:**
- Share stateful logic
- Reuse across components
- Cleaner component code`,
          codeExample: `import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Using custom hooks
function App() {
  const { data, loading, error } = useFetch('https://api.example.com/users');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;`,
        },
        {
          id: 'context-api',
          title: 'Context API',
          content: `Context provides a way to pass data through the component tree without props.

**Key Concepts:**
- React.createContext
- Context.Provider
- useContext hook

**Use Cases:**
- Theme switching
- User authentication
- Language/i18n
- Global state`,
          codeExample: `import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();
const UserContext = createContext();

// Provider components
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hooks for contexts
function useTheme() {
  return useContext(ThemeContext);
}

function useUser() {
  return useContext(UserContext);
}

// Using context in components
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

function UserProfile() {
  const { user, logout } = useUser();
  
  if (!user) return <p>Please log in</p>;
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// App with providers
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Header />
        <UserProfile />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;`,
        },
      ],
    },
  ],
};
