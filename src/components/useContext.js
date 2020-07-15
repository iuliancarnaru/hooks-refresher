import React, { useState, useContext, useMemo } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

async function login() {
  return {
    id: 4,
    username: "Iulian",
    email: "iulian@test.com",
  };
}

function Index() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <p>HOME</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {user ? (
        <button
          onClick={() => {
            // Logout user
            setUser(null);
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={async () => {
            const user = await login();
            setUser(user);
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}

function About() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <p>HOME</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

function ReactUseContext() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <UserContext.Provider value={value}>
          <Route path="/" exact component={Index} />
          <Route path="/about" component={About} />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default ReactUseContext;
