import PokemonType from "./PokemonType";

export default function PokemonDetails({
    pokemon,
    onClose
}) {
    const image =
        pokemon.sprites?.other?.["official-artwork"]?.front_default;

    return (
        <section className="pokemon-details">
            <button onClick={onClose}>
                ← Back to Pokédex
            </button>

            <h2>
                {pokemon.name.toUpperCase()}
            </h2>

            <img src={image} alt={pokemon.name} />

            <PokemonType types={pokemon.types} />

            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>

            <h3>Abilities</h3>

            <ul>
                {pokemon.abilities.map(({ ability }) => (
                    <li key={ability.name}>
                        {ability.name}
                    </li>
                ))}
            </ul>

            <h3>Statistics</h3>

            <div className="pokemon-stats">
                {pokemon.stats.map(({ stat, base_stat }) => (
                    <div className="stat-row" key={stat.name}>
                        <span className="stat-name">
                            {stat.name.replace("-", " ")}
                        </span>

                        <span className="stat-value">
                            {base_stat}
                        </span>

                        <div className="stat-bar">
                            <div
                                className="stat-bar-fill"
                                style={{
                                    width: `${Math.min(base_stat / 255 * 100, 100)}%`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}