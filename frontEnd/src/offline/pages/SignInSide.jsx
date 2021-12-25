import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import {
  Link as LinkR
} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client'
import { useAuthDispatch } from '../../_shared/context/auth'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Smartch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LOGIN_USER = gql`
  mutation login($email: String! , $password: String!){
      login(email: $email, password: $password) {
        accessToken,
        user {
          id,
          firstName,
          lastName,
          email
        }
      }
  }
`

export default function SignInSide() {
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState([])
  const dispatch = useAuthDispatch()

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (err) => {console.log(err);setErrors(['Incorrect password or email'])},
    onCompleted(data) {
      console.log(data);
      if(data.login){
        dispatch({ type: 'LOGIN', payload: data.login })
        //window.location.href = '/online'
      }
      else{
        setErrors(['Incorrect password or email'])
        console.log(errors)
      }
    },
  })

  const submitLoginForm = (e) => {
    setErrors([])
    e.preventDefault()
    console.log(loginForm);
    loginUser({ variables: loginForm })
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitLoginForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail adress"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
            {loading && <LinearProgress />}
            {errors?.map((error, index) =>
              <Alert key={index} severity="error">{error}</Alert>
              )
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <LinkR to="/offline/register">
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="primary"
              >
                Create an account
              </Button>
            </LinkR>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}