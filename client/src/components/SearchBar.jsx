import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./SearchBar.css"

function SearchBar(){
    const dispatch = useDispatch();
    const [buscar, setBuscar] = useState("");
   
    function handleChange(e){
        setBuscar(e.target.value)
    }
    const handleKeyDown = ({keyCode}) => {
        if (keyCode !== 13) return null;
        else{
            axios.get(`http://localhost:3001/games/${buscar}`)
            .then((res) =>{
                const respuesta = res.data;
                console.log(respuesta)
                if ( respuesta.length === 0) alert("No se encontro el juego, puedes añadirlo a la base de datos")
                else {
                   dispatch({
                       type: "GAMES_NAME",
                       payload : res.data,
                    })
                }
            })
            .catch((error)=> {
                
            });
     }
    };
     return (
         <div>
             <form onSubmit={(e) => e.preventDefault()}>
                 <input 
                  className="searchBar"
                  placeholder="Busca tus juegos"
                  value={buscar}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}>
                 </input>
   
             </form>
         </div>
     )
   }
   
   export default SearchBar;