
import "./App.css";


import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { Suspense, useMemo } from "react";
import { PokemonDashboard } from "./components/PokemonDashboard";
import { fetchPokemonIndex } from "./api/pokemonApi";

function App() {
  const pokemonPromise = useMemo(() => fetchPokemonIndex(), []
  );

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <Error error="Unable to load Pokémon. Please try again." className="container" />
      )}
    >
      <Suspense fallback={<Loading className={"status"} string={"Loading Pokemon..."} />}>
        <PokemonDashboard pokemonPromise={pokemonPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
