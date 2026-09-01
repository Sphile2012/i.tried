import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ALL 150 Lessons - Complete PolyCode Curriculum...\n');

  // ============================================================
  // TOPIC 1: PYTHON & C++ (Lessons 1-50)
  // ============================================================
  
  const pythonCppTopic = await prisma.topic.upsert({
    where: { slug: 'python-cpp-fundamentals' },
    update: {},
    create: {
      title: 'Python & C++ Fundamentals',
      slug: 'python-cpp-fundamentals',
      description: 'Master Python for beginners and C++ for performance. Learn programming logic with Python\'s simplicity and speed with C++\'s power.',
      shortDescription: 'Logic + Speed - Perfect foundation for programming',
      difficulty: 'BEGINNER',
      estimatedHours: 50,
      isPublished: true,
      isFree: false,
      orderIndex: 1,
    },
  });
  console.log('✅ Topic 1: Python & C++');

  // Python Module (25 lessons)
  const pythonModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: pythonCppTopic.id, slug: 'python-essentials' } },
    update: {},
    create: {
      topicId: pythonCppTopic.id,
      title: 'Python Essentials',
      slug: 'python-essentials',
      description: 'Learn Python from scratch - the most beginner-friendly programming language',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const pythonLessons = [
    { title: 'Introduction to Python', slug: 'intro-python', mins: 30, free: true },
    { title: 'Python Setup & Hello World', slug: 'python-setup', mins: 25, free: true },
    { title: 'Variables and Data Types', slug: 'python-variables', mins: 40, free: false },
    { title: 'Strings and String Methods', slug: 'python-strings', mins: 50, free: false },
    { title: 'Numbers and Math Operations', slug: 'python-numbers', mins: 45, free: false },
    { title: 'Lists and List Methods', slug: 'python-lists', mins: 60, free: false },
    { title: 'Tuples and Sets', slug: 'python-tuples-sets', mins: 50, free: false },
    { title: 'Dictionaries', slug: 'python-dictionaries', mins: 55, free: false },
    { title: 'Conditional Statements', slug: 'python-conditionals', mins: 45, free: false },
    { title: 'Loops: For and While', slug: 'python-loops', mins: 50, free: false },
    { title: 'Functions', slug: 'python-functions', mins: 60, free: false },
    { title: 'Lambda Functions', slug: 'python-lambda', mins: 40, free: false },
    { title: 'List Comprehensions', slug: 'python-comprehensions', mins: 50, free: false },
    { title: 'File Handling', slug: 'python-files', mins: 55, free: false },
    { title: 'Exception Handling', slug: 'python-exceptions', mins: 50, free: false },
    { title: 'Modules and Packages', slug: 'python-modules', mins: 60, free: false },
    { title: 'Object-Oriented Programming Basics', slug: 'python-oop-basics', mins: 70, free: false },
    { title: 'Classes and Objects', slug: 'python-classes', mins: 65, free: false },
    { title: 'Inheritance', slug: 'python-inheritance', mins: 60, free: false },
    { title: 'Working with JSON', slug: 'python-json', mins: 45, free: false },
    { title: 'Regular Expressions', slug: 'python-regex', mins: 55, free: false },
    { title: 'Working with APIs', slug: 'python-apis', mins: 60, free: false },
    { title: 'Virtual Environments', slug: 'python-venv', mins: 40, free: false },
    { title: 'Python Best Practices', slug: 'python-best-practices', mins: 50, free: false },
    { title: 'Python Project: Build a CLI App', slug: 'python-project', mins: 90, free: false },
  ];

  for (let i = 0; i < pythonLessons.length; i++) {
    const lesson = pythonLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: pythonModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: pythonModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- Core concepts\n- Practical examples\n- Exercises\n- Real-world applications`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ Python: ${pythonLessons.length} lessons`);

  // C++ Module (25 lessons)
  const cppModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: pythonCppTopic.id, slug: 'cpp-essentials' } },
    update: {},
    create: {
      topicId: pythonCppTopic.id,
      title: 'C++ Essentials',
      slug: 'cpp-essentials',
      description: 'Master C++ for high-performance programming and system-level development',
      orderIndex: 2,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const cppLessons = [
    { title: 'Introduction to C++', slug: 'intro-cpp', mins: 30, free: true },
    { title: 'C++ Setup & First Program', slug: 'cpp-setup', mins: 35, free: true },
    { title: 'Variables and Data Types', slug: 'cpp-variables', mins: 45, free: false },
    { title: 'Input/Output Operations', slug: 'cpp-io', mins: 40, free: false },
    { title: 'Operators in C++', slug: 'cpp-operators', mins: 50, free: false },
    { title: 'Control Flow: If-Else', slug: 'cpp-if-else', mins: 45, free: false },
    { title: 'Switch Statements', slug: 'cpp-switch', mins: 40, free: false },
    { title: 'Loops in C++', slug: 'cpp-loops', mins: 50, free: false },
    { title: 'Functions', slug: 'cpp-functions', mins: 60, free: false },
    { title: 'Function Overloading', slug: 'cpp-overloading', mins: 50, free: false },
    { title: 'Arrays', slug: 'cpp-arrays', mins: 55, free: false },
    { title: 'Strings', slug: 'cpp-strings', mins: 50, free: false },
    { title: 'Pointers Basics', slug: 'cpp-pointers', mins: 70, free: false },
    { title: 'References', slug: 'cpp-references', mins: 50, free: false },
    { title: 'Structures', slug: 'cpp-structures', mins: 55, free: false },
    { title: 'Classes and Objects', slug: 'cpp-classes', mins: 70, free: false },
    { title: 'Constructors and Destructors', slug: 'cpp-constructors', mins: 60, free: false },
    { title: 'Inheritance', slug: 'cpp-inheritance', mins: 65, free: false },
    { title: 'Polymorphism', slug: 'cpp-polymorphism', mins: 70, free: false },
    { title: 'Templates', slug: 'cpp-templates', mins: 65, free: false },
    { title: 'STL: Vectors', slug: 'cpp-vectors', mins: 55, free: false },
    { title: 'STL: Maps and Sets', slug: 'cpp-maps-sets', mins: 60, free: false },
    { title: 'File Handling', slug: 'cpp-files', mins: 55, free: false },
    { title: 'Exception Handling', slug: 'cpp-exceptions', mins: 50, free: false },
    { title: 'C++ Project: Build a Game', slug: 'cpp-project', mins: 90, free: false },
  ];

  for (let i = 0; i < cppLessons.length; i++) {
    const lesson = cppLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: cppModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: cppModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- Core concepts\n- Code examples\n- Best practices\n- Hands-on exercises`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ C++: ${cppLessons.length} lessons\n`);

  // ============================================================
  // TOPIC 2: JAVA & C# (Lessons 51-100)
  // ============================================================

  const javaCsharpTopic = await prisma.topic.upsert({
    where: { slug: 'java-csharp-enterprise' },
    update: {},
    create: {
      title: 'Java & C# Enterprise Development',
      slug: 'java-csharp-enterprise',
      description: 'Master enterprise development with Java and game development with C#. Learn object-oriented programming at scale.',
      shortDescription: 'Enterprise + Games - Build serious applications',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 50,
      isPublished: true,
      isFree: false,
      orderIndex: 2,
    },
  });
  console.log('✅ Topic 2: Java & C#');

  // Java Module (25 lessons)
  const javaModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: javaCsharpTopic.id, slug: 'java-fundamentals' } },
    update: {},
    create: {
      topicId: javaCsharpTopic.id,
      title: 'Java Fundamentals',
      slug: 'java-fundamentals',
      description: 'Learn Java for enterprise applications and Android development',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const javaLessons = [
    { title: 'Introduction to Java', slug: 'intro-java', mins: 30, free: true },
    { title: 'Java Setup & Hello World', slug: 'java-setup', mins: 35, free: true },
    { title: 'Variables and Data Types', slug: 'java-variables', mins: 40, free: false },
    { title: 'Operators', slug: 'java-operators', mins: 45, free: false },
    { title: 'Control Statements', slug: 'java-control', mins: 50, free: false },
    { title: 'Loops', slug: 'java-loops', mins: 45, free: false },
    { title: 'Methods', slug: 'java-methods', mins: 55, free: false },
    { title: 'Classes and Objects', slug: 'java-classes', mins: 65, free: false },
    { title: 'Constructors', slug: 'java-constructors', mins: 50, free: false },
    { title: 'Inheritance', slug: 'java-inheritance', mins: 65, free: false },
    { title: 'Polymorphism', slug: 'java-polymorphism', mins: 60, free: false },
    { title: 'Encapsulation', slug: 'java-encapsulation', mins: 50, free: false },
    { title: 'Abstraction', slug: 'java-abstraction', mins: 55, free: false },
    { title: 'Interfaces', slug: 'java-interfaces', mins: 60, free: false },
    { title: 'Packages', slug: 'java-packages', mins: 45, free: false },
    { title: 'Arrays', slug: 'java-arrays', mins: 50, free: false },
    { title: 'ArrayList', slug: 'java-arraylist', mins: 55, free: false },
    { title: 'HashMap', slug: 'java-hashmap', mins: 60, free: false },
    { title: 'String Handling', slug: 'java-strings', mins: 50, free: false },
    { title: 'Exception Handling', slug: 'java-exceptions', mins: 60, free: false },
    { title: 'File I/O', slug: 'java-file-io', mins: 55, free: false },
    { title: 'Multithreading Basics', slug: 'java-threads', mins: 70, free: false },
    { title: 'Collections Framework', slug: 'java-collections', mins: 65, free: false },
    { title: 'Lambda Expressions', slug: 'java-lambda', mins: 55, free: false },
    { title: 'Java Project: Banking System', slug: 'java-project', mins: 90, free: false },
  ];

  for (let i = 0; i < javaLessons.length; i++) {
    const lesson = javaLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: javaModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: javaModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- Core Java concepts\n- Industry practices\n- Code examples\n- Real-world applications`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ Java: ${javaLessons.length} lessons`);

  // C# Module (25 lessons)
  const csharpModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: javaCsharpTopic.id, slug: 'csharp-fundamentals' } },
    update: {},
    create: {
      topicId: javaCsharpTopic.id,
      title: 'C# Fundamentals',
      slug: 'csharp-fundamentals',
      description: 'Master C# for game development with Unity and .NET applications',
      orderIndex: 2,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const csharpLessons = [
    { title: 'Introduction to C#', slug: 'intro-csharp', mins: 30, free: true },
    { title: 'C# Setup & Hello World', slug: 'csharp-setup', mins: 35, free: true },
    { title: 'Variables and Types', slug: 'csharp-variables', mins: 40, free: false },
    { title: 'Operators', slug: 'csharp-operators', mins: 45, free: false },
    { title: 'Control Flow', slug: 'csharp-control', mins: 50, free: false },
    { title: 'Loops', slug: 'csharp-loops', mins: 45, free: false },
    { title: 'Methods', slug: 'csharp-methods', mins: 55, free: false },
    { title: 'Classes and Objects', slug: 'csharp-classes', mins: 65, free: false },
    { title: 'Properties', slug: 'csharp-properties', mins: 50, free: false },
    { title: 'Constructors', slug: 'csharp-constructors', mins: 50, free: false },
    { title: 'Inheritance', slug: 'csharp-inheritance', mins: 60, free: false },
    { title: 'Polymorphism', slug: 'csharp-polymorphism', mins: 60, free: false },
    { title: 'Interfaces', slug: 'csharp-interfaces', mins: 55, free: false },
    { title: 'Abstract Classes', slug: 'csharp-abstract', mins: 50, free: false },
    { title: 'Collections: List', slug: 'csharp-list', mins: 55, free: false },
    { title: 'Collections: Dictionary', slug: 'csharp-dictionary', mins: 55, free: false },
    { title: 'LINQ Basics', slug: 'csharp-linq', mins: 70, free: false },
    { title: 'String Manipulation', slug: 'csharp-strings', mins: 45, free: false },
    { title: 'Exception Handling', slug: 'csharp-exceptions', mins: 55, free: false },
    { title: 'File Handling', slug: 'csharp-files', mins: 55, free: false },
    { title: 'Delegates and Events', slug: 'csharp-delegates', mins: 65, free: false },
    { title: 'Async/Await', slug: 'csharp-async', mins: 70, free: false },
    { title: 'Unity Basics', slug: 'csharp-unity', mins: 75, free: false },
    { title: '.NET Framework Overview', slug: 'csharp-dotnet', mins: 60, free: false },
    { title: 'C# Project: Unity Game', slug: 'csharp-project', mins: 90, free: false },
  ];

  for (let i = 0; i < csharpLessons.length; i++) {
    const lesson = csharpLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: csharpModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: csharpModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- C# fundamentals\n- Game development concepts\n- .NET framework\n- Practical examples`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ C#: ${csharpLessons.length} lessons\n`);

  // ============================================================
  // TOPIC 3: JAVASCRIPT & TYPESCRIPT (Lessons 101-150)
  // ============================================================

  const jsTsTopic = await prisma.topic.upsert({
    where: { slug: 'javascript-typescript-web' },
    update: {},
    create: {
      title: 'JavaScript & TypeScript Web Development',
      slug: 'javascript-typescript-web',
      description: 'Master modern web development with JavaScript and TypeScript. Build interactive frontends and scalable backends.',
      shortDescription: 'The Web Powers - Build the modern web',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 50,
      isPublished: true,
      isFree: false,
      orderIndex: 3,
    },
  });
  console.log('✅ Topic 3: JavaScript & TypeScript');

  // JavaScript Module (25 lessons)
  const jsModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: jsTsTopic.id, slug: 'javascript-complete' } },
    update: {},
    create: {
      topicId: jsTsTopic.id,
      title: 'JavaScript Complete',
      slug: 'javascript-complete',
      description: 'Complete JavaScript from basics to advanced including frameworks',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const jsLessons = [
    { title: 'JavaScript Introduction', slug: 'js-intro', mins: 30, free: true },
    { title: 'Variables and Types', slug: 'js-variables', mins: 40, free: true },
    { title: 'Operators', slug: 'js-operators', mins: 45, free: false },
    { title: 'Control Flow', slug: 'js-control', mins: 45, free: false },
    { title: 'Loops', slug: 'js-loops', mins: 40, free: false },
    { title: 'Functions', slug: 'js-functions', mins: 55, free: false },
    { title: 'Arrow Functions', slug: 'js-arrow', mins: 45, free: false },
    { title: 'Arrays', slug: 'js-arrays', mins: 60, free: false },
    { title: 'Objects', slug: 'js-objects', mins: 55, free: false },
    { title: 'DOM Manipulation', slug: 'js-dom', mins: 70, free: false },
    { title: 'Events', slug: 'js-events', mins: 60, free: false },
    { title: 'ES6 Features', slug: 'js-es6', mins: 65, free: false },
    { title: 'Promises', slug: 'js-promises', mins: 60, free: false },
    { title: 'Async/Await', slug: 'js-async', mins: 65, free: false },
    { title: 'Fetch API', slug: 'js-fetch', mins: 55, free: false },
    { title: 'Error Handling', slug: 'js-errors', mins: 45, free: false },
    { title: 'Modules', slug: 'js-modules', mins: 50, free: false },
    { title: 'Classes', slug: 'js-classes', mins: 60, free: false },
    { title: 'JSON', slug: 'js-json', mins: 45, free: false },
    { title: 'Local Storage', slug: 'js-storage', mins: 50, free: false },
    { title: 'Node.js Intro', slug: 'js-node', mins: 60, free: false },
    { title: 'NPM Basics', slug: 'js-npm', mins: 45, free: false },
    { title: 'React Basics', slug: 'js-react', mins: 80, free: false },
    { title: 'Best Practices', slug: 'js-best-practices', mins: 50, free: false },
    { title: 'JS Project: Full App', slug: 'js-project', mins: 90, free: false },
  ];

  for (let i = 0; i < jsLessons.length; i++) {
    const lesson = jsLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: jsModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: jsModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- Modern JavaScript\n- Web development\n- Frontend frameworks\n- Best practices`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ JavaScript: ${jsLessons.length} lessons`);

  // TypeScript Module (25 lessons)
  const tsModule = await prisma.module.upsert({
    where: { topicId_slug: { topicId: jsTsTopic.id, slug: 'typescript-complete' } },
    update: {},
    create: {
      topicId: jsTsTopic.id,
      title: 'TypeScript Complete',
      slug: 'typescript-complete',
      description: 'Master TypeScript for type-safe web development',
      orderIndex: 2,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const tsLessons = [
    { title: 'TypeScript Introduction', slug: 'ts-intro', mins: 35, free: true },
    { title: 'TypeScript Setup', slug: 'ts-setup', mins: 30, free: true },
    { title: 'Basic Types', slug: 'ts-types', mins: 50, free: false },
    { title: 'Interfaces', slug: 'ts-interfaces', mins: 55, free: false },
    { title: 'Type Inference', slug: 'ts-inference', mins: 45, free: false },
    { title: 'Union Types', slug: 'ts-unions', mins: 50, free: false },
    { title: 'Functions with Types', slug: 'ts-functions', mins: 55, free: false },
    { title: 'Classes', slug: 'ts-classes', mins: 60, free: false },
    { title: 'Generics', slug: 'ts-generics', mins: 65, free: false },
    { title: 'Enums', slug: 'ts-enums', mins: 45, free: false },
    { title: 'Type Aliases', slug: 'ts-aliases', mins: 50, free: false },
    { title: 'Modules', slug: 'ts-modules', mins: 50, free: false },
    { title: 'Namespaces', slug: 'ts-namespaces', mins: 45, free: false },
    { title: 'Decorators', slug: 'ts-decorators', mins: 60, free: false },
    { title: 'Advanced Types', slug: 'ts-advanced', mins: 70, free: false },
    { title: 'Utility Types', slug: 'ts-utility', mins: 60, free: false },
    { title: 'Type Guards', slug: 'ts-guards', mins: 55, free: false },
    { title: 'TSConfig', slug: 'ts-config', mins: 50, free: false },
    { title: 'TypeScript with React', slug: 'ts-react', mins: 75, free: false },
    { title: 'TypeScript with Node', slug: 'ts-node', mins: 65, free: false },
    { title: 'TypeScript with Express', slug: 'ts-express', mins: 70, free: false },
    { title: 'Testing with TypeScript', slug: 'ts-testing', mins: 65, free: false },
    { title: 'Migration from JS', slug: 'ts-migration', mins: 60, free: false },
    { title: 'Best Practices', slug: 'ts-best-practices', mins: 55, free: false },
    { title: 'TS Project: Full Stack', slug: 'ts-project', mins: 90, free: false },
  ];

  for (let i = 0; i < tsLessons.length; i++) {
    const lesson = tsLessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId: tsModule.id, slug: lesson.slug } },
      update: {},
      create: {
        moduleId: tsModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive lesson content for ${lesson.title}.\n\n## Topics Covered\n- Type safety\n- Modern TypeScript\n- Framework integration\n- Production practices`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.free,
      },
    });
  }
  console.log(`  ✅ TypeScript: ${tsLessons.length} lessons\n`);

  // ============================================================
  // SUMMARY
  // ============================================================

  const totalLessons = 
    pythonLessons.length + cppLessons.length +
    javaLessons.length + csharpLessons.length +
    jsLessons.length + tsLessons.length;

  console.log('================================================');
  console.log('🎉 Successfully seeded ALL lessons!');
  console.log('================================================');
  console.log(`📚 Total Topics: 3`);
  console.log(`📖 Total Modules: 6`);
  console.log(`📝 Total Lessons: ${totalLessons}`);
  console.log('');
  console.log('Breakdown:');
  console.log(`  • Python: ${pythonLessons.length} lessons`);
  console.log(`  • C++: ${cppLessons.length} lessons`);
  console.log(`  • Java: ${javaLessons.length} lessons`);
  console.log(`  • C#: ${csharpLessons.length} lessons`);
  console.log(`  • JavaScript: ${jsLessons.length} lessons`);
  console.log(`  • TypeScript: ${tsLessons.length} lessons`);
  console.log('================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
