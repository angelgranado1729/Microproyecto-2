// Links de todas las rutas de la aplicación

export const HOME_URL = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const UPCOMING_MOVIES_URL = "/upcoming";
export const NOW_PLAYING_MOVIES_URL = "/now-playing";
//export const MOVIE_DETAIL_URL = "/movies/:movie_id";
export const ADMIN_URL = "/admin";
export const RESERVE_URL = "/reserve";
export const ERROR_404 = "*";
<<<<<<< HEAD
export const MOVIES_DETAIL_URL =  (movieId = ":Id") =>
`/movies/${movieId}`;
=======
export const MOVIES_DETAIL_URL = (movie_id = ":movie_id") => `/movies/${movie_id}`;
export const MOVIE_DETAIL_URL = (movie_id) => `/movies/${movie_id}`;
>>>>>>> 0005ce5f85b816b5891a88c02566872e930e64dd
