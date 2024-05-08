import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [bands, setBands] = useState([]);
  const [users, setUsers] = useState([]);
  const [sessionUser, setSessionUser] = useState({});
  const [userBands, setUserBands] = useState([]);

  // useEffect(() => {
  //   fetch("/api/bands")
  //     .then((r) => r.json())
  //     .then((data) => setBands(data));
  //   fetch("/api/users")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setUsers(data);
  //       setSessionUser(data[0]);
  //     });
  // }, []);
  useEffect(() => {
    console.log("Loading User");
    fetch(`/api/users/${1}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSessionUser(data);
          console.log(`Session User: ${data.username}`);
        }
      });
    fetch(`/api/bands/${1}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Loading Bands");
        setUserBands(data);
        console.log(`User Bands: ${data}`);
      });
  }, []);

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <Outlet context={{ bands, users, sessionUser, userBands }} />
    </>
  );
}

export default App;
