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

const BoxesByMove = (props) => {
  console.log("ceci est le props",props.location.state.id);
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  
  
  // requeste to display all the boxes of 1 move selected
  useEffect(() => {

    
    axios.get(`http://localhost:5050/move/${props.location.state.id}`)
    .then(res => {
      console.log(res.data);
      setBoxes(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  // delete a box selected
  const handleBoxDelete = (id) => {

    console.log('cliqué');

    axios.delete(`http://localhost:5050/box/${id}`)
         .then(res => {

           console.log("ok");
          setBoxes(boxes.filter((boxe)=>(boxe.id !== id)));
         }).catch(err => {
          console.log(err);
        })
  };

  return (
    <div className={classes.root}>
      <Header />
      <Link to="/create-box">
      <Typography component="h1" variant="h4" className={classes.titre}>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />

        </Fab>
      </Tooltip>
      Liste des cartons
      </Typography>
      </Link>
        <ul className={classes.liste}>
          {boxes.map(boxe => 
            <li key={boxe.id}>
            <Button 
            variant="outlined" 
            color="primary" 
            href={"/box/"+boxe.id} 
            className={classes.btn} 
            >
               Nom : {boxe.label}- 
               Pièce de destination : {boxe.destination_room} - 
               Lourd : {boxe.heavy} - 
               
               {(() => {
                if (boxe.heavy===true) {
                  return (
                    <FitnessCenterIcon />
                  )
                }
              })()}
              {(() => {
                if (boxe.floor===true) {
                  return (
                   <ArrowUpwardIcon /> 
                  )
                }
              })()}
              {(() => {
                if (boxe.fragile===true) {
                  return (
                    <AssignmentLateIcon />
                  )
                }
              })()}

               Etage : {boxe.floor} -
               {/* {( {boxe.fragile} => {<Typography>Fragile</Typography> })();} */}
            </Button>
            {/* <DeleteIcon fontSize="large" color="secondary"  onClick={() => {handleDelete(move.id)}}/> */}
            <IconButton aria-label="delete" color="secondary"  onClick={() => {handleBoxDelete(boxe.id)}} className={classes.margin}>
              <DeleteIcon fontSize="large" />
            </IconButton>
            </li>)}
        </ul>
      <Footer />
    </div>
  );
};

export default withRoot(BoxesByMove);
