import BaseException from "./BaseException";
import { Exception } from "../../types/exception";

class EntityException extends BaseException {
    constructor(error: Exception) {
        super(error.message, error.status);
    }
}

export default EntityException;