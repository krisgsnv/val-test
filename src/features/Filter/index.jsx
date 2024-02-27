import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { api } from "@/shared/api";

const fieldName = {
    product: "По названию",
    price: "По цене",
    brand: "По бренду"
};

export const Filter = () => {
    const [fields, setFields] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({
        filterName: searchParams.get("filterName"),
        filterValue: searchParams.get("filterValue")
    });

    useEffect(() => {
        api.getFields().then((data) => setFields(data));
    }, []);

    const handleFilterNameChange = ({ target }) => {
        const filterName = target.value;

        setFilter((prev) => {
            return {
                ...prev,
                filterName
            };
        });
    };

    const handleFilterValueChange = ({ target }) => {
        const filterValue = target.value;

        if (filterValue) {
            setFilter((prev) => {
                return {
                    ...prev,
                    filterValue
                };
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (filter.filterValue && filter.filterName) {
            setSearchParams(filter);
        } else {
            alert("Введите корректное значение для фильтра");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => {
                return (
                    <label key={field}>
                        <input
                            type="radio"
                            name="filterName"
                            value={field}
                            checked={filter.filterName === field}
                            onChange={handleFilterNameChange}
                        />
                        {fieldName[field] || field}
                    </label>
                );
            })}
            <input
                type="text"
                name="filterValue"
                value={filter.filterValue}
                onChange={handleFilterValueChange}
            />
            <button type="submit">Отфильтровать</button>
        </form>
    );
};
