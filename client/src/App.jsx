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
    fetch(`/api/users/${1}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSessionUser(data);
        }
      });
    fetch(`/api/bands/${sessionUser.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setUserBands(data);
        }
      });
  }, [sessionUser]);

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
