import SearchBar from "./SearchBar";
import GameCards from "./GameCards";
import Paginado from "./Paginado";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getApiGames, getDbGames, getGeneros, getGame, filtroGenres, allGames } from "../actions/index";
import { NavLink } from "react-router-dom";
import "./Home.css"

function Home(){
    const dispatch = useDispatch();
    const games = useSelector((state) => state.games);
    const apiGames = useSelector((state) => state.apigames)
    const dbGames = useSelector((state) => state.dbGame);
    const genres = useSelector((state) => state.genre);
    const [rating, setRating] = useState("")
    const [orderAlfabet, setOrderAlfabet] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPorPag] = useState(15);

    function handlefilterGen(e){
        dispatch(filtroGenres(e.target.value))
    }

    function handlefilterName(e){
        dispatch(getGame(e.target.value))
    }

    useEffect(()=>{
        dispatch(allGames())
        dispatch(getDbGames())
        dispatch(getApiGames())
        dispatch(getGeneros())
     }, [dispatch])

     const SelectedRating = (e) => {
        if (e.target.value === "rdesc-rasc"){
            dispatch({
                type: "ordenar-rdesc-rasc",
            });
        }
        else if (e.target.value === "rasc-rdesc"){
            dispatch({
                type:"ordenar-rasc-rdesc",
            });
        }
        setRating(e.target.value)
    }

    const alfabetSelectedChange = (e) => {
        if(e.target.value === "asc-desc") {
            dispatch({
                type: "ordenar-asc-desc"
            })
        }
        else if (e.target.value === "desc-asc") {
            dispatch ({
                type: "ordenar-desc-asc"
            })
        }
        setOrderAlfabet(e.target.value)
    }

    const indexDelUltimoItem = currentPage * itemsPorPag;
  const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;
  const currentGames = games.slice(indexDelPrimerItem, indexDelUltimoItem)
  const paginado = (numPage)=>{
      setCurrentPage(numPage)
  }
  return(
    <div className="fondo-buscar">
        <div>
            <div>
                <SearchBar/> 
                <div>
                    <Link to="/game-add"><button className="boton-agregar-game">Agregar nuevo juego</button></Link>
                </div>
            </div>
            <div className="container-todos-select">
                <div className="select-container">
                    <p className="p-select">Ordenar por rating:</p>
                    <select value={rating} onChange={(e)=>SelectedRating(e)} className="seleccion">
                        <option value="rdesc-rasc">De menor a mayor</option>
                        <option value="rasc-rdesc">De mayor a menor</option>
                    </select>
                </div>
                <div className="select-container">
                    <p className="p-select">Ordenar alfabeticamente:</p>
                    <select value={orderAlfabet} onChange={(e)=> alfabetSelectedChange(e)} className="seleccion">
                        <option value="asc-desc">"A" to "Z"</option>
                        <option value="desc-asc">"Z" to "A"</option>
                    </select>
                </div>
                <div className="select-container">
                    <p className="p-select">Filtrar por genero:</p>
                    <select onChange={(e)=> handlefilterGen(e)} className="seleccion">
                        <option value={""}>Seleccionar filtro</option>
                        {genres && genres.map((el)=>(
                            <option value={el.name}>{el.name}</option>
                        ))}
                    </select>
                </div>
                <div className="select-container">
                    <p className="p-select">Filtrar por nombre:</p>
                    <select onChange={(e)=> handlefilterName(e) } className="seleccion">
                        <option value={""}>Seleccionar filtro</option>
                        {apiGames.length > 0? apiGames.map((el)=>(
                            <option value={el.name}>{el.name}</option>
                        )): <option value={undefined}>no se encuentra</option>}
                    </select>
                </div>
                <div className="select-container">
                    <p className="p-select">Filtrar por gameDb:</p>
                    <select onChange={(e)=> handlefilterName(e)} className="seleccion">
                        <option value={""}>Seleccionar filtro</option>
                        {dbGames && dbGames.map((el)=>(
                            <option value={el.name}>{el.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="paginas">
            <Paginado
              gamesPerPage= {itemsPorPag}
              allGames= {games.length}
              paginado= {paginado}
              />
              </div>
              <div className={"gameCards"}>
             <ul className={"gamesGrid"}> {currentGames.length === 0 ? "loading" : currentGames?.map( el =>{
           
            return (
            <div className={"margin"}> <NavLink className={"navlink"} to={`/home/${el.id}`} > <GameCards  img={el.background_image}
              name={el.name} genres={el.genres.map(e=>e.name + " ")} />
                 </NavLink></div>  )
              })}
              </ul>
          </div>
      </div>
   </div>
    
)
}

export default Home;