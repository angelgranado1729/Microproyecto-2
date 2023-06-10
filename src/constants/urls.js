// Links de todas las rutas de la aplicación

export const HOME_URL = "/";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const PROFILE_URL = "/profile";
export const UPCOMING_MOVIES_URL = "/upcoming";
export const NOW_PLAYING_MOVIES_URL = "/now-playing";
export const ERROR_404 = "*";
export const MOVIES_DETAIL_URL = (movie_id = ":movie_id") => `/movies/${movie_id}`;