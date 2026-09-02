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
    <article className="pokemon-card">
      <PokemonImage image={image} name={pokemonName} />
      <div className="pokemon-info">
        <span className="pokemon-id">#{String(pokemon.id).padStart(4, "0")}</span>
        <h2 className="pokemon-name">{pokemonName}</h2>
        <PokemonType types={pokemon.types} />
      </div>
    </article>
  );
}

export default PokemonCard;
