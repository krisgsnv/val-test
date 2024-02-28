import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { api } from "@/shared/api";
import { useFilter } from "@/shared/hooks/useFilter";
import { removeDuplicateFromArray, removeDuplicateById, isNotEmpty } from "@/shared/lib/array";

export const useProducts = () => {
    const [ids, setIds] = useState([]);
    const [searchParams] = useSearchParams({ page: 1 });
    const [products, setProducts] = useState(null);
    const [status, setStatus] = useState("loading");
    const [fields, setFields] = useState([]);
    const { filterName, filterValue, isFilterActive } = useFilter();

    const page = Number(searchParams.get("page"));

    const getFilteredIds = () => api.filter({ [filterName]: filterValue });
    const getIds = () => {
        if (!isNotEmpty(ids) || isFilterActive) {
            return api.getIds();
        }
        return ids;
    };
    const getProducts = (ids) => {
        if (isNotEmpty(ids)) {
            const idsChunk = ids.slice(page === 1 ? 0 : (page - 1) * 50, 50 * page);
            return api.getItems({ ids: idsChunk });
        }
        return [];
    };
    const getFields = () => api.getFields();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = isFilterActive ? getFilteredIds : getIds;

                setStatus("loading");
                setProducts([]);

                const ids = await request();
                const uniqueIds = removeDuplicateFromArray(ids);
                setIds(uniqueIds);

                const products = await getProducts(ids);
                const uniqueProducts = removeDuplicateById(products);
                setProducts(uniqueProducts);

                const fields = await getFields();
                setFields(fields);

                setStatus("success");
            } catch (error) {
                setStatus("error");
            }
        };

        fetchData();
    }, [filterName, filterValue, page]);
    return { ids, fields, products, status };
};
