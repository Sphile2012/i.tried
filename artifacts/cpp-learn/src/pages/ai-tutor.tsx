import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Sparkles, Code, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Message { role: 'user' | 'assistant'; content: string; }

const suggestions = [
  { icon: BookOpen, text: 'Explain what a variable is' },
  { icon: Code, text: 'How do loops work in C++?' },
  { icon: Lightbulb, text: 'Give me a hint for my exercise' },
  { icon: Sparkles, text: 'Review my code' },
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        variable: 'A **variable** is a named storage location in memory. In C++:\n```cpp\nint age = 25;\nstring name = "Alice";\n```',
        loop: '**Loops** repeat code. C++ has for, while, and do-while loops:\n```cpp\nfor (int i = 0; i < 5; i++) {\n    cout << i;\n}\n```',
        hint: 'Here is a hint: Think about what data type you need and how to structure your loop. Start with the simplest approach.',
        review: 'I can review your code! Paste it here and I will check for errors, suggest improvements, and explain best practices.',
      };
      const lower = text.toLowerCase();
      let response = 'I can help you with programming concepts, code review, debugging, and hints. What would you like to know?';
      for (const [key, val] of Object.entries(responses)) { if (lower.includes(key)) { response = val; break; } }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20"><Brain className="h-6 w-6 text-purple-400" /></div>
        <div><h1 className="text-xl font-bold">AI Coding Assistant</h1><p className="text-sm text-slate-400">Ask questions, get explanations, hints, and code reviews</p></div>
      </div>
      {messages.length === 0 && (
        <div className="grid grid-cols-2 gap-3 py-4">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s.text)} className="flex items-center gap-3 rounded-lg border border-slate-800 p-4 text-left hover:bg-slate-800/50 transition-colors">
              <s.icon className="h-5 w-5 text-blue-400" /><span className="text-sm">{s.text}</span>
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={msg.role === 'user' ? 'max-w-[80%] rounded-lg bg-blue-600 p-4 text-white' : 'max-w-[80%] rounded-lg bg-slate-800 p-4 text-slate-100'}>
              <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="rounded-lg bg-slate-800 p-4 text-slate-400 text-sm">AI is thinking...</div></div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the AI assistant..." className="flex-1" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }} />
        <Button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
