import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { replaceToDigits } from "../../shared/lib/string";

const fieldName = {
    product: "По названию",
    price: "По цене",
    brand: "По бренду"
};

export const Filter = ({ fields }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({
        filterName: searchParams.get("filterName") || "",
        filterValue: searchParams.get("filterValue") || ""
    });

    const handleFilterChange = (value, field) => {
        setFilter((prev) => {
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const handleFilterNameChange = (e) => {
        handleFilterChange(e.target.value, "filterName");
    };

    const handleFilterValueChange = (e) => {
        if (filter.filterName === "price") {
            handleFilterPriceValueChange(e);
        } else handleFilterChange(e.target.value, "filterValue");
    };

    const handleFilterPriceValueChange = (e) => {
        const value = +replaceToDigits(e.target.value);
        handleFilterChange(value, "filterValue");
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
            <ul className="list-unstyled">
                {fields.map((field) => {
                    return (
                        <li className="form-check" key={field}>
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
                        </li>
                    );
                })}
            </ul>
            <input
                className="form-control mt-2"
                placeholder="Введите значение"
                type="text"
                name="filterValue"
                value={filter.filterValue}
                onChange={handleFilterValueChange}
            />

            <button type="submit" className="btn mt-2 btn-primary">
                Отфильтровать
            </button>
        </form>
    );
};
