import React from "react";
import { Input } from "../../../../../components/Input";
import { EducationStatus } from "@/domain/entities/AllOptions";
import {
  StudentListInputContext,
  ActionType,
  initialState,
} from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";
import InlineCSS from "react-inline-css";
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
import moment from "moment";
import idLocale from "date-fns/locale/id";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

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
      color: "#323C47",
      fontWeight: "bold",
    },
  })
);

const errorMessage = {
  empty: "Field ini tidak boleh kosong",
  shouldNumber: "Field hanya dapat diisi angka",
  notPick: "Pilih salah satu terlebih dahulu",
};

const InputDataPendidikanSection = ({ value, setValues }) => {
  const controller = React.useContext(StudentListInputContext);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const classes = useStyles();
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(
      ActionType.handleEducationInfoInputData
    );
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setValues(value + 1);
    }
  };

  const {
    education_status,
    registered_at,
    finished_at,
    punishment_count,
    punishment_start,
    punishment_end,
    juz_kuran_description,
    chapter_kuran_description,
    hadist_description,
    education_description,
  } = controller.education_info;

  const { isDetailSession } = controller;

  const isNullFinishedAt =
    moment(finished_at).format("YYYY-MM-DD") === "0001-01-01";
  const isNullPunishmentStart =
    moment(punishment_start).format("YYYY-MM-DD") === "0001-01-01";
  const isNullPunishmentEnd =
    moment(punishment_end).format("YYYY-MM-DD") === "0001-01-01";

  React.useEffect(() => {
    setEditing(true);
    setValue([
      { education_status: education_status },
      { registered_at: registered_at },
      { finished_at: isNullFinishedAt ? null : finished_at },
      { punishment_count: punishment_count },
      { punishment_start: isNullPunishmentStart ? null : punishment_start },
      { punishment_end: isNullPunishmentEnd ? null : punishment_end },
      { juz_kuran_description: juz_kuran_description },
      { chapter_kuran_description: chapter_kuran_description },
      { hadist_description: hadist_description },
      { education_description: education_description },
    ]);
    setEditing(false);
  }, [value, controller.education_info, controller.isUpdateSession]);

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
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label htmlFor="status" className={classes.label}>
                          Status Pendidikan
                        </label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async={false}
                              isDisabled={isDetailSession}
                              onChange={(value) => {
                                const e = {
                                  target: {
                                    name: "education_status",
                                    value: value[0].value,
                                  },
                                };
                                onChange(e);
                                return value[0].value;
                              }}
                              value={education_status}
                              placeholder="Status Pendidikan"
                              data={EducationStatus}
                              name="education_status"
                              label="Status Pendidikan"
                            />
                          }
                          name="education_status"
                          onChange={(value) => {
                            const e = {
                              target: {
                                name: "education_status",
                                value: value[0].value,
                              },
                            };
                            onChange(e);
                            return value[0].value;
                          }}
                          rules={{ required: true }}
                          control={control}
                          defaultValue={education_status}
                        />
                        {errors &&
                          errors.education_status &&
                          errors.education_status.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPick}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label
                          htmlFor="registered_at"
                          className={classes.label}
                        >
                          Tanggal Masuk
                        </label>
                        <Controller
                          as={
                            <KeyboardDatePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              disabled={isDetailSession}
                              style={{
                                width: "100%",
                              }}
                              className={classes.datepicker}
                              placeholder={
                                registered_at === null
                                  ? "Tanggal Masuk"
                                  : moment(registered_at).toString()
                              }
                              value={
                                registered_at === null
                                  ? null
                                  : moment(registered_at).toDate()
                              }
                              onChange={(date: any) => {
                                const data = {
                                  target: {
                                    name: "registered_at",
                                    value: moment(date).toISOString(),
                                  },
                                };
                                onChange(data);
                              }}
                              name="registered_at"
                              inputRef={register({ required: true })}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          }
                          name="registered_at"
                          rules={{ required: true }}
                          control={control}
                          onChange={(date: any) => {
                            const data = {
                              target: {
                                name: "registered_at",
                                value: moment(date[0]).toISOString(),
                              },
                            };
                            onChange(data);
                            return moment(date[0]).toString();
                          }}
                          defaultValue={
                            registered_at === null
                              ? null
                              : moment(registered_at).toDate()
                          }
                        />
                        {errors &&
                          errors.registered_at &&
                          errors.registered_at.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.empty}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label htmlFor="finished_at" className={classes.label}>
                          Tanggal Keluar
                        </label>
                        <Controller
                              as={
                                <KeyboardDatePicker
                                  autoOk
                                  variant="inline"
                                  inputVariant="outlined"
                                  format="dd/MM/yyyy"
                                  disabled={isDetailSession || education_status === 1}
                                  style={{
                                    width: "100%",
                                  }}
                                  className={classes.datepicker}
                                  placeholder={
                                    finished_at === null || isNullFinishedAt
                                      ? "Tanggal keluar"
                                      : moment(finished_at).toString()
                                  }
                                  value={
                                    finished_at === null || isNullFinishedAt
                                      ? null
                                      : moment(finished_at).toDate()
                                  }
                                  onChange={(date: any) => {
                                    const data = {
                                      target: {
                                        name: "finished_at",
                                        value: moment(date).toISOString(),
                                      },
                                    };
                                    onChange(data);
                                  }}
                                  name="finished_at"
                                  inputRef={register}
                                  InputProps={{
                                    classes: { input: classes.input },
                                  }}
                                />
                              }
                              name="finished_at"
                              control={control}
                              minDate={registered_at}
                              onChange={(date: any) => {
                                const data = {
                                  target: {
                                    name: "finished_at",
                                    value: moment(date[0]).toISOString(),
                                  },
                                };
                                onChange(data);
                                return moment(date[0]).toString();
                              }}
                              defaultValue={
                                finished_at === null || isNullFinishedAt
                                  ? null
                                  : moment(finished_at).toDate()
                              }
                            />
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box
                        className={classes.marginBottom}
                        display="flex"
                        flexDirection="column"
                      >
                        <Typography
                          component="h5"
                          style={{ fontWeight: "bold" }}
                        >
                          Info Skorsing
                        </Typography>
                        <span>
                          <label htmlFor="">Hukuman ke</label>
                          <TextField
                            label=""
                            style={{
                              width: "100%",
                            }}
                            variant="outlined"
                            type="text"
                            disabled={isDetailSession}
                            id={
                              errors &&
                              errors.punishment_count &&
                              errors.punishment_count.type === "required"
                                ? "filled-error-helper-text"
                                : "name"
                            }
                            name="punishment_count"
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
                        </span>
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Mulai Tanggal</label>
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
                                punishment_start === null || isNullPunishmentStart
                                  ? "Mulai Tanggal"
                                  : moment(punishment_start).toString()
                              }
                              value={
                                punishment_start === null || isNullPunishmentStart
                                  ? null
                                  : moment(punishment_start).toDate()
                              }
                              onChange={(date: any) => {
                                const data = {
                                  target: {
                                    name: "punishment_start",
                                    value: moment(date).toISOString(),
                                  },
                                };
                                onChange(data);
                              }}
                              name="punishment_start"
                              format="dd/MM/yyyy"
                              inputRef={register}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          }
                          name="punishment_start"
                          control={control}
                          onChange={(date: any) => {
                            const data = {
                              target: {
                                name: "punishment_start",
                                value: moment(date[0]).toISOString(),
                              },
                            };
                            onChange(data);
                            return moment(date[0]).toString();
                          }}
                          defaultValue={
                            finished_at === null || isNullPunishmentStart
                              ? null
                              : moment(punishment_start).toDate()
                          }
                        />
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Hingga Tanggal</label>
                        <Controller
                            as={
                              <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                disabled={isDetailSession}
                                style={{
                                  width: "100%",
                                }}
                                className={classes.datepicker}
                                placeholder={
                                  punishment_end === null || isNullPunishmentEnd
                                    ? "Hingga Tanggal"
                                    : moment(punishment_end).toString()
                                }
                                value={
                                  punishment_end === null || isNullPunishmentEnd
                                    ? null
                                    : moment(punishment_end).toDate()
                                }
                                onChange={(date: any) => {
                                  const data = {
                                    target: {
                                      name: "punishment_end",
                                      value: moment(date).toISOString(),
                                    },
                                  };
                                  onChange(data);
                                }}
                                name="punishment_end"
                                format="dd/MM/yyyy"
                                minDate={punishment_start}
                                inputRef={register}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            }
                            name="punishment_end"
                            control={control}
                            onChange={(date: any) => {
                              const data = {
                                target: {
                                  name: "punishment_end",
                                  value: moment(date[0]).toISOString(),
                                },
                              };
                              onChange(data);
                              return moment(date[0]).toString();
                            }}
                            defaultValue={
                              finished_at === null || isNullPunishmentEnd
                                ? null
                                : moment(punishment_end).toDate()
                            }
                          />
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>
                          Juz yang telah di hafal
                        </label>
                        <Controller
                          as={
                            <TextField
                              type="text"
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              disabled={isDetailSession}
                              multiline
                              value={juz_kuran_description}
                              placeholder="Juz yang telah di hafal"
                              onChange={onChange}
                              name="juz_kuran_description"
                              rows={4}
                              id="standard-textarea"
                              variant="outlined"
                            />
                          }
                          name="juz_kuran_description"
                          control={control}
                          onChange={(e) => {
                            onChange(e[0]);
                            return e[0].target.value;
                          }}
                          defaultValue=""
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>
                          Surat telah di hafal
                        </label>
                        <Controller
                          as={
                            <TextField
                              type="text"
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              disabled={isDetailSession}
                              multiline
                              value={chapter_kuran_description}
                              placeholder="Surah yang telah di hafal"
                              onChange={onChange}
                              name="chapter_kuran_description"
                              rows={4}
                              id="standard-textarea"
                              variant="outlined"
                            />
                          }
                          name="chapter_kuran_description"
                          control={control}
                          onChange={(e) => {
                            onChange(e[0]);
                            return e[0].target.value;
                          }}
                          defaultValue=""
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>
                          Hadis telah di hafal
                        </label>
                        <Controller
                          as={
                            <TextField
                              type="text"
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              multiline
                              disabled={isDetailSession}
                              value={hadist_description}
                              placeholder="Hadis yang telah di hafal"
                              onChange={onChange}
                              name="hadist_kuran_description"
                              rows={4}
                              id="standard-textarea"
                              variant="outlined"
                            />
                          }
                          name="hadist_description"
                          control={control}
                          onChange={(e) => {
                            onChange(e[0]);
                            return e[0].target.value;
                          }}
                          defaultValue=""
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>
                          Catatan Tambahan
                        </label>
                        <Controller
                          as={
                            <TextField
                              type="text"
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              multiline
                              disabled={isDetailSession}
                              value={education_description}
                              placeholder="catatan tambahan"
                              onChange={onChange}
                              name="education_description"
                              rows={4}
                              id="standard-textarea"
                              variant="outlined"
                            />
                          }
                          name="education_description"
                          control={control}
                          onChange={(e) => {
                            onChange(e[0]);
                            return e[0].target.value;
                          }}
                          defaultValue=""
                        />
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
                          isLoading={loading ? true : false}
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
                          disabled={isDetailSession}
                          isLoading={loading ? true : false}
                          color="primary"
                          type="submit"
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

export default InputDataPendidikanSection;
