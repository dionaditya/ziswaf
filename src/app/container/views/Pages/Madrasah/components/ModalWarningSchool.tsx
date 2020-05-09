import React from "react";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import Modal from "@/app/container/commons/Modal/index.js";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutline";
import Box from "@material-ui/core/Box";
import { amber } from '@material-ui/core/colors';
import { Typography } from "@material-ui/core";

const ModalWarningSchool = ({
  showModal,
  setShowModal,
  handleClickCTA,
  record,
  loading,
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
              <ErrorOutlinedIcon style={{ color: 'red' }} fontSize="large" />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Typography component="h4" style={{
              color: 'rgba(50, 60, 71, 0.8)',
              textAlign: 'center',
              marginBottom: '5px',
              marginTop: '20px'
            }}>
              Anda Akan Menghapus Madrasah
            </Typography>
            <Typography component="h4" style={{
              color: 'rgba(50, 60, 71, 0.8)',
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: 'bold',
              fontSize: 20
            }}>
              {loading ? 'Loading..' : record.name}
            </Typography>
            <Typography component="h4" style={{
              color: 'rgba(50, 60, 71, 0.8)',
              textAlign: 'center',
              marginBottom: '15px',
              marginTop: '10px'
            }}>
              Record yang terhubung dengan Madrasah ini juga akan dihapus
            </Typography>
          </GridItem>
          <Box style={{
            marginBottom: '20px'
          }}>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} mb={12} >
                <Box display="flex" flexDirection="row" justifyContent="center" style={{ padding: '2vh' }}>
                  <GridItem xs={12} sm={6} md={6} >
                    <Box display="flex" flexDirection="column" textAlign="right" >
                      <span style={{ marginBottom:'10px'}}>Data Donasi :</span>
                      <span style={{ marginBottom:'10px'}}>Data Personel :</span>
                      <span>Data Siswa :</span>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Box display="flex" flexDirection="column" fontWeight="bold" color="rgba(50, 60, 71, 0.8);">
                      <span style={{ marginBottom:'10px'}}>{loading ? 'loading' : `${record.donationRecord} Record`}</span>
                      <span style={{ marginBottom:'10px'}}>{loading ? 'loading' : `${record.personelRecord} Record`}</span>
                      <span>{loading ? 'loading' : `${record.studentRecord} Record`}</span>
                    </Box>
                  </GridItem>
                </Box>
              </GridItem>
            </GridContainer>
          </Box>
          <GridItem xs={12} sm={12}>
            <Box display="flex" flexDirection="row">
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
              <Button
                onClick={handleClickCTA}
                style={{
                  background: "#228B22",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  width: '100%',
                  borderRadius: 10,
                }}
                color="primary"
              >
                <span>Hapus</span>
              </Button>
            </Box>
          </GridItem>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWarningSchool;