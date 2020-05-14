import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import idLocale from "date-fns/locale/id";
import DateFnsUtils from "@date-io/date-fns";
import Dateicons from "@material-ui/icons/ArrowDownward";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500]
    }
  }
});

const CustomDateTimePicker = props => {
  const {
    openTo,
    views,
    handleDateChange,
    format,
    selectedDate = new Date()
  } = props;

  return (
    <ThemeProvider theme={innerTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={idLocale}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            animateYearScrolling
            variant="filled"
            format={format}
            id="date-picker-inline"
            label=""
            value={selectedDate}
            rightArrowIcon={<Dateicons />}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            {...props}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default CustomDateTimePicker;
