import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SimpleSelectWithPlaceholder({ data, onChange, name, value, label, async, placeholder }) {
  if (async) {
    return (
      <div style={{
        width: '100%'
      }}>
        <FormControl style={{ minWidth: '100%', margin: '10px 0px' }} >
          <InputLabel id="demo-simple-select-label black-text">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={name}
            value={value}
            name={name}
            onChange={onChange}
          >
            <option value="none" disabled>
              {placeholder}
            </option>
            {
              data.map((val, i) => {
                return (
                  <MenuItem value={val.id}>{val.name}</MenuItem>
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
      <FormControl style={{ minWidth: '100%', margin: '10px 0px' }}>
        <InputLabel id="demo-simple-select-label black-text">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={name}
          value={value}
          name={name}
          onChange={onChange}
        >
          {
            data.map((val, i) => {
              return (
                <MenuItem value={val[0]}>{val[1]}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}
