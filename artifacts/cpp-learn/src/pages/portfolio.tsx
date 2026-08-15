/**
 * Infinity Code - Developer Portfolio Page
 * Showcase projects, skills, certificates, and GitHub contributions
 */

import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export default function PortfolioPage() {
  const { user } = useAuth();

  const portfolioSections = [
    {
      icon: '🌐',
      title: 'Public Portfolio',
      desc: 'A shareable developer portfolio page that displays your projects, skills, and achievements.',
    },
    {
      icon: '🚀',
      title: 'Project Showcase',
      desc: 'Highlight your best projects with descriptions, tech stacks, live demos, and source code links.',
    },
    {
      icon: '🧩',
      title: 'Skill Tree',
      desc: 'Visual skill tree showing your proficiency across languages, frameworks, and tools.',
    },
    {
      icon: '🏅',
      title: 'Certificates & Verification',
      desc: 'Display earned certificates with public verification links for employers and recruiters.',
    },
    {
      icon: '🔗',
      title: 'GitHub Integration',
      desc: 'Auto-sync your GitHub repositories, contribution graph, and pinned projects.',
    },
    {
      icon: '📄',
      title: 'Resume Builder',
      desc: 'Generate a polished, developer-focused resume from your portfolio data in one click.',
    },
  ];

  const featuredProjects = [
    { title: 'Task Manager App', tech: ['React', 'TypeScript', 'Tailwind'], status: 'Live', stars: 42 },
    { title: 'REST API Server', tech: ['Node.js', 'Express', 'PostgreSQL'], status: 'Open Source', stars: 18 },
    { title: 'Weather Dashboard', tech: ['React', 'OpenWeather API'], status: 'Live', stars: 7 },
  ];

  const skills = [
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 65 },
    { name: 'CSS/Tailwind', level: 90 },
    { name: 'Python', level: 50 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Developer{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Build a professional portfolio that showcases your projects, skills, certificates, and
            GitHub contributions — all in one place.
          </p>
        </div>

        {/* Portfolio Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portfolioSections.map((section) => (
            <div
              key={section.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
              <p className="text-sm text-gray-400">{section.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>⭐ {project.stars} stars</span>
                  <Link to="/playground" className="text-[#00d4ff] hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Skill Tree</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0d0d1a] to-[#0a0a0f] border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🌐</div>
          <h2 className="text-2xl font-bold text-white mb-2">Build your developer portfolio</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Complete projects, earn certificates, and connect your GitHub to create a portfolio that
            stands out to employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/playground"
              className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Start Coding →
            </Link>
            <Link
              to="/career"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Career Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}