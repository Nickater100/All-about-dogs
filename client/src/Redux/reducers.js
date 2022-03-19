const initialState = { 
    apigames : [],
    gameDetail : {},
    genre : [],
    dbGame : [],
    plataformas : [],
    games: [],
}

function rootReducer(state = initialState,action) {
    switch(action.type){
        case "GET_ALL_GAMES":
            return{
                ...state,
                games: action.payload
            }
        case "GET_API_GAMES":
            return{
                ...state,
                apigames: action.payload
            };

        case "GET_DB_GAMES":
            return{
                ...state,
                dbGame: action.payload
            };
        case "PLATAFORMAS":
            return{
                ...state,
                plataformas: action.payload
            }
        case "GAMES_DETALLES":
            return{
                ...state,
                gameDetail: action.payload
            };
        case "GAMES_NAME":
            return{
                ...state,
                games: action.payload
            }
        case "GET_GENEROS":
            return{
                ...state,
                genre: action.payload
            }
            case "ordenar-rasc-rdesc":
                return {
                    ...state,
                    games: state.games.sort(function(a, b){
                        if(a.rating > b.rating) { return -1; }
                        if(a.rating < b.rating) { return 1; }
                        return 0;
                })
            }
            case "ordenar-rdesc-rasc":
            return {
                ...state,
                 games: state.games.sort(function(a, b){
                    if(a.rating < b.rating) { return -1; }
                    if(a.rating > b.rating) { return 1; }
                    return 0;
                })
            }
            case "ordenar-asc-desc":
                return {
                    ...state,
                    games: state.games.sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                })
            }
        case "ordenar-desc-asc":
            return {
                ...state,
                 games: state.games.sort(function(a, b){
                    if(a.name > b.name) { return -1; }
                    if(a.name < b.name) { return 1; }
                    return 0;
                })
            }
        case "FILTROGEN":
            return{
                ...state,
                games: action.payload
            }
            default:
        return state;
    };
    
    
}

export default rootReducer;