import React, {useState, useEffect} from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import { SYNC_MOVE_ID } from 'src/store/actions';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  liste: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  btn: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  titre: {
    textAlign: 'center',
    paddingTop: theme.spacing(5)
  },
  input: {
    margin: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

toast.configure();

const BoxesByMove = (props) => {
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const isLogged = useSelector((state) => state.isLogged);

  const successDelete = () => {
    toast.success('Votre carton a bien été supprimé !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const errorDelete = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  // for the font awesome heavy
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  // requeste to display all the boxes of 1 move selected
  useEffect(() => {


    axios.get(`http://localhost:5050/move/${props.location.state.id}`)
    .then(res => {
      setBoxes(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  //search function
  useEffect(() => {
    setFilteredItems(
      boxes.filter(box =>
        box.label.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, boxes]);

  // delete a box selected
  const handleBoxDelete = (id) => {

    axios.delete(`http://localhost:5050/box/${id}`)
         .then(res => {
          setBoxes(boxes.filter((boxe)=>(boxe.id !== id)));
          successDelete();
         }).catch(err => {
          console.log(err);
          errorDelete();
        })
  };

  return (
    <div className={classes.root}>
      <Header />
      <Container component="div" maxwidth="md">
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Link to ={{
              pathname:"/create-box",
              state: {
                id: props.location.state.id,
              }
              }}>
      {/* <Link to="/create-box" > */}
      <Typography component="h1" variant="h4" className={classes.titre}>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />

        </Fab>
      </Tooltip>
      Créer un nouveau carton
      </Typography>
      </Link>
        <ul className={classes.liste}>
          {filteredItems.map(boxe =>
            <li key={boxe.id}>
              <Link to={{
                pathname:"/box/"+boxe.id,
                 state: {
                   id: boxe.id
                  }
                }}>
            <Button
            variant="outlined"
            color="primary"
            className={classes.btn}
            >

              {boxe.label} - {boxe.destination_room} - {boxe.heavy} -


               {(() => {
                if (boxe.heavy===true) {
                  return (
                    <Icon className="fas fa-weight-hanging" color="secondary" />
                  )
                }
              })()}
              {(() => {
                if (boxe.floor===true) {
                  return (
                    <Icon className="fas fa-level-up-alt" color="secondary" />
                  )
                }
              })()}
              {(() => {
                if (boxe.fragile===true) {
                  return (
                    <Icon className="fas fa-wine-glass" color="secondary" />
                  )
                }
              })()}
               {/* {( {boxe.fragile} => {<Typography>Fragile</Typography> })();} */}

            </Button>
            </Link>
            <IconButton aria-label="delete" color="default" edge='end' onClick={() => {handleBoxDelete(boxe.id)}} className={classes.margin}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            {/* <DeleteIcon fontSize="large" color="secondary"  onClick={() => {handleDelete(move.id)}}/> */}

            </li>)}
        </ul>

        </Container>
      <Footer />
    </div>
  );
};

export default withRoot(BoxesByMove);
