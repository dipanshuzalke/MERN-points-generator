import React, { useState } from 'react';
import API from '../api/api';

const ClaimButton = ({ selectedUserId, onClaimed }) => {
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    if (!selectedUserId) {
      alert('Please select a user first.');
      return;
    }

    try {
      const res = await API.post('/users/claim', { userId: selectedUserId });
      const { points, user } = res.data;
      setMessage(`🎉 ${user.name} received ${points} points!`);
      onClaimed(); // refresh leaderboard and users
    } catch (err) {
      alert('Failed to claim points.');
      console.error(err);
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleClaim}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Claim Points
      </button>
      {message && <p className="mt-2 text-green-700 font-semibold">{message}</p>}
    </div>
  );
};

export default ClaimButton;
