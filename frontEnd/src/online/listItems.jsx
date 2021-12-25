
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useAuthDispatch } from '../_shared/context/auth'

import {  useSelector } from 'react-redux'


function  MainListItems() {
  const watchListMovies = useSelector(state => state.movies.watchListMovies)
  return (
  <div>
      {watchListMovies?.map((movie, index)=>{
          return <><ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={movie.title} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
              </ListItemAvatar>
              <ListItemText
                primary={movie.title}
              />
              </ListItem>
            <Divider key={index} variant="inset" component="li" /></>
          })
        }
  </div>
);
}

function  SecondaryListItems(){
  const authDispatch = useAuthDispatch()
  const logout = () => {
    authDispatch({ type: 'LOGOUT' })
  }
  return (
    <div>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </div>
  );
  }

  export default function  ListItems() {
    return (<>
              <List>
                <h2>
                  Watch list
                </h2>
                <MainListItems />
              </List>
              <Divider />
              <List>
                  <SecondaryListItems />
              </List>
            </>
            )
  }