/**
 * Infinity Code - Resources Page
 * Documentation, cheat sheets, articles, and developer references
 */

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  FileText,
  FileCode,
  Search,
  Filter,
  ExternalLink,
  Download,
  Bookmark,
  Clock,
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
    content: 'This extensive documentation covers variables, data types, operators, control structures, functions, objects, arrays, promises, async/await, modules, and more. Perfect for both beginners and experienced developers.',
    readTime: '30 min read',
    tags: ['JavaScript', 'Reference', 'ES6+'],
  },
  {
    id: 2,
    title: 'React Hooks Cheat Sheet',
    category: 'Cheat Sheets',
    type: 'Cheat Sheet',
    description: 'Quick reference for all React hooks with syntax examples and common patterns.',
    content: 'Complete guide to useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, and custom hooks. Includes best practices and common pitfalls to avoid.',
    readTime: '10 min read',
    tags: ['React', 'Hooks', 'Frontend'],
  },
  {
    id: 3,
    title: 'TypeScript Fundamentals',
    category: 'Articles',
    type: 'Article',
    description: 'Learn TypeScript from scratch with practical examples and real-world applications.',
    content: 'Understand type annotations, interfaces, generics, enums, union types, type guards, and advanced type manipulation. Includes migration strategies from JavaScript.',
    readTime: '25 min read',
    tags: ['TypeScript', 'Types', 'Beginner'],
  },
  {
    id: 4,
    title: 'CSS Flexbox Complete Guide',
    category: 'References',
    type: 'Reference',
    description: 'Complete reference to CSS Flexbox with all properties, values, and practical examples.',
    content: 'Master flexbox layout with detailed explanations of flex-container and flex-item properties. Includes common patterns like centering, equal-height columns, and responsive navigation.',
    readTime: '20 min read',
    tags: ['CSS', 'Flexbox', 'Layout'],
  },
  {
    id: 5,
    title: 'Git Commands Reference',
    category: 'Guides',
    type: 'Guide',
    description: 'All essential Git commands organized by workflow and use case.',
    content: 'From basic commits to advanced rebasing, cherry-picking, and conflict resolution. Includes branching strategies, remote operations, and troubleshooting common issues.',
    readTime: '15 min read',
    tags: ['Git', 'Version Control', 'DevOps'],
  },
  {
    id: 6,
    title: 'REST API Design Best Practices',
    category: 'Articles',
    type: 'Article',
    description: 'How to design RESTful APIs that are scalable, maintainable, and developer-friendly.',
    content: 'Learn about resource naming, HTTP methods, status codes, versioning, pagination, filtering, authentication, rate limiting, and documentation. Includes real-world examples.',
    readTime: '20 min read',
    tags: ['API', 'REST', 'Backend'],
  },
  {
    id: 7,
    title: 'VS Code Extensions Guide',
    category: 'Guides',
    type: 'Guide',
    description: 'Boost your productivity with essential VS Code extensions and configurations.',
    content: 'Discover extensions for linting, formatting, debugging, Git integration, snippets, themes, and language support. Learn to customize keybindings and settings for maximum efficiency.',
    readTime: '12 min read',
    tags: ['VS Code', 'Productivity', 'Tools'],
  },
  {
    id: 8,
    title: 'System Design Interview Guide',
    category: 'Guides',
    type: 'Guide',
    description: 'Complete guide to ace your system design interviews at top tech companies.',
    content: 'Learn to design scalable systems with coverage of load balancing, caching, databases, microservices, message queues, and CAP theorem. Includes practice problems and solutions.',
    readTime: '45 min read',
    tags: ['System Design', 'Interview', 'Architecture'],
  },
  {
    id: 9,
    title: 'HTML5 Semantic Elements',
    category: 'References',
    type: 'Reference',
    description: 'All HTML5 semantic elements with proper usage and accessibility considerations.',
    content: 'Understand when to use header, nav, main, article, section, aside, footer, and other semantic elements. Includes accessibility best practices and SEO implications.',
    readTime: '10 min read',
    tags: ['HTML5', 'Semantics', 'Accessibility'],
  },
  {
    id: 10,
    title: 'Developer Portfolio Best Practices',
    category: 'Articles',
    type: 'Article',
    description: 'How to build a standout developer portfolio that gets you hired.',
    content: 'Learn what projects to showcase, how to write compelling descriptions, organize your work, and present your skills. Includes examples of successful portfolios and common mistakes to avoid.',
    readTime: '15 min read',
    tags: ['Career', 'Portfolio', 'Job Search'],
  },
  {
    id: 11,
    title: 'Node.js Performance Optimization',
    category: 'Documentation',
    type: 'Documentation',
    description: 'Advanced techniques for optimizing Node.js application performance.',
    content: 'Cover clustering, worker threads, caching strategies, database optimization, memory management, and profiling tools. Includes real-world case studies and benchmarks.',
    readTime: '35 min read',
    tags: ['Node.js', 'Performance', 'Backend'],
  },
  {
    id: 12,
    title: 'SQL Query Optimization',
    category: 'Cheat Sheets',
    type: 'Cheat Sheet',
    description: 'Quick reference for writing efficient SQL queries and optimizing database performance.',
    content: 'Index usage, query planning, JOIN optimization, subquery vs CTE, window functions, and common anti-patterns. Includes examples for PostgreSQL, MySQL, and SQL Server.',
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
      case 'Documentation': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Cheat Sheet': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Article': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Reference': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Guide': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Resources</h1>
          <p className="text-slate-400">Documentation, cheat sheets, articles, and developer references.</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex items-center gap-2 mr-4">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-400">Categories:</span>
          </div>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Content */}
        {selectedResource ? (
          <Card className="bg-slate-900/50 border-slate-800 mb-8">
            <CardContent className="p-6 space-y-6">
              <Button
                variant="outline"
                onClick={() => setSelectedResource(null)}
                className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ← Back to Resources
              </Button>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getTypeColor(selectedResource.type)}>
                    {selectedResource.type}
                  </Badge>
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedResource.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedResource.title}</h2>
                <p className="text-slate-400 mb-6">{selectedResource.description}</p>
                
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedResource.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedResource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full Resource
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type] || BookOpen;
              return (
                <Card
                  key={resource.id}
                  className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                  onClick={() => setSelectedResource(resource)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="h-8 w-8 text-blue-400" />
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xs text-slate-500">{resource.readTime}</span>
                      <span className="text-xs text-blue-400 flex items-center gap-1">
                        Read more
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && !selectedResource && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No resources found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}