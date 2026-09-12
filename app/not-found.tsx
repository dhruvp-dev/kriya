import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { KriyaLogo } from '../components/ui/KriyaLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F1E8] text-[#20231F] flex flex-col items-center justify-center p-4 selection:bg-[#C85A3D] selection:text-white bg-editorial-grid">
      <div className="max-w-md w-full bg-[#FFFDF7] border-2 border-[#DFDDD2] p-8 chamfer-panel shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <KriyaLogo variant="primary" size={36} showTagline={false} />
        </div>

        <div className="w-12 h-12 bg-[#FBF0EC] border border-[#C85A3D]/20 text-[#C85A3D] rounded-xs flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="font-technical text-xs font-bold text-[#C85A3D] uppercase tracking-widest">
            ERROR 404 // UNKNOWN QUEST
          </span>
          <h1 className="text-2xl font-extrabold text-[#20231F]">
            PAGE NOT FOUND
          </h1>
          <p className="text-sm text-[#70736B]">
            The route or quest surface you are attempting to reach does not exist or has moved.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF7] hover:bg-[#F3F1E8] text-[#20231F] border border-[#DFDDD2] text-sm font-semibold px-4 py-2.5 chamfer-button transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Landing Page</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C85A3D] hover:bg-[#A94730] text-[#FFFDF7] text-sm font-semibold px-5 py-2.5 chamfer-button transition-colors"
          >
            <span>Enter Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
