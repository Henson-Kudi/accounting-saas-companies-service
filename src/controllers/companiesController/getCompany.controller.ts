import { Request, Response } from "express";

export default async function getCompany(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const { CompaniesRepo } = req.repositories!;
        
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
