export default class ApiResponse {
    constructor(
        message = 'Success',
        statusCode,
        data,
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}
