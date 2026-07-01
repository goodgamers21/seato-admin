import { useState, useEffect } from 'react';
import { Storefront, Users, ChartLineUp, CurrencyDollar } from 'phosphor-react';
import { fetchDashboardStats } from '../lib/api';

const StatCard = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 font-medium text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
          <Icon size={24} className="text-emerald-400" weight="duotone" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {trendUp ? '+' : '-'}{trend}
        </span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    activeSubscribed: 0,
    verifiedFree: 0,
    mrr: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(val);
  };

  return (
    <div className="py-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
        <p className="text-slate-400 text-sm">Welcome back! Here's what's happening with SEATO today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Restaurants" 
          value={stats.totalRestaurants} 
          icon={Storefront} 
          trend="12.5%" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Subscribed" 
          value={stats.activeSubscribed} 
          icon={ChartLineUp} 
          trend="8.2%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={Users} 
          trend="2.4%" 
          trendUp={true} 
        />
        <StatCard 
          title="Est. MRR" 
          value={formatCurrency(stats.mrr)} 
          icon={CurrencyDollar} 
          trend="15.3%" 
          trendUp={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-lg font-bold text-white mb-4">Subscription Growth</h3>
          <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-slate-700/50 rounded-xl">
             <p className="text-slate-500">Chart Placeholder</p>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent Claims</h3>
            <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">View all</button>
          </div>
          
          <div className="space-y-4 flex flex-col items-center justify-center h-48">
            <p className="text-slate-500 text-sm">Waiting for new claims...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
