export const Product = (item) => {
    const { brand, id, price, product } = item;
    return (
        <article>
            <small>{id}</small>
            <h3>{product}</h3>
            <span>{brand}</span>
            <span>{price}</span>
        </article>
    );
};
