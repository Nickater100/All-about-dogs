import axios from "axios";

export function allGames(){
    return function(dispatch){
        return axios.get("http://localhost:3001/games")
        .then(res => {
            dispatch({type:"GET_ALL_GAMES", payload: res.data})
        })
    }
}

export function getApiGames(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/apiGames`)
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let Api = res.data[i].genres
                Api = Api.map((e)=>{
                    return e.name
                })
                res.data[i].genres = Api
              } 
            dispatch({type:"GET_API_GAMES", payload: res.data})
        })
    }
}

export function getDbGames(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/dbGames`)
        .then(res => {
            dispatch({type:"GET_DB_GAMES", payload: res.data})
        })
    }
}

export function getGamesDetails(id) {
    return function (dispatch){
        return axios.get(`http://localhost:3001/game/${id}`)
        .then(res => {
            dispatch({type: "GAMES_DETALLES", payload : res.data})
        })
    }
}

export function getGame(name) {
    return function (dispatch){
        const juegos = axios.get(`http://localhost:3001/games/${name}`)
        .then(res => {
            dispatch({type: "GAMES_NAME", payload :res.data})
        })
        return juegos
    }
}

export function getPlat(){
    return function (dispatch){
        return axios.get("http://localhost:3001/plataformas")
        .then(res => {
            dispatch({type: "PLATAFORMAS", payload: res.data})
        })
    }
}

export function getGeneros() {
    return function (dispatch){
        return axios.get(`http://localhost:3001/generos`)
        .then(res => {
            dispatch({type: "GET_GENEROS", payload : res.data})
        })
    }
}

export function filtroGenres(genres){
    return function (dispatch) {
        return axios.get(`http://localhost:3001/games`).then((res) => {
          const Db = [];
          const ApiFinal = [];
           for (let i = 0; i < res.data.length; i++) {
            const verificador = res.data[i].id;
            if(verificador.toString().includes("-") === true){
                Db.push(res.data[i])
            }
            let Api = res.data[i].genres
            Api = Api.map((e)=>{
                return e
            })
            res.data[i].genres = Api
            ApiFinal.push(res.data[i])
          }
           const todo = Db.concat(ApiFinal)
           const respuesta = [];
           todo.map((e) =>{
               for (let i = 0; i < e.genres.length; i++) {
                if(e.genres[i].name && e.genres[i].name.includes(genres)){
                    respuesta.push(e)
                    return respuesta
                }  
               }
               
           })
         dispatch({ type: "FILTROGEN", payload: respuesta });
        });
      };
    }

    export function postGames(payload) {
        // console.log(payload)
         return async function (dispatch){
             const response = await axios.post("http://localhost:3001/game-add", payload);
             console.log(response);
             return response;
         }
         
     }

     