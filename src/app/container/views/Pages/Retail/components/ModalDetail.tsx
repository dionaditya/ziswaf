import React, { useContext } from "react";

import { RetailContext } from "../Controller";
import moment from "moment";
import "moment/locale/id";
import { makeStyles, createStyles, Theme, Modal, Box } from "@material-ui/core";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: '40%',
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const ModalDetail = ({ showModal, setCloseModal }) => {
  const controller = useContext(RetailContext);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const {
    donor_name,
    donor_phone,
    donor_email,
    donor_npwp,
    division_name,
    kwitansi,
    category,
    statement_category,
    item_type,
    item_category,
    quantity,
    created_at,
    good_status,
    donor_address,
    good_description,
    total,
    unit,
    description,
    ref_number
  } = controller.transaction;


  const body = (
    <GridContainer>
      <GridItem sm={12} md={12}>
      <div style={modalStyle} className={classes.paper}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} style={{
            marginBottom: '20px'
          }}>
          <span
                  style={{
                    color: "rgba(50, 60, 71, 0.8)",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: '20px'
                  }}
                >
                  DETAIL ZISWAF
                </span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          KATEGORI ZISWAF
                        </span>
                        <p className="black-text">{division_name || "-"}</p>
                      </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          TANGGAL & WAKTU
                        </span>
                        <p className="black-text">
                          {moment(created_at).format("dddd, MMM YYYY")}
                        </p>
                      </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          UNIT
                        </span>
                        <p className="black-text">
                          {unit}
                        </p>
                      </div>
                        </GridItem>
                      </GridContainer>
                   
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          NAMA DONATUR
                        </span>
                        <p className="black-text">{donor_name || "-"}</p>
                      </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          ALAMAT DONATUR
                        </span>
                        <p className="black-text">{donor_address || "-"}</p>
                      </div>  
                        </GridItem>
                      </GridContainer>
                   

                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                         NO HP. 
                        </span>
                        <p className="black-text">{donor_phone || "-"}</p>
                      </div>  
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                         SUREL
                        </span>
                        <p className="black-text">{donor_email || "-"}</p>
                      </div>  
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                         NO NPWP
                        </span>
                        <p className="black-text">{donor_npwp || "-"}</p>
                      </div>  
                          </GridItem>
                      </GridContainer>
                   
                    </GridItem>
                </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} >
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <div className="col s12 l4 m4">
                    
                    <div className="row mb-4">
                      <span
                        style={{
                          color: "#828282",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        NOMOR KWITANSI
                      </span>
                      <p className="black-text">{kwitansi || "-"}</p>
                    </div>
                  </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          JENIS DONASI
                        </span>
                        <p className="black-text">{category || "-"}</p>
                      </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          KETERANGAN DONASI
                        </span>
                        <p className="black-text">
                          {statement_category || "-"}
                        </p>
                      </div>
                          </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          DESKRIPSI DONASI
                        </span>
                        <p className="black-text">
                          {description || "-"}
                        </p>
                      </div>
                          </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          BENTUK DONASI
                        </span>
                        <p className="black-text">{item_type || "-"}</p>
                      </div>
                          </GridItem>
                          {
                            item_type === "Uang" ? (
                              <>
                                <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              TUNAI / NON TUNAI
                            </span>
                            <p className="black-text">{item_category}</p>
                          </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>

                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              NOMINAL
                            </span>
                            <p className="black-text">{total}</p>
                          </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                             NO REF
                            </span>
                            <p className="black-text">{ref_number}</p>
                          </div>
                          </GridItem>
                              </>
                            ) : (
                              <>
                               <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              DESKRIPSI BARANG
                            </span>
                            <p className="black-text">{good_description}</p>
                          </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>

                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              JUMLAH
                            </span>
                            <p className="black-text">{quantity}</p>
                          </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              STATUS BARANG
                            </span>
                            <p className="black-text">{good_status}</p>
                          </div>
                          </GridItem>
                              </>
                            )
                          }
                          
                         
                      </GridContainer>
                    </GridItem>
                </GridContainer>
          </GridItem>
        </GridContainer>
        </div>
      </GridItem>
    </GridContainer>
  );

  return (
    <React.Fragment>
      <Modal open={showModal} onClose={setCloseModal}>
        {body}
      </Modal>
    </React.Fragment>
  );
};

export default ModalDetail;
