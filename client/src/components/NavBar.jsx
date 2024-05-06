import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuItem, Menu } from "semantic-ui-react";
import "../App.css";

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");
  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <Menu horizontal className="navBar">
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
        name="browse"
        as={NavLink}
        to="/browse"
        className="nav-link"
        onClick={handleItemClick}
      >
        Browse
      </MenuItem>
      <MenuItem
        name="login"
        as={NavLink}
        to="/login"
        className="nav-link"
        onClick={handleItemClick}
      >
        Login
      </MenuItem>
    </Menu>
  );
}

export default NavBar;
