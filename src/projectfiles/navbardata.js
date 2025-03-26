import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbardata.css";

function NavBarData({ searchQuery, setSearchQuery, cartCount }) {
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/" className="navbar-brand d-flex align-items-center text-white">
                SwiftCart
            </Link>

            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <i className="bi bi-list text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <input
                            className="seacrhbar"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </li>
                </ul>
            </div>

            <div className="d-flex align-items-center position-relative">
                <Link to="/mycart" className="position-relative">
                    <button className="bc">
                        <i className="bi bi-cart-fill"></i> Cart
                        {cartCount > 0 && (
                            <span className="cartco">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBarData;
