import { Request, Response } from "express";
import { CompaniesRepo } from "../../use-cases";

export default async function getCompany(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const companyid: string | undefined = req.params?.id;

        const foundCompany = await CompaniesRepo.findCompanyById(companyid);

        return res.success!({
            data: foundCompany,
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
