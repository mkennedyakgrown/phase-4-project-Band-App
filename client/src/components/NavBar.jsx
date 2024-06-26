import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuItem, Menu, Button } from "semantic-ui-react";
import "../App.css";

function NavBar({ user, setUser }) {
  const [activeItem, setActiveItem] = useState("home");

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }

  function handleLogoutClick() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser({});
      }
    });
  }

  return (
    <Menu fixed="top" className="navBar" fluid>
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
      <MenuItem
        name="profile"
        as={NavLink}
        to={`/users/${user.username}`}
        className="nav-link"
        onClick={handleItemClick}
      >
        Profile
      </MenuItem>
      {user.id ? (
        <MenuItem
          name="config"
          as={NavLink}
          to="/config"
          className="nav-link"
          onClick={handleItemClick}
        >
          Config
        </MenuItem>
      ) : null}
      {user.id ? (
        <Button onClick={handleLogoutClick}>Logout</Button>
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
