import { Request, Response } from "express";

export default async function updateCompanyDetails(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const id = req.params?.id;
        const data = req.body;

        // Functionality and data validation

        // Return response
        return res.success!({
            data: {
                ...data,
                companyId: id,
            },
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
