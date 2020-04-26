import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const InputMask = (inputProps) => {
    const { percentage, disabled, defaultValue, onChange, ref } = inputProps
    const defaultMaskOptions = {
      prefix: percentage ? '' : 'Rp. ',
      suffix: percentage ? '%' : '',
      includeThousandsSeparator: percentage ? false : true,
      thousandsSeparatorSymbol: percentage ? '' : '.',
      dozensSeparatorSymbol: true,
      allowDecimal: percentage ? false : true,
      decimalSymbol: ',',
      decimalLimit: percentage ? 5 : 20, // how many digits allowed after the decimal
      integerLimit: percentage ? 5 : 20, // limit length of integer numbers
      allowNegative: false,
      allowLeadingZeroes: false,
    }

    const handleChangeInput = (value) => {
        const numberPattern = /\d+/g;
        const currency = value.match( numberPattern )
        let data = currency ? currency.join('') : 0;
        data = percentage ? value : data
        onChange(data)
    }
  
  const currencyMask = createNumberMask(defaultMaskOptions)
  return <MaskedInput style={{height: 40, border: '0.8px solid #BCBCBC', fontSize: 14, borderRadius: 3, width: '100%', color: "#323C47", padding: "0px 10px", backgroundColor: disabled ? "#F2F2F2" : "transparent"}}  disabled={disabled} value={defaultValue} mask={currencyMask} {...inputProps} onChange={(e) => handleChangeInput(e.target.value)} ref={ref} />
}

export default InputMask;
