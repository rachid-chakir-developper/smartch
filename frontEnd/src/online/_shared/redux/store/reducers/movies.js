import {
    SET_MOVIES,
    SET_LIKED_LIST,
    SET_WATCH_LIST,
    TOGGLE_LIKE_MOVIE,
    TOGGLE_WATCH_MOVIE,
  } from '../constants/ActionTypes'
  
  const initialState =
    {
      movies: [],
      likedMovies: [],
      watchListMovies: []
    };

  export default function moviesReducer(state = initialState, action) {
    switch (action.type) {
      case SET_MOVIES:
        return {
          ...state,
          movies: action.movies,
        }
      case SET_LIKED_LIST:
        return {
          ...state,
          likedMovies: action.likedMovies,
        }
      case SET_WATCH_LIST:
        return {
          ...state,
          watchListMovies: action.watchListMovies,
        }
      case TOGGLE_LIKE_MOVIE:
        let likedMoviesCopy = [...state.likedMovies]
        if(likedMoviesCopy.includes(action.id)) likedMoviesCopy = likedMoviesCopy.filter(id => id != action.id)
        else likedMoviesCopy = [action.id, ...likedMoviesCopy]
        return {
          ...state,
          likedMovies: likedMoviesCopy,
        }
      case TOGGLE_WATCH_MOVIE:
        let watchListMoviesCopy = [...state.watchListMovies]
        if(watchListMoviesCopy.map(m=> m.id).includes(action.movie.id)) watchListMoviesCopy = watchListMoviesCopy.filter(m => m.id != action.movie.id)
        else watchListMoviesCopy = [action.movie, ...watchListMoviesCopy]
        return {
          ...state,
          watchListMovies: watchListMoviesCopy,
        }
  
      default:
        return state
    }
  }