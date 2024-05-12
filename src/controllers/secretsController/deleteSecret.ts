import { Request, Response } from "express";

export default async function deleteSecret(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        const secretId = req.params?.id;

        const { SecretsRepo } = req.repositories!;

        const deleted = await SecretsRepo.deleteSecrets({
            _id: secretId,
        });

        return res.success!({
            data: deleted,
        });
    } catch (err: any) {
        return res.internalServerError!({
            data: {
                message: err?.message,
            },
        });
    }
}
