/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import TableDataSiswa from "@/app/container/components/DataTable";
import ModalFilters, {
  ModalBody,
  ModalFooter,
} from "@/app/container/components/ModalFilters";
import { StudentListDashboardContext, ActionType } from "../../Controller";
import { Link } from "react-router-dom";
import ModalContentItems from "./ModalContentItems";
import { StudentListTableColumn } from "@/domain/entities/AllOptions";
import MySelect from "@/app/container/components/MultipleColumnSelect";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import {Details} from '@material-ui/icons'
import DialogDelete from "@/app/container/components/DialogDelete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { Search, Add } from "@material-ui/icons";
import FilterListIcon from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import SearchInput from "@/app/container/commons/SearchInput";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const listColumnOptions = StudentListTableColumn.map(val => {
    return {
        name: val[0],
        label: val[1]
    }
})

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

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StudentListDashboardPage = () => {

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertSucess, setSuccess] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const classes = useStyles();
    const xsmall = useMediaQuery("(min-width: 300px)" && "(max-width: 700px");
    const medium = useMediaQuery("(min-width: 701px)");
  
    const controller = React.useContext(StudentListDashboardContext);
  
    const handleDeleteData =  async (e) => {
      const isSuccess = await controller.handleDelete(e);
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
  
    const handleSearchFunc = (e) => {
      controller.handleSearch(controller)(controller.dispatch)(
        ActionType.setData
      );
    };
  
    const ModalComponent = () => {
      return (
        <ModalFilters
          onShow={controller.statusModal}
          handleClose={(e) =>
            controller.handleModal(e)(controller.dispatch)(ActionType.handleModal)
          }
          titleModal="Filter"
        >
          <ModalBody>
            <ModalContentItems />
          </ModalBody>
          <ModalFooter>
            {isLoading ? (
              <Button
                disabled
                style={{
                  backgroundColor: "transparent !important",
                  color: "#00923F",
                }}
                color="transparent"
                onClick={(e) =>
                  controller.handleResetFilter(e)
                }
              >
                {<CircularProgress size={16} className={classes.loadingReset} />}
                Reset
              </Button>
            ) : (
              <Button
                style={{
                  color: "#00923F",
                }}
                color="transparent"
                onClick={async (e) => {
                  setLoading(true);
                  await controller.handleResetFilter(controller.dispatch)
                  setLoading(false);
                }}
              >
                Reset
              </Button>
            )}
  
            {isLoading ? (
              <Button
                disabled
                color="primary"
                style={{
                  color: "#fff",
                }}
                onClick={(e) =>
                  controller.handleCTA()
                }
              >
                {<CircularProgress size={16} className={classes.root} />}
                Terapkan Filter
              </Button>
            ) : (
              <Button
                color="primary"
                style={{
                  color: "#fff",
                }}
                onClick={async (e) => {
                  setLoading(true);
                  await controller.handleCTA()
                  setLoading(false);
                }}
              >
                Terapkan Filter
              </Button>
            )}
          </ModalFooter>
        </ModalFilters>
      );
    };

    return (
        <Box className={classes.container}>
        <GridItem mr={4} ml={4} mt={4} mb={4}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              {xsmall && (
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      color: "#3A3B3F",
                    }}
                    color="white"
                    onClick={(e) =>
                      controller.handleModal(e)(controller.dispatch)(
                        ActionType.handleModal
                      )
                    }
                    icon={<FilterListIcon />}
                  >
                    <span>Filters</span>
                  </Button>
                </Box>
              )}
             
              {medium && (
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#3A3B3F",
                  }}
                  color="white"
                  onClick={(e) =>
                    controller.handleModal(e)(controller.dispatch)(
                      ActionType.handleModal
                    )
                  }
                  icon={<FilterListIcon />}
                >
                  {/* <FilterListIcon /> */}
                  <span>Filters</span>
                </Button>
              )}
            </GridItem>
            <GridItem xs={12} sm={12} md={10}>
              <Box display="flex" flexDirection="row" width={1}>
                <Paper elevation={0} className={classes.wrapper}>
                  <IconButton onClick={handleSearchFunc}>
                    <Search style={{ color: "#C2CFE0" }} />
                  </IconButton>
                  <SearchInput
                    placeholder="Cari Siswa"
                    name="search"
                    id="search"
                    type="text"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSearchFunc(event);
                      }
                    }}
                    value={controller.filterStatus.search}
                    onChange={(e) =>
                      controller.handleSearchSiswaQuery(e)
                    }
                  />
                </Paper>
              </Box>
            </GridItem>
          </GridContainer>
          <GridContainer mt={4}>
            <GridItem xs={12} sm={12} md={12} mt={2}>
              <Box mt={2}>
                <Typography variant="h5" className={classes.title} gutterBottom>
                  Daftar Siswa
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
                  label={`${controller.displayColumns.length} to ${listColumnOptions.length} column`}
                  options={listColumnOptions}
                  handleChange={(e) =>
                    controller.handleSelectedColumn(e)(controller.dispatch)(
                      ActionType.handleSelectedColumn
                    )
                  }
                  checked={controller.displayColumns}
                />
              </Box>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Box display="flex" justifyContent="flex-end" mb={4} mt={2}>
                <Link to="/dashboard/student-input" style={{
                  textDecoration: 'none',
                  color: '#fff'
                }}>
                  <Button
                    style={{
                      backgroundColor: "#6DB400",
                      color: "#FFFF",
                    }}
                    onClick={(e) => null}
                    icon={<Add />}
                  >
                    <span>Tambah Siswa</span>
                  </Button>
                </Link>
              </Box>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TableDataSiswa
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
                    to={`/dashboard/student-input/${controller.tableIndex}?is_detail=true`}
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
                    to={`/dashboard/student-input/${controller.tableIndex}`}
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
                  <Box className={classes.wrapper_menu} onClick={e => setDialogOpen(true)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </Box>
                </CustomizedMenus>
              </TableDataSiswa>
            </GridItem>
          </GridContainer>
  
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
              Sukses menghapus data siswa {controller.userInfo.school.name}
            </Alert>
          </Snackbar>
          <ModalComponent />
        </GridItem>
      </Box>

    )
}

export default StudentListDashboardPage