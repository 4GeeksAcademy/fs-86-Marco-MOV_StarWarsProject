const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [], 
            planets: [],
            starships: [],
            favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        },
        actions: {
            
            loadData: async () => {
                try {
                    const characterResponse = await fetch("https://www.swapi.tech/api/people");
                    const characterData = await characterResponse.json();
                    setStore({ characters: characterData.results || [] });
            
                    const planetResponse = await fetch("https://www.swapi.tech/api/planets");
                    const planetData = await planetResponse.json();
                    setStore({ planets: planetData.results || [] });
            
                    const starshipResponse = await fetch("https://www.swapi.tech/api/starships");
                    const starshipData = await starshipResponse.json();
                    setStore({ starships: starshipData.results || [] });
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            },
            
            addFavorite: (item) => {
                const store = getStore();
                const isAlreadyFavorite = store.favorites.some(
                    (fav) => fav.uid === item.uid && fav.type === item.type
                );
                if (!isAlreadyFavorite) {
                    const updatedFavorites = [...store.favorites, item];
                    setStore({ favorites: updatedFavorites });
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                }
            },
            
            removeFavorite: (uid, type) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(
                    (fav) => fav.uid !== uid || fav.type !== type
                );
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },
            isFavorite: ({ uid, type }) => {
                const store = getStore();
                return store.favorites.some((fav) => fav.uid === uid && fav.type === type);
            },
        }
    };
};

export default getState;