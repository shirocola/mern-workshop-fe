import { Link, useNavigate } from "react-router-dom"
import { getUser, logout } from "../service/authorize"
const NavbarComponent = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {
          !getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          )
        }
        {
          getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </li>
          )}
        {
          getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/create" className="nav-link">Create</Link>
            </li>
          )}
      </ul>
    </nav>
  )
}

export default NavbarComponent