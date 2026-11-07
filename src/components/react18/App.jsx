import { useEffect, useMemo, useState } from "react";
import { LoadingMain } from "../LoadingMain";
import { ErrorMain } from "../ErrorMain";
import { fetchPokemonIndex } from "../../api/pokemonApi";
import PokemonGrid from "../PokemonGrid";
const ITEMS_PER_PAGE = 20;

function AppReact18() {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    useEffect(() => {
        {/*https://developer.mozilla.org/en-US/docs/Web/API/AbortController */ }
        const controller = new AbortController();
        async function loadPokemon() {
            try {
                setStatus("loading");
                setError(null);

                const data = await fetchPokemonIndex(controller.signal);

                setPokemon(data);
                setStatus("success");
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }
                console.error(error);
                setError("Unable to load Pokémon. Please try again.");
                setStatus("error");
            }
        }

        loadPokemon();
        return () => {
            controller.abort();
        };
    }, []);

    const filteredPokemon = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            return pokemon;
        }
        return pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
    }, [pokemon, search]);

    /*
     * PAGINATION
     *
     * Calculate how many pages we have.
     */
    const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

    /*
     * Select only the Pokémon for the current page.
     */
    const paginatedPokemon = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

        const endIndex = startIndex + ITEMS_PER_PAGE;

        return filteredPokemon.slice(startIndex, endIndex);
    }, [filteredPokemon, currentPage]);

    function handleSearch(event) {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    function handlePreviousPage() {
        setCurrentPage((page) => Math.max(page - 1, 1));
    }

    function handleNextPage() {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    }

    if (status === "loading") {
        return <LoadingMain />;
    }

    if (status === "error") {
        return <ErrorMain error={error} />;
    }

    return (
        <main className="w-full max-w-[1200px] mx-auto px-6 py-10">
            <header className="mb-10 text-center">
                <h1 className="m-0 mb-6 text-[48px] font-extrabold">Pokédex</h1>

                <input
                    className="w-full max-w-[450px] px-[18px] py-[14px] border border-[#d1d5db] rounded-[10px] bg-white text-[#111827] text-base outline-none focus:border-[#6366f1] focus:ring-[3px] focus:ring-[#6366f1]/15"
                    type="search"
                    placeholder="Search Pokémon..."
                    value={search}
                    onChange={handleSearch}
                    aria-label="Search Pokémon"
                />

                <p className="mt-[14px] text-[#6b7280] text-sm">{filteredPokemon.length} Pokémon found</p>
            </header>

            {paginatedPokemon.length === 0 ? (
                <div className="py-[60px] px-5 text-center">No Pokémon found.</div>
            ) : (
                <>
                    <PokemonGrid pokemon={paginatedPokemon} />

                    <nav className="flex items-center justify-center gap-5 mt-10" aria-label="Pokémon pagination">
                        <button className="px-4 py-2.5 border border-[#d1d5db] rounded-lg bg-white text-[#111827] cursor-pointer hover:enabled:bg-[#f3f4f6] disabled:opacity-40 disabled:cursor-not-allowed
"
                            type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            ← Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button className="px-4 py-2.5 border border-[#d1d5db] rounded-lg bg-white text-[#111827] cursor-pointer hover:enabled:bg-[#f3f4f6] disabled:opacity-40 disabled:cursor-not-allowed
"
                            type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next →
                        </button>
                    </nav>
                </>
            )}
        </main>
    );
}

export default AppReact18;
