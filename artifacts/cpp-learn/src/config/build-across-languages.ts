/**
 * Infinity Code - Build an App Across Languages Feature
 * 
 * This feature allows learners to build the same application using different programming languages.
 * Users follow a step-by-step development process from planning to deployment.
 * 
 * Supported Languages: Python, JavaScript, Java, C++, C#, TypeScript
 */

export type SupportedLanguage = 'python' | 'javascript' | 'java' | 'cpp' | 'csharp' | 'typescript';

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  'python', 'javascript', 'java', 'cpp', 'csharp', 'typescript'
] as const;

export interface CodeExample {
  language: SupportedLanguage;
  code: string;
  fileName: string;
  description: string;
  highlights?: string[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
  codeExamples: CodeExample[];
  objectives: string[];
  hints: string[];
  estimatedDuration: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  steps: Step[];
  order: number;
}

export interface AppProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTotalHours: number;
  technologies: string[];
  features: string[];
  phases: Phase[];
  prerequisites: string[];
  learningOutcomes: string[];
}

/**
 * Todo App Project - A complete cross-language learning project
 */
export const todoAppProject: AppProject = {
  id: 'todo-app-cross-language',
  title: 'Build a Todo Application Across Languages',
  description: 'Learn how to build a complete Todo application from scratch using Python, JavaScript, Java, C++, C#, and TypeScript. Understand how the same application logic is implemented differently across these languages.',
  difficulty: 'intermediate',
  estimatedTotalHours: 20,
  technologies: [
    'Python (Flask/FastAPI)',
    'JavaScript (Node.js/Express)',
    'Java (Spring Boot)',
    'C++ (Qt/WT)',
    'C# (.NET)',
    'TypeScript (Node.js/NestJS)',
    'SQL/SQLite',
    'REST APIs',
    'Git & GitHub',
    'Docker'
  ],
  features: [
    'Create, read, update, delete todos',
    'User authentication and authorization',
    'Database integration',
    'RESTful API endpoints',
    'Input validation',
    'Error handling',
    'Unit testing',
    'Deployment configuration'
  ],
  prerequisites: [
    'Basic programming knowledge in at least one language',
    'Understanding of variables, functions, and control flow',
    'Familiarity with command line/terminal',
    'Basic understanding of databases'
  ],
  learningOutcomes: [
    'Understand how different languages approach the same problem',
    'Learn language-specific best practices and idioms',
    'Master full-stack development concepts',
    'Gain experience with multiple frameworks',
    'Understand database integration patterns',
    'Learn authentication implementation across languages',
    'Master testing strategies for different ecosystems',
    'Deploy applications using various technologies'
  ],
  phases: [
    {
      id: 'planning',
      title: 'Planning & Design',
      description: 'Define the application requirements, design the database schema, and plan the API structure.',
      icon: 'Planning',
      color: 'from-blue-500 to-cyan-500',
      order: 1,
      steps: [
        {
          id: 'requirements',
          title: 'Define Requirements',
          description: 'Document what the Todo app should do and create user stories.',
          order: 1,
          estimatedDuration: '1 hour',
          objectives: [
            'Define core features (CRUD operations)',
            'Create user stories',
            'Define acceptance criteria'
          ],
          hints: [
            'Think about what a user needs to do with todos',
            'Consider edge cases like empty input or duplicate titles',
            'Plan for user authentication from the start'
          ],
          codeExamples: [
            {
              language: 'python',
              fileName: 'requirements.md',
              description: 'Requirements document (same for all languages)',
              code: `# Todo App Requirements

## Core Features
1. Create a new todo item
2. View all todo items
3. Update a todo item (mark as complete, edit title)
4. Delete a todo item
5. Filter todos (all, active, completed)

## User Stories
- As a user, I want to create a todo so I can track tasks
- As a user, I want to mark todos as complete
- As a user, I want to delete todos I no longer need
- As a user, I want to see only my active todos

## API Endpoints
- POST /api/todos - Create todo
- GET /api/todos - Get all todos
- GET /api/todos/:id - Get single todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo`
            },
            {
              language: 'javascript',
              fileName: 'requirements.md',
              description: 'Requirements document (same for all languages)',
              code: `# Todo App Requirements

## Core Features
1. Create a new todo item
2. View all todo items
3. Update a todo item (mark as complete, edit title)
4. Delete a todo item
5. Filter todos (all, active, completed)

## User Stories
- As a user, I want to create a todo so I can track tasks
- As a user, I want to mark todos as complete
- As a user, I want to delete todos I no longer need
- As a user, I want to see only my active todos

## API Endpoints
- POST /api/todos - Create todo
- GET /api/todos - Get all todos
- GET /api/todos/:id - Get single todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo`
            }
          ]
        },
        {
          id: 'database-design',
          title: 'Database Schema Design',
          description: 'Design the database tables for users and todos.',
          order: 2,
          estimatedDuration: '1.5 hours',
          objectives: [
            'Design users table with authentication fields',
            'Design todos table with foreign key to users',
            'Define relationships and constraints'
          ],
          hints: [
            'Users need email, password hash, and timestamps',
            'Todos need title, description, completed flag, and user_id',
            'Add created_at and updated_at timestamps'
          ],
          codeExamples: [
            {
              language: 'python',
              fileName: 'schema.sql',
              description: 'SQL Schema (same for all languages)',
              code: `-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for faster queries
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);`
            },
            {
              language: 'java',
              fileName: 'schema.sql',
              description: 'SQL Schema (same for all languages)',
              code: `-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`
            }
          ]
        }
      ]
    },
    {
      id: 'setup',
      title: 'Environment Setup',
      description: 'Set up the development environment for your chosen language.',
      icon: 'Setup',
      color: 'from-green-500 to-emerald-500',
      order: 2,
      steps: [
        {
          id: 'project-structure',
          title: 'Create Project Structure',
          description: 'Set up the project folder structure and initialize the project.',
          order: 1,
          estimatedDuration: '30 minutes',
          objectives: [
            'Create project directory structure',
            'Initialize version control',
            'Set up configuration files'
          ],
          hints: [
            'Use language-specific project initialization tools',
            'Create a .gitignore file appropriate for your language',
            'Set up environment variables for sensitive data'
          ],
          codeExamples: [
            {
              language: 'python',
              fileName: 'setup.sh',
              description: 'Python project setup with Flask',
              code: `# Create project structure
mkdir todo-app-python
cd todo-app-python

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows: venv\\Scripts\\activate
# On Mac/Linux: source venv/bin/activate

# Install dependencies
pip install flask flask-sqlalchemy flask-cors python-dotenv

# Create project structure
mkdir -p app/static app/templates
touch app/__init__.py app/models.py app/routes.py
touch .env .gitignore requirements.txt

# Create requirements.txt
pip freeze > requirements.txt

# Project structure:
# todo-app-python/
#   ├── app/
#   │   ├── __init__.py
#   │   ├── models.py
#   │   ├── routes.py
#   │   ├── static/
#   │   └── templates/
#   ├── .env
#   ├── .gitignore
#   ├── requirements.txt
#   └── run.py`
            },
            {
              language: 'javascript',
              fileName: 'setup.sh',
              description: 'Node.js project setup with Express',
              code: `# Create project structure
mkdir todo-app-nodejs
cd todo-app-nodejs

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon

# Create project structure
mkdir -p src/routes src/models src/middleware src/config
touch src/index.js src/routes/todoRoutes.js src/models/Todo.js
touch .env .gitignore

# Project structure:
# todo-app-nodejs/
#   ├── src/
#   │   ├── index.js
#   │   ├── routes/
#   │   │   └── todoRoutes.js
#   │   ├── models/
#   │   │   └── Todo.js
#   │   ├── middleware/
#   │   └── config/
#   ├── .env
#   ├── .gitignore
#   └── package.json`
            },
            {
              language: 'java',
              fileName: 'setup.sh',
              description: 'Java project setup with Spring Boot',
              code: `# Create Spring Boot project using Spring Initializr
# Or use Maven to create project structure

# Using Maven
mvn archetype:generate \\
  -DgroupId=com.example \\
  -DartifactId=todo-app-java \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DinteractiveMode=false

cd todo-app-java

# Add Spring Boot dependencies to pom.xml:
# - spring-boot-starter-web
# - spring-boot-starter-data-jpa
# - spring-boot-starter-security
# - h2 (for development) or mysql-connector-java

# Project structure:
# todo-app-java/
#   ├── src/
#   │   ├── main/
#   │   │   ├── java/com/example/todo/
#   │   │   │   ├── TodoApplication.java
#   │   │   │   ├── controller/
#   │   │   │   ├── model/
#   │   │   │   ├── repository/
#   │   │   │   └── service/
#   │   │   └── resources/
#   │   │       ├── application.properties
#   │   │       └── data.sql
#   │   └── test/
#   ├── pom.xml
#   └── .gitignore`
            },
            {
              language: 'cpp',
              fileName: 'setup.sh',
              description: 'C++ project setup with CMake',
              code: `# Create C++ project structure
mkdir todo-app-cpp
cd todo-app-cpp

# Create project structure
mkdir -p src include tests build
touch CMakeLists.txt .gitignore

# Create source files
touch src/main.cpp src/todo.cpp src/database.cpp
touch include/todo.h include/database.h

# CMakeLists.txt content:
# cmake_minimum_required(VERSION 3.10)
# project(TodoApp)
# set(CMAKE_CXX_STANDARD 17)
# find_package(SQLite3 REQUIRED)
# add_executable(todo_app src/main.cpp src/todo.cpp src/database.cpp)
# target_include_directories(todo_app PRIVATE include)
# target_link_libraries(todo_app SQLite::SQLite3)

# Project structure:
# todo-app-cpp/
#   ├── src/
#   │   ├── main.cpp
#   │   ├── todo.cpp
#   │   └── database.cpp
#   ├── include/
#   │   ├── todo.h
#   │   └── database.h
#   ├── tests/
#   ├── build/
#   ├── CMakeLists.txt
#   └── .gitignore`
            },
            {
              language: 'csharp',
              fileName: 'setup.sh',
              description: 'C# project setup with .NET',
              code: `# Create .NET project
dotnet new webapi -n TodoApp
cd TodoApp

# Add NuGet packages
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package BCrypt.Net-Next
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer

# Create project structure
mkdir Models Controllers Services Data
touch Models/Todo.cs Models/User.cs
touch Controllers/TodoController.cs Controllers/AuthController.cs
touch Services/ITodoService.cs Services/TodoService.cs
touch Data/TodoContext.cs

# Project structure:
# TodoApp/
#   ├── Models/
#   │   ├── Todo.cs
#   │   └── User.cs
#   ├── Controllers/
#   │   ├── TodoController.cs
#   │   └── AuthController.cs
#   ├── Services/
#   │   ├── ITodoService.cs
#   │   └── TodoService.cs
#   ├── Data/
#   │   └── TodoContext.cs
#   ├── appsettings.json
#   └── Program.cs`
            },
            {
              language: 'typescript',
              fileName: 'setup.sh',
              description: 'TypeScript project setup with NestJS',
              code: `# Install NestJS CLI
npm i -g @nestjs/cli

# Create NestJS project
nest new todo-app-nestjs
cd todo-app-nestjs

# Install additional dependencies
npm install @nestjs/jwt @nestjs/passport passport bcrypt
npm install @nestjs/typeorm typeorm sqlite3
npm install class-validator class-transformer

# Generate modules
nest g module todos
nest g controller todos
nest g service todos

nest g module auth
nest g controller auth
nest g service auth

nest g class todo --no-spec
nest g class user --no-spec

# Project structure:
# todo-app-nestjs/
#   ├── src/
#   │   ├── todos/
#   │   │   ├── todos.module.ts
#   │   │   ├── todos.controller.ts
#   │   │   ├── todos.service.ts
#   │   │   └── entities/
#   │   │       └── todo.entity.ts
#   │   ├── auth/
#   │   ├── app.module.ts
#   │   ├── main.ts
#   │   └── *.dto.ts
#   ├── .env
#   └── package.json`
            }
          ]
        }
      ]
    },
    {
      id: 'development',
      title: 'Core Development',
      description: 'Implement the core functionality of the Todo application.',
      icon: 'Dev',
      color: 'from-purple-500 to-pink-500',
      order: 3,
      steps: [
        {
          id: 'data-models',
          title: 'Create Data Models',
          description: 'Define the Todo and User models/entities in your chosen language.',
          order: 1,
          estimatedDuration: '2 hours',
          objectives: [
            'Create Todo model with all required fields',
            'Create User model for authentication',
            'Set up relationships between models'
          ],
          hints: [
            'Todo needs: id, title, description, completed, userId, timestamps',
            'User needs: id, email, passwordHash, timestamps',
            'Use appropriate data types for your language'
          ],
          codeExamples: [
            {
              language: 'python',
              fileName: 'models.py',
              description: 'Python SQLAlchemy models',
              code: `from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    todos = db.relationship('Todo', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class Todo(db.Model):
    __tablename__ = 'todos'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }`
            },
            {
              language: 'javascript',
              fileName: 'models/Todo.js',
              description: 'Node.js Sequelize model',
              code: `const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Define relationship
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Todo };`
            },
            {
              language: 'typescript',
              fileName: 'todos/entities/todo.entity.ts',
              description: 'TypeScript TypeORM entity',
              code: `import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}`
            }
          ]
        }
      ]
    },
    {
      id: 'api',
      title: 'API Development',
      description: 'Build RESTful API endpoints for CRUD operations.',
      icon: 'API',
      color: 'from-orange-500 to-amber-500',
      order: 4,
      steps: []
    },
    {
      id: 'auth',
      title: 'Authentication',
      description: 'Implement user registration, login, and JWT authentication.',
      icon: 'Auth',
      color: 'from-red-500 to-rose-500',
      order: 5,
      steps: []
    },
    {
      id: 'testing',
      title: 'Testing',
      description: 'Write unit and integration tests for your application.',
      icon: 'Test',
      color: 'from-indigo-500 to-purple-500',
      order: 6,
      steps: []
    },
    {
      id: 'deployment',
      title: 'Deployment',
      description: 'Deploy your application using Docker and cloud services.',
      icon: 'Deploy',
      color: 'from-green-500 to-teal-500',
      order: 7,
      steps: []
    }
  ]
};

/**
 * Get project by ID
 */
export function getProjectById(projectId: string): AppProject | undefined {
  // For now, only one project is defined
  if (projectId === todoAppProject.id) {
    return todoAppProject;
  }
  return undefined;
}

/**
 * Get code example for a specific language
 */
export function getCodeExampleForLanguage(
  step: Step,
  language: SupportedLanguage
): CodeExample | undefined {
  return step.codeExamples.find(ex => ex.language === language);
}

/**
 * Get all supported languages with display info
 */
export function getLanguageInfo(language: SupportedLanguage): { name: string; color: string; icon: string } {
  const info = {
    python: { name: 'Python', color: '#3776AB', icon: 'Py' },
    javascript: { name: 'JavaScript', color: '#F7DF1E', icon: 'JS' },
    java: { name: 'Java', color: '#ED8B00', icon: 'Jv' },
    cpp: { name: 'C++', color: '#00599C', icon: 'C+' },
    csharp: { name: 'C#', color: '#68217A', icon: 'C#' },
    typescript: { name: 'TypeScript', color: '#3178C6', icon: 'TS' }
  };
  return info[language];
}