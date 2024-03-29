import ErrorCodes from "./constants/errorcodes";
import CustomError from "./error";

export class ValidationError extends CustomError {
    constructor(message: string, data?: any) {
        super(message, ErrorCodes.ValidationError, data);
    }
}

export class UnAuthorisedErro extends CustomError {
    constructor(data?: any) {
        super(
            "Unauthorised to access resource.",
            ErrorCodes.UnAuthorised,
            data
        );
    }
}

export class ForbiddenError extends CustomError {
    constructor(data?: any) {
        super("Forbidden from access resources", ErrorCodes.Forbidden, data);
    }
}

export class NotFoundError extends CustomError {
    constructor(data?: any) {
        super("Resource not found", ErrorCodes.NotFound, data);
    }
}

export class BadRequestError extends CustomError {
    constructor(data?: any) {
        super("Bad request", ErrorCodes.BadRequest, data);
    }
}

export class Success extends CustomError {
    constructor(data: any) {
        super("Successfully got resources", ErrorCodes.Success, data);
    }
}

export class ServerError extends CustomError {
    constructor(data?: any) {
        super("Internal server error", ErrorCodes.ServerError, data);
    }
}
