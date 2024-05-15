import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuItem, Menu } from "semantic-ui-react";
import "../App.css";
import user from "../App";

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");
  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <Menu fixed="top" className="navBar">
      <MenuItem
        name="home"
        as={NavLink}
        to="/"
        className="nav-link"
        onClick={handleItemClick}
      >
        Home
      </MenuItem>
      <MenuItem
        name="my-bands"
        as={NavLink}
        to="/my-bands"
        className="nav-link"
        onClick={handleItemClick}
      >
        My Bands
      </MenuItem>
      <MenuItem
        name="create-band"
        as={NavLink}
        to="/new-band"
        className="nav-link"
        onClick={handleItemClick}
      >
        Create a Band
      </MenuItem>
      {user != [] ? (
        <MenuItem
          name="logout"
          as={NavLink}
          to="/logout"
          className="nav-link"
          onClick={handleItemClick}
        >
          Logout
        </MenuItem>
      ) : (
        <MenuItem
          name="login"
          as={NavLink}
          to="/login"
          className="nav-link"
          onClick={handleItemClick}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );
}

export default NavBar;
