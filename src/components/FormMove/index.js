import 'date-fns';
import React, {useState} from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '../modules/components/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const FormMove = () => {
    const classes = useStyles();
    const [label, setLabel] = useState('');
    const [adress, setAdress] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date('2020-06-18'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleLabelChange = (e) => {

        setLabel(e.target.value);
    }

    const handleAdressChange = (e) => {

        setAdress(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Form envoyé :`);
        console.log([{label}]);
        console.log([{adress}]);
        console.log([{selectedDate}]);
    }

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Header />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h4">
            Création d'un déménagement
        </Typography>
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Entrez un nom pour votre déménagement"
                value={label}
                onChange={handleLabelChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Adresse"
                value={adress}
                onChange={handleAdressChange}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Entrez une date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
            </Grid>
            </MuiPickersUtilsProvider>
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
        </form>
      </div>
    </Container>
    <Footer />
  </div>
  );
};

export default withRoot(FormMove);