import React from "react";
import { Link } from "react-router-dom";
import juego from "../Assets/juegos.png"
import "./Indice.css"

export default function Indice(){
    return (
        <div className= "fondo-home">
            <div className= "div-container-home">
                <div className= "foto-juegos-container">
                <img className= "foto-juegos-home" src={juego} alt = "img not found"></img>
                </div>
            <div className="Contenedor-Titulo-home">
               <div className="Titulo-home">
                   <p className="titulo">All about Videogames</p>
               </div>
               <div className="Contenedor-Subtitulo-Home">
                   <p className="subtitulo">¡Busca tus juegos favoritos aqui!</p>
                   <Link to= "/home"><button className="boton-home">ver mas</button></Link>
               </div>
               <div className="subtitulo1">
               <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
               <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
               <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
               <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
               </div>
            </div>
         </div>
         <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
         <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
         <p className="subtitulo1">¡Busca tus juegos favoritos aqui!</p>
      </div>
        
        
    )
}
