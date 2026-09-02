export default function PokemonCard({ image, name }) {
  return (
    <>
      <div className="pokemon-image-container">
        {image ? (
          <img className="pokemon-image" src={image} alt={name} loading="lazy" />
        ) : (
          <div className="no-image">No image</div>
        )}
      </div>
    </>
  );
}
