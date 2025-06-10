export default class ApiError extends Error {
    constructor(
        message = 'An error occurred',
        statusCode,
        error = [],
        stack = '',
    ) {
        super(message);
        this.data = null;
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        this.stack = stack;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
