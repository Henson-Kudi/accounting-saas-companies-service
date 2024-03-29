import { Request, Response } from "express";

export default async function getRegisteredOwner(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const id = req.params?.id;
        const data = req.body;

        return res.success!({
            data: {
                ...data,
                ownerId: id,
            },
        });
    } catch (err: any) {
        return res.internalServerError!({
            message: err?.message,
        });
    }
}
