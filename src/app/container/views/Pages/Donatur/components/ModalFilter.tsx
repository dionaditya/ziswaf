import React from "react";
import { ActionType, DonorContext } from "./../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import {
  CoorporateStatus,
  donatur_category,
} from "@/domain/entities/AllOptions";
import SelectWithSearch, {
  SelectWithSearchWithDebounced,
} from "@/app/container/components/SelectWithSearch";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";


const asyncDefaultValue = {
  name: 'SEMUA',
  id: ""
}

const nonasyncDefaultValue = ["", "SEMUA"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: "bold",
    },
  })
);

const ModalFilter = () => {
  const controller = React.useContext(DonorContext);
  const classes = useStyles();

  const {
    school_id,
    regency,
    donor_category,
    status,
  } = controller.filterStatus.filter;

  const handleChange = (e) => {
    controller.handleChangeFilter(e)
  };

  const isAdmin = controller.userInfo.role === 1;


  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <label htmlFor="">UNIT</label>
              {isAdmin ? (
                <SelectWithSearch
                  async
                  isDisabled={false}
                  loadOptions={controller.loadData}
                  onChange={(e) => {
                    controller.setFilterStatus((prevState) => ({
                      ...prevState,
                      filter: {
                        ...prevState.filter,
                        school_id: e.value,
                      },
                    }));
                  }}
                  value={school_id}
                  data={[
                    asyncDefaultValue,
                    ...controller.school
                    ]}
                  name="school_id"
                  label="UNIT"
                  placeholder={controller.loading ? "loading..." : "SEMUA"}
                />
              ) : (
                <SelectWithSearch
                  async
                  isDisabled
                  onChange={handleChange}
                  value={controller.userInfo.school_id}
                  data={[
                    {
                      id: controller.userInfo.school.id,
                      name: controller.userInfo.school.name,
                    },
                  ]}
                  name="school_id"
                  label="Unit"
                  placeholder={controller.loading ? "loading..." : "SEMUA"}
                />
              )}
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <label htmlFor="">KOTA</label>
              <SelectWithSearch
                async
                isDisabled={false}
                onChange={(e) => {
                  controller.setFilterStatus((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      regency: e.value,
                    },
                  }));
                }}
                value={regency}
                data={[
                  asyncDefaultValue,
                  ...controller.regency
                  ]}
                name="regency"
                label="Kota"
                placeholder={controller.loading ? "loading..." : "SEMUA"}
              />
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <label htmlFor="">KATEGORI DONATUR</label>
              <SelectWithSearch
                async={false}
                isDisabled={false}
                onChange={(e) => {
                  controller.setFilterStatus((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      donor_category: e.value,
                    },
                  }));
                }}
                value={donor_category}
                name="donor_category"
                data={[
                  nonasyncDefaultValue,
                  ...donatur_category
                  ]}
                label="Kategori Donatur"
                placeholder="SEMUA"
              />
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <label htmlFor="">STATUS</label>
              <SelectWithSearch
                async={false}
                isDisabled={false}
                onChange={(e) => {
                  controller.setFilterStatus((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      status: e.value,
                    },
                  }));
                }}
                value={status}
                name="status"
                data={[
                  nonasyncDefaultValue,
                  ...CoorporateStatus
                  ]}
                placeholder="SEMUA"
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
  );
};

export default ModalFilter;
