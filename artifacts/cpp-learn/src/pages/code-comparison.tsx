/**
 * Code Comparison - Show one concept in all 6 languages side-by-side
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LANGUAGES, LANGUAGE_ORDER, type LanguageId } from '@/data/languages';
import { UNIFIED_CONCEPTS, getCodeComparison } from '@/data/unified-concepts';
import { Code, BookOpen, Copy, Check } from 'lucide-react';

export default function CodeComparison() {
  const [selectedConcept, setSelectedConcept] = useState(UNIFIED_CONCEPTS[0].id);
  const [selectedTab, setSelectedTab] = useState<LanguageId>('cpp');
  const [copiedLang, setCopiedLang] = useState<LanguageId | null>(null);

  const concept = UNIFIED_CONCEPTS.find(c => c.id === selectedConcept);
  const comparison = getCodeComparison(selectedConcept);

  const copyCode = async (langId: LanguageId, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedLang(langId);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  if (!concept || !comparison) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Code Comparison</h1>
        <p className="text-slate-400">
          See how the same concept is implemented across all 6 languages
        </p>
      </div>

      {/* Concept Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Select a Concept
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {UNIFIED_CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedConcept(c.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left min-h-[44px] touch-target ${
                  selectedConcept === c.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className="font-semibold text-white">{c.title}</div>
                <div className="text-sm text-slate-400 mt-1">{c.category}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Concept Info */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Code className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{concept.title}</h2>
              <p className="text-slate-300">{concept.description}</p>
              <div className="flex gap-3 mt-3 text-sm">
                <span className="text-slate-400">Duration: {concept.duration}</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-400">+{concept.xpReward} XP</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Tabs */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {LANGUAGE_ORDER.map((langId) => {
            const lang = LANGUAGES[langId];
            const isActive = selectedTab === langId;
            
            return (
              <button
                key={langId}
                onClick={() => setSelectedTab(langId)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-medium min-h-[44px] touch-target ${
                  isActive
                    ? 'bg-slate-800 text-white border-2 border-blue-500'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border-2 border-transparent'
                }`}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: lang.color }}
                >
                  {lang.icon}
                </div>
                <span className="whitespace-nowrap">{lang.displayName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: LANGUAGES[selectedTab].color }}
              >
                {LANGUAGES[selectedTab].icon}
              </div>
              <div>
                <div className="font-semibold">{LANGUAGES[selectedTab].displayName}</div>
                <div className="text-sm text-slate-400">{LANGUAGES[selectedTab].useCase}</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(selectedTab, comparison.examples[selectedTab])}
              className="min-h-[44px]"
            >
              {copiedLang === selectedTab ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 overflow-x-auto">
            <pre className="text-sm">
              <code className="text-slate-100 font-mono whitespace-pre">
                {comparison.examples[selectedTab]}
              </code>
            </pre>
          </div>

          {/* Implementation Details */}
          {concept.implementations[selectedTab] && (
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="font-semibold text-blue-400 mb-2">About this implementation</div>
                <p className="text-slate-300 text-sm">
                  {concept.implementations[selectedTab].content}
                </p>
              </div>

              {concept.implementations[selectedTab].tips && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="font-semibold text-green-400 mb-2">Tips</div>
                  <ul className="space-y-1">
                    {concept.implementations[selectedTab].tips?.map((tip, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {concept.implementations[selectedTab].task && (
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="font-semibold text-purple-400 mb-2">Practice Task</div>
                  <p className="text-slate-300 text-sm">
                    {concept.implementations[selectedTab].task}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Languages Grid View */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Languages at a Glance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {LANGUAGE_ORDER.map((langId) => {
            const lang = LANGUAGES[langId];
            
            return (
              <Card key={langId} className="hover:border-slate-600 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: lang.color }}
                    >
                      {lang.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{lang.displayName}</div>
                      <div className="text-xs text-slate-400">{lang.useCase}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-8 w-8 p-0"
                      onClick={() => copyCode(langId, comparison.examples[langId])}
                    >
                      {copiedLang === langId ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-950 rounded border border-slate-800 p-3 overflow-x-auto max-h-64">
                    <pre className="text-xs">
                      <code className="text-slate-100 font-mono whitespace-pre">
                        {comparison.examples[langId]}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
