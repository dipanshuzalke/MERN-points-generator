import React from 'react';

const UserSelector = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <div className="mb-4">
      <label htmlFor="userSelect" className="block font-medium mb-1">
        Select User:
      </label>
      <select
        id="userSelect"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">-- Choose a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
