import React, { useContext } from "react";
import MUIDataTable from "mui-datatables";
import { DonationContext } from "../Controller";
import DialogDelete from "@/app/container/components/DialogDelete";
import DeleteIcon from "@material-ui/icons/Delete";
import PeopleIcon from "@material-ui/icons/People";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import { Edit } from "@material-ui/icons";
import TableDataSiswa from "@/app/container/components/DataTable";
import { Link } from "react-router-dom";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import ModalDeleteTransaction from "./ModalDelete";
import { useToasts } from "react-toast-notifications";

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
  const [alertSucess, setSuccess] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const controller = useContext(DonationContext);
  const classes = useStyles();
  const { addToast } = useToasts();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleModal = async () => {
    const [status, response] = await controller.handleDelete();
    if (status === "success") {
      setSuccess(true);
      setModalDelete(false);
    } else {
      addToast(`Gagal menghapus data transaksi karena`, {
        appearance: "error",
      });
    }
  };

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
                to={`/dashboard/donation/${controller.divisionId}/tanda-terima/${controller.tableIndex}`}
                className="black-text"
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <Box className={classes.wrapper_menu}>
                  <ListItemIcon>
                    <SortIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Detail" />
                </Box>
              </Link>
              {controller.userInfo.role === 1 && (
                <>
                  <Link
                    to={`/dashboard/donation/${controller.divisionId}/transaction/${controller.tableIndex}?edit=true`}
                    className="black-text"
                    style={{
                      textDecoration: "none",
                      color: "#000",
                    }}
                  >
                    <Box className={classes.wrapper_menu}>
                      <ListItemIcon>
                        <Edit fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </Box>
                  </Link>
                </>
              )}
              {controller.userInfo.role === 1 && (
                <Box
                  className={classes.wrapper_menu}
                  onClick={() => setModalDelete(true)}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </Box>
              )}
            </CustomizedMenus>
          </TableDataSiswa>
        </GridItem>
        <ModalDeleteTransaction
          showModal={modalDelete}
          setShowModal={() => setModalDelete(false)}
          handleClickCTA={(e) => handleModal()}
        />
      </GridContainer>
      {/* <DialogDelete
          open={dialogOpen}
          handleDelete={(e) => {
            console.log(e);
          }}
          handleClose={(e) => setDialogOpen(false)}
        /> */}
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
}
