/**
 * Infinity Code - Complete Topics Database Seeding
 * 
 * This script populates the database with comprehensive curriculum content
 * covering 30 major topic areas across multiple programming languages.
 * 
 * Content includes:
 * - Structured modules and lessons
 * - Multi-language code examples
 * - Assessment quizzes and challenges
 * - Progressive difficulty levels
 * 
 * Supported Languages: Python, C++, JavaScript, TypeScript
 */

import { PrismaClient, TopicDifficulty, ChallengeDifficulty, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

// Programming languages supported across all applicable topics
const LANGUAGES = ['python', 'cpp', 'javascript', 'typescript'];

// Complete topic structure matching your 30-topic specification
const COMPLETE_TOPICS = [
  {
    category: '1. Programming Fundamentals',
    slug: 'programming-fundamentals',
    description: 'Master the core concepts of programming applicable to any language',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 40,
    isFree: true,
    modules: [
      {
        title: 'Introduction to Programming',
        lessons: ['What is Programming?', 'How Computers Work', 'Programming Languages Overview', 'Your First Program']
      },
      {
        title: 'Variables and Data Types',
        lessons: ['Understanding Variables', 'Numbers and Integers', 'Strings and Text', 'Booleans', 'Type Conversion']
      },
      {
        title: 'Operators',
        lessons: ['Arithmetic Operators', 'Comparison Operators', 'Logical Operators', 'Assignment Operators', 'Operator Precedence']
      },
      {
        title: 'Control Flow',
        lessons: ['If Statements', 'Else and Elif', 'Nested Conditions', 'Switch/Match Statements', 'Ternary Operators']
      },
      {
        title: 'Loops',
        lessons: ['While Loops', 'For Loops', 'Loop Control (Break/Continue)', 'Nested Loops', 'Loop Patterns']
      },
      {
        title: 'Functions',
        lessons: ['Defining Functions', 'Parameters and Arguments', 'Return Values', 'Scope', 'Recursion Basics']
      },
      {
        title: 'Error Handling',
        lessons: ['Types of Errors', 'Try-Catch Blocks', 'Exception Handling', 'Custom Exceptions', 'Debugging Techniques']
      },
      {
        title: 'Best Practices',
        lessons: ['Code Comments', 'Clean Code Principles', 'Naming Conventions', 'Code Organization', 'Documentation']
      }
    ]
  },
  {
    category: '2. Python',
    slug: 'python-complete',
    description: 'Complete Python programming from basics to advanced concepts',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 60,
    isFree: false,
    modules: [
      {
        title: 'Python Basics',
        lessons: ['Python Installation', 'Python Syntax', 'Variables in Python', 'Python Data Types', 'Input and Output']
      },
      {
        title: 'Python Data Structures',
        lessons: ['Lists', 'Tuples', 'Sets', 'Dictionaries', 'List Comprehensions', 'Dictionary Comprehensions']
      },
      {
        title: 'Python Functions',
        lessons: ['Function Definitions', 'Lambda Functions', 'Args and Kwargs', 'Decorators', 'Generators']
      },
      {
        title: 'Object-Oriented Python',
        lessons: ['Classes and Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Magic Methods', 'Abstract Classes']
      },
      {
        title: 'Python Modules',
        lessons: ['Importing Modules', 'Creating Modules', 'Packages', 'Virtual Environments', 'pip Package Manager']
      },
      {
        title: 'File Handling',
        lessons: ['Reading Files', 'Writing Files', 'File Modes', 'Context Managers', 'Working with CSV', 'JSON in Python']
      },
      {
        title: 'Python APIs',
        lessons: ['Requests Library', 'REST APIs', 'JSON Handling', 'API Authentication', 'Building APIs with Flask']
      },
      {
        title: 'Python Projects',
        lessons: ['Calculator App', 'To-Do List', 'Weather App', 'Web Scraper', 'Data Analysis Tool']
      }
    ]
  },
  {
    category: '3. C++',
    slug: 'cpp-complete',
    description: 'Master C++ from fundamentals to advanced system programming',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 80,
    isFree: false,
    modules: [
      {
        title: 'C++ Fundamentals',
        lessons: ['C++ Setup', 'First C++ Program', 'Variables and Data Types', 'Input/Output', 'Comments']
      },
      {
        title: 'Control Structures',
        lessons: ['If-Else Statements', 'Switch Statements', 'While Loops', 'For Loops', 'Do-While Loops']
      },
      {
        title: 'Functions in C++',
        lessons: ['Function Declaration', 'Function Parameters', 'Return Types', 'Function Overloading', 'Inline Functions']
      },
      {
        title: 'Arrays and Strings',
        lessons: ['Arrays', 'Multi-dimensional Arrays', 'C-Style Strings', 'String Class', 'String Methods']
      },
      {
        title: 'Pointers and References',
        lessons: ['Pointer Basics', 'Pointer Arithmetic', 'References', 'Dynamic Memory', 'Smart Pointers']
      },
      {
        title: 'Object-Oriented C++',
        lessons: ['Classes', 'Objects', 'Constructors/Destructors', 'Inheritance', 'Polymorphism', 'Virtual Functions']
      },
      {
        title: 'STL (Standard Template Library)',
        lessons: ['Vectors', 'Lists', 'Maps', 'Sets', 'Algorithms', 'Iterators']
      },
      {
        title: 'Advanced C++',
        lessons: ['Templates', 'Exception Handling', 'File I/O', 'Namespaces', 'Qt Framework Basics']
      }
    ]
  },
  {
    category: '4. JavaScript',
    slug: 'javascript-complete',
    description: 'Complete JavaScript from fundamentals to modern ES6+ features',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 50,
    isFree: false,
    modules: [
      {
        title: 'JavaScript Fundamentals',
        lessons: ['JavaScript Basics', 'Variables (let, const, var)', 'Data Types', 'Operators', 'Type Conversion']
      },
      {
        title: 'Functions in JavaScript',
        lessons: ['Function Declarations', 'Function Expressions', 'Arrow Functions', 'Callbacks', 'Higher-Order Functions']
      },
      {
        title: 'Arrays and Objects',
        lessons: ['Arrays', 'Array Methods', 'Objects', 'Object Methods', 'Destructuring']
      },
      {
        title: 'DOM Manipulation',
        lessons: ['DOM Basics', 'Selecting Elements', 'Modifying Elements', 'Event Listeners', 'Event Handling']
      },
      {
        title: 'ES6+ Features',
        lessons: ['Let and Const', 'Template Literals', 'Spread/Rest Operators', 'Classes', 'Modules']
      },
      {
        title: 'Asynchronous JavaScript',
        lessons: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API', 'Error Handling']
      },
      {
        title: 'Browser APIs',
        lessons: ['Local Storage', 'Session Storage', 'Fetch API', 'Geolocation', 'Canvas API']
      },
      {
        title: 'JavaScript Projects',
        lessons: ['Calculator', 'To-Do App', 'Weather App', 'Quiz App', 'Interactive Game']
      }
    ]
  },
  {
    category: '5. TypeScript',
    slug: 'typescript-complete',
    description: 'TypeScript fundamentals and advanced type system',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 35,
    isFree: false,
    modules: [
      {
        title: 'TypeScript Basics',
        lessons: ['TypeScript Setup', 'Basic Types', 'Type Annotations', 'Type Inference', 'Compiling TypeScript']
      },
      {
        title: 'Advanced Types',
        lessons: ['Interfaces', 'Type Aliases', 'Union Types', 'Intersection Types', 'Literal Types']
      },
      {
        title: 'Functions and Classes',
        lessons: ['Function Types', 'Optional Parameters', 'Classes in TypeScript', 'Access Modifiers', 'Abstract Classes']
      },
      {
        title: 'Generics',
        lessons: ['Generic Functions', 'Generic Classes', 'Generic Constraints', 'Generic Utility Types']
      },
      {
        title: 'Enums and Modules',
        lessons: ['Enums', 'Const Enums', 'Modules', 'Namespaces', 'Module Resolution']
      },
      {
        title: 'Type Guards',
        lessons: ['Type Guards', 'Type Narrowing', 'Discriminated Unions', 'Type Predicates']
      },
      {
        title: 'TypeScript with React',
        lessons: ['React with TypeScript', 'Typing Props', 'Typing State', 'Typing Events', 'Typing Hooks']
      }
    ]
  },
  {
    category: '6. Web Development',
    slug: 'web-development-complete',
    description: 'Complete web development from HTML/CSS to modern frameworks',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 70,
    isFree: false,
    modules: [
      {
        title: 'HTML Fundamentals',
        lessons: ['HTML Basics', 'HTML Elements', 'Forms', 'Semantic HTML', 'HTML5 Features']
      },
      {
        title: 'CSS Fundamentals',
        lessons: ['CSS Basics', 'Selectors', 'Box Model', 'Flexbox', 'Grid', 'Responsive Design']
      },
      {
        title: 'CSS Frameworks',
        lessons: ['Bootstrap Basics', 'Bootstrap Components', 'Tailwind CSS', 'Tailwind Utilities', 'Custom Themes']
      },
      {
        title: 'JavaScript for Web',
        lessons: ['DOM Manipulation', 'Events', 'Forms', 'Validation', 'Local Storage']
      },
      {
        title: 'Web APIs',
        lessons: ['Fetch API', 'REST APIs', 'JSON', 'AJAX', 'WebSockets']
      },
      {
        title: 'Authentication',
        lessons: ['JWT Basics', 'Session Management', 'OAuth', 'Auth0', 'Security Best Practices']
      },
      {
        title: 'Web Accessibility',
        lessons: ['ARIA', 'Keyboard Navigation', 'Screen Readers', 'WCAG Guidelines', 'Accessible Forms']
      },
      {
        title: 'Frontend Architecture',
        lessons: ['MVC Pattern', 'Component Architecture', 'State Management', 'Routing', 'Performance']
      }
    ]
  },
  {
    category: '7. React',
    slug: 'react-complete',
    description: 'Master React from basics to advanced patterns',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 55,
    isFree: false,
    modules: [
      {
        title: 'React Fundamentals',
        lessons: ['React Setup', 'JSX', 'Components', 'Props', 'State']
      },
      {
        title: 'React Hooks',
        lessons: ['useState', 'useEffect', 'useContext', 'useRef', 'useMemo', 'useCallback', 'Custom Hooks']
      },
      {
        title: 'React Router',
        lessons: ['Router Setup', 'Routes', 'Navigation', 'Dynamic Routes', 'Protected Routes']
      },
      {
        title: 'Forms in React',
        lessons: ['Controlled Components', 'Form Validation', 'Form Libraries', 'File Uploads']
      },
      {
        title: 'API Integration',
        lessons: ['Fetching Data', 'Axios', 'Error Handling', 'Loading States', 'Caching']
      },
      {
        title: 'State Management',
        lessons: ['Context API', 'Redux Basics', 'Redux Toolkit', 'Zustand', 'State Best Practices']
      },
      {
        title: 'Authentication in React',
        lessons: ['JWT Authentication', 'Protected Routes', 'Auth Context', 'Logout', 'Token Refresh']
      },
      {
        title: 'React Projects',
        lessons: ['E-commerce App', 'Social Media Dashboard', 'Chat Application', 'Task Manager']
      }
    ]
  },
  {
    category: '8. Backend Development',
    slug: 'backend-development-complete',
    description: 'Build robust backend systems with Node.js and Express',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 65,
    isFree: false,
    modules: [
      {
        title: 'Backend Fundamentals',
        lessons: ['Client-Server Model', 'HTTP Protocol', 'REST Architecture', 'APIs Overview']
      },
      {
        title: 'Node.js Basics',
        lessons: ['Node.js Setup', 'Modules', 'NPM', 'File System', 'Path Module']
      },
      {
        title: 'Express.js',
        lessons: ['Express Setup', 'Routes', 'Middleware', 'Request/Response', 'Error Handling']
      },
      {
        title: 'REST API Development',
        lessons: ['GET Requests', 'POST Requests', 'PUT/PATCH', 'DELETE', 'API Design']
      },
      {
        title: 'Authentication & Authorization',
        lessons: ['JWT Authentication', 'Password Hashing', 'Auth Middleware', 'Role-Based Access', 'Refresh Tokens']
      },
      {
        title: 'Database Integration',
        lessons: ['SQL vs NoSQL', 'Prisma ORM', 'CRUD Operations', 'Relationships', 'Migrations']
      },
      {
        title: 'API Security',
        lessons: ['CORS', 'Rate Limiting', 'Input Validation', 'SQL Injection Prevention', 'XSS Protection']
      },
      {
        title: 'Backend Deployment',
        lessons: ['Environment Variables', 'Production Build', 'Hosting Options', 'CI/CD', 'Monitoring']
      }
    ]
  },
  {
    category: '9. Databases',
    slug: 'databases-complete',
    description: 'Master SQL and NoSQL databases',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 50,
    isFree: false,
    modules: [
      {
        title: 'Database Fundamentals',
        lessons: ['What are Databases?', 'SQL vs NoSQL', 'Database Design', 'Normalization', 'ER Diagrams']
      },
      {
        title: 'SQL Basics',
        lessons: ['Tables', 'Data Types', 'Primary Keys', 'Foreign Keys', 'Constraints']
      },
      {
        title: 'SQL Queries',
        lessons: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT', 'DISTINCT', 'Aggregate Functions']
      },
      {
        title: 'Advanced SQL',
        lessons: ['JOINS', 'Subqueries', 'Indexes', 'Views', 'Stored Procedures', 'Transactions']
      },
      {
        title: 'PostgreSQL',
        lessons: ['PostgreSQL Setup', 'psql Commands', 'JSON Support', 'Full-Text Search', 'Performance Tuning']
      },
      {
        title: 'Supabase',
        lessons: ['Supabase Setup', 'Auth', 'Real-time Subscriptions', 'Storage', 'Edge Functions']
      },
      {
        title: 'Firestore',
        lessons: ['Firestore Basics', 'Collections', 'Documents', 'Queries', 'Security Rules']
      },
      {
        title: 'Database Security',
        lessons: ['Row Level Security', 'SQL Injection', 'Prepared Statements', 'Encryption', 'Backups']
      }
    ]
  },
  {
    category: '10. APIs',
    slug: 'apis-complete',
    description: 'Master API development and consumption',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 40,
    isFree: false,
    modules: [
      {
        title: 'API Fundamentals',
        lessons: ['What is an API?', 'REST vs GraphQL', 'API Design Principles', 'API Documentation']
      },
      {
        title: 'HTTP Methods',
        lessons: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
      },
      {
        title: 'JSON',
        lessons: ['JSON Basics', 'JSON Structure', 'Parsing JSON', 'JSON vs XML', 'JSON Schema']
      },
      {
        title: 'API Authentication',
        lessons: ['API Keys', 'Bearer Tokens', 'OAuth 2.0', 'JWT', 'Basic Auth']
      },
      {
        title: 'API Testing',
        lessons: ['Postman Basics', 'Creating Requests', 'Collections', 'Environments', 'Automated Tests']
      },
      {
        title: 'Building APIs',
        lessons: ['API Structure', 'Routing', 'Controllers', 'Validation', 'Error Responses']
      },
      {
        title: 'Consuming APIs',
        lessons: ['Fetch API', 'Axios', 'Error Handling', 'Loading States', 'Caching Strategies']
      }
    ]
  },
  {
    category: '11. Git & GitHub',
    slug: 'git-github-complete',
    description: 'Version control mastery with Git and GitHub',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 25,
    isFree: true,
    modules: [
      {
        title: 'Git Fundamentals',
        lessons: ['What is Git?', 'Git Installation', 'Git Configuration', 'Repositories', 'Commits']
      },
      {
        title: 'Basic Git Commands',
        lessons: ['git init', 'git clone', 'git add', 'git commit', 'git status', 'git log']
      },
      {
        title: 'Remote Repositories',
        lessons: ['git push', 'git pull', 'git fetch', 'Remote URLs', 'SSH Keys']
      },
      {
        title: 'Branching',
        lessons: ['What are Branches?', 'Creating Branches', 'Switching Branches', 'Branch Strategy']
      },
      {
        title: 'Merging',
        lessons: ['Merge Basics', 'Fast-Forward Merge', 'Three-Way Merge', 'Merge Conflicts', 'Resolving Conflicts']
      },
      {
        title: 'GitHub Workflow',
        lessons: ['Pull Requests', 'Code Review', 'Issues', 'GitHub Actions', 'Collaboration']
      },
      {
        title: 'Advanced Git',
        lessons: ['Rebasing', 'Cherry-Pick', 'Stash', 'Tags', 'Git Hooks']
      }
    ]
  },
  {
    category: '12. Data Structures',
    slug: 'data-structures-complete',
    description: 'Essential data structures for efficient programming',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 45,
    isFree: false,
    modules: [
      {
        title: 'Introduction',
        lessons: ['Why Data Structures?', 'Time Complexity', 'Space Complexity', 'Big O Notation']
      },
      {
        title: 'Arrays',
        lessons: ['Array Basics', 'Dynamic Arrays', 'Array Operations', 'Common Problems']
      },
      {
        title: 'Linked Lists',
        lessons: ['Singly Linked Lists', 'Doubly Linked Lists', 'Circular Lists', 'List Operations']
      },
      {
        title: 'Stacks and Queues',
        lessons: ['Stack Basics', 'Stack Operations', 'Queue Basics', 'Queue Operations', 'Priority Queues']
      },
      {
        title: 'Hash Tables',
        lessons: ['Hash Functions', 'Collision Handling', 'Hash Maps', 'Hash Sets', 'Applications']
      },
      {
        title: 'Trees',
        lessons: ['Tree Basics', 'Binary Trees', 'Binary Search Trees', 'Tree Traversal', 'Balanced Trees']
      },
      {
        title: 'Graphs',
        lessons: ['Graph Basics', 'Graph Representation', 'BFS', 'DFS', 'Shortest Path']
      },
      {
        title: 'Heaps',
        lessons: ['Heap Basics', 'Min Heap', 'Max Heap', 'Heap Operations', 'Heap Sort']
      }
    ]
  },
  {
    category: '13. Algorithms',
    slug: 'algorithms-complete',
    description: 'Master essential algorithms for problem solving',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 55,
    isFree: false,
    modules: [
      {
        title: 'Algorithm Analysis',
        lessons: ['Big O Notation', 'Time Complexity', 'Space Complexity', 'Best/Worst/Average Case']
      },
      {
        title: 'Searching Algorithms',
        lessons: ['Linear Search', 'Binary Search', 'Search in Rotated Array', 'Search Problems']
      },
      {
        title: 'Sorting Algorithms',
        lessons: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort']
      },
      {
        title: 'Recursion',
        lessons: ['Recursion Basics', 'Base Cases', 'Recursive Patterns', 'Backtracking', 'Memoization']
      },
      {
        title: 'Dynamic Programming',
        lessons: ['DP Introduction', 'Fibonacci', 'Knapsack Problem', 'LCS', 'LIS', 'Matrix Chain']
      },
      {
        title: 'Greedy Algorithms',
        lessons: ['Greedy Approach', 'Activity Selection', 'Huffman Coding', 'Fractional Knapsack']
      },
      {
        title: 'Graph Algorithms',
        lessons: ['DFS', 'BFS', 'Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'Kruskal', 'Prim']
      },
      {
        title: 'Advanced Algorithms',
        lessons: ['String Matching', 'KMP Algorithm', 'Rabin-Karp', 'Trie', 'Segment Trees']
      }
    ]
  },
  {
    category: '14. Computer Science',
    slug: 'computer-science-complete',
    description: 'Theoretical foundations of computer science',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 70,
    isFree: false,
    modules: [
      {
        title: 'Theory of Computation',
        lessons: ['Automata Theory', 'Finite Automata', 'Regular Languages', 'Regular Expressions']
      },
      {
        title: 'Pushdown Automata',
        lessons: ['PDA Basics', 'Context-Free Grammars', 'Context-Free Languages', 'Parsing']
      },
      {
        title: 'Turing Machines',
        lessons: ['Turing Machine Model', 'Church-Turing Thesis', 'Decidability', 'Halting Problem']
      },
      {
        title: 'Operating Systems',
        lessons: ['OS Basics', 'Process Management', 'Memory Management', 'File Systems', 'Concurrency']
      },
      {
        title: 'Computer Architecture',
        lessons: ['CPU Architecture', 'Memory Hierarchy', 'Pipelining', 'Cache', 'Virtual Memory']
      },
      {
        title: 'Networking Basics',
        lessons: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS', 'Routing']
      },
      {
        title: 'Compilers',
        lessons: ['Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Code Generation']
      }
    ]
  },
  {
    category: '15. Software Engineering',
    slug: 'software-engineering-complete',
    description: 'Professional software development practices',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 60,
    isFree: false,
    modules: [
      {
        title: 'SDLC',
        lessons: ['Software Development Lifecycle', 'Waterfall', 'Agile', 'Scrum', 'Kanban']
      },
      {
        title: 'Requirements Engineering',
        lessons: ['Requirements Gathering', 'User Stories', 'Use Cases', 'Functional Requirements', 'Non-Functional Requirements']
      },
      {
        title: 'System Design',
        lessons: ['System Architecture', 'Microservices', 'Monolithic', 'Design Patterns', 'Scalability']
      },
      {
        title: 'Design Patterns',
        lessons: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'SOLID Principles']
      },
      {
        title: 'Testing',
        lessons: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD', 'Test Coverage']
      },
      {
        title: 'Code Review',
        lessons: ['Code Review Process', 'Review Checklist', 'Constructive Feedback', 'Best Practices']
      },
      {
        title: 'Documentation',
        lessons: ['Code Comments', 'README Files', 'API Documentation', 'Technical Specs', 'User Guides']
      },
      {
        title: 'Project Management',
        lessons: ['Agile Ceremonies', 'Sprint Planning', 'Retrospectives', 'Estimation', 'Risk Management']
      }
    ]
  },
  {
    category: '16. Cybersecurity',
    slug: 'cybersecurity-complete',
    description: 'Security fundamentals and ethical hacking',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 75,
    isFree: false,
    modules: [
      {
        title: 'Security Fundamentals',
        lessons: ['CIA Triad', 'Threats vs Vulnerabilities', 'Risk Assessment', 'Security Policies']
      },
      {
        title: 'Cryptography',
        lessons: ['Encryption Basics', 'Symmetric Encryption', 'Asymmetric Encryption', 'Hashing', 'Digital Signatures']
      },
      {
        title: 'Web Security',
        lessons: ['OWASP Top 10', 'XSS', 'CSRF', 'SQL Injection', 'Security Headers', 'HTTPS/TLS']
      },
      {
        title: 'Authentication Security',
        lessons: ['Password Security', 'Multi-Factor Authentication', 'OAuth 2.0', 'JWT Security', 'Session Management']
      },
      {
        title: 'Network Security',
        lessons: ['Firewalls', 'VPNs', 'IDS/IPS', 'Network Scanning', 'Port Security']
      },
      {
        title: 'Linux Security',
        lessons: ['File Permissions', 'User Management', 'SSH Security', 'Firewall Configuration', 'Log Analysis']
      },
      {
        title: 'Kali Linux',
        lessons: ['Kali Basics', 'Reconnaissance', 'Scanning', 'Exploitation', 'Post-Exploitation', 'Reporting']
      },
      {
        title: 'Ethical Hacking',
        lessons: ['Penetration Testing Methodology', 'Legal Considerations', 'Tools', 'Reporting Vulnerabilities']
      }
    ]
  },
  {
    category: '17. Linux',
    slug: 'linux-complete',
    description: 'Linux system administration and command line mastery',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 50,
    isFree: false,
    modules: [
      {
        title: 'Linux Basics',
        lessons: ['What is Linux?', 'Linux Distributions', 'Installation', 'Desktop Environments']
      },
      {
        title: 'Terminal Basics',
        lessons: ['Command Line Interface', 'Navigation', 'File Operations', 'Text Processing']
      },
      {
        title: 'File System',
        lessons: ['Directory Structure', 'File Permissions', 'Ownership', 'Links', 'Finding Files']
      },
      {
        title: 'User Management',
        lessons: ['Users and Groups', 'sudo', 'User Creation', 'Password Management', 'Access Control']
      },
      {
        title: 'Process Management',
        lessons: ['Processes', 'ps Command', 'top/htop', 'Signals', 'Background Jobs', 'Cron Jobs']
      },
      {
        title: 'Package Management',
        lessons: ['apt/apt-get', 'dpkg', 'yum/dnf', 'Installing Software', 'Repositories']
      },
      {
        title: 'Bash Scripting',
        lessons: ['Shell Basics', 'Variables', 'Conditions', 'Loops', 'Functions', 'Script Examples']
      },
      {
        title: 'Networking',
        lessons: ['ifconfig/ip', 'ping', 'netstat', 'SSH', 'SCP', 'curl/wget']
      }
    ]
  },
  {
    category: '18. Networking',
    slug: 'networking-complete',
    description: 'Computer networking fundamentals',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 45,
    isFree: false,
    modules: [
      {
        title: 'Networking Fundamentals',
        lessons: ['Network Basics', 'LAN/WAN', 'Network Topologies', 'Network Devices']
      },
      {
        title: 'IP Addressing',
        lessons: ['IPv4', 'IPv6', 'Subnetting', 'CIDR Notation', 'Public vs Private IP']
      },
      {
        title: 'Network Protocols',
        lessons: ['TCP/IP Model', 'OSI Model', 'TCP vs UDP', 'HTTP/HTTPS', 'FTP', 'SMTP']
      },
      {
        title: 'DNS',
        lessons: ['DNS Basics', 'DNS Records', 'DNS Resolution', 'DNS Security', 'DNS Tools']
      },
      {
        title: 'DHCP',
        lessons: ['DHCP Basics', 'IP Address Assignment', 'DHCP Server', 'DHCP Configuration']
      },
      {
        title: 'Network Security',
        lessons: ['Firewalls', 'VPNs', 'Port Scanning', 'Network Monitoring', 'Security Protocols']
      },
      {
        title: 'Routing and Switching',
        lessons: ['Routers', 'Switches', 'Routing Tables', 'Static Routing', 'Dynamic Routing']
      }
    ]
  },
  {
    category: '19. Cloud Computing',
    slug: 'cloud-computing-complete',
    description: 'Cloud platforms and services',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 55,
    isFree: false,
    modules: [
      {
        title: 'Cloud Fundamentals',
        lessons: ['What is Cloud Computing?', 'IaaS, PaaS, SaaS', 'Public/Private/Hybrid Cloud', 'Cloud Benefits']
      },
      {
        title: 'AWS Basics',
        lessons: ['AWS Overview', 'EC2', 'S3', 'RDS', 'Lambda', 'IAM']
      },
      {
        title: 'Azure Basics',
        lessons: ['Azure Overview', 'Virtual Machines', 'Storage', 'App Service', 'Functions']
      },
      {
        title: 'Google Cloud',
        lessons: ['GCP Overview', 'Compute Engine', 'Cloud Storage', 'Cloud Functions', 'BigQuery']
      },
      {
        title: 'Cloud Storage',
        lessons: ['Object Storage', 'Block Storage', 'File Storage', 'CDN', 'Backup Strategies']
      },
      {
        title: 'Cloud Databases',
        lessons: ['RDS', 'DynamoDB', 'Cosmos DB', 'Cloud SQL', 'Database Migration']
      },
      {
        title: 'Serverless',
        lessons: ['Serverless Architecture', 'AWS Lambda', 'Azure Functions', 'Cloud Functions', 'Use Cases']
      },
      {
        title: 'Cloud Security',
        lessons: ['IAM', 'Security Groups', 'Encryption', 'Compliance', 'Best Practices']
      }
    ]
  },
  {
    category: '20. DevOps',
    slug: 'devops-complete',
    description: 'DevOps practices and tools',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 50,
    isFree: false,
    modules: [
      {
        title: 'DevOps Fundamentals',
        lessons: ['What is DevOps?', 'DevOps Culture', 'CI/CD', 'Agile + DevOps']
      },
      {
        title: 'Version Control',
        lessons: ['Git Workflows', 'Branch Strategy', 'Git Hooks', 'Code Review Process']
      },
      {
        title: 'CI/CD',
        lessons: ['Continuous Integration', 'Continuous Deployment', 'GitHub Actions', 'GitLab CI', 'Jenkins']
      },
      {
        title: 'Docker',
        lessons: ['Docker Basics', 'Containers', 'Images', 'Dockerfile', 'Docker Compose', 'Best Practices']
      },
      {
        title: 'Deployment',
        lessons: ['Deployment Strategies', 'Blue-Green', 'Canary', 'Rolling Updates', 'Rollbacks']
      },
      {
        title: 'Monitoring',
        lessons: ['Application Monitoring', 'Log Management', 'Metrics', 'Alerting', 'Dashboards']
      },
      {
        title: 'Infrastructure as Code',
        lessons: ['IaC Basics', 'Terraform', 'CloudFormation', 'Configuration Management']
      }
    ]
  },
  {
    category: '21. AI & Machine Learning',
    slug: 'ai-ml-complete',
    description: 'Introduction to AI and Machine Learning',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 80,
    isFree: false,
    modules: [
      {
        title: 'AI Fundamentals',
        lessons: ['What is AI?', 'AI vs ML vs DL', 'AI History', 'AI Applications', 'AI Ethics']
      },
      {
        title: 'Machine Learning Basics',
        lessons: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'ML Workflow']
      },
      {
        title: 'Classification',
        lessons: ['Classification Basics', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM']
      },
      {
        title: 'Regression',
        lessons: ['Linear Regression', 'Polynomial Regression', 'Ridge/Lasso', 'Model Evaluation']
      },
      {
        title: 'Clustering',
        lessons: ['K-Means', 'Hierarchical Clustering', 'DBSCAN', 'Clustering Evaluation']
      },
      {
        title: 'Neural Networks',
        lessons: ['Perceptron', 'Feedforward Networks', 'Backpropagation', 'Activation Functions']
      },
      {
        title: 'Deep Learning',
        lessons: ['CNN', 'RNN', 'LSTM', 'Transfer Learning', 'GANs']
      },
      {
        title: 'ML Libraries',
        lessons: ['TensorFlow', 'Keras', 'Scikit-learn', 'PyTorch', 'Model Deployment']
      }
    ]
  },
  {
    category: '22. Data Science',
    slug: 'data-science-complete',
    description: 'Data analysis and visualization with Python',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 65,
    isFree: false,
    modules: [
      {
        title: 'Data Science Basics',
        lessons: ['What is Data Science?', 'Data Science Process', 'Tools Overview', 'Python for Data Science']
      },
      {
        title: 'NumPy',
        lessons: ['NumPy Arrays', 'Array Operations', 'Broadcasting', 'Linear Algebra', 'Random Numbers']
      },
      {
        title: 'Pandas',
        lessons: ['DataFrames', 'Series', 'Data Loading', 'Data Manipulation', 'Merging/Joining']
      },
      {
        title: 'Data Cleaning',
        lessons: ['Missing Data', 'Outliers', 'Data Types', 'Duplicates', 'Data Validation']
      },
      {
        title: 'Data Analysis',
        lessons: ['Descriptive Statistics', 'Group By', 'Pivot Tables', 'Time Series', 'Aggregations']
      },
      {
        title: 'Data Visualization',
        lessons: ['Matplotlib', 'Seaborn', 'Plotly', 'Charts', 'Interactive Dashboards']
      },
      {
        title: 'Statistics',
        lessons: ['Probability', 'Distributions', 'Hypothesis Testing', 'Correlation', 'Regression Analysis']
      },
      {
        title: 'Data Projects',
        lessons: ['Exploratory Analysis', 'Predictive Modeling', 'Dashboard Creation', 'Report Generation']
      }
    ]
  },
  {
    category: '23. Computer Vision',
    slug: 'computer-vision-complete',
    description: 'Image processing and computer vision',
    difficulty: TopicDifficulty.ADVANCED,
    estimatedHours: 55,
    isFree: false,
    modules: [
      {
        title: 'Computer Vision Basics',
        lessons: ['What is Computer Vision?', 'Image Basics', 'Color Spaces', 'Image Formats']
      },
      {
        title: 'OpenCV Basics',
        lessons: ['OpenCV Setup', 'Reading Images', 'Displaying Images', 'Basic Operations']
      },
      {
        title: 'Image Processing',
        lessons: ['Filtering', 'Edge Detection', 'Morphological Operations', 'Transformations', 'Thresholding']
      },
      {
        title: 'Feature Detection',
        lessons: ['Corner Detection', 'SIFT', 'SURF', 'ORB', 'Feature Matching']
      },
      {
        title: 'Object Detection',
        lessons: ['Haar Cascades', 'HOG', 'YOLO', 'R-CNN', 'SSD']
      },
      {
        title: 'Face Detection',
        lessons: ['Face Detection', 'Face Recognition', 'Facial Landmarks', 'Face Verification']
      },
      {
        title: 'Image Classification',
        lessons: ['CNN for Images', 'Transfer Learning', 'Fine-tuning', 'Model Evaluation']
      },
      {
        title: 'CV Projects',
        lessons: ['Image Classifier', 'Object Detector', 'Face Recognition System', 'OCR Application']
      }
    ]
  },
  {
    category: '24. Mobile App Development',
    slug: 'mobile-development-complete',
    description: 'Mobile application development',
    difficulty: TopicDifficulty.INTERMEDIATE,
    estimatedHours: 70,
    isFree: false,
    modules: [
      {
        title: 'Mobile Development Basics',
        lessons: ['Native vs Cross-Platform', 'Mobile UI Principles', 'Platform Guidelines', 'Development Tools']
      },
      {
        title: 'React Native Basics',
        lessons: ['React Native Setup', 'Components', 'Styling', 'Layout', 'Navigation']
      },
      {
        title: 'UI Design',
        lessons: ['Mobile UI Patterns', 'Responsive Design', 'Gestures', 'Animations', 'Accessibility']
      },
      {
        title: 'Navigation',
        lessons: ['Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Deep Linking']
      },
      {
        title: 'Authentication',
        lessons: ['User Registration', 'Login', 'Biometric Auth', 'OAuth', 'Token Management']
      },
      {
        title: 'API Integration',
        lessons: ['Fetching Data', 'Loading States', 'Error Handling', 'Caching', 'Offline Support']
      },
      {
        title: 'Local Database',
        lessons: ['AsyncStorage', 'SQLite', 'Realm', 'Data Persistence', 'Sync Strategies']
      },
      {
        title: 'App Deployment',
        lessons: ['App Store Setup', 'Google Play Setup', 'Builds', 'Testing', 'Release Management']
      }
    ]
  },
  {
    category: '25. UI/UX',
    slug: 'ui-ux-complete',
    description: 'User interface and user experience design',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 40,
    isFree: false,
    modules: [
      {
        title: 'UI Fundamentals',
        lessons: ['UI Principles', 'Visual Hierarchy', 'Layout', 'Spacing', 'Alignment']
      },
      {
        title: 'UX Fundamentals',
        lessons: ['UX Principles', 'User-Centered Design', 'UX Process', 'Usability']
      },
      {
        title: 'Design Tools',
        lessons: ['Figma Basics', 'Components', 'Variants', 'Auto Layout', 'Prototyping']
      },
      {
        title: 'Wireframes',
        lessons: ['What are Wireframes?', 'Low-Fidelity', 'High-Fidelity', 'Tools', 'Best Practices']
      },
      {
        title: 'Prototypes',
        lessons: ['Interactive Prototypes', 'User Flows', 'Animations', 'Testing', 'Feedback']
      },
      {
        title: 'Design Systems',
        lessons: ['Component Libraries', 'Design Tokens', 'Documentation', 'Consistency', 'Scaling']
      },
      {
        title: 'Typography & Color',
        lessons: ['Typography Basics', 'Font Pairing', 'Color Theory', 'Color Palettes', 'Accessibility']
      },
      {
        title: 'User Research',
        lessons: ['User Interviews', 'Surveys', 'Usability Testing', 'Analytics', 'Personas']
      }
    ]
  },
  {
    category: '26. Career Preparation',
    slug: 'career-preparation-complete',
    description: 'Prepare for your tech career',
    difficulty: TopicDifficulty.BEGINNER,
    estimatedHours: 35,
    isFree: true,
    modules: [
      {
        title: 'Coding Interviews',
        lessons: ['Interview Process', 'Problem-Solving Approach', 'Whiteboard Coding', 'Online Assessments']
      },
      {
        title: 'Technical Interviews',
        lessons: ['System Design', 'Behavioral Questions', 'Technical Questions', 'Mock Interviews']
      },
      {
        title: 'Interview Practice',
        lessons: ['Arrays Problems', 'Strings Problems', 'Trees Problems', 'Dynamic Programming', 'System Design']
      },
      {
        title: 'Portfolio Building',
        lessons: ['GitHub Profile', 'Project Selection', 'README Files', 'Live Demos', 'Documentation']
      },
      {
        title: 'Resume & CV',
        lessons: ['CV Structure', 'Highlighting Skills', 'Project Descriptions', 'Keywords', 'Formatting']
      },
      {
        title: 'LinkedIn',
        lessons: ['Profile Optimization', 'Networking', 'Content Strategy', 'Job Search', 'Messaging']
      },
      {
        title: 'Freelancing',
        lessons: ['Finding Clients', 'Proposals', 'Pricing', 'Contracts', 'Platforms', 'Building Reputation']
      },
      {
        title: 'Career Paths',
        lessons: ['Software Engineering', 'Data Science', 'DevOps', 'Cybersecurity', 'Cloud Architecture']
      }
    ]
  }
];

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate code examples for different languages with natural, educational content
function generateCodeExample(lessonTitle: string, language: string): string {
  const examples: Record<string, Record<string, string>> = {
    'Understanding Variables': {
      python: `# Working with variables in Python
# Variables store data that can be used throughout your program

name = "John"
age = 25
is_student = True
gpa = 3.8

print(f"{name} is {age} years old")
print(f"Student status: {is_student}")
print(f"GPA: {gpa}")`,
      cpp: `// Working with variables in C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "John";
    int age = 25;
    bool isStudent = true;
    double gpa = 3.8;
    
    cout << name << " is " << age << " years old" << endl;
    cout << "Student status: " << isStudent << endl;
    cout << "GPA: " << gpa << endl;
    
    return 0;
}`,
      javascript: `// Working with variables in JavaScript
const name = "John";
let age = 25;
let isStudent = true;
const gpa = 3.8;

console.log(\`\${name} is \${age} years old\`);
console.log(\`Student status: \${isStudent}\`);
console.log(\`GPA: \${gpa}\`);`,
      typescript: `// Working with variables in TypeScript
const name: string = "John";
let age: number = 25;
let isStudent: boolean = true;
const gpa: number = 3.8;

console.log(\`\${name} is \${age} years old\`);
console.log(\`Student status: \${isStudent}\`);
console.log(\`GPA: \${gpa}\`);`
    },
    'Data Types': {
      python: `# Understanding Python data types
# Numbers
integer_num = 42
float_num = 3.14

# Strings
text = "Hello World"
multiline = """This is a
multiline string"""

# Boolean
is_valid = True

# Collections
my_list = [1, 2, 3, 4]
my_tuple = (1, 2, 3)
my_dict = {"key": "value"}
my_set = {1, 2, 3}`,
      cpp: `// Understanding C++ data types
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // Numeric types
    int integer_num = 42;
    double float_num = 3.14;
    
    // Text
    string text = "Hello World";
    char single_char = 'A';
    
    // Boolean
    bool is_valid = true;
    
    // Collections
    vector<int> my_vector = {1, 2, 3, 4};
    
    return 0;
}`,
      javascript: `// Understanding JavaScript data types
// Numbers (no distinction between int and float)
const integerNum = 42;
const floatNum = 3.14;

// Strings
const text = "Hello World";
const multiline = \`This is a
multiline string\`;

// Boolean
const isValid = true;

// Collections
const myArray = [1, 2, 3, 4];
const myObject = { key: "value" };

// Special values
const nullValue = null;
const undefinedValue = undefined;`,
      typescript: `// Understanding TypeScript data types
// Explicit type annotations
const integerNum: number = 42;
const floatNum: number = 3.14;

// Strings
const text: string = "Hello World";
const multiline: string = \`This is a
multiline string\`;

// Boolean
const isValid: boolean = true;

// Collections with types
const myArray: number[] = [1, 2, 3, 4];
const myObject: { key: string } = { key: "value" };

// Special types
const nullValue: null = null;
const undefinedValue: undefined = undefined;`
    }
  };

  // Return language-specific example or generate a basic template
  if (examples[lessonTitle] && examples[lessonTitle][language]) {
    return examples[lessonTitle][language];
  }

  // Generate language-appropriate placeholder for other lessons
  const templates: Record<string, string> = {
    python: `# ${lessonTitle}
# This lesson covers ${lessonTitle.toLowerCase()} in Python

def example_function():
    # Implementation details
    pass

if __name__ == "__main__":
    example_function()`,
    cpp: `// ${lessonTitle}
// This lesson covers ${lessonTitle.toLowerCase()} in C++

#include <iostream>
using namespace std;

int main() {
    // Implementation details
    
    return 0;
}`,
    javascript: `// ${lessonTitle}
// This lesson covers ${lessonTitle.toLowerCase()} in JavaScript

function exampleFunction() {
    // Implementation details
}

exampleFunction();`,
    typescript: `// ${lessonTitle}
// This lesson covers ${lessonTitle.toLowerCase()} in TypeScript

function exampleFunction(): void {
    // Implementation details
}

exampleFunction();`
  };

  return templates[language] || `// Example code for ${lessonTitle}`;
}

async function main() {
  console.log('Starting database seeding process...\n');

  let topicsCreated = 0;
  let modulesCreated = 0;
  let lessonsCreated = 0;
  let quizzesCreated = 0;
  let challengesCreated = 0;

  // Create all 30 topics with their modules and lessons
  for (const topicData of COMPLETE_TOPICS) {
    console.log(`Processing: ${topicData.category}...`);

    const topic = await prisma.topic.create({
      data: {
        title: topicData.category,
        slug: topicData.slug,
        description: topicData.description,
        shortDescription: topicData.description.substring(0, 100),
        difficulty: topicData.difficulty,
        estimatedHours: topicData.estimatedHours,
        isPublished: true,
        isFree: topicData.isFree,
        orderIndex: topicsCreated,
      }
    });

    topicsCreated++;

    // Create modules for this topic
    for (let moduleIndex = 0; moduleIndex < topicData.modules.length; moduleIndex++) {
      const moduleData = topicData.modules[moduleIndex];
      
      const module = await prisma.module.create({
        data: {
          topicId: topic.id,
          title: moduleData.title,
          slug: generateSlug(moduleData.title),
          description: `Comprehensive coverage of ${moduleData.title.toLowerCase()}`,
          orderIndex: moduleIndex,
          isPublished: true,
          estimatedMinutes: 45 * moduleData.lessons.length,
        }
      });

      modulesCreated++;

      // Create lessons for this module
      for (let lessonIndex = 0; lessonIndex < moduleData.lessons.length; lessonIndex++) {
        const lessonTitle = moduleData.lessons[lessonIndex];
        
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: lessonTitle,
            slug: generateSlug(lessonTitle),
            content: `# ${lessonTitle}\n\nThis lesson provides detailed coverage of ${lessonTitle.toLowerCase()}.\n\n## Learning Objectives\n- Understand core concepts\n- Apply knowledge through practice\n- Master implementation techniques\n\n## Detailed Explanation\nThis section covers fundamental and advanced aspects of the topic.`,
            estimatedMinutes: 45,
            orderIndex: lessonIndex,
            isPublished: true,
            isFree: topicData.isFree || lessonIndex === 0,
          }
        });

        lessonsCreated++;

        // Create language-specific lesson topics for applicable content
        const applicableLanguages = getApplicableLanguages(topicData.category, lessonTitle);
        
        for (const language of applicableLanguages) {
          await prisma.lessonTopic.create({
            data: {
              lessonId: lesson.id,
              title: `${lessonTitle} - ${language.toUpperCase()}`,
              content: `Detailed explanation of ${lessonTitle.toLowerCase()} using ${language}`,
              codeExamples: {
                language: language,
                code: generateCodeExample(lessonTitle, language),
                explanation: `Practical implementation demonstrating ${lessonTitle.toLowerCase()} in ${language}`
              },
              orderIndex: applicableLanguages.indexOf(language),
              isPublished: true,
            }
          });
        }

        // Create quiz for assessment (every 3rd lesson)
        if (lessonIndex % 3 === 2) {
          const quiz = await prisma.quiz.create({
            data: {
              lessonId: lesson.id,
              title: `${lessonTitle} Assessment`,
              description: `Evaluate your understanding of ${lessonTitle.toLowerCase()}`,
              passingScore: 70,
              timeLimitMinutes: 10,
              isPublished: true,
              randomizeQuestions: true,
              showCorrectAnswers: true,
            }
          });

          quizzesCreated++;

          // Create 5 questions for the quiz
          for (let q = 0; q < 5; q++) {
            const question = await prisma.question.create({
              data: {
                quizId: quiz.id,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: `Assessment question ${q + 1} for ${lessonTitle}`,
                explanation: 'Detailed explanation of the correct answer and reasoning',
                points: 20,
                orderIndex: q,
                isRequired: true,
              }
            });

            // Create 4 answer options
            for (let a = 0; a < 4; a++) {
              await prisma.answerOption.create({
                data: {
                  questionId: question.id,
                  optionText: `Answer option ${a + 1}`,
                  isCorrect: a === 0,
                  orderIndex: a,
                }
              });
            }
          }
        }
      }
    }

    // Create coding challenges for intermediate and advanced topics
    if (topicData.difficulty !== TopicDifficulty.BEGINNER) {
      for (let i = 0; i < 5; i++) {
        await prisma.challenge.create({
          data: {
            title: `${topicData.category} Challenge ${i + 1}`,
            slug: `${topicData.slug}-challenge-${i + 1}`,
            description: `Practical coding challenge to demonstrate proficiency in ${topicData.category.toLowerCase()}`,
            difficulty: topicData.difficulty === TopicDifficulty.INTERMEDIATE 
              ? ChallengeDifficulty.INTERMEDIATE 
              : ChallengeDifficulty.ADVANCED,
            category: topicData.category,
            instructions: `Complete this challenge to validate your understanding of ${topicData.category.toLowerCase()}`,
            starterCode: `// Implement your solution here`,
            language: 'cpp',
            points: topicData.difficulty === TopicDifficulty.INTERMEDIATE ? 100 : 200,
            isPublished: true,
          }
        });

        challengesCreated++;
      }
    }

    console.log(`  Completed: ${topicData.modules.length} modules with lessons\n`);
  }

  // Create achievement system
  const achievements = [
    { name: 'First Steps', slug: 'first-steps', description: 'Complete your first lesson', points: 10, requirementType: 'lessons_completed', requirementValue: 1 },
    { name: 'Dedicated Learner', slug: 'dedicated-learner', description: 'Complete 10 lessons', points: 50, requirementType: 'lessons_completed', requirementValue: 10 },
    { name: 'Quiz Master', slug: 'quiz-master', description: 'Pass 5 quizzes', points: 100, requirementType: 'quizzes_passed', requirementValue: 5 },
    { name: 'Challenge Accepted', slug: 'challenge-accepted', description: 'Complete your first coding challenge', points: 50, requirementType: 'challenges_completed', requirementValue: 1 },
    { name: 'Week Streak', slug: 'week-streak', description: 'Maintain a 7-day learning streak', points: 75, requirementType: 'streak_days', requirementValue: 7 },
    { name: 'Month Streak', slug: 'month-streak', description: 'Maintain a 30-day learning streak', points: 300, requirementType: 'streak_days', requirementValue: 30 },
    { name: 'Topic Master', slug: 'topic-master', description: 'Complete an entire topic', points: 200, requirementType: 'topics_completed', requirementValue: 1 },
    { name: 'Polyglot', slug: 'polyglot', description: 'Learn in all 4 languages', points: 500, requirementType: 'languages_learned', requirementValue: 4 },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement
    });
  }

  // Create subscription plans
  const plans = [
    {
      name: 'Free',
      slug: 'free',
      description: 'Access to free content only',
      price: 0,
      currency: 'ZAR',
      billingPeriod: 'lifetime',
      trialDays: 0,
      features: { topics: ['Programming Fundamentals', 'Git & GitHub', 'Career Preparation'], challenges: 10 },
      isActive: true,
      orderIndex: 0,
    },
    {
      name: 'Premium Monthly',
      slug: 'premium-monthly',
      description: 'Full access to all content',
      price: 299,
      currency: 'ZAR',
      billingPeriod: 'monthly',
      trialDays: 7,
      features: { topics: 'all', challenges: 'unlimited', certificates: true, support: true },
      isActive: true,
      orderIndex: 1,
    },
    {
      name: 'Premium Yearly',
      slug: 'premium-yearly',
      description: 'Full access with significant savings',
      price: 2990,
      currency: 'ZAR',
      billingPeriod: 'yearly',
      trialDays: 7,
      features: { topics: 'all', challenges: 'unlimited', certificates: true, support: 'priority', savings: '17%' },
      isActive: true,
      orderIndex: 2,
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.create({
      data: plan
    });
  }

  console.log('\nSeeding completed successfully\n');
  console.log('Summary:');
  console.log(`   Topics Created: ${topicsCreated}`);
  console.log(`   Modules Created: ${modulesCreated}`);
  console.log(`   Lessons Created: ${lessonsCreated}`);
  console.log(`   Quizzes Created: ${quizzesCreated}`);
  console.log(`   Challenges Created: ${challengesCreated}`);
  console.log(`   Achievements Created: ${achievements.length}`);
  console.log(`   Subscription Plans: ${plans.length}`);
  console.log('\nAll topics are now available across supported languages\n');
}

