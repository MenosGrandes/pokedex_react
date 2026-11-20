
import {
    createContext,
    useContext,
    useState,
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    function toggleFavorite(pokemon) {
        setFavorites((previousFavorites) => {
            const alreadyFavorite = previousFavorites.some(
                (item) => item.id === pokemon.id
            );

            if (alreadyFavorite) {
                return previousFavorites.filter(
                    (item) => item.id !== pokemon.id
                );
            }

            return [...previousFavorites, pokemon];
        });
    }

    function isFavorite(pokemonId) {
        return favorites.some(
            (pokemon) => pokemon.id === pokemonId
        );
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}
