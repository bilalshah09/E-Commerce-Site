import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "./cardsdata.json";
import "./cardsdata.css";

function CardsData({ searchQuery = "", setCartCount }) {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [view] = useState("grid");
    const [sortOrder, setSortOrder] = useState("relevance");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart.map(item => item.id));
        sortProducts(productsData, searchQuery, sortOrder, cart);
    }, [searchQuery, sortOrder]);  

    const sortProducts = (products, query, order, cart) => {
        let sortedProducts = [...products].filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        const cartProductIds = cart.map(item => item.id);
        sortedProducts.sort((a, b) => {
            const aInCart = cartProductIds.includes(a.id);
            const bInCart = cartProductIds.includes(b.id);

            if (aInCart && !bInCart) return -1;
            if (!aInCart && bInCart) return 1;

            if (order === "lowToHigh") {
                return parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, ""));
            } else if (order === "highToLow") {
                return parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, ""));
            }

            return 0; 
        });

        setFilteredProducts(sortedProducts);
    };

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.unshift({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setCartItems(cart.map(item => item.id));

        sortProducts(productsData, searchQuery, sortOrder, cart);
    };

    return (
        <div className="whole">
            <div className="product-toolbar">
                <span>{filteredProducts.length} products</span>
                <div className="sort-options">
                    <label>Sort by:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="lowToHigh">Price low to high</option>
                        <option value="highToLow">Price high to low</option>
                    </select>
                </div>
            </div>

            <div className={`product-container ${view}`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className={`card ${view}`}>
                            <Link to={`/product/${product.id}`} className="card-link">
                                <img src={product.image} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-price">₹{product.price}</p>
                                </div>
                            </Link>

                            {cartItems.includes(product.id) ? (
                                <button className="batc" onClick={() => navigate("/mycart")}>
                                    View in Cart
                                </button>
                            ) : (
                                <button className="batc" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center">No products found.</p>
                )}
            </div>
        </div>
    );
}

export default CardsData;
