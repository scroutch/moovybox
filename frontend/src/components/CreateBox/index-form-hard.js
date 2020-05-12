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
} from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import HeaderHome from '../modules/views/HeaderHome';


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
}));

const CreateBox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const moveId = useSelector((state) => state.moveId);
  const labelBox = useSelector((state) => state.labelBox);
  const destinationRoom = useSelector((state) => state.destinationRoom);
  const fragile = useSelector((state) => state.fragile);
  const floor = useSelector((state) => state.floor);
  const heavy = useSelector((state) => state.heavy);

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    console.log('input on onSubmit', moveId, labelBox, destinationRoom, fragile, heavy, floor);
    const move_id = moveId;
    const label = labelBox;
    const destination_room = destinationRoom;
    axios
      .post('http://18.206.96.118/box', {
        move_id, label, destination_room, fragile, heavy, floor,
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
    heavy: true,
    checkedB: true,
  });

  const handleHeavyChange = (event) => {
    setState({ ...state, heavy: event.target.checked });
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderHome />
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
                  autoComplete="destinationRoom"
                  name="destinationRoom"
                  variant="outlined"
                  fullWidth
                  id="ddestinationRoom"
                  label="Pièce de destination"
                  autoFocus
                  value={destinationRoom}
                  onChange={(evt) => {
                    const newDestinationRoom = evt.target.value;
                    dispatch({ type: SYNC_DESTINATION_ROOM, destinationRoom: newDestinationRoom });
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="fragile"
                  label="fragile"
                  name="fragile"
                  autoComplete="fragile"
                  value={fragile}
                  onChange={(evt) => {
                    const newFragile = evt.target.value;
                    dispatch({ type: SYNC_FRAGILE, fragile: newFragile });
                  }}
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={state.heavy}
                      onChange={handleHeavyChange}
                      name="heavy"
                    />
                )}
                  label="Lourd"
                  labelPlacement="start"
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
