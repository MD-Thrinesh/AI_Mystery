import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">AI Mystery Room</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create a Mystery</Link>
      </div>
    </nav>
  );
}
