import { useSearchParams } from "react-router-dom";

export const Pagination = ({ page, total, perPage }) => {
    const [, setSearchParams] = useSearchParams({ page: 1 });

    const lastPageValue = Math.ceil(total / perPage);
    const lastPage = page > lastPageValue ? 1 : lastPageValue;
    const currentPage = page <= lastPage ? page : 1;
    const isFirst = currentPage === 1;
    const isLast = currentPage === lastPage;

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
        <div className="pagination gap-3 mt-4 align-items-center justify-content-center">
            <span className={`page-item ${isFirst && "disabled"}`}>
                <button className="page-link" disabled={isFirst} onClick={toPrevPage}>
                    Предыдущая
                </button>
            </span>
            <span>
                Страница {currentPage} из {lastPage}
            </span>
            <span className={`page-item ${isLast && "disabled"}`}>
                <button className="page-link" disabled={isLast} onClick={toNextPage}>
                    Следующая
                </button>
            </span>
        </div>
    );
};
