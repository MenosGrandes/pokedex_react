import { Link } from "react-router";
import { useFavorites } from "../context/FavoriteContext";
import PokemonCard from "./PokemonCard";

function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <main className="container">

            <Link to="/" className="back-button">
                Back to Dashboard
            </Link>
            <h1>My Favorite Pokémon</h1>

            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="pokemon-grid">
                    {favorites.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default FavoritesPage;