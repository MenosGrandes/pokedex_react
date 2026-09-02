import { useEffect, useMemo, useState } from "react";
import { fetchPokemonIndex } from "./api/pokemonApi";
import PokemonGrid from "./components/PokemonGrid";
import "./App.css";
const ITEMS_PER_PAGE = 20;

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
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
    return (
      <main className="container">
        <h1>Pokédex</h1>
        <div className="status">Loading Pokémon...</div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="container">
        <h1>Pokédex</h1>

        <div className="error">{error}</div>
      </main>
    );
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
          <PokemonGrid pokemon={paginatedPokemon} />

          <nav className="pagination" aria-label="Pokémon pagination">
            <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
              ← Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next →
            </button>
          </nav>
        </>
      )}
    </main>
  );
}

export default App;
