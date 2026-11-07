import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { fetchPokemonIndex } from "../../api/pokemonApi";
import { PokemonDashboard } from "./PokemonDashboard";

import { ErrorMain } from "../ErrorMain";
import { LoadingMain } from "../LoadingMain";

function AppReact19() {

    const pokemonPromise = useMemo(() => fetchPokemonIndex(), []);

    return (
        /*https://www.npmjs.com/package/react-error-boundary */
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorMain error="Unable to load Pokémon. Please try again." />
            )}
        >
            {/* https://react.dev/reference/react/Suspense */}
            <Suspense fallback={<LoadingMain />}>
                <PokemonDashboard pokemonPromise={pokemonPromise} />
            </Suspense>
        </ErrorBoundary>
    );
}

export default AppReact19;
