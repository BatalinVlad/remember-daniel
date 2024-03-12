import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context';

function Login() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      auth.login(responseData.username);

      
      toggleDrawer();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <React.Fragment>
      {showDrawer && <div className="screen" onClick={toggleDrawer}></div>}
      {!showDrawer && (
        <button className="login-btn" onClick={toggleDrawer}>
          הכנס
        </button>
      )}
      <div className={showDrawer ? "login-drawer open z4" : "login-drawer"}>
        <div className="flex column align-center content">
          <input
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="ססמא"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="action-btn" onClick={handleLogin}>
            הכנס
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
