import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { X, Code, Lightbulb, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface GlossaryTerm {
  term: string;
  simpleExplanation: string;
  whyUsed: string;
  example: string;
  commonMistakes: string[];
  realWorldAnalogy?: string;
  relatedTerms?: string[];
  category: 'fundamental' | 'oop' | 'memory' | 'stl' | 'advanced';
}

export const glossaryData: Record<string, GlossaryTerm> = {
  // C++ Fundamental Terms
  'Object': {
    term: 'Object',
    simpleExplanation: 'An object is an instance of a class. It\'s a concrete entity that contains data (attributes) and functions (methods) that operate on that data.',
    whyUsed: 'Objects allow you to model real-world entities in your code. They bundle related data and behavior together, making code more organized and reusable.',
    example: `class Car {
  string color;
  int speed;
  void accelerate() { speed += 10; }
};

Car myCar;        // myCar is an object
myCar.color = "red";
myCar.accelerate();`,
    commonMistakes: [
      'Confusing objects with classes (a class is a blueprint, an object is the actual thing)',
      'Forgetting to initialize object members',
      'Creating objects when a simple variable would suffice'
    ],
    realWorldAnalogy: 'A class is like a blueprint for a house. An object is the actual house built from that blueprint. You can build many houses (objects) from one blueprint (class).',
    relatedTerms: ['Class', 'Instance', 'Constructor'],
    category: 'fundamental'
  },
  'Class': {
    term: 'Class',
    simpleExplanation: 'A class is a blueprint or template for creating objects. It defines the properties (data members) and behaviors (member functions) that objects of that class will have.',
    whyUsed: 'Classes enable object-oriented programming by allowing you to define custom types that encapsulate data and operations.',
    example: `class Student {
private:
    string name;
    int grade;
public:
    void setName(string n) { name = n; }
    int getGrade() { return grade; }
};`,
    commonMistakes: [
      'Making all members public (breaks encapsulation)',
      'Forgetting the semicolon after class definition',
      'Not providing constructors for proper initialization'
    ],
    realWorldAnalogy: 'A class is like a cookie cutter. It defines the shape, but you need to use it to make actual cookies (objects).',
    relatedTerms: ['Object', 'Instance', 'Encapsulation'],
    category: 'oop'
  },
  'Pointer': {
    term: 'Pointer',
    simpleExplanation: 'A pointer is a variable that stores the memory address of another variable. It "points to" where data is located in memory.',
    whyUsed: 'Pointers enable dynamic memory allocation, efficient array/string handling, and passing large objects to functions without copying.',
    example: `int value = 42;
int* ptr = &value;    // ptr stores address of value
cout << *ptr;         // Output: 42 (dereferencing)
*ptr = 100;           // Changes value to 100`,
    commonMistakes: [
      'Dereferencing null or uninitialized pointers',
      'Memory leaks (allocating but not freeing memory)',
      'Dangling pointers (pointing to freed memory)',
      'Confusing * (declaration vs dereferencing)'
    ],
    realWorldAnalogy: 'A pointer is like a hotel room key. The key doesn\'t contain the room; it tells you where the room is (the address).',
    relatedTerms: ['Reference', 'Memory', 'Dynamic Allocation'],
    category: 'memory'
  },
  'Reference': {
    term: 'Reference',
    simpleExplanation: 'A reference is an alias for an existing variable. It provides an alternative name to access the same memory location.',
    whyUsed: 'References allow passing variables to functions without copying, enabling modification of original values while being safer than pointers.',
    example: `int original = 42;
int& ref = original;  // ref is an alias
ref = 100;            // original is now 100
cout << original;     // Output: 100`,
    commonMistakes: [
      'Trying to reassign a reference to refer to something else',
      'Creating references to temporary objects',
      'Confusing references with pointers'
    ],
    realWorldAnalogy: 'A reference is like a nickname. "Bob" and "Robert" might refer to the same person, but they\'re just different names for the same individual.',
    relatedTerms: ['Pointer', 'Pass by Reference'],
    category: 'fundamental'
  },
  'Constructor': {
    term: 'Constructor',
    simpleExplanation: 'A constructor is a special member function that is automatically called when an object is created. It initializes the object\'s data members.',
    whyUsed: 'Constructors ensure objects start in a valid, initialized state. They prevent using objects with garbage or uninitialized data.',
    example: `class Rectangle {
    double width, height;
public:
    Rectangle(double w, double h) {  // Constructor
        width = w;
        height = h;
    }
};

Rectangle rect(5.0, 3.0);  // Constructor called`,
    commonMistakes: [
      'Forgetting to initialize all members',
      'Confusing constructor with regular methods',
      'Not using member initializer lists for efficiency'
    ],
    realWorldAnalogy: 'A constructor is like the setup process when you buy a new phone - it configures everything so the phone is ready to use right out of the box.',
    relatedTerms: ['Destructor', 'Object', 'Initialization'],
    category: 'oop'
  },
  'Destructor': {
    term: 'Destructor',
    simpleExplanation: 'A destructor is a special member function automatically called when an object goes out of scope or is deleted. It cleans up resources the object was using.',
    whyUsed: 'Destructors prevent resource leaks by ensuring memory, file handles, and other resources are properly released when objects are destroyed.',
    example: `class FileHandler {
    FILE* file;
public:
    ~FileHandler() {  // Destructor
        if (file) fclose(file);
    }
};`,
    commonMistakes: [
      'Forgetting to make destructors virtual in base classes',
      'Throwing exceptions from destructors',
      'Not cleaning up all allocated resources'
    ],
    realWorldAnalogy: 'A destructor is like cleaning up your room when you move out - you remove all your belongings and leave it in good condition for the next occupant.',
    relatedTerms: ['Constructor', 'RAII', 'Resource Management'],
    category: 'oop'
  },
  'Inheritance': {
    term: 'Inheritance',
    simpleExplanation: 'Inheritance allows a class (derived class) to inherit properties and methods from another class (base class), promoting code reuse.',
    whyUsed: 'Inheritance establishes "is-a" relationships, allows code reuse, and enables polymorphism where derived classes can be treated as base class objects.',
    example: `class Animal {
protected:
    string name;
public:
    void eat() { cout << "Eating..."; }
};

class Dog : public Animal {  // Dog inherits from Animal
public:
    void bark() { cout << "Woof!"; }
};

Dog myDog;
myDog.eat();   // Inherited method
myDog.bark();  // Dog-specific method`,
    commonMistakes: [
      'Using inheritance when composition is more appropriate',
      'Forgetting to call base class constructors',
      'Not understanding access specifiers (public/protected/private)',
      'Creating deep inheritance hierarchies that are hard to maintain'
    ],
    realWorldAnalogy: 'Inheritance is like genetic inheritance. A child (derived class) inherits traits from parents (base class) but can also have unique characteristics.',
    relatedTerms: ['Polymorphism', 'Base Class', 'Derived Class'],
    category: 'oop'
  },
  'Polymorphism': {
    term: 'Polymorphism',
    simpleExplanation: 'Polymorphism allows objects of different classes to be treated as objects of a common base class. The same function call can behave differently based on the actual object type.',
    whyUsed: 'Polymorphism enables writing generic code that works with base class pointers/references but calls the appropriate derived class implementation.',
    example: `class Shape {
public:
    virtual void draw() { cout << "Drawing shape"; }
};

class Circle : public Shape {
public:
    void draw() override { cout << "Drawing circle"; }
};

Shape* shape = new Circle();
shape->draw();  // Output: "Drawing circle" (not "Drawing shape")`,
    commonMistakes: [
      'Forgetting virtual keyword in base class',
      'Not making destructors virtual in polymorphic base classes',
      'Confusing compile-time (overloading) vs runtime polymorphism'
    ],
    realWorldAnalogy: 'Polymorphism is like a universal remote control. The same "power" button works differently depending on whether you\'re controlling a TV, DVD player, or stereo.',
    relatedTerms: ['Virtual Function', 'Override', 'Base Class'],
    category: 'oop'
  },
  'Virtual Function': {
    term: 'Virtual Function',
    simpleExplanation: 'A virtual function is a member function in a base class that can be overridden in derived classes. It enables runtime polymorphism.',
    whyUsed: 'Virtual functions allow you to write code that works with base class pointers but calls the appropriate derived class implementation at runtime.',
    example: `class Animal {
public:
    virtual void speak() { cout << "Some sound"; }
};

class Cat : public Animal {
public:
    void speak() override { cout << "Meow"; }
};

Animal* pet = new Cat();
pet->speak();  // Output: "Meow" (not "Some sound")`,
    commonMistakes: [
      'Forgetting the virtual keyword',
      'Not using override keyword in derived classes',
      'Performance overhead compared to non-virtual calls',
      'Forgetting to make destructors virtual'
    ],
    realWorldAnalogy: 'Virtual functions are like customizable templates. The base class provides a default version, but each derived class can provide its own specialized version.',
    relatedTerms: ['Polymorphism', 'Override', 'Pure Virtual'],
    category: 'oop'
  },
  'Template': {
    term: 'Template',
    simpleExplanation: 'A template is a blueprint for creating generic functions or classes that can work with any data type without rewriting code for each type.',
    whyUsed: 'Templates enable code reuse across different data types while maintaining type safety. They\'re the foundation of the STL.',
    example: `template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

int maxInt = getMax(5, 10);        // T becomes int
double maxDouble = getMax(3.14, 2.71);  // T becomes double`,
    commonMistakes: [
      'Putting template code in .cpp files (must be in headers)',
      'Code bloat from too many template instantiations',
      'Confusing typename and class keywords',
      'Poor error messages making debugging difficult'
    ],
    realWorldAnalogy: 'A template is like a cookie cutter that works with any type of dough. The same cutter (template) can make cookies from chocolate, vanilla, or oatmeal dough (different types).',
    relatedTerms: ['Generic Programming', 'STL', 'Type Safety'],
    category: 'advanced'
  },
  'Vector': {
    term: 'Vector',
    simpleExplanation: 'A vector is a dynamic array that can grow or shrink in size. It stores elements of the same type in contiguous memory.',
    whyUsed: 'Vectors provide the flexibility of dynamic sizing with the performance of array-like access. They\'re the most commonly used STL container.',
    example: `#include <vector>

vector<int> numbers;        // Empty vector
numbers.push_back(10);      // Add element
numbers.push_back(20);
numbers[0] = 100;           // Access like array
cout << numbers.size();     // Output: 2

for (int num : numbers) {   // Range-based for loop
    cout << num << " ";
}`,
    commonMistakes: [
      'Using push_back when reserve() would be more efficient',
      'Invalidating iterators when vector reallocates',
      'Confusing size() with capacity()',
      'Using vectors when other containers would be more appropriate'
    ],
    realWorldAnalogy: 'A vector is like a stretchable shopping list. You can add items (push_back), remove items (pop_back), and the list automatically expands or contracts as needed.',
    relatedTerms: ['STL', 'Dynamic Array', 'Iterator'],
    category: 'stl'
  },
  'Iterator': {
    term: 'Iterator',
    simpleExplanation: 'An iterator is an object that points to an element in a container (like vector, list, map) and allows traversal through the container.',
    whyUsed: 'Iterators provide a uniform way to access elements in different container types without exposing the underlying implementation.',
    example: `vector<int> numbers = {1, 2, 3, 4, 5};

// Using iterator
for (vector<int>::iterator it = numbers.begin(); 
     it != numbers.end(); ++it) {
    cout << *it << " ";  // Dereference iterator
}

// Modern range-based for loop (uses iterators internally)
for (int num : numbers) {
    cout << num << " ";
}`,
    commonMistakes: [
      'Dereferencing end() iterator',
      'Using invalidated iterators after container modification',
      'Confusing iterator types for different containers',
      'Not understanding iterator categories (input, output, forward, bidirectional, random-access)'
    ],
    realWorldAnalogy: 'An iterator is like a bookmark in a book. It marks your current position, and you can move it forward or backward to read different pages (elements).',
    relatedTerms: ['Container', 'STL', 'Range-based For'],
    category: 'stl'
  },
  'RAII': {
    term: 'RAII',
    simpleExplanation: 'RAII (Resource Acquisition Is Initialization) is a programming idiom where resource management is tied to object lifetime. Resources are acquired in constructors and released in destructors.',
    whyUsed: 'RAII ensures resources are properly cleaned up even if exceptions occur. It\'s fundamental to C++\'s approach to memory and resource management.',
    example: `class FileHandle {
    FILE* file;
public:
    FileHandle(const char* filename) {  // Acquire resource
        file = fopen(filename, "r");
    }
    ~FileHandle() {                     // Release resource
        if (file) fclose(file);
    }
};

void processFile() {
    FileHandle fh("data.txt");  // File automatically closed
    // ... use file ...
}  // fh destructor called here, file closed automatically`,
    commonMistakes: [
      'Not following RAII for custom resources',
      'Mixing RAII with manual resource management',
      'Forgetting that RAII objects should not be copied (use smart pointers)',
      'Not understanding exception safety guarantees'
    ],
    realWorldAnalogy: 'RAII is like renting a car. You get the keys (resource) when you sign the contract (constructor), and you return them (destructor) when you\'re done. The rental company ensures you can\'t leave without returning the keys.',
    relatedTerms: ['Smart Pointer', 'Destructor', 'Exception Safety'],
    category: 'memory'
  },
  'Smart Pointer': {
    term: 'Smart Pointer',
    simpleExplanation: 'A smart pointer is a wrapper class around a raw pointer that automatically manages memory deallocation, preventing memory leaks.',
    whyUsed: 'Smart pointers automate memory management, eliminating most memory leaks and dangling pointer bugs. They implement RAII for dynamic memory.',
    example: `#include <memory>

unique_ptr<int> p1 = make_unique<int>(42);  // Exclusive ownership
// p1 automatically deleted when goes out of scope

shared_ptr<int> p2 = make_shared<int>(100);  // Shared ownership
shared_ptr<int> p3 = p2;  // Reference count becomes 2
// Memory freed when last shared_ptr goes out of scope

weak_ptr<int> p4 = p2;  // Non-owning reference`,
    commonMistakes: [
      'Using raw new/delete with smart pointers',
      'Creating circular references with shared_ptr',
      'Not understanding when to use unique_ptr vs shared_ptr',
      'Performance overhead compared to raw pointers'
    ],
    realWorldAnalogy: 'A smart pointer is like a library book with an automatic return system. When you\'re done reading (object goes out of scope), the book automatically returns itself to the library (memory is freed).',
    relatedTerms: ['unique_ptr', 'shared_ptr', 'weak_ptr', 'RAII'],
    category: 'memory'
  },
  'Stack': {
    term: 'Stack',
    simpleExplanation: 'The stack is a region of memory where local variables and function call information are stored. It follows LIFO (Last-In-First-Out) order.',
    whyUsed: 'The stack provides fast, automatic memory management for local variables and function calls. Memory is automatically freed when variables go out of scope.',
    example: `void functionA() {
    int x = 10;      // Allocated on stack
    int y = 20;      // Allocated on stack
    // When function returns, x and y are automatically freed
}

int main() {
    functionA();     // Stack frame created
    // Stack frame destroyed when functionA returns
}`,
    commonMistakes: [
      'Stack overflow from too much local data or deep recursion',
      'Returning pointers to local stack variables',
      'Confusing stack allocation with heap allocation',
      'Not understanding stack frame layout'
    ],
    realWorldAnalogy: 'The stack is like a stack of plates in a cafeteria. You add plates to the top (push) and remove from the top (pop). The last plate added is the first one removed.',
    relatedTerms: ['Heap', 'Stack Frame', 'Local Variable'],
    category: 'memory'
  },
  'Heap': {
    term: 'Heap',
    simpleExplanation: 'The heap is a region of memory used for dynamic allocation. Memory allocated on the heap persists until explicitly freed by the programmer.',
    whyUsed: 'The heap allows allocating memory of unknown size at compile time, creating objects that outlive their creating scope, and managing large data structures.',
    example: `int* ptr = new int(42);  // Allocate on heap
// Memory persists until explicitly freed
delete ptr;           // Free the memory
ptr = nullptr;        // Good practice to avoid dangling pointer

// Modern C++ (preferred):
auto smartPtr = make_unique<int>(42);  // Heap allocation with automatic cleanup`,
    commonMistakes: [
      'Memory leaks (forgetting to delete)',
      'Dangling pointers (using memory after delete)',
      'Double deletion (deleting same memory twice)',
      'Fragmentation from frequent allocation/deallocation'
    ],
    realWorldAnalogy: 'The heap is like a storage warehouse. You rent space (allocate), use it as long as needed, and must explicitly return the space (deallocate) when done. If you forget to return it, you keep paying rent (memory leak).',
    relatedTerms: ['Stack', 'Dynamic Allocation', 'Memory Leak'],
    category: 'memory'
  },
  'Recursion': {
    term: 'Recursion',
    simpleExplanation: 'Recursion is a technique where a function calls itself to solve a problem by breaking it into smaller instances of the same problem.',
    whyUsed: 'Recursion provides elegant solutions for problems with recursive structure (like tree traversal, factorial, Fibonacci). It can simplify code for complex problems.',
    example: `int factorial(int n) {
    if (n <= 1) return 1;          // Base case (stops recursion)
    return n * factorial(n - 1);   // Recursive case
}

cout << factorial(5);  // Output: 120
// factorial(5) = 5 * factorial(4)
// factorial(4) = 4 * factorial(3)
// ...eventually reaches factorial(1) = 1`,
    commonMistakes: [
      'Missing or incorrect base case (causes infinite recursion)',
      'Stack overflow from too deep recursion',
      'Inefficient solutions when iteration would be better',
      'Not understanding the call stack behavior'
    ],
    realWorldAnalogy: 'Recursion is like Russian nesting dolls. To understand the biggest doll, you open it to find a smaller doll, and so on, until you reach the smallest doll (base case). Then you work your way back out.',
    relatedTerms: ['Base Case', 'Call Stack', 'Iteration'],
    category: 'fundamental'
  }
};

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const termData = glossaryData[term];

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const tooltipWidth = 400;
      const tooltipHeight = 300;
      
      let x = rect.left;
      let y = rect.bottom + 8;

      // Prevent overflow off right edge
      if (x + tooltipWidth > window.innerWidth) {
        x = window.innerWidth - tooltipWidth - 16;
      }

      // Prevent overflow off bottom edge
      if (y + tooltipHeight > window.innerHeight) {
        y = rect.top - tooltipHeight - 8;
      }

      setPosition({ x, y });
    }
  }, [isOpen]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          tooltipRef.current && 
          !tooltipRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!termData) {
    return <>{children}</>;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fundamental': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'oop': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'memory': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'stl': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded transition-all duration-200 cursor-help"
      >
        {children}
        <span className="text-xs opacity-60">?</span>
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999
          }}
          className="w-[400px] max-h-[500px] overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(termData.category)}`}>
                {termData.category.toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-white">{termData.term}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Simple Explanation */}
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                What it is
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {termData.simpleExplanation}
              </p>
            </div>

            {/* Why Used */}
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2">Why it's used</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {termData.whyUsed}
              </p>
            </div>

            {/* Code Example */}
            <div>
              <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Example
              </h4>
              <pre className="bg-slate-950 border border-slate-800 rounded p-3 overflow-x-auto">
                <code className="text-xs text-slate-300 font-mono whitespace-pre">
                  {termData.example}
                </code>
              </pre>
            </div>

            {/* Common Mistakes */}
            <div>
              <h4 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Mistakes
              </h4>
              <ul className="text-sm text-slate-300 space-y-1">
                {termData.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real World Analogy */}
            {termData.realWorldAnalogy && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Real-world analogy</h4>
                <p className="text-sm text-slate-300 italic">
                  {termData.realWorldAnalogy}
                </p>
              </div>
            )}

            {/* Related Terms */}
            {termData.relatedTerms && (
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Related terms</h4>
                <div className="flex flex-wrap gap-2">
                  {termData.relatedTerms.map((relatedTerm) => (
                    <span 
                      key={relatedTerm} 
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-slate-700 text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                      {relatedTerm}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}