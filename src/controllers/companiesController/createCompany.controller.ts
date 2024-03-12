import { Request, Response } from "express";
import companySchema from "../../utils/validators/company.validator";
import Joi from "joi";
import CompanySchema from "../../schema-entities/Company.schema";

export default async function createCompany(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { CompaniesRepo } = req.repositories!;
        
        console.log("creating company");
        // make sure to validate especially req.body to ensure data correctness

        const data = req.body;

        // validate data with joi
        const valide = await companySchema.validateAsync(data);

        const newCompany = new CompanySchema(data);

        const created = await CompaniesRepo.createCompany(newCompany);

        return res.success!({
            data: created,
            code: 201,
        });
    } catch (err: any) {
        console.error(err);
        if (Joi.isError(err)) {
            return res.badRequest!({ code: 422, message: err?.details });
        }

        return res.internalServerError!({
            data: err?.toString(),
            message: err?.message,
        });
    }
}
