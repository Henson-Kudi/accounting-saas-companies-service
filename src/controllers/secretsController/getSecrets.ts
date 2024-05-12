import { Request, Response } from "express";

export default async function getSecrets(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const query = req.query;
        const { SecretsRepo } = req.repositories!;

        const found = await SecretsRepo.getSecrets(query);

        return res.success!({
            data: found,
        });
    } catch (err: any) {
        return res.internalServerError!({
            data: {
                message: err?.message,
            },
        });
    }
}
