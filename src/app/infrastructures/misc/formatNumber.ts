const formatNumber = (value, toFixed = 2) => {
    const million = 1000000;
    const numeral = value ? value : 0;
    const formattedNum =
      numeral > million
        ? `${`${(numeral / million).toFixed(toFixed)}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )}M`
        : `${parseFloat(numeral).toFixed(0)}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          );
  
    return formattedNum;
  };
  
  export default formatNumber;