const ErrorCodes = {
    UnAuthorised: 401,
    Forbidden: 403,
    NotFound: 404,
    BadRequest: 400,
    ValidationError: 422,
    Success: 201,
    ServerError: 500,
} as const; // Read only. Cannot  be modified

export default ErrorCodes;
