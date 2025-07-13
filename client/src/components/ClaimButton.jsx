import React, { useState } from 'react';
import API from '../api/api';

const ClaimButton = ({ selectedUserId, onClaimed }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    if (!selectedUserId) {
      alert('Please select a user first.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await API.post('/users/claim', { userId: selectedUserId });
      const { points, user } = res.data;
      setMessage(`🎉 ${user.name} received ${points} points!`);
      onClaimed();
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      alert('Failed to claim points.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleClaim}
        disabled={isLoading}
        className="h-12 px-8 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 text-lg"
      >
        {isLoading ? 'Claiming...' : 'Claim Points'}
      </button>
      {message && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default ClaimButton;