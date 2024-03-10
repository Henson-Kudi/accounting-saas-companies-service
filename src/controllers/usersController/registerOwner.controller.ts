import { Request, Response } from "express";
import usersJoiSchema from "../../utils/validators/owners.validator";
import Joi from "joi";
import { errorLogger } from "../../utils/logger";

/**
 *
 * @param req The request to create a company owner
 * @param res The response to be returned after creating the company owner
 * @returns Promise with the created company or an error (if failed to create company)
 */

export default async function registerOwner(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const data = req.body;
        // validate data with joi to ensure it is valid then pass to business logic handler
        const valid = await usersJoiSchema.validateAsync(data, {
            abortEarly: false,
        });
        console.log(data);
        return res.success!(data);
    } catch (err: any) {
        // If validation error, return badRequest res
        if (Joi.isError(err)) {
            return res.badRequest!({
                code: 422,
                message: { details: err?.details, message: err?.message },
            });
        }

        // Log error so devs can look into fixing it (if its an internal server error)
        errorLogger(err);
        return res.internalServerError!({ message: err?.message });
    }
}
