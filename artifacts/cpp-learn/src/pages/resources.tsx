/**
 * Infinity Code - Resources Page
 * Documentation, cheat sheets, articles, and developer references
 * 
 * All buttons are optimized for mobile with:
 * - Minimum 44px touch targets
 * - Active states for visual feedback
 * - Proper spacing and sizing
 */

import { useState } from 'react';
import {
  BookOpen,
  FileText,
  FileCode,
  Search,
  Filter,
  ExternalLink,
  Bookmark,
  Clock,
  ChevronLeft,
} from 'lucide-react';

type ResourceType = 'Documentation' | 'Cheat Sheet' | 'Article' | 'Reference' | 'Guide';

interface Resource {
  id: number;
  title: string;
  category: string;
  type: ResourceType;
  description: string;
  content: string;
  readTime: string;
  tags: string[];
}

const categories = ['All', 'Documentation', 'Cheat Sheets', 'Articles', 'References', 'Guides'];

const resources: Resource[] = [
  {
    id: 1,
    title: 'JavaScript Complete Reference',
    category: 'Documentation',
    type: 'Documentation',
    description: 'Comprehensive JavaScript reference covering all language features, syntax, and best practices.',
    content: `This extensive documentation covers:

• Variables and Data Types - let, const, var, primitives, objects
• Operators - arithmetic, comparison, logical, ternary
• Control Structures - if/else, switch, loops
• Functions - declarations, expressions, arrow functions
• Objects - properties, methods, prototypes
• Arrays - methods, iteration, destructuring
• Promises - async operations, error handling
• Async/Await - modern asynchronous programming
• Modules - import/export, ES modules
• Error Handling - try/catch, custom errors

Perfect for both beginners and experienced developers looking for a quick reference.`,
    readTime: '30 min read',
    tags: ['JavaScript', 'Reference', 'ES6+'],
  },
  {
    id: 2,
    title: 'React Hooks Cheat Sheet',
    category: 'Cheat Sheets',
    type: 'Cheat Sheet',
    description: 'Quick reference for all React hooks with syntax examples and common patterns.',
    content: `Complete guide to React Hooks:

useState - Manage state in function components
  const [state, setState] = useState(initialValue);

useEffect - Handle side effects and lifecycle
  useEffect(() => { /* effect */ return () => { /* cleanup */ } }, [deps]);

useContext - Access context values
  const value = useContext(MyContext);

useReducer - Complex state management
  const [state, dispatch] = useReducer(reducer, initialState);

useCallback - Memoize functions
  const memoizedFn = useCallback(() => { /* ... */ }, [deps]);

useMemo - Memoize computed values
  const memoizedValue = useMemo(() => computeExpensive(a), [a]);

useRef - Persist values across renders
  const ref = useRef(initialValue);

Includes best practices and common pitfalls to avoid.`,
    readTime: '10 min read',
    tags: ['React', 'Hooks', 'Frontend'],
  },
  {
    id: 3,
    title: 'TypeScript Fundamentals',
    category: 'Articles',
    type: 'Article',
    description: 'Learn TypeScript from scratch with practical examples and real-world applications.',
    content: `Understand TypeScript fundamentals:

1. Type Annotations
   - Basic types: string, number, boolean, null, undefined
   - Arrays and tuples
   - Enums and any type

2. Interfaces
   - Defining object shapes
   - Optional properties
   - Read-only properties

3. Generics
   - Generic functions
   - Generic interfaces
   - Generic constraints

4. Union Types
   - Combining multiple types
   - Type guards and narrowing

5. Advanced Types
   - Type aliases
   - Intersection types
   - Conditional types

Includes migration strategies from JavaScript.`,
    readTime: '25 min read',
    tags: ['TypeScript', 'Types', 'Beginner'],
  },
  {
    id: 4,
    title: 'CSS Flexbox Complete Guide',
    category: 'References',
    type: 'Reference',
    description: 'Complete reference to CSS Flexbox with all properties, values, and practical examples.',
    content: `Master CSS Flexbox layout:

Flex Container Properties:
• display: flex | inline-flex
• flex-direction: row | column | row-reverse | column-reverse
• justify-content: flex-start | center | flex-end | space-between | space-around
• align-items: stretch | flex-start | center | baseline
• flex-wrap: nowrap | wrap | wrap-reverse
• gap: <length>

Flex Item Properties:
• flex: <grow> <shrink> <basis>
• align-self: auto | flex-start | center | flex-end
• order: <integer>

Common Patterns:
• Centering elements
• Equal-height columns
• Responsive navigation
• Holy grail layout`,
    readTime: '20 min read',
    tags: ['CSS', 'Flexbox', 'Layout'],
  },
  {
    id: 5,
    title: 'Git Commands Reference',
    category: 'Guides',
    type: 'Guide',
    description: 'All essential Git commands organized by workflow and use case.',
    content: `Essential Git commands:

Basic Operations:
• git init - Initialize a repository
• git clone <url> - Clone a repository
• git add <file> - Stage changes
• git commit -m "message" - Commit changes
• git push origin <branch> - Push to remote
• git pull - Fetch and merge

Branching:
• git branch - List branches
• git branch <name> - Create branch
• git checkout <branch> - Switch branch
• git merge <branch> - Merge branch
• git rebase <branch> - Rebase branch

Advanced:
• git cherry-pick <commit> - Apply specific commit
• git stash - Temporarily save changes
• git reset --hard <commit> - Reset to commit
• git revert <commit> - Undo a commit

Includes branching strategies and troubleshooting.`,
    readTime: '15 min read',
    tags: ['Git', 'Version Control', 'DevOps'],
  },
  {
    id: 6,
    title: 'REST API Design Best Practices',
    category: 'Articles',
    type: 'Article',
    description: 'How to design RESTful APIs that are scalable, maintainable, and developer-friendly.',
    content: `REST API design principles:

1. Resource Naming
   - Use nouns, not verbs
   - Use plural for collections
   - Use lowercase with hyphens

2. HTTP Methods
   - GET: Retrieve resources
   - POST: Create new resources
   - PUT: Update entire resource
   - PATCH: Partial update
   - DELETE: Remove resources

3. Status Codes
   - 200 OK - Success
   - 201 Created - Resource created
   - 400 Bad Request - Invalid input
   - 401 Unauthorized - Not authenticated
   - 403 Forbidden - No permission
   - 404 Not Found - Resource missing
   - 500 Internal Server Error

4. Versioning, Pagination, Filtering
5. Authentication and Rate Limiting
6. Documentation with OpenAPI/Swagger`,
    readTime: '20 min read',
    tags: ['API', 'REST', 'Backend'],
  },
  {
    id: 7,
    title: 'VS Code Extensions Guide',
    category: 'Guides',
    type: 'Guide',
    description: 'Boost your productivity with essential VS Code extensions and configurations.',
    content: `Essential VS Code extensions:

Code Quality:
• ESLint - JavaScript linting
• Prettier - Code formatting
• SonarLint - Code quality analysis

Language Support:
• TypeScript Hero - TS imports organization
• Python - Python language support
• Rust Analyzer - Rust language support

Productivity:
• GitLens - Enhanced Git integration
• Path Intellisense - Auto-complete paths
• Bracket Pair Colorizer - Color-matched brackets
• TODO Highlight - Highlight TODO comments

Themes:
• One Dark Pro
• Dracula Official
• GitHub Dark

Learn to customize keybindings and settings for maximum efficiency.`,
    readTime: '12 min read',
    tags: ['VS Code', 'Productivity', 'Tools'],
  },
  {
    id: 8,
    title: 'System Design Interview Guide',
    category: 'Guides',
    type: 'Guide',
    description: 'Complete guide to ace your system design interviews at top tech companies.',
    content: `System design fundamentals:

1. Requirements Gathering
   - Functional requirements
   - Non-functional requirements (scale, latency, availability)

2. Core Concepts
   - Load Balancing - Distribute traffic
   - Caching - Reduce database load
   - Database Types - SQL vs NoSQL
   - Replication - Data redundancy
   - Sharding - Horizontal partitioning

3. Architecture Patterns
   - Monolithic vs Microservices
   - Event-driven architecture
   - Message queues (Kafka, RabbitMQ)

4. CAP Theorem
   - Consistency, Availability, Partition Tolerance

5. Common Interview Questions
   - Design Twitter
   - Design URL shortener
   - Design a chat application

Includes practice problems and solutions.`,
    readTime: '45 min read',
    tags: ['System Design', 'Interview', 'Architecture'],
  },
  {
    id: 9,
    title: 'HTML5 Semantic Elements',
    category: 'References',
    type: 'Reference',
    description: 'All HTML5 semantic elements with proper usage and accessibility considerations.',
    content: `HTML5 semantic elements guide:

Document Structure:
• <header> - Introductory content or navigation
• <nav> - Navigation links
• <main> - Main content of the document
• <article> - Self-contained content
• <section> - Thematic grouping of content
• <aside> - Content tangentially related
• <footer> - Footer for its nearest ancestor

Text Content:
• <figure> - Illustration or diagram
• <figcaption> - Caption for figure
• <time> - Date/time value
• <mark> - Highlighted text
• <details> - Disclosure widget

Accessibility Best Practices:
• Use proper heading hierarchy (h1-h6)
• Add alt text to images
• Use ARIA labels when needed
• Ensure keyboard navigation works`,
    readTime: '10 min read',
    tags: ['HTML5', 'Semantics', 'Accessibility'],
  },
  {
    id: 10,
    title: 'Developer Portfolio Best Practices',
    category: 'Articles',
    type: 'Article',
    description: 'How to build a standout developer portfolio that gets you hired.',
    content: `Build a standout developer portfolio:

1. Project Selection
   - Show diversity (frontend, backend, full-stack)
   - Include personal projects you're passionate about
   - Quality over quantity (3-5 strong projects)

2. Project Presentation
   - Clear project descriptions
   - Technologies used
   - Live demo links
   - GitHub repository links
   - Screenshots and videos

3. About Section
   - Your story and journey
   - Skills and technologies
   - What you're looking for

4. Contact Information
   - Email address
   - LinkedIn profile
   - GitHub profile
   - Optional: Twitter, blog

Common Mistakes to Avoid:
• Broken links
• Outdated projects
• No contact information
• Poor mobile experience`,
    readTime: '15 min read',
    tags: ['Career', 'Portfolio', 'Job Search'],
  },
  {
    id: 11,
    title: 'Node.js Performance Optimization',
    category: 'Documentation',
    type: 'Documentation',
    description: 'Advanced techniques for optimizing Node.js application performance.',
    content: `Node.js performance optimization:

1. Clustering
   - Use cluster module for multi-core utilization
   - PM2 for process management

2. Worker Threads
   - Offload CPU-intensive tasks
   - Share memory between threads

3. Caching Strategies
   - Redis for session and data caching
   - In-memory caching with node-cache

4. Database Optimization
   - Use indexes effectively
   - Connection pooling
   - Query optimization

5. Memory Management
   - Avoid memory leaks
   - Use proper garbage collection
   - Monitor heap usage

6. Profiling Tools
   - Node.js built-in profiler
   - clinic.js for diagnostics
   - APM tools (New Relic, DataDog)`,
    readTime: '35 min read',
    tags: ['Node.js', 'Performance', 'Backend'],
  },
  {
    id: 12,
    title: 'SQL Query Optimization',
    category: 'Cheat Sheets',
    type: 'Cheat Sheet',
    description: 'Quick reference for writing efficient SQL queries and optimizing database performance.',
    content: `SQL optimization techniques:

1. Index Usage
   - Create indexes on WHERE, JOIN, ORDER BY columns
   - Avoid over-indexing (slows writes)
   - Use composite indexes wisely

2. Query Planning
   - Use EXPLAIN to analyze queries
   - Look for full table scans
   - Optimize JOIN operations

3. JOIN Optimization
   - Use appropriate JOIN types
   - Ensure JOIN columns are indexed
   - Avoid unnecessary JOINs

4. Subquery vs CTE
   - CTEs often more readable
   - Subqueries may be optimized better
   - Test both approaches

5. Window Functions
   - ROW_NUMBER(), RANK(), DENSE_RANK()
   - PARTITION BY for grouping
   - ORDER BY within windows

6. Common Anti-patterns
   - SELECT * (fetch only needed columns)
   - N+1 queries (use JOINs or batch)
   - Missing WHERE clause filters`,
    readTime: '20 min read',
    tags: ['SQL', 'Database', 'Performance'],
  },
];

