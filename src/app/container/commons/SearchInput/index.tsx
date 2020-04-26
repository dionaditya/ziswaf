import React from 'react';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const SearchInput = (props: any) => {
    const {type, value, onChange, name, id, ...rest} = props
    return(
        <InputBase 
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            {...rest}
        />
    )
}

export default SearchInput