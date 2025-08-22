import logo from "../assets/site-logo.jpg"

export default function Navbar() {
  return (
    <header>
          <img src={logo} alt="NBA Logo" />
    <nav>
          <p>Home</p>
          <p>Players</p>
          <p>Teams</p>
    </nav>
    </header>
  );
}