import React from 'react'


const SelectOptions = ({onChange, value, options, label}) => {
    return (
        <div>
            {label && <label className="black-text">{label}</label>}
            <select value={value} name="selectOption" onChange={onChange}>
                    {
                        options.map((data, i) => {
                            return(
                                <option value={data.value} key={i}>{data.label}</option>
                            )
                        })
                    }
            </select>
        </div>
    )
}
export default SelectOptions