import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      height: 47,
      backgroundColor: "#FFFFFF",
      width: "100%"
    }
  }),
);

const InputSearch = (props: any) => {
    const { onChange, value, onKeyPress, placeholder, style } = props;
    const classes = useStyles();  
    return (
            <OutlinedInput
            className={classes.form}
            onChange={e => onChange(e)}
            id="input-search"
            value={value}
            startAdornment= {
                <InputAdornment position="start">
                    <SearchIcon style={{color: "#C2CFE0"}}/>
                </InputAdornment>
            }
            onKeyPress={event => onKeyPress(event)}
            placeholder={placeholder}
            labelWidth={0}
            style={style}
        />
    )
}

export default InputSearch;