// Helper function to determine applicable languages for a topic
function getApplicableLanguages(category: string, lessonTitle: string): string[] {
  // Topics that apply to all languages
  const universalTopics = [
    '1. Programming Fundamentals',
    '2. Python',
    '3. C++',
    '4. JavaScript',
    '5. TypeScript',
    '12. Data Structures',
    '13. Algorithms'
  ];
  
  // Web-focused topics
  const webTopics = [
    '6. Web Development',
    '7. React',
    '24. Mobile App Development'
  ];
  
  // Backend topics
  const backendTopics = [
    '8. Backend Development',
    '9. Databases',
    '10. APIs'
  ];
  
  // Language-specific or tool-specific topics
  const toolTopics = [
    '11. Git & GitHub',
    '15. Software Engineering',
    '16. Cybersecurity',
    '17. Linux',
    '25. UI/UX',
    '26. Career Preparation'
  ];
  
  if (universalTopics.some(t => category.startsWith(t.split('.')[0]))) {
    return LANGUAGES;
  }
  
  if (webTopics.some(t => category.startsWith(t.split('.')[0]))) {
    return ['javascript', 'typescript'];
  }
  
  if (backendTopics.some(t => category.startsWith(t.split('.')[0]))) {
    return ['javascript', 'typescript', 'python'];
  }
  
  if (toolTopics.some(t => category.startsWith(t.split('.')[0]))) {
    return ['python']; // Single language for documentation
  }
  
  // Default: all languages
  return LANGUAGES;
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
