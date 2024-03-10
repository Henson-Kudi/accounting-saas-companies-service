import { NextFunction, Request, Response } from "express";

function responseHandler(req: Request, res: Response, next: NextFunction) {
    res.success = function (data: {
        code?: number;
        message?: any;
        data?: any;
    }) {
        return this.status(data?.code ? data?.code : 201).json({
            ...data,
            message: data?.message ?? "Successfully made request",
        });
    };

    res.internalServerError = function (data: {
        code?: number;
        message?: any;
        data?: any;
    }) {
        return this.status(data?.code ? data?.code : 500).json({
            ...data,
            message: data?.message ?? "Unexpected server error",
        });
    };
    res.badRequest = function (data: {
        code?: number;
        message?: any;
        data?: any;
    }) {
        return this.status(data?.code ? data?.code : 400).json({
            ...data,
            message: data?.message ?? "Invalid request",
        });
    };
    res.unAuthorised = function (data: {
        code?: number;
        message?: any;
        data?: any;
    }) {
        return this.status(data?.code ? data?.code : 401).json({
            ...data,
            message: data?.message ?? "Unauthorised to access resource",
        });
    };
    res.pageNotFound = function (data: {
        code?: number;
        message?: any;
        data?: any;
    }) {
        return this.status(data?.code ? data?.code : 404).json({
            ...data,
            message: data?.message ?? "Sorry page not found",
        });
    };

    next();
}

export default responseHandler;
