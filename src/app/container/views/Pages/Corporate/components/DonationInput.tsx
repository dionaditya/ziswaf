import React, { useState, useContext } from "react";
import { Textarea } from "@/app/container/components/index";
import SelectOptions from "@/app/container/components/SelectOptions";
import CashType from "./CashType";
import GoodsType from "./GoodsType";
import { CorporateContext } from "../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import { useHistory } from "react-router-dom";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import {
  Box,
  Radio,
  makeStyles,
  Theme,
  createStyles,
  Paper,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useToasts } from "react-toast-notifications";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import _ from "lodash";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "2vh",
      padding: "30px 0",
    },
    formMargin: {
      margin: theme.spacing(1),
    },
    formSearch: {
      marginTop: "2vh",
      marginBottom: 10,
    },
    formContainer: {
      marginTop: theme.spacing(1),
      width: "100%",
      marginRight: 20,
      marginLeft: 20,
    },
    formControl: {
      marginTop: theme.spacing(1),
      width: "100%",
    },
    cardTitle: {
      color: "#3A3B3F",
    },
    label: {
      color: "#323C47",
      fontSize: 12,
      fontWeight: 800,
    },
    labelOpsional: {
      color: '#BCBCBC',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  })
);

const DonationInput = ({ index, setIndex }) => {
  const [showComponent, setShowComponent] = useState(0);

  const history = useHistory();
  const controller = useContext(CorporateContext);
  const classes = useStyles();
  const { addToast } = useToasts();
  const [error, setError] = useState(false);
  const [errorDonation, setErrorDonation] = useState(false);
  const [errorGoods, setErrorGoods] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    controller.handleInputDonation(e);
  };

  const handleChange = (e: any) => {
    setShowComponent(e.target.value);
    controller.handleInputDonation(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      controller.DonationInfo.category_id !== 0 &&
      controller.DonationInfo.statement_category_id !== 0
    ) {
      setErrorDonation(false);
      if (controller.DonationInfo.donation_item === 1) {
        if (
          _.isNumber(controller.DonationInfo.cash.category_id) &&
          Number(controller.DonationInfo.cash.value) !== 0
        ) {
          setError(false);
          const [status, response] = await controller.handlePostDonation(e);
          if (status === "success") {
            if (controller.updateSession) {
              addToast("Data donasi telah diperbarui", {
                appearance: "success",
              });
              setTimeout(() => {
                history.push(
                  `/dashboard/donation/corporate/tanda-terima/${response.id}`
                );
              }, 500);
            } else {
              addToast("Data donasi telah tersimpan", {
                appearance: "success",
              });
              setTimeout(() => {
                history.push(
                  `/dashboard/donation/corporate/tanda-terima/${response.id}`
                );
              }, 500);
            }
          } else {
            setLoading(false);
            if (
              response.response.status === 400 ||
              response.response.status === 402
            ) {
              addToast(response.response.data.message, { appearance: "error" });
            } else {
              addToast(response.response.data.message, { appearance: "error" });
            }
          }
        } else {
          setLoading(false);
          setError(true);
        }
      } else {
        if (
          controller.DonationInfo.goods.category_id !== 0 &&
          _.isNumber(controller.DonationInfo.goods.status) === true &&
          controller.DonationInfo.goods.quantity !== 0 &&
          Number(controller.DonationInfo.goods.value) !== 0
        ) {
          setErrorGoods(false);

          const [status, response] = await controller.handlePostDonation(e);
          if (status === "success") {
            if (controller.updateSession) {
              addToast("Data donasi telah diperbarui", {
                appearance: "success",
              });
              setTimeout(() => {
                history.push(
                  `/dashboard/donation/corporate/tanda-terima/${response.id}`
                );
              }, 500);
            } else {
              addToast("Data donasi telah tersimpan", {
                appearance: "success",
              });
              setTimeout(() => {
                history.push(
                  `/dashboard/donation/corporate/tanda-terima/${response.id}`
                );
              }, 500);
            }
          } else {
            setLoading(false);
            if (
              response.response.status === 400 ||
              response.response.status === 402
            ) {
              addToast(response.response.data.message, { appearance: "error" });
            } else {
              addToast(response.response.data.message, { appearance: "error" });
            }
          }
        } else {
          setLoading(false);
          setErrorGoods(true);
        }
      }
    } else {
      setLoading(false);
      setErrorDonation(true);
    }
  };


  return (
    <React.Fragment>
      <ThemeProvider theme={innerTheme}>
        <Paper
          style={{
            padding: "30px",
          }}
        >
          <GridContainer>
            <GridItem sm={12} md={12}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardBody>
                      <GridItem xs={12} sm={12} md={12}>
                        <Box display="flex" flexDirection="column">
                          {
                            controller.loading && 
                            <span>
                              Loading.....
                            </span>
                          }
                          <label htmlFor="info" className={classes.label}>
                            Jenis Donasi
                          </label>
                          <SimpleSelect
                            async
                            onChange={onChange}
                            value={controller.DonationInfo.category_id}
                            data={controller.category}
                            name="category_id"
                            label="Jenis Donasi"
                          />
                          <label htmlFor="info" className={classes.label}>
                            Kategori Donasi
                          </label>
                          <SimpleSelect
                            async
                            onChange={onChange}
                            value={
                              controller.DonationInfo.statement_category_id
                            }
                            data={controller.subCategory || []}
                            name="statement_category_id"
                            label="Jenis Donasi"
                          />
                          {errorDonation && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              Belum memilih jenis donasi
                            </p>
                          )}
                          <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                          <label htmlFor="info" className={classes.label}>
                            Deskripsi Donasi
                          </label>
                          <label className={classes.labelOpsional}>
                            Opsional
                          </label>
                          </Box>
                          <Textarea
                            className="text-area"
                            id="description"
                            name="description"
                            placeholder="Deskripsi Donasi"
                            value={controller.DonationInfo.description}
                            onChange={onChange}
                            style={{
                              minHeight: "100px",
                            }}
                          />
                          <h6 className={classes.label}>Bentuk Donasi</h6>
                          <Box display="flex" flexDirection="row">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  icon={<CircleUnchecked />}
                                  color="primary"
                                  checkedIcon={<CircleCheckedFilled />}
                                  checked={
                                    controller.DonationInfo.donation_item === 1
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    const data = {
                                      target: {
                                        name: "donation_item",
                                        value: 1,
                                      },
                                    };
                                    handleChange(data);
                                  }}
                                  name="donation_item"
                                />
                              }
                              label="Uang"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  icon={<CircleUnchecked />}
                                  color="primary"
                                  checkedIcon={<CircleCheckedFilled />}
                                  checked={
                                    controller.DonationInfo.donation_item === 2
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    const data = {
                                      target: {
                                        name: "donation_item",
                                        value: 2,
                                      },
                                    };
                                    handleChange(data);
                                  }}
                                  name="donation_item"
                                />
                              }
                              label="Barang"
                            />
                          </Box>
                        </Box>
                      </GridItem>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  {controller.DonationInfo.donation_item === 1 ? (
                    <CashType
                      controller={controller}
                      error={error}
                      onChange={controller.handleCashInput}
                    />
                  ) : (
                    <GoodsType
                      controller={controller}
                      error={errorGoods}
                      onChange={controller.handleGoodsInput}
                    />
                  )}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                  >
                    <Button
                      onClick={handleSubmit}
                      loading={loading}
                      disabled={loading}
                      color="primary"
                    >
                      Simpan & Lanjutkan
                    </Button>
                  </Box>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DonationInput;
