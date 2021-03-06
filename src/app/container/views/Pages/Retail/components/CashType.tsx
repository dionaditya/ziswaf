import React from "react";
import { Input } from "@/app/container/components/index";
import SimpleSelect from "@/app/container/components/SelectMUI";
import { CashCategories } from "@/domain/entities/AllOptions";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  TextField,
} from "@material-ui/core";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import InputMask from "@/app/container/components/InputMask";
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
    },
    formPercentage: {
      height: 40,
    },
    formContainer: {
      marginTop: theme.spacing(2),
      width: "100%",
      marginRight: 10,
      marginLeft: 10,
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
      marginTop: theme.spacing(2),
    },
  })
);

const JenisUang = ({ controller, onChange, error }) => {
  const classes = useStyles();
  const {
    type_id,
    category_id,
    value,
    ref_number,
  } = controller.DonationInfo.cash;

  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h3 className="white-text">Donasi Bentuk Uang</h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box className={classes.formContainer}>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>
                        PIlihan Tunai / Non Tunai
                      </label>
                      <SimpleSelect
                          async={false}
                          name="type_id"
                          onChange={onChange}
                          value={
                            type_id
                          }
                          data={[[0, "Tunai"], [1, "Non Tunai"]]}
                          label="Tunai / Non Tunai"
                        />
                   
                    </GridItem>
                  </Box>
                  <Box className={classes.formContainer}>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Pilihan Non Tunai</label>
                      {type_id === 0 || type_id === "0" ? (
                        <SimpleSelect
                          async={false}
                          name="category_id"
                          onChange={onChange}
                          value={category_id}
                          disabled={true}
                          data={[CashCategories[0]]}
                          label="Non Tunai"
                        />
                      ) : (
                        <SimpleSelect
                          async={false}
                          name="category_id"
                          onChange={onChange}
                          value={category_id}
                          data={CashCategories.slice(1, CashCategories.length)}
                          label="Non Tunai"
                        />
                      )}
                      {error && _.isNumber(category_id) === false && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                           Belum memilih tipe pembayaran
                        </p>
                      )}
                    </GridItem>
                  </Box>
                  <Box className={classes.formContainer}>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Besar Nominal</label>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputMask
                        defaultValue={value}
                        placeholder="Rp. 0"
                        type="text"
                        onChange={(value) => {
                          const e = {
                            target: {
                              name: "value",
                              value: value,
                            },
                          };
                          onChange(e);
                        }}
                      />
                      {error && Number(value) === 0 && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Jumlah donasi harus lebih dari Rp. 0
                        </p>
                      )}
                    </GridItem>
                  </Box>
                  <Box className={classes.formContainer}>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Nomor Ref</label>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="ref_number"
                        name="ref_number"
                        type="number"
                        placeholder="No Ref"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={ref_number}
                        onChange={onChange}
                      />
                    </GridItem>
                  </Box>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default JenisUang;
