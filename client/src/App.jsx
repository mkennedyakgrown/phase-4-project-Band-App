import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [sessionUser, setSessionUser] = useState({});
  const [userBands, setUserBands] = useState([]);

  useEffect(() => {
    console.log("Loading User");
    fetch(`/api/users/1`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSessionUser(data);
          console.log(`Session User: ${data.username}`);
        }
      });
    fetch(`/api/users/bands/1`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Loading User Bands");
        setUserBands(data);
        console.log(`User Bands: ${data}`);
      });
  }, []);

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <Outlet context={{ sessionUser, userBands, setUserBands }} />
    </>
  );
}

export default App;
