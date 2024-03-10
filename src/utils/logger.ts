import path from "path";
import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logDir = path.join(process.cwd(), "logs");

// Define the log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.simple(),
    format.metadata({
        fillExcept: ["message", "level", "timestamp", "label"],
    }),
    format.printf(({ timestamp, level, message, metadata }) => {
        const filePath = metadata?.file || "Unknown file";
        return `${timestamp} [${level}]: ${message}\n [File Location]: ${filePath}`;
    })
);

// Define the logger
const logger = createLogger({
    level: "info", // Set your desired log level
    format: logFormat,
    transports: [
        new DailyRotateFile({
            filename: `${logDir}/%DATE%-error.log`, // Log files will be placed in the "logs" directory
            datePattern: "YYYY-MM-DD", // Daily log rotation
            level: "error", // Log error messages and above to this file
            zippedArchive: true, // Compress old log files
        }),
        new DailyRotateFile({
            filename: `${logDir}/%DATE%-combined.log`,
            datePattern: "YYYY-MM-DD",
            level: "info", // Log info messages and above to this file
            zippedArchive: true,
        }),
    ],
});

// Utility function to get the filePath at which logger is being called. (Very important for error logs so we can easily trace and fix error)
function getCallingFilePath() {
    const originalPrepareStackTrace = Error.prepareStackTrace;
    let filePath: string | undefined;

    try {
        const error = new Error();
        Error.captureStackTrace(error, getCallingFilePath);

        Error.prepareStackTrace = (_, stack) => {
            filePath = stack[1]?.getFileName();
            return originalPrepareStackTrace!(_, stack);
        };

        // Triggering an error to capture the stack trace
        error.stack;
    } finally {
        Error.prepareStackTrace = originalPrepareStackTrace;
    }

    return filePath;
}

export function errorLogger(error: Error) {
    const callingFilePath = getCallingFilePath();

    logger.error(error.message, { file: callingFilePath });
}

export function infoLogger(message: any) {
    return logger.info(message);
}

// For error logs, it is adviseable to call errorLogger function directly since it'll capture the filePath at which the error was logged. but if you still want to use logger directly, its advisable to include file param in order to get thesame log experience all over:
// Example: logger.error(message, {file: 'path/to/file'})
export default logger;
