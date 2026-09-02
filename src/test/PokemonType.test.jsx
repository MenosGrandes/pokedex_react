import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonType from "../components/PokemonType";

describe("PokemonType", () => {
  it("renders all pokemon types", () => {
    const types = [
      { type: { name: "grass" } },
      { type: { name: "poison" } },
    ];

    render(<PokemonType types={types} />);

    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("adds the correct type class", () => {
    const types = [{ type: { name: "fire" } }];

    render(<PokemonType types={types} />);

    expect(screen.getByText("fire")).toHaveClass("type");
    expect(screen.getByText("fire")).toHaveClass("type-fire");
  });

  it("renders no types when types is empty", () => {
    render(<PokemonType types={[]} />);

    expect(document.querySelector(".pokemon-types")).toBeInTheDocument();
    expect(document.querySelectorAll(".pokemon-types .type")).toHaveLength(0);
  });
});
