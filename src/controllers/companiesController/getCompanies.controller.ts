import { Request, Response } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import CompanySchema from "../../schema-entities/Company.schema";
import Error from "../../utils/error";
import { ForbiddenError, Success } from "../../utils/responseData";

export default async function getCompanies(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { CompaniesRepo } = req.repositories!;

        const authUser = req.user!;

        if (!authUser) {
            throw new ForbiddenError();
        }

        const params = req?.query
            ?.params as unknown as FilterQuery<CompanySchema>;
        const options = req.query
            ?.options as unknown as QueryOptions<CompanySchema>;

        const companies = await CompaniesRepo.findCompanies(
            params,
            undefined,
            options
        );

        return res.success!(
            new Success({
                data: companies,
            })
        );
    } catch (err: any) {
        if (err instanceof Error) {
            return res.badRequest!(err);
        }
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
