//Configuración de la API de The Movie DB

const apiKey = import.meta.env.VITE_APP_THEMOVIEDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

const fetchNowPlayingMovies = async () => {
  const url = `${baseUrl}/movie/now_playing?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const nowPlayingMovies = data.results;
    console.log('Películas en cartelera:', nowPlayingMovies);
    // Realiza las operaciones necesarias con las películas en cartelera
  } catch (error) {
    console.error('Error al obtener las películas en cartelera:', error);
  }
};

const fetchUpcomingMovies = async () => {
  const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const upcomingMovies = data.results;
    console.log('Próximas películas:', upcomingMovies);
    // Realiza las operaciones necesarias con las próximas películas
  } catch (error) {
    console.error('Error al obtener las películas próximamente:', error);
  }
};

fetchNowPlayingMovies();
fetchUpcomingMovies();
