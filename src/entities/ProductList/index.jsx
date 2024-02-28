import { Product } from "@/entities/Product";

import { isNotEmpty } from "@/shared/lib/array";

export const ProductList = ({ products }) => {
    return (
        <section className="mt-4 product-section">
            {isNotEmpty(products) ? (
                <ul className="list-group gap-2 list-unstyled">
                    {products.map((product) => (
                        <li key={product.id}>
                            <Product {...product} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Не найдено товаров, удовлетворяющих выбранным критериям</p>
            )}
        </section>
    );
};
