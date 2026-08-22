/**
 * Infinity Code - Certificates Page
 * 
 * Note: Certificate functionality has been removed.
 * Please visit the Achievements page to view your accomplishments.
 */

import { Link } from 'wouter';
import { Award, ArrowRight } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-gray-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Certificates Unavailable</h1>
        
        <p className="text-gray-400 mb-8">
          Certificate functionality has been removed. Visit the Achievements page to view your accomplishments and progress.
        </p>
        
        <Link
          to="/achievements"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-[0.98] min-h-[48px]"
        >
          <span>Go to Achievements</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}