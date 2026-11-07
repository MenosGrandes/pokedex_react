import React from "react";

export const ErrorMain = ({ error }) => {
  return (
    <main className="container">
      <h1>Pokédex</h1>
      <div className="error">{error}</div>
    </main>
  );
};
