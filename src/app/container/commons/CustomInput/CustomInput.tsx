import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  defaultFont
} from "@/app/container/assets/jss/material-dashboard-react.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      "&:before": {
        backgroundColor: "transparent !important"
      }
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: grayColor[0] + " !important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: primaryColor[0]
      }
    },
    underlineError: {
      "&:after": {
        borderColor: dangerColor[0]
      }
    },
    underlineSuccess: {
      "&:after": {
        borderColor: successColor[0]
      }
    },
    labelRoot: {
      ...defaultFont,
      color: grayColor[1] + " !important",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset"
    },
    labelRootError: {
      color: dangerColor[0]
    },
    labelRootSuccess: {
      color: successColor[0]
    },
    feedback: {
      position: "absolute",
      top: "18px",
      right: "0",
      zIndex: 2,
      display: "block",
      width: "24px",
      height: "24px",
      textAlign: "center",
      pointerEvents: "none"
    },
    marginTop: {
      marginTop: "2px"
    },
    formControl: {}
  }),
);

const CustomInput = (props: any) => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    type,
    labelProps,
    inputProps,
    error,
    success,
    value,
    onChange,
    disabled,
    name,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]:
    
    
    
    
    
    
    
     error,
    [" " + classes.labelRootSuccess]: success && !error
  });

  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <TextField
        id={id}
        value={value}
        name={name}
        type={type}
        variant="outlined"
        onChange={e => onChange(e)}
        size="small"
        style={{backgroundColor: disabled ? "#F2F2F2" : "#FFFFFF", margin: "5px 0px"}}
        {...inputProps}
        {...props}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

export default CustomInput;
