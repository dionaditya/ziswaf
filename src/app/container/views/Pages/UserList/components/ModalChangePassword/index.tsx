import React from "react";
import Modal from "@/app/container/commons/Modal/index.js";
import Box from "@material-ui/core/Box";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CustomInput from "@/app/container/commons/CustomInput/CustomInput.tsx";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    labels: {
      fontSize: 14,
      fontWeight: 800,
      marginBottom: 15,
      color: "#757575",
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
  })
);

const ModalChangePassword: React.FC<{
  onSaveData;
  controller;
  onChange;
  onClose;
  onChangeStatus;
}> = ({ controller, onChange, onClose, onSaveData }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [changeStatus, setChangeStatus] = React.useState("change"); // change = Change Password, reset = Reset Password

  const handleModalClose = (e) => {
    setChangeStatus("change")
    onClose();
  };

  const submitData = () => {
    const { old_password, new_password, confirm_password } = controller.changePasswordInput
    const data = {
        password: old_password,
        new_password: new_password,
        confirm_password: confirm_password
    }
    onSaveData(data, changeStatus)
    setChangeStatus("change")
  }

  const titelModal =
    changeStatus !== "reset" ? "Ganti Password" : "Reset Password";

  return (
    <>
      <Modal
        size="xs"
        isOpen={controller.statusModalChangePassword}
        title={titelModal}
        onHandle={(e) => handleModalClose(e)}
      >
        <GridContainer style={{ padding: "10px 20px" }}>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              {changeStatus !== "reset" && (
                <Button
                  color="success"
                  style={{ backgroundColor: "#6DB400", fontWeight: 800 }}
                  onClick={(e) => setChangeStatus("reset")}
                >
                  RESET PASSWORD
                </Button>
              )}
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <span className={classes.labels}>Nama User</span>
            <CustomInput
              labelText=""
              id="Username"
              disabled
              value={controller.selectedUser["username"]}
              onChange={(e) => {}}
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <span className={classes.labels}>
              {changeStatus === "reset"
                ? "Password Administrator"
                : "Password Lama"}
            </span>
            <CustomInput
              labelText=""
              id="old_password"
              name="old_password"
              value={controller.changePasswordInput.old_password}
              onChange={(e) => onChange(e)}
              className={errors && errors.password ? "invalid" : "validate"}
              ref={register({ required: true })}
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{ marginBottom: 20, marginTop: 40 }}
          >
            <span className={classes.labels}>Password Baru</span>
            <CustomInput
              labelText=""
              id="new_password"
              name="new_password"
              value={controller.changePasswordInput.new_password}
              onChange={(e) => onChange(e)}
              className={errors && errors.password ? "invalid" : "validate"}
              ref={register({ required: true })}
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <span className={classes.labels}>Konfirmasi Password Baru</span>
            <CustomInput
              labelText=""
              id="confirm_password"
              name="confirm_password"
              value={controller.changePasswordInput.confirm_password}
              onChange={(e) => onChange(e)}
              className={errors && errors.password ? "invalid" : "validate"}
              ref={register({ required: true })}
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer style={{ marginTop: 20 }}>
              <GridItem xs={12} sm={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    color="transparent"
                    style={{ color: "#00923F", fontWeight: 800 }}
                    onClick={(e) => handleModalClose(e)}
                  >
                    BATAL
                  </Button>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    color="success"
                    style={{ backgroundColor: "#00923F", fontWeight: 800 }}
                    onClick={(e) => submitData()}
                  >
                    SIMPAN
                  </Button>
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
