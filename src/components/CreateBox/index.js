
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';

// 1 - l'api YUP utilise ces objets pour la validation des données

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center', to center the text - not with h1 h2 h3
  },
  header: {
    marginTop: theme.spacing(8),
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

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.header}>
          <Typography component="h1" variant="h4">
            Mon déménagement
          </Typography>
          <Typography component="h2" variant="h1">
            Ajouter un carton 1
          </Typography>
          <Typography component="h2" variant="h2">
            Ajouter un carton2
          </Typography>
          <Typography component="h2" variant="h3">
            Ajouter un carton3
          </Typography>
          <Typography component="h2" variant="h4">
            Ajouter un carton4
          </Typography>
           <Typography component="h2" variant="h5">
            Ajouter un carton5
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Ajouter un carton subtitle
          </Typography>
          <Typography component="h2" variant="body1">
            Ajouter un carton body1
          </Typography>
          <Typography component="h2" variant="body2">
            Ajouter un carton6 body2
          </Typography>
        </div>
        <div className={classes.paper}>  
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(login(history));
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  helperText="Requis"
                  value={email}
                  onChange={(evt) => {
                    const newEmail = evt.target.value;

                    dispatch({ type: SYNC_EMAIL, email: newEmail });
                    console.log('type: SYNC_EMAIL, email: newEmail', SYNC_EMAIL, newEmail);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText="Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                  value={password}
                  onChange={(evt) => {
                    const newPassword = evt.target.value;
                    dispatch({ type: SYNC_PASSWORD, password: newPassword });
                    console.log('type: SYNC_PASSWORD, password: newPassword ', SYNC_PASSWORD, newPassword);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2">
                  Mot de passe perdu ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Pas de compte, créez-en un ici
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(SignIn);
