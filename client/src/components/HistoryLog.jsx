import React, { useEffect, useState } from 'react';
import API from '../api/api';

const HistoryLog = ({ refresh }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await API.get('/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-3">📜 Claim History</h3>
      <div className="overflow-x-auto max-h-64 overflow-y-scroll border rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 sticky top-0">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Points</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id} className="border-t">
                <td className="p-2">{entry.userName}</td>
                <td className="p-2">{entry.points}</td>
                <td className="p-2 text-gray-600">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;
