import BaseException from "./BaseException";
import { Exception } from "../../types/exception";

class CitizenException extends BaseException {
    constructor(error: Exception) {
        super(error.message, error.status, error.details);
    }
}

export default CitizenException;