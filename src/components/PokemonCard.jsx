function formatPokemonName(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

import PokemonType from "./PokemonType";
import PokemonImage from "./PokemonImage";

function PokemonCard({ pokemon }) {
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default;
  const pokemonName = formatPokemonName(pokemon.name);
  return (
    <article className="relative min-w-0 overflow-hidden bg-white border border-[#e5e7eb] rounded-[16px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]
">
      <PokemonImage image={image} name={pokemonName} />
      <div className="p-4">
        <span className="block mb-1 text-[#9ca3af] text-[13px] font-semibold">#{String(pokemon.id).padStart(4, "0")}</span>
        <h2 className="m-0 mb-3 text-[#111827] text-bolder text-xl font-bold">{pokemonName}</h2>
        <PokemonType types={pokemon.types} />
      </div>
    </article>
  );
}

export default PokemonCard;
