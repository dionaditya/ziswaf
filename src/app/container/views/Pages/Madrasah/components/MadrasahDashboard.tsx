/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import TableDataMadrasah from "@/app/container/components/DataTable";
import InlineCss from "react-inline-css";
import { Input } from "@/app/container/components";
import { MadrasahContext, ActionType } from "../Controller";
import { Link } from "react-router-dom";
import MySelect from "@/app/container/components/MultipleColumnSelect";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import { Sort } from "@material-ui/icons";
import DialogDelete from "@/app/container/components/DialogDelete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import history from "@/app/infrastructures/misc/BrowserHistory";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import Box from "@material-ui/core/Box";
import CustomInput from "@/app/container/commons/CustomInput/CustomInput.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputSearch from "@/app/container/commons/InputSearch";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardTitle: {
      color: "#000",
      fontWeight: 900,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      fontSize: 30,
      marginTop: "10vh",
    },
    wrapper_menu: {
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr",
      minWidth: "100%",
    },
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MadrasahDashboardPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertSucess, setSuccess] = React.useState(false);
  const controller = React.useContext(MadrasahContext);
  const classes = useStyles();

  const handleSearchFunc = (e) => {
    controller.handleSearch(controller)(controller.dispatch)(
      ActionType.setData
    );
  };

  const handleEdit = (id) => {
    history.push(`madrasah-input/${id}`);
  };

  const handleDetail = (id) => {
    history.push(`info-madrasah/${id}`);
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

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Box style={{ width: "100%" }}>
            <InputSearch
              placeholder="Cari Ma'had"
              value={controller.filterStatus.search}
              onChange={(e) => {
                controller.handleSearchMadrasahQuery(e)(controller.dispatch)(
                  ActionType.handleSearchMadrasah
                );
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  return controller.handleSearch(controller)(
                    controller.dispatch
                  )(ActionType.setData);
                }
              }}
            />
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 30, marginTop: 20}}>
          <span className={classes.cardTitle}>Daftar Ma'had</span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <GridItem>Filter by</GridItem>
            <GridItem>
              <MySelect
                label="Semua Provinsi"
                options={controller.province}
                handleChange={(e) =>
                  controller.handleSelectedColumn(e)(controller.dispatch)(
                    "province"
                  )
                }
                checked={controller.provinceChecked}
              />
            </GridItem>
            <GridItem>
              <MySelect
                label="Semua Kota"
                options={controller.regency}
                handleChange={(e) =>
                  controller.handleSelectedColumn(e)(controller.dispatch)(
                    "city"
                  )
                }
                checked={controller.cityChecked}
              />
            </GridItem>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <Button
              style={{ backgroundColor: "#6DB400", color: "#FFFFFF" }}
              color="success"
              onClick={(e) => history.push("madrasah-input")}
            >
              + Tambah Ma'had
            </Button>
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <TableDataMadrasah
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
                to={`/dashboard/info-madrasah/${controller.tableIndex}`}
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <Box className={classes.wrapper_menu}>
                  <ListItemIcon>
                    <Sort fontSize="small" />
                  </ListItemIcon>
                  <ListItemText style={{ color: "black" }} primary="Detail" />
                </Box>
              </Link>
              <Link
                to={`/dashboard/madrasah-input/${controller.tableIndex}`}
                className="black-text"
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <Box className={classes.wrapper_menu}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </Box>
              </Link>
              <Box
                className={classes.wrapper_menu}
                onClick={(e) => setDialogOpen(true)}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </Box>
            </CustomizedMenus>
          </TableDataMadrasah>
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
              Sukses menghapus data ma'had
            </Alert>
          </Snackbar>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default MadrasahDashboardPage;
