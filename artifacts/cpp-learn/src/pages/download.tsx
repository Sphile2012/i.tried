import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Code2, BarChart3, BookOpen, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DownloadPage() {
  const handleDownload = (type: string) => {
    alert(`Download feature for ${type} coming soon! This will generate and download your content.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Download Content
        </h1>
        <p className="text-slate-400 text-lg">
          Export your learning materials and progress for offline access
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lessons as PDF */}
        <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Lessons as PDF
            </CardTitle>
            <CardDescription>
              Download all completed lessons in professional PDF format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Book-style formatted lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Code examples for all 6 languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Print-friendly layout</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Lessons PDF')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Lessons PDF
            </Button>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card className="bg-slate-900 border-slate-800 hover:border-purple-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-purple-400" />
              Code Examples
            </CardTitle>
            <CardDescription>
              Get all code examples organized by language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>ZIP file with 6 language folders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Ready-to-run code files</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Organized by topic</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Code Examples')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Code Examples
            </Button>
          </CardContent>
        </Card>

        {/* Progress Report */}
        <Card className="bg-slate-900 border-slate-800 hover:border-green-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              Progress Report
            </CardTitle>
            <CardDescription>
              Export your learning statistics and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span>Completed lessons by language</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span>XP and level progression</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span>Badges and achievements</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Progress Report')}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        {/* Portfolio */}
        <Card className="bg-slate-900 border-slate-800 hover:border-yellow-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-400" />
              Professional Portfolio
            </CardTitle>
            <CardDescription>
              Downloadable portfolio showcasing your skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <span>Skills matrix across 6 languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <span>Completed projects list</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <span>Professional PDF format</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Portfolio')}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Portfolio
            </Button>
          </CardContent>
        </Card>

        {/* Cheat Sheets */}
        <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-cyan-400" />
              Language Cheat Sheets
            </CardTitle>
            <CardDescription>
              Quick reference guides for all 6 languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Syntax comparison tables</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Common patterns and idioms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>One-page reference per language</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Cheat Sheets')}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Cheat Sheets
            </Button>
          </CardContent>
        </Card>

        {/* Complete Package */}
        <Card className="bg-slate-900 border-slate-800 hover:border-pink-500/50 transition-colors md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-6 w-6 text-pink-400" />
              Complete Learning Package
            </CardTitle>
            <CardDescription>
              Download everything in one comprehensive archive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>All lessons (PDF)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>All code examples</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>Cheat sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>Progress report</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>Portfolio document</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                <span>Offline-ready format</span>
              </div>
            </div>
            <Button 
              onClick={() => handleDownload('Complete Package')}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg py-6"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Everything
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-400" />
            About Downloads
          </h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>
              All downloads are free and available immediately. Your learning materials are yours to keep forever.
            </p>
            <p>
              Downloads include only the content you have access to. Complete more lessons to unlock additional content in your exports.
            </p>
            <p>
              Downloaded materials are perfect for offline study, printing, or keeping as reference documentation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
