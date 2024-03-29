import { Request, Response } from "express";
import Joi from "@hapi/joi";
import { isValidObjectId } from "mongoose";
import {
    ForbiddenError,
    ServerError,
    Success,
    ValidationError,
} from "../../utils/responseData";
import Error from "../../utils/error";

export default async function createCompany(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { CompaniesRepo } = req.repositories!;

        const authUser = req.user!;

        if (!authUser || !authUser?.id || !isValidObjectId(authUser?.id)) {
            throw new ForbiddenError();
        }

        console.log("creating company");
        // make sure to validate especially req.body to ensure data correctness

        const data = Array.isArray(req.body)
            ? req.body?.map((item) => ({ ...item, owner: authUser?.id }))
            : {
                  ...req.body,
                  owner: authUser?.id,
              };

        const created = await CompaniesRepo.createCompany(data);

        return res.success!(
            new Success({
                data: created,
            })
        );
    } catch (err: any) {
        // console.error(err);
        if (Joi.isError(err)) {
            return res.badRequest!(
                new ValidationError(err?.message, err?.details)
            );
        }

        if (err instanceof Error) {
            return res.badRequest!(err);
        }

        return res.internalServerError!(new ServerError(err));
    }
}
