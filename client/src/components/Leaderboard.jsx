import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Leaderboard = ({ refresh }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await API.get('/users/leaderboard');
      setLeaderboard(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refresh]);

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getRankStyle = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
    if (index === 1) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
    if (index === 2) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200';
    return 'bg-white border-gray-100';
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6">
        Leaderboard
      </h2>
      <div className="space-y-3">
        {leaderboard.map((user, index) => (
          <div
            key={user._id}
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getRankStyle(index)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-medium">
                  {getRankEmoji(index)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">Rank #{index + 1}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{user.totalPoints}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;