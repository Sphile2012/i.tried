import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Expanded Python lesson content
const expandedPythonContent = {
  'intro-python': `# Introduction to Python

## What is Python?

Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It emphasizes code readability and simplicity, making it perfect for beginners.

## Why Learn Python?

- **Easy to Learn**: Simple, English-like syntax
- **Versatile**: Web development, data science, AI, automation
- **In Demand**: Top 3 most popular programming languages
- **Great Community**: Millions of developers worldwide

## Real-World Applications

- **Web Development**: Django, Flask
- **Data Science**: NumPy, Pandas, Matplotlib
- **Machine Learning**: TensorFlow, PyTorch
- **Automation**: Scripts, bots, web scraping
- **Game Development**: Pygame

## Your First Python Program

\`\`\`python
print("Hello, World!")
print("Welcome to Python programming!")
\`\`\`

## Career Opportunities

- Data Scientist: $120k - $180k/year
- Python Developer: $80k - $150k/year
- Machine Learning Engineer: $130k - $200k/year
- Backend Developer: $90k - $160k/year

## What You'll Learn

1. Python basics and syntax
2. Data structures
3. Functions and modules
4. Object-oriented programming
5. File handling and APIs
6. Real-world projects

Let's start your Python journey! 🚀`,

  'python-variables': `# Variables and Data Types in Python

## What is a Variable?

A variable is a container that stores data. Think of it as a labeled box where you can put information.

## Creating Variables

\`\`\`python
# No need to declare type - Python is dynamically typed
name = "Alice"
age = 25
height = 5.6
is_student = True
\`\`\`

## Data Types

### 1. Strings (Text)
\`\`\`python
name = "John Doe"
message = 'Hello, World!'
multi_line = """This is
a multi-line
string"""

# String operations
print(name.upper())      # JOHN DOE
print(name.lower())      # john doe
print(len(name))         # 8
print(name[0])           # J
print(name.split())      # ['John', 'Doe']
\`\`\`

### 2. Numbers
\`\`\`python
# Integer
age = 25
students = 100

# Float
price = 19.99
temperature = 98.6

# Operations
sum = 10 + 5           # 15
difference = 10 - 5    # 5
product = 10 * 5       # 50
quotient = 10 / 5      # 2.0
power = 2 ** 3         # 8
modulus = 10 % 3       # 1
\`\`\`

### 3. Boolean
\`\`\`python
is_active = True
is_admin = False

# Boolean operations
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
\`\`\`

### 4. None
\`\`\`python
result = None  # Represents absence of value
\`\`\`

## Variable Naming Rules

✅ **Valid**:
- \`user_name\`
- \`userAge\`
- \`user2\`
- \`_private\`

❌ **Invalid**:
- \`2user\` (starts with number)
- \`user-name\` (contains hyphen)
- \`for\` (reserved keyword)

## Type Checking

\`\`\`python
name = "Alice"
age = 25

print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>

# Type conversion
age_str = str(age)
number = int("100")
decimal = float("3.14")
\`\`\`

## Multiple Assignment

\`\`\`python
# Assign multiple variables
x, y, z = 1, 2, 3

# Swap values
a, b = 10, 20
a, b = b, a  # a=20, b=10

# Same value to multiple variables
x = y = z = 0
\`\`\`

## Practice Exercises

1. Create variables for your name, age, and city
2. Calculate the area of a rectangle (length × width)
3. Convert temperature from Celsius to Fahrenheit
4. Create a simple calculator using variables

## Common Mistakes

❌ Using undefined variables:
\`\`\`python
print(username)  # Error: name 'username' is not defined
\`\`\`

✅ Define before use:
\`\`\`python
username = "Alice"
print(username)  # Alice
\`\`\`

## Summary

- Variables store data
- Python has multiple data types
- No need to declare types explicitly
- Follow naming conventions
- Use meaningful variable names

Next: Learn about strings and string methods! 📝`,
};

