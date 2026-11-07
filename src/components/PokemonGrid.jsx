import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../api/pokemonApi";
import PokemonCard from "./PokemonCard";

function PokemonGrid({ pokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDetails() {
      try {
        setStatus("loading");
        setError(null);

        const details = await Promise.all(
          pokemon.map((pokemon) => fetchPokemonDetails(pokemon.url, controller.signal)),
        );

        setPokemonDetails(details);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(error);
        setError("Unable to load Pokémon details.");
        setStatus("error");
      }
    }

    loadDetails();

    return () => {
      controller.abort();
    };
  }, [pokemon]);

  if (status === "loading") {
    return (
      <div className="pokemon-grid">
        {pokemon.map((pokemon) => (
          <div className="pokemon-card skeleton" key={pokemon.name}>
            Loading...
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="pokemon-grid" aria-label="Pokémon">
      {pokemonDetails.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonGrid;
