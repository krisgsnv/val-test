export const padStartZero = (value, length = 2) => {
    return value.toString().padStart(length, "0");
};

export const replaceToDigits = (string) => {
    return string.replace(/[^0-9]/g, "");
};
