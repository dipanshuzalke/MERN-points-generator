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
    <div className="h-full">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6">
        Recent Activity
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry._id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{entry.userName}</h3>
              <span className="text-lg font-bold text-green-600">+{entry.points}</span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(entry.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryLog;
