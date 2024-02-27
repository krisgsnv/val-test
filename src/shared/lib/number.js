export const isNaturalNumber = (number) => {
    return Number.isInteger(number) && number >= 0;
};

export const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
