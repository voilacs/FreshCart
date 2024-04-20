import { Link } from 'react-router-dom';

const Navbar = ({ loggedInUser, handleLogout })=> {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FreshCart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {loggedInUser ? null : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {' '}
                    Login
                  </Link>
                </li>
              )}
              {loggedInUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout ({loggedInUser})
                  </button>
                </li>
              </>
            ) : null}
            {loggedInUser ?  (
                <li className="nav-item">
                  <Link className="nav-link" to="/foryou">
                    {' '}
                    For-You
                  </Link>
                </li>
              ) : null}
              <li className = "nav-item">
                <Link className='nav-link ' to="/warehouses">
                  Warehouses
                </Link>
              </li>
              <li className = "nav-item">
                <Link className='nav-link ' to="/buyerData">
                  BuyerData
                </Link>
              </li>
              // <li className = "nav-item">
              //   <Link className='nav-link ' to="/register">
              //     Register
              //   </Link>
              // </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

export default Navbar;
