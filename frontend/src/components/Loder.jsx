import React from 'react';
import { Award } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
    
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[80px] animate-bounce" style={{ animationDuration: '4s' }} />

      <div className="relative flex flex-col items-center">
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-amber-400 to-orange-600 p-5 rounded-[2rem] shadow-2xl transform transition-transform animate-hover">
            <Award className="w-12 h-12 text-slate-950" />
          </div>
        </div>

        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Event<span className="text-amber-500">Plus</span>
          </h2>
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
               Curating Experiences
             </p>
             <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        <div className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 w-full translate-x-[-100%] animate-progress" />
        </div>
      </div>

      <div className="absolute bottom-10 text-slate-600 text-[10px] font-bold uppercase tracking-widest opacity-40">
        Secure Digital Environment // 2026
      </div>
    </div>
  );
};

export default PageLoader;