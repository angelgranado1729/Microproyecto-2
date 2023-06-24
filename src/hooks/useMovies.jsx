import { useCallback, useState } from "react";
import {
    fetchMovieDetail,
    fetchUpcomingMovies,
    fetchNowPlayingMovies,
    fetchMovieCredits,
    fetchMoviesByIds,
    fetchSearchMovies,
} from "../utils/requests";

export function useMovies() {
    const [isLoading, setIsLoading] = useState(false);
    const [upComingMovies, setUpComingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [moviesByIds, setMoviesByIds] = useState([]);
    const [queryMovies, setQueryMovies] = useState([]);

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

    const getMovieCredits = useCallback(async (movieId) => {
        try {
            setIsLoading(true);
            const data = await fetchMovieCredits(movieId);
            setMovieCredits(data);
            setIsLoading(false);
        } catch (error) {
            console.error("FAILED GET MOVIE DETAILS", error);
        }
    }, []);

    const getMoviesByIds = useCallback(async (listIds) => {
        try {
            setIsLoading(true);
            const data = await fetchMoviesByIds(listIds);
            setMoviesByIds(data);
            setIsLoading(false);
        } catch (error) {
            console.error("FAILED GET MOVIE DETAILS", error);
        }
    }, []);

    const getQueryMovies = useCallback(async (query) => {
        try {
            setIsLoading(true);
            const data = await fetchSearchMovies(query);
            setQueryMovies(data);
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
        movieCredits,
        moviesByIds,
        queryMovies,
        getUpComingMovies,
        getNowPlayingMovies,
        getMovieDetails,
        getMovieCredits,
        getMoviesByIds,
        getQueryMovies,
    };
}