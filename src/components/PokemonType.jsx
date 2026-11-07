const typeColors = {
  "normal": "bg-[#a8a77a] text-white",
  "fire": "bg-[#ee8130] text-white",
  "water": "bg-[#6390f0] text-white",
  "electric": "bg-[#f7d02c] text-[#111827]",
  "grass": "bg-[#7ac74c] text-white",
  "ice": "bg-[#96d9d6] text-[#111827]",
  "fighting": "bg-[#c22e28] text-white",
  "poison": "bg-[#a33ea1] text-white",
  "ground": "bg-[#e2bf65] text-[#111827]",
  "flying": "bg-[#a98ff3] text-white",
  "psychic": "bg-[#f95587] text-white",
  "bug": "bg-[#a6b91a] text-white",
  "rock": "bg-[#b6a136] text-white",
  "ghost": "bg-[#735797] text-white",
  "dragon": "bg-[#6f35fc] text-white",
  "dark": "bg-[#705746] text-white",
  "steel": "bg-[#b7b7ce] text-[#111827]",
  "fairy": "bg-[#d685ad] text-white",

};

export default function PokemonType({ types }) {
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {types.map(({ type }) => (
          <span className={`px-[9px] py-1 rounded-full text-[12px] font-semibold capitalize ${typeColors[type.name] || 'bg-gray-200'}`} key={type.name}>
            {type.name}
          </span>
        ))}
      </div>
    </>
  );
}
