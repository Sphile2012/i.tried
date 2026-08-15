import { useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const terms = [
  { term: 'Variable', category: 'Basics', definition: 'A named storage location in memory that holds a value.' },
  { term: 'Function', category: 'Basics', definition: 'A reusable block of code that performs a specific task.' },
  { term: 'Array', category: 'Data Structures', definition: 'A collection of elements stored at contiguous memory locations.' },
  { term: 'Pointer', category: 'Advanced', definition: 'A variable that stores the memory address of another variable.' },
  { term: 'Class', category: 'OOP', definition: 'A user-defined data type with data and functions.' },
  { term: 'Object', category: 'OOP', definition: 'An instance of a class.' },
  { term: 'Loop', category: 'Control Flow', definition: 'A structure that repeats a block of code.' },
  { term: 'Recursion', category: 'Advanced', definition: 'A function that calls itself.' },
];

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || t.category === category));
  const categories = ['all', ...new Set(terms.map(t => t.category))];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold mb-2">Glossary</h1><p className="text-slate-400">Programming terms and definitions</p></div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search terms..." className="pl-10" /></div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white">{categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}</select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <Link key={i} href={`/glossary/${t.term.toLowerCase()}`}><Card className="hover:border-blue-500/50 transition-colors cursor-pointer h-full"><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="font-semibold">{t.term}</h3><Badge variant="secondary">{t.category}</Badge></div><p className="text-sm text-slate-400">{t.definition}</p></CardContent></Card></Link>
        ))}
      </div>
    </div>
  );
}
