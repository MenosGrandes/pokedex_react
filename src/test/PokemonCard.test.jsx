import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonCard from "../components/PokemonCard";
describe("PokemonCard", () => {
  const pokemon = {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    sprites: {
      front_default: "https://example.com/bulbasaur.png",
      other: {
        "official-artwork": {
          front_default: "https://example.com/bulbasaur-official.png",
        },
      },
    },
  };

  it("renders the pokemon name", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByRole("heading", { name: "Bulbasaur" })).toBeInTheDocument();
  });

  it("renders the pokemon id with leading zeros", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("#0001")).toBeInTheDocument();
  });

  it("renders pokemon types", () => {
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("uses the official artwork image", () => {
    render(<PokemonCard pokemon={pokemon} />);

    const image = screen.getByRole("img", { name: "Bulbasaur" });

    expect(image).toHaveAttribute("src", "https://example.com/bulbasaur-official.png");
  });
});
