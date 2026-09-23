/**
 * Infinity Code - Homepage (Matches Prototype)
 * Simple, clean design focused on getting started
 */

import { Link } from 'wouter';
import { Code2, BookOpen, Zap, CheckCircle2 } from 'lucide-react';

const languages = [
  { name: 'C++', color: '#00599C' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#007396' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'C#', color: '#239120' },
  { name: 'React', color: '#61DAFB' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A1931] via-[#0D2447] to-[#0A1931] text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-full text-[#38BDF8] text-sm font-semibold mb-6">
            100% FREE
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Learn to code with Phume —<br />
            seven languages, zero cost.
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Infinity Code takes you from your first line of code to a finished project — in C++, Python, Java, JavaScript, TypeScript, C#, or React. Free, forever.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <a className="px-8 py-4 bg-[#38BDF8] text-white rounded-xl font-bold text-lg hover:bg-[#0EA5E9] transition shadow-lg hover:shadow-xl">
                Start Learning Free
              </a>
            </Link>
            <Link href="/login">
              <a className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition">
                I have an account
              </a>
            </Link>
          </div>
        </div>

        {/* Code Preview */}
        <div className="max-w-4xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-[#0A1931]/80 backdrop-blur border border-white/10 rounded-2xl p-6 font-mono text-sm">
            <div className="text-gray-400 mb-2">// Loops.cpp</div>
            <div className="text-white">
              <span className="text-purple-400">for</span> (<span className="text-blue-400">int</span> i = <span className="text-orange-400">0</span>; i &lt; <span className="text-orange-400">5</span>; i++) {'{\n'}
              <span className="ml-4">cout &lt;&lt; <span className="text-green-400">"Learning C++"</span>;</span>
              {'\n}'}
            </div>
          </div>
          
          <div className="bg-[#0A1931]/80 backdrop-blur border border-white/10 rounded-2xl p-6 font-mono text-sm">
            <div className="text-gray-400 mb-2"># app.py</div>
            <div className="text-white">
              <span className="text-purple-400">def</span> <span className="text-blue-400">greet</span>(name):{'\n'}
              <span className="ml-4"><span className="text-purple-400">return</span> <span className="text-green-400">f"Hi {'{name}'}"</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Pick a Language Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0A1931] mb-12">
            Pick a language, any language
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang) => (
              <Link key={lang.name} href="/browse">
                <a 
                  className="px-8 py-4 bg-[#F5F7FF] border-2 border-[#0A1931]/10 rounded-xl font-bold text-lg text-[#0A1931] hover:border-[#38BDF8] hover:bg-[#38BDF8]/5 transition"
                  style={{ borderLeftColor: lang.color, borderLeftWidth: '4px' }}
                >
                  {lang.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F5F7FF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1931] mb-4">
              How Infinity Code works
            </h2>
            <p className="text-xl text-[#0A1931]/70">
              One simple loop, every lesson: learn → practise → test → track.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#0A1931]/10">
              <div className="w-14 h-14 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#38BDF8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1931] mb-4">Learn</h3>
              <p className="text-[#0A1931]/70">
                Short, plain-language lessons that explain one concept at a time before you touch a keyboard.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-[#0A1931]/10">
              <div className="w-14 h-14 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-[#38BDF8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1931] mb-4">Practise</h3>
              <p className="text-[#0A1931]/70">
                Write and run real code in the browser, in the language you're learning, with instant feedback.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-[#0A1931]/10">
              <div className="w-14 h-14 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-[#38BDF8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1931] mb-4">Track</h3>
              <p className="text-[#0A1931]/70">
                Every lesson, quiz and project is saved, so you always know exactly where you left off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1931] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            No plans. No trials. No card.
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Every course, every language, every exercise — free for everyone.
          </p>
          
          <Link href="/signup">
            <a className="inline-block px-10 py-5 bg-[#38BDF8] text-white rounded-xl font-bold text-xl hover:bg-[#0EA5E9] transition shadow-lg hover:shadow-xl">
              Get Started
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
