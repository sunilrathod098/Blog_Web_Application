import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, basePath = "" }) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className="flex justify-center mt-8 space-x-2">
            {prevPage ? (
                <Link
                    to={`${basePath}?page=${prevPage}`}
                    className="px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-50"
                >
                    Previous
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                    Previous
                </button>
            )}

            <div className="px-4 py-2 border rounded-md bg-blue-600 text-white">
                {currentPage}
            </div>

            {nextPage ? (
                <Link
                    to={`${basePath}?page=${nextPage}`}
                    className="px-4 py-2 border rounded-md bg-white text-blue-600 hover:bg-blue-50"
                >
                    Next
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
