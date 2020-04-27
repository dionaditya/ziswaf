import React, { useRef } from "react";
import { UserRole } from "@/domain/entities/AllOptions";
import { UserInputContext, ActionType } from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import AutoSearch from "@/app/container/components/AutoCompleteSearch";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useToasts } from "react-toast-notifications";
import history from "@/app/infrastructures/misc/BrowserHistory";
import Box from "@material-ui/core/Box";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CustomInput from "@/app/container/commons/CustomInput/CustomInput.tsx";
import InputSearch from "@/app/container/commons/InputSearch";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    labels: {
      fontSize: 14,
      fontWeight: 800,
      color: "#323C47",
    },
    subLabel: {
      fontSize: 12,
      color: "#323C47",
      fontWeight: 600,
    },
    input: {
      height: 5,
    },
  })
);

const errorMessage = {
  passwordWrong:
    "Password harus memiliki 7-16 karakter dan hanya berisi huruf dan angka",
  emptyPassword: "Password tidak boleh kosong",
  emptyUsername: "Usernam tidak boleh kosong",
  wrongUsername: "Username tidak layak digunakan coba lainnya ",
  notMatch: "Password tidak cocok",
};

const SectionInput = () => {
  const classes = useStyles();
  const controller = React.useContext(UserInputContext);
  const [notMatch, setNotMatch] = React.useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm();
  
  console.log('ERRROS', errors)
  const { addToast } = useToasts();
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(ActionType.handleInput);
  };

  const onSubmit = async (data) => {
    console.log('DATA', data)
    if (data.password === data.confirm_password) {
      const res = await controller.handleSubmit(data)(controller.dispatch);
      if (res !== undefined) {
        if (res.status === 200 || res.status === 201) {
          addToast("Data telah tersimpan", { appearance: "success" });
          setTimeout(() => {
            history.push("/dashboard/users");
          }, 2000);
        } else if (res.status === 422) {
          addToast(res.data.message, { appearance: "error" });
        } else if (res.status === 400) {
          addToast(res.data.message, { appearance: "error" });
        } else if (res.status === 500) {
          addToast(
            "Tidak dapat menyimpan / memperbarui user karena gangguan server",
            { appearance: "error" }
          );
        } else {
          addToast("Tidak dapat menyimpan /  memperbarui data ke server", {
            appearance: "error",
          });
        }
      } else {
        addToast(
          "Tidak dapat menyimpan / memperbarui user karena gangguan server, coba kembali",
          { appearance: "error" }
        );
      }
    } else {
      setNotMatch(true);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: window.innerWidth > 959 ? 100 : 0,
        paddingRight: window.innerWidth > 959 ? 100 : 0,
      }}
    >
      <GridContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Box style={{ margin: "20px 0px", width: window.innerWidth > 959 ? "50%" : "100%" }}>
              <AutoSearch
                value={controller.searchUserQuery}
                data={controller.options}
                handleChange={(e) =>
                  controller.handleSearchUserQuery(e)(controller.dispatch)
                }
                onSelect={(e) =>
                  controller.handleOnSelect(e)(controller.dispatch)
                }
              />
            </Box>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box style={{ width: "100%" }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>ID User</span>
                      <CustomInput
                        labelText=""
                        id="iduser"
                        disabled
                        value={controller.inputUserData.id}
                        placeholder="ID User"
                        onChange={(e) => { }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ margin: "30px 0px 5px 0px" }}
                    >
                      <span className={classes.labels}>User Info</span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Nama Personel</span>
                      <CustomInput
                        labelText=""
                        id="name_personel"
                        disabled
                        value={controller.selectedEmployee.name}
                        placeholder="Nama Personel"
                        onChange={(e) => { }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>ID Pegawai</span>
                      <CustomInput
                        labelText=""
                        id="id_pegawai"
                        disabled
                        value={controller.selectedEmployee.employe_id}
                        placeholder="ID Pegawai"
                        onChange={(e) => { }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Surel User</span>
                      <CustomInput
                        labelText=""
                        id="email"
                        disabled
                        value={controller.selectedEmployee.email}
                        placeholder="Surel User"
                        onChange={(e) => { }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Asal Unit</span>
                      <CustomInput
                        labelText=""
                        id="school_name"
                        disabled
                        value={controller.selectedEmployee.school_name}
                        placeholder="Asal Unit"
                        onChange={(e) => { }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Username</span>
                      <TextField
                        id="Username"
                        name="username"
                        variant="outlined"
                        value={controller.inputUserData.username}
                        className={errors && errors.username ? "invalid" : "validate"}
                        inputRef={register({ required: true, pattern: /^[a-z0-9_-]{6,16}$/i })}
                        placeholder="Username"
                        onChange={(e) => handleChange(e)}
                        style={{
                          width: "100%"
                        }}
                        InputProps={
                          { classes: { input: classes.input } }
                        }
                      />
                    </GridItem>
                    {errors &&
                      errors.username &&
                      errors.username.type === "required" && (
                        <p
                          style={{ color: "red", fontSize: "12px", marginLeft: 15 }}
                        >
                          Anda harus mengisi username terlebih dahulu
                        </p>
                      )}
                    {errors &&
                      errors.username &&
                      errors.username.type === "pattern" && (
                        <p
                          style={{ color: "red", fontSize: "12px", marginLeft: 15 }}
                        >
                          Username harus terdiri dari 6 sampai 16 Karakter !
                        </p>
                      )}
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ margin: "20px 0px 5px 0px" }}
                    >
                      <span className={classes.labels}>Password</span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Password User</span>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={controller.inputUserData.password}
                        inputRef={register({ required: true, pattern: /^[a-z0-9_-]{8,16}$/i })}
                        className={errors && errors.password ? "invalid" : "validate"}
                        placeholder="Password User"
                        onChange={(e) => handleChange(e)}
                        style={{
                          width: "100%"
                        }}
                        InputProps={
                          { classes: { input: classes.input } }
                        }
                      />
                      {errors &&
                        errors.password &&
                        errors.password.type === "required" && (
                          <p
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Anda harus mengisi password terlebih dahulu
                        </p>
                        )}
                      {errors &&
                        errors.password &&
                        errors.password.type === "pattern" && (
                          <p
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Password harus terdiri dari 8 sampai 16 Karakter !
                        </p>
                        )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>
                        Password Konfirmasi
                    </span>
                      <TextField
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        variant="outlined"
                        value={controller.inputUserData.confirm_password}
                        inputRef={register({ required: true, pattern: /^[a-z0-9_-]{8,16}$/i, 
                          validate: value =>
                          value === watch('password')
                        })}
                        className={errors && errors.confirm_password ? "invalid" : "validate"}
                        placeholder="Password Konfirmasi"
                        onChange={(e) => handleChange(e)}
                        style={{
                          width: "100%"
                        }}
                        InputProps={
                          { classes: { input: classes.input } }
                        }
                      />
                      {errors &&
                        errors.confirm_password &&
                        errors.confirm_password.type === "required" && (
                          <p
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Anda harus mengisi password terlebih dahulu
                        </p>
                        )}
                      {errors &&
                        errors.confirm_password &&
                        errors.confirm_password.type === "pattern" && (
                          <p
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Password harus terdiri dari 8 sampai 16 Karakter !
                        </p>
                        )}
                        {errors &&
                        errors.confirm_password &&
                        errors.confirm_password.type === "validate" && (
                          <p
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            Password Konfirmasi tidak cocok !
                        </p>
                        )}
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ margin: "20px 0px 5px 0px" }}
                    >
                      <span className={classes.labels}>Role</span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Pilih Role</span>
                      <SimpleSelect
                        onChange={handleChange}
                        value={controller.inputUserData.role}
                        name="role"
                        async={false}
                        data={UserRole}
                        label=""
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <span className={classes.subLabel}>Aktif User</span>
                      <input
                        type="checkbox"
                        name="user_status"
                        checked={controller.inputUserData.user_status === 1}
                        onChange={handleChange}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Button
                color="success"
                disabled={!controller.selectedEmployee.employe_id}
                style={{
                  backgroundColor: "#00923F",
                  fontWeight: 800,
                  marginBottom: 20,
                }}
                type="submit"
                onClick={(e) => null}
              >
                SIMPAN
            </Button>
            </Box>
          </GridItem>
        </form>
      </GridContainer>
    </div>
  );
};

export default SectionInput;
