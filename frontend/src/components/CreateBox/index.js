// index-Chris.js sur modèle Chris
import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import withRoot from '../modules/withRoot';
// import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

axios.defaults.withCredentials = true;

function CreateBox(props) {
  const classes = useStyles();
  const [label, setLabel] = useState('');
  const [destination_room, setDestinationRoom] = useState('');
  const [fragile, setFragile] = useState({checked: false});
  const [floor, setFloor] = useState({checked: false});
  const [move_id, setMoveId] = useState(props.location.state.id);
  const [heavy, setHeavy] = useState({checked: false});
  //
  function handleLabelChange(e) {
    console.log('input au onChange label ', e.target.value);
    setLabel(e.target.value);
  }
  function handleDestinationRoomChange(e) {
    console.log('input au onChange', e.target.value);
    setDestinationRoom(e.target.value);
  }
  function handleFragileChange(e) {
    console.log('input au onChange', e.target.value);
    setFragile({ ...fragile, [event.target.name]: event.target.checked});
  }
  function handleFloorChange(e) {
    console.log('input au onChange', e.target.value);
    setFloor({ ...floor, [event.target.name]: event.target.checked});
  }
  function handleMoveIdChange(e) {
    console.log('input au onChange', e.target.value);
    setMoveId(e.target.value);
  }
  function handleHeavyChange(e) {
    console.log('input au onChange', e.target.value);
    setHeavy({ ...heavy, [event.target.name]: event.target.checked});
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    console.log('input au onSubmit', label, destination_room, heavy, fragile, floor, move_id); // , user_id, destination_room, heavy, fragile, floor,
    axios
      .post(`http://localhost:5050/box`, { label, destination_room, heavy, fragile, floor, move_id})
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }
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
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                  autoComplete="label"
                  name="label"
                  variant="outlined"
                  required
                  fullWidth
                  id="label"
                  label="Nom du carton"
                  autoFocus
                  helperText="Un nom est requis"
                  value={label}
                  onChange={handleLabelChange}
                />{' '}
              {/* <input placeholder="label" value={label} onChange={handleLabelChange} />{' '} */}
            </Grid>
            <Grid item xs={12}>
            {/* <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-readonly-label">Destination</InputLabel>
              <Select
                labelId="demo-simple-select-readonly-label"
                id="demo-simple-select-readonly"
                value={destination_room}
                onChange={handleDestinationRoomChange}
                inputProps={{ readOnly: true }}
              >
              <MenuItem value="{destination_room}">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'cuisine'}>Cuisine</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
              <input placeholder="destination_room" value={destination_room} onChange={handleDestinationRoomChange} />{' '}
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={fragile.checked}
                        onChange={handleFragileChange}
                        name="checked"
                        color="primary"
                    />
                }
                label="fragile"
            />
              {/* <input placeholder="fragile" value={fragile} onChange={handleFragileChange} />{' '} */}
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={heavy.checked}
                        onChange={handleHeavyChange}
                        name="checked"
                        color="primary"
                    />
                }
                label="Lourd"
            />
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={floor.checked}
                        onChange={handleFloorChange}
                        name="checked"
                        color="primary"
                    />
                }
                label="Etage"
            />
            </Grid>
            {/* <Grid item xs={12}>
              <input placeholder="move_id" value={move_id} onChange={handleMoveIdChange} />{' '}
            </Grid> */}
            <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Ajouter
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
      <Footer />
    </div>
  );
}
export default withRoot(CreateBox);
