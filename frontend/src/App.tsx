import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [workspace, setWorkspace] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/get-a-workspace?userID=cd5a8910-de95-4a98-a4cf-0463915de597&workspaceID=0ce792b7-078d-405e-8fe9-2409d4e9ffb6')  // assuming proxy is configured
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setWorkspace(data.data.workspaceData);
        }
      })
      .catch(error => console.error('Error fetching workspace:', error));
  }, []);

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600">Workspace Details</h1>

      {workspace ? (
        <div>
          <h2 className="text-2xl font-semibold mt-4">Workspace: {workspace.name}</h2>
          <p className="text-lg mt-2">Workspace ID: {workspace.workspaceID}</p>
          <p className="text-lg mt-2">User ID: {workspace.userID}</p>

          <h3 className="text-xl font-semibold mt-4">Spaces</h3>
          <ul>
            {workspace.spaces.map((space: any) => (
              <li key={space.spaceID} className="p-2 mt-2 bg-white shadow-md rounded-md">
                <strong>{space.name}</strong>
                <p>Space ID: {space.spaceID}</p>
                <p>Request From: {space.requestFrom || 'N/A'}</p>
                <p>Transfer To: {space.transferTo || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading workspace details...</p>
      )}
    </div>
  );
};


export default App;
