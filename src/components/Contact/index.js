import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import './styles.css';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        margin: "auto",
        marginBottom: 10
      },
      title: {
          fontSize: 30,
          padding: 45,
      },
      name: {
          padding: 10,
          fontSize: 15
      },
  }));

const Contact = () => {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    React.useEffect(() => {
        loadCSS(
          'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
      }, []);

    return(
        <div className={classes.root}>
            <Typography className={classes.title}>Nous contacter</Typography>
            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}  sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Cécile Duhain</Typography>
                                <Link href="https://github.com/scroutch?tab=repositories" onClick={preventDefault}><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Nicolas Garçon</Typography>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Carole Barbier</Typography>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Sebastien Gardes</Typography>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="#" onClick={preventDefault}><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Contact;