export default function PokemonType({ types }) {
  return (
    <>
      <div className="pokemon-types">
        {types.map(({ type }) => (
          <span className={`type type-${type.name}`} key={type.name}>
            {type.name}
          </span>
        ))}
      </div>
    </>
  );
}
