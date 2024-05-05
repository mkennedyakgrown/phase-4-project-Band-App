import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="App-header">
        <NavBar />
      </header>
      <Outlet
        context={{
          count: count,
          setCount: setCount,
        }}
      />
    </>
  );
}

export default App;
