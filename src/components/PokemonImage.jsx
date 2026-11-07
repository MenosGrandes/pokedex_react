export default function PokemonCard({ image, name }) {
  return (
    <>
      <div className="flex items-center justify-center w-full aspect-square bg-[#f3f4f6]">
        {image ? (
          <img className="block w-[85%] h-[85%] object-contain" src={image} alt={name} loading="lazy" />
        ) : (
          <div className="text-[#9ca3af]">No image</div>
        )}
      </div>
    </>
  );
}
