import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
        <h1 className="navbar-title">Mindful Timer</h1>
        <NavLink to="/" className="navbar-link" id="HomeNav">Home</NavLink>
        <NavLink to="/timer" className="navbar-link" id="TimerNav">Timer</NavLink>
        <NavLink to="/consigli" className="navbar-link" id="TipsNav">Consigli</NavLink>

    </nav>
  );
}
