import React, { useContext } from "react";
import { Input } from "@/app/container/components/index";
import { DonationContext } from "../Controller";
import moment from "moment";
import Modal from "@/app/container/commons/Modal/index.js";
import SelectWithSearch, {
  SelectWithSearchWithDebounced,
} from "@/app/container/components/SelectWithSearch";
import { statement_category, DonationCategory, donatur_category, Division, PaymentTypeFilter} from "@/domain/entities/AllOptions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import DatePicker from "react-datepicker";
import DateTimePicker from "@/app/container/commons/DateTimePicker";
import _ from "lodash";
import InputMask from "@/app/container/components/InputMask";
import GridContainer from '@/app/container/commons/Grid/GridContainer';
import GridItem from '@/app/container/commons/Grid/GridItem';
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

const asyncDefaultValue = {
  name: 'SEMUA',
  id: ""
}

const nonasyncDefaultValue = ["", "SEMUA"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#ffff",
    },
    loadingReset: {
      color: "#00923F",
    },
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labels: {
      fontSize: 14,
      fontWeight: 800,
      marginBottom: 15,
      color: "#757575",
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
  })
);



const ModalFilter = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [startTotal, setStartTotal] = React.useState(0);
  const [endTotal, setEndTotal] = React.useState(startTotal);
  const classes = useStyles();
  const controller = useContext(DonationContext);

  // function myFormat(num) {
  //   const formatter = new Intl.NumberFormat("sv-SE", {
  //     style: "decimal",
  //     currency: "SEK"
  //   });
  //   return formatter.format(num);
  // }

  const body = (
    <GridContainer style={{ padding: "10px 20px" }}>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.subLabel}>Mulai</span>
              <DateTimePicker
                selectedDate={startDate}
                handleDateChange={(date) => {
                  setStartDate(date);
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      start_date: moment(date).toISOString(),
                    },
                  }));
                }}
                maxDate={endDate}
                placeholderText="Pilih tanggal"
                dateFormat="dd-MM-yyyy"
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.subLabel}>Hingga</span>
              <DateTimePicker
                selectedDate={endDate}
                handleDateChange={(date) => {
                  setEndDate(date);
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      end_date: moment(date).toISOString(),
                    },
                  }));
                }}
                minDate={startDate}
                placeholderText="Pilih tanggal"
                dateFormat="dd-MM-yyyy"
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="unit-name" className="black-text">
                UNIT
              </label>
              {controller.userInfo.role === 2 ? (
                <SelectWithSearch
                  async
                  value={controller.userInfo.school.id}
                  data={[
                    {
                      id: controller.userInfo.school.id,
                      name: controller.userInfo.school.name
                    }
                  ]}
                  isDisabled
                  name="school_id"
                  label="UNIT"
                  onChange={(e) =>
                    controller.setFilterParam((prevState) => ({
                      ...prevState,
                      filter: {
                        ...prevState.filter,
                        school_id: e.value,
                      },
                    }))
                  }
                />
              ) : (
                  <SelectWithSearch
                    onChange={(e) =>
                      controller.setFilterParam((prevState) => ({
                        ...prevState,
                        filter: {
                          ...prevState.filter,
                          school_id: e.value,
                        },
                      }))
                    }
                    async
                    isDisabled={false}
                    value={controller.filterParam.filter.school_id}
                    data={[
                      asyncDefaultValue,
                      ...controller.school
                      ]}
                    name="school_id"
                    label="SEMUA"
                    placeholder="SEMUA"
                  />
                )}
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="end-date" className="black-text">
                KOTA
                </label>
              <SelectWithSearch
                async
                isDisabled={false}
                onChange={(selectedValue) => {
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      regency: selectedValue.value,
                    },
                  }));
                }}
                value={controller.filterParam.filter.regency}
                data={[
                   asyncDefaultValue,
                   ...controller.regency
                  ]}
                name="regency"
                label="SEMUA"
                placeholder="SEMUA"
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="donatur-type" className="black-text">
                KATEGORI DONATUR
                       </label>
              <SelectWithSearch
                async={false}
                value={controller.filterParam.filter.donor_category}
                data={[
                  nonasyncDefaultValue,
                  ...donatur_category
                ]}
                onChange={(e) =>
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      donor_category: e.value,
                    },
                  }))
                }
                name="donor_category"
                label="SEMUA"
                isDisabled={false}
                placeholder="SEMUA"
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="end-date" className="black-text">
                KATEGORI SUMBER
                       </label>
              <SelectWithSearch
                async={false}
                value={controller.filterParam.filter.division_id}
                data={[
                  nonasyncDefaultValue,
                  ...Division
                ]}
                onChange={(e) =>
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      division_id: e.value,
                    },
                  }))
                }
                name="division_id"
                label="SEMUA"
                isDisabled={false}
                placeholder="SEMUA"
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="end-date" className="black-text">
                JENIS DONASI
                       </label>
              <SelectWithSearch
                async={false}
                value={controller.filterParam.filter.category_id}
                data={[
                  nonasyncDefaultValue,
                  ...DonationCategory
                  ]}
                onChange={(e) =>
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      category_id: e.value,
                    },
                  }))
                }
                name="category_id"
                label="SEMUA"
                isDisabled={false}
                placeholder="SEMUA"
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "100%" }}>
              <label htmlFor="end-date" className="black-text">
                TUNAI / NON TUNAI
               </label>
              <SelectWithSearch
                async={false}
                value={controller.filterParam.filter.category_type}
                data={[
                  nonasyncDefaultValue,
                  ...PaymentTypeFilter
                ]}
                onChange={(e) =>
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      category_type: e.value,
                    },
                  }))
                }
                name="category_type"
                label="SEMUA"
                isDisabled={false}
                placeholder="SEMUA"
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <Box style={{ width: "89%" }}>
              <label htmlFor="start-value" className="black-text">
                MULAI
              </label>
              <InputMask
                defaultValue={startTotal}
                placeholder="Rp. 0"
                type="text"
                onChange={(value) => {
                  setStartTotal(value);
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      start_total: value,
                    },
                  }));
                }}
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "89%" }}>
              <label htmlFor="end-value" className="black-text">
                HINGGA
              </label>
              <InputMask
                defaultValue={endTotal < startTotal ? startTotal : endTotal}
                placeholder="Rp. 0"
                type="text"
                onChange={(value) => {
                  setEndTotal(value);
                  controller.setFilterParam((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      end_total: value,
                    },
                  }));
                }}
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer style={{ marginTop: 20 }}>
          <GridItem xs={12} sm={6} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                flat
                node="button"
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  marginRight: "4px",
                }}
                disabled={loading ? true : false}
                onClick={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  await controller.clearData();
                  setStartDate(new Date());
                  setEndDate(new Date());
                  setStartTotal(0);
                  setEndTotal(0);
                  setLoading(false);
                }}
              >
                {loading ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {loading && (
                      <CircularProgress
                        className={classes.loadingReset}
                        size={16}
                      />
                    )}
                    <span>CLEAR ALL</span>
                  </div>
                ) : (
                    <div>
                      <span>CLEAR ALL</span>
                    </div>
                  )}
              </Button>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              {loading ? (
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                  }}
                  disabled
                  style={{
                    background: "#228B22",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    marginLeft: "4px",
                  }}
                  className="btn"
                >
                  {loading && (
                    <CircularProgress className={classes.root} size={16} />
                  )}
                  <span>Terapkan Filter</span>
                </Button>
              ) : (
                  <Button
                    small
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      await controller.fetchData();
                      setLoading(false);
                      setShowModal(false);
                    }}
                    node="button"
                    style={{
                      background: "#228B22",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}
                  >
                    <span>Terapkan Filter</span>
                  </Button>
                )}
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer >
  );

  return (
    <React.Fragment>
      <Modal
        isOpen={showModal}
        onHandle={setShowModal}
        title="FILTER DONASI"
        size="xs"
      >
        {body}
      </Modal>
    </React.Fragment>
  );
};

export default ModalFilter;
