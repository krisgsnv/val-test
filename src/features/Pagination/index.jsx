import { useSearchParams } from "react-router-dom";

export const Pagination = ({ currentPage }) => {
    const [, setSearchParams] = useSearchParams();

    const handlePageChange = (page) => {
        setSearchParams({ page });
    };

    const toPrevPage = () => {
        handlePageChange(currentPage - 1);
    };

    const toNextPage = () => {
        handlePageChange(currentPage + 1);
    };

    return (
        <div>
            <button disabled={currentPage === 1} onClick={toPrevPage}>
                Предыдущая
            </button>
            <span>Страница {currentPage} </span>
            <button onClick={toNextPage}>Следующая</button>
        </div>
    );
};
