/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({data, onChange, getOptionSelected}) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      onChange={onChange}
      getOptionSelected={getOptionSelected}
      getOptionLabel={(data: any) => data.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="standard" />}
    />
  );
}
