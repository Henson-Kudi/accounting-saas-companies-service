import { Request, Response } from "express";

export default async function createSecret(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const data = req.body;
        const createdBy = req.user;

        const { SecretsRepo } = req.repositories!;

        const created = await SecretsRepo.createSecret({
            ...data,
            createdBy,
        });

        return res.success!({
            data: created,
        });
    } catch (err: any) {
        return res.internalServerError!({
            data: {
                message: err?.message,
            },
        });
    }
}
