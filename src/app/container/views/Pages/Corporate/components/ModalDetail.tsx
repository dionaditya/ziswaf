import React from "react";

import { makeStyles, createStyles, Theme, Modal, Box } from '@material-ui/core';
import GridContainer from '@/app/container/commons/Grid/GridContainer';
import GridItem from '@/app/container/commons/Grid/GridItem';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: 'white',
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const ModalDetail = ({ showModal, setCloseModal, controller }) => {

  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const {
    id,
    description,
    donor_name,
    donor_phone,
    donor_email,
    donor_npwp,
    division_name,
    unit,
    city,
    kwitansi,
    category,
    statement_category,
    total,
    item_type,
    item_category,
    ref_number,
    quantity,
    status,
    created_at,
    cash_description,
    good_description,
    donor_category,
    good_status,
    created_by,
    donor_address
  } = controller.transaction

  const body = (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <div style={modalStyle} className={classes.paper}>
              <GridContainer>
                <span
                  style={{
                    color: "rgba(50, 60, 71, 0.8)",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: '2vh',
                  }}
                >
                  DETAIL ZISWAF
                </span>
              </GridContainer>
              <GridContainer>
                <div className="divider"></div>
                <Box display="flex" flexDirection="row" >
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="col s12 l4 m4">
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          KATEGORI ZISWAF
                        </span>
                        <p className="black-text">{division_name}</p>
                      </div>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          TANGGAL & WAKTU
                        </span>
                        <p className="black-text">{created_at}</p>
                      </div>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          NOMOR KWITANSI
                      </span>
                        <p className="black-text">{kwitansi}</p>
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
                            fontWeight: "bold"
                          }}
                        >
                          NAMA DONATUR
                      </span>
                        <p className="black-text">{donor_name}</p>
                      </div>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          ALAMAT DONATUR
                       </span>
                        <p className="black-text">{donor_address}</p>
                      </div>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          JENIS DONASI
                        </span>
                        <p className="black-text">{category}</p>
                      </div>
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          KETERANGAN DONASI
                        </span>
                        <p className="black-text">{statement_category}</p>
                      </div>
                    </div>
                  </GridItem>
                  <GridItem>
                    <div className="col s12 l4 m4">
                      <div className="row mb-4">
                        <span
                          style={{
                            color: "#828282",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          BENTUK DONASI
                        </span>
                        <p className="black-text">{item_type}</p>
                      </div>
                      {
                        item_type === "uang" ? (
                          <>
                            <div className="row mb-4">
                              <span
                                style={{
                                  color: "#828282",
                                  fontSize: "12px",
                                  fontWeight: "bold"
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
                                  fontWeight: "bold"
                                }}
                              >
                                JUMLAH
                                </span>
                              <p className="black-text">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)} </p>
                            </div>
                            <div className="row mb-4">
                              <span
                                style={{
                                  color: "#828282",
                                  fontSize: "12px",
                                  fontWeight: "bold"
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
                                    fontWeight: "bold"
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
                                    fontWeight: "bold"
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
                                    fontWeight: "bold"
                                  }}
                                >
                                  STATUS BARANG
                                        </span>
                                <p className="black-text">{good_status}</p>
                              </div>
                            </>
                          )
                      }
                    </div>
                  </GridItem>
                </Box>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer >
  )

  return (
    <React.Fragment>
      <Modal
        open={showModal}
        onClose={setCloseModal}
      >
        {body}
      </Modal >
    </React.Fragment >
  );
};

export default ModalDetail;
