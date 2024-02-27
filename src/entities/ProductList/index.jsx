import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/entities/Product";
import { Pagination } from "@/features/Pagination";

import { api } from "@/shared/api";
import { isNaturalNumber } from "@/shared/lib/number";
import { removeDuplicateFromArray, removeDuplicateById } from "@/shared/lib/array";

export const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [idsPerPage, setIdsPerPage] = useState([]);

    const page = Number(searchParams.get("page"));

    useEffect(() => {
        if (!isNaturalNumber(page)) {
            setSearchParams({ page: 1 });
        }

        const fetchIds = async () => {
            const ids = await api.getIds({
                offset: page === 1 ? 0 : (page - 1) * 50,
                limit: 50
            });
            if (ids?.result?.length > 0) {
                const filteredIds = removeDuplicateFromArray(ids.result);
                const products = await api.getItems({
                    ids: filteredIds
                });
                products?.result?.length > 0 && setIdsPerPage(removeDuplicateById(products?.result));
            }
        };

        fetchIds();
    }, [page]);

    return (
        <div>
            {idsPerPage.length > 0 && (
                <>
                    <ul>
                        {idsPerPage.map((product, i) => (
                            <li key={i}>
                                <Product {...product} />
                            </li>
                        ))}
                    </ul>
                    <Pagination currentPage={page} />
                </>
            )}
        </div>
    );
};
