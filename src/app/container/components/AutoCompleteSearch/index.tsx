import React  from 'react'
import ReactSearchBox from 'react-search-box'

const AutoSearch = (props) => {
  const { data, handleChange, onSelect, value, placeholder } = props
  return (
    <ReactSearchBox
      placeholder={placeholder || 'Masukan Nama Pegawai'}
      value={value}
      data={data}
      style={{width: "100%", height: '40px'}}
      onChange={handleChange}
      onSelect={onSelect}
    />
  )
}

export default AutoSearch