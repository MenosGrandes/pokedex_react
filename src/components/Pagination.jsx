
export default function Pagination({
    currentPage,
    totalPages,
    dispatch
}) {
    return (
        <nav className="pagination" aria-label="Pokémon pagination">
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    dispatch({
                        type: "SET_PAGE",
                        payload: currentPage - 1
                    })
                }
            >
                ← Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                    dispatch({
                        type: "SET_PAGE",
                        payload: currentPage + 1
                    })
                }
            >
                Next →
            </button>
        </nav>
    );
}
