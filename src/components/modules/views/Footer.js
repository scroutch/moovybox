import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    background: theme.palette.secondary.main,
    color: theme.text.secondary.main,
    alignItems: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" align="center">
        <Link href="/contact" color="inherit">
          Nous contacter
        </Link>
        <br />
        <Link href="/disclaimer" color="inherit">
          Mentions légales | Cookies
        </Link>
      </Container>
    </footer>
  );
}
