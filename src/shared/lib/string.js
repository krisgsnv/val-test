export const padStartZero = (value, length = 2) => {
    return value.toString().padStart(length, "0");
};
