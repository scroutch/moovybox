import 'date-fns';
import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const FormMove = () => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState(new Date('2020-06-18'));
    const [user_id, setUserId] = useState('');
    // const [reminder, setReminder] = useState({checked: true});

    // const handleReminderChange = (e) => {
    //     setReminder({ ...reminder, [event.target.name]: event.target.checked});
    // }
    const renderRedirect = () => {
      if(redirect) {
        return <Redirect to='/create-box' />
      }
    }
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
        // console.log(`Form envoyé :`);
        // console.log([{label}]);
        // console.log([{address}]);
        // console.log([{date}]);
        // console.log([{reminder}]);

        axios.post(`http://localhost:5050/move`, { label, address, date })
             .then(res => {
                console.log(res.data);
             }).catch(err => {
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
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Entrez une date"
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
          {renderRedirect()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={setRedirect}
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