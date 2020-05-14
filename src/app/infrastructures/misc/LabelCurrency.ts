export const convertCurrency = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.round(Math.abs(Number(labelValue))) / 1.0e+12 + "T"
        : Math.abs(Number(labelValue)) >= 1.0e+9
            ? Math.round(Math.abs(Number(labelValue))) / 1.0e+9 + "M"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6
                ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6) + "jt"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3
                    ? Math.round(Math.abs(Number(labelValue))) / 1.0e+3 + "rb"
                    : Math.abs(Number(labelValue));
}

export default convertCurrency