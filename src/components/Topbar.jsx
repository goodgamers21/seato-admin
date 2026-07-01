import { Bell, MagnifyingGlass, UserCircle } from 'phosphor-react';

const Topbar = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between z-10 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/30">
      <div className="relative w-96">
        <MagnifyingGlass 
          size={20} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" 
        />
        <input 
          type="text" 
          placeholder="Search restaurants, users..." 
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0b1120]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-white">Admin SEATO</p>
            <p className="text-xs text-slate-400">Superadmin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
             <UserCircle size={40} weight="light" className="text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
