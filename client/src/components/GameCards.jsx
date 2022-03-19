import React from "react";
import "./GameCards.css"


export default function gameCard({name, img, genres}) {
    return(
        <div className="todo">
            <h3 className={"subTitle"}>{name}</h3>
            <img className={"gameImage"} src={img} alt="img not found"/>
            <h5 className={"genero"}>Sus generos son: {genres + " "}</h5>
        </div>
    )    
}