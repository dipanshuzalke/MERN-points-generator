import React from 'react';

const UserSelector = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <div className="mb-8">
      <label htmlFor="userSelect" className="block text-lg font-medium text-gray-900 tracking-tight mb-3">
        Select User
      </label>
      <select
        id="userSelect"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full h-11 px-4 text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
      >
        <option value="">Choose a user</option>
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
