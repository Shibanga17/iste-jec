import { ArrowLeft, Monitor, Settings, Building2, Zap, Gauge, ChevronRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function BranchSelection() {
  
  const branches = [
    { id: 'cse', name: 'Computer Science', fullName: 'Computer Science & Engg.', icon: Monitor, accentColor: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'hover:border-blue-500/50' },
    { id: 'me', name: 'Mechanical', fullName: 'Mechanical Engineering', icon: Settings, accentColor: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'hover:border-orange-500/50' },
    { id: 'ce', name: 'Civil', fullName: 'Civil Engineering', icon: Building2, accentColor: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'hover:border-amber-500/50' },
    { id: 'ee', name: 'Electrical', fullName: 'Electrical Engineering', icon: Zap, accentColor: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'hover:border-yellow-500/50' },
    { id: 'ie', name: 'Instrumentation', fullName: 'Instrumentation Engg.', icon: Gauge, accentColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'hover:border-emerald-500/50' },
    { id: 'mca', name: 'MCA', fullName: 'Master of Computer App.', icon: Terminal, accentColor: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'hover:border-violet-500/50' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <Link href="/resources" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft size={20} /> Back to Vault
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Select Your Branch</h1>
          <p className="text-lg text-slate-400 max-w-2xl">Choose your discipline to access curated semester-wise study materials.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => {
            const IconComponent = branch.icon;
            return (
              <Link key={branch.id} href={`/resources/branches/${branch.id}`} className={`group p-6 rounded-2xl bg-slate-900 border border-slate-800 transition-all hover:-translate-y-1 shadow-lg overflow-hidden flex flex-col ${branch.borderColor}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border border-slate-700/50 ${branch.bgColor}`}>
                    <IconComponent size={28} className={branch.accentColor} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                    <ChevronRight size={18} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-1 text-slate-100 group-hover:text-white transition-colors">{branch.name}</h2>
                <p className="text-slate-500 text-sm font-medium">{branch.fullName}</p>
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
}