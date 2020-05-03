import withRoot from '../modules/withRoot';

import React from 'react';

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
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { FormHelperText } from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  password: Yup.string().required('Ce champ est requis'),
  changepassword: Yup.string().when('password', {
    is: (val) => (!!(val && val.length > 0)),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Les deux mots de passe doivent être identiques',
    ),
  }),
});

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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        password: "",
        changepassword: ""
      }}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <Header />
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Création de compte
                </Typography>
                <form className={classes.form} 
                  // onSubmit={(evt) => {
                  //   evt.preventDefault();
                  //   // dispatch(sendMessage());
                  // }}
                  onSubmit={handleSubmit}
                >

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="nickname"
                        name="nickename"
                        variant="outlined"
                        required
                        fullWidth
                        id="nickname"
                        label="Pseudo"
                        autoFocus
                      />
                      <FormHelperText id="my-helper-text-nickname">Email requis</FormHelperText>
                    </Grid>
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
                      />
                      <FormHelperText id="my-helper-text-email">Email requis</FormHelperText>
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
                      />
                      <FormHelperText id="my-helper-text-psw"> Champs Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-</FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="passwordControl"
                        label="Mot de passe"
                        type="password"
                        id="passwordControl"
                        autoComplete="current-password"
                      />
                      <FormHelperText id="my-helper-text-psw2">Veuillez saisir à nouveau le mot de passe requis</FormHelperText>
                    </Grid>
                    <label for="passowrd">Password</label>
                    <input
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                    />
                    <span className="error" style={{ color: "red" }}>
                      {errors.password}
                    </span>

                    <label for="passowrd">Confirm Password</label>
                    <input
                      type="password"
                      name="changepassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.changepassword}
                    />
                    <span className="error" style={{ color: "red" }}>
                      {errors.changepassword}
                    </span>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Valider
                  </Button>
                  <Grid container justify="center">
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        Vous avez déjà un compte ? Connectez-vous ici
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
            <Footer />
          </div>
        );
      }}
    </Formik>
  );
};
export default withRoot(SignUp);
