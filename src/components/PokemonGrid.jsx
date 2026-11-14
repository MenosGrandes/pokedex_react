
import { useEffect, useRef } from "react";
import { fetchPokemonDetails } from "../api/pokemonApi";
import PokemonCard from "./PokemonCard";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./Error";
import { Loading } from "./Loading";

function PokemonGrid({ pokemon, state, dispatch }) {
  const requestCounter = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const requestId = ++requestCounter.current;

    async function loadDetails() {
      dispatch({
        type: "FETCH_START",
        payload: requestId
      });

      try {
        const details = await Promise.all(
          pokemon.map(({ url }) =>
            fetchPokemonDetails(url, controller.signal)
          )
        );

        if (!active) return;

        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            requestId,
            pokemon: details
          }
        });

      } catch (error) {
        if (!active || error.name === "AbortError") return;

        dispatch({
          type: "FETCH_ERROR",
          payload: {
            requestId,
            error: "Unable to load Pokémon details."
          }
        });
      }
    }

    loadDetails();

    return () => {
      active = false;
      controller.abort();
    };

  }, [pokemon, dispatch]);

  if (state.status === "loading") {
    return (
      <div className="pokemon-grid">
        {pokemon.map(({ name }) => (
          <Loading className={"pokemon-card skeleton"} key={name} string={" Loading..."} />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return <ErrorBoundary
      fallbackRender={() => (
        <Error error={state.error} className="error" />
      )}
    ></ErrorBoundary>
  }

  return (
    <section className="pokemon-grid" aria-label="Pokémon">
      {state.pokemon.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={() =>
            dispatch({
              type: "SELECT_POKEMON",
              payload: pokemon
            })
          }
        />
      ))}
    </section>
  );
}

export default PokemonGrid;
