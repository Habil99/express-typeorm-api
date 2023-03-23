import BaseException from "./BaseException";

class InternalServerException extends BaseException {
    constructor(public message: string) {
        super(message, 500);
    }
}

export default InternalServerException;