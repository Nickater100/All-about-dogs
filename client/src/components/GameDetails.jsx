import axios from "axios";
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import React from "react";
import "./GameDetails.css"
import {getGamesDetails} from "../actions/index"
import { useSelector, useDispatch } from "react-redux";



function GameDetail() {
    const dispatch = useDispatch();
   // const [gameDetails, setGameDetail] = useState({name: "", genres: "",background_image: "", description: "", releaseDate: "", rating: "", platforms: ""});
    const gameDetails = useSelector((state)=> state.gameDetail)
    const id = useParams();

    useEffect(()=>{
    //    traerDetalles()
        dispatch(getGamesDetails(id.id))
    },[dispatch])
     console.log(gameDetails)
     
    //const detallesAction = () => {
    //    dispatch(getGamesDetails(id))
    //}

   // const traerDetalles = () => {
   //     axios.get(`http://localhost:3001/game/${id.id}`) 
   //         .then((res) => {
   //             const game = res.data;
   //             console.log(game.background_image)
   //            setGameDetail({
              /*       name: game.name, 
                    genres: game.genres + " ", 
                    description: game.description,
                    releaseDate: game.releaseDate,
                    rating: game.rating,
                    platforms: game.platforms + " ",
                    foto: game.background_image,
                })
            })
            .catch((error) => {
                console.log(error);
            }); 
    } */
    return (
        <div className= "fondo-game-detail">
            <img className= "imge" src= {gameDetails.background_image} alt="img not found"></img>
            <div className= "container-amarillo">
                <div className= "container-img">
                    <img className= "img-game" src= {gameDetails.background_image} alt="img not found"></img>
                </div>
                <div className="descripcion-game">
                    <p>{gameDetails.name}</p>
                    <div>
                        <p>Sus generos son: {gameDetails.genres}</p>
                        <p>Se estreno el dia: {gameDetails.releaseDate}</p>
                        <p>Descripcion:</p> 
                        <div>{gameDetails.description}</div>
                        <p>Sus puntajes de rating son: {gameDetails.rating}</p>
                        <p>Esta disponible en: {gameDetails.platforms}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetail;

