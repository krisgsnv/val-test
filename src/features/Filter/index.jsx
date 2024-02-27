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
            <div>
                {fields.map((field) => {
                    return (
                        <div className="form-check" key={field}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="filterName"
                                value={field}
                                id={field}
                                checked={filter.filterName === field}
                                onChange={handleFilterNameChange}
                            />
                            <label className="form-check-label" htmlFor={field}>
                                {fieldName[field] || field}
                            </label>
                        </div>
                    );
                })}
            </div>
            <input
                className="form-control mt-2"
                placeholder="Введите значение"
                type="text"
                name="filterValue"
                value={filter.filterValue}
                onChange={handleFilterValueChange}
            />
            <button type="submit" className="btn btn-primary mt-2">
                Отфильтровать
            </button>
        </form>
    );
};
