import React from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const SelectOptions2 = ({ onChange, value, options, label, name, ...props }) => {
    if (props.async) {
        return (
            <div>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={onChange}
                >
                    {
                        options.map((data, i) => {
                            return (
                                <MenuItem value={data.id} key={i}>{data.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </div>
        )
    }

    return (
        <div>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={onChange}
            >
                {
                    options.map((data, i) => {
                        return (
                            <MenuItem value={data[0]} key={i}>{data[1]}</MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    )
}
export default SelectOptions2