import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import _ from "lodash";

const style = {
  control: (base) => ({
    ...base,
    height: 47,
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
    height: 47,
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

export const SelectWithSearchWithDebounced = (props) => {
  const {
    name,
    debounced,
    loadOptions,
    onChange,
    value,
    data,
    placeholder,
    disabled,
    ...rest
  } = props;
  const handleInputChange = (newValue) => {
    debounced(newValue);
  };

  const transformData = data.map((val) => {
    return {
      value: val.id,
      label: val.name,
    };
  });

  const valueData = transformData.filter((val) => val.value === value);


  if(_.isNumber(value) === true) {
    return (
      <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        value={valueData[0]}
        isSearchable={true}
        onChange={onChange}
        name={name}
        isDisabled={disabled}
        options={transformData}
        styles={style}
        placeholder={placeholder}
        defaultOptions={transformData}
        {...rest}
      />
    );
  } else {
    return (
      <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        value={{
          value: "",
          label: placeholder
        }}
        isSearchable={true}
        onChange={onChange}
        name={name}
        isDisabled={disabled}
        options={transformData}
        styles={style}
        placeholder={placeholder}
        defaultOptions={transformData}
        {...rest}
      />
    );
  }

};

const SelectWithSearch = (props) => {
  const {
    data,
    value,
    onChange,
    name,
    label,
    async,
    isDisabled,
    placeholder,
    handleSearch,
    isDebounced,
    ...rest
  } = props;

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    handleSearch(inputValue);
  };

  if (async) {
    const transformData = data.map((val) => {
      return {
        value: val.id,
        label: val.name,
      };
    });
    const valueData = transformData.filter((val) => val.value === value);
    const defaultData = [...transformData];
    if (value !== "" && _.isNumber(value) === true) {
      if (isDebounced) {
        return (
          <Select
            name={name}
            placeholder={label}
            value={valueData[0]}
            onChange={onChange}
            options={defaultData}
            styles={style}
            cacheOptions
            onInputChange={handleInputChange}
            isSearchable={true}
            isDisabled={isDisabled}
            {...rest}
          />
        );
      } else {
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
      }
    } else {
      if (isDebounced) {
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
            cacheOptions
            onInputChange={handleInputChange}
            isSearchable={true}
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
  } else {
    const transformData = data.map((val) => {
      return {
        value: val[0],
        label: val[1].toUpperCase(),
      };
    });
    const valueData = transformData.filter((val) => val.value === value);
    const defaultData = [...transformData];
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
