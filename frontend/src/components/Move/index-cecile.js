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
  useEffect(() => {
    axios.get('http://localhost:5050/move', )
         .then(res => {
           console.log(res.data);
           setMoves(res.data);
         })
         .catch(err => {
           console.log(err);
         })
  }, []);

  const handleDelete = (moveToDelete) => () => {
    setMoves((moves) => moves.filter((move) => move.key !== moveToDelete.key));
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
            <Button 
            variant="outlined" 
            color="primary" 
            href={"/move/"+move.id} 
            // href={"/create-box"}
            className={classes.btn} 
            >
               {move.label} {move.address} {moment(move.date).format('MM-DD-YYYY')}
            </Button>
            <DeleteIcon fontSize="large" color="secondary" />
            </li>)}
        </ul>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
