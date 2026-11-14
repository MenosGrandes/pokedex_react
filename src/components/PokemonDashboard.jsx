
import { use, useReducer } from "react";
import PokemonSearch from "./PokemonSearch";
import { usePokemonPagination } from "../../hooks/usePokemonPagination";
import { pokemonReducer } from "../../state/pokemonReducer";
import { initialState } from "../../state/initialState";
import PokemonDetails from "./PokemonDetails";
import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";


export function PokemonDashboard({ pokemonPromise }) {
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
            <PokemonSearch
                search={state.search}
                dispatch={dispatch}
            />

            <p className="results-count">
                {filteredPokemon.length} Pokémon found
            </p>

            {state.selectedPokemon ? (
                <PokemonDetails
                    pokemon={state.selectedPokemon}
                    onClose={() => dispatch({ type: "CLOSE_DETAILS" })}
                />
            ) : filteredPokemon.length === 0 ? (
                <div className="empty">No Pokémon found.</div>
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
