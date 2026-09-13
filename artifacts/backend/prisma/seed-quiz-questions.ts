import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quizQuestions = [
  // Beginner Questions (Weight 1-3)
  {
    questionText: 'What is a variable in programming?',
    optionA: 'A container for storing data values',
    optionB: 'A function that returns values',
    optionC: 'A loop structure',
    optionD: 'A conditional statement',
    correctAnswer: 'A',
    difficultyWeight: 1,
    topic: 'Variables',
  },
  {
    questionText: 'Which of the following is a primitive data type in JavaScript?',
    optionA: 'Array',
    optionB: 'Object',
    optionC: 'String',
    optionD: 'Function',
    correctAnswer: 'C',
    difficultyWeight: 2,
    topic: 'Data Types',
  },
  {
    questionText: 'What does the "=" operator do in most programming languages?',
    optionA: 'Compares two values for equality',
    optionB: 'Assigns a value to a variable',
    optionC: 'Adds two numbers',
    optionD: 'Divides two numbers',
    correctAnswer: 'B',
    difficultyWeight: 1,
    topic: 'Operators',
  },
  {
    questionText: 'What is the output of: console.log(2 + 3)?',
    optionA: '23',
    optionB: '5',
    optionC: 'undefined',
    optionD: 'NaN',
    correctAnswer: 'B',
    difficultyWeight: 1,
    topic: 'Basic Operations',
  },
  {
    questionText: 'Which keyword is used to declare a constant in JavaScript?',
    optionA: 'var',
    optionB: 'let',
    optionC: 'const',
    optionD: 'static',
    correctAnswer: 'C',
    difficultyWeight: 2,
    topic: 'Variables',
  },
  {
    questionText: 'What is an array?',
    optionA: 'A single value',
    optionB: 'A collection of values stored in a single variable',
    optionC: 'A function',
    optionD: 'A loop',
    correctAnswer: 'B',
    difficultyWeight: 3,
    topic: 'Arrays',
  },
  {
    questionText: 'What does "if" statement do in programming?',
    optionA: 'Repeats code multiple times',
    optionB: 'Declares a variable',
    optionC: 'Executes code only when a condition is true',
    optionD: 'Stops the program',
    correctAnswer: 'C',
    difficultyWeight: 2,
    topic: 'Control Flow',
  },

  // Intermediate Questions (Weight 4-7)
  {
    questionText: 'What is the difference between "==" and "===" in JavaScript?',
    optionA: 'No difference, they are the same',
    optionB: '"==" checks value only, "===" checks value and type',
    optionC: '"===" is used for strings only',
    optionD: '"==" is deprecated',
    correctAnswer: 'B',
    difficultyWeight: 5,
    topic: 'Operators',
  },
  {
    questionText: 'What is a function in programming?',
    optionA: 'A variable that stores text',
    optionB: 'A reusable block of code that performs a specific task',
    optionC: 'A type of loop',
    optionD: 'A data structure',
    correctAnswer: 'B',
    difficultyWeight: 4,
    topic: 'Functions',
  },
  {
    questionText: 'What does the "return" keyword do in a function?',
    optionA: 'Stops the function and sends a value back',
    optionB: 'Repeats the function',
    optionC: 'Declares a variable',
    optionD: 'Prints to console',
    correctAnswer: 'A',
    difficultyWeight: 4,
    topic: 'Functions',
  },
  {
    questionText: 'What is the purpose of a "for" loop?',
    optionA: 'To execute code once',
    optionB: 'To execute code a specific number of times',
    optionC: 'To declare variables',
    optionD: 'To compare values',
    correctAnswer: 'B',
    difficultyWeight: 5,
    topic: 'Loops',
  },
  {
    questionText: 'What is an object in JavaScript?',
    optionA: 'A primitive data type',
    optionB: 'A collection of key-value pairs',
    optionC: 'A type of function',
    optionD: 'A loop structure',
    correctAnswer: 'B',
    difficultyWeight: 6,
    topic: 'Objects',
  },
  {
    questionText: 'What does "scope" mean in programming?',
    optionA: 'The speed of code execution',
    optionB: 'The region where a variable is accessible',
    optionC: 'The size of a file',
    optionD: 'The number of functions',
    correctAnswer: 'B',
    difficultyWeight: 6,
    topic: 'Scope',
  },
  {
    questionText: 'What is the result of: [1, 2, 3].length?',
    optionA: '1',
    optionB: '2',
    optionC: '3',
    optionD: 'undefined',
    correctAnswer: 'C',
    difficultyWeight: 4,
    topic: 'Arrays',
  },

  // Advanced Questions (Weight 8-10)
  {
    questionText: 'What is a closure in JavaScript?',
    optionA: 'A way to close the browser',
    optionB: 'A function that has access to variables from its outer scope',
    optionC: 'A loop that never ends',
    optionD: 'A type of array',
    correctAnswer: 'B',
    difficultyWeight: 8,
    topic: 'Advanced Functions',
  },
  {
    questionText: 'What is the purpose of "async/await" in JavaScript?',
    optionA: 'To declare variables',
    optionB: 'To handle asynchronous operations more easily',
    optionC: 'To create loops',
    optionD: 'To style HTML',
    correctAnswer: 'B',
    difficultyWeight: 9,
    topic: 'Asynchronous Programming',
  },
  {
    questionText: 'What is the "this" keyword in JavaScript?',
    optionA: 'A reference to the current object',
    optionB: 'A way to declare variables',
    optionC: 'A comparison operator',
    optionD: 'A loop keyword',
    correctAnswer: 'A',
    difficultyWeight: 8,
    topic: 'Context',
  },
  {
    questionText: 'What is the difference between "null" and "undefined"?',
    optionA: 'They are exactly the same',
    optionB: '"null" is an intentional absence of value, "undefined" means not assigned',
    optionC: '"null" is a string, "undefined" is a number',
    optionD: 'There is no difference',
    correctAnswer: 'B',
    difficultyWeight: 7,
    topic: 'Data Types',
  },
  {
    questionText: 'What is a callback function?',
    optionA: 'A function that calls itself',
    optionB: 'A function passed as an argument to another function',
    optionC: 'A function that returns nothing',
    optionD: 'A function with no parameters',
    correctAnswer: 'B',
    difficultyWeight: 7,
    topic: 'Functions',
  },
  {
    questionText: 'What is the purpose of the "map()" method on arrays?',
    optionA: 'To filter elements',
    optionB: 'To create a new array by transforming each element',
    optionC: 'To sort the array',
    optionD: 'To find the length',
    correctAnswer: 'B',
    difficultyWeight: 7,
    topic: 'Arrays',
  },
  {
    questionText: 'What is event delegation in JavaScript?',
    optionA: 'Creating multiple event listeners',
    optionB: 'Using a parent element to handle events for child elements',
    optionC: 'Removing event listeners',
    optionD: 'A way to delay events',
    correctAnswer: 'B',
    difficultyWeight: 9,
    topic: 'DOM Events',
  },
  {
    questionText: 'What is destructuring in JavaScript?',
    optionA: 'Breaking code into errors',
    optionB: 'Extracting values from arrays or objects into variables',
    optionC: 'Deleting variables',
    optionD: 'Comparing two values',
    correctAnswer: 'B',
    difficultyWeight: 8,
    topic: 'ES6 Features',
  },
  {
    questionText: 'What is the spread operator (...) used for?',
    optionA: 'To divide numbers',
    optionB: 'To expand arrays or objects',
    optionC: 'To create comments',
    optionD: 'To compare values',
    correctAnswer: 'B',
    difficultyWeight: 8,
    topic: 'ES6 Features',
  },
  {
    questionText: 'What is hoisting in JavaScript?',
    optionA: 'Moving variables to the top of their scope during compilation',
    optionB: 'Deleting variables',
    optionC: 'Creating new functions',
    optionD: 'A type of loop',
    correctAnswer: 'A',
    difficultyWeight: 9,
    topic: 'JavaScript Internals',
  },
  {
    questionText: 'What is the prototype chain in JavaScript?',
    optionA: 'A chain of if statements',
    optionB: 'A mechanism for object inheritance',
    optionC: 'A type of array',
    optionD: 'A loop structure',
    correctAnswer: 'B',
    difficultyWeight: 10,
    topic: 'Object-Oriented Programming',
  },
];

async function seedQuizQuestions() {
  console.log('🌱 Seeding quiz questions...');

  try {
    // Clear existing quiz questions
    await prisma.quizQuestion.deleteMany();
    console.log('✓ Cleared existing quiz questions');

    // Insert quiz questions
    for (const question of quizQuestions) {
      await prisma.quizQuestion.create({
        data: question,
      });
    }

    console.log(`✓ Created ${quizQuestions.length} quiz questions`);
    console.log('✅ Quiz questions seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding quiz questions:', error);
    throw error;
  }
}

seedQuizQuestions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
