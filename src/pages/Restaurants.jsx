import { useState, useEffect } from 'react';
import { Funnel, Plus, DotsThree, CheckCircle, WarningCircle, CaretDown } from 'phosphor-react';
import { fetchRestaurants, updateRestaurantStatus } from '../lib/api';

const StatusBadge = ({ status }) => {
  const styles = {
    UNCLAIMED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    VERIFIED_FREE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    SUBSCRIBED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    EXPIRED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const labels = {
    UNCLAIMED: "Unclaimed",
    PENDING: "Pending",
    VERIFIED_FREE: "Verified (Free)",
    SUBSCRIBED: "Subscribed",
    EXPIRED: "Expired",
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${styles[status] || styles.UNCLAIMED}`}>
      {labels[status] || status}
    </span>
  );
};

const Restaurants = () => {
  const [filter, setFilter] = useState('ALL');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = () => {
    setLoading(true);
    fetchRestaurants()
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateRestaurantStatus(id, newStatus);
      // Optimistic update
      setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const filteredData = filter === 'ALL' 
    ? restaurants 
    : restaurants.filter(r => r.status === filter);

  return (
    <div className="py-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Restaurants Management</h2>
          <p className="text-slate-400 text-sm">Manage all coffeeshops and their subscription status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium">
            <Funnel size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all text-sm font-medium">
            <Plus size={18} />
            Add Restaurant
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-800/80 overflow-x-auto hide-scrollbar">
          {['ALL', 'SUBSCRIBED', 'VERIFIED_FREE', 'PENDING', 'UNCLAIMED', 'EXPIRED'].map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                filter === tab 
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-slate-500">Loading data...</div>
          ) : (
            <table className="w-full text-left border-collapse relative">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/40">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Restaurant Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">City</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredData.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">{restaurant.name}</p>
                      <p className="text-xs text-slate-500">{restaurant.loginEmail || 'No Login Assigned'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{restaurant.city}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={restaurant.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(restaurant.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right relative group/menu">
                      <button className="text-slate-500 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center gap-2 border border-slate-700 bg-slate-800 text-xs">
                        Change Status <CaretDown size={12} />
                      </button>
                      <div className="absolute right-6 top-10 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-10 hidden group-hover/menu:block overflow-hidden text-left">
                        <button onClick={() => handleUpdateStatus(restaurant.id, 'SUBSCRIBED')} className="w-full text-left px-4 py-2 text-sm text-emerald-400 hover:bg-slate-700">Set as Subscribed</button>
                        <button onClick={() => handleUpdateStatus(restaurant.id, 'VERIFIED_FREE')} className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-slate-700">Set as Verified Free</button>
                        <button onClick={() => handleUpdateStatus(restaurant.id, 'PENDING')} className="w-full text-left px-4 py-2 text-sm text-yellow-500 hover:bg-slate-700">Set as Pending</button>
                        <button onClick={() => handleUpdateStatus(restaurant.id, 'UNCLAIMED')} className="w-full text-left px-4 py-2 text-sm text-slate-400 hover:bg-slate-700">Set as Unclaimed</button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <WarningCircle size={48} className="mx-auto mb-3 opacity-50" />
                      <p>No restaurants found matching this status.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="border-t border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing <span className="font-semibold text-slate-300">{filteredData.length > 0 ? 1 : 0}</span> to <span className="font-semibold text-slate-300">{filteredData.length}</span> of <span className="font-semibold text-slate-300">{filteredData.length}</span> entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700 rounded hover:text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700 rounded hover:text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
