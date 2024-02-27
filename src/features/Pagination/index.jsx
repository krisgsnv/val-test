import { useSearchParams } from "react-router-dom";

export const Pagination = ({ currentPage, total, perPage }) => {
    const [, setSearchParams] = useSearchParams();

    const lastPage = Math.ceil(total / perPage);

    const handlePageChange = (page) => {
        setSearchParams((prev) => {
            prev.set("page", page);
            return prev;
        });
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
            <span>
                Страница {currentPage} из {lastPage}
            </span>
            <button disabled={currentPage === lastPage} onClick={toNextPage}>
                Следующая
            </button>
        </div>
    );
};
