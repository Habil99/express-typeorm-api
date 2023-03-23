export interface ExceptionDetails {
    field: string;
    message: string;
}

export interface Exception {
    message: string;
    status: number;
    details?: any;
}

export const CITIZEN_MESSAGE = {
    NOT_FOUND: "Citizen not found",
    ALREADY_EXISTS: "Citizen already exists",
    BAD_REQUEST: "Invalid citizen data",
    VALIDATION_ERROR: "Data validation error",
}

export const APPEAL_MESSAGE = {
    NOT_FOUND: "Appeal not found",
    ALREADY_EXISTS: "Appeal already exists",
    BAD_REQUEST: "Invalid appeal data",
    STATUS_INVALID: "Invalid appeal status",
}

export const EXCEPTION_TYPE = {
    DATABASE: "DatabaseException",
    VALIDATION: "ValidationException",
}