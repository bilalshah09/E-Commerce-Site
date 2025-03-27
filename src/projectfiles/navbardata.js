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
            <div className="container-fluid d-flex flex-column flex-lg-row align-items-center">
                <div className="d-flex justify-content-between w-100 align-items-center navbar-top">
                    <Link to="/" className="navbar-brand text-white">
                        SwiftCart
                    </Link>
                    <Link to="/mycart" className="position-relative">
                        <button className="bc">
                            <i className="bi bi-cart-fill"></i> Cart
                            {cartCount > 0 && (
                                <span className="cartco">{cartCount}</span>
                            )}
                        </button>
                    </Link>
                </div>
                <div className="search-container">
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{borderRadius:"5px", border: "none", outline: "none", padding: "6px  60px"}}
                    />
                </div>
            </div>
        </nav>
    );
}

export default NavBarData;
