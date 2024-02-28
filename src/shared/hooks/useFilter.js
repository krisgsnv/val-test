import { useSearchParams } from "react-router-dom";

export const useFilter = () => {
    const [searchParams] = useSearchParams({ page: 1 });
    const filterName = searchParams.get("filterName");
    const filterStringValue = searchParams.get("filterValue");
    const filterValue = filterName === "price" ? +filterStringValue : filterStringValue;
    const isFilterActive = filterName && filterValue;

    return { filterName, filterValue, isFilterActive };
};
