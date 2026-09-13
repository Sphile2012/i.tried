/**
 * Programming Topics Catalog
 * Clean book-style overview of all learning topics
 */

import { Link } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F1]">
      {/* Header */}
      <div className="border-b border-[#DEDBD0] bg-[#F7F6F1] sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#5B5E6B] hover:text-[#1B1D24] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-[#2D5BFF]" />
            <h1 className="font-mono text-3xl sm:text-4xl font-bold text-[#1B1D24]">
              Programming Topics
            </h1>
          </div>
          <p className="text-[#5B5E6B] text-base">
            A complete catalog of everything you can learn on Infinity Code
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 py-12">
        {/* Languages & Foundations */}
        <section className="mb-16">
          <h2 className="font-mono text-2xl font-bold text-[#1B1D24] mb-6 pb-3 border-b border-[#DEDBD0]">
            Languages & Foundations
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-[17px] leading-[1.7] text-[#1B1D24] mb-0">
              <strong className="font-semibold text-[#2D5BFF]">Python</strong> is versatile and
              beginner-friendly for data science and scripting with NumPy, Pandas, Django.{' '}
              <strong className="font-semibold text-[#2D5BFF]">JavaScript</strong> is dynamic and
              runs in browsers for interactive web and Node.js backend with React, Vue, Express.{' '}
              <strong className="font-semibold text-[#2D5BFF]">C++</strong> is high-performance for
              systems, games and embedded with manual memory management and OOP and STL.{' '}
              <strong className="font-semibold text-[#2D5BFF]">Java</strong> is object-oriented and
              platform-independent via JVM for enterprise and Android with Spring and Maven.
            </p>
          </div>
        </section>

        {/* Systems & Practice */}
        <section className="mb-16">
          <h2 className="font-mono text-2xl font-bold text-[#1B1D24] mb-6 pb-3 border-b border-[#DEDBD0]">
            Systems & Practice
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-[17px] leading-[1.7] text-[#1B1D24] mb-0">
              <strong className="font-semibold text-[#2D5BFF]">Data Structures</strong> covers
              arrays, linked lists, stacks, queues, trees, hash maps for organizing data
              efficiently.{' '}
              <strong className="font-semibold text-[#2D5BFF]">Algorithms</strong> covers sorting,
              searching, recursion, dynamic programming and Big O analysis.{' '}
              <strong className="font-semibold text-[#2D5BFF]">Frontend</strong> is client-side
              UI/UX with HTML, CSS, JavaScript and React, Vue, Svelte.{' '}
              <strong className="font-semibold text-[#2D5BFF]">Backend</strong> is server logic,
              APIs and databases with Node.js, Python, REST, GraphQL, SQL/NoSQL.{' '}
              <strong className="font-semibold text-[#2D5BFF]">Data Science</strong> covers
              analysis, statistics and ML using Pandas, scikit-learn, Jupyter.{' '}
              <strong className="font-semibold text-[#2D5BFF]">DevOps</strong> covers CI/CD, Docker,
              Kubernetes, monitoring and cloud scalability.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#1B1D24] rounded-2xl px-8 sm:px-12 py-10 text-center">
          <h3 className="font-mono text-xl font-bold text-[#F7F6F1] mb-3">
            Ready to start learning?
          </h3>
          <p className="text-[#B8BAC8] text-base mb-6 max-w-[42ch] mx-auto">
            Pick a topic, jump into a working editor, and start building real projects from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/learn"
              className="inline-block px-7 py-3.5 bg-[#2D5BFF] text-white rounded-lg font-semibold text-[15.5px] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(45,91,255,0.3)] transition-all shadow-[0_1px_0_rgba(0,0,0,0.08)] whitespace-nowrap"
            >
              Browse all lessons
            </Link>
            <Link
              href="/playground"
              className="inline-block px-7 py-3.5 bg-white/10 border border-white/20 text-[#F7F6F1] rounded-lg font-semibold text-[15.5px] hover:bg-white/15 transition-all whitespace-nowrap"
            >
              Try the code editor
            </Link>
          </div>
        </section>

        {/* Additional Context */}
        <section className="mt-16 pt-8 border-t border-[#DEDBD0]">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-lg font-bold text-[#1B1D24] mb-3">
                Learn by shipping
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#5B5E6B]">
                Every lesson drops you into a working editor with a small, real project that almost
                works. Your job is to finish it. No slides, no videos — just hands-on building from
                the first line.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-lg font-bold text-[#1B1D24] mb-3">
                Instant feedback
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#5B5E6B]">
                Run your code in the browser. Break it, fix it, run it again. We review the diff and
                point at the exact line, explaining why it works so the next bug is faster to find.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
