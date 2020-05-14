import React from 'react';
// import {BrowserRouter as Router, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(3),

  },
  title: {
    fontSize: 24,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
}));

const Header = ({history}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <IconButton edge="start" onClick={() => history.goBack()} className={classes.menuButton} color="inherit" aria-label="menu">
              <ArrowBackIosRoundedIcon />
            </IconButton>
          </div>
          <Link to="/move">
          <Typography variant="h6" className={classes.title}>
            MoovyBox
          </Typography>
          </Link>
          <div className={classes.right}>
            <Button color="inherit" href="/profile"><AccountCircleIcon style={{ fontSize: 40 }} /></Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
