import { useSearchParams } from "react-router-dom";

import { ProductList } from "@/entities/ProductList";
import { Filter } from "@/features/Filter";
import { Pagination } from "@/features/Pagination";
import { useProducts } from "@/shared/hooks/useProducts";

import "./index.scss";

const App = () => {
    const [searchParams] = useSearchParams({ page: 1 });
    const page = Number(searchParams.get("page"));
    const { ids, fields, products, status } = useProducts();

    return (
        <main className="p-3">
            {status === "success" ? (
                <>
                    <Filter fields={fields} />
                    <ProductList products={products} />
                    <Pagination page={page} perPage={50} total={ids.length} />
                </>
            ) : (
                <p>Загрузка...</p>
            )}
        </main>
    );
};

export { App };
