import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  SYNC_LABEL_MOVE,
  SYNC_DESTINATION_ROOM,
  SYNC_FRAGILE,
  SYNC_HEAVY,
  SYNC_FLOOR,
  SYNC_MOVE_ID,
} from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/HeaderHome';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formGroup: {
    margin: theme.spacing(3, 0, 2),
  },
  formLabel: {
    margin: theme.spacing(3, 0, 2),
  },
  titreNumero: {
    margin: theme.spacing(3, 0, 2),
  },
  Numero: {
    margin: theme.spacing(3, 0, 2),
  },
  margin302: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const filter = createFilterOptions(); // to add in the room list


const CreateBox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const moveId = useSelector((state) => state.moveId);
  const labelBox = useSelector((state) => state.labelBox);
  const destination_room = useSelector((state) => state.destination_room);
  const fragile = useSelector((state) => state.fragile);
  const floor = useSelector((state) => state.floor);
  const heavy = useSelector((state) => state.heavy);
  const move_id = useSelector((state) => state.move_id);
  const [value, setValue] = React.useState(null); // for the autocomplete
  const [open, toggleOpen] = React.useState(false); // for the autocomplete

  // for the autocomplete
  const handleClose = () => {
    setDialogValue({
      nameRoom: '',
    });

    toggleOpen(true);
  };

  const [dialogValue, setDialogValue] = React.useState({
    nameRoom: '',
  });

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    console.log('input on onSubmit', move_id, labelBox, destination_room, fragile, heavy, floor);
    const label = labelBox;
    setValue({
      nameRoom: dialogValue.nameRoom,
    });
    handleClose();
    axios
      .post('http://localhost:5050/box', {
        label, destination_room, fragile, heavy, floor,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log('response.status', res.status);
        }
        else {
          console.error('erreur', res);
        }
        console.log('res : ', res);
        console.log('res.data : ', res.data);
      })
      .catch((error) => {
        console.log('very big error');
      });
  }
  const [state, setState] = React.useState({
    heavy: false,
    fragile: false,
    floor: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const room = [
    { nameRoom: 'Salle de bain' },
    { nameRoom: 'Salon' },
    { nameRoom: 'Cuisine' },
    { nameRoom: 'Chambre 1' },
    { nameRoom: 'Chambre 2' },
    { nameRoom: 'Cellier' },
    { nameRoom: 'Cave' },
    { nameRoom: 'Buanderie' },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <QueueIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            J'ajoute un carton
          </Typography>
          <Typography className="titreNumero" component="h2" variant="h5">
            Numéro à écrire sur le carton
          </Typography>
          <Avatar className={classes.avatar}>
            11
          </Avatar>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  freeSolo
                  autoHighlight
                  id="destination_room"
                  options={room}
                  getOptionLabel={(option) => option.nameRoom}
                  renderInput={(params) => <TextField {...params} label="Pièce de destination" variant="outlined" />}
                  onChange={(evt) => {
                    const newDestination_room = evt.target.value;
                    dispatch({ type: SYNC_DESTINATION_ROOM, destination_room: newDestination_room });
                  }}
                />
              </Grid>
              <Grid>
                <FormControl component="fieldset">
                  <Typography className={classes.formLabel} variant="h5">Ce carton est :</Typography>
                  <FormGroup className={classes.formGroup}>
                    <FormControlLabel
                      control={<Switch checked={state.heavy} onChange={handleChange} name="heavy" />}
                      label="Lourd"
                    />
                    <FormControlLabel
                      control={<Switch checked={state.fragile} onChange={handleChange} name="fragile" />}
                      label="Fragile"
                    />
                    <FormControlLabel
                      control={<Switch checked={state.floor} onChange={handleChange} name="floor" />}
                      label="A l'étage"
                    />
                  </FormGroup>

                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Ajouter
            </Button>

          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(CreateBox);
