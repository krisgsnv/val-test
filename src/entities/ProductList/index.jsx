import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/entities/Product";
import { Pagination } from "@/features/Pagination";
import { ProductContext } from "@/App";

import { api } from "@/shared/api";
import { isNaturalNumber } from "@/shared/lib/number";
import { removeDuplicateById, isNotEmpty } from "@/shared/lib/array";
import { Filter } from "@/features/Filter";

export const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const [idsPerPage, setIdsPerPage] = useState([]);
    const [status, setStatus] = useState("loading");
    const { ids } = useContext(ProductContext);

    const page = Number(searchParams.get("page"));

    useEffect(() => {
        if (!isNaturalNumber(page)) {
            setSearchParams({ page: 1 });
        }
        setStatus("loading");

        const fetchProducts = async () => {
            const products = await api.getItems({
                ids: ids.slice(page === 1 ? 0 : (page - 1) * 50, 50 * page)
            });
            if (isNotEmpty(products)) {
                setIdsPerPage(removeDuplicateById(products));
                setStatus("success");
            } else {
                setStatus("error");
            }
        };

        fetchProducts();
    }, [page]);

    return (
        <div>
            {status === "success" && (
                <>
                    <Filter />
                    <ul className="list-group mt-4 gap-2 list-unstyled">
                        {idsPerPage.map((product) => (
                            <li key={product.id}>
                                <Product {...product} />
                            </li>
                        ))}
                    </ul>
                    <Pagination currentPage={page} perPage={50} total={ids.length} />
                </>
            )}
            {status === "loading" && <p>Загрузка...</p>}
            {status === "error" && <p>Ничего не найдено</p>}
        </div>
    );
};
