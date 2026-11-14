
import { useMemo } from "react";

const ITEMS_PER_PAGE = 20;

export function usePokemonPagination(pokemon, search, currentPage) {
    const filteredPokemon = useMemo(() => {
        const query = search.trim().toLowerCase();

        return pokemon.filter(p =>
            p.name.toLowerCase().includes(query)
        );
    }, [pokemon, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE)
    );

    const paginatedPokemon = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;

        return filteredPokemon.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredPokemon, currentPage]);

    return {
        filteredPokemon,
        paginatedPokemon,
        totalPages
    };
}
