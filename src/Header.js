import { Link, useNavigate } from "react-router-dom";

import { AUTH_TOKEN_KEY } from "./App";

export default function Header({ userInfo, setUserInfo }) {

  const history = useNavigate();
  const signout = () => {
    setUserInfo(null)
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
    history('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/myBooks">
                Mes livres
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myBorrows">
                Mes emprunts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listBooks">
                Livres disponibles
              </Link>
            </li>
          </ul>
          <div>Bienvenue, {userInfo}</div>
          <button className="btn btn-outline-secondary" variant="secondary" onClick={signout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </nav>
  );
}
