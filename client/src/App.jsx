import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  // State for user information
  const [user, setUser] = useState({});

  // Check if user is logged in
  useEffect(() => {
    console.log("Loading User");
    fetch(`/api/check_session`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data); // Update user state with fetched data
        });
      }
    });
  }, []); // Run once on component mount

  // Render header and outlet components
  return (
    <>
      <header className="App-header">
        <NavBar user={user} setUser={setUser} />{" "}
      </header>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
