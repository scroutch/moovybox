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
import Avatar from '@material-ui/core/Avatar';
// for the icon fontasome
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';

// to confirm
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonCustom from '../modules/components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    '& > .fa': {
      margin: theme.spacing(2),
      
    },
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
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },
  
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
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
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for the font awesome heavy
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Icon className="fas fa-truck" color="secondary" style={{ fontSize: 30, width: 45 }}/>
          
          <Typography component="h1" variant="h4"  className={classes.title}>
            Mes déménagements
          </Typography>
          <Link to="/create-move">
            <Typography component="h1" variant="h5" className={classes.title}>
              <Tooltip title="Ajouter" aria-label="Add">
                <Fab color="primary" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Button size="medium" variant="outlined" color="primary" >Ajouter un déménagement</Button>
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
                <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleClickOpen(move.id)}}/>
                {/* <Button variant="outlined" color="primary" onClick={() => {handleClickOpen(move.id)}}>
                  Open alert dialog
                </Button> */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" className={classes.dialogTitle} color="secondary">{"Confirmation de suppression"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Etes-vous sûr de vouloir supprimer ce déménagement ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary" >
                      Annuler
                    </Button>
                    <ButtonCustom
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={() => {handleDelete({selectedId})} }
                      color="secondary"
                      // className={classes.submit}
                    >
                      Confirmation de suppression
                    </ButtonCustom>
                    {/* <Button onClick={() => {handleDelete({selectedId})} }color="secondary" autoFocus>
                      Confirmation de suppression
                    </Button> */}
                  </DialogActions>
                </Dialog>
                </li>)}
            </ul>
          </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
