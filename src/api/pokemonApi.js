const API_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonIndex(signal) {
  const response = await fetch(`${API_URL}/pokemon?limit=2000&offset=0`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon list: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
}

export async function fetchPokemonDetails(url, signal) {
  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon details: ${response.status}`);
  }

  return response.json();
}
