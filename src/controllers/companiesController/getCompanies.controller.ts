import { Request, Response } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import { CompaniesRepo } from "../../use-cases";
import CompanySchema from "../../schema-entities/Company.schema";

export default async function getCompanies(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const params = req?.query?.params as unknown as FilterQuery<CompanySchema>;
        const options = req.query?.options as unknown as QueryOptions<CompanySchema>;

        const companies = await CompaniesRepo.findCompanies(
            params,
            undefined,
            options
        );

        return res.success!({
            data: companies,
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
