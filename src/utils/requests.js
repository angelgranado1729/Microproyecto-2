// Configuración de la API de The Movie DB
const apiKey = import.meta.env.VITE_APP_THEMOVIEDB_API_KEY_AUTH;
const baseUrl = "https://api.themoviedb.org/3";

export async function fetchNowPlayingMovies(numPages = 2) {
  try {
    const aux = [];
    for (let page = 1; page <= numPages; page++) {
      const response = await fetch(
        `${baseUrl}/movie/now_playing?language=es-US&page=${page}&api_key=${apiKey}`
      );
      const data = await response.json();
      aux.push(...data.results);
    }
    return aux;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchUpcomingMovies(numPages = 2) {
  try {
    const aux = [];
    for (let page = 1; page <= numPages; page++) {
      const response = await fetch(
        `${baseUrl}/movie/upcoming?language=es-US&page=${page}&api_key=${apiKey}`
      );
      const data = await response.json();
      aux.push(...data.results);
    }
    return aux;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieDetail(movieId) {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}?language=es-US&api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovieCredits(movieId) {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/credits?language=es-US&api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchSearchMovies(title) {
  try {
    const response = await fetch(
      `${baseUrl}/search/movie?language=es-US&query=${title}&api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMoviesByIds(listIds) {
  try {
    const aux = [];
    for (const id of listIds) {
      const response = await fetch(
        `${baseUrl}/movie/${id}?language=es-US&api_key=${apiKey}`
      );
      const data = await response.json();
      aux.push(data);
    }
    return aux;
  } catch (error) {
    console.error(error);
    return null;
  }
}
