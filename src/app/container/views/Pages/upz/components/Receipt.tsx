/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ModalDetail from "./ModalDetail";
import { CorporateContext } from "../Controller";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import { Box, makeStyles, Theme, createStyles } from "@material-ui/core";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { NominalFormat } from "@/app/infrastructures/misc/NominalFormat";
import qs from "qs";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      marginTop: "5vh",
    },
  })
);

const Receipts = ({ index, setIndex }) => {
  const controller = React.useContext(CorporateContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    donor_address,
  } = controller.transaction;

  function useQuery() {
    const location = useLocation();
    return qs.parse(location.search);
  }

  let query = useQuery();

  return (
    <>
      <ModalDetail setCloseModal={handleClose} showModal={open} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Box className={classes.modal}>
            <Card>
              <CardHeader color="primary">
                <Box display="flex" flexDirection="row">
                  <GridItem xs={12} sm={6} md={6}>
                    <h4
                      className="card-title white-text"
                      style={{ fontWeight: "bold", color: "white" }}
                    >
                      {controller.loading ? (
                        <span>Loading.....</span>
                      ) : (
                        <span>TANDA TERIMA</span>
                      )}
                    </h4>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                      {query["?employee_id"] !== undefined && (
                        <Button
                          small
                          node="button"
                          style={{
                            color: "#ffffff",
                            background: "#6DB400",
                          }}
                          onClick={handleOpen}
                        >
                          Lihat Detail
                        </Button>
                      )}
                    </Box>
                  </GridItem>
                </Box>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={4} sm={4} md={4}>
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
                        <p className="black-text">{created_at}</p>
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
                  <GridItem xs={4} sm={4} md={4}>
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
                  <GridItem xs={4} sm={4} md={4}>
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
                      {item_type === "Uang" ? (
                        <div>
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
                            <p className="black-text">{NominalFormat(total)}</p>
                          </div>
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
                            <p className="black-text">{ref_number || "-"}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
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
                        </div>
                      )}
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </Box>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Box display="flex" justifyContent="flex-end" flexDirection="row">
            <Button
              small
              onClick={() => controller.handleExportPdf()}
              node="button"
              style={{
                background: "#00923F",
                color: "#ffffff",
                marginLeft: "4px",
              }}
            >
              {query["?employee_id"] === undefined ? "Lihat detail" : "Cetaik"}
            </Button>
          </Box>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default Receipts;
