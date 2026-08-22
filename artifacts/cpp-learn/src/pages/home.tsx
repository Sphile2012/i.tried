/**
 * Infinity Code - Redesigned Homepage
 * Learn code. Practise code. Build projects. Prove your skills. Grow as a developer.
 */

import { useState, useEffect, Suspense } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import InfinitySymbol3D from '@/components/InfinitySymbol3D';

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [typedCode, setTypedCode] = useState('');
  const fullCode = `function growAsDeveloper() {
  const path = ["learn", "practise", "build", "prove"];
  return path.map(step => step + " -> growth");
}

// Start your journey today
console.log(growAsDeveloper());`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullCode.length) {
        setTypedCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[120px]" />

      {/* 3D Infinity Symbol Background */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={null}>
          <InfinitySymbol3D />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Now supporting 6 programming languages
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Learn code. Practise code.
              <br />
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
                Build projects. Prove your skills.
              </span>
              <br />
              Grow as a developer.
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Infinity Code gives you everything you need to learn programming, practise your skills,
              solve coding challenges, build real-world projects, and grow as a developer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/lessons"
                className="px-6 py-3 text-center bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-[#00d4ff]/20"
              >
                Start Learning
              </Link>
              <Link
                to="/playground"
                className="px-6 py-3 text-center bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Try Code Editor
              </Link>
            </div>
          </div>

          {/* Right: Code Editor Preview */}
          <div className="relative">
            <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Editor header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-gray-500 ml-2">growAsDeveloper.ts</span>
              </div>
              {/* Code content */}
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto min-h-[300px]">
                <code>
                  {typedCode.split('\n').map((line, i) => (
                    <div key={i}>
                      <span className="text-gray-600 mr-4 select-none">{(i + 1).toString().padStart(2, ' ')}</span>
                      <span>{line}</span>
                      {typedCode.length < fullCode.length && i === typedCode.split('\n').length - 1 && (
                        <span className="inline-block w-2 h-4 bg-[#00d4ff] animate-pulse ml-0.5" />
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// STATISTICS SECTION
// ============================================
function StatsSection() {
    const stats = [
      { value: '6', label: 'Programming Languages Supported' },
      { value: '36+', label: 'Learning Topic Categories' },
      { value: 'Free', label: 'Core Platform Features' },
      { value: '24/7', label: 'AI Tutor Availability' },
    ];

  return (
    <section className="py-12 md:py-16 bg-[#0d0d1a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES SECTION
// ============================================
function FeaturesSection() {
  const features = [
    {
      title: 'Learning',
      desc: 'Master programming through structured lessons, tutorials, and real-world examples across 36+ topic categories.',
      link: '/learning-hub',
    },
    {
      title: 'Interactive Coding',
      desc: 'Write and practise code using an interactive browser-based code editor with live output.',
      link: '/playground',
    },
    {
      title: 'Coding Challenges',
      desc: 'Solve programming problems, earn XP, and receive instant feedback on your solutions.',
      link: '/challenges',
    },
    {
      title: 'Progress Tracking',
      desc: 'Monitor lessons completed, challenges solved, coding time, and skill growth over time.',
      link: '/dashboard',
    },
    {
      title: 'Achievements & XP',
      desc: 'Unlock badges, earn XP, level up, and climb the leaderboard as you learn and build.',
      link: '/achievements',
    },
    {
      title: 'Infinity AI',
      desc: 'Get personalised learning assistance, code reviews, and study plans powered by AI.',
      link: '/ai-tutor',
    },
    {
      title: 'Developer Community',
      desc: 'Interact with other developers, share projects, ask questions, and participate in discussions.',
      link: '/community',
    },
    {
      title: 'Documentation & Resources',
      desc: 'Access documentation, cheat sheets, tutorials, flashcards, and a programming glossary.',
      link: '/resources',
    },
    {
      title: 'Career Development',
      desc: 'Browse developer jobs, follow career roadmaps, and prepare for coding interviews.',
      link: '/career',
    },
    {
      title: 'Developer Portfolio',
      desc: 'Build a shareable portfolio page that showcases your projects, skills, and achievements.',
      link: '/portfolio',
    },
    {
      title: 'GitHub Integration',
      desc: 'Connect your GitHub account to showcase repositories, contributions, and open-source work.',
      link: '/settings',
    },
    {
      title: 'Resume Builder',
      desc: 'Generate a polished, developer-focused resume from your Infinity Code activity in one click.',
      link: '/profile',
    },
    {
      title: 'Learning Goals',
      desc: 'Set personalised learning goals and track your progress toward achieving them.',
      link: '/dashboard',
    },
    {
      title: 'Coding Streaks',
      desc: 'Build daily coding habits with streak tracking that keeps you motivated and consistent.',
      link: '/dashboard',
    },
    {
      title: 'Skill Tree',
      desc: 'Visualise your proficiency across languages, frameworks, and tools with an interactive skill tree.',
      link: '/portfolio',
    },
    {
      title: 'Notes & Bookmarks',
      desc: 'Take notes on lessons, bookmark important content, and build your personal knowledge base.',
      link: '/lessons',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              Grow as a Developer
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn code. Practise code. Build projects. Prove your skills. Grow as a developer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LEARNING PATHS SECTION
// ============================================
function LearningPathsSection() {
  const paths = [
    {
      title: 'Beginner',
      level: 'Start Here',
      color: 'from-green-500 to-emerald-500',
      topics: ['Programming Fundamentals', 'Variables & Data Types', 'Operators & Conditions', 'Loops & Functions', 'Arrays & Objects', 'Error Handling'],
    },
    {
      title: 'Web Development',
      level: 'Frontend Focus',
      color: 'from-blue-500 to-cyan-500',
      topics: ['HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'REST APIs', 'Git & GitHub'],
    },
    {
      title: 'Backend Development',
      level: 'Server Side',
      color: 'from-purple-500 to-pink-500',
      topics: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Databases', 'Security'],
    },
    {
      title: 'Advanced Development',
      level: 'Level Up',
      color: 'from-orange-500 to-red-500',
      topics: ['TypeScript Advanced', 'React Architecture', 'State Management', 'Testing', 'Performance', 'Deployment'],
    },
  ];

  return (
    <section className="py-20 bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Learning Paths</h2>
          <p className="text-gray-400">Structured learning journeys from beginner to advanced.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => (
            <div
              key={path.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{path.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${path.color} text-white font-medium`}>
                  {path.level}
                </span>
              </div>
              <ul className="space-y-2">
                {path.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-[#00d4ff]">--</span>
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                to="/learning-hub"
                className="mt-4 inline-block text-sm text-[#00d4ff] hover:underline"
              >
                Start Learning
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CODING STUDIO PREVIEW
// ============================================
function CodeStudioPreview() {
  return (
    <section className="py-20 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Interactive{' '}
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
                Coding Studio
              </span>
            </h2>
            <p className="text-gray-400 mb-6">
              Write, run, and debug code directly in your browser. With syntax highlighting,
              file management, console output, and test cases -- it is a full development environment.
            </p>
            <ul className="space-y-3 mb-8">
              {['Syntax highlighting', 'Multiple file support', 'Console output', 'Test cases', 'Auto-save', 'Dark/light themes'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] text-xs">+</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/playground"
              className="inline-block px-4 sm:px-6 py-3 text-center bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl text-sm sm:text-base font-semibold hover:opacity-90 transition"
            >
              Open Code Studio
            </Link>
          </div>

          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-gray-500 ml-2">solution.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{`// Find the factorial of a number
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Test
console.log(factorial(5)); // Output: 120`}</code>
            </pre>
            <div className="px-4 py-3 bg-[#0a0a0f] border-t border-white/5">
              <div className="text-xs text-gray-500 mb-1">Console Output:</div>
              <div className="text-sm text-green-400 font-mono">120</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CHALLENGES PREVIEW
// ============================================
function ChallengesPreview() {
  const challenges = [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Algorithms' },
    { title: 'Reverse String', difficulty: 'Easy', category: 'Strings' },
    { title: 'Binary Search', difficulty: 'Medium', category: 'Algorithms' },
    { title: 'Valid Parentheses', difficulty: 'Medium', category: 'Stack' },
  ];

  return (
    <section className="py-20 bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Coding Challenges</h2>
          <p className="text-gray-400">Solve problems, earn XP, and climb the leaderboard.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {challenges.map((ch) => (
            <div
              key={ch.title}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-white">{ch.title}</h3>
                <p className="text-xs text-gray-500">{ch.category}</p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  ch.difficulty === 'Easy'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {ch.difficulty}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/challenges"
            className="inline-block px-4 sm:px-6 py-3 text-center bg-white/5 border border-white/10 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-white/10 transition"
          >
            View All Challenges
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ACHIEVEMENTS PREVIEW
// ============================================
function AchievementsPreview() {
  const achievements = [
    { title: 'First Code', desc: 'Complete your first coding exercise' },
    { title: 'Code Streak', desc: 'Code for seven consecutive days' },
    { title: 'First Project', desc: 'Create your first project' },
    { title: 'Builder', desc: 'Complete five projects' },
    { title: 'Problem Solver', desc: 'Complete 50 challenges' },
    { title: 'TypeScript Master', desc: 'Complete the TypeScript path' },
  ];

  return (
    <section className="py-20 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Earn Achievements</h2>
          <p className="text-gray-400">Unlock badges and climb the ranks as you learn and build.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/[0.07] transition"
            >
              <h3 className="text-sm font-semibold text-white mb-1">{ach.title}</h3>
              <p className="text-xs text-gray-500">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-6 font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
          IC
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
          Ready to Grow as a Developer?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Learn code. Practise code. Build projects. Prove your skills. Grow as a developer.
          Start your journey with Infinity Code today.
        </p>
        <Link
          to="/lessons"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-center bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-bold text-base sm:text-lg hover:opacity-90 transition shadow-lg shadow-[#00d4ff]/20"
        >
          Start Learning
        </Link>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  const sections = [
    {
      title: 'Platform',
      links: [
        { label: 'Learn', path: '/learning-hub' },
        { label: 'Code', path: '/playground' },
        { label: 'Challenges', path: '/challenges' },
        { label: 'Community', path: '/community' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', path: '/resources' },
        { label: 'Tutorials', path: '/learning-hub' },
        { label: 'GitHub', path: 'https://github.com/Sphile2012/Cpp-EduHub' },
        { label: 'Help', path: '/about' },
      ],
    },
    {
      title: 'Career',
      links: [
        { label: 'Career Development', path: '/career' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Resume Builder', path: '/profile' },
        { label: 'GitHub Integration', path: '/settings' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/about' },
        { label: 'Privacy', path: '/about' },
        { label: 'Terms', path: '/about' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
                IC
              </span>
              <span className="text-lg font-bold text-white">Infinity Code</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Learn code. Practise code. Build projects. Prove your skills. Grow as a developer.</p>
            <div className="flex gap-3">
              {['GitHub', 'LinkedIn', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-600">
            (c) {new Date().getFullYear()} Infinity Code. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// ABOUT PAGE
// ============================================
export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">IC</div>
          <h1 className="text-4xl font-bold text-white mb-4">About Infinity Code</h1>
          <p className="text-gray-400 text-lg">
            Learn code. Practise code. Build projects. Prove your skills. Grow as a developer.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-gray-400">
              To empower learners worldwide with the tools and knowledge needed to become proficient developers,
              from writing their first line of code to building real-world software projects.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-gray-400">
              To create a complete developer ecosystem where learning, coding, challenges, projects, progress,
              and community come together in one focused platform.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Supabase'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <LearningPathsSection />
      <CodeStudioPreview />
      <ChallengesPreview />
      <AchievementsPreview />
      <CTASection />
      <Footer />
    </div>
  );
}