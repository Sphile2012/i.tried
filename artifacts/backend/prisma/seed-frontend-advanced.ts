import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Advanced Frontend Lessons...');

  // Get the JavaScript & TypeScript topic
  const jsTsTopic = await prisma.topic.findUnique({
    where: { slug: 'javascript-typescript-mastery' },
  });

  if (!jsTsTopic) {
    console.error('❌ JavaScript & TypeScript topic not found. Run seed-js-ts-lessons.ts first!');
    return;
  }

  // Create Advanced Frontend Module
  const frontendModule = await prisma.module.upsert({
    where: {
      topicId_slug: {
        topicId: jsTsTopic.id,
        slug: 'advanced-frontend-development',
      },
    },
    update: {},
    create: {
      topicId: jsTsTopic.id,
      title: 'Advanced Frontend Development',
      slug: 'advanced-frontend-development',
      description: 'Master advanced frontend concepts including frameworks, state management, performance optimization, and modern web APIs',
      orderIndex: 3,
      isPublished: true,
      estimatedMinutes: 1400,
    },
  });

  console.log('✅ Created module:', frontendModule.title);

  // Advanced Frontend Lessons
  const frontendLessons = [
    {
      title: 'Modern JavaScript Tooling',
      slug: 'modern-js-tooling',
      content: `# Modern JavaScript Tooling

## Package Managers

### NPM (Node Package Manager)

\`\`\`bash
# Initialize new project
npm init -y

# Install dependencies
npm install express
npm install --save-dev typescript

# Install globally
npm install -g nodemon

# Run scripts
npm run dev
npm test

# Update packages
npm update
npm outdated
\`\`\`

### Yarn

\`\`\`bash
# Install Yarn
npm install -g yarn

# Initialize project
yarn init

# Add dependencies
yarn add express
yarn add --dev typescript

# Remove package
yarn remove express

# Run scripts
yarn dev
yarn test
\`\`\`

### PNPM (Fast & Efficient)

\`\`\`bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Add package
pnpm add express

# Run scripts
pnpm run dev
\`\`\`

## Build Tools

### Vite (Modern & Fast)

\`\`\`bash
# Create Vite project
npm create vite@latest my-app

# Choose framework
# React, Vue, Svelte, etc.

# Install and run
cd my-app
npm install
npm run dev
\`\`\`

### Webpack Configuration

\`\`\`javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: 3000,
    hot: true
  }
};
\`\`\`

## Module Bundlers

### ES Modules vs CommonJS

\`\`\`javascript
// ES Modules (modern)
import { add } from './math.js';
export const PI = 3.14;

// CommonJS (Node.js)
const { add } = require('./math');
module.exports = { PI: 3.14 };
\`\`\`

## Linting and Formatting

### ESLint

\`\`\`bash
# Install ESLint
npm install --save-dev eslint

# Initialize config
npx eslint --init

# Lint files
npx eslint src/**/*.js
\`\`\`

### Prettier

\`\`\`bash
# Install Prettier
npm install --save-dev prettier

# Format files
npx prettier --write src/**/*.js
\`\`\`

\`\`\`json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 60,
      orderIndex: 1,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'Introduction to React',
      slug: 'intro-to-react',
      content: `# Introduction to React

## What is React?

React is a JavaScript library for building user interfaces. Created by Facebook, it's the most popular frontend framework.

## Creating a React App

\`\`\`bash
# Using Vite (recommended)
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev

# Using Create React App
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component

\`\`\`jsx
// App.jsx
function App() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
      <p>Welcome to React development</p>
    </div>
  );
}

export default App;
\`\`\`

## JSX - JavaScript XML

\`\`\`jsx
// JSX allows HTML-like syntax in JavaScript
const element = <h1>Hello, world!</h1>;

// With expressions
const name = "Alice";
const greeting = <h1>Hello, {name}!</h1>;

// With attributes
const image = <img src={user.avatar} alt={user.name} />;

// Multiple elements need a wrapper
const component = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Or use Fragment
const component = (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
\`\`\`

## Functional Components

\`\`\`jsx
// Simple component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function component
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// With destructuring
const Welcome = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
};
\`\`\`

## Props - Passing Data

\`\`\`jsx
// Parent component
function App() {
  return (
    <div>
      <Welcome name="Alice" age={25} />
      <Welcome name="Bob" age={30} />
    </div>
  );
}

// Child component receives props
function Welcome({ name, age }) {
  return (
    <div className="welcome">
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
\`\`\`

## Conditional Rendering

\`\`\`jsx
function UserGreeting({ isLoggedIn, username }) {
  // Using if-else
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign in</h1>;
}

// Using ternary operator
function UserStatus({ isOnline }) {
  return (
    <div>
      {isOnline ? (
        <span className="online">Online</span>
      ) : (
        <span className="offline">Offline</span>
      )}
    </div>
  );
}

// Using && for simple conditions
function Notification({ hasNewMessages, count }) {
  return (
    <div>
      {hasNewMessages && (
        <div className="notification">
          You have {count} new messages
        </div>
      )}
    </div>
  );
}
\`\`\`

## Lists and Keys

\`\`\`jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// With more complex items
function ProductList({ products }) {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 70,
      orderIndex: 2,
      isPublished: true,
      isFree: true,
    },
    {
      title: 'React Hooks - useState',
      slug: 'react-usestate-hook',
      content: `# React Hooks - useState

## What are Hooks?

Hooks let you use state and other React features in functional components.

## useState Basics

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
\`\`\`

## Multiple State Variables

\`\`\`jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, age });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## State with Objects

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="bio"
        value={user.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
    </form>
  );
}
\`\`\`

## State with Arrays

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Functional Updates

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Good - functional update
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // Multiple updates work correctly
  const incrementBy3 = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementBy3}>+3</button>
    </div>
  );
}
\`\`\`

## Lazy Initial State

\`\`\`jsx
function ExpensiveComponent() {
  // Expensive calculation only runs once
  const [data, setData] = useState(() => {
    const initialData = expensiveCalculation();
    return initialData;
  });

  return <div>{data}</div>;
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 65,
      orderIndex: 3,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'React Hooks - useEffect',
      slug: 'react-useeffect-hook',
      content: `# React Hooks - useEffect

## What is useEffect?

useEffect lets you perform side effects in functional components (data fetching, subscriptions, DOM manipulation).

## Basic useEffect

\`\`\`jsx
import { useState, useEffect } from 'react';

function PageTitle() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## useEffect with Dependencies

\`\`\`jsx
function User({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs only when userId changes
  useEffect(() => {
    setLoading(true);
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## useEffect with Cleanup

\`\`\`jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Setup
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty array = run once on mount

  return <div>Seconds: {seconds}</div>;
}
\`\`\`

## Fetching Data

\`\`\`jsx
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Event Listeners

\`\`\`jsx
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}
\`\`\`

## LocalStorage Sync

\`\`\`jsx
function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
    </button>
  );
}
\`\`\`

## Multiple useEffects

\`\`\`jsx
function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch user data
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  // Fetch posts
  useEffect(() => {
    fetch(\`/api/users/\${userId}/posts\`)
      .then(res => res.json())
      .then(setPosts);
  }, [userId]);

  // Update document title
  useEffect(() => {
    if (user) {
      document.title = \`\${user.name}'s Dashboard\`;
    }
  }, [user]);

  return (
    <div>
      {user && <h1>{user.name}</h1>}
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 70,
      orderIndex: 4,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'React Hooks - useContext',
      slug: 'react-usecontext-hook',
      content: `# React Hooks - useContext

## What is Context?

Context provides a way to pass data through the component tree without manually passing props at every level.

## Creating Context

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// App Component
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
      <Footer />
    </ThemeProvider>
  );
}

