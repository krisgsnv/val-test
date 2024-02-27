export const removeDuplicateFromArray = (array) => {
    return Array.from(new Set(array));
};

export const removeDuplicateById = (array) => {
    const acc = new Set();
    return array.filter(({ id }) => (acc.has(id) ? false : acc.add(id)));
};
