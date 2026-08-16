/**
 * Infinity Code - Career Development Page
 * Career growth tools: job board, resume builder, interview prep, GitHub integration
 */

import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export default function CareerPage() {
  const { user } = useAuth();

  const careerTools = [
    {
      icon: '📄',
      title: 'Resume Builder',
      desc: 'Create a developer-focused resume from your Infinity Code activity, projects, and skills.',
      link: '/profile',
      cta: 'Build Resume',
    },
    {
      icon: '🔗',
      title: 'GitHub Integration',
      desc: 'Connect your GitHub account to showcase repositories, contributions, and open-source work.',
      link: '/settings',
      cta: 'Connect GitHub',
    },
    {
      icon: '💼',
      title: 'Job Board',
      desc: 'Browse developer job listings matched to your skills, completed courses, and project history.',
      link: '/career',
      cta: 'View Jobs',
    },
    {
      icon: '🎤',
      title: 'Interview Prep',
      desc: 'Practice coding interview questions with AI feedback and track your readiness score.',
      link: '/challenges',
      cta: 'Start Practising',
    },
    {
      icon: '🛤️',
      title: 'Career Paths',
      desc: 'Follow structured career roadmaps — Frontend, Backend, Full-Stack, DevOps, and more.',
      link: '/learning-hub',
      cta: 'Explore Paths',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Career{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              Development
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Turn your coding skills into a career. Build your resume, connect GitHub, prepare for
            interviews, and find developer jobs — all in one place.
          </p>
        </div>

        {/* Career Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {careerTools.map((tool) => (
            <div
              key={tool.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{tool.desc}</p>
              <Link
                to={tool.link}
                className="inline-block text-sm text-[#00d4ff] hover:underline"
              >
                {tool.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0d0d1a] to-[#0a0a0f] border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to level up your career?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Complete courses, build projects, and earn certificates — then turn them into a
            professional portfolio and resume.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/learning-hub"
              className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Start Learning →
            </Link>
            <Link
              to="/portfolio"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}