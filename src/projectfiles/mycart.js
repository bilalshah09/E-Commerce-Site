import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mycart.css";

function MyCart({ updateCartCount }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            const price = parseInt(item.price.toString().replace(/[^0-9]/g, ""), 10) || 0;
            return acc + price * (item.quantity || 1);
        }, 0);
        setTotalPrice(total);
    }, [cart]);

    const formatPrice = (price) => {
        return price.toLocaleString("en-IN");
    };

    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        updateCart(updatedCart);
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
            )
            .filter((item) => item.quantity > 0);
        updateCart(updatedCart);
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        updateCart(updatedCart);
    };

    

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    };

    return (
        <div>


            {cart.length > 0 ? (
                <div className="cart-container">
                    {cart.map((item) => {
                        const price = parseInt(item.price.toString().replace(/[^0-9]/g, ""), 10) || 0;
                        return (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-image" />
                                <div className="cart-info">
                                    <h3>{item.title}</h3>
                                    <p className="mycart-price">₹{formatPrice(price * (item.quantity || 1))}</p>
                                    <div className="quantity-control">
                                        <button className="btnde" onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <span className="quantity">{item.quantity || 1}</span>
                                        <button className="btnin" onClick={() => increaseQuantity(item.id)}>+</button>
                                    </div>
                                    <button className="br" onClick={() => handleRemoveItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <h3 className="total-price">Total: ₹{formatPrice(totalPrice)}
                    </h3>

                    
                </div>
            ) : (
                <div className="empty-cart-container">
                    <h3 className="mcem">Your cart is empty.</h3>
                    <button className="batcp1" onClick={() => navigate("/")}>
                        Back to Products
                    </button>
                </div>)}
        </div>
    );
}

export default MyCart;
