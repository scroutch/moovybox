import React, {useState, useEffect} from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  liste: {
    textAlign: 'center'
  }
}));

const Move = () => {
  const classes = useStyles();
  const [moves, setMoves] = useState([]);
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
  return (
    <div className={classes.root}>
      <Header />
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <Link to="/create-move"><AddIcon /></Link>
        </Fab>
      </Tooltip>
        <ul className={classes.liste}>
          {moves.map(move => <li key={move.id}>
            {move.label}{move.address}{move.date}
            </li>)}
        </ul>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
