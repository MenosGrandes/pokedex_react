
import { use, useReducer } from "react";
import PokemonSearch from "./PokemonSearch";
import { usePokemonPagination } from "../../hooks/usePokemonPagination";
import { pokemonReducer } from "../../state/pokemonReducer";
import { initialState } from "../../state/initialState";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router";


export function PokemonDashboard({ pokemonPromise }) {
    const { favorites } = useFavorites();

    const pokemonIndex = use(pokemonPromise);

    const [state, dispatch] = useReducer(
        pokemonReducer,
        initialState
    );

    const {
        filteredPokemon,
        paginatedPokemon,
        totalPages
    } = usePokemonPagination(
        pokemonIndex,
        state.search,
        state.currentPage
    );

    return (
        <main className="container">
            <Link to="/favorites" className="back-button">
                Favorites ({favorites.length})
            </Link>

            <PokemonSearch
                search={state.search}
                dispatch={dispatch}
            />

            <p className="results-count">
                {filteredPokemon.length} Pokémon found
            </p>

            {filteredPokemon.length === 0 ? (
                <div className="empty">
                    No Pokémon found.
                </div>
            ) : (
                <>
                    <PokemonGrid
                        pokemon={paginatedPokemon}
                        state={state}
                        dispatch={dispatch}
                    />

                    <Pagination
                        currentPage={state.currentPage}
                        totalPages={totalPages}
                        dispatch={dispatch}
                    />
                </>
            )}
        </main>
    );
}
