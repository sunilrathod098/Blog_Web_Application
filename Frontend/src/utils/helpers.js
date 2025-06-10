const ERROR_MESSAGES = {
    DEFAULT: "An unexpected error occurred.",
    NETWORK: "Network error. Please check your connection.",
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

export const parseQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return Object.fromEntries(params.entries());
};

export const isAuthor = (user, blogAuthorId) => {
    return user && user._id === blogAuthorId;
};

export const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        return {
            message: error.response.data?.message || ERROR_MESSAGES.DEFAULT,
            status: error.response.status,
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            message: ERROR_MESSAGES.NETWORK,
            status: null,
        };
    } else {
        // Something happened in setting up the request
        return {
            message: error.message || ERROR_MESSAGES.DEFAULT,
            status: null,
        };
    }
};