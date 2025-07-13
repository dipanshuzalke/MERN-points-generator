import React, { useState } from 'react';
import API from '../api/api';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await API.post('/users', { name });
      setName('');
      onUserAdded(); // refresh list
    } catch (err) {
      alert('Failed to add user');
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Add New User:</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;
