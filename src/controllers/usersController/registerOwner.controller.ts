import { Request, Response } from "express";
import Joi from "@hapi/joi";
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
        const { UsersRepo } = req.repositories!;
        const data = req.body;

        // make sure to consolidate all data before passing to repo (e.g authUser, etc)

        const created = await UsersRepo.createUser(data);

        return res.success!({ data: created });
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
