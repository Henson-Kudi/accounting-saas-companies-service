import { Request, Response } from "express";

export default async function updateCompanyOwner(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        return res.success!({
            code: 201,
            data: req.body,
            message: "User updated successfully",
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
