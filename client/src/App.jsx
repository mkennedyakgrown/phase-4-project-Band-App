import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [userBands, setUserBands] = useState([]);

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
  // set user bands when user is logged in or logged out
  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/bands/${user.id}`)
        .then((r) => r.json())
        .then((data) => {
          console.log("Loading User Bands");
          setUserBands(data);
        });
    }
  }, [user]);

  return (
    <>
      <header className="App-header">
        <NavBar user={user} setUser={setUser} />
      </header>
      <Outlet context={{ user, setUser, userBands, setUserBands }} />
    </>
  );
}

export default App;
