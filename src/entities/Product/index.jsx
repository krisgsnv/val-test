import { numberWithSpaces } from "@/shared/lib/number";

export const Product = (item) => {
    const { brand, id, price, product } = item;
    return (
        <article className="list-group-item">
            <small className="text-muted">Артикул: {id}</small>
            <h5 className="mb-1">Название: {product}</h5>
            <p className="mb-1">Бренд: {brand || "Без бренда"}</p>
            <p>Цена: {numberWithSpaces(price)} ₽</p>
        </article>
    );
};
