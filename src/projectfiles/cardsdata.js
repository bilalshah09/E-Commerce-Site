import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "./cardsdata.json";
import "./cardsdata.css";
import { FaThLarge, FaList } from "react-icons/fa";


function CardsData({ searchQuery = "", setCartCount }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [view, setView] = useState("grid");
    const [sortOrder, setSortOrder] = useState("relevance");
    const [filteredProducts, setFilteredProducts] = useState([]);

    
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart.map(item => item.id));
    }, []);

    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    useEffect(() => {
        let sortedProducts = [...productsData].filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOrder === "lowToHigh") {
            sortedProducts.sort((a, b) => parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, "")));
        } else if (sortOrder === "highToLow") {
            sortedProducts.sort((a, b) => parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, "")));
        } else {
            sortedProducts = shuffleArray(sortedProducts);
        }

        console.log("Sort Order:", sortOrder, "Sorted Products:", sortedProducts);
        setFilteredProducts(sortedProducts);
    }, [searchQuery, sortOrder]);

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
        setCartItems(cart.map(item => item.id));

        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 500);
    };

    return (
        <div className="whole">
           
            <div className="product-toolbar">
                <div className="view-options">
                    <span>View As</span>
                    <button className={`grid-icon ${view === "grid" ? "active" : ""}`}
                        onClick={() => setView("grid")}
                        title="Grid View">
                        <FaThLarge />
                    </button>

                    <button className={`list-icon ${view === "list" ? "active" : ""}`}
                        onClick={() => setView("list")}
                        title="List View">
                        <FaList />
                    </button>


                </div>
                <span>{filteredProducts.length} products</span>
                <div className="sort-options">
                    <label>SORT BY:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => {
                            console.log("Sort Order Changed To:", e.target.value);
                            setSortOrder(e.target.value);
                        }}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="lowToHigh">Price ascending</option>
                        <option value="highToLow">Price descending</option>
                    </select>
                </div>
            </div>

            <div className={`product-container ${view}`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={`${product.id}-${sortOrder}`} className={`card ${view}`}>
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

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h4>✅ Successfully added to cart!</h4>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardsData;
