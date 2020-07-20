import 'date-fns';
import React, {useState} from 'react';
import axios from 'axios';
import withRoot from '../modules/withRoot';
import { useHistory } from "react-router-dom";
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
    KeyboardDatePicker,
  } from '@material-ui/pickers';

axios.defaults.withCredentials = true;

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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const FormMove = () => {
    const classes = useStyles();
    let history = useHistory();
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState(new Date());


    // const [reminder, setReminder] = useState({checked: true});

    // const handleReminderChange = (e) => {
    //     setReminder({ ...reminder, [event.target.name]: event.target.checked});
    // }

    const handleDateChange = (date) => {
      setDate(date);
    };

    const handleLabelChange = (e) => {

        setLabel(e.target.value);
    }

    const handleAddressChange = (e) => {

        setAddress(e.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {label, address, date};

        console.log(data)

        axios.post('http://localhost:5050/move', data)
             .then(res => {
                console.log('coincoin')
                console.log(res);
                history.push({
                  pathname:"/move/"})
             }).catch(err => {
               console.log('pouet');
               console.log(err);
             });
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
                value={address}
                onChange={handleAddressChange}
              />
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    // type="date.format"
                    margin="normal"
                    id="date-picker-inline"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
            </Grid>
            </MuiPickersUtilsProvider>
            {/* <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={reminder.checked}
                        onChange={handleReminderChange}
                        name="checked"
                        color="primary"
                    />
                }
                label="Voulez-vous un rappel"
            />
            </Grid> */}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            // href="/move"
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
