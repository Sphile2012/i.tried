import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-slate-400 mb-6">The page you are looking for does not exist.</p>
      <Link href="/"><Button>Back to Dashboard</Button></Link>
    </div>
  );
}
