import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ItemCard = ({ item, type, onFavorite, isFavorite }) => {
    const [isImageError, setIsImageError] = useState(false);

    const getImageUrl = () => {
        const imageType = type === "people" ? "characters" : type;
        return `https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`;
    };

    return (
        <div className="card dark-card">
            <img
                src={isImageError ? "https://placehold.co/300x200?text=No+Image" : getImageUrl()}
                alt={item.name}
                className="card-image"
                onError={() => setIsImageError(true)}
            />
            <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <div className="card-actions">
                    <Link to={`/single/${type}/${item.uid}`} className="learn-more-button">
                        Learn More
                    </Link>
                    <button
                        className={`favorite-button ${
                            isFavorite({ uid: item.uid, type }) ? "favorite-active" : ""
                        }`}
                        onClick={() => onFavorite({ uid: item.uid, type, name: item.name })}
                    >
                        <i className={`fa ${
                                isFavorite({ uid: item.uid, type })
                                    ? "fa-solid fa-heart"
                                    : "fa-regular fa-heart"
                            }`}
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.func.isRequired,
};