import { Request, Response } from "express";

export default async function getSecret(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const secretId = req.params?.id;

        const { SecretsRepo } = req.repositories!;

        const found = await SecretsRepo.getSecret({
            _id: secretId,
        });

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
