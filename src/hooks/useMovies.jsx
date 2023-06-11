import { useCallback, useState } from "react";
import { fetchMovieDetail, fetchUpcomingMovies, fetchNowPlayingMovies } from "../utils/requests";

export function useMovies() {
    const [isLoading, setIsLoading] = useState(false);
    const [upComingMovies, setUpComingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);

    const getUpComingMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            const results = await fetchUpcomingMovies();
            setUpComingMovies(results);
            setIsLoading(false);
        } catch (error) {
            console.error("FAILED GET UPCOMING MOVIES", error);
        }
    }, []);

    const getNowPlayingMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            const results = await fetchNowPlayingMovies();
            setNowPlayingMovies(results);
            setIsLoading(false);
        } catch (error) {
            console.error("FAILED GET NOW PLAYING MOVIES", error);
        }
    }, []);

    const getMovieDetails = useCallback(async (movieId) => {
        try {
            setIsLoading(true);
            const data = await fetchMovieDetail(movieId);
            setMovieDetails(data);
            setIsLoading(false);
        } catch (error) {
            console.error("FAILED GET MOVIE DETAILS", error);
        }
    }, []);

    return {
        isLoading,
        upComingMovies,
        nowPlayingMovies,
        movieDetails,
        getUpComingMovies,
        getNowPlayingMovies,
        getMovieDetails,
    };
}