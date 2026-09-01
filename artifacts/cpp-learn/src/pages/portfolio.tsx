import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Code2, Award, Download } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Your Portfolio
        </h1>
        <p className="text-slate-400 text-lg">
          Showcase your multi-language programming journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-400" />
              Completed Projects
            </CardTitle>
            <CardDescription>Track your coding projects across all 6 languages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-400">
              Start completing lessons and challenges to build your portfolio
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-400" />
              Certifications
            </CardTitle>
            <CardDescription>Your earned achievements and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-400">
              Complete courses to earn certifications
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-400" />
              Skills Matrix
            </CardTitle>
            <CardDescription>Your proficiency across languages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Python', 'C++', 'JavaScript', 'Java', 'TypeScript', 'C#'].map((lang) => (
                <div key={lang} className="flex items-center justify-between">
                  <span className="text-slate-300">{lang}</span>
                  <div className="flex-1 mx-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${Math.random() * 50}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400">Beginner</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-yellow-400" />
              Export Portfolio
            </CardTitle>
            <CardDescription>Download your achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Download PDF Portfolio
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
