import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Code2,
  Target,
  Users,
  Zap,
  BookOpen,
  Award,
  Laptop,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Play,
  TrendingUp,
  Gauge,
  Menu,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const whatWeDo = [
  {
    icon: BookOpen,
    title: 'Learn with Real Projects',
    description: 'Build projects like shopping_list.py, not just read theory. Write actual code that works.',
  },
  {
    icon: TrendingUp,
    title: 'Track All Your Languages',
    description: 'C++ 15/25 60% 1200 XP Level 5, Python 3/30, JavaScript and more — see your progress across all languages.',
  },
  {
    icon: Laptop,
    title: 'Code in Browser',
    description: 'Playground with instant output. If code is wrong, errors MUST show with line numbers.',
  },
  {
    icon: Menu,
    title: 'Hamburger Menu Everywhere',
    description: 'Works on all devices with dropdown arrows in everything. Consistent, modern design.',
  },
];

const stats = [
  { label: 'Programming Languages', value: '6+', description: 'C++, Python, JavaScript and all' },
  { label: 'Interactive Lessons', value: '1000+', description: 'Real code, not just reading' },
  { label: 'XP & Levels', value: 'Track All', description: 'Your Languages with Continue buttons' },
  { label: 'Instant Feedback', value: 'Live Code', description: 'Playground shows errors immediately' },
];

const team = [
  {
    role: 'Built for Beginners',
    description: 'From Hello World - Your First Program to pro developer.',
    color: 'from-[#38BDF8] to-[#0A1931]',
  },
  {
    role: 'Navy for Focus',
    description: 'Navy #0A1931 helps you concentrate on code.',
    color: 'from-[#0A1931] to-[#38BDF8]',
  },
  {
    role: 'Light for Clarity',
    description: 'Light #F5F7FF makes content easy to read.',
    color: 'from-[#F5F7FF] to-[#38BDF8]',
  },
  {
    role: 'Sky Blue for Progress',
    description: 'Sky Blue #38BDF8 shows your growth.',
    color: 'from-[#38BDF8] to-[#0A1931]',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A1931] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 py-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#38BDF8]/10 border-2 border-[#38BDF8] mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#38BDF8]">
              <Code2 className="h-8 w-8 text-[#0A1931]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#F5F7FF]">
            About <span className="text-[#38BDF8]">Infinity Code</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F7FF]/80 max-w-3xl mx-auto leading-relaxed font-bold">
            Write real code, not just read it
          </p>
          <p className="text-lg md:text-xl text-[#F5F7FF]/70 max-w-3xl mx-auto leading-relaxed">
            We teach C++, Python, JavaScript and all programming languages in one place.
          </p>
        </motion.section>

        {/* Stats Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-[#F5F7FF] border-2 border-[#38BDF8]/20 hover:border-[#38BDF8] transition-all shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-[#0A1931] mb-2">{stat.value}</p>
                  <p className="text-sm font-semibold text-[#38BDF8] mb-1">{stat.label}</p>
                  <p className="text-xs text-[#0A1931]/60">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#F5F7FF] text-center">Why We Started</h2>
          <div className="max-w-4xl mx-auto bg-[#F5F7FF] rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-lg text-[#0A1931] leading-relaxed mb-6">
              We started because coding courses were boring white paper like your Book page — we made it interactive with Playground where if code is wrong, errors MUST show, and Your Languages tracking with XP, levels, and Continue buttons.
            </p>
            <p className="text-lg text-[#0A1931] leading-relaxed mb-6">
              Traditional courses just show you code. We let you <span className="font-bold text-[#38BDF8]">write real code</span>. When you make a mistake, you see the actual error with line numbers — just like a real developer.
            </p>
            <p className="text-lg text-[#0A1931] leading-relaxed">
              Built for beginners who want to go from Hello World - Your First Program to pro.
            </p>
          </div>
        </motion.section>

        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#F5F7FF]">What We Do</h2>
            <p className="text-[#F5F7FF]/70 max-w-2xl mx-auto">
              Real projects, real tracking, real code in browser
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-[#F5F7FF] border-2 border-[#38BDF8]/20 hover:border-[#38BDF8] transition-all shadow-lg rounded-2xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#38BDF8]">
                        <item.icon className="h-6 w-6 text-[#0A1931]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0A1931]">{item.title}</h3>
                    </div>
                    <p className="text-[#0A1931]/80 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team/Brand Colors Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#F5F7FF]">Our Colors Mean Something</h2>
            <p className="text-[#F5F7FF]/70 max-w-2xl mx-auto">
              Navy #0A1931 for focus, Light #F5F7FF for clarity, Sky Blue #38BDF8 for progress
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full bg-gradient-to-br ${member.color} border-2 border-[#38BDF8] shadow-lg rounded-2xl overflow-hidden`}>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#F5F7FF]">{member.role}</h3>
                    <p className="text-sm text-[#F5F7FF]/80 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features List */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="max-w-4xl mx-auto bg-[#F5F7FF] rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-[#0A1931] mb-8">What Makes Us Different</h2>
            <div className="space-y-4">
              {[
                'Interactive Playground — run code in browser, see errors immediately',
                'Track all languages — C++ 15/25 60% 1200 XP Level 5, Python 3/30, JavaScript',
                'Real projects like shopping_list.py — not boring theory',
                'XP, levels, and Continue buttons — see your progress',
                'Hamburger menu on all devices — consistent design everywhere',
                'Dropdown arrows with rotation — modern UI across all pages',
                'Navy, Light, Sky Blue theme — easy on eyes, built for focus',
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#38BDF8] flex-shrink-0 mt-1" />
                  <p className="text-[#0A1931] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <Card className="bg-[#F5F7FF] border-2 border-[#38BDF8] shadow-xl rounded-2xl">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Rocket className="h-12 w-12 text-[#38BDF8] mx-auto" />
              <h2 className="text-3xl font-bold text-[#0A1931]">Ready to Write Real Code?</h2>
              <p className="text-[#0A1931]/80 max-w-2xl mx-auto text-lg">
                Start with Hello World - Your First Program and track your progress across all languages.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#0A1931] font-bold px-8 rounded-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/lessons">
                  <Button size="lg" className="bg-[#0A1931] hover:bg-[#0A1931]/90 text-[#F5F7FF] font-bold px-8 rounded-lg">
                    Explore Lessons
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}