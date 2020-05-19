import React, { useState, useEffect } from 'react';
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
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

axios.defaults.withCredentials = true;

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

axios.defaults.withCredentials = true;



const Item = (props) => {
    const classes = useStyles();
    const [item, setItem] = useState([]);
    const [name, setName] = useState('');
    const [box_id, setBoxeId] = useState(props.location.state.id);

    useEffect(() => {
        axios.get(`http://localhost:5050/box/${props.location.state.id}`)
             .then(res => {
               console.log(res.data);
               setItem(res.data);
             })
             .catch(err => {
               console.log(err);
             })
      }, []);

    const handleItemChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {name, box_id};
        axios.post('http://localhost:5050/item', data)
             .then(res => {
                 console.log('ici les items', res.data);
             }).catch(err => {
                console.log(err);
              });
    }

    const handleDelete = (id) => {

        console.log('cliqué');

        axios.delete(`http://localhost:5050/item/${id}`)
             .then(res => {

               console.log("ok");
              setItem(item.filter((ite)=>(ite.id !== id)));
             }).catch(err => {
              console.log(err);
            })
      };

    return (
        <div className={classes.root}>
            <Header />
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <QueueIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
                Ajouter un objet au carton
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={item.name} onChange={handleItemChange}/>
            </form>
            <ul>

                {item.map(elt => <li key={item.id}>
                    <Button variant="outlined" color="primary">
                        {elt.name}

                    </Button>
                    <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleDelete(item.id)}}/>
                </li>)}
            </ul>
            </div>
            </Container>
            <Footer />
        </div>
    )
};

export default withRoot(Item);