import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBarData from "./navbardata";
import CardsData from "./cardsdata";
import ProductDetails from "./productdetail";
import MyCart from "./mycart";

function App() {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }, []);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    return (
        <>
            <NavBarData searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartCount={cartCount} />
            
            <div className="container mt-5 pt-5"> 
                <Routes>
                    <Route path="/" element={<CardsData searchQuery={searchQuery} setCartCount={setCartCount} />} />
                    <Route path="/product/:id" element={<ProductDetails updateCartCount={updateCartCount} />} />
                    <Route path="/mycart" element={<MyCart updateCartCount={updateCartCount} />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
