import React from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Grid from '@material-ui/core/Grid';
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  BrowserRouter as Router,
  useRouteMatch,
} from "react-router-dom";
import AlertService from '../../../_shared/services/feedBacks/AlertService';
import {  useSelector, useDispatch } from 'react-redux'
import { setMovies, setlikedMovies, setwatchList, toggleLikeMovie, toggleWatchMovie } from '../../_shared/redux/store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      maxWidth: 345,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: "calc(100% - 151px)",
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    }
  }));
const GET_MOVIES = gql`
  query($input : PaginatorInput!){
    movies(input : $input){
        id,
        title,
        poster_path
      }
  }
`

const GET_LIKED_WATCH_MOVIES = gql`
  query{
    likeAndWatchList{
        likedMovies
        watchListMovies{
          id,
          title,
          poster_path
        }
      }
  }
`

const LIKE_MOVIE = gql`
    mutation likeThisMovie($id: ID!){
        likeThisMovie(id : $id){
        done
    }
    }
`

const ADD_TO_WATCH = gql`
    mutation addMovieToWatchList($id: ID!){
    addMovieToWatchList(id : $id){
        done
    }
    }
`
export default function ListMovies() {
  let match = useRouteMatch();
  const classes = useStyles();
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

  const movies = useSelector(state => state.movies.movies)
  const likedMovies = useSelector(state => state.movies.likedMovies)
  const watchListMovies = useSelector(state => state.movies.watchListMovies)
  const dispatch = useDispatch()

  const { loadingGetMovies } = useQuery(GET_MOVIES, {
    variables: { input: { query: "a", page : 1} },
    onCompleted: (data) => dispatch(setMovies(data.movies)),
    onError: (err) => console.log(err),
  })

  const { loadingGetWatchMovies } = useQuery(GET_LIKED_WATCH_MOVIES, {
    onCompleted: (data) =>{
        dispatch(setlikedMovies(data.likeAndWatchList.likedMovies))
        dispatch(setwatchList(data.likeAndWatchList.watchListMovies))
    } ,
    onError: (err) => console.log(err),
  })

  const [likeThisMovie, { loadingLike }] = useMutation(LIKE_MOVIE, {
    onCompleted: (datas) => {
      if(datas.likeThisMovie.done){
        setNotify({
          isOpen: true,
          message: 'Success',
          type: 'success'
        })
      }else{
        setNotify({
          isOpen: true,
          message: 'Error',
          type: 'error'
        })
      } 
    },
    onError: (err) => {
      console.log(err)
      setNotify({
        isOpen: true,
        message: 'Error',
        type: 'error'
      })
    },
  })
  const onToggleLikeThisMovie = (id) => {
    likeThisMovie({ variables: { id : id },
      update : ()=>{
        dispatch(toggleLikeMovie(id))
      } 
    })
}
  const [addMovieToWatchList, { loadingWatch }] = useMutation(ADD_TO_WATCH, {
    onCompleted: (datas) => {
      if(datas.addMovieToWatchList.done){
        setNotify({
          isOpen: true,
          message: 'Success',
          type: 'success'
        })
      }else{
        setNotify({
          isOpen: true,
          message: 'Error',
          type: 'error'
        })
      } 
    },
    onError: (err) => {
      console.log(err)
      setNotify({
        isOpen: true,
        message: 'Error',
        type: 'error'
      })
    },
  })
  const onToggleMovieToWatchList = (movie) => {
    addMovieToWatchList({ variables: { id : movie.id },
      update : ()=>{
        dispatch(toggleWatchMovie(movie))
      } 
    })
}
  return (<>
    <Grid container spacing={3}>
      {movies?.map((movie, index)=>{
      
      return <Grid  key={index} item xs={4}>
          <Card key={index} className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h6" variant="h6">
                {`${movie.title}`}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="like/unlike"
              onClick={() => {
                onToggleLikeThisMovie(movie.id)
               }}>
                {likedMovies.includes(movie.id) ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon/>}
              </IconButton>
                <IconButton aria-label="watch list" onClick={() => {
                    onToggleMovieToWatchList(movie)
                }}>
                    {watchListMovies.map(m => m.id).includes(movie.id)  ? <PlaylistAddCheckIcon color="primary" /> : <PlaylistAddIcon />}
                </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            title={movie.title}
          />
        </Card>
    </Grid>
    })
  }
  </Grid>
  <AlertService notify={notify} setNotify={setNotify} />
  </>
  );
}