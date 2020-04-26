import React from "react";
import { UserRole } from "@/domain/entities/AllOptions";
import { UserInputContext, ActionType } from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import AutoSearch from "@/app/container/components/AutoCompleteSearch";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  const { addToast } = useToasts();

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(ActionType.handleInput);
  };

  const onSubmit = async (data) => {
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
                      onChange={(e) => {}}
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
                      onChange={(e) => {}}
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
                      onChange={(e) => {}}
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
                      onChange={(e) => {}}
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
                      onChange={(e) => {}}
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
                    <CustomInput
                      labelText=""
                      id="Username"
                      name="username"
                      value={controller.inputUserData.username}
                      className={errors && errors.username ? "invalid" : "validate"}
                      ref={register({ required: true, pattern: /^[a-z0-9_-]{3,16}$/i })}
                      placeholder="Username"
                      onChange={(e) => handleChange(e)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
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
                    <CustomInput
                      labelText=""
                      id="password"
                      name="password"
                      type="password"
                      value={controller.inputUserData.password}
                      ref={register({ required: true })}
                      className={errors && errors.password ? "invalid" : "validate"}
                      placeholder="Password User"
                      onChange={(e) => handleChange(e)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <span className={classes.subLabel}>
                      Password Konfirmasi
                    </span>
                    <CustomInput
                      labelText=""
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      value={controller.inputUserData.confirm_password}
                      ref={register({ required: true })}
                      className={errors && errors.confirm_password ? "invalid" : "validate"}
                      placeholder="Password Konfirmasi"
                      onChange={(e) => handleChange(e)}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
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
              style={{
                backgroundColor: "#00923F",
                fontWeight: 800,
                marginBottom: 20,
              }}
              type="submit"
              onClick={onSubmit}
            >
              SIMPAN
            </Button>
          </Box>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default SectionInput;
