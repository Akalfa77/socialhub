// src/components/Pagination.jsx

function Pagination({ currentPage, totalPages, onPageChange }) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'pagination-btn-active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next button - disabled on the last page */}
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;