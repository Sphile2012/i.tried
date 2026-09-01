/**
 * Unified Concept System
 * One concept, 6 language implementations
 */

import type { LanguageId } from './languages';

export interface ConceptLesson {
  id: string;
  title: string;
  category: string;
  order: number;
  duration: string;
  xpReward: number;
  description: string;
  implementations: Record<LanguageId, LessonImplementation>;
}

export interface LessonImplementation {
  content: string;
  codeExample: string;
  task?: string;
  solution?: string;
  tips?: string[];
  commonMistakes?: string[];
}

// Shared concepts across all languages
export const UNIFIED_CONCEPTS: ConceptLesson[] = [
  {
    id: 'variables',
    title: 'Variables',
    category: 'Basics',
    order: 1,
    duration: '3 min',
    xpReward: 10,
    description: 'Learn how to store and use data in your programs',
    implementations: {
      cpp: {
        content: 'In C++, you must declare the type of a variable before using it.',
        codeExample: `int age = 21;
double price = 19.99;
string name = "Phumeh";
bool isStudent = true;

cout << "Name: " << name << endl;
cout << "Age: " << age << endl;`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use meaningful variable names', 'Always initialize variables'],
      },
      python: {
        content: 'Python automatically determines the type of your variables.',
        codeExample: `age = 21
price = 19.99
name = "Phumeh"
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use snake_case for variable names', 'No need to declare types'],
      },
      java: {
        content: 'Java requires explicit type declaration for variables.',
        codeExample: `int age = 21;
double price = 19.99;
String name = "Phumeh";
boolean isStudent = true;

System.out.println("Name: " + name);
System.out.println("Age: " + age);`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use camelCase for variable names', 'String starts with capital S'],
      },
      javascript: {
        content: 'JavaScript has flexible typing with let, const, and var keywords.',
        codeExample: `let age = 21;
const name = "Phumeh";
let price = 19.99;
let isStudent = true;

console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use const for values that won\'t change', 'Use let for variables that will change'],
      },
      c: {
        content: 'C requires explicit type declaration and uses printf for output.',
        codeExample: `int age = 21;
double price = 19.99;
char name[] = "Phumeh";
int is_student = 1; // 1 for true

printf("Name: %s\\n", name);
printf("Age: %d\\n", age);`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use descriptive names', 'Remember to include stdio.h'],
      },
      go: {
        content: 'Go can infer types with := or use explicit type declaration.',
        codeExample: `age := 21
price := 19.99
name := "Phumeh"
isStudent := true

fmt.Printf("Name: %s\\n", name)
fmt.Printf("Age: %d\\n", age)`,
        task: 'Create variables for your name, age, and favorite number',
        tips: ['Use := for short variable declaration', 'Go automatically infers types'],
      },
    },
  },
  {
    id: 'loops',
    title: 'For Loops',
    category: 'Control Flow',
    order: 5,
    duration: '4 min',
    xpReward: 10,
    description: 'Repeat code multiple times efficiently',
    implementations: {
      cpp: {
        content: 'C++ for loops have initialization, condition, and increment.',
        codeExample: `// Print numbers 0 to 9
for (int i = 0; i < 10; i++) {
    cout << i << " ";
}
cout << endl;

// Sum of first 10 numbers
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
cout << "Sum: " << sum << endl;`,
        task: 'Print numbers from 1 to 20',
      },
      python: {
        content: 'Python uses range() for numeric loops and simplified syntax.',
        codeExample: `# Print numbers 0 to 9
for i in range(10):
    print(i, end=" ")
print()

# Sum of first 10 numbers
sum = 0
for i in range(1, 11):
    sum += i
print(f"Sum: {sum}")`,
        task: 'Print numbers from 1 to 20',
      },
      java: {
        content: 'Java for loops are similar to C++ with type declaration.',
        codeExample: `// Print numbers 0 to 9
for (int i = 0; i < 10; i++) {
    System.out.print(i + " ");
}
System.out.println();

// Sum of first 10 numbers
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
System.out.println("Sum: " + sum);`,
        task: 'Print numbers from 1 to 20',
      },
      javascript: {
        content: 'JavaScript for loops are flexible and can iterate over arrays.',
        codeExample: `// Print numbers 0 to 9
for (let i = 0; i < 10; i++) {
    process.stdout.write(i + " ");
}
console.log();

// Sum of first 10 numbers
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log(\`Sum: \${sum}\`);`,
        task: 'Print numbers from 1 to 20',
      },
      c: {
        content: 'C for loops are fundamental and similar to C++.',
        codeExample: `// Print numbers 0 to 9
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
printf("\\n");

// Sum of first 10 numbers
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
printf("Sum: %d\\n", sum);`,
        task: 'Print numbers from 1 to 20',
      },
      go: {
        content: 'Go has only for loops, but they are very flexible.',
        codeExample: `// Print numbers 0 to 9
for i := 0; i < 10; i++ {
    fmt.Print(i, " ")
}
fmt.Println()

// Sum of first 10 numbers
sum := 0
for i := 1; i <= 10; i++ {
    sum += i
}
fmt.Printf("Sum: %d\\n", sum)`,
        task: 'Print numbers from 1 to 20',
      },
    },
  },
  {
    id: 'functions',
    title: 'Functions',
    category: 'Functions',
    order: 8,
    duration: '5 min',
    xpReward: 15,
    description: 'Create reusable blocks of code',
    implementations: {
      cpp: {
        content: 'C++ functions have return types and parameter types.',
        codeExample: `int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    int result = add(5, 3);
    cout << "5 + 3 = " << result << endl;
    greet("Phumeh");
    return 0;
}`,
        task: 'Create a function that multiplies two numbers',
      },
      python: {
        content: 'Python functions use def keyword and don\'t require type declarations.',
        codeExample: `def add(a, b):
    return a + b

def greet(name):
    print(f"Hello, {name}!")

# Using functions
result = add(5, 3)
print(f"5 + 3 = {result}")
greet("Phumeh")`,
        task: 'Create a function that multiplies two numbers',
      },
      java: {
        content: 'Java methods are functions defined inside classes.',
        codeExample: `public class Main {
    static int add(int a, int b) {
        return a + b;
    }
    
    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
    
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
        greet("Phumeh");
    }
}`,
        task: 'Create a method that multiplies two numbers',
      },
      javascript: {
        content: 'JavaScript has multiple ways to define functions.',
        codeExample: `function add(a, b) {
    return a + b;
}

const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};

// Using functions
const result = add(5, 3);
console.log(\`5 + 3 = \${result}\`);
greet("Phumeh");`,
        task: 'Create a function that multiplies two numbers',
      },
      c: {
        content: 'C functions must be declared before use or have prototypes.',
        codeExample: `int add(int a, int b) {
    return a + b;
}

void greet(char name[]) {
    printf("Hello, %s!\\n", name);
}

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\\n", result);
    greet("Phumeh");
    return 0;
}`,
        task: 'Create a function that multiplies two numbers',
      },
      go: {
        content: 'Go functions can return multiple values.',
        codeExample: `func add(a int, b int) int {
    return a + b
}

func greet(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}

func main() {
    result := add(5, 3)
    fmt.Printf("5 + 3 = %d\\n", result)
    greet("Phumeh")
}`,
        task: 'Create a function that multiplies two numbers',
      },
    },
  },
];

// Get lesson in specific language
export const getLessonInLanguage = (conceptId: string, languageId: LanguageId) => {
  const concept = UNIFIED_CONCEPTS.find(c => c.id === conceptId);
  if (!concept) return null;
  
  return {
    ...concept,
    implementation: concept.implementations[languageId],
  };
};

// Get all concepts for a language
export const getConceptsForLanguage = (languageId: LanguageId) => {
  return UNIFIED_CONCEPTS.map(concept => ({
    id: concept.id,
    title: concept.title,
    category: concept.category,
    order: concept.order,
    duration: concept.duration,
    xpReward: concept.xpReward,
    description: concept.description,
    implementation: concept.implementations[languageId],
  }));
};

// Get code comparison for a concept (all 6 languages)
export const getCodeComparison = (conceptId: string) => {
  const concept = UNIFIED_CONCEPTS.find(c => c.id === conceptId);
  if (!concept) return null;
  
  return {
    concept: concept.title,
    description: concept.description,
    examples: Object.entries(concept.implementations).reduce(
      (acc, [lang, impl]) => ({
        ...acc,
        [lang]: impl.codeExample,
      }),
      {} as Record<LanguageId, string>
    ),
  };
};
