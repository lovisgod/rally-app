import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/')  // assuming proxy is configured
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600">User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="p-2 mt-2 bg-white shadow-md rounded-md">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
