import { NavLink } from "react-router-dom";
import { MenuItem, Menu } from "semantic-ui-react";

function NavBar() {
  return (
    <Menu>
      <MenuItem as={NavLink} to="/" className="nav-link">
        Home
      </MenuItem>
      <MenuItem as={NavLink} to="/login" className="nav-link">
        Login
      </MenuItem>
    </Menu>
  );
}

export default NavBar;
