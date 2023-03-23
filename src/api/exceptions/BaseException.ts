/**
 * BaseException
 * @class
 * @param {string} message
 * @param {number} status
 * @returns {message, code, status}
 */
class BaseException extends Error {
    public stack: string | undefined;
    public success: boolean = false;

    constructor(
        public message: string,
        public status: number,
        public details?: any
    ) {
        super(message || "Internal Server Error");
        this.success = false;
        this.status = status;
        this.details = details;
    }
}

export default BaseException;