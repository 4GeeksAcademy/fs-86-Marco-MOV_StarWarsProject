import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { ItemCard } from "../component/ItemCard";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Star Wars Characters</h1>
            <div className="row">
                {store.characters.map((character) => (
                    <div className="col-md-4" key={character.uid}>
                        <ItemCard
                            item={character}
                            type="people"
                            onFavorite={() => {
                                if (actions.isFavorite({ uid: character.uid, type: "people" })) {
                                    actions.removeFavorite(character.uid, "people");
                                } else {
                                    actions.addFavorite({ uid: character.uid, type: "people", name: character.name }); // Si no lo es, lo añade
                                }
                            }}
                            isFavorite={({ uid, type }) => actions.isFavorite({ uid: character.uid, type: "people" })}
                        />
                    </div>
                ))}
            </div>

            <h1 className="text-center my-4">Star Wars Planets</h1>
            <div className="row">
                {store.planets.map((planet) => (
                    <div className="col-md-4" key={planet.uid}>
                        <ItemCard
                            item={planet}
                            type="planets"
                            onFavorite={(item) => {
                                if (item.remove) {
                                    actions.removeFavorite(item.uid, "planets");
                                } else {
                                    actions.addFavorite(item);
                                }
                            }}
                            isFavorite={({ uid, type }) => actions.isFavorite({ uid: planet.uid, type: "planets" })}
                        />
                    </div>
                ))}
            </div>

            <h1 className="text-center my-4">Star Wars Starships</h1>
            <div className="row">
                {store.starships.map((starship) => (
                    <div className="col-md-4" key={starship.uid}>
                        <ItemCard
                            item={starship}
                            type="starships"
                            onFavorite={(item) => {
                                if (item.remove) {
                                    actions.removeFavorite(item.uid, "starships");
                                } else {
                                    actions.addFavorite(item);
                                }
                            }}
                            isFavorite={({ uid, type }) => actions.isFavorite({ uid: starship.uid, type: "starships" })}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};