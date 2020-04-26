import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: 0,
      },
    },
    input: {
      width: '100%',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: "#F2F2F2",
      border: '1px solid #F2F2F2',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#F2F2F2',
        boxShadow: 'none',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: "100%",
    },
  }),
);


export default function SimpleSelect(props) {
  const classes = useStyles();

  const {data, onChange, name, value, label, async, disabled} = props

  if(async) {
    return (
        <div style={{
          width: '100%'
        }}>
          <FormControl className={classes.formControl}>
            {label && <InputLabel id="demo-simple-select-label black-text">{label}</InputLabel>}
            <Select
              labelId="demo-simple-select-label"
              id={name}
              value={value}
              name={name}
              disabled={disabled}
              onChange={onChange}
              input={<BootstrapInput />}
            >
              {
                  data.map((val, i) => {
                      return(
                      <MenuItem value={val.id} key={i}>{val.name}</MenuItem>
                      )
                  })
              }
            </Select>
          </FormControl>
        </div>
      );
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        {label && <InputLabel id="demo-simple-select-label black-text">{label}</InputLabel>}
        <Select
          labelId="demo-simple-select-label"
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          {
              data.map((val, i) => {
                  return(
                  <MenuItem value={val[0]}  key={i}>{val[1]}</MenuItem>
                  )
              })
          }
        </Select>
      </FormControl>
    </div>
  );
}
