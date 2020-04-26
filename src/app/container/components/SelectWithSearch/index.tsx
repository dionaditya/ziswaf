import React from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import _ from 'lodash'

const style = {
  control: (base) => ({
    ...base,
    height: 45,
    backgroundColor: "#ffffff",
    minHeight: "1px",
    "&:hover": {
      borderColor: "#00923f",
    },
    "&:active": {
      borderColor: "#000",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    height: 45,
  }),
  singleValue: (base) => ({
    ...base,
    marginTop: 2,
  }),
  placeholder: (base) => ({
    ...base,
    marginTop: 2,
  }),
  
};

export const SelectWithSearchWithDebounced = ({
  name,
  debounced,
  loadOptions,
  onChange,
  value,
  data,
  label,
  ...rest
}) => {
 
  if (value !== "") {
    if(data.length > 0) {
      const transformData = data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      });
    
      const valueData = transformData.filter((val) => val.value === value);
      return (
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={debounced}
          value={valueData}
          isSearchable={true}
          onChange={onChange}
          name={name}
          options={transformData}
          styles={style}
          placeholder={label}
          {...rest}
        />
      );
    } else {
      return(
        <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={debounced}
        value={{
          value: "",
          label: "SEMUA",
        }}
        isSearchable={true}
        onChange={onChange}
        name={name}
        styles={style}
        options={data}
        placeholder={label}
        cacheOptions
        {...rest}
      />
      )
    }
  
  } else {
    return (
      <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={debounced}
        value={{
          value: "",
          label: "SEMUA",
        }}
        isSearchable={true}
        onChange={onChange}
        name={name}
        styles={style}
        options={data}
        placeholder={label}
        cacheOptions
        {...rest}
      />
    );
  }
};

const SelectWithSearch = (props) => {

  const {
    data, value, onChange, name, label, async, isDisabled, placeholder, ...rest
  } = props

  if (async) {
    const transformData = data.map((val) => {
      return {
        value: val.id,
        label: val.name,
      };
    });
    const valueData = transformData.filter((val) => val.value === value);
    const defaultData = [
      ...transformData,
    ];
    if (value !== "" && _.isNumber(value) === true) {
      return (
        <Select
          name={name}
          placeholder={label}
          value={valueData[0]}
          onChange={onChange}
          options={defaultData}
          styles={style}
          isDisabled={isDisabled}
          {...rest}
        />
      );
    } else {
      return (
        <Select
          name={name}
          placeholder={label}
          value={{
            value: "",
            label: placeholder,
          }}
          onChange={onChange}
          options={defaultData}
          styles={style}
          isDisabled={isDisabled}
          {...rest}
        />
      );
    }
  } else {
    const transformData = data.map((val) => {
      return {
        value: val[0],
        label: val[1].toUpperCase(),
      };
    });
    const valueData = transformData.filter((val) => val.value === value);
    const defaultData = [
      ...transformData,
    ];
    if (value !== "") {
      return (
        <Select
          name={name}
          placeholder={label}
          value={valueData[0]}
          onChange={onChange}
          options={defaultData}
          styles={style}
          isDisabled={isDisabled}
          {...rest}
        />
      );
    } else {
      return (
        <Select
          name={name}
          placeholder={label}
          value={{
            value: "",
            label: placeholder,
          }}
          onChange={onChange}
          options={defaultData}
          styles={style}
          isDisabled={isDisabled}
          {...rest}
        />
      );
    }
  }
};

export default SelectWithSearch;
