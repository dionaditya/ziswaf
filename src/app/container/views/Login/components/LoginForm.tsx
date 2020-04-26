import React from "react";
import LoginImageSection from "./LoginImageSection";
import LoginFormSection from "./LoginFormSection";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10 * 2,
    textAlign: 'center',
    color: 'black'
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.root} style={{height: '100vh', backgroundColor: '#CCE4A5', paddingLeft: "10vh", paddingRight: "10vh"}} alignItems="center">
        <Grid container md={12} className={classes.root} style={{width: '100%'}}>
          <Grid item md={6} lg={6} xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <LoginImageSection />
            </Box>
          </Grid>
          <Grid item md={6} lg={6} xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <LoginFormSection />
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
};

export default LoginForm;
