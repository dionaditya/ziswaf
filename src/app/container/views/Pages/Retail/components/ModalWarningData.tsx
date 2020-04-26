import React from "react";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import Modal from "@/app/container/commons/Modal/index.js";
import WarningOutlinedIcon from "@material-ui/icons/WarningOutlined";
import Box from "@material-ui/core/Box";
import { amber } from '@material-ui/core/colors';
import { Typography } from "@material-ui/core";

const ModalWarningData = ({
  showModal,
  setShowModal,
  handleClickCTA,
  donor,
  errorMessage
}) => {
  return (
    <React.Fragment>
      <Modal
        isOpen={showModal}
        onHandle={setShowModal}
        title="Perhatian"
        size="xs"
      >
        <Box display="flex" justifyContent="center" flexDirection="column">
          <GridItem xs={12} sm={12} md={12}>
            <Box display="flex" justifyContent="center">
              <WarningOutlinedIcon style={{ color: amber[600] }} fontSize="large" />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Typography component="h4" style={{
              color: 'rgba(50, 60, 71, 0.8)',
              textAlign: 'center',
              marginBottom: '30px',
              marginTop: '20px'
            }}>
              {errorMessage}
            </Typography>
          </GridItem>
          <Box style={{
            marginBottom: '20px'
          }}>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} mb={12} >
                <Box display="flex" flexDirection="row" justifyContent="center" style={{ padding: '2vh' }}>
                  <GridItem xs={12} sm={6} md={6} >
                    <Box display="flex" flexDirection="column" textAlign='right' >
                      <span>Nama Donatur</span>
                      <span>No Hp</span>
                      <span>Alamat</span>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Box display="flex" flexDirection="column" textAlign='left' fontWeight="bold" color="rgba(50, 60, 71, 0.8);">
                      <span>{donor.name}</span>
                      <span>{donor.phone}</span>
                      <span>{donor.address}</span>
                    </Box>
                  </GridItem>
                </Box>
              </GridItem>
            </GridContainer>
          </Box>
          <GridItem xs={12} sm={12}>
            <Box display="flex" flexDirection="column">
              <Button
                onClick={handleClickCTA}
                style={{
                  background: "#228B22",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  width: '100%'
                }}
                color="primary"
              >
                <span>Perbarui Database dan Lanjutkan</span>
              </Button>
              <Button
                onClick={setShowModal}
                style={{
                  color: "#228B22",
                  fontWeight: "bold",
                  width: '100%'
                }}
                color="transparent"
              >
                <span>Keluar</span>
              </Button>
            </Box>
          </GridItem>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWarningData;
