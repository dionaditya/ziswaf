import React from "react";
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
    
   
     color: "#FFFFFF",
      padding: 20,
      backgroundColor: '#6DB400',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100px',

     
      
    },
    cardTitle: {
      color: "#FFFFFF",
      fontWeight: 900,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      fontSize: 30,
      marginTop: '10vh'
    },
    rectangleMask: {
      color: "#FFFFFF",
      padding: 20,
      
      background: '#6DB400',
    },
    eclipse: {
      position: 'absolute',
      left: '65.73%',
      right: '-5.64%',
      top: '17.68%',
      bottom: '-289.02%',
      borderRadius: '50%',

      background: 'rgba(152, 202, 75, 0.4)',
    },

    eclipse2: {
      position: 'absolute',
    
      borderRadius: '60%',
      left: '80.5%',
      right: '-46.07%',
      top: '-160.37%',
      bottom: '-114.63%',

      background: 'rgba(105, 160, 20, 0.7)',
    }
  }),
);

const BackNav = (props: any) => {
  const { title } = props
  const classes = useStyles()
  const history = useHistory()
  return (


    <Box display="flex" className={classes.cardContainer} alignItems="center" justifyContent="flex-start">
       <Box className={classes.eclipse}>

       </Box>
         <Box className={classes.eclipse2}>

       </Box>
       <GridContainer>
          <GridItem sm={12} md={12} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box display="flex" style={{cursor: 'pointer'}}alignItems="center" onClick={(e) => history.goBack()}>
                      <i className="fa fa-chevron-left" style={{fontSize: 10}}></i>
                      <span style={{marginLeft: 5}}>Kembali</span>
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop: '3vh'}}>
                  <span className={classes.cardTitle}>{title}</span>
                </GridItem>
              </GridContainer>
            </GridItem>
        </GridContainer>
     



        
      </Box>
  );
};

export default BackNav;
