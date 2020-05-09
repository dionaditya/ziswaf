import React from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/app/container/components/index";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { MadrasahInfoContext } from "./Controller";
import { useForm, Controller } from "react-hook-form";
import TableDataSiswa from "@/app/container/components/DataTable";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DialogDelete from "@/app/container/components/DialogDelete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Add } from "@material-ui/icons";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import history from "@/app/infrastructures/misc/BrowserHistory";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputSearch from "@/app/container/commons/InputSearch";
import { Sort } from "@material-ui/icons";
import { Typography, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

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
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      height: "60px",
      width: "60px",
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    rectangle: {
      position: "relative",
      width: 270,
      overflow: "hidden",
      background: "#00923F",
      boxShadow: "0px 4px 25px rgba(184, 184, 184, 0.1)",
      borderRadius: 4,
    },
    eclipse: {
      position: "absolute",
      width: 339,
      height: 339,
      left: -10,
      top: 110,
      background: "#00A247",
      borderRadius: "50%",
    },
    eclipse2: {
      position: "absolute",
      width: 247,
      height: 247,
      right: 160,
      top: 0,
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "50%",
    },
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SchoolInfo = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const controller = React.useContext(MadrasahInfoContext);
  const { register, handleSubmit, watch, control } = useForm();
  const [alertSucess, setSuccess] = React.useState(false);
  const { id } = useParams();
  const classes = useStyles();

  const onSubmit = (data) => {
    controller.handleSearch(data.employee_name);
  };

  const handleAdd = () => {
    history.push(`/dashboard/personel-input?school_id=${id}`);
  };

  const handleDeleteData = (e) => {
    const isSuccess = controller.handleDelete(e);
    if (isSuccess) {
      setSuccess(true);
      setDialogOpen(false);
    }
  };

  const handleDeleteStudentData = (e) => {
    const isSuccess = controller.handleDeleteStudent(e);
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

  const onPressEnter = (e) => {
    const query = watch();
    if (e.key === "Enter") {
      controller.handleSearch(query.employee_query);
    }
  };

  const onSearchStudent = (e) => {
    const query = watch();
    if (e.key === "Enter") {
      controller.handleSearchStudent(query.student_query);
    }
  };

  return (
    <Box>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      color: "#00923F",
                      fontSize: "16px",
                      fontWeight: 800,
                    }}
                  >
                    Info Ma'had
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Paper
                    elevation={0}
                    style={{
                      padding: "20px 20px 40px 20px",
                    }}
                  >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              NAMA MA'HAD
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.name || "-"}
                            </p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              ALAMAT MA'HAD
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.address || "-"}
                            </p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              DIBUKA TAHUN
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.opened_at || "-"}
                            </p>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              KOTA / KABUPATEN
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.regency_name || "-"}
                            </p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              PROVINSI
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.province_name || "-"}
                            </p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              NO TELP
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {`+62${controller.data.phone}` || "-"}
                            </p>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <span
                              className="font-weight-700"
                              style={{
                                color: "#828282",
                                fontSize: "12px",
                              }}
                            >
                              SUREL
                            </span>
                            <p
                              className="black-text"
                              style={{ marginTop: "0px" }}
                            >
                              {controller.data.email || "-"}
                            </p>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </Paper>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span
                        style={{
                          color: "#00923F",
                          fontSize: "16px",
                          marginBottom: "50px",
                          fontWeight: 800,
                        }}
                      >
                        Pimpinan Ma'had
                      </span>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "25px" }}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        style={{
                          minHeight: "100px",
                          padding: "10px 5px",
                          backgroundColor: "#00923F",
                          borderRadius: 4,
                        }}
                      >
                        <Box display="flex" style={{ width: "60px", marginRight: 20, marginLeft: 10 }}>
                          {controller.data.head_master.image !== null ? (
                            <img
                              src={controller.data.head_master.image || "-"}
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                backgroundColor: "#FFFFFF",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                backgroundColor: "#FFFFFF",
                              }}
                            />
                          )}
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {controller.data.head_master.name || "-"}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              marginTop: "5vh",
                              color: "#ffffff",
                            }}
                          >
                            {controller.data.head_master.phone || "-"}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              marginTop: "0px",
                              color: "#ffffff",
                            }}
                          >
                            {controller.data.head_master.email || "-"}
                          </span>
                        </Box>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span
                        style={{
                          color: "#00923F",
                          fontSize: "16px",
                          fontWeight: 800,
                        }}
                      >
                        Info Tambahan
                      </span>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "25px" }}
                    >
                      <Box
                        style={{
                          padding: "10px",
                          minHeight: "100px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: 4,
                        }}
                      >
                        <span style={{ color: "#6A7088", fontSize: "14px" }}>
                          {controller.data.description || "-"}
                        </span>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={3}>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            marginBottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                            height: "50px",
                            alignIteems: "center",
                          }}
                        >
                          <span style={{ color: "#6A7088", fontSize: "14px" }}>
                            Jumlah Personel
                          </span>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                            bottom: "10px",
                          }}
                        >
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              {controller.data.report_school.total_employee}
                            </span>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            marginBottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                            height: "50px",
                          }}
                        >
                          <span style={{ color: "#6A7088", fontSize: "14px" }}>
                            Jumlah Pengajar
                          </span>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                            bottom: "10px",
                          }}
                        >
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              {controller.data.report_school.total_teacher}
                            </span>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            marginBottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                            height: "50px",
                          }}
                        >
                          <span style={{ color: "#6A7088", fontSize: "14px" }}>
                            Jumlah Tenaga Sosial
                          </span>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            bottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              {
                                controller.data.report_school
                                  .total_social_employee
                              }
                            </span>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            marginBottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                            height: "50px",
                          }}
                        >
                          <span style={{ color: "#6A7088", fontSize: "14px" }}>
                            Jumlah Siswa Ma'had
                          </span>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            bottom: "10px",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <span
                              style={{ fontWeight: "bold", fontSize: "30px" }}
                            >
                              {controller.data.report_school.total_student}
                            </span>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginTop: "80px",
              }}
            >
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Typography
                        component="h4"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.5em",
                          color: "#323C47",
                          marginBottom: "20px",
                        }}
                      >
                        Daftar Personel Ma'had
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Controller
                        as={
                          <InputSearch
                            id="employee_query"
                            name="employee_query"
                            type="text"
                            onKeyPress={(event) => {
                              onPressEnter(event);
                            }}
                            placeholder="Masukkan Nama Pegawai"
                          />
                        }
                        name="employee_query"
                        control={control}
                        onKeyPress={(event) => {
                          onPressEnter(event);
                          // onPressEnter(event)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          style={{
                            backgroundColor: "#6DB400",
                            color: "#FFFFFF",
                          }}
                          color="success"
                          onClick={(e) => handleAdd()}
                        >
                          <Add /> Tambah Personel
                        </Button>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TableDataSiswa
                    options={controller.optionsTable}
                    loading={controller.loading}
                    data={controller.employee}
                    column={controller.displayColumn}
                    // page={controller.filterStatus.paging.page}
                    // count={controller.filterStatus.paging.limit}
                    // handleSort={controller.handleSort}
                    // handleChangesRowsPerPage={controller.handleChangesRowsPerPage}
                  >
                    <CustomizedMenus>
                      <Link
                        to={`/dashboard/info-personel?detail=${controller.tableIndex}`}
                        style={{
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        <Box className={classes.wrapper_menu}>
                          <ListItemIcon>
                            <Sort fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Detail" />
                        </Box>
                      </Link>
                      <Link
                        to={`/dashboard/personel-input/${controller.tableIndex}`}
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
                  </TableDataSiswa>
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
                      Success menghapus data personel ma'had
                    </Alert>
                  </Snackbar>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              style={{
                marginTop: "80px",
              }}
            >
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Typography
                        component="h4"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.5em",
                          color: "#323C47",
                          marginBottom: "20px",
                        }}
                      >
                        Daftar Siswa
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Controller
                        as={
                          <InputSearch
                            id="student_query"
                            name="student_query"
                            type="text"
                            onKeyPress={(event) => {
                              onSearchStudent(event);
                            }}
                            placeholder="Masukkan Nama Siswa"
                          />
                        }
                        name="student_query"
                        control={control}
                        onKeyPress={(event) => {
                          onSearchStudent(event);
                          // onPressEnter(event)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <Link
                          to={`/dashboard/student-input?school_id=${id}`}
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#6DB400",
                              color: "#FFFFFF",
                            }}
                            color="success"
                            onClick={(e) => null}
                          >
                            <Add /> Tambah Siswa
                          </Button>
                        </Link>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TableDataSiswa
                    options={controller.optionsStudentDataTable}
                    loading={controller.loading}
                    data={controller.students}
                    column={controller.displayColumnOfStudentData}
                    // page={controller.filterStatus.paging.page}
                    // count={controller.filterStatus.paging.limit}
                    // handleSort={controller.handleSort}
                    // handleChangesRowsPerPage={controller.handleChangesRowsPerPage}
                  >
                    <CustomizedMenus>
                      <Link
                        to={`/dashboard/student-input/${controller.tableIndexOfStudentData}?is_detail=true`}
                        style={{
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        <Box className={classes.wrapper_menu}>
                          <ListItemIcon>
                            <Sort fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Detail" />
                        </Box>
                      </Link>
                      <Link
                        to={`/dashboard/student-input/${controller.tableIndexOfStudentData}`}
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
                  </TableDataSiswa>
                  <DialogDelete
                    open={dialogOpen}
                    handleDelete={handleDeleteStudentData}
                    handleClose={(e) => setDialogOpen(false)}
                  />
                  <Snackbar
                    open={alertSucess}
                    autoHideDuration={4000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Success menghapus data siswa
                    </Alert>
                  </Snackbar>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default SchoolInfo;
