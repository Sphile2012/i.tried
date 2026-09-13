/**
 * Infinity Code - Homepage
 * Learn to code by shipping things
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Trophy, Flame, Target, CheckCircle, Play } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

// ============================================
// WELCOME BANNER (Authenticated Users)
// ============================================
function WelcomeBanner() {
  const { user } = useAuth();
  const streak = 3; // This would come from user data

  return (
    <div className="bg-gradient-to-r from-[#0A1931] to-[#0D2447] text-[#F5F7FF] py-8 border-b border-[#F5F7FF]/10">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0] || 'there'}!</h2>
            <p className="flex items-center gap-2 text-[#F5F7FF]/90">
              <Flame className="w-5 h-5 text-orange-400" />
              Keep learning, you're on a {streak}-day streak
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/lessons">
              <a className="px-5 py-2.5 bg-[#38BDF8] text-white rounded-lg font-semibold hover:bg-[#0EA5E9] hover:shadow-lg transition">
                Continue Learning
              </a>
            </Link>
            <Link href="/browse">
              <a className="px-5 py-2.5 bg-[#F5F7FF]/10 backdrop-blur text-[#F5F7FF] border border-[#F5F7FF]/30 rounded-lg font-semibold hover:bg-[#F5F7FF]/20 transition">
                Browse All Courses
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// LEARNING TRACKS
// ============================================
function LearningTracks() {
  const tracks = [
    { level: 'Beginner', progress: 35, color: 'from-green-500 to-emerald-600', lessons: '12/35', xp: 450 },
    { level: 'Intermediate', progress: 60, color: 'from-blue-500 to-indigo-600', lessons: '15/25', xp: 1200 },
    { level: 'Expert', progress: 10, color: 'from-purple-500 to-pink-600', lessons: '3/30', xp: 1500 },
  ];

  return (
    <section className="py-12 bg-[#0A1931]">
      <div className="max-w-[1160px] mx-auto px-8">
        <h3 className="text-2xl font-bold text-[#F5F7FF] mb-6">Learning Tracks</h3>
        <div className="grid md:grid-cols-3 gap-5">
          {tracks.map((track) => (
            <div key={track.level} className="bg-[#F5F7FF] rounded-xl p-6 border border-[#F5F7FF]/20 hover:border-[#38BDF8] transition-all hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)]">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} mb-4`} />
              <h4 className="font-bold text-lg mb-3 text-[#0A1931]">{track.level}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0A1931]/60">Progress</span>
                  <span className="font-mono font-bold text-[#0A1931]">{track.lessons}</span>
                </div>
                <div className="h-2 bg-[#0A1931]/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#38BDF8]" style={{ width: `${track.progress}%` }} />
                </div>
                <div className="text-right text-xs font-bold text-[#38BDF8]">{track.progress}%</div>
              </div>
              <div className="text-sm text-[#0A1931]/60">
                <span className="font-mono font-bold text-[#0A1931]">{track.xp} XP</span> earned
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// YOUR LANGUAGES SECTION
// ============================================
function YourLanguages() {
  const languages = [
    {
      name: 'C++',
      icon: '++',
      totalXp: 1200,
      level: 5,
      lessonsCompleted: 15,
      totalLessons: 25,
      isPrimary: true,
      color: 'from-[#00599C] to-[#004482]',
    },
    {
      name: 'Python',
      icon: 'Py',
      totalXp: 1500,
      level: 6,
      lessonsCompleted: 3,
      totalLessons: 30,
      isPrimary: false,
      color: 'from-[#3776AB] to-[#FFD43B]',
    },
  ];

  return (
    <section className="py-12 bg-[#0D2447]">
      <div className="max-w-[1160px] mx-auto px-8">
        <h3 className="text-2xl font-bold text-[#F5F7FF] mb-6">Your Languages</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang) => {
            const progressPercent = Math.round((lang.lessonsCompleted / lang.totalLessons) * 100);
            
            return (
              <div
                key={lang.name}
                className="relative bg-[#F5F7FF] rounded-xl p-7 border border-[#F5F7FF]/20 hover:border-[#38BDF8] transition-all hover:shadow-[0_4px_20px_rgba(56,189,248,0.2)]"
              >
                {lang.isPrimary && (
                  <div className="absolute top-5 right-5">
                    <span className="px-3 py-1 bg-[#38BDF8] text-white text-[11px] font-bold rounded-full">
                      PRIMARY
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-white font-mono font-bold text-lg shadow-md`}>
                    {lang.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-[22px] font-bold text-[#0A1931]">{lang.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-6 mb-5">
                  <div>
                    <div className="text-[12px] font-medium text-[#0A1931]/60 mb-1">TOTAL XP</div>
                    <div className="font-mono text-[18px] font-bold text-[#0A1931]">
                      {lang.totalXp.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[#0A1931]/60 mb-1">LEVEL</div>
                    <div className="font-mono text-[18px] font-bold text-[#38BDF8]">
                      Lv {lang.level}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-[#0A1931]/60">Lessons Progress</span>
                    <span className="font-mono font-bold text-[#0A1931]">
                      {lang.lessonsCompleted}/{lang.totalLessons}
                    </span>
                  </div>
                  <div className="h-2.5 bg-[#0A1931]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#38BDF8] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-bold text-[#38BDF8]">{progressPercent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COURSE PROGRESS
// ============================================
function CourseProgress() {
  const courses = [
    { name: 'React Fundamentals', progress: 75, lesson: 'Lesson 9: Hooks Deep Dive', time: '12 min left' },
    { name: 'Python Basics', progress: 40, lesson: 'Lesson 4: Lists and Loops', time: '8 min left' },
  ];

  return (
    <section className="py-12 bg-[#0A1931]">
      <div className="max-w-[1160px] mx-auto px-8">
        <h3 className="text-2xl font-bold text-[#F5F7FF] mb-6">Course Progress</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.name} className="bg-[#F5F7FF] rounded-xl p-6 border border-[#F5F7FF]/20 hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg mb-1 text-[#0A1931]">{course.name}</h4>
                  <p className="text-sm text-[#0A1931]/60">{course.lesson}</p>
                </div>
                <span className="text-xs text-[#0A1931]/50">{course.time}</span>
              </div>
              <div className="h-2 bg-[#0A1931]/10 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#38BDF8]" style={{ width: `${course.progress}%` }} />
              </div>
              <button className="w-full py-2.5 bg-[#38BDF8] text-white rounded-lg font-semibold hover:bg-[#0EA5E9] transition flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// ACHIEVEMENTS
// ============================================
function Achievements() {
  const achievements = [
    { name: 'First Project', icon: Trophy, unlocked: true, color: 'text-yellow-500' },
    { name: '3-Day Streak', icon: Flame, unlocked: true, color: 'text-orange-500' },
    { name: '10 Lessons', icon: Target, unlocked: false, color: 'text-[#F5F7FF]/30' },
    { name: '100% Complete', icon: CheckCircle, unlocked: false, color: 'text-[#F5F7FF]/30' },
  ];

  return (
    <section className="py-12 bg-[#0D2447]">
      <div className="max-w-[1160px] mx-auto px-8">
        <h3 className="text-2xl font-bold text-[#F5F7FF] mb-6">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.name}
                className={`bg-[#F5F7FF] rounded-xl p-5 border-2 text-center transition ${
                  achievement.unlocked
                    ? 'border-[#38BDF8] shadow-md'
                    : 'border-[#F5F7FF]/20 opacity-60'
                }`}
              >
                <Icon className={`w-10 h-10 mx-auto mb-2 ${achievement.color}`} />
                <p className="text-sm font-semibold text-[#0A1931]">{achievement.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [code, setCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullCode = `# track items you still need to buy
items = []

def add_item(name):
    items.append(name)
    print(f"added {name}")

add_item("oat milk")`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullCode.length) {
        setCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="py-[88px] pb-[96px] bg-[#0A1931]">
      <div className="max-w-[1160px] mx-auto px-8 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div>
          <div className="font-mono text-[13.5px] text-[#38BDF8] font-semibold mb-[22px] tracking-tight">
            // learn by shipping, not by watching
          </div>
          <h1 className="font-mono text-[52px] leading-[1.08] font-extrabold tracking-tight text-[#F5F7FF] mb-6">
            Write real code
            <br />
            on your <span className="text-[#38BDF8]">first day.</span>
          </h1>
          <p className="text-[18px] text-[#F5F7FF]/70 max-w-[46ch] mb-9 leading-relaxed">
            Infinity Code drops you straight into a working editor. No slides, no quizzes about syntax — you build small real projects and we tell you exactly what to fix, line by line.
          </p>
          <div className="flex items-center gap-[14px]">
            <Link href="/signup">
              <a className="inline-block px-[26px] py-[14px] bg-[#38BDF8] text-white rounded-lg font-semibold text-[15.5px] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(56,189,248,0.4)] transition-all shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                Start your first project
              </a>
            </Link>
          </div>
        </div>

        <div className="bg-[#0D1B2A] rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-[0.4deg] border border-[#F5F7FF]/10">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F5F7FF]/10 bg-[#0A1931]">
            <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
            <span className="ml-2.5 font-mono text-[12.5px] text-[#F5F7FF]/50">shopping_list.py</span>
          </div>
          <div className="p-[22px_20px_26px] font-mono text-[14px] leading-[1.85] bg-[#0D1B2A]">
            {code.split('\n').map((line, i) => (
              <div key={i}>
                <span className="inline-block w-[22px] text-[#F5F7FF]/30 select-none">{i + 1}</span>
                <span className="text-[#F5F7FF]">
                  {line.startsWith('#') ? (
                    <span className="text-[#F5F7FF]/40">{line}</span>
                  ) : line.includes('def ') ? (
                    <>
                      <span className="text-[#38BDF8]">def</span>
                      <span className="text-[#F5F7FF]">{line.substring(4)}</span>
                    </>
                  ) : line.includes('print(') ? (
                    <>
                      <span className="text-[#38BDF8]">print</span>
                      <span className="text-[#F5F7FF]">(</span>
                      <span className="text-[#7DD3FC]">{line.substring(line.indexOf('f"'), line.indexOf('")') + 2)}</span>
                      <span className="text-[#F5F7FF]">)</span>
                    </>
                  ) : line.includes('append(') ? (
                    <>
                      <span className="text-[#F5F7FF]">    items</span>
                      <span className="text-[#F5F7FF]">.</span>
                      <span className="text-[#38BDF8]">append</span>
                      <span className="text-[#F5F7FF]">(name)</span>
                    </>
                  ) : line.includes('add_item(') ? (
                    <>
                      <span className="text-[#38BDF8]">add_item</span>
                      <span className="text-[#F5F7FF]">(</span>
                      <span className="text-[#7DD3FC]">{line.substring(line.indexOf('"'), line.lastIndexOf('"') + 1)}</span>
                      <span className="text-[#F5F7FF]">)</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
                {i === code.split('\n').length - 1 && code.length < fullCode.length && cursorVisible && (
                  <span className="inline-block w-[7px] h-4 bg-[#38BDF8] align-[-3px] ml-0.5" />
                )}
              </div>
            ))}
          </div>
          <div className="bg-[#0A1218] border-t border-[#F5F7FF]/10 px-5 py-[14px] font-mono text-[12.5px] text-[#38BDF8]">
            {code.includes('oat milk') && (
              <>
                <div>&gt; added oat milk</div>
                <div>&gt; all tests passing (3/3)</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// LANGUAGE STRIP
// ============================================
function LanguageStrip() {
  const languages = ['Python', 'JavaScript', 'C++', 'Java', 'TypeScript', 'Go'];

  return (
    <div className="border-y border-[#F5F7FF]/10 bg-[#0D2447] py-[26px]">
      <div className="max-w-[1160px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <div className="font-mono text-[12.5px] text-[#F5F7FF]/60">
          learn any of these, in order or out of it
        </div>
        <div className="flex gap-[26px] flex-wrap font-mono text-[14px] font-semibold text-[#F5F7FF]">
          {languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  return (
    <section className="py-[110px] bg-[#0D2447]">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="bg-[#F5F7FF] rounded-2xl px-14 py-16 flex justify-between items-center gap-10 flex-wrap shadow-[0_8px_30px_rgba(56,189,248,0.15)]">
          <div>
            <h2 className="font-mono text-[30px] font-bold mb-2.5 max-w-[20ch] text-[#0A1931]">
              Your first project is five minutes away.
            </h2>
            <p className="text-[#0A1931]/60 text-[15.5px] max-w-[38ch]">
              No setup, no credit card, no video to sit through first. Just open the editor and start.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/signup">
              <a className="inline-block px-7 py-[15px] bg-[#38BDF8] text-white rounded-lg font-bold text-[15.5px] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(56,189,248,0.4)] transition-transform whitespace-nowrap">
                Start your first project
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A1931]">
      {isAuthenticated ? (
        <>
          <WelcomeBanner />
          <LearningTracks />
          <YourLanguages />
          <CourseProgress />
          <Achievements />
        </>
      ) : (
        <>
          <HeroSection />
          <LanguageStrip />
          <CTASection />
        </>
      )}
    </div>
  );
}
