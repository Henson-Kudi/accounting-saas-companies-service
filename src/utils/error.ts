export default class CustomError extends Error {
    constructor(
        public message: string,
        public code: number,
        public data?: any
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Set the prototype explicitly
        Error.captureStackTrace(this, this.constructor); // capture stack trace of error
    }
}
