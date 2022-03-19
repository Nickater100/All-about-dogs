import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGeneros, getPlat } from "../actions/index";
import "./AddGame.css"

export function validate(game){
    let errores = {};
    if (!game.name) {
        errores.name = 'Nombre es requerido';
    } else if (game.name.length < 4) {
        errores.name = 'Al menos 4 caracteres';
    }
    if (!game.description) {
        errores.description = 'Descripcion es requerida';
    } else if (game.description.length < 8) {
        errores.description = 'Al menos 8 caracteres'
    }
    if (!game.rating) {
        errores.rating = 'Rating es requerido';
    } else if (game.rating < 1 || game.rating > 5) {
        errores.rating = 'Rating debe ser un numero entre 1 y 5';
    }
    if(!game.releaseDate){
        errores.releaseDate = "La Fecha de estreno es requerida"
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(game.releaseDate)){
        errores.releaseDate = "Formato XXXX/MM/DD"
    }
    if(!game.background_image){
        errores.background_image= "Por favor ingresa la url de la imagen del juego"
    }
    if(!game.platforms){
        errores.platforms= "Por favor ingresa al menos una plataforma"
    }
    if(!game.genres){
        errores.genres="Por favor selecciona al menos un genero"
    }
    return errores;
}

function AddGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genre);
    const plataformas = useSelector((state) => state.plataformas)
    const [errores, setErrores] = useState({})
    const [juegoNuevo, setJuegoNuevo] = useState({name: "", background_image: "", description: "", releaseDate: "", rating: "", platforms: ""});
    const [genreUltimo, setGenreUltimo] = useState({});
    console.log(genreUltimo)
    console.log(juegoNuevo)
    
    useEffect(()=>{
        dispatch(getGeneros())
        dispatch(getPlat())
     }, [dispatch])

     const selectedChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setErrores(validate({
            ...juegoNuevo,
            [name]:value
        }))
        setJuegoNuevo({...juegoNuevo, [name]:value})
        
    }

    const selectedChangeGenre = (e) => {
        const id = e.target.id;
        let value = e.target.value;
        setErrores({...genreUltimo, [id]: value})
        setGenreUltimo({...genreUltimo, [id]: value})    
    }

    const selectedChangePlat = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setErrores(validate({
            ...juegoNuevo,
            [name]:value
        }))
        if(juegoNuevo.platforms.indexOf(value) === -1){
        return juegoNuevo.platforms += value + ", "
    } 
      juegoNuevo.platforms = juegoNuevo.platforms.replace(value + ", ", "");
    }

    const AgregarNuevoJuego = (game) => {
        let genresId = Object.keys(genreUltimo)
        if(!juegoNuevo.name || !juegoNuevo.background_image || !juegoNuevo.description || !juegoNuevo.releaseDate || !juegoNuevo.rating || !juegoNuevo.platforms || Object.keys(genresId).length === 0){
            return alert("No se pudo crear el juego, verifica que todos los campos esten llenos")
        }
        axios.post(`http://localhost:3001/game-add`, {juegoNuevo, genresId})
            .then((res) => {
               console.log(res)
               alert("Juego creado")
            })
            .catch((error) => {
                console.log(error)
                alert("No se pudo crear el juego")
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/generos`)
        .then((res) => {
            dispatch ({
                type: "GENEROS",
                payload: res.data
            })
        })
        .catch((error) => {
        console.log(error);
    });        
    }, [])

    return (
        <div className= "fondo-game-add">
            <div className= "container-black">
                    <form className= "agregarGame" onSubmit={handleSubmit}>
                        <div className= "container-esc-img">
                            <div className= "container-img">
                                {/* <input className="img-subir" type="file" name="file"/> */}
                            </div>
                            <div className="descripcion-juego">
                                <p className="nombre"> Nombre:
                                    <input className={errores.name? "error" : "exito"}
                                        name= "name"
                                        value={juegoNuevo.name} 
                                        onChange={selectedChange} 
                                        placeholder="nombre"/>
                                        {errores.name ? <p className ={"error"}>{errores.name}</p> : null}
                                </p>
                                <div>
                                <div className="generos">
                                <p>Generos:</p> 
                                {errores.genres ? <p className ={"error"}>{errores.genres}</p> : null}
                                              {genres && genres.map((el) => (  
                                                    <div className="generos2">
                                                        <input className={errores.genres? "error" : "exito"}
                                                            type="checkbox" 
                                                            name="generos" 
                                                            value={el.name}
                                                            id={el.id}
                                                            onChange={selectedChangeGenre}/>
                                                        <label for="genero">{el.name}</label>  
                                                    </div>
                                                ))}       
                                            </div>                                                                     
                                        <p className="descripcion"> 
                                    Descripcion:
                                        <input className={errores.description? "error" : "exito"}
                                            name="description"
                                            value={juegoNuevo.description} 
                                            onChange={selectedChange} 
                                            placeholder="descripcion"/>
                                            {errores.description ? <p className ={"error"}>{errores.description}</p> : null}
                                    </p>
                                    <p className="releaseDate"> Fecha de estreno:
                                        <input className={errores.releaseDate? "error" : "exito"}
                                            name="releaseDate"
                                            value={juegoNuevo.releaseDate} 
                                            onChange={selectedChange} 
                                            placeholder="Fecha de estreno"/>
                                             {errores.releaseDate ? <p className ={"error"}>{errores.releaseDate}</p> : null}
                                    </p>
                                    <p className="rating"> Rating:
                                        <input className={errores.rating? "error" : "exito"}
                                            name="rating"
                                            value={juegoNuevo.rating} 
                                            onChange={selectedChange} 
                                            placeholder="rating"/>
                                            {errores.rating ? <p className ={"error"}>{errores.rating}</p> : null}
                                    </p>
                                    <p className="imagen"> Imagen:
                                    <input className={errores.background_image? "error" : "exito"}
                                        name= "background_image"
                                        value={juegoNuevo.background_image} 
                                        onChange={selectedChange} 
                                        placeholder="imagen URL"/>
                                        {errores.background_image ? <p className ={"error"}>{errores.background_image}</p> : null}
                                </p>
                                <div className="plataformas">
                                <p>Plataformas:</p> 
                                {errores.platforms ? <p className ={"error"}>{errores.platforms}</p> : null}
                                              {plataformas && plataformas.map((el) => (  
                                                    <div className="plataformas2">
                                                        <input className={errores.platforms? "error" : "exito"}
                                                            type="checkbox" 
                                                            name="platforms" 
                                                            value={el}
                                                            onChange={selectedChangePlat}/>
                                                        <label for="plataformas">{el}</label>
                                                    </div>
                                                ))}                                                  
                                            </div>                   
                                </div>
                                <div>
                                    <button className= "boton-agregar-juego" onClick={AgregarNuevoJuego}>Agregar juego</button>
                                </div>
                            </div>                                           
                        </div>
                    </form>
            </div>
        </div>
    )
    }

export default AddGame;