import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  // check if user is logged in
  useEffect(() => {
    console.log("Loading User");
    fetch(`/api/check_session`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
        });
      }
    });
  }, []);

  return (
    <>
      <header className="App-header">
        <NavBar user={user} setUser={setUser} />
      </header>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
