import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [userBands, setUserBands] = useState([]);

  useEffect(() => {
    console.log("Loading User");
    fetch(`/api/check_session`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
          console.log(`User: ${data.username}`);
          console.log(data);
        });
      }
    });
  }, []);
  useEffect(() => {
    fetch(`/api/users/bands/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Loading User Bands");
        setUserBands(data);
        console.log(`User Bands: ${data}`);
      });
  }, [user]);

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <Outlet context={{ user, setUser, userBands, setUserBands }} />
    </>
  );
}

export default App;
