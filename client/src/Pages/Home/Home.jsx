import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import notFoundImg from "../../resources/404-Page-Not-Found.png"
import {
    fetchPokemons,
    fetchTypes
} from "../../redux/actions/actionTypes";
import Card from "../../components/Card";
import "../../styles/App.scss";
import Filters from "../../helpers/Filters"
// import Form from "../../components/Form";

export default function Home() {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(50);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const lastPage = Math.ceil(allPokes.length / pokemonsPerPage)
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    useEffect(() => {
        //POKEMONS
        dispatch(fetchPokemons());

    }, [dispatch]);

    useEffect(() => {
        //TYPES
        dispatch(fetchTypes());
    }, [dispatch]);

    const currentPokemons = allPokes?.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="home">
            <Filters />
            <Pagination
                key={allPokes.id}
                currentPage={currentPage}
                lastPage={lastPage}
                paginate={paginate}
            />
            <div className="home__cards">
                {currentPokemons.length ?
                    currentPokemons?.map((e, i) => {
                        return (
                            <div key={i}>
                                <Card
                                    id={e.id}
                                    name={e.name}
                                    img={e.img}
                                    types={e.types}
                                />
                            </div>
                        );
                    }) :
                    <div>
                        <img src={notFoundImg} alt='Not Found' />
                    </div>
                }
            </div>




        </div >
    );
}
