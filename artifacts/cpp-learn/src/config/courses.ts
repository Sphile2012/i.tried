/**
 * Infinity Code - Course Data
 * Comprehensive programming courses for C++, Python, Java, JavaScript, and TypeScript
 * Each language has Beginner, Intermediate, and Advanced learning paths
 */

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
  duration: string;
  completed: boolean;
  description?: string;
  content?: string;
  objectives?: string[];
  syntaxGuide?: string;
  example?: string;
  exercise?: string;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  language: string;
  icon: string;
  color: string;
  modules: Module[];
}

export const courses: Course[] = [
  // ============================================
  // C++ COURSES
  // ============================================
  {
    id: 'cpp-beginner',
    title: 'C++ Fundamentals',
    level: 'Beginner',
    description: 'Master the basics of C++ programming from variables to control flow.',
    language: 'C++',
    icon: 'C++',
    color: '#00599C',
    modules: [
      {
        title: 'Getting Started',
        lessons: [
          {
            id: 'cpp-1-1', title: 'Introduction to C++', type: 'video', duration: '10 min', completed: false,
            description: 'Learn what C++ is, its history, and why it remains one of the most powerful programming languages.',
            objectives: ['Understand the history of C++', 'Identify C++ use cases', 'Set up a development environment'],
            content: 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language. It is used for system programming, game development, embedded systems, and high-performance applications.',
          },
          {
            id: 'cpp-1-2', title: 'Setting Up Your Environment', type: 'text', duration: '15 min', completed: false,
            description: 'Install a C++ compiler and IDE to start coding.',
            objectives: ['Install a C++ compiler (GCC, Clang, or MSVC)', 'Set up an IDE (Visual Studio, Code::Blocks, or VS Code)', 'Write and compile your first program'],
            content: 'To start coding in C++, you need a compiler and a text editor or IDE. Popular choices include GCC (Linux/Mac), MSVC (Windows), and IDEs like Visual Studio, CLion, or VS Code with C++ extensions.',
          },
          {
            id: 'cpp-1-3', title: 'Your First Program', type: 'exercise', duration: '20 min', completed: false,
            description: 'Write the classic Hello World program in C++.',
            objectives: ['Write a complete C++ program', 'Understand the main() function', 'Use cout to print output'],
            syntaxGuide: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
            example: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
            exercise: 'Write a C++ program that prints "Welcome to Infinity Code!" to the console.',
          },
        ],
      },
      {
        title: 'Variables & Data Types',
        lessons: [
          {
            id: 'cpp-2-1', title: 'Understanding Variables', type: 'video', duration: '12 min', completed: false,
            description: 'Learn how to declare and use variables in C++.',
            objectives: ['Declare variables of different types', 'Understand variable naming rules', 'Initialize variables'],
            syntaxGuide: 'type variableName = value;\nint age = 25;\ndouble price = 19.99;\nchar grade = \'A\';\nbool isActive = true;',
            example: 'int score = 100;\ndouble temperature = 36.6;\nstring name = "Alice";\nbool isStudent = true;',
          },
          {
            id: 'cpp-2-2', title: 'Data Types in C++', type: 'text', duration: '18 min', completed: false,
            description: 'Explore C++ primitive and derived data types.',
            objectives: ['Understand int, float, double, char, bool', 'Learn about signed and unsigned types', 'Use string type'],
            content: 'C++ has several primitive data types: int (integers), float and double (decimals), char (single characters), bool (true/false). It also supports derived types like arrays, pointers, and references.',
          },
          {
            id: 'cpp-2-3', title: 'Working with Variables', type: 'exercise', duration: '25 min', completed: false,
            description: 'Practice declaring and manipulating variables.',
            exercise: 'Create variables for a student profile: name (string), age (int), GPA (double), and isEnrolled (bool). Print all values.',
          },
          {
            id: 'cpp-2-4', title: 'Variables Quiz', type: 'quiz', duration: '10 min', completed: false,
            description: 'Test your knowledge of C++ variables and data types.',
          },
        ],
      },
      {
        title: 'Control Flow',
        lessons: [
          {
            id: 'cpp-3-1', title: 'Conditional Statements', type: 'video', duration: '15 min', completed: false,
            description: 'Learn if, else if, and switch statements.',
            syntaxGuide: 'if (condition) {\n    // code\n} else if (condition) {\n    // code\n} else {\n    // code\n}',
            example: 'int score = 85;\nif (score >= 90) {\n    cout << "A";\n} else if (score >= 80) {\n    cout << "B";\n} else {\n    cout << "C";\n}',
          },
          {
            id: 'cpp-3-2', title: 'Loops', type: 'video', duration: '20 min', completed: false,
            description: 'Master for, while, and do-while loops.',
            syntaxGuide: 'for (int i = 0; i < n; i++) { /* code */ }\nwhile (condition) { /* code */ }\ndo { /* code */ } while (condition);',
            example: 'for (int i = 1; i <= 5; i++) {\n    cout << i << " ";\n}\n// Output: 1 2 3 4 5',
          },
          {
            id: 'cpp-3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '30 min', completed: false,
            description: 'Practice using conditionals and loops.',
            exercise: 'Write a program that prints all even numbers from 1 to 20 using a for loop.',
          },
        ],
      },
    ],
  },
  {
    id: 'cpp-intermediate',
    title: 'C++ Intermediate',
    level: 'Intermediate',
    description: 'Dive deeper into C++ with functions, arrays, pointers, and OOP.',
    language: 'C++',
    icon: 'C++',
    color: '#00599C',
    modules: [
      {
        title: 'Functions',
        lessons: [
          {
            id: 'cpp-int-1-1', title: 'Functions and Parameters', type: 'video', duration: '18 min', completed: false,
            description: 'Learn to write reusable functions with parameters and return values.',
            syntaxGuide: 'returnType functionName(parameters) {\n    // code\n    return value;\n}',
            example: 'int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(5, 3); // result = 8',
          },
          {
            id: 'cpp-int-1-2', title: 'Function Overloading', type: 'text', duration: '15 min', completed: false,
            description: 'Create multiple functions with the same name but different parameters.',
            content: 'Function overloading allows you to have multiple functions with the same name but different parameter lists. The compiler selects the appropriate function based on the arguments passed.',
          },
          {
            id: 'cpp-int-1-3', title: 'Recursion', type: 'exercise', duration: '25 min', completed: false,
            description: 'Write recursive functions to solve problems.',
            exercise: 'Write a recursive function to calculate the factorial of a number.',
          },
        ],
      },
      {
        title: 'Arrays & Pointers',
        lessons: [
          {
            id: 'cpp-int-2-1', title: 'Arrays', type: 'video', duration: '20 min', completed: false,
            description: 'Work with arrays to store multiple values.',
            syntaxGuide: 'type arrayName[size] = {values};\nint numbers[5] = {1, 2, 3, 4, 5};',
            example: 'int arr[5] = {10, 20, 30, 40, 50};\nfor (int i = 0; i < 5; i++) {\n    cout << arr[i] << " ";\n}',
          },
          {
            id: 'cpp-int-2-2', title: 'Pointers', type: 'text', duration: '25 min', completed: false,
            description: 'Understand memory addresses and pointers.',
            content: 'A pointer is a variable that stores the memory address of another variable. Pointers are powerful but require careful management to avoid memory leaks and undefined behavior.',
            syntaxGuide: 'int* ptr = &variable;\n*ptr = newValue; // dereference',
          },
          {
            id: 'cpp-int-2-3', title: 'Array & Pointer Exercises', type: 'exercise', duration: '30 min', completed: false,
            exercise: 'Write a program that reverses an array in place using pointers.',
          },
        ],
      },
      {
        title: 'Object-Oriented Programming',
        lessons: [
          {
            id: 'cpp-int-3-1', title: 'Classes and Objects', type: 'video', duration: '25 min', completed: false,
            description: 'Learn the fundamentals of OOP in C++.',
            syntaxGuide: 'class ClassName {\nprivate:\n    // members\npublic:\n    // methods\n};',
            example: 'class Student {\nprivate:\n    string name;\n    int age;\npublic:\n    void setName(string n) { name = n; }\n    string getName() { return name; }\n};',
          },
          {
            id: 'cpp-int-3-2', title: 'Inheritance', type: 'text', duration: '20 min', completed: false,
            description: 'Create derived classes that inherit from base classes.',
            content: 'Inheritance allows a class to inherit properties and methods from another class. This promotes code reuse and establishes a hierarchical relationship between classes.',
          },
          {
            id: 'cpp-int-3-3', title: 'OOP Project', type: 'project', duration: '45 min', completed: false,
            description: 'Build a simple banking system using OOP concepts.',
            exercise: 'Create a BankAccount class with deposit, withdraw, and balance methods. Create a SavingsAccount class that inherits from BankAccount and adds interest calculation.',
          },
        ],
      },
    ],
  },
  {
    id: 'cpp-advanced',
    title: 'C++ Advanced',
    level: 'Advanced',
    description: 'Master templates, STL, memory management, and advanced C++ features.',
    language: 'C++',
    icon: 'C++',
    color: '#00599C',
    modules: [
      {
        title: 'Templates & STL',
        lessons: [
          {
            id: 'cpp-adv-1-1', title: 'Function Templates', type: 'video', duration: '22 min', completed: false,
            description: 'Write generic functions that work with any data type.',
            syntaxGuide: 'template <typename T>\nT maxValue(T a, T b) {\n    return (a > b) ? a : b;\n}',
            example: 'template <typename T>\nT add(T a, T b) { return a + b; }\n\nint i = add(5, 3);\ndouble d = add(3.14, 2.86);',
          },
          {
            id: 'cpp-adv-1-2', title: 'STL Containers', type: 'text', duration: '30 min', completed: false,
            description: 'Learn vector, map, set, and other STL containers.',
            content: 'The Standard Template Library (STL) provides powerful container classes like vector (dynamic array), map (key-value pairs), set (unique elements), and list (doubly linked list).',
          },
          {
            id: 'cpp-adv-1-3', title: 'STL Algorithms', type: 'exercise', duration: '35 min', completed: false,
            exercise: 'Use STL algorithms (sort, find, count) to process a vector of integers.',
          },
        ],
      },
      {
        title: 'Memory Management',
        lessons: [
          {
            id: 'cpp-adv-2-1', title: 'Smart Pointers', type: 'video', duration: '25 min', completed: false,
            description: 'Learn modern C++ memory management with smart pointers.',
            content: 'Smart pointers (unique_ptr, shared_ptr, weak_ptr) automatically manage memory allocation and deallocation, preventing memory leaks and dangling pointers.',
          },
          {
            id: 'cpp-adv-2-2', title: 'RAII Pattern', type: 'text', duration: '20 min', completed: false,
            description: 'Understand Resource Acquisition Is Initialization.',
            content: 'RAII is a C++ programming technique that binds the life cycle of a resource to the lifetime of an object. When the object is destroyed, the resource is automatically released.',
          },
          {
            id: 'cpp-adv-2-3', title: 'Advanced Memory Project', type: 'project', duration: '60 min', completed: false,
            exercise: 'Build a custom memory pool allocator using smart pointers and RAII principles.',
          },
        ],
      },
    ],
  },

  // ============================================
  // PYTHON COURSES
  // ============================================
  {
    id: 'py-beginner',
    title: 'Python Fundamentals',
    level: 'Beginner',
    description: 'Start your Python journey with variables, data types, and control flow.',
    language: 'Python',
    icon: 'Py',
    color: '#3776AB',
    modules: [
      {
        title: 'Getting Started with Python',
        lessons: [
          {
            id: 'py-1-1', title: 'Introduction to Python', type: 'video', duration: '10 min', completed: false,
            description: 'Learn what Python is and why it is one of the most popular programming languages.',
            objectives: ['Understand Python history', 'Identify Python use cases', 'Install Python'],
            content: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It is used in web development, data science, AI, automation, and more.',
          },
          {
            id: 'py-1-2', title: 'Setting Up Python', type: 'text', duration: '12 min', completed: false,
            description: 'Install Python and set up your development environment.',
            objectives: ['Install Python 3', 'Set up a code editor', 'Run Python scripts'],
            content: 'Download Python from python.org. Use editors like VS Code, PyCharm, or Jupyter Notebook. Verify installation with: python --version',
          },
          {
            id: 'py-1-3', title: 'Your First Python Program', type: 'exercise', duration: '15 min', completed: false,
            description: 'Write your first Python program.',
            syntaxGuide: 'print("Hello, World!")',
            example: 'name = input("What is your name? ")\nprint(f"Hello, {name}!")',
            exercise: 'Write a Python program that asks for the user\'s name and greets them.',
          },
        ],
      },
      {
        title: 'Variables & Data Types',
        lessons: [
          {
            id: 'py-2-1', title: 'Variables in Python', type: 'video', duration: '12 min', completed: false,
            description: 'Learn how to create and use variables in Python.',
            syntaxGuide: 'variable_name = value\nname = "Alice"\nage = 25\nheight = 5.7\nis_student = True',
            example: 'x = 10\ny = 3.14\nname = "Bob"\nis_active = True\nprint(type(x))  # <class \'int\'>',
          },
          {
            id: 'py-2-2', title: 'Data Types', type: 'text', duration: '18 min', completed: false,
            description: 'Explore Python data types: int, float, str, bool, list, dict, tuple, set.',
            content: 'Python has built-in data types: int (integers), float (decimals), str (strings), bool (boolean), list (ordered collection), dict (key-value pairs), tuple (immutable collection), and set (unique elements).',
          },
          {
            id: 'py-2-3', title: 'String Operations', type: 'exercise', duration: '20 min', completed: false,
            description: 'Practice working with strings.',
            exercise: 'Write a program that takes a string and counts the number of vowels in it.',
          },
          {
            id: 'py-quiz-1', title: 'Python Basics Quiz', type: 'quiz', duration: '10 min', completed: false,
            description: 'Test your knowledge of Python basics.',
          },
        ],
      },
      {
        title: 'Control Flow',
        lessons: [
          {
            id: 'py-3-1', title: 'Conditionals', type: 'video', duration: '15 min', completed: false,
            description: 'Learn if, elif, and else statements.',
            syntaxGuide: 'if condition:\n    # code\nelif condition:\n    # code\nelse:\n    # code',
            example: 'score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
          },
          {
            id: 'py-3-2', title: 'Loops', type: 'video', duration: '18 min', completed: false,
            description: 'Master for and while loops in Python.',
            syntaxGuide: 'for item in iterable:\n    # code\n\nwhile condition:\n    # code',
            example: 'for i in range(5):\n    print(i)\n# Output: 0 1 2 3 4\n\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)',
          },
          {
            id: 'py-3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '25 min', completed: false,
            exercise: 'Write a program that prints the Fibonacci sequence up to n terms using a loop.',
          },
        ],
      },
    ],
  },
  {
    id: 'py-intermediate',
    title: 'Python Intermediate',
    level: 'Intermediate',
    description: 'Explore functions, data structures, file handling, and error handling.',
    language: 'Python',
    icon: 'Py',
    color: '#3776AB',
    modules: [
      {
        title: 'Functions',
        lessons: [
          {
            id: 'py-int-1-1', title: 'Defining Functions', type: 'video', duration: '18 min', completed: false,
            description: 'Learn to write functions with parameters and return values.',
            syntaxGuide: 'def function_name(parameters):\n    # code\n    return value',
            example: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))  # Hello, Alice!\nprint(greet("Bob", "Hi"))  # Hi, Bob!',
          },
          {
            id: 'py-int-1-2', title: 'Lambda Functions', type: 'text', duration: '15 min', completed: false,
            description: 'Write anonymous functions with lambda.',
            content: 'Lambda functions are small anonymous functions defined with the lambda keyword. They are useful for short, simple operations.',
            syntaxGuide: 'lambda arguments: expression',
            example: 'square = lambda x: x ** 2\nprint(square(5))  # 25\n\nnumbers = [1, 2, 3, 4, 5]\nevens = list(filter(lambda x: x % 2 == 0, numbers))',
          },
          {
            id: 'py-int-1-3', title: 'Function Exercises', type: 'exercise', duration: '25 min', completed: false,
            exercise: 'Write a function that takes a list of numbers and returns the average, min, and max.',
          },
        ],
      },
      {
        title: 'Data Structures',
        lessons: [
          {
            id: 'py-int-2-1', title: 'Lists and Tuples', type: 'video', duration: '20 min', completed: false,
            description: 'Work with ordered collections in Python.',
            syntaxGuide: 'my_list = [1, 2, 3, 4, 5]\nmy_tuple = (1, 2, 3)',
            example: 'fruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nfruits.remove("banana")\nprint(fruits[0])  # apple',
          },
          {
            id: 'py-int-2-2', title: 'Dictionaries and Sets', type: 'text', duration: '20 min', completed: false,
            description: 'Learn key-value pairs and unique collections.',
            content: 'Dictionaries store key-value pairs for fast lookups. Sets store unique elements and support set operations like union, intersection, and difference.',
            example: 'student = {"name": "Alice", "age": 20, "grade": "A"}\nprint(student["name"])  # Alice\n\nunique_nums = {1, 2, 3, 3, 4}\nprint(unique_nums)  # {1, 2, 3, 4}',
          },
          {
            id: 'py-int-2-3', title: 'Data Structure Project', type: 'project', duration: '40 min', completed: false,
            exercise: 'Build a contact management system using dictionaries. Allow adding, searching, and deleting contacts.',
          },
        ],
      },
    ],
  },
  {
    id: 'py-advanced',
    title: 'Python Advanced',
    level: 'Advanced',
    description: 'Master OOP, decorators, generators, and async programming.',
    language: 'Python',
    icon: 'Py',
    color: '#3776AB',
    modules: [
      {
        title: 'Object-Oriented Programming',
        lessons: [
          {
            id: 'py-adv-1-1', title: 'Classes and Objects', type: 'video', duration: '25 min', completed: false,
            description: 'Learn OOP fundamentals in Python.',
            syntaxGuide: 'class ClassName:\n    def __init__(self, params):\n        self.attr = value\n    \n    def method(self):\n        # code',
            example: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    \n    def bark(self):\n        return f"{self.name} says Woof!"',
          },
          {
            id: 'py-adv-1-2', title: 'Inheritance & Polymorphism', type: 'text', duration: '22 min', completed: false,
            description: 'Extend classes and implement polymorphism.',
            content: 'Inheritance allows a class to inherit from another class. Polymorphism allows methods to behave differently in different classes. Python supports multiple inheritance and method overriding.',
          },
          {
            id: 'py-adv-1-3', title: 'OOP Project', type: 'project', duration: '50 min', completed: false,
            exercise: 'Build a library management system with classes for Book, User, and Library. Implement borrowing and returning functionality.',
          },
        ],
      },
      {
        title: 'Advanced Python Features',
        lessons: [
          {
            id: 'py-adv-2-1', title: 'Decorators', type: 'video', duration: '20 min', completed: false,
            description: 'Learn to modify function behavior with decorators.',
            syntaxGuide: 'def decorator(func):\n    def wrapper(*args, **kwargs):\n        # before\n        result = func(*args, **kwargs)\n        # after\n        return result\n    return wrapper',
            example: 'def timer(func):\n    def wrapper(*args):\n        start = time.time()\n        result = func(*args)\n        print(f"Took {time.time() - start}s")\n        return result\n    return wrapper',
          },
          {
            id: 'py-adv-2-2', title: 'Generators', type: 'text', duration: '18 min', completed: false,
            description: 'Create memory-efficient iterators with generators.',
            content: 'Generators use the yield keyword to produce values lazily, one at a time. This is memory-efficient for large datasets.',
            example: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b',
          },
          {
            id: 'py-adv-2-3', title: 'Async Programming', type: 'exercise', duration: '35 min', completed: false,
            exercise: 'Write an async program that fetches data from multiple URLs concurrently using asyncio and aiohttp.',
          },
        ],
      },
    ],
  },

  // ============================================
  // JAVA COURSES
  // ============================================
  {
    id: 'java-beginner',
    title: 'Java Fundamentals',
    level: 'Beginner',
    description: 'Learn Java from scratch with variables, data types, and control flow.',
    language: 'Java',
    icon: 'Java',
    color: '#ED8B00',
    modules: [
      {
        title: 'Getting Started with Java',
        lessons: [
          {
            id: 'java-1-1', title: 'Introduction to Java', type: 'video', duration: '12 min', completed: false,
            description: 'Learn about Java, its platform independence, and use cases.',
            objectives: ['Understand Java history', 'Learn about JVM', 'Identify Java use cases'],
            content: 'Java is a class-based, object-oriented programming language designed to have minimal implementation dependencies. It follows the "Write Once, Run Anywhere" principle using the Java Virtual Machine (JVM).',
          },
          {
            id: 'java-1-2', title: 'Setting Up Java', type: 'text', duration: '15 min', completed: false,
            description: 'Install JDK and set up your Java development environment.',
            objectives: ['Install Java Development Kit (JDK)', 'Set up IDE (IntelliJ, Eclipse, or VS Code)', 'Compile and run Java programs'],
            content: 'Download JDK from Oracle or use OpenJDK. Install an IDE like IntelliJ IDEA, Eclipse, or VS Code with Java extensions. Verify with: java -version',
          },
          {
            id: 'java-1-3', title: 'Your First Java Program', type: 'exercise', duration: '20 min', completed: false,
            description: 'Write a Hello World program in Java.',
            syntaxGuide: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
            example: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Welcome to Infinity Code!");\n    }\n}',
            exercise: 'Write a Java program that prints "I am learning Java!" to the console.',
          },
        ],
      },
      {
        title: 'Variables & Data Types',
        lessons: [
          {
            id: 'java-2-1', title: 'Variables in Java', type: 'video', duration: '15 min', completed: false,
            description: 'Learn to declare and use variables in Java.',
            syntaxGuide: 'type variableName = value;\nint age = 25;\ndouble price = 19.99;\nString name = "Alice";\nboolean isActive = true;',
            example: 'int score = 100;\ndouble temperature = 36.6;\nString name = "Alice";\nboolean isStudent = true;',
          },
          {
            id: 'java-2-2', title: 'Java Data Types', type: 'text', duration: '18 min', completed: false,
            description: 'Explore primitive and reference data types in Java.',
            content: 'Java has 8 primitive types: byte, short, int, long, float, double, char, boolean. Reference types include String, arrays, and custom classes.',
          },
          {
            id: 'java-2-3', title: 'Variables Exercise', type: 'exercise', duration: '20 min', completed: false,
            exercise: 'Create variables for a product: name (String), price (double), quantity (int), and inStock (boolean). Print a formatted product summary.',
          },
          {
            id: 'java-quiz-1', title: 'Java Basics Quiz', type: 'quiz', duration: '10 min', completed: false,
            description: 'Test your knowledge of Java fundamentals.',
          },
        ],
      },
      {
        title: 'Control Flow',
        lessons: [
          {
            id: 'java-3-1', title: 'Conditional Statements', type: 'video', duration: '15 min', completed: false,
            description: 'Learn if-else and switch statements in Java.',
            syntaxGuide: 'if (condition) {\n    // code\n} else if (condition) {\n    // code\n} else {\n    // code\n}',
            example: 'int score = 85;\nif (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}',
          },
          {
            id: 'java-3-2', title: 'Loops in Java', type: 'video', duration: '18 min', completed: false,
            description: 'Master for, while, and do-while loops.',
            syntaxGuide: 'for (int i = 0; i < n; i++) { /* code */ }\nwhile (condition) { /* code */ }\ndo { /* code */ } while (condition);',
            example: 'for (int i = 1; i <= 5; i++) {\n    System.out.print(i + " ");\n}\n// Output: 1 2 3 4 5',
          },
          {
            id: 'java-3-3', title: 'Control Flow Exercises', type: 'exercise', duration: '25 min', completed: false,
            exercise: 'Write a Java program to print a multiplication table for a given number using nested loops.',
          },
        ],
      },
    ],
  },
  {
    id: 'java-intermediate',
    title: 'Java Intermediate',
    level: 'Intermediate',
    description: 'Explore methods, arrays, strings, and object-oriented programming.',
    language: 'Java',
    icon: 'Java',
    color: '#ED8B00',
    modules: [
      {
        title: 'Methods',
        lessons: [
          {
            id: 'java-int-1-1', title: 'Java Methods', type: 'video', duration: '18 min', completed: false,
            description: 'Learn to create and call methods in Java.',
            syntaxGuide: 'accessModifier returnType methodName(parameters) {\n    // code\n    return value;\n}',
            example: 'public int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(5, 3); // 8',
          },
          {
            id: 'java-int-1-2', title: 'Method Overloading', type: 'text', duration: '15 min', completed: false,
            description: 'Create multiple methods with the same name but different parameters.',
            content: 'Method overloading in Java allows multiple methods with the same name but different parameter lists. Java determines which method to call based on the arguments.',
          },
          {
            id: 'java-int-1-3', title: 'Method Exercises', type: 'exercise', duration: '25 min', completed: false,
            exercise: 'Write overloaded methods to calculate the area of a circle, rectangle, and triangle.',
          },
        ],
      },
      {
        title: 'Object-Oriented Programming',
        lessons: [
          {
            id: 'java-int-2-1', title: 'Classes and Objects', type: 'video', duration: '25 min', completed: false,
            description: 'Learn the core of Java OOP.',
            syntaxGuide: 'public class ClassName {\n    // fields\n    // constructor\n    // methods\n}',
            example: 'public class Student {\n    private String name;\n    private int age;\n    \n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public String getName() { return name; }\n}',
          },
          {
            id: 'java-int-2-2', title: 'Inheritance & Interfaces', type: 'text', duration: '22 min', completed: false,
            description: 'Learn inheritance, abstract classes, and interfaces.',
            content: 'Java supports single inheritance with the extends keyword. Interfaces define contracts that classes can implement. Abstract classes can have both implemented and abstract methods.',
          },
          {
            id: 'java-int-2-3', title: 'OOP Project', type: 'project', duration: '45 min', completed: false,
            exercise: 'Build a student management system with classes for Student, Course, and Enrollment. Use inheritance and interfaces.',
          },
        ],
      },
    ],
  },
  {
    id: 'java-advanced',
    title: 'Java Advanced',
    level: 'Advanced',
    description: 'Master generics, streams, concurrency, and Java frameworks.',
    language: 'Java',
    icon: 'Java',
    color: '#ED8B00',
    modules: [
      {
        title: 'Generics & Collections',
        lessons: [
          {
            id: 'java-adv-1-1', title: 'Generics', type: 'video', duration: '25 min', completed: false,
            description: 'Write type-safe code with Java generics.',
            syntaxGuide: 'public class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return item; }\n}',
            example: 'List<String> names = new ArrayList<>();\nnames.add("Alice");\nString name = names.get(0);',
          },
          {
            id: 'java-adv-1-2', title: 'Stream API', type: 'text', duration: '25 min', completed: false,
            description: 'Process collections with the Stream API.',
            content: 'The Stream API provides a declarative way to process sequences of elements. It supports operations like filter, map, reduce, and collect.',
            example: 'List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\nint sum = numbers.stream().filter(n -> n % 2 == 0).mapToInt(n -> n).sum();',
          },
          {
            id: 'java-adv-1-3', title: 'Collections Project', type: 'project', duration: '50 min', completed: false,
            exercise: 'Build a task management system using generics and the Stream API. Implement filtering, sorting, and grouping of tasks.',
          },
        ],
      },
      {
        title: 'Concurrency',
        lessons: [
          {
            id: 'java-adv-2-1', title: 'Multithreading', type: 'video', duration: '28 min', completed: false,
            description: 'Learn to write concurrent Java programs.',
            content: 'Java supports multithreading through the Thread class and Runnable interface. The java.util.concurrent package provides higher-level concurrency utilities.',
          },
          {
            id: 'java-adv-2-2', title: 'CompletableFuture', type: 'text', duration: '22 min', completed: false,
            description: 'Write asynchronous code with CompletableFuture.',
            content: 'CompletableFuture provides a way to write asynchronous, non-blocking code in Java. It supports chaining operations and combining multiple futures.',
          },
          {
            id: 'java-adv-2-3', title: 'Concurrency Project', type: 'project', duration: '55 min', completed: false,
            exercise: 'Build a concurrent web scraper that fetches multiple URLs in parallel using CompletableFuture and thread pools.',
          },
        ],
      },
    ],
  },

  // ============================================
  // JAVASCRIPT COURSES
  // ============================================
  {
    id: 'js-beginner',
    title: 'JavaScript Fundamentals',
    level: 'Beginner',
    description: 'Learn JavaScript from basics to building interactive web pages.',
    language: 'JavaScript',
    icon: 'JS',
    color: '#F7DF1E',
    modules: [
      {
        title: 'Getting Started with JavaScript',
        lessons: [
          {
            id: 'js-1-1', title: 'Introduction to JavaScript', type: 'video', duration: '10 min', completed: false,
            description: 'Learn what JavaScript is and its role in web development.',
            objectives: ['Understand JavaScript history', 'Learn about the DOM', 'Set up a development environment'],
            content: 'JavaScript is a programming language that enables interactive web pages. It runs in the browser and on servers (Node.js). It is an essential technology alongside HTML and CSS.',
          },
          {
            id: 'js-1-2', title: 'Setting Up JavaScript', type: 'text', duration: '12 min', completed: false,
            description: 'Set up your JavaScript development environment.',
            objectives: ['Install Node.js', 'Set up a code editor', 'Run JavaScript in browser and Node.js'],
            content: 'Install Node.js from nodejs.org. Use VS Code or any text editor. JavaScript can run in browser developer console or via Node.js in terminal.',
          },
          {
            id: 'js-1-3', title: 'Your First JavaScript Program', type: 'exercise', duration: '15 min', completed: false,
            description: 'Write your first JavaScript code.',
            syntaxGuide: 'console.log("Hello, World!");',
            example: 'const name = "Alice";\nconsole.log(`Hello, ${name}!`);',
            exercise: 'Write a JavaScript program that logs "Welcome to Infinity Code!" to the console.',
          },
        ],
      },
      {
        title: 'Variables & Data Types',
        lessons: [
          {
            id: 'js-2-1', title: 'Variables in JavaScript', type: 'video', duration: '15 min', completed: false,
            description: 'Learn var, let, and const declarations.',
            syntaxGuide: 'let variableName = value;\nconst constantName = value;\n// var is legacy',
            example: 'let age = 25;\nconst name = "Alice";\nlet isStudent = true;\nlet score = 95.5;',
          },
          {
            id: 'js-2-2', title: 'JavaScript Data Types', type: 'text', duration: '18 min', completed: false,
            description: 'Explore primitive and reference types in JavaScript.',
            content: 'JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint. Reference types include object, array, function, and date.',
          },
          {
            id: 'js-2-2b', title: 'Arrays and Objects', type: 'exercise', duration: '20 min', completed: false,
            description: 'Practice working with arrays and objects.',
            exercise: 'Create an array of 5 fruits and an object representing a person with name, age, and hobbies. Log both to console.',
          },
          {
            id: 'js-quiz-1', title: 'JavaScript Fundamentals Quiz', type: 'quiz', duration: '10 min', completed: false,
            description: 'Test your knowledge of JavaScript basics.',
          },
        ],
      },
      {
        title: 'Control Flow & Functions',
        lessons: [
          {
            id: 'js-3-1', title: 'Conditionals', type: 'video', duration: '15 min', completed: false,
            description: 'Learn if-else and switch statements.',
            syntaxGuide: 'if (condition) {\n    // code\n} else if (condition) {\n    // code\n} else {\n    // code\n}',
            example: 'const score = 85;\nif (score >= 90) {\n    console.log("A");\n} else if (score >= 80) {\n    console.log("B");\n} else {\n    console.log("C");\n}',
          },
          {
            id: 'js-3-2', title: 'Loops & Iteration', type: 'video', duration: '18 min', completed: false,
            description: 'Master for, while, for...of, and for...in loops.',
            syntaxGuide: 'for (let i = 0; i < n; i++) { /* code */ }\nwhile (condition) { /* code */ }\nfor (const item of array) { /* code */ }',
            example: 'const fruits = ["apple", "banana", "cherry"];\nfor (const fruit of fruits) {\n    console.log(fruit);\n}',
          },
          {
            id: 'js-3-3', title: 'Functions', type: 'exercise', duration: '25 min', completed: false,
            description: 'Learn function declarations, expressions, and arrow functions.',
            syntaxGuide: 'function name(params) { return value; }\nconst name = (params) => value;',
            exercise: 'Write a function that takes an array of numbers and returns the sum using both regular and arrow function syntax.',
          },
        ],
      },
    ],
  },
  {
    id: 'js-intermediate',
    title: 'JavaScript Intermediate',
    level: 'Intermediate',
    description: 'Master DOM manipulation, events, async programming, and ES6+ features.',
    language: 'JavaScript',
    icon: 'JS',
    color: '#F7DF1E',
    modules: [
      {
        title: 'DOM Manipulation',
        lessons: [
          {
            id: 'js-int-1-1', title: 'DOM Basics', type: 'video', duration: '20 min', completed: false,
            description: 'Learn to manipulate HTML elements with JavaScript.',
            syntaxGuide: 'document.getElementById("id")\ndocument.querySelector(".class")\nelement.textContent = "text"\nelement.addEventListener("click", handler)',
            example: 'const button = document.querySelector("#myButton");\nbutton.addEventListener("click", () => {\n    alert("Button clicked!");\n});',
          },
          {
            id: 'js-int-1-2', title: 'Event Handling', type: 'text', duration: '18 min', completed: false,
            description: 'Handle user interactions with events.',
            content: 'JavaScript events allow you to respond to user actions like clicks, key presses, form submissions, and more. Use addEventListener to attach event handlers.',
          },
          {
            id: 'js-int-1-3', title: 'DOM Project', type: 'project', duration: '40 min', completed: false,
            exercise: 'Build an interactive todo list with add, complete, and delete functionality using DOM manipulation.',
          },
        ],
      },
      {
        title: 'Async JavaScript',
        lessons: [
          {
            id: 'js-int-2-1', title: 'Promises', type: 'video', duration: '22 min', completed: false,
            description: 'Learn to handle asynchronous operations with Promises.',
            syntaxGuide: 'new Promise((resolve, reject) => { /* async code */ })\n  .then(result => { /* success */ })\n  .catch(error => { /* failure */ })',
            example: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));',
          },
          {
            id: 'js-int-2-2', title: 'Async/Await', type: 'text', duration: '20 min', completed: false,
            description: 'Write cleaner async code with async/await.',
            content: 'Async/await is syntactic sugar over Promises, making asynchronous code look and behave like synchronous code.',
            syntaxGuide: 'async function fetchData() {\n    try {\n        const response = await fetch(url);\n        const data = await response.json();\n        return data;\n    } catch (error) {\n        console.error(error);\n    }\n}',
          },
          {
            id: 'js-int-2-3', title: 'Async Project', type: 'project', duration: '45 min', completed: false,
            exercise: 'Build a weather app that fetches data from a public API using async/await and displays it on a web page.',
          },
        ],
      },
    ],
  },
  {
    id: 'js-advanced',
    title: 'JavaScript Advanced',
    level: 'Advanced',
    description: 'Master closures, prototypes, design patterns, and performance optimization.',
    language: 'JavaScript',
    icon: 'JS',
    color: '#F7DF1E',
    modules: [
      {
        title: 'Advanced Concepts',
        lessons: [
          {
            id: 'js-adv-1-1', title: 'Closures & Scope', type: 'video', duration: '25 min', completed: false,
            description: 'Understand closures, lexical scope, and the scope chain.',
            content: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are fundamental to JavaScript.',
            example: 'function counter() {\n    let count = 0;\n    return function() {\n        count++;\n        return count;\n    };\n}\nconst myCounter = counter();\nconsole.log(myCounter()); // 1\nconsole.log(myCounter()); // 2',
          },
          {
            id: 'js-adv-1-2', title: 'Prototypes & Inheritance', type: 'text', duration: '22 min', completed: false,
            description: 'Learn JavaScript\'s prototype-based inheritance.',
            content: 'JavaScript uses prototype-based inheritance. Every object has a prototype, and objects inherit properties and methods from their prototype chain.',
          },
          {
            id: 'js-adv-1-3', title: 'Design Patterns', type: 'exercise', duration: '35 min', completed: false,
            exercise: 'Implement the Module, Observer, and Factory design patterns in JavaScript.',
          },
        ],
      },
      {
        title: 'Performance & Testing',
        lessons: [
          {
            id: 'js-adv-2-1', title: 'Performance Optimization', type: 'video', duration: '25 min', completed: false,
            description: 'Learn techniques to optimize JavaScript performance.',
            content: 'Optimize JavaScript by minimizing DOM operations, using debouncing and throttling, leveraging web workers, and optimizing loops and data structures.',
          },
          {
            id: 'js-adv-2-2', title: 'Testing JavaScript', type: 'text', duration: '20 min', completed: false,
            description: 'Learn to write tests with Jest and other frameworks.',
            content: 'Testing ensures code reliability. Use Jest for unit testing, Cypress for end-to-end testing, and React Testing Library for component testing.',
          },
          {
            id: 'js-adv-2-3', title: 'Advanced Project', type: 'project', duration: '60 min', completed: false,
            exercise: 'Build a real-time chat application using WebSockets, with performance optimizations and unit tests.',
          },
        ],
      },
    ],
  },

  // ============================================
  // TYPESCRIPT COURSES
  // ============================================
  {
    id: 'ts-beginner',
    title: 'TypeScript Fundamentals',
    level: 'Beginner',
    description: 'Learn TypeScript from basics and understand static typing in JavaScript.',
    language: 'TypeScript',
    icon: 'TS',
    color: '#3178C6',
    modules: [
      {
        title: 'Getting Started with TypeScript',
        lessons: [
          {
            id: 'ts-1-1', title: 'Introduction to TypeScript', type: 'video', duration: '10 min', completed: false,
            description: 'Learn what TypeScript is and why it improves JavaScript.',
            objectives: ['Understand TypeScript vs JavaScript', 'Learn about static typing', 'Set up TypeScript'],
            content: 'TypeScript is a superset of JavaScript that adds static typing. It helps catch errors at compile time, provides better tooling, and improves code maintainability.',
          },
          {
            id: 'ts-1-2', title: 'Setting Up TypeScript', type: 'text', duration: '15 min', completed: false,
            description: 'Install TypeScript and configure your project.',
            objectives: ['Install TypeScript compiler', 'Create tsconfig.json', 'Compile TypeScript to JavaScript'],
            content: 'Install TypeScript with npm: npm install -g typescript. Create a tsconfig.json for configuration. Compile with: tsc filename.ts',
            syntaxGuide: '// tsconfig.json\n{\n  "compilerOptions": {\n    "target": "es6",\n    "strict": true\n  }\n}',
          },
          {
            id: 'ts-1-3', title: 'Your First TypeScript Program', type: 'exercise', duration: '20 min', completed: false,
            description: 'Write a typed Hello World program.',
            syntaxGuide: 'const message: string = "Hello, World!";\nconsole.log(message);',
            example: 'function greet(name: string): string {\n    return `Hello, ${name}!`;\n}\nconsole.log(greet("Alice"));',
            exercise: 'Write a TypeScript function that takes a name (string) and age (number) and returns a greeting message.',
          },
        ],
      },
      {
        title: 'Types & Interfaces',
        lessons: [
          {
            id: 'ts-2-1', title: 'Basic Types', type: 'video', duration: '15 min', completed: false,
            description: 'Learn TypeScript primitive types: string, number, boolean, array, tuple, enum.',
            syntaxGuide: 'let name: string = "Alice";\nlet age: number = 25;\nlet isActive: boolean = true;\nlet scores: number[] = [90, 85, 95];\nlet tuple: [string, number] = ["Alice", 25];',
            example: 'let username: string = "bob123";\nlet age: number = 30;\nlet isVerified: boolean = true;\nlet hobbies: string[] = ["reading", "coding", "gaming"];',
          },
          {
            id: 'ts-2-2', title: 'Interfaces & Type Aliases', type: 'text', duration: '20 min', completed: false,
            description: 'Define custom types with interfaces and type aliases.',
            content: 'Interfaces define the structure of objects. Type aliases create custom named types. Both are powerful for creating type-safe code.',
            syntaxGuide: 'interface User {\n    name: string;\n    age: number;\n    email?: string; // optional\n}\n\ntype ID = string | number;',
            example: 'interface Student {\n    id: number;\n    name: string;\n    gpa: number;\n}\n\nconst student: Student = {\n    id: 1,\n    name: "Alice",\n    gpa: 3.8,\n};',
          },
          {
            id: 'ts-2-3', title: 'Types Exercise', type: 'exercise', duration: '25 min', completed: false,
            exercise: 'Create interfaces for a Product (id, name, price, category) and a ShoppingCart (items, total). Write functions to add products and calculate total.',
          },
          {
            id: 'ts-quiz-1', title: 'TypeScript Basics Quiz', type: 'quiz', duration: '10 min', completed: false,
            description: 'Test your knowledge of TypeScript fundamentals.',
          },
        ],
      },
    ],
  },
  {
    id: 'ts-intermediate',
    title: 'TypeScript Intermediate',
    level: 'Intermediate',
    description: 'Master generics, decorators, and advanced type system features.',
    language: 'TypeScript',
    icon: 'TS',
    color: '#3178C6',
    modules: [
      {
        title: 'Generics',
        lessons: [
          {
            id: 'ts-int-1-1', title: 'Generic Functions & Classes', type: 'video', duration: '22 min', completed: false,
            description: 'Write reusable, type-safe code with generics.',
            syntaxGuide: 'function identity<T>(arg: T): T {\n    return arg;\n}\n\nclass Box<T> {\n    private item: T;\n    constructor(item: T) { this.item = item; }\n    getItem(): T { return this.item; }\n}',
            example: 'function first<T>(arr: T[]): T {\n    return arr[0];\n}\n\nconst n = first([1, 2, 3]); // type: number\nconst s = first(["a", "b"]); // type: string',
          },
          {
            id: 'ts-int-1-2', title: 'Generic Constraints', type: 'text', duration: '18 min', completed: false,
            description: 'Constrain generics to enforce type requirements.',
            content: 'Generic constraints limit what types can be used with generics. Use the extends keyword to constrain a type parameter.',
            syntaxGuide: 'interface HasLength {\n    length: number;\n}\n\nfunction logLength<T extends HasLength>(arg: T): void {\n    console.log(arg.length);\n}',
          },
          {
            id: 'ts-int-1-3', title: 'Generics Exercise', type: 'exercise', duration: '30 min', completed: false,
            exercise: 'Create a generic Stack class with push, pop, and peek methods. Use generic constraints to ensure items have an id property.',
          },
        ],
      },
      {
        title: 'Advanced Types',
        lessons: [
          {
            id: 'ts-int-2-1', title: 'Union & Intersection Types', type: 'video', duration: '20 min', completed: false,
            description: 'Combine types using union and intersection operators.',
            syntaxGuide: 'type ID = string | number;\ntype Employee = Person & { employeeId: string; };',
            example: 'type Success = { status: "success"; data: string };\ntype Error = { status: "error"; message: string };\ntype Response = Success | Error;',
          },
          {
            id: 'ts-int-2-2', title: 'Utility Types', type: 'text', duration: '18 min', completed: false,
            description: 'Learn built-in utility types like Partial, Pick, Omit, Record.',
            content: 'TypeScript provides utility types for common type transformations: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>.',
            example: 'interface User {\n    id: number;\n    name: string;\n    email: string;\n}\n\ntype UserPreview = Pick<User, "id" | "name">;\ntype UserUpdate = Partial<Omit<User, "id">>;',
          },
          {
            id: 'ts-int-2-3', title: 'Type System Project', type: 'project', duration: '45 min', completed: false,
            exercise: 'Build a type-safe REST API client using generics, utility types, and conditional types. Include type-safe request and response handling.',
          },
        ],
      },
    ],
  },
  {
    id: 'ts-advanced',
    title: 'TypeScript Advanced',
    level: 'Advanced',
    description: 'Master conditional types, mapped types, module augmentation, and TypeScript at scale.',
    language: 'TypeScript',
    icon: 'TS',
    color: '#3178C6',
    modules: [
      {
        title: 'Conditional & Mapped Types',
        lessons: [
          {
            id: 'ts-adv-1-1', title: 'Conditional Types', type: 'video', duration: '25 min', completed: false,
            description: 'Create types that branch based on conditions.',
            syntaxGuide: 'type IsString<T> = T extends string ? true : false;\ntype NonNullable<T> = T extends null | undefined ? never : T;',
            example: 'type TypeName<T> =\n    T extends string ? "string" :\n    T extends number ? "number" :\n    T extends boolean ? "boolean" :\n    "unknown";',
          },
          {
            id: 'ts-adv-1-2', title: 'Mapped Types', type: 'text', duration: '22 min', completed: false,
            description: 'Transform existing types into new types.',
            content: 'Mapped types allow you to create new types by transforming properties of existing types. They are the foundation of many utility types.',
            syntaxGuide: 'type Readonly<T> = {\n    readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n    [P in keyof T]?: T[P];\n};',
          },
          {
            id: 'ts-adv-1-3', title: 'Advanced Types Project', type: 'project', duration: '55 min', completed: false,
            exercise: 'Build a type-safe ORM using conditional types, mapped types, and template literal types. Include type-safe query builders and schema definitions.',
          },
        ],
      },
      {
        title: 'TypeScript at Scale',
        lessons: [
          {
            id: 'ts-adv-2-1', title: 'Module Augmentation', type: 'video', duration: '20 min', completed: false,
            description: 'Extend existing modules with new functionality.',
            content: 'Module augmentation allows you to add new declarations to existing modules. This is useful for extending third-party libraries or your own modules.',
          },
          {
            id: 'ts-adv-2-2', title: 'Type-Safe Configuration', type: 'text', duration: '18 min', completed: false,
            description: 'Create type-safe configuration management.',
            content: 'Use TypeScript to create type-safe configuration systems with validation, environment variable handling, and schema definitions.',
          },
          {
            id: 'ts-adv-2-3', title: 'Enterprise TypeScript Project', type: 'project', duration: '70 min', completed: false,
            exercise: 'Build a type-safe event-driven architecture with TypeScript, including event emitters, handlers, and a type-safe dependency injection container.',
          },
        ],
      },
    ],
  },
];

/**
 * Get courses by language
 */
export function getCoursesByLanguage(language: string): Course[] {
  return courses.filter((c) => c.language.toLowerCase() === language.toLowerCase());
}

/**
 * Get courses by level
 */
export function getCoursesByLevel(level: string): Course[] {
  return courses.filter((c) => c.level.toLowerCase() === level.toLowerCase());
}

/**
 * Get a course by ID
 */
export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

/**
 * Get all unique programming languages
 */
export function getProgrammingLanguages(): string[] {
  return [...new Set(courses.map((c) => c.language))];
}