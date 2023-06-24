import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { Card } from "../../components/Card/Card";
import { useMovies } from "../../hooks/useMovies";
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
import { createFuncion, getFuncionById } from "../../utils/fireStoreHelpers";

export function HomePage() {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResult, setQueryResult] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const {
        nowPlayingMovies,
        getNowPlayingMovies,
        upComingMovies,
        getUpComingMovies,
        queryMovies,
        getQueryMovies } = useMovies();

    useEffect(() => {
        getNowPlayingMovies();
        getUpComingMovies();
        loadFunciones();
        setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            fetchMovies(searchQuery);
        } else {
            setQueryResult([]);
            setSearchQuery("");
        }
    };

    const fetchMovies = async (query) => {
        setIsFetching(true);
        await getQueryMovies(query);
        setQueryResult(queryMovies);
        setIsFetching(false);
    };

    const allMovies = [...nowPlayingMovies, ...upComingMovies];
    const loadFunciones = async () => {
        for (const movie of allMovies) {
            if (!upComingMovies.some((m) => m.id === movie.id)) {
                const funct = await getFuncionById(String(movie.id));
                if (!funct) {
                    await createFuncion(String(movie.id), movie.title, false);
                }
            }
        }
    };
    const renderMovies = () => {
        if (isFetching) {
            return <Loading />;
        } else {
            if (queryResult.length > 0) {
                return queryResult.map((movie) => <Card movie={movie} key={movie.id} />);
            } else {
                return allMovies.map((movie) => <Card movie={movie} key={movie.id} />);
            }
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetchMovies(searchQuery);
        } else {
            setQueryResult([]);
        }
    }, [searchQuery]);

    return (
        <div className={styles.container}>
            <div className={styles.carruselContainer}>
                <ImageCarousel images={images} />
            </div>
            <div className={styles.searchBarContainer}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>
            <div className={styles.moviesContainer}>{renderMovies()}</div>
        </div>
    );
}
