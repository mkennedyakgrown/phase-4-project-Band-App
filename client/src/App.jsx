import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}

export default App;
