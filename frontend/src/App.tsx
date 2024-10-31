import React, { useState } from "react";
import LoginPage from "./LoginPage";
import WorkspacePage from "./WorkspacePage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Admin K",
    role: "Admin" as "Admin" | "User",
  });

  // Function to handle "login" action
  const handleLogin = (data: any) => {
    setIsLoggedIn(true);
    setUser({ name: data.name, role: data.role });
  };

  return (
    <div>
      {isLoggedIn ? (
        <WorkspacePage user={user} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
