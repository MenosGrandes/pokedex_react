export function pokemonReducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                status: "loading",
                error: null,
                requestId: action.payload
            };

        case "FETCH_SUCCESS":
            if (action.payload.requestId !== state.requestId) {
                return state;
            }

            return {
                ...state,
                pokemon: action.payload.pokemon,
                status: "success",
                error: null,
                requestId: null
            };

        case "FETCH_ERROR":
            if (action.payload.requestId !== state.requestId) {
                return state;
            }

            return {
                ...state,
                status: "error",
                error: action.payload.error,
                requestId: null
            };

        case "SET_SEARCH":
            return {
                ...state,
                search: action.payload,
                currentPage: 1
            };

        case "SET_TYPE":
            return {
                ...state,
                selectedType: action.payload,
                currentPage: 1
            };

        case "SET_PAGE":
            return {
                ...state,
                currentPage: action.payload
            };

        case "SELECT_POKEMON":
            return {
                ...state,
                selectedPokemon: action.payload
            };

        case "CLOSE_DETAILS":
            return {
                ...state,
                selectedPokemon: null
            };

        default:
            return state;
    }
}