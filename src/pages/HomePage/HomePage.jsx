import React, { useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import styles from "./HomePage.module.css";
import { Card } from "../../components/Card/Card";


export function HomePage() {
    const {
        isLoading,
        nowPlayingMovies,
        getNowPlayingMovies,
        upComingMovies,
        getUpComingMovies,
        movieDetails,
        getMovieDetails
    } = useMovies();

    useEffect(() => {
        getNowPlayingMovies();
    }, [getNowPlayingMovies]);

    useEffect(() => {
        getUpComingMovies();
    }, [getUpComingMovies]);

    useEffect(() => {
        getMovieDetails(385687);
    }, [getMovieDetails]);

    console.log("movieDetails", movieDetails);

    return (
        <>



            <div className={styles.container}>

                {/* {Aqui vamos a poner el hero} */}
                <div className={styles.heroContainer}>
                </div>

                /</div>




        </>

    );
}
