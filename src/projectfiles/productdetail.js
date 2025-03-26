import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "./productdetail.json";
import "./productdetail.css";

function ProductDetails({ updateCartCount }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [product, setProduct] = useState(null);
    const [isInCart, setIsInCart] = useState(false);


    useEffect(() => {
        const foundProduct = ProductData.find((item) => item.id.toString() === id);
        setProduct(foundProduct);
    }, [id]);

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }
        setIsInCart(true);


        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate(ProductDetails);
        }, 1000);
    };

    return (
        <div className="product-detail-container">
            <img src={`/images/${product.image}`} alt={product.title} className="product-image" />
            <div className="product-info">
                <h1>{product.title}</h1>
                <p className="product-price">₹{product.price}</p>
                <p>{product.description}</p>

                {!isInCart ? (
                    <button className="batcp" onClick={() => navigate("/")}>Back to Products</button>
                ) : (
                    <button className="batcp" onClick={() => navigate("/mycart")}>View in Cart</button>
                )}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>✅ Successfully added to cart!</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProductDetails;
