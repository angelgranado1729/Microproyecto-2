import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { Card } from "../../components/Card/Card";
import { useMovies } from "../../hooks/useMovies";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Loading } from "../../components/Loading/Loading";
import styles from "./HomePage.module.css";

import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";
import image6 from "../../assets/image6.jpeg";
import image7 from "../../assets/image7.jpeg";
import image8 from "../../assets/image8.jpeg";
import { createFuncion, getFuncionById, getFunciones, handleFunciones } from "../../utils/fireStoreHelpers";

export function HomePage() {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        isLoading,
        nowPlayingMovies,
        getNowPlayingMovies,
        upComingMovies,
        getUpComingMovies,
    } = useMovies();

    useEffect(() => {
        getNowPlayingMovies();
        getUpComingMovies();
    }, []);

    useEffect(() => {
        // Fetch the list of images from the server (remember from firestore)
        setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const allMovies = [...nowPlayingMovies, ...upComingMovies];

    const filteredMovies = allMovies.filter((movie, index) => {
        const title = movie.title.toLowerCase();
        const query = searchQuery.toLowerCase();
        return title.includes(query) && allMovies.findIndex((m) => m.id === movie.id) === index;
    });

    const loadFunciones = async () => {
        filteredMovies.forEach(async (movie) => {
            if (!upComingMovies.some((m) => m.id === movie.id)) {
                const funct = await getFuncionById(String(movie.id));
                if (!funct) {
                    await createFuncion(String(movie.id), movie.title, false);
                }
            }
        });
    };


    useEffect(() => {
        loadFunciones();
    }, [filteredMovies]);


    return (
        <div className={styles.container}>
            <div className={styles.carruselContainer}>
                <ImageCarousel images={images} />
            </div>
            <div className={styles.searchBarContainer}>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.moviesContainer}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {filteredMovies.map((movie) => (
                            <Card movie={movie} key={movie.id} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
