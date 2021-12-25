import * as types from '../constants/ActionTypes'

export const setMovies = (movies) => ({ type: types.SET_MOVIES, movies })
export const setlikedMovies = (likedMovies) => ({ type: types.SET_LIKED_LIST, likedMovies })
export const setwatchList = (watchListMovies) => ({ type: types.SET_WATCH_LIST, watchListMovies })
export const toggleLikeMovie = (id) => ({ type: types.TOGGLE_LIKE_MOVIE, id })
export const toggleWatchMovie = (movie) => ({ type: types.TOGGLE_WATCH_MOVIE, movie })
