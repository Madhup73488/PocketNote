import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        setIsNavbarOpen(false); // Close the navbar toggle button when location changes
    }, [location]);

    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/SignUpOrLogin');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">PockecketNote</Link>
                    <button
                        className={`navbar-toggler ${isNavbarOpen ? "collapsed" : ""}`}
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        type="button"
                        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                        aria-expanded={isNavbarOpen ? "true" : "false"}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {localStorage.getItem('token') ? <Link className={`nav-link ${location.pathname === '/Notes' ? 'active' : ""}`} to="/Notes">Notes</Link> : ""}

                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ""}`} aria-current="page" to="/About">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex " role="search">
                            {!localStorage.getItem('token') ? ""/*<Link className={`text-white nav-link ${location.pathname === '/SignUpOrLogin' ? 'active' : ""}`} to="/SignUpOrLogin">SignUp/Login</Link>*/ :
                                <a className={`nav-link text-white`} style={{ cursor: 'pointer' }} onClick={handlelogout}>logout</a>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
