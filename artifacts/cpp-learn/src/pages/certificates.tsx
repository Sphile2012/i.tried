import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Download,
  Share2,
  Trophy,
  CheckCircle,
  Calendar,
  User,
  Star,
  BadgeCheck,
  FileText,
  ExternalLink,
  Copy,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Certificate {
  id: string;
  title: string;
  course: string;
  issuedDate: string;
  grade: string;
  completionPercentage: number;
  certificateUrl: string;
  verified: boolean;
}

const certificates: Certificate[] = [
  {
    id: 'CERT-001-CPP-BASICS',
    title: 'C++ Fundamentals Certificate',
    course: 'C++ Programming Basics',
    issuedDate: '2024-01-15',
    grade: 'A',
    completionPercentage: 100,
    certificateUrl: '#',
    verified: true,
  },
  {
    id: 'CERT-002-JS-ADVANCED',
    title: 'JavaScript Advanced Certificate',
    course: 'Advanced JavaScript Concepts',
    issuedDate: '2024-02-20',
    grade: 'A+',
    completionPercentage: 100,
    certificateUrl: '#',
    verified: true,
  },
  {
    id: 'CERT-003-PYTHON',
    title: 'Python Programming Certificate',
    course: 'Python for Everyone',
    issuedDate: '2024-03-10',
    grade: 'B+',
    completionPercentage: 95,
    certificateUrl: '#',
    verified: true,
  },
];

export default function CertificatesPage() {
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCertificateId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'A': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'B+': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'B': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 mb-4">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Certificates</h1>
        <p className="text-slate-400">Showcase your achievements and share them with the world</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{certificates.length}</p>
            <p className="text-sm text-slate-400">Certificates Earned</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <BadgeCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {certificates.filter(c => c.verified).length}
            </p>
            <p className="text-sm text-slate-400">Verified</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {certificates.filter(c => c.grade === 'A+' || c.grade === 'A').length}
            </p>
            <p className="text-sm text-slate-400">A Grades</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2024</p>
            <p className="text-sm text-slate-400">First Certificate</p>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Earned Certificates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-slate-800 overflow-hidden h-full">
                {/* Certificate Preview */}
                <div className="h-40 bg-gradient-to-br from-slate-900 to-slate-800 border-b border-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">Certificate of Completion</p>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-500/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent" />
                </div>

                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                    <p className="text-sm text-slate-400">{cert.course}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getGradeColor(cert.grade)}>
                      Grade: {cert.grade}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {cert.completionPercentage}% Complete
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                  </div>

                  {/* Verification */}
                  <div className="bg-slate-900/50 rounded-lg p-2">
                    <p className="text-xs text-slate-400 mb-1">Certificate ID</p>
                    <div className="flex items-center justify-between">
                      <code className="text-xs text-slate-300 font-mono">{cert.id}</code>
                      <button
                        onClick={() => copyCertificateId(cert.id)}
                        className="p-1 hover:bg-slate-800 rounded transition-colors"
                      >
                        <Copy className="h-3 w-3 text-slate-400" />
                      </button>
                    </div>
                    {copiedId === cert.id && (
                      <p className="text-xs text-green-400 mt-1">Copied!</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-slate-700 text-white hover:bg-slate-800">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-slate-700 text-white hover:bg-slate-800">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-4">
            Share your certificates on social media and professional networks to showcase your skills.
          </p>
          <div className="flex gap-3">
            <Button className="bg-[#0A66C2] hover:bg-[#004182] text-white">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button className="bg-[#1DA1F2] hover:bg-[#0d8ddb] text-white">
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              <ExternalLink className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Info */}
      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            Certificate Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">
            All Infinity Code certificates are verified and can be authenticated by employers.
            Use the unique certificate ID to verify any certificate issued by Infinity Code.
          </p>
          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
            <p className="text-sm text-slate-300">
              <strong className="text-white">How to verify:</strong> Enter the certificate ID 
              (format: CERT-XXX-COURSE-CODE) in our verification page to confirm authenticity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}