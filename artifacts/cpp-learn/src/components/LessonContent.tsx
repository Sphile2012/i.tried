import * as React from 'react';
import GlossaryTooltip, { glossaryData } from '@/components/GlossaryTooltip';
import { Card, CardContent } from '@/components/ui/card';

interface LessonContentProps {
  title: string;
  content: string;
  category: string;
}

// List of terms that should be made clickable
const clickableTerms = Object.keys(glossaryData);

// Function to make terms clickable in content
function makeTermsClickable(text: string) {
  const parts: (string | { term: string; text: string })[] = [];
  let remaining = text;
  
  while (remaining.length > 0) {
    let foundTerm = false;
    
    for (const term of clickableTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'i');
      const match = remaining.match(regex);
      
      if (match && match.index !== undefined) {
        // Add text before the match
        if (match.index > 0) {
          parts.push(remaining.substring(0, match.index));
        }
        
        // Add the term as clickable
        parts.push({
          term,
          text: match[0]
        });
        
        remaining = remaining.substring(match.index + match[0].length);
        foundTerm = true;
        break;
      }
    }
    
    if (!foundTerm) {
      parts.push(remaining);
      break;
    }
  }
  
  return parts;
}

export default function LessonContent({ title, content, category }: LessonContentProps) {
  const parts = makeTermsClickable(content);
  
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-800 text-slate-200">
            {category}
          </span>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="prose prose-invert prose-slate max-w-none">
          <p className="text-slate-300 leading-relaxed">
            {parts.map((part, index) => {
              if (typeof part === 'string') {
                return <span key={index}>{part}</span>;
              } else {
                return (
                  <GlossaryTooltip term={part.term}>{part.text}</GlossaryTooltip>
                );
              }
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
