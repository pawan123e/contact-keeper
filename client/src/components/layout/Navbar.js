import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const {user, isAuthenticated, logout} = authContext;

const authenticated = (
    <>
         <span className="link">
             Hello {user && user.name}
          </span>

          <a href="" className="link" onClick={logout}>
             <i className="fas fa-sign-out-alt"></i>Logout 
          </a>  

          <Link to='/about' className="link">
             About 
          </Link>
    </>       )


const notAuthenticated = ( 
    <>
    <Link to ='/register' className="link">
             Register
          </Link>
          <Link to='/login' className="link">
             Login
          </Link>
          <Link to='/about' className="link">
             About 
          </Link>
    </>)
    return (
        <nav className="navbar navbar-default bg-dark" style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="navbar-header">
          <h3 >
              <span  className="link">
              Contact Keeper
              </span>
          </h3>
          </div> 
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {isAuthenticated === true ? authenticated : notAuthenticated}
          </div>
        </nav>
    )
}

export default Navbar
