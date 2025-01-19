import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Single = () => {
    const { type, uid } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getImageUrl = () => {
        const imageType = type === "people" ? "characters" : type;
        return `https://starwars-visualguide.com/assets/img/${imageType}/${uid}.jpg`;
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setDetails(data.result);
            } catch (err) {
                console.error("Error fetching details:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [type, uid]);

    if (loading) {
        return <h2 className="text-center">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center text-danger">Error: {error}</h2>;
    }

    return (
        <div className="container mt-5 text-light bg-dark p-4 rounded">
            {details && (
                <>
                    <h1 className="text-center mb-4">{details.properties.name}</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={getImageUrl()}
                                className="img-fluid rounded"
                                alt={details.properties.name}
                            />
                        </div>
                        <div className="col-md-6">
                            <h4 className="mb-4">Details:</h4>
                            <ul>
                                {Object.keys(details.properties).map((key) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {details.properties[key]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};