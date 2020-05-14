import React from "react";
import ReactSelect from "react-select";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";

const UnitSelect = (props) => {
  const {
    options,
    handleChange,
    defaultValue,
    isDisabled,
    handleSearch,
    inputLabel,
    valState,
    selected,
    ...rest
  } = props;

  const allOptions = [{ label: `${inputLabel}`, value: "" }];
  const newOptions = allOptions.concat(options);
  const { role } = getUserInfo();

  const selectedOptions = allOptions.filter((val) => val.value === selected);

  const value =
    role === 1
      ? { label: `${!valState ? inputLabel : valState}`, value: "" }
      : defaultValue;

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setTimeout(() => {
      handleSearch(inputValue);
    }, 1000);
  };

  return (
    <ReactSelect
      cacheOptions
      onInputChange={handleInputChange}
      value={
        role === 2
          ? value
          : selected === "" || selected === null
          ? value
          : selectedOptions[0]
      }
      isSearchable={true}
      onChange={(e) => handleChange(e)}
      isDisabled={isDisabled}
      styles={{
        container: (base) => ({
          ...base,
          display: "inline-block",
          width: "220px",
          minHeight: "1px",
          textAlign: "left",
        }),
        indicatorSeparator: (base) => ({
          ...base,
          minHeight: "1px",
        }),
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
        placeholder: (base) => ({
          ...base,
          marginTop: 2,
        }),
        menu: (base) => {
          return {
            ...base,
            borderRadius: 5,
            hypens: "auto",
            marginTop: 0,
          };
        },
        singleValue: (base) => ({
          ...base,
          marginTop: 2,
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            color: isSelected ? "#ffffff" : "#31394d",
            cursor: "default",
            backgroundColor: isSelected ? "#00923f" : "#ffffff",
          };
        },
      }}
      options={newOptions}
      {...rest}
    />
  );
};

export default UnitSelect;
