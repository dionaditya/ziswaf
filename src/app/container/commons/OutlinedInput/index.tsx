import React from 'react'
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      height: 40,
    },
    formDisable: {
        backgroundColor: "#F2F2F2"
    }
  }),
);

const OutlinedTextInput = (props: any) => {
    const classes = useStyles();  
    const { value, onChange, adornment, disabled } = props;
    const form = classNames({
        [classes.formDisable]: disabled,
        [classes.form]: true
      });
    return (
        <OutlinedInput
            {...props}
            id="outlined-adornment-percentage"
            value={value}
            className={form}
            onChange={(e) => onChange(e.target.value)}
            endAdornment={<InputAdornment position="end">{adornment}</InputAdornment>}
            aria-describedby="outlined-percentage-helper-text"
            inputProps={{
                'aria-label': 'percentage',
            }}
            labelWidth={0}
        />
    )
}

export default OutlinedTextInput;