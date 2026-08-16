import { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cards = [
  { id: 1, front: 'What is a variable?', back: 'A named storage location in memory that holds a value.' },
  { id: 2, front: 'What does int stand for?', back: 'Integer - a whole number data type.' },
  { id: 3, front: 'What is a loop?', back: 'A programming structure that repeats a block of code.' },
  { id: 4, front: 'What is a function?', back: 'A reusable block of code that performs a specific task.' },
  { id: 5, front: 'What is an array?', back: 'A collection of elements at contiguous memory locations.' },
];

export default function Flashcards() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const card = cards[current];
  const next = () => { setFlipped(false); setCurrent(Math.min(current + 1, cards.length - 1)); };
  const prev = () => { setFlipped(false); setCurrent(Math.max(current - 1, 0)); };
  const markKnown = () => { if (!known.includes(card.id)) setKnown([...known, card.id]); next(); };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center"><h1 className="text-2xl font-bold mb-2">Flashcards</h1><p className="text-slate-400">Review key programming concepts</p></div>
      <div className="flex justify-center gap-4 text-sm text-slate-400"><span>Card {current + 1} of {cards.length}</span><span>Known: {known.length}</span></div>
      <div className="flex justify-center">
        <div onClick={() => setFlipped(!flipped)} className="cursor-pointer w-full max-w-md" style={{ perspective: '1000px' }}>
          <div className="relative h-64 transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : '' }}>
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}><Card className="h-full"><CardContent className="h-full flex items-center justify-center text-center p-8"><div><p className="text-sm text-slate-400 mb-2">Question</p><p className="text-xl font-semibold">{card.front}</p><p className="text-xs text-slate-500 mt-4">Click to flip</p></div></CardContent></Card></div>
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><Card className="h-full bg-blue-900/20"><CardContent className="h-full flex items-center justify-center text-center p-8"><div><p className="text-sm text-slate-400 mb-2">Answer</p><p className="text-lg">{card.back}</p></div></CardContent></Card></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={prev} disabled={current === 0}><ChevronLeft className="h-4 w-4" /></Button>
        <Button variant="outline" onClick={() => { setFlipped(false); setCurrent(0); setKnown([]); }}><RotateCcw className="h-4 w-4 mr-2" />Restart</Button>
        <Button variant="secondary" onClick={markKnown}><Check className="h-4 w-4 mr-2" />Got it</Button>
        <Button variant="outline" onClick={next} disabled={current === cards.length - 1}>Next <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );
}
