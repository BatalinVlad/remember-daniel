import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../context/auth-context";

function Login() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const submitButtonRef = useRef(null);

  const toggleDrawer = () => {
    if (auth.isLoggedIn) {
      auth.logout();
    } else {
      setShowDrawer(!showDrawer);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://remember-daniel-production.up.railway.app/api/users/login", {
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
      auth.login(responseData.username, responseData.token);

      toggleDrawer();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current.click();
    }
  };

  return (
    <React.Fragment>
      {showDrawer && <div className="screen" onClick={toggleDrawer}></div>}
      {!showDrawer && (
        <button className="login-btn z4" onClick={toggleDrawer}>
          <h3>{auth.isLoggedIn ? "יציאה" : "הכנס"}</h3>
        </button>
      )}
      <div className={showDrawer ? "login-drawer open z5" : "login-drawer"}>
        <div className="flex column align-center content">
          <input
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="password"
            placeholder="ססמא"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            ref={submitButtonRef}
            className="action-btn"
            onClick={handleLogin}
          >
            הכנס
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
