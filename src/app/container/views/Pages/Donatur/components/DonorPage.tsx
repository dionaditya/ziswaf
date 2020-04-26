/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import DonorData from "./DonorData";
import ModalFilters, {
  ModalBody,
  ModalFooter,
} from "@/app/container/components/ModalFilters";
import { DonorContext, ActionType } from "./../Controller";
import { Link } from "react-router-dom";
import ModalFilter from "./ModalFilter";
import MySelect from "@/app/container/components/MultipleColumnSelect";
import { DonorTableColumn } from "@/domain/entities/AllOptions";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DialogDelete from "@/app/container/components/DialogDelete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import ButtonFilter from "@/app/container/commons/CustomButtons/Button.tsx";
import ButtonMUI from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Details } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import InputSearch from "@/app/container/commons/InputSearch";
import ButtonMenuNav from './ButtonMenu';

const listColumnOptions = DonorTableColumn.map((val) => {
  return {
    name: val[0],
    label: val[1],
  };
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#ffff",
    },
    loadingReset: {
      color: "#00923F",
    },
    wrapper: {
      width: "100%",
      minWidth: "100%",
    },
    container: {
      padding: "0px 0px",
    },
    columns: {
      marginRight: "6px",
    },
    title: {
      fontWeight: "bold",
      color: "#3A3B3F",
    },
    wrapper_menu: {
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr",
      minWidth: "100%",
    },
  })
);

const DonorPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertSucess, setSuccess] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const xsmall = useMediaQuery("(min-width: 300px)" && "(max-width: 700px");
  const medium = useMediaQuery("(min-width: 701px)");
  const classes = useStyles();
  const controller = React.useContext(DonorContext);

  const handleSearchFunc = (e) => {
    controller.handleSearch(e)
  };

  const handleDeleteData = (e) => {
    const isSuccess = controller.handleDelete(e);
    if (isSuccess) {
      setSuccess(true);
      setDialogOpen(false);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  

  const ModalComponent = () => {
    return (
      <ModalFilters
        onShow={controller.statusModal}
        handleClose={(e) =>
          controller.handleCloseModal(e)
        }
        titleModal="Filter"
      >
        <ModalBody>
          <ModalFilter />
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <ButtonFilter
              disabled
              style={{
                backgroundColor: "transparent !important",
                color: "#00923F",
              }}
              color="transparent"
              className=" btn-flat gray-text"
              onClick={(e) =>
                controller.handleResetFilter(e)
              }
            >
              {<CircularProgress size={16} className={classes.loadingReset} />}
              Reset
            </ButtonFilter>
          ) : (
            <ButtonFilter
              style={{
                color: "#00923F",
              }}
              color="transparent"
              onClick={async (e) => {
                setLoading(true);
                controller.handleResetFilter(e)
                setTimeout(() => {
                  setLoading(false);
                }, 300)
              }}
            >
              Reset
            </ButtonFilter>
          )}

          {isLoading ? (
            <ButtonFilter
              disabled
              color="primary"
              style={{
                color: "#fff",
              }}
              onClick={(e) =>
                controller.handleCTA(e)
              }
            >
              {<CircularProgress size={16} className={classes.root} />}
              Terapkan Filter
            </ButtonFilter>
          ) : (
            <ButtonFilter
              color="primary"
              style={{
                color: "#fff",
              }}
              onClick={async (e) => {
                setLoading(true);
                controller.handleCTA(e)
                setTimeout(() => {
                  setLoading(false);
                }, 300)
                
              }}
            >
              Terapkan Filter
            </ButtonFilter>
          )}
        </ModalFooter>
      </ModalFilters>
    );
  };

  return (
    <>
      <Box className={classes.container}>
        <DialogDelete
          open={dialogOpen}
          handleDelete={handleDeleteData}
          handleClose={(e) => setDialogOpen(false)}
        />
        <Snackbar
          open={alertSucess}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Sukses menghapus data donatur
          </Alert>
        </Snackbar>
        <ModalComponent />
        <GridItem mr={4} ml={4} mt={4} mb={4}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer display="flex" alignItems="center">
                <GridItem xs={5} sm={5} md={2}>
                  {xsmall && (
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonFilter
                        style={{
                          backgroundColor: "#fff",
                          color: "#3A3B3F",
                        }}
                        color="white"
                        onClick={(e) =>
                          controller.handleModal(e)
                        }
                        icon={<FilterListIcon />}
                      >
                        <span>Filter</span>
                      </ButtonFilter>
                    </Box>
                  )}
                  {medium && (
                    <ButtonFilter
                      style={{
                        backgroundColor: "#fff",
                        color: "#3A3B3F",
                      }}
                      color="white"
                      onClick={(e) =>
                        controller.handleModal(e)
                      }
                      icon={<FilterListIcon />}
                    >
                      <span>Filter</span>
                    </ButtonFilter>
                  )}
                </GridItem>
                <GridItem xs={7} sm={7} md={10}>
                  <Box style={{ width: "100%" }}>
                    <InputSearch
                      value={controller.filterStatus.search}
                      onChange={(e) =>
                        controller.handleSearchDonorQuery(e)
                      }
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handleSearchFunc(event);
                        }
                      }}
                      placeholder="Cari Donatur"
                    />
                  </Box>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <GridContainer mt={4}>
            <GridItem xs={12} sm={12} md={12} mt={2}>
              <Box mt={2}>
                <Typography
                  variant="h5"
                  className={classes.title}
                  gutterBottom
                >
                  Daftar Donatur
                </Typography>
              </Box>
            </GridItem>
          </GridContainer>
          <GridContainer alignItems="center">
            <GridItem xs={12} sm={12} md={6}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography className={classes.columns}>
                  Columns to Display
                </Typography>
                <MySelect
                  label={`${controller.displayColumns.length} of ${listColumnOptions.length} Selected`}
                  options={listColumnOptions}
                  handleChange={(e) =>
                    controller.handleSelectedColumn(e)
                    
                  }
                  checked={controller.displayColumns}
                />
              </Box>
            </GridItem>
            <ButtonMenuNav />
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <DonorData
                options={controller.optionsTable}
                loading={controller.loading}
                data={controller.data}
                column={controller.displayColumns}
                // page={controller.filterStatus.paging.page}
                // count={controller.filterStatus.paging.limit}
                // handleSort={controller.handleSort}
                // handleChangesRowsPerPage={controller.handleChangesRowsPerPage}
              >
                <CustomizedMenus>
                <Link
                    to={`/dashboard/donatur-${controller.isCompany.toLowerCase()}/${controller.tableIndex}?is_detail=true`}
                    className="black-text"
                    style={{
                      textDecoration: 'none',
                      color: '#000'
                    }}
                  >
                    <Box className={classes.wrapper_menu}>
                      <ListItemIcon>
                        <Details fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Detail" />
                    </Box>
                  </Link>
                  <Link
                    to={`/dashboard/donatur-${controller.isCompany.toLowerCase()}/${controller.tableIndex}`}
                    className="black-text"
                    style={{
                      textDecoration: 'none',
                      color: '#000'
                    }}
                  >
                    <Box className={classes.wrapper_menu}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </Box>
                  </Link>
                  <Box className={classes.wrapper_menu} onClick={(e) => setDialogOpen(true)}>
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                  </Box>
                </CustomizedMenus>
              </DonorData>
            </GridItem>
          </GridContainer>
        </GridItem>
      </Box>
    </>
  );

  
};

export default DonorPage;
