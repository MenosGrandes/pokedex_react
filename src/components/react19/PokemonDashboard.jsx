import { use, useMemo, useState } from "react";
import PokemonGrid from "../PokemonGrid";

const ITEMS_PER_PAGE = 20;

export function PokemonDashboard({ pokemonPromise }) {
    /*https://react.dev/reference/react/use */
    const pokemon = use(pokemonPromise);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPokemon = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return pokemon;
        return pokemon.filter((p) => p.name.toLowerCase().includes(query));
    }, [pokemon, search]);

    const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE) || 1;

    const paginatedPokemon = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredPokemon.slice(startIndex, endIndex);
    }, [filteredPokemon, currentPage]);

    function handleSearch(event) {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    return (
        <main className="container">
            <header className="header">
                <h1>Pokédex</h1>
                <input
                    className="search"
                    type="search"
                    placeholder="Search Pokémon..."
                    value={search}
                    onChange={handleSearch}
                    aria-label="Search Pokémon"
                />
                <p className="results-count">{filteredPokemon.length} Pokémon found</p>
            </header>

            {paginatedPokemon.length === 0 ? (
                <div className="empty">No Pokémon found.</div>
            ) : (
                <>
                    {/* Zakładam, że masz zaimportowany PokemonGrid */}
                    <PokemonGrid pokemon={paginatedPokemon} />

                    <nav className="pagination" aria-label="Pokémon pagination">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            type="button"
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                    </nav>
                </>
            )}
        </main>
    );
}
