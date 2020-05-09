import React, { useState, useContext } from "react";
import { Checkbox } from "@/app/container/components/index";
import { AuthContext } from "./../ Controller";
import CustomInput from "@/app/container/commons/CustomInput/CustomInput.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: 300,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  }),
);

const LoginFormSection = () => {
  const classes = useStyles();
  const controller = useContext(AuthContext);
  const { getEmail, getPassword, loading, message } = controller;

  const handlePost = async() => {
    const res =  await controller._onPost()
  }

  const messageTimeOut = setTimeout(() => {
    return message
  }, 3000);
   
  

  const handleDisbaleButton = () => {
    if (getEmail.length >= 3 && getPassword.length >= 3) {
      return false
    }
    return true
  }

  return (
    <Box display="flex" style={{ backgroundColor: '#CCE4A5' }} alignItems="center" justifyContent="flex-end">
      <GridContainer>
        <GridItem sm={12} md={8}>
          <span style={{ fontSize: 20, color: "#171717", marginBottom: 10 }}>Login to access <span style={{ fontSize: 20, color: "#171717", fontWeight: 800 }}>KAUNY</span>SUPERAPPS</span>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 10 }}>
              <CustomInput
                labelText="Username"
                placeholder="username"
                name="username"
                id="Username"
                value={getEmail}
                onChange={e => controller._setEmail(e.target.value)}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 10 }}>
              <CustomInput
                labelText="Password"
                id="password"
                placeholder="Password"
                formControlProps={{
                  fullWidth: true
                }}
                type="password"
                value={getPassword}
                onChange={e => controller._setPassword(e.target.value)}
              />
            </GridItem>
            {
              message && <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 5 }}>
              <label style={{ fontWeight: 800, color: 'red' }}>ID / Password Salah Silahkan Cek Kembali</label>
            </GridItem>
            }
            <GridItem xs={12} sm={12} md={12}>
              <Button loading={loading} style={{ width: "100%", backgroundColor: '#00923F', color: '#FFFFFF' }} disabled={handleDisbaleButton()} color="success" onClick={(e) => controller._onPost()}>
                Sign In
                  </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Checkbox
                className="filled-in"
                checked={controller.checked}
                onChange={controller.toggleChange}
              />
              <span>Remember Me</span>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default LoginFormSection;
