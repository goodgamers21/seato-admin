import { Link, useLocation } from 'react-router-dom';
import { 
  SquaresFour, 
  Storefront, 
  Users, 
  ChartLineUp, 
  Gear,
  SignOut
} from 'phosphor-react';

const NavItem = ({ to, icon: Icon, label, active }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
      }`}
    >
      <Icon size={22} weight={active ? "fill" : "regular"} />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 glass-panel border-y-0 border-l-0 border-r-slate-800 flex flex-col z-20 relative">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Storefront size={24} weight="fill" className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">SEATO</h1>
          <p className="text-[10px] text-emerald-400 font-medium tracking-widest uppercase">Admin Portal</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
        <NavItem 
          to="/dashboard" 
          icon={SquaresFour} 
          label="Dashboard" 
          active={location.pathname.includes('/dashboard')} 
        />
        <NavItem 
          to="/restaurants" 
          icon={Storefront} 
          label="Restaurants" 
          active={location.pathname.includes('/restaurants')} 
        />
        <NavItem 
          to="/users" 
          icon={Users} 
          label="Users" 
          active={location.pathname.includes('/users')} 
        />
        <NavItem 
          to="/analytics" 
          icon={ChartLineUp} 
          label="Analytics" 
          active={location.pathname.includes('/analytics')} 
        />
      </div>

      <div className="p-4 border-t border-slate-800/50">
        <NavItem 
          to="/settings" 
          icon={Gear} 
          label="Settings" 
          active={location.pathname.includes('/settings')} 
        />
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent mt-2">
          <SignOut size={22} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
