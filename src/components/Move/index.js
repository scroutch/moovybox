import React from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {BrowserRouter as Router, Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const Move = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <Link to="/create-move"><AddIcon /></Link>
        </Fab>
      </Tooltip>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
