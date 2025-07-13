import React, { useState } from 'react';
import API from '../api/api';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await API.post('/users', { name });
      setName('');
      onUserAdded();
    } catch (err) {
      alert('Failed to add user');
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col space-y-3">
        <label className="text-lg font-medium text-gray-900 tracking-tight">
          Add New User
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-11 px-4 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
          <button
            onClick={handleSubmit}
            className="h-11 px-6 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 whitespace-nowrap"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;