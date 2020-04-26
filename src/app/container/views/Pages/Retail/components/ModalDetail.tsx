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
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
    cash_description,
    good_description,
    total
  } = controller.transaction;

  const body = (
    <GridContainer>
      <GridItem sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <div style={modalStyle} className={classes.paper}>
              <GridContainer>
                <span
                  style={{
                    color: "rgba(50, 60, 71, 0.8)",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  DETAIL ZISWAF
                </span>
              </GridContainer>
              <GridContainer>
                <div className="divider"></div>
                <Box display="flex" flexDirection="row">
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="col s12 l4 m4">
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
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="col s12 l4 m4">
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
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="col s12 l4 m4">
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
                      {item_type === "uang" ? (
                        <>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              DESKRIPSI PEMBAYARAN
                            </span>
                            <p className="black-text">{item_category}</p>
                          </div>
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
                            <p className="black-text">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(total)}
                            </p>
                          </div>
                          <div className="row mb-4">
                            <span
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              DESKRIPSI
                            </span>
                            <p className="black-text">{cash_description}</p>
                          </div>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </GridItem>
                </Box>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
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
