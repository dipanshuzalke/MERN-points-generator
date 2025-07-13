import { useEffect, useState } from 'react';
import API from './api/api';

import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import HistoryLog from './components/HistoryLog';


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchUsers();
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
  <div className="max-w-7xl mx-auto mt-10 px-4">
    {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Points System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage users and track point claims with our elegant interface
          </p>
        </div>


    {/* Two-column layout */}
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* Left Column */}
      <div className="md:w-2/3 bg-white shadow p-6 rounded">
        <AddUserForm onUserAdded={handleRefresh} />
        <UserSelector
          users={users}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
        <ClaimButton
          selectedUserId={selectedUserId}
          onClaimed={handleRefresh}
        />
        <Leaderboard refresh={refreshTrigger} />
      </div>

      {/* Right Column */}
      <div className="md:w-1/3 bg-white shadow p-6 rounded h-fit">
        <HistoryLog refresh={refreshTrigger} />
      </div>
    </div>
  </div>
);

};

export default App;
