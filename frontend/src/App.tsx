import React, { useEffect, useState } from 'react';



const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/')  // assuming proxy is configured
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUser(data)
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600">User List</h1>
      <ul>
        {
          <li key={user?.id} className="p-2 mt-2 bg-white shadow-md rounded-md">
            {user?.name} {user?.email}
          </li>
      }
      </ul>
    </div>
  );
};

export default App;
