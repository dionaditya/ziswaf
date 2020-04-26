import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Dateicons from "@material-ui/icons/ArrowDownward";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const CustomDateTimePicker = props => {
  const {
    openTo,
    views,
    handleDateChange,
    format,
    selectedDate = new Date()
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
  );
};

export default CustomDateTimePicker;
