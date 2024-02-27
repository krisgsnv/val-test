import { useEffect, useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductList } from "@/entities/ProductList";
import { api } from "@/shared/api";
import { removeDuplicateFromArray, isNotEmpty } from "@/shared/lib/array";

export const ProductContext = createContext(null);

const App = () => {
    const [ids, setIds] = useState(null);
    const [searchParams] = useSearchParams();
    const filterName = searchParams.get("filterName");
    const filterValue = searchParams.get("filterValue");
    const isFilterActive = filterName && filterValue;

    useEffect(() => {
        const fetchIds = async () => {
            const data = isFilterActive
                ? await api.filter({ [filterName]: filterValue })
                : ids || (await api.getIds());
            if (isNotEmpty(data)) {
                const filteredIds = removeDuplicateFromArray(data);
                setIds(filteredIds);
            }
        };
        fetchIds();
    }, []);

    return (
        <ProductContext.Provider value={{ ids }}>
            {ids?.length > 0 && <ProductList />}
        </ProductContext.Provider>
    );
};

export { App };
