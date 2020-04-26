import React, { useContext, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { DonationContext } from "../Controller";
import DialogDelete from "@/app/container/components/DialogDelete";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import TableDataSiswa from "@/app/container/components/DataTable";
import { Link } from "react-router-dom";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";

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
    },
    wrapper_menu: {
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr",
      minWidth: "100%",
    },
  })
);

export function DataDonasi() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertSucess, setSuccess] = React.useState(false);
  const controller = useContext(DonationContext);
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  return useMemo(() => {
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TableDataSiswa
              options={controller.optionsTable}
              loading={controller.loading}
              data={controller.data}
              column={controller.displayColumns.data}
              // page={controller.filterStatus.paging.page}
              // count={controller.filterStatus.paging.limit}
              // handleSort={controller.handleSort}
              // handleChangesRowsPerPage={controller.handleChangesRowsPerPage}
            >
              <CustomizedMenus>
                <Link
                  to={`/dashboard/${controller.divisionId}-tanda-terima/${controller.tableIndex}`}
                  className="black-text"
                >
                  <Box className={classes.wrapper_menu}>
                    <ListItemIcon>
                      <SortIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Detail" />
                  </Box>
                </Link>
              </CustomizedMenus>
            </TableDataSiswa>
          </GridItem>
        </GridContainer>
        <DialogDelete
          open={dialogOpen}
          handleDelete={(e) => {
            console.log(e);
          }}
          handleClose={(e) => setDialogOpen(false)}
        />
        <Snackbar
          open={alertSucess}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }, [controller]);
}
