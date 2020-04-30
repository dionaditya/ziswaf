/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useMemo } from "react";
import TableDataSiswa from "@/app/container/components/DataTable";
import ModalFilters, {
  ModalFooter,
  ModalBody,
} from "@/app/container/components/ModalFilters";
import { Link } from "react-router-dom";
import { Input } from "@/app/container/components";
import { UserRole } from "@/domain/entities/AllOptions";
import { UserListContext, ActionType } from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import moment from "moment";
import CustomizedMenus from "@/app/container/components/MenuDropdown";
import DeleteIcon from "@material-ui/icons/Delete";
import DetailIcon from "@material-ui/icons/Details";
import PeopleIcon from "@material-ui/icons/People";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DialogDelete from "@/app/container/components/DialogDelete";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import _ from "lodash";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useToasts } from "react-toast-notifications";
import history from "@/app/infrastructures/misc/BrowserHistory";
import TextField from "@material-ui/core/TextField";

import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputSearch from "@/app/container/commons/InputSearch";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import ModalFilterUser from "../ModalFilter";
import ModalChangePassword from "../ModalChangePassword";
import SearchInput from '@/app/container/commons/SearchInput';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxAddContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    wrapper_menu: {
      display: "flex",
      flexDirection: 'row',
      minWidth: "100%",
    },
  })
);

/**
 * Styles
 */
const localStyle = {
  filterTytle: {
    marginBottom: -10,
    fontSize: 14,
    fontWeight: 800,
    fontFamily: "roboto",
  },
  changePasswordTitle: { fontSize: 14, fontWeight: 800, color: "#323C47" },
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HalamanDaftarUserDashboard = () => {
  const classes = useStyles();
  const controller = useContext(UserListContext);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertSucess, setSuccess] = React.useState(false);
  const [modalChangeStatus, setModalChangeStatus] = React.useState("change"); // change = Change Password, reset = Reset Password

  const { register, handleSubmit, errors } = useForm();
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
    showOldPassword: false,
  });
  const { addToast } = useToasts();
  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(ActionType.handleInput);
  };

  const onClickChangePassword = (e) => {
    setModalChangeStatus("change");
    controller.handleModalChangePassword(e)(controller.dispatch)(
      ActionType.handleModalChangePassword
    );
  };

  const onClickFilters = (e) => {
    controller.handleModalFilters(e)(controller.dispatch)(
      ActionType.handleModalFilters
    );
  };

  const handleChangePassowordInput = (e) => {
    controller.handleInputChangePassword(e)(controller.dispatch)(
      ActionType.handleInputChangePassword
    );
  };

  const handleSearch = (e) => {
    controller.handleSearch(e)(controller.dispatch)(
      ActionType.handleSearchUser
    );
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

  const onSubmit = async (data, type) => {
    console.log("data", data)
    const res = await controller.handleCTAChnagePassword(
      data,
      type
    )(controller.dispatch)(ActionType.handleCTAChangePassword);
    if (res !== undefined) {
      if (res.status === 200) {
        addToast("Ganti password user berhasil ", { appearance: "success" });
      } else if (res.status === 422) {
        addToast(res.data.message, { appearance: "error" });
      } else if (res.status === 400) {
        addToast(res.data.message, { appearance: "error" });
      } else if (res.status === 500) {
        addToast("Tidak dapat menyimpan password baru karena gangguan server", {
          appearance: "error",
        });
      }
    } else {
      addToast(
        "Tidak dapat menyimpan user karena gangguan server, coba kembali",
        { appearance: "error" }
      );
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleClickShowOldPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showOldPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getValueDate = (selectedDate) => {
    const currentDate = moment(new Date()).format("DD/MM/YYYY");
    const selectedTime = moment(selectedDate).format("YYY-MM-DD");
    const filteredDate = !selectedDate ? currentDate : selectedTime;
    return filteredDate;
  };

  const handleDetail = (id) => {
    history.push(`users-input/${id}`);
  };

  const [name, setName] = React.useState("");

  const handleChangess = (event) => {
    event.persist();
    setName((prevState) => event.target.value);
  };

  return (
    <>
      <ModalFilterUser controller={controller} actionType={ActionType} handleChange={(e) => handleChange(e)} />
      <ModalChangePassword
        onSaveData={(data, type) => onSubmit(data, type)}
        onClose={onClickChangePassword}
        controller={controller}
        onChangeStatus={(e) => setModalChangeStatus("reset")}
        onChange={handleChangePassowordInput} />
      <DialogDelete
        open={dialogOpen}
        handleDelete={handleDeleteData}
        handleClose={e => setDialogOpen(false)} />
      <Snackbar open={alertSucess} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sukses menghapus data user
            </Alert>
      </Snackbar>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer display="flex" alignItems="center">
            <GridItem xs={5} sm={5} md={2}>
              <Button
                style={{
                  color: "#3A3B3F",
                  height: 45,
                }}
                color="white"
                onClick={(e) => onClickFilters(e)}
              >
                <i className="material-icons" style={{ fontSize: 20 }}>
                  filter_list
                    </i>{" "}
                <span
                  style={{
                    color: "#3A3B3F",
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                >
                  FILTER
                    </span>
              </Button>
            </GridItem>
            <GridItem xs={7} sm={7} md={10}>
              <Box style={{ width: "100%" }}>
                <IconButton>
                  <Search style={{ color: "#C2CFE0" }} />
                </IconButton>
                <SearchInput
                  placeholder="Cari Personel"
                  name="search"
                  id="search"
                  type="text"
                  value={controller.filterStatus.search}
                  onChange={(e) => {
                    controller.handleSearchUserQuery(e)(controller.dispatch)(
                      ActionType.handleSearchUser
                    );
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      controller.handleSearch("search")(controller.dispatch)(
                        ActionType.handleSearchUser
                      );
                    }
                  }}
                />
              </Box>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Box mt={3}>
            <span
              style={{ fontSize: 24, fontWeight: "bold", color: "#3A3B3F" }}
            >
              Daftar User
              </span>
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Box className={classes.boxAddContainer}>
            <Button
              style={{
                backgroundColor: "#6DB400",
                color: "#FFFFFF",
                height: 42,
              }}
              color="success"
              onClick={(e) => history.push("users-input")}
            >
              <i className="material-icons" style={{ fontSize: 14 }}>
                add
                </i>{" "}
                Tambah User
              </Button>
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Box style={{ marginTop: 20, marginBottom: 20 }}>
            <TableDataSiswa
              options={controller.optionsTable}
              loading={controller.loading}
              data={controller.data || []}
              column={controller.displayColumns}
            >
              <CustomizedMenus>
                <Box
                  className={classes.wrapper_menu}
                  onClick={() => handleDetail(controller.tabIndex)}
                >
                  <ListItemIcon>
                    <DetailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Detail" />
                </Box>
                <Box
                  className={classes.wrapper_menu}
                  onClick={(e) =>
                    controller.handleModalChangePassword(e)(
                      controller.dispatch
                    )(ActionType.handleModalChangePassword)
                  }
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Ganti password" />
                </Box>
                <Box
                  className={classes.wrapper_menu}
                  onClick={(e) => controller.handleDeactivated(e)}
                >
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Deaktifkan" />
                </Box>
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
          </Box>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default HalamanDaftarUserDashboard;
