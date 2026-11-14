
export default function PokemonSearch({ search, dispatch }) {
    return (
        <header className="header">
            <h1>Pokédex</h1>

            <input
                className="search"
                type="search"
                placeholder="Search Pokémon..."
                value={search}
                onChange={e =>
                    dispatch({
                        type: "SET_SEARCH",
                        payload: e.target.value
                    })
                }
                aria-label="Search Pokémon"
            />
        </header>
    );
}
