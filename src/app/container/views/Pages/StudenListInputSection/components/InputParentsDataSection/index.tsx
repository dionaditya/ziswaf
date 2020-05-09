import React from "react";
import { Input } from "../../../../../components/Input";
import { ParentStatus } from "@/domain/entities/AllOptions";
import {
  ActionType,
  StudentListInputContext,
  initialState,
} from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import InlineCSS from "react-inline-css";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import SimpleSelectWithPlaceholder from "@/app/container/components/SelectWithPlaceholder";
import SimpleSelectWithDisabled from "@/app/container/components/SelectWithDisabled";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { Image } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import idLocale from "date-fns/locale/id";
import InputMask from "react-input-mask";


const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const errorMessage = {
  empty: "Field ini tidak boleh kosong",
  shouldNumber: "Field hanya dapat diisi angka",
  notPick: "Pilih salah satu terlebih dahulu",
  shouldString: "Hanya boleh diisi dengan huruf saja",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image_box: {
      width: 150,
      height: 150,
      border: "2px dashed #202020",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginBottom: 20,
      borderRadius: 10,
      color: "#202020",
    },
    image_preview: {
      backgroundSize: "contain",
      backgroundPosition: "center center",
      border: "2px solid transparent !important",
      width: "150px",
      height: "150px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginBottom: "20px",
      borderRadius: "10px",
      color: "#202020",
    },
    input: {
      height: 10,
    },
    inputTextarea: {
      height: 20,
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    marginBottom4: {
      marginBottom: theme.spacing(8),
    },

    datepicker: {
      height: "50px",
    },
    loadingReset: {
      color: "#00923F",
    },
    label: {
      color: '#323C47',
      fontWeight: 'bold'
    }
  })
);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const InputDataOrangTuaSection = ({ value, setValues }) => {
  const controller = React.useContext(StudentListInputContext);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    father_name,
    place_of_birth_father,
    birth_of_date_father,
    father_occupation,
    father_phone,
    father_status,
    mother_name,
    place_of_birth_mother,
    birth_of_date_mother,
    mother_occupation,
    mother_phone,
    mother_status,
  } = controller.parent_info;

  const { isDetailSession } = controller;

  React.useEffect(() => {
    setEditing(true);
    setValue([
      { father_name: father_name },
      { place_of_birth_father: place_of_birth_father },
      { birth_of_date_father: birth_of_date_father },
      { father_occupation: father_occupation },
      { father_phone: father_phone },
      { father_status: father_status },
      { mother_name: mother_name },
      { place_of_birth_mother: place_of_birth_mother },
      { birth_of_date_mother: birth_of_date_mother },
      { mother_occupation: mother_occupation },
      { mother_phone: mother_phone },
      { mother_status: mother_status },
    ]);
    setEditing(false);
  }, [value, controller.parent_info, controller.isUpdateSession]);

  const onChange = (e) => {
    if (e.target.name === "parent_status_A") {
      const data = {
        target: {
          name: "parent_status",
          value: e.target.checked ? 0 : 1,
        },
      };
      controller.handleInput(data)(controller.dispatch)(
        ActionType.handleParentInfoInputData
      );
    } else if (e.target.name === "parent_status_B") {
      const data = {
        target: {
          name: "parent_status",
          value: e.target.checked ? 1 : 0,
        },
      };
      controller.handleInput(data)(controller.dispatch)(
        ActionType.handleParentInfoInputData
      );
    } else {
      controller.handleInput(e)(controller.dispatch)(
        ActionType.handleParentInfoInputData
      );
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      if(Number(father_phone[4]) !== 0 && Number(father_phone[4] !== 0)) {
        setError(false)
        const res = await controller.handleSubmit(controller)(
          controller.dispatch
        );
        if (res !== undefined) {
          if (res.status === 201 || res.status === 200) {
            addToast("Data siswa telah tersimpan", { appearance: "success" });
            setLoading(false);
            setTimeout(() => {
              history.push("/dashboard/students");
            }, 1000);
          } else if (res.status === 422) {
            addToast(res.data.message, { appearance: "error" });
          } else if (res.status === 400) {
            addToast(res.data.message, { appearance: "error" });
          } else if (res.status === 500) {
            addToast("Tidak dapat menyimpan data karena gangguan server", {
              appearance: "error",
            });
          } else {
            addToast("Tidak dapat menyimpan data ke server", {
              appearance: "error",
            });
          }
        } else {
          setLoading(false);
          addToast("Tidak dapat menyimpan data karena gangguan server", {
            appearance: "error",
          });
        }
      } else {
        setError(true)
        setLoading(false)
      }
     
    }
  };

  if (controller.loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
      >
        <div
          style={{
            height: "100vh",
          }}
        >
          <CircularProgress size={16} className={classes.loadingReset} />
          loading
        </div>
      </Box>
    );
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={idLocale}>
      <ThemeProvider theme={innerTheme}>
        <Box>
          <Paper
            component="div"
            style={{
              minHeight: "100vh",
              height: "100%",
              padding: "10px 30px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box className={classes.marginBottom}>
                    <label className={classes.label}>Status Orang Tua</label>
                    <Box display="flex" flexDirection="row">
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<CircleUnchecked />}
                            checkedIcon={<CircleCheckedFilled />}
                            checked={
                              controller.parent_info.parent_status === 0
                                ? true
                                : false
                            }
                            color="primary"
                            disabled={isDetailSession}
                            name="parent_status_A"
                            onChange={onChange}
                          />
                        }
                        label="Orang Tua"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<CircleUnchecked />}
                            color="primary"
                            checkedIcon={<CircleCheckedFilled />}
                            disabled={isDetailSession}
                            checked={
                              controller.parent_info.parent_status === 1
                                ? true
                                : false
                            }
                            onChange={onChange}
                            name="parent_status_B"
                          />
                        }
                        label="Wali"
                      />
                    </Box>
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Nama Ayah</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Nama Ayah"
                          id={
                            errors &&
                            errors.father_name &&
                            errors.father_name.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="father_name"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.father_name &&
                          errors.father_name.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tempat Lahir</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Tempat Lahir"
                          id={
                            errors &&
                            errors.place_of_birth_father &&
                            errors.place_of_birth_father.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="place_of_birth_father"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register}
                        />
                    
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tanggal Lahir</label>
                        <Controller
                          as={
                            <KeyboardDatePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              style={{
                                width: "100%",
                              }}
                              format="dd/MM/yyyy"
                              disabled={isDetailSession}
                              className={classes.datepicker}
                              placeholder={
                                birth_of_date_father === null
                                  ? "Tanggal Lahir"
                                  : moment(birth_of_date_father).toString()
                              }
                              value={
                                birth_of_date_father === null
                                  ? null
                                  : moment(birth_of_date_father).toDate()
                              }
                              onChange={(date: any) => {
                                const data = {
                                  target: {
                                    name: "birth_of_date_father",
                                    value: moment(date).toISOString(),
                                  },
                                };
                                onChange(data);
                              }}
                              name="birth_of_date_father"
                              inputRef={register({ required: true })}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          }
                          name="birth_of_date_father"
                          control={control}
                          onChange={(date: any) => {
                            const data = {
                              target: {
                                name: "birth_of_date_father",
                                value: moment(date[0]).toISOString(),
                              },
                            };
                            onChange(data);
                            return moment(date[0]).toString();
                          }}
                          defaultValue={
                            birth_of_date_father === null
                              ? null
                              : moment(birth_of_date_father).toDate()
                          }
                        />
                        {errors &&
                          errors.birth_of_date_father &&
                          errors.birth_of_date_father.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Pekerjaan Ayah</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          disabled={isDetailSession}
                          type="text"
                          id={
                            errors &&
                            errors.father_occupation &&
                            errors.father_occupation.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="father_occupation"
                          placeholder="Pekerjaan Ayah"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.father_occupation &&
                          errors.father_occupation.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>No HP Ayah</label>
                        <InputMask
                        mask="+62 999 999 999 99"
                        value={father_phone}
                        maskChar=" "
                        disabled={isDetailSession}
                        onChange={onChange}
                      >
                        {() => (
                          <TextField
                            style={{
                              width: "100%",
                            }}
                            variant="outlined"
                            name="father_phone"
                            id="phone"
                            disabled={isDetailSession}
                            placeholder="Contoh: +628567XXXXXXX"
                            InputProps={
                              editing
                                ? {
                                    classes: { input: classes.input },
                                    endAdornment: (
                                      <CircularProgress
                                        className={classes.loadingReset}
                                        size={14}
                                      />
                                    ),
                                  }
                                : { classes: { input: classes.input } }
                            }
                            inputRef={register}
                          />
                        )}
                      </InputMask>
                    
                      {error && Number(father_phone[4]) === 0 && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          No Handphone tidak valid. Silahkan coba kembali
                        </p>
                      )}
                        {/* d */}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Status Ayah</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async={false}
                              isDisabled={isDetailSession}
                              onChange={(value) => {
                                const e = {
                                  target: {
                                    name: "father_status",
                                    value: value[0].value,
                                  },
                                };
                                onChange(e);
                                return value[0].value;
                              }}
                              value={father_status}
                              placeholder="Status Ayah"
                              data={ParentStatus}
                              name="father_status"
                              label="Status Ayah"
                            />
                          }
                          name="father_status"
                          onChange={(value) => {
                            const e = {
                              target: {
                                name: "father_status",
                                value: value[0].value,
                              },
                            };
                            onChange(e);
                            return value[0].value;
                          }}
                          rules={{ required: true }}
                          control={control}
                          defaultValue={father_status}
                        />
                        {errors &&
                          errors.father_status &&
                          errors.father_status.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPick}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Nama Ibu</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Nama Ibu"
                          id={
                            errors &&
                            errors.mother_name &&
                            errors.mother_name.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="mother_name"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.mother_name &&
                          errors.mother_name.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tempat Lahir</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Tempat Lahir"
                          id={
                            errors &&
                            errors.place_of_birth_mother &&
                            errors.place_of_birth_mother.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="place_of_birth_mother"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register}
                        />
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tanggal Lahir</label>
                        <Controller
                          as={
                            <KeyboardDatePicker
                              autoOk
                              variant="inline"
                              disabled={isDetailSession}
                              inputVariant="outlined"
                              style={{
                                width: "100%",
                              }}
                              className={classes.datepicker}
                              placeholder={
                                birth_of_date_mother === null
                                  ? "Tanggal Lahir"
                                  : moment(birth_of_date_mother).toString()
                              }
                              value={
                                birth_of_date_mother === null
                                  ? null
                                  : moment(birth_of_date_mother).toDate()
                              }
                              onChange={(date: any) => {
                                const data = {
                                  target: {
                                    name: "birth_of_date_mother",
                                    value: moment(date).toISOString(),
                                  },
                                };
                                onChange(data);
                              }}
                              name="birth_of_date_mother"
                              format="dd/MM/yyyy"
                              inputRef={register({ required: true })}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          }
                          name="birth_of_date_mother"
                          control={control}
                          onChange={(date: any) => {
                            const data = {
                              target: {
                                name: "birth_of_date_mother",
                                value: moment(date[0]).toISOString(),
                              },
                            };
                            onChange(data);
                            return moment(date[0]).toString();
                          }}
                          defaultValue={
                            birth_of_date_mother === null
                              ? null
                              : moment(birth_of_date_mother).toDate()
                          }
                        />
                        {errors &&
                          errors.birth_of_date_mother &&
                          errors.birth_of_date_mother.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Pekerjaan Ibu</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Pekerjaan Ibu"
                          id={
                            errors &&
                            errors.mother_occupation &&
                            errors.mother_occupation.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="mother_occupation"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : { classes: { input: classes.input } }
                          }
                          onChange={onChange}
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.mother_occupation &&
                          errors.mother_occupation.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>No HP Ibu</label>
                        <InputMask
                        mask="+62 999 999 999 99"
                        value={mother_phone}
                        maskChar=" "
                        disabled={isDetailSession}
                        onChange={onChange}
                      >
                        {() => (
                          <TextField
                            style={{
                              width: "100%",
                            }}
                            variant="outlined"
                            name="mother_phone"
                            id="phone"
                            disabled={isDetailSession}
                            placeholder="Contoh: +628567XXXXXXX"
                            InputProps={
                              editing
                                ? {
                                    classes: { input: classes.input },
                                    endAdornment: (
                                      <CircularProgress
                                        className={classes.loadingReset}
                                        size={14}
                                      />
                                    ),
                                  }
                                : { classes: { input: classes.input } }
                            }
                            inputRef={register}
                          />
                        )}
                      </InputMask>
                    
                      {error && Number(mother_phone[4]) === 0 && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          No Handphone tidak valid. Silahkan coba kembali
                        </p>
                      )}
                      
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Status Ibu</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async={false}
                              isDisabled={isDetailSession}
                              onChange={(value) => {
                                const e = {
                                  target: {
                                    name: "mother_status",
                                    value: value[0].value,
                                  },
                                };
                                onChange(e);
                                return value[0].value;
                              }}
                              value={father_status}
                              placeholder="Status Ibu"
                              data={ParentStatus}
                              name="mother_status"
                          
                              label="Status Ibu"
                            />
                          }
                          name="mother_status"
                          onChange={(value) => {
                            const e = {
                              target: {
                                name: "mother_status",
                                value: value[0].value,
                              },
                            };
                            onChange(e);
                            return value[0].value;
                          }}
                          rules={{ required: true }}
                          control={control}
                          defaultValue={mother_status}
                        />
                        {errors &&
                          errors.mother_status &&
                          errors.mother_status.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPick}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={3}>
                      <Box
                        style={{
                          marginTop: 30,
                        }}
                      >
                        <Button
                          style={{
                            color: `${green[500]}`,
                            marginTop: "20px",
                            border: `2px solid ${green[500]}`,
                          }}
                          loading={loading}
                          disabled={loading}
                          color="transparent"
                          onClick={(e) => setValues(value - 1)}
                        >
                          Kembali
                        </Button>
                      </Box>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <Box
                        style={{
                          marginTop: 30,
                        }}
                      >
                        <Button
                          style={{
                            color: "#fff",
                            marginRight: "22em",
                            marginTop: "20px",
                          }}
                          isLoading={loading}
                          color="primary"
                          type="submit"
                          disabled={isDetailSession}
                          onClick={(e) => null}
                        >
                          Submit Data
                        </Button>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default InputDataOrangTuaSection;
