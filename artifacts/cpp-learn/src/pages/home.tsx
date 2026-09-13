/**
 * Infinity Code - Homepage
 * Learn to code by shipping things
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Code, ArrowRight, CheckCircle } from 'lucide-react';

// ============================================
// NAV COMPONENT
// ============================================
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F7F6F1]/90 backdrop-blur-md border-b border-[#DEDBD0]">
      <div className="max-w-[1160px] mx-auto px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-[19px] font-bold text-[#1B1D24]">
          <span className="w-2 h-2 bg-[#2D5BFF] rounded-full" />
          Infinity Code
        </Link>
        <div className="hidden md:flex items-center gap-9">
          <Link href="#how" className="text-[14.5px] font-medium text-[#5B5E6B] hover:text-[#1B1D24] transition-colors">
            How it works
          </Link>
          <Link
            href="/signup"
            className="px-[18px] py-[9px] bg-[#1B1D24] text-[#F7F6F1] rounded-md text-sm font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Start free
          </Link>
        </div>
      </div>
    </nav>
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
    <section className="py-[88px] pb-[96px] bg-[#F7F6F1]">
      <div className="max-w-[1160px] mx-auto px-8 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        {/* Left Side */}
        <div>
          <div className="font-mono text-[13.5px] text-[#2D5BFF] font-semibold mb-[22px] tracking-tight">
            // learn by shipping, not by watching
          </div>
          <h1 className="font-mono text-[52px] leading-[1.08] font-extrabold tracking-tight text-[#1B1D24] mb-6">
            Write real code
            <br />
            on your <span className="text-[#2D5BFF]">first day.</span>
          </h1>
          <p className="text-[18px] text-[#5B5E6B] max-w-[46ch] mb-9 leading-relaxed">
            Infinity Code drops you straight into a working editor. No slides, no quizzes about syntax — you build small real projects and we tell you exactly what to fix, line by line.
          </p>
          <div className="flex items-center gap-[14px] mb-[44px]">
            <Link
              href="/signup"
              className="inline-block px-[26px] py-[14px] bg-[#2D5BFF] text-white rounded-lg font-semibold text-[15.5px] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(45,91,255,0.25)] transition-all shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            >
              Start your first project
            </Link>
          </div>
          <div className="flex items-center gap-7 flex-wrap">
            <div className="font-mono text-[13px] text-[#5B5E6B]">
              <span className="text-[#1B1D24] font-bold">900+</span> projects shipped
            </div>
            <div className="font-mono text-[13px] text-[#5B5E6B]">
              <span className="text-[#1B1D24] font-bold">4.8/5</span> from learners
            </div>
            <div className="font-mono text-[13px] text-[#5B5E6B]">
              <span className="text-[#1B1D24] font-bold">0</span> lecture videos
            </div>
          </div>
        </div>

        {/* Right Side - Editor */}
        <div className="bg-[#181A22] rounded-xl shadow-[0_30px_60px_-20px_rgba(20,20,30,0.35)] overflow-hidden transform rotate-[0.4deg]">
          {/* Editor Top Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2D3A]">
            <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
            <span className="ml-2.5 font-mono text-[12.5px] text-[#8B8E9F]">shopping_list.py</span>
          </div>

          {/* Code Editor */}
          <div className="p-[22px_20px_26px] font-mono text-[14px] leading-[1.85]">
            {code.split('\n').map((line, i) => (
              <div key={i}>
                <span className="inline-block w-[22px] text-[#5A5D70] select-none">{i + 1}</span>
                <span className="text-[#EEFFFF]">
                  {line.startsWith('#') ? (
                    <span className="text-[#5A5D70]">{line}</span>
                  ) : line.includes('def ') ? (
                    <>
                      <span className="text-[#C792EA]">def</span>
                      <span className="text-[#82AAFF]">{line.substring(4)}</span>
                    </>
                  ) : line.includes('print(') ? (
                    <>
                      <span className="text-[#82AAFF]">print</span>
                      <span className="text-[#EEFFFF]">(</span>
                      <span className="text-[#C3E88D]">{line.substring(line.indexOf('f"'), line.indexOf('")') + 2)}</span>
                      <span className="text-[#EEFFFF]">)</span>
                    </>
                  ) : line.includes('append(') ? (
                    <>
                      <span className="text-[#EEFFFF]">    items</span>
                      <span className="text-[#EEFFFF]">.</span>
                      <span className="text-[#82AAFF]">append</span>
                      <span className="text-[#EEFFFF]">(name)</span>
                    </>
                  ) : line.includes('add_item(') ? (
                    <>
                      <span className="text-[#82AAFF]">add_item</span>
                      <span className="text-[#EEFFFF]">(</span>
                      <span className="text-[#C3E88D]">{line.substring(line.indexOf('"'), line.lastIndexOf('"') + 1)}</span>
                      <span className="text-[#EEFFFF]">)</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
                {i === code.split('\n').length - 1 && code.length < fullCode.length && cursorVisible && (
                  <span className="inline-block w-[7px] h-4 bg-[#FF5C35] align-[-3px] ml-0.5" />
                )}
              </div>
            ))}
          </div>

          {/* Console */}
          <div className="bg-[#12141C] border-t border-[#2A2D3A] px-5 py-[14px] font-mono text-[12.5px] text-[#14B87F]">
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
  const languages = ['Python', 'JavaScript', 'SQL', 'TypeScript', 'C++', 'Java'];

  return (
    <div className="border-y border-[#DEDBD0] bg-[#EFEDE5] py-[26px]">
      <div className="max-w-[1160px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <div className="font-mono text-[12.5px] text-[#5B5E6B]">
          learn any of these, in order or out of it
        </div>
        <div className="flex gap-[26px] flex-wrap font-mono text-[14px] font-semibold text-[#1B1D24]">
          {languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// HOW IT WORKS
// ============================================
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'You get a broken project',
      desc: 'A small, real thing — a to-do list, a scraper, an API — that almost works. Your job is to finish it.',
    },
    {
      num: '02',
      title: 'You write the fix',
      desc: 'Right in the browser editor. Run it, break it, run it again. No setup, no environment to configure.',
    },
    {
      num: '03',
      title: 'We review the diff',
      desc: 'Not just pass/fail — we point at the exact line and explain why it works, so the next bug is faster to find.',
    },
  ];

  return (
    <section id="how" className="py-[104px] bg-[#F7F6F1]">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="max-w-[56ch] mb-16">
          <h2 className="font-mono text-[34px] font-bold tracking-tight text-[#1B1D24] mb-4">
            How a lesson actually works
          </h2>
          <p className="text-[16.5px] text-[#5B5E6B]">
            Every lesson follows the same structure. No new interface to learn, just deeper problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border-t border-[#DEDBD0]">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-8 pr-7 border-b border-[#DEDBD0] ${
                idx !== steps.length - 1 ? 'lg:border-r lg:border-[#DEDBD0]' : ''
              }`}
            >
              <div className="font-mono text-[13px] text-[#2D5BFF] font-bold mb-[14px]">{step.num}</div>
              <h3 className="text-[19px] font-bold text-[#1B1D24] mb-2.5">{step.title}</h3>
              <p className="text-[15px] text-[#5B5E6B] leading-relaxed">{step.desc}</p>
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
    <section className="py-[110px] bg-[#F7F6F1]">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="bg-[#1B1D24] text-[#F7F6F1] rounded-2xl px-14 py-16 flex justify-between items-center gap-10 flex-wrap">
          <div>
            <h2 className="font-mono text-[30px] font-bold mb-2.5 max-w-[20ch]">
              Your first project is five minutes away.
            </h2>
            <p className="text-[#B8BAC8] text-[15.5px] max-w-[38ch]">
              No setup, no credit card, no video to sit through first. Just open the editor and start.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/signup"
              className="inline-block px-7 py-[15px] bg-[#FF5C35] text-white rounded-lg font-bold text-[15.5px] hover:-translate-y-0.5 transition-transform whitespace-nowrap"
            >
              Start your first project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="border-t border-[#DEDBD0] py-11 bg-[#F7F6F1]">
      <div className="max-w-[1160px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2 font-mono text-[15px] font-bold text-[#1B1D24]">
          <span className="w-2 h-2 bg-[#2D5BFF] rounded-full" />
          Infinity Code
        </div>
        <div className="flex gap-[26px]">
          <Link href="/about" className="text-[13.5px] text-[#5B5E6B] hover:text-[#1B1D24] transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-[13.5px] text-[#5B5E6B] hover:text-[#1B1D24] transition-colors">
            For teams
          </Link>
          <Link href="/about" className="text-[13.5px] text-[#5B5E6B] hover:text-[#1B1D24] transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F6F1]">
      <Nav />
      <HeroSection />
      <LanguageStrip />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
