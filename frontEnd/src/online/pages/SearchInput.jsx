import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import {  useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#fff',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function SearchInput() {
  const classes = useStyles();
  const movies = useSelector(state => state.movies.movies)
  return (
    <div className={classes.root}>
      <Autocomplete
      size="small"
        multiple
        options={movies}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => `${option?.title}`}
        filterSelectedOptions
        renderOption={(option) => (
          <>
            <Avatar alt={`${option?.title}`} 
            src={`https://image.tmdb.org/t/p/w300${option.poster_path}`} />
            {`${option?.title}`}
          </>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              avatar={<Avatar alt={`${option?.title}`} 
            src={`https://image.tmdb.org/t/p/w300${option.poster_path}`} />}
              label={`${option?.title}`}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Recherche"
          />
        )}
      />
    </div>
  );
}