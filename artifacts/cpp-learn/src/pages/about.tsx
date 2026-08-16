import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Code2,
  Target,
  Lightbulb,
  Users,
  Globe,
  Zap,
  BookOpen,
  Award,
  Laptop,
  Heart,
  Rocket,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
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

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push the boundaries of what\'s possible in online education, incorporating the latest technologies and teaching methodologies.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Every lesson, every challenge, and every feature is crafted with meticulous attention to detail and a commitment to quality.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Learning is better together. We foster a supportive environment where students help each other grow and succeed.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Quality education should be available to everyone, everywhere. We design our platform to be inclusive and accessible.',
  },
  {
    icon: Zap,
    title: 'Practical Focus',
    description: 'We emphasize hands-on learning with real-world projects, ensuring you gain skills that employers actually need.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and that passion shows in every aspect of Infinity Code. Your success is our greatest reward.',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'From programming fundamentals to advanced topics, our carefully structured courses cover everything you need to become a professional developer.',
  },
  {
    icon: Laptop,
    title: 'Interactive Learning',
    description: 'Click on technical terms for instant explanations, write and run code in our playground, and learn by doing with hands-on challenges.',
  },
  {
    icon: Award,
    title: 'Progress Tracking',
    description: 'Earn XP, level up, collect badges, and track your progress with detailed analytics. Stay motivated with visible achievements.',
  },
  {
    icon: Rocket,
    title: 'Career Preparation',
    description: 'Interview questions, real-world projects, and industry insights prepare you for your dream job in tech.',
  },
];

const stats = [
  { label: 'Programming Languages', value: '6+' },
  { label: 'Topics Covered', value: '500+' },
  { label: 'Interactive Lessons', value: '1000+' },
  { label: 'Active Learners', value: '10K+' },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-12"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Code2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Infinity Code</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          We're on a mission to revolutionize how the world learns to code. 
          Infinity Code combines cutting-edge technology with proven educational methods 
          to create the most effective learning experience possible.
        </p>
      </motion.section>

      {/* Stats */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="bg-slate-900/50 border-slate-800 text-center">
              <CardContent className="p-6">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
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
        <h2 className="text-3xl font-bold text-white text-center">Our Story</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Infinity Code was born from a simple observation: traditional coding education 
            often fails to bridge the gap between theory and practice. We saw talented 
            individuals struggling to land their first developer role despite completing 
            numerous courses, and we knew something had to change.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Our founders, themselves self-taught developers who broke into the tech industry, 
            understood that learning to code isn't just about memorizing syntax—it's about 
            developing problem-solving skills, understanding best practices, and building 
            a portfolio that demonstrates real ability.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            That's why we built Infinity Code: an interactive, comprehensive platform that 
            doesn't just teach you to code, but teaches you to think like a developer. 
            With hands-on projects, instant feedback, and a supportive community, we're 
            helping thousands of learners worldwide achieve their dreams of becoming 
            professional software engineers.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              To democratize quality coding education by providing an accessible, 
              engaging, and effective learning platform that empowers anyone, 
              regardless of background, to master programming skills and build 
              a successful career in technology.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Rocket className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              To become the world's most trusted and effective platform for learning 
              to code, where millions of learners transform their lives through 
              technology education, and where the gap between aspiring developers 
              and industry-ready professionals is bridged through innovative, 
              practical, and personalized learning experiences.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Our Values */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-white text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800">
                      <value.icon className="h-5 w-5 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What Makes Us Different */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">What Makes Infinity Code Different</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We've reimagined coding education from the ground up, focusing on what 
            actually works for learners.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Learning Approach */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Our Learning Approach</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We believe in learning by doing. Our methodology is built on proven 
            educational principles that maximize retention and practical skill development.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Learn', description: 'Understand concepts through clear explanations and interactive examples.' },
            { step: '2', title: 'Practice', description: 'Apply knowledge with hands-on coding exercises and challenges.' },
            { step: '3', title: 'Build', description: 'Create real projects that demonstrate your skills and build your portfolio.' },
            { step: '4', title: 'Master', description: 'Deepen understanding through advanced topics and best practices.' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full bg-slate-900/50 border-slate-800">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technologies */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Languages & Technologies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We cover the most in-demand programming languages and frameworks used by 
            top tech companies worldwide.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'React', 'Node.js', 'HTML/CSS', 'Git', 'Docker', 'AWS'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-blue-500/50 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
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
        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-slate-700">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <GraduationCap className="h-12 w-12 text-blue-400 mx-auto" />
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Join thousands of learners who are already building their future with Infinity Code. 
              Start learning today and transform your career.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/lessons">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}