const typeIcons = {
  Documentation: BookOpen,
  'Cheat Sheet': FileCode,
  Article: FileText,
  Reference: BookOpen,
  Guide: FileText,
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered = resources.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type: ResourceType) => {
    switch (type) {
      case 'Documentation': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Cheat Sheet': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'Article': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'Reference': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'Guide': return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Resources</h1>
          <p className="text-gray-400">Documentation, cheat sheets, articles, and developer references.</p>
        </div>

        {/* Search - Mobile optimized */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[48px] pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d4ff] transition"
            />
          </div>
        </div>

        {/* Categories - Mobile optimized horizontal scroll */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 mr-2 flex-shrink-0">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Categories:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg transition min-h-[44px] active:scale-[0.95] ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedResource ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-8">
            {/* Back Button - Mobile optimized */}
            <button
              onClick={() => setSelectedResource(null)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white active:scale-95 transition-all min-h-[44px] px-4 py-2 -ml-2 mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Resources</span>
            </button>
            
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getTypeColor(selectedResource.type)}`}>
                  {selectedResource.type}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedResource.readTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{selectedResource.title}</h2>
              <p className="text-gray-400 mb-6">{selectedResource.description}</p>
              
              <div className="bg-[#0d0d1a] border border-white/5 rounded-xl p-4 sm:p-6 mb-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {selectedResource.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {selectedResource.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons - Mobile optimized */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
              <button
                className="flex-1 flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                Open Full Resource
              </button>
              <button
                className="flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-semibold hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all"
              >
                <Bookmark className="h-4 w-4" />
                Save for Later
              </button>
            </div>
          </div>
        ) : (
          /* Resources Grid - Mobile responsive */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type] || BookOpen;
              return (
                <div
                  key={resource.id}
                  onClick={() => setSelectedResource(resource)}
                  className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 hover:border-white/20 active:bg-white/[0.07] transition-all cursor-pointer group min-h-[200px] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="h-8 w-8 text-[#00d4ff]" />
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/5 text-gray-500 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">{resource.readTime}</span>
                    <span className="text-xs text-[#00d4ff] flex items-center gap-1">
                      Read more
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && !selectedResource && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No resources found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}