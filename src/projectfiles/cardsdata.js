import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import productsData from "./cardsdata.json";
import "./cardsdata.css";

function CardsData({ searchQuery = "" }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [view] = useState("grid");
    const [sortOrder, setSortOrder] = useState("relevance");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sortOption = params.get("sort") || "relevance";
        setSortOrder(sortOption);
        sortProducts(productsData, searchQuery, sortOption);
    }, [searchQuery, location.search]);

    const sortProducts = (products, query, order) => {
        let sortedProducts = [...products].filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        if (order === "lowToHigh") {
            sortedProducts.sort((a, b) => 
                parseFloat(a.price.replace(/,/g, "")) - parseFloat(b.price.replace(/,/g, ""))
            );
        } else if (order === "highToLow") {
            sortedProducts.sort((a, b) => 
                parseFloat(b.price.replace(/,/g, "")) - parseFloat(a.price.replace(/,/g, ""))
            );
        }

        setFilteredProducts(sortedProducts);
    };

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        navigate(`?sort=${selectedSort}`);
    };

    return (
        <div className="whole">
            <div className="product-toolbar">
                <span>{filteredProducts.length} products</span>
                <div className="sort-options">
                    <label>Sort by:</label>
                    <select value={sortOrder} onChange={handleSortChange}>
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
                            <Link to={`/product/${product.id}${location.search}`} className="card-link">
                                <img 
                                    src={`/images/${product.image}`} 
                                    className="card-img-top" 
                                    alt={product.title} 
                                    onError={(e) => e.target.src = "/images/default.png"}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-price">₹{product.price}</p>
                                </div>
                            </Link>
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
