import React from "react";

// @material-ui/core components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: "0 -15px !important",
      width: "unset"
    }
  }),
);

const GridContainer = (props: any) =>  {
  const classes = useStyles();
  
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default GridContainer;