async function main() {
  console.log('🌱 Expanding lessons with detailed content...\n');

  // Find existing Python module
  const pythonModule = await prisma.module.findFirst({
    where: { slug: 'python-essentials' },
  });

  if (pythonModule) {
    // Update specific lessons with expanded content
    for (const [slug, content] of Object.entries(expandedPythonContent)) {
      const updated = await prisma.lesson.updateMany({
        where: {
          moduleId: pythonModule.id,
          slug: slug,
        },
        data: {
          content: content,
        },
      });

      if (updated.count > 0) {
        console.log(`  ✅ Expanded: ${slug}`);
      }
    }
  }

  // Add more advanced topics
  const advancedTopics = await prisma.topic.upsert({
    where: { slug: 'advanced-web-development' },
    update: {},
    create: {
      title: 'Advanced Web Development',
      slug: 'advanced-web-development',
      description: 'Master advanced web development concepts including React, Vue, Angular, Node.js, and full-stack architecture',
      shortDescription: 'Build production-ready web applications',
      difficulty: 'ADVANCED',
      estimatedHours: 80,
      isPublished: true,
      isFree: false,
      orderIndex: 4,
    },
  });

  console.log('\n✅ Advanced Web Development Topic');

  // React Advanced Module
  const reactModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: advancedTopics.id,
        slug: 'react-advanced',
      },
    },
    update: {},
    create: {
      topicId: advancedTopics.id,
      title: 'React Advanced',
      slug: 'react-advanced',
      description: 'Advanced React patterns, hooks, performance optimization, and state management',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1200,
    },
  });

  const reactLessons = [
    { title: 'React Performance Optimization', slug: 'react-performance', mins: 70 },
    { title: 'React Hooks Deep Dive', slug: 'react-hooks-deep', mins: 80 },
    { title: 'Context API & State Management', slug: 'react-context-state', mins: 75 },
    { title: 'React Router v6', slug: 'react-router', mins: 65 },
    { title: 'Redux Toolkit', slug: 'redux-toolkit', mins: 85 },
    { title: 'React Query', slug: 'react-query', mins: 70 },
    { title: 'React Testing Library', slug: 'react-testing', mins: 80 },
    { title: 'Next.js Fundamentals', slug: 'nextjs-fundamentals', mins: 90 },
    { title: 'Server Components', slug: 'server-components', mins: 75 },
    { title: 'React Best Practices', slug: 'react-best-practices', mins: 60 },
  ];

  for (let i = 0; i < reactLessons.length; i++) {
    const lesson = reactLessons[i];
    if (!lesson) continue;
    await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: reactModule.id,
          slug: lesson.slug,
        },
      },
      update: {},
      create: {
        moduleId: reactModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nAdvanced ${lesson.title} content with practical examples and production patterns.`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: i < 2,
      },
    });
  }

  console.log(`  ✅ React Advanced: ${reactLessons.length} lessons`);

  // Node.js Backend Module
  const nodeModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: advancedTopics.id,
        slug: 'nodejs-backend',
      },
    },
    update: {},
    create: {
      topicId: advancedTopics.id,
      title: 'Node.js Backend Development',
      slug: 'nodejs-backend',
      description: 'Build scalable backend APIs with Node.js, Express, and databases',
      orderIndex: 2,
      isPublished: true,
      estimatedMinutes: 1400,
    },
  });

  const nodeLessons = [
    { title: 'Express.js Advanced', slug: 'express-advanced', mins: 75 },
    { title: 'RESTful API Design', slug: 'rest-api-design', mins: 70 },
    { title: 'Authentication & JWT', slug: 'auth-jwt', mins: 85 },
    { title: 'Database Design', slug: 'database-design', mins: 80 },
    { title: 'PostgreSQL & Prisma', slug: 'postgres-prisma', mins: 90 },
    { title: 'MongoDB & Mongoose', slug: 'mongodb-mongoose', mins: 85 },
    { title: 'GraphQL APIs', slug: 'graphql-apis', mins: 95 },
    { title: 'WebSockets & Real-time', slug: 'websockets', mins: 80 },
    { title: 'Testing Backend APIs', slug: 'testing-backend', mins: 75 },
    { title: 'Deployment & DevOps', slug: 'deployment-devops', mins: 85 },
  ];

  for (let i = 0; i < nodeLessons.length; i++) {
    const lesson = nodeLessons[i];
    if (!lesson) continue;
    await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: nodeModule.id,
          slug: lesson.slug,
        },
      },
      update: {},
      create: {
        moduleId: nodeModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nComprehensive guide to ${lesson.title} with production-ready examples.`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: i < 2,
      },
    });
  }

  console.log(`  ✅ Node.js Backend: ${nodeLessons.length} lessons`);

  // Database & DevOps Topic
  const databaseTopic = await prisma.topic.upsert({
    where: { slug: 'databases-devops' },
    update: {},
    create: {
      title: 'Databases & DevOps',
      slug: 'databases-devops',
      description: 'Master databases, cloud platforms, and DevOps practices for modern development',
      shortDescription: 'Infrastructure & Deployment',
      difficulty: 'ADVANCED',
      estimatedHours: 60,
      isPublished: true,
      isFree: false,
      orderIndex: 5,
    },
  });

  console.log('✅ Databases & DevOps Topic');

  const databaseModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: databaseTopic.id,
        slug: 'databases-complete',
      },
    },
    update: {},
    create: {
      topicId: databaseTopic.id,
      title: 'Databases Complete',
      slug: 'databases-complete',
      description: 'SQL, NoSQL, database design, optimization, and scaling',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const dbLessons = [
    { title: 'SQL Fundamentals', slug: 'sql-fundamentals', mins: 80 },
    { title: 'PostgreSQL Deep Dive', slug: 'postgresql-deep', mins: 90 },
    { title: 'MySQL Mastery', slug: 'mysql-mastery', mins: 85 },
    { title: 'MongoDB Essentials', slug: 'mongodb-essentials', mins: 80 },
    { title: 'Redis Caching', slug: 'redis-caching', mins: 70 },
    { title: 'Database Design Patterns', slug: 'db-design-patterns', mins: 85 },
    { title: 'Query Optimization', slug: 'query-optimization', mins: 75 },
    { title: 'Database Indexing', slug: 'db-indexing', mins: 70 },
    { title: 'Transactions & ACID', slug: 'transactions-acid', mins: 75 },
    { title: 'Database Scaling', slug: 'db-scaling', mins: 85 },
  ];

  for (let i = 0; i < dbLessons.length; i++) {
    const lesson = dbLessons[i];
    if (!lesson) continue;
    await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: databaseModule.id,
          slug: lesson.slug,
        },
      },
      update: {},
      create: {
        moduleId: databaseModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: `# ${lesson.title}\n\nMaster ${lesson.title} with hands-on examples and best practices.`,
        estimatedMinutes: lesson.mins,
        orderIndex: i + 1,
        isPublished: true,
        isFree: i < 2,
      },
    });
  }

  console.log(`  ✅ Databases: ${dbLessons.length} lessons\n`);

  const totalCount = await prisma.lesson.count();

  console.log('================================================');
  console.log('🎉 Lesson expansion complete!');
  console.log('================================================');
  console.log(`📝 Total Lessons in Database: ${totalCount}`);
  console.log('📚 New Advanced Topics Added');
  console.log('  • React Advanced (10 lessons)');
  console.log('  • Node.js Backend (10 lessons)');
  console.log('  • Databases Complete (10 lessons)');
  console.log('================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
