
import {
  createBrowserRouter,
  Outlet,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import "./App.css";

import { PokemonDashboard } from "./components/PokemonDashboard";
import PokemonDetails from "./components/PokemonDetails";
import { Loading } from "./components/Loading";
import { fetchPokemonIndex, fetchPokemonDetails } from "./api/pokemonApi";
import { Suspense, useMemo } from "react";
import { FavoritesProvider } from "./context/FavoriteContext";
import FavoritesPage from "./components/FavoritesPage";
function Layout() {
  return <Outlet />;
}

// Dashboard route
function DashboardPage() {
  const pokemonPromise = useMemo(() => fetchPokemonIndex(), []);

  return (
    <Suspense
      fallback={
        <Loading
          className="status"
          string="Loading Pokemon..."
        />
      }
    >
      <PokemonDashboard pokemonPromise={pokemonPromise} />
    </Suspense>
  );
}
// Pokémon details route
function PokemonPage() {
  const pokemon = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="container">
      <PokemonDetails
        pokemon={pokemon}
        onClose={() => navigate("/")}
      />
    </main>
  );
}

// Loads a Pokémon based on its ID or name
async function pokemonLoader({ params }) {
  return fetchPokemonDetails(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
  );
}

// Unknown URL
function NotFoundPage() {
  return (
    <main className="container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Back to Dashboard</a>
    </main>
  );
}

// Errors thrown by loaders or route rendering
function RouteErrorPage() {
  const error = useRouteError();

  return (
    <main className="container error">
      <h1>Something went wrong</h1>
      <p>
        {error?.statusText ||
          error?.message ||
          "Unable to load this page."}
      </p>
      <a href="/">Back to Dashboard</a>
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "pokemon/:pokemonId",
        loader: pokemonLoader,
        element: <PokemonPage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);


function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}
export default App;
