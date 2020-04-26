import React, { useState } from "react";
import { removeAuthCredential } from '@/app/infrastructures/misc/Cookies';
import history from '@/app/infrastructures/misc/BrowserHistory'
import Modal from "@/app/container/commons/Modal/index.js";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

const ModalLogout: React.FC<{isOpen, setOpen}> = ({isOpen, setOpen}) => {
  const logout = () => {
      setOpen(false)
      removeAuthCredential()
      history.push('/login')
    }

  return (
    <>
      <Modal size="sm" isOpen={isOpen} title="Keluar" onHandle={() => setOpen(false)}>
        <Box
          display="flex"
          flexWrap="nowrap"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <i className="material-icons md-48" style={{height:'50px'}}>error_outline</i>
            <div className="col s12">
              <span style={{
                  color: "rgba(50, 60, 71, 0.8)",
                  fontSize: "18px",
                  marginLeft: 5
                }}
              >
              Apakah anda yakin akan keluar ?
              </span>
            </div>
        </Box>
        <Grid container spacing={3} justify="flex-end" alignItems="center" style={{paddingRight: 10}}>
          <Button color="white" onClick={(e) => logout()}>
            Ya
          </Button>
          <Button color="success" onClick={(e) =>  setOpen(false)}>
            Tidak
          </Button>
      </Grid>
      </Modal>
    </>
  );
};

export default ModalLogout;
