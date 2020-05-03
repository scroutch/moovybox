import withRoot from '../modules/withRoot';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email obligatoire';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Email non valide';
            }
            if (!values.password) {
              errors.email = 'mot de passe obligatoire';
            } else if (
              !/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Email non valide';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              
               
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="password" name="password" pattern=".{8,20}" required title="8 caracteres minimum, une majuscule, 1 minuscule et un caractère parmi #?!@$%^$*-" />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                  
            </Form>
          )}
        </Formik>
      </div>
    </Container>
      <Footer />
    </div>
  );
};

export default withRoot(SignUp);
