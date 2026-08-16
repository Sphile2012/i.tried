import { useParams, Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const termData: Record<string, any> = {
  variable: { term: 'Variable', category: 'Basics', definition: 'A named storage location in memory that holds a value.', example: 'int age = 25;', related: ['Data Type', 'Constant', 'Scope'] },
  function: { term: 'Function', category: 'Basics', definition: 'A reusable block of code that performs a specific task.', example: 'int add(int a, int b) { return a + b; }', related: ['Parameters', 'Return Type', 'Recursion'] },
  pointer: { term: 'Pointer', category: 'Advanced', definition: 'A variable that stores the memory address of another variable.', example: 'int* ptr = &num;', related: ['Reference', 'Memory', 'Array'] },
};

export default function GlossaryTerm() {
  const { term } = useParams();
  const data = termData[term as string] || { term: term, category: 'Unknown', definition: 'Term not found.', example: '', related: [] };
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/glossary" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"><ArrowLeft className="h-4 w-4" /> Back to Glossary</Link>
      <Card><CardHeader><div className="flex items-center justify-between"><CardTitle className="text-2xl">{data.term}</CardTitle><Badge variant="secondary">{data.category}</Badge></div></CardHeader>
        <CardContent className="space-y-4">
          <div><h3 className="font-semibold mb-2">Definition</h3><p className="text-slate-300">{data.definition}</p></div>
          {data.example && <div><h3 className="font-semibold mb-2">Example</h3><pre className="bg-slate-950 text-green-400 font-mono text-sm rounded-lg border border-slate-800 p-4">{data.example}</pre></div>}
          {data.related.length > 0 && <div><h3 className="font-semibold mb-2">Related Terms</h3><div className="flex gap-2">{data.related.map((r: string, i: number) => <Badge key={i} variant="outline">{r}</Badge>)}</div></div>}
        </CardContent>
      </Card>
    </div>
  );
}
