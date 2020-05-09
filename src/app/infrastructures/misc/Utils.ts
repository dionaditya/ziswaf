  const formatPrice = price => {
    const number = formatNumbers(price)
    return `Rp. ${number}`;
  }

  export const formatNumbers = (number) => {
    if(!number) return 0;
    let id = '';		
    let angkarev = number.toString().split('').reverse().join('');
    for(let i = 0; i < angkarev.length; i++) if(i%3 === 0) id += angkarev.substr(i,3)+'.';
    return id.split('',id.length-1).reverse().join('');
  }

  export const separatorNumbers = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }
  export default formatPrice
