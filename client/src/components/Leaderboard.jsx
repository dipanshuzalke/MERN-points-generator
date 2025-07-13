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

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">🏆 Leaderboard</h3>
      <table className="min-w-full text-left border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr
              key={user._id}
              className={index === 0 ? 'bg-yellow-100 font-semibold' : ''}
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
