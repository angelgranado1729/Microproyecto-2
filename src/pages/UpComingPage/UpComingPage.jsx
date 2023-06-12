import React, { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import styles from "./UpComingPage.module.css";
import { Card } from "../../components/Card/Card";
import { Loading } from "../../components/Loading/Loading";


export function UpComingPage() {
    const {
        isLoading,
        getNowPlayingMovies,
        upComingMovies,
        getUpComingMovies,
    } = useMovies();

    const [areMoviesLoaded, setAreMoviesLoaded] = useState(false);

    useEffect(() => {
        getNowPlayingMovies();
    }, [getNowPlayingMovies]);

    useEffect(() => {
        getUpComingMovies().then(() => {
            setAreMoviesLoaded(true);
        });
    }, [getUpComingMovies]);

    return (
        <div className={styles.container}>
            <div className={styles.titlePage}>
                <h1 className={styles.title}>Próximamente</h1>
            </div>
            <div className={styles.moviesContainer}>
                {isLoading || !areMoviesLoaded ? (
                    <Loading />
                ) : (
                    upComingMovies.map((movie) => (
                        <Card movie={movie} key={movie.id} />
                    ))
                )}
            </div>
        </div>
    );
}
