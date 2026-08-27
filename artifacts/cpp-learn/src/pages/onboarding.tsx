import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Code, Terminal, Monitor, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

type LearningPath = 'python' | 'javascript' | 'scratch';

export default function OnboardingPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const paths = [
    {
      id: 'python' as LearningPath,
      name: 'Python',
      description: 'Perfect for beginners. Build games, websites, and AI projects.',
      icon: Terminal,
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 'javascript' as LearningPath,
      name: 'JavaScript',
      description: 'Create interactive websites and web applications.',
      icon: Code,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      id: 'scratch' as LearningPath,
      name: 'Scratch',
      description: 'Visual programming with drag-and-drop blocks. Great for kids.',
      icon: Monitor,
      color: 'from-blue-500 to-purple-600',
    },
  ];

  const handleGetStarted = () => {
    if (selectedPath) {
      // In a real app, save the selected path to the user's profile
      navigate('/lessons');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {step === 1 && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Welcome to Infinity Code
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Programming is the process of writing instructions that computers execute. You provide step-by-step logic, and the computer follows your commands to build applications.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Hi there! I'm Codey</p>
                      <p className="text-slate-400 text-sm">Your coding guide</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-left">
                    <p className="text-slate-300">
                      I'll be here to help you every step of the way. Ready to start your coding adventure?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Choose Your Learning Path
              </h2>
              <p className="text-slate-400">
                Pick a programming language to start with. You can always learn more later!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {paths.map((path) => (
                <Card
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className={`cursor-pointer transition-all ${
                    selectedPath === path.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                  }`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mx-auto`}>
                      <path.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-white">{path.name}</h3>
                      <p className="text-sm text-slate-400">{path.description}</p>
                    </div>
                    {selectedPath === path.id && (
                      <div className="flex justify-center">
                        <CheckCircle className="h-6 w-6 text-blue-500" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Back
              </Button>
              <Button
                onClick={handleGetStarted}
                disabled={!selectedPath}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg disabled:opacity-50"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}