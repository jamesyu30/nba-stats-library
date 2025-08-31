import logo from "../assets/site-logo.jpg"
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
          <NavLink to="/" className="logoLink" aria-label="Home">
            <img src={logo} alt="NBA Logo" className="siteLogo" />
          </NavLink>
    <nav className="navbar">
          <NavLink to="/"><p>Home</p></NavLink>
          <NavLink to="/favorites"><p>Favorites</p></NavLink>
          <NavLink to="/allplayers"><p>Players</p></NavLink>
          <NavLink to="/teams"><p>Teams</p></NavLink>
          <NavLink to="/stats"><p>Stats</p></NavLink>
          <NavLink to="/compare"><p>Compare</p></NavLink>
          <NavLink to="/standings"><p>Standings</p></NavLink>
          <NavLink to="/games"><p>Games</p></NavLink>
          <NavLink to="/about"><p>About</p></NavLink>
    </nav>
    </header>
  );
}