// Components using context
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Toggle Theme: {theme}
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();
  
  return (
    <div className={\`content \${theme}\`}>
      <p>Content in {theme} mode</p>
    </div>
  );
}
\`\`\`

## Auth Context Example

\`\`\`jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(setUser).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// Usage
function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
\`\`\`

## Shopping Cart Context

\`\`\`jsx
const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

// Usage
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartSummary() {
  const { items, total } = useCart();

  return (
    <div className="cart-summary">
      <h2>Cart ({items.length} items)</h2>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
\`\`\`

## Multiple Contexts

\`\`\`jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Routes />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 65,
      orderIndex: 5,
      isPublished: true,
      isFree: false,
    },
    {
      title: 'React Hooks - useRef and Custom Hooks',
      slug: 'react-useref-custom-hooks',
      content: `# React Hooks - useRef and Custom Hooks

## useRef Hook

### Accessing DOM Elements

\`\`\`jsx
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
\`\`\`

### Storing Mutable Values

\`\`\`jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  useEffect(() => {
    return () => stop(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

### Previous Value

\`\`\`jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## Custom Hooks

### useLocalStorage

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setStoredValue = (value) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
\`\`\`

### useFetch

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function Users() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### useDebounce

\`\`\`jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Perform search
      fetch(\`/api/search?q=\${debouncedSearch}\`)
        .then(res => res.json())
        .then(console.log);
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
\`\`\`

### useWindowSize

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
\`\`\`

### useToggle

\`\`\`jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </div>
  );
}
\`\`\``,
      videoUrl: '',
      estimatedMinutes: 75,
      orderIndex: 6,
      isPublished: true,
      isFree: false,
    },
  ];

  // Create all frontend lessons
  for (const lessonData of frontendLessons) {
    const lesson = await prisma.lesson.upsert({
      where: {
        moduleId_slug: {
          moduleId: frontendModule.id,
          slug: lessonData.slug,
        },
      },
      update: {},
      create: {
        ...lessonData,
        moduleId: frontendModule.id,
      },
    });
    console.log(`  ✅ Created lesson: ${lesson.title}`);
  }

  console.log('\n🎉 Successfully seeded advanced frontend lessons!');
  console.log(`📊 Total: ${frontendLessons.length} lessons created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
