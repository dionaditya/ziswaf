import React from 'react'
import ReactSelect from 'react-select';
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';

const UnitSelect = ({ options, handleChange, defaultValue, isDisabled, handleSearch, inputLabel, valState }) => {
    const allOptions = [{ label: `${inputLabel}`, value: '' }];
    const newOptions = allOptions.concat(options);
    const { role } = getUserInfo();

    const value = role === 1 ? { label: `${!valState ? inputLabel : valState}`, value: '' } : defaultValue;

    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        setTimeout(() => {
            handleSearch(inputValue)
        }, 1000);
    };
    return (
        <ReactSelect
            cacheOptions
            onInputChange={handleInputChange}
            value={value}
            isSearchable={true}
            onChange={e => handleChange(e)}
            isDisabled={isDisabled}
            styles={{
                container: base => ({
                    ...base,
                    display: 'inline-block',
                    width: '175px',
                    minHeight: '1px',
                    textAlign: 'left'
                }),
                indicatorSeparator: base => ({
                    ...base,
                    minHeight: '1px',
                    height: '20px'
                }),
                clearIndicator: base => ({
                    ...base,
                    paddingBottom: 0,
                    paddingTop: 0
                }),
                valueContainer: base => ({
                    ...base,
                    minHeight: '1px',
                    height: '20px',
                    paddingBottom: 0,
                    paddingTop: 0
                }),
                control: styles => ({
                    ...styles,
                    backgroundColor: '#ffffff',
                    minHeight: '1px',
                    height: '40px',
                    "&:hover": {
                        borderColor: '#00923f'
                    },
                    "&:active": {
                        borderColor: '#000'
                    }
                }),
                menu: base => {
                    return {
                        ...base,
                        borderRadius: 5,
                        hypens: 'auto',
                        marginTop: 0,
                    }
                },
                singleValue: base => ({
                    ...base,
                    minHeight: '1px',
                    top: role === 2 || !defaultValue ? '40%' : '120%',
                }),
                option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                    return {
                        ...styles,
                        color: isSelected ? '#ffffff' : '#31394d',
                        cursor: 'default',
                        backgroundColor: isSelected ? "#00923f" : '#ffffff',
                    }
                }
            }}
            options={newOptions}
        />
    )
}

export default UnitSelect;