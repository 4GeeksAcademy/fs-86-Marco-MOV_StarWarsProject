import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark p-3">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
                        alt="Star Wars"
                        height="40"
                    />
                </Link>
                <div className="dropdown">
                    <button
                        className="btn btn-warning dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites ({store.favorites.length})
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((fav, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                >
                                    <span>{fav.name}</span>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => actions.removeFavorite(fav.uid, fav.type)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item text-muted">No favorites yet</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};