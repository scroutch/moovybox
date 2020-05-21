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

// to confirm
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    width: '60%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  titre: {
    textAlign: 'center',
    paddingTop: theme.spacing(5)
  }
}));

const Move = () => {
  const classes = useStyles();
  const [moves, setMoves] = useState([]);
  // to confirm
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    axios.get('http://localhost:5050/move')
         .then(res => {
           console.log(res.data);
           setMoves(res.data);
         })
         .catch(err => {
           console.log(err);
         })
  }, []);

  const handleDelete = (props) => {

    console.log('cliqué, props', props);
    const id = props.selectedId;
    console.log('id : ', id);
    

    axios.delete(`http://localhost:5050/move/${id}`)
         .then(res => {

           console.log("ok");
          setMoves(moves.filter((move)=>(move.id !== id)));
          setOpen(false);
         }).catch(err => {
          console.log(err);
        })
  };

  // to confirm
  const handleClickOpen = (value) => {
    setOpen(true);
    setSelectedId(value)
    console.log("value :", value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Header />
      <Link to="/create-move">
      <Typography component="h1" variant="h4" className={classes.titre}>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      Ajouter un déménagement
      </Typography>
      </Link>
        <ul className={classes.liste}>
          {moves.map(move => <li key={move.id}>
            <Link to ={{
              pathname:"/move/"+move.id,
              state: {
                id: move.id,
              }
              }}>
            
            <Button 
            variant="outlined" 
            color="primary" 
            //href={"/move/"+move.id} mettre LINK
            // href={"/create-box"}
            className={classes.btn} 
            >
               {move.label} {move.address} {moment(move.date).format('MM-DD-YYYY')}
            </Button>
            </Link>
            {/* <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleDelete(move.id)}}/> */}
            <Button variant="outlined" color="primary" onClick={() => {handleClickOpen(move.id)}}>
              Open alert dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Anuuler, je garde ce déménagement !
                </Button>
                <Button onClick={() => {handleDelete({selectedId})} }color="primary" autoFocus>
                  Je veux supprimer de déménagement.
                </Button>
              </DialogActions>
            </Dialog>
            </li>)}
        </ul>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
