import React, { useState, useContext } from "react";
import { Textarea } from "@/app/container/components/index";
import SelectOptions from "@/app/container/components/SelectOptions";
import CashType from "./CashType";
import GoodsType from "./GoodsType";
import { CorporateContext } from "../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { Box, Radio, Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import FormControlLabel from "@material-ui/core/FormControlLabel";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const DonationInput = ({ index, setIndex }) => {
  const [showComponent, setShowComponent] = useState(0);

  const controller = useContext(CorporateContext);
  const { addToast } = useToasts();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorDonation, setErrorDonation] = useState(false);
  const [errorGoods, setErrorGoods] = useState(false);

  const onChange = (e) => {
    controller.handleInputDonation(e);
  };

  const handleChange = (e: any) => {
    console.log(e);
    setShowComponent(e.target.value);
    controller.handleInputDonation(e);
  };

  const handleSubmit = async (e) => {
    if (
      controller.DonationInfo.category_id !== 0 &&
      controller.DonationInfo.statement_category_id !== 0
    ) {
      setErrorDonation(false);

      if (controller.DonationInfo.donation_item === 1) {
        if (_.isNumber(controller.DonationInfo.cash.category_id)) {
          setError(false);
          const [status, response] = await controller.handlePostDonation(e);
          if (status === "success") {
            addToast("Data donasi telah tersimpan", { appearance: "success" });
            setTimeout(() => {
              history.push(
                `/dashboard/upz-tanda-terima/${response.id}?employee_id=${controller.DonationInfo.employee_id}`
              );
            }, 500);
          } else {
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
          setError(true);
        }
      } else {
        if (
          controller.DonationInfo.goods.category_id !== 0 &&
          controller.DonationInfo.goods.status !== 0
        ) {
          setErrorGoods(false);
          const [status, response] = await controller.handlePostDonation(e);
          if (status === "success") {
            addToast("Data donasi telah tersimpan", { appearance: "success" });
            setTimeout(() => {
              history.push(
                `/dashboard/upz-tanda-terima/${response.id}?employee_id=${controller.DonationInfo.employee_id}`
              );
            }, 500);
          } else {
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
          setErrorGoods(true);
        }
      }
    } else {
      setErrorDonation(true);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={innerTheme}>
        <Paper
          style={{
            padding: "40px 30px 30px 30px",
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
                          <label htmlFor="info" className="black-text">
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
                          <label htmlFor="info" className="black-text">
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
                          <label htmlFor="info" className="black-text">
                            Deskripsi Donasi
                          </label>
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
                          <h6 className="black-text">Bentuk Donasi</h6>
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
                    <div className="right mt-4 mr-4 mb-4 ml-4">
                      <Button onClick={handleSubmit} color="primary">
                        Simpan & Lanjutkan
                      </Button>
                    </div>
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
