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
      <div className="grid grid-cols-4 gap-6 w-full">
        {pokemon.map((pokemon) => (
          <div className="relative min-w-0 overflow-hidden bg-white border border-[#e5e7eb] rounded-[16px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]
 flex items-center justify-center min-h-[300px] text-[#9ca3af] animate-pulse
" key={pokemon.name}>
            Loading...
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <div className="py-[60px] px-5 text-center text-[#dc2626]">{error}</div>;
  }

  return (
    <section className="grid grid-cols-4 gap-6 w-full" aria-label="Pokémon">
      {pokemonDetails.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonGrid;
