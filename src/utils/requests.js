// Configuración de la API de The Movie DB
const apiKey = import.meta.env.VITE_APP_THEMOVIEDB_API_KEY_AUTH;
const baseUrl = 'https://api.themoviedb.org/3';

export async function fetchNowPlayingMovies() {
  try {
    const response = await fetch(`${baseUrl}/movie/now_playing?language=es-US&page=1&api_key=${apiKey}`);
    const data = await response.json();
    // console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieDetail(movieId) {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieId}?language=es-US&api_key=${apiKey}`);
    const data = await response.json();
    // console.log(data.results);
    return data; 
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchUpcomingMovies() {
  try {
    const response = await fetch(`${baseUrl}/movie/upcoming?language=es-US&page=1&api_key=${apiKey}`);
    const data = await response.json();
    // console.log(data);
    return data.results; 
  } catch (error) {
    console.error(error);
    return null;
  }
}
