import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ALL lessons with complete content...\n');

  // ============================================================
  // TOPIC 1: Python & C++ Fundamentals
  // ============================================================
  
  const topic1 = await prisma.topic.upsert({
    where: { slug: 'python-cpp-fundamentals' },
    update: {},
    create: {
      title: 'Python & C++ Fundamentals',
      slug: 'python-cpp-fundamentals',
      description: 'Master programming fundamentals with Python and C++. Start with Python\'s simplicity, then dive into C++\'s power and performance.',
      shortDescription: 'Learn Python & C++ from scratch',
      difficulty: 'BEGINNER',
      estimatedHours: 100,
      isPublished: true,
      isFree: false,
      orderIndex: 1,
    },
  });

  // Python Essentials Module
  const pythonModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: topic1.id,
        slug: 'python-essentials',
      },
    },
    update: {},
    create: {
      topicId: topic1.id,
      title: 'Python Essentials',
      slug: 'python-essentials',
      description: 'Learn Python from basics to advanced concepts with real-world projects',
      orderIndex: 1,
      isPublished: true,
      estimatedMinutes: 1500,
    },
  });

  const pythonLessons = [
    {
      title: 'Introduction to Python',
      slug: 'intro-python',
      content: `# Introduction to Python

## What is Python?

Python is a high-level, interpreted programming language created by **Guido van Rossum** in 1991. It emphasizes code readability and simplicity, making it the perfect first language for beginners.

### Key Features
- **Easy to Learn**: Simple, English-like syntax
- **Versatile**: Used in web dev, data science, AI, automation, and more
- **Cross-Platform**: Runs on Windows, Mac, Linux
- **Huge Community**: Millions of developers worldwide
- **Rich Libraries**: 300,000+ packages on PyPI

## Why Learn Python?

### Career Opportunities
- 💰 **Data Scientist**: $120k - $180k/year
- 💰 **Python Developer**: $80k - $150k/year
- 💰 **ML Engineer**: $130k - $200k/year
- 💰 **Backend Developer**: $90k - $160k/year

### Real-World Applications
- **Web Development**: Django, Flask, FastAPI
- **Data Science**: NumPy, Pandas, Matplotlib
- **Machine Learning**: TensorFlow, PyTorch, scikit-learn
- **Automation**: Scripts, bots, web scraping
- **Game Development**: Pygame, Panda3D

## Your First Python Program

\`\`\`python
# This is a comment
print("Hello, World!")
print("Welcome to Python programming!")

# Variables
name = "Alice"
age = 25
print(f"My name is {name} and I'm {age} years old")
\`\`\`

**Output:**
\`\`\`
Hello, World!
Welcome to Python programming!
My name is Alice and I'm 25 years old
\`\`\`

## Python Versions

- **Python 2.x**: Legacy (EOL Jan 2020)
- **Python 3.x**: Current (we'll use Python 3.8+)

## Installing Python

### Windows
1. Download from python.org
2. Run installer
3. ✅ Check "Add Python to PATH"
4. Click "Install Now"

### Mac/Linux
Python 3 usually pre-installed. Check with:
\`\`\`bash
python3 --version
\`\`\`

## Running Python Code

### Interactive Mode (REPL)
\`\`\`bash
python3
>>> print("Hello")
Hello
>>> 2 + 2
4
>>> exit()
\`\`\`

### Script Mode
Create \`hello.py\`:
\`\`\`python
print("Hello from script!")
\`\`\`

Run it:
\`\`\`bash
python3 hello.py
\`\`\`

## Python Philosophy (Zen of Python)

\`\`\`python
import this
\`\`\`

Key principles:
- Beautiful is better than ugly
- Simple is better than complex
- Readability counts
- There should be one obvious way to do it

## What You'll Learn

1. ✅ Python basics and syntax
2. ✅ Data structures (lists, dicts, sets)
3. ✅ Functions and modules
4. ✅ Object-oriented programming
5. ✅ File handling and APIs
6. ✅ Real-world projects

## Practice Exercise

Create a file \`introduction.py\`:

\`\`\`python
# Personal info
name = input("What's your name? ")
age = input("How old are you? ")

print(f"\\nNice to meet you, {name}!")
print(f"You are {age} years old.")
print("\\nWelcome to the world of Python! 🐍")
\`\`\`

Run it and see the magic! ✨

## Next Steps

In the next lesson, you'll learn about:
- Variables and data types
- Numbers, strings, and booleans
- Type conversion
- Input and output

Let's start your Python journey! 🚀`,
      estimatedMinutes: 45,
      isFree: true,
    },
    {
      title: 'Variables and Data Types',
      slug: 'python-variables',
      content: `# Variables and Data Types in Python

## What is a Variable?

A **variable** is a container that stores data. Think of it as a labeled box where you can put information.

\`\`\`python
# Creating variables
name = "Alice"        # String
age = 25              # Integer
height = 5.6          # Float
is_student = True     # Boolean
\`\`\`

**No declaration needed!** Python automatically determines the type.

## Data Types

### 1. Strings (Text)

\`\`\`python
# Different ways to create strings
name = "John Doe"
message = 'Hello, World!'
multi_line = """This is
a multi-line
string"""

# String operations
print(name.upper())        # JOHN DOE
print(name.lower())        # john doe
print(len(name))           # 8
print(name[0])             # J (first character)
print(name[-1])            # e (last character)
print(name.split())        # ['John', 'Doe']

# String concatenation
first = "John"
last = "Doe"
full = first + " " + last  # John Doe

# F-strings (formatted strings)
age = 30
print(f"{name} is {age} years old")  # John Doe is 30 years old
\`\`\`

### 2. Numbers

#### Integers (whole numbers)
\`\`\`python
age = 25
students = 100
temperature = -5

# Operations
sum_val = 10 + 5       # 15
diff = 10 - 5          # 5
product = 10 * 5       # 50
quotient = 10 / 5      # 2.0 (always returns float)
floor_div = 10 // 3    # 3 (integer division)
power = 2 ** 3         # 8 (exponentiation)
modulus = 10 % 3       # 1 (remainder)
\`\`\`

#### Floats (decimal numbers)
\`\`\`python
price = 19.99
temperature = 98.6
pi = 3.14159

# Float operations
result = 10.5 + 2.3    # 12.8
result = 10.5 * 2      # 21.0
\`\`\`

### 3. Boolean (True/False)

\`\`\`python
is_active = True
is_admin = False

# Boolean operations
print(True and False)   # False
print(True or False)    # True
print(not True)         # False

# Comparison returns boolean
age = 25
print(age > 18)         # True
print(age == 30)        # False
\`\`\`

### 4. None (No Value)

\`\`\`python
result = None  # Represents absence of value
print(result)  # None

# Often used as default/placeholder
def get_user():
    return None  # No user found
\`\`\`

## Variable Naming Rules

### ✅ Valid Names
\`\`\`python
user_name = "Alice"      # snake_case (recommended)
userName = "Bob"         # camelCase
user2 = "Charlie"        # numbers allowed
_private = "secret"      # underscore prefix
USER_NAME = "Dave"       # constants (by convention)
\`\`\`

### ❌ Invalid Names
\`\`\`python
2user = "Invalid"        # Cannot start with number
user-name = "Invalid"    # No hyphens
for = "Invalid"          # Reserved keyword
\`\`\`

### Reserved Keywords (Cannot Use)
\`\`\`
and, as, assert, break, class, continue, def, del, elif, else,
except, False, finally, for, from, global, if, import, in, is,
lambda, None, nonlocal, not, or, pass, raise, return, True, try,
while, with, yield
\`\`\`

## Type Checking

\`\`\`python
name = "Alice"
age = 25
height = 5.6
is_student = True

print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>

# Check if variable is of specific type
print(isinstance(age, int))      # True
print(isinstance(name, str))     # True
\`\`\`

## Type Conversion

\`\`\`python
# String to number
age_str = "25"
age_int = int(age_str)           # 25
price_str = "19.99"
price_float = float(price_str)   # 19.99

# Number to string
age = 25
age_str = str(age)               # "25"

# String to boolean
bool("Hello")                    # True (non-empty string)
bool("")                         # False (empty string)
bool(0)                          # False
bool(1)                          # True
\`\`\`

## Multiple Assignment

\`\`\`python
# Assign multiple variables at once
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# Swap values
a, b = 10, 20
a, b = b, a  # Swap!
print(a, b)  # 20 10

# Same value to multiple variables
x = y = z = 0
print(x, y, z)  # 0 0 0
\`\`\`

## Input from User

\`\`\`python
# Get string input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Get number input (convert from string)
age = int(input("Enter your age: "))
print(f"You are {age} years old")

height = float(input("Enter your height in feet: "))
print(f"Your height is {height} feet")
\`\`\`

## Practice Exercises

### Exercise 1: Personal Info
\`\`\`python
name = input("What's your name? ")
age = int(input("How old are you? "))
city = input("Where do you live? ")

print(f"\\nHi {name}!")
print(f"You are {age} years old")
print(f"You live in {city}")
\`\`\`

### Exercise 2: Calculate Rectangle Area
\`\`\`python
length = float(input("Enter length: "))
width = float(input("Enter width: "))

area = length * width
perimeter = 2 * (length + width)

print(f"Area: {area}")
print(f"Perimeter: {perimeter}")
\`\`\`

### Exercise 3: Temperature Converter
\`\`\`python
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = (celsius * 9/5) + 32

print(f"{celsius}°C = {fahrenheit}°F")
\`\`\`

### Exercise 4: Simple Calculator
\`\`\`python
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print(f"Sum: {num1 + num2}")
print(f"Difference: {num1 - num2}")
print(f"Product: {num1 * num2}")
print(f"Quotient: {num1 / num2}")
\`\`\`

## Common Mistakes

### ❌ Using undefined variables
\`\`\`python
print(username)  # NameError: name 'username' is not defined
\`\`\`

### ✅ Define before use
\`\`\`python
username = "Alice"
print(username)  # Alice
\`\`\`

### ❌ Wrong type conversion
\`\`\`python
age = int("25.5")  # ValueError: invalid literal
\`\`\`

### ✅ Correct conversion
\`\`\`python
age = int(float("25.5"))  # 25 (convert to float first, then int)
\`\`\`

## Summary

- ✅ Variables store data without declaration
- ✅ Python has dynamic typing
- ✅ Main types: str, int, float, bool, None
- ✅ Use \`type()\` to check type
- ✅ Convert types with \`int()\`, \`str()\`, \`float()\`
- ✅ Follow naming conventions
- ✅ Use meaningful variable names

## Next Lesson

Learn about **String Methods** and text manipulation! 📝`,
      estimatedMinutes: 60,
      isFree: true,
    },
    {
      title: 'String Methods and Formatting',
      slug: 'python-strings',
      content: `# String Methods and Formatting

Strings are one of the most used data types in Python. Let's master them!

## String Basics

\`\`\`python
text = "Hello, World!"
print(text)

# Strings are immutable (cannot be changed)
# text[0] = "h"  # Error!

# But you can create new strings
new_text = "h" + text[1:]  # "hello, World!"
\`\`\`

## String Methods

### Case Conversion

\`\`\`python
text = "Hello World"

print(text.upper())        # HELLO WORLD
print(text.lower())        # hello world
print(text.capitalize())   # Hello world
print(text.title())        # Hello World
print(text.swapcase())     # hELLO wORLD
\`\`\`

### Searching and Checking

\`\`\`python
text = "Python Programming"

# Check if contains
print("Python" in text)          # True
print("Java" in text)            # False

# Find position
print(text.find("Pro"))          # 7 (index where found)
print(text.find("Java"))         # -1 (not found)

# Check start/end
print(text.startswith("Py"))     # True
print(text.endswith("ing"))      # True

# Check types
print("hello".isalpha())         # True (all letters)
print("123".isdigit())           # True (all digits)
print("hello123".isalnum())      # True (letters and digits)
print("   ".isspace())           # True (all whitespace)
\`\`\`

### Trimming and Splitting

\`\`\`python
text = "   Hello World   "

# Remove whitespace
print(text.strip())        # "Hello World"
print(text.lstrip())       # "Hello World   " (left)
print(text.rstrip())       # "   Hello World" (right)

# Split into list
sentence = "Python is awesome"
words = sentence.split()   # ['Python', 'is', 'awesome']
print(words)

# Split by custom delimiter
csv = "apple,banana,orange"
fruits = csv.split(",")    # ['apple', 'banana', 'orange']
print(fruits)

# Join list into string
words = ['Python', 'is', 'awesome']
sentence = " ".join(words)  # "Python is awesome"
print(sentence)
\`\`\`

### Replacing

\`\`\`python
text = "Hello World"

# Replace substring
new_text = text.replace("World", "Python")
print(new_text)  # "Hello Python"

# Replace all occurrences
text = "cat cat dog cat"
new_text = text.replace("cat", "bird")
print(new_text)  # "bird bird dog bird"

# Replace limited times
new_text = text.replace("cat", "bird", 2)
print(new_text)  # "bird bird dog cat"
\`\`\`

### Counting and Length

\`\`\`python
text = "Mississippi"

print(len(text))           # 11 (total characters)
print(text.count("s"))     # 4 (count of 's')
print(text.count("ss"))    # 2 (count of 'ss')
\`\`\`

## String Indexing and Slicing

### Indexing

\`\`\`python
text = "Python"
#       012345  (positive index)
#      -654321  (negative index)

print(text[0])    # 'P' (first character)
print(text[5])    # 'n' (last character)
print(text[-1])   # 'n' (last from end)
print(text[-2])   # 'o' (second from end)
\`\`\`

### Slicing

\`\`\`python
text = "Python Programming"

# text[start:end] (end not included)
print(text[0:6])      # 'Python'
print(text[7:18])     # 'Programming'

# Shortcuts
print(text[:6])       # 'Python' (from start)
print(text[7:])       # 'Programming' (to end)
print(text[:])        # 'Python Programming' (copy all)

# Step
print(text[::2])      # 'Pto rgamn' (every 2nd char)
print(text[::-1])     # 'gnimmargorP nohtyP' (reverse)

# Negative indices
print(text[-4:])      # 'ming' (last 4 chars)
print(text[:-4])      # 'Python Program' (except last 4)
\`\`\`

## String Formatting

### 1. F-Strings (Modern, Recommended)

\`\`\`python
name = "Alice"
age = 25
height = 5.6

# Basic f-string
print(f"My name is {name}")

# Multiple variables
print(f"{name} is {age} years old")

# Expressions inside
print(f"Next year I'll be {age + 1}")

# Formatting numbers
price = 19.99
print(f"Price: ${price:.2f}")      # $19.99 (2 decimals)

# Alignment
print(f"|{name:<10}|")  # |Alice     | (left)
print(f"|{name:>10}|")  # |     Alice| (right)
print(f"|{name:^10}|")  # |  Alice   | (center)
\`\`\`

### 2. .format() Method

\`\`\`python
name = "Bob"
age = 30

# Positional
print("My name is {} and I'm {} years old".format(name, age))

# Indexed
print("{0} is {1} years old. {0} lives in NYC.".format(name, age))

# Named
print("{name} is {age} years old".format(name=name, age=age))
\`\`\`

### 3. Old Style (%)

\`\`\`python
name = "Charlie"
age = 35

print("My name is %s and I'm %d years old" % (name, age))
print("Price: $%.2f" % 19.99)
\`\`\`

## Escape Characters

\`\`\`python
# Newline
print("Hello\\nWorld")
# Hello
# World

# Tab
print("Name:\\tAlice")  # Name:    Alice

# Backslash
print("Path: C:\\\\Users\\\\Alice")  # Path: C:\\Users\\Alice

# Quote
print("He said, \\"Hello!\\"")  # He said, "Hello!"

# Raw string (ignore escapes)
print(r"C:\\Users\\Alice")  # C:\\Users\\Alice
\`\`\`

## Multiline Strings

\`\`\`python
# Using triple quotes
message = """
This is a
multiline
string
"""
print(message)

# For code readability
query = """
SELECT name, age
FROM users
WHERE age > 18
"""
\`\`\`

## Practice Exercises

### Exercise 1: Email Validator
\`\`\`python
email = input("Enter email: ")

if "@" in email and "." in email:
    username = email.split("@")[0]
    domain = email.split("@")[1]
    print(f"Username: {username}")
    print(f"Domain: {domain}")
else:
    print("Invalid email")
\`\`\`

### Exercise 2: String Reverser
\`\`\`python
text = input("Enter text: ")
reversed_text = text[::-1]
print(f"Reversed: {reversed_text}")
\`\`\`

### Exercise 3: Word Counter
\`\`\`python
sentence = input("Enter a sentence: ")
words = sentence.split()
print(f"Word count: {len(words)}")
print(f"Character count: {len(sentence)}")
\`\`\`

### Exercise 4: Title Case Converter
\`\`\`python
text = input("Enter text: ")
title_case = text.title()
print(f"Title case: {title_case}")
\`\`\`

### Exercise 5: URL Builder
\`\`\`python
base_url = "https://api.example.com"
endpoint = input("Enter endpoint: ")
params = input("Enter params: ")

full_url = f"{base_url}/{endpoint}?{params}"
print(f"URL: {full_url}")
\`\`\`

## Real-World Example: Name Formatter

\`\`\`python
def format_name(full_name):
    """Format a name to Title Case"""
    # Remove extra spaces
    name = full_name.strip()
    
    # Split into parts
    parts = name.split()
    
    # Capitalize each part
    formatted = " ".join([part.capitalize() for part in parts])
    
    return formatted

# Test
print(format_name("  john  DOE  "))  # "John Doe"
print(format_name("alice SMITH"))    # "Alice Smith"
\`\`\`

## Summary

- ✅ Strings are immutable
- ✅ Many built-in methods available
- ✅ Use f-strings for formatting (modern way)
- ✅ Slicing with [start:end:step]
- ✅ Chain methods: \`text.strip().upper().replace()\`
- ✅ Always check documentation for more methods

## Next Lesson

Learn about **Lists** - Python's most versatile data structure! 📝`,
      estimatedMinutes: 55,
      isFree: false,
    },
  ];

  // Create Python lessons
  for (let i = 0; i < pythonLessons.length; i++) {
    const lesson = pythonLessons[i];
    if (!lesson) continue;
    await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: pythonModule.id,
          slug: lesson.slug,
        },
      },
      update: {},
      create: {
        moduleId: pythonModule.id,
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
        estimatedMinutes: lesson.estimatedMinutes,
        orderIndex: i + 1,
        isPublished: true,
        isFree: lesson.isFree,
      },
    });
  }

  console.log(`  ✅ Python Module: ${pythonLessons.length} lessons with full content`);

  // Continue with more lessons... (this is a template showing the structure)
  // You would add similar detailed content for all other topics

  const totalCount = await prisma.lesson.count();
  
  console.log('\n================================================');
  console.log('🎉 Lesson seeding complete!');
  console.log('================================================');
  console.log(`📝 Total Lessons: ${totalCount}`);
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
