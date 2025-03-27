import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductData from "./productdetail.json";
import "./productdetail.css";

function ProductDetails({ updateCartCount }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const foundProduct = ProductData.find((item) => item.id.toString() === id);
        setProduct(foundProduct);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setIsInCart(cart.some(item => item.id === foundProduct?.id));
    }, [id]);

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setIsInCart(true);
    };

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="product-detail-container">
            <img src={`/images/${product.image}`} alt={product.title} className="product-image" />
            <div className="product-info">
                <h1>{product.title}</h1>
                <p className="product-price">₹{product.price}</p>
                <p>{product.description}</p>

                <h3>Key Features:</h3>
                <p>Experience the best-in-class technology with these amazing features:</p>
                <ul>
                    {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>

                <div className="button-group">
                    {!isInCart ? (
                        <button className="batc" onClick={handleAddToCart}>Add to Cart</button>
                    ) : (
                        <button className="batc" onClick={() => navigate("/mycart")}>View in Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
