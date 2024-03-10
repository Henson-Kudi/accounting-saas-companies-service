import { Request, Response } from "express";
import { errorLogger } from "../../utils/logger";

export default async function getRegisteredOwners(
    req: Request,
    res: Response
): Promise<Response> {
    try {
        return res.success!({ data: "Users list" });
    } catch (err: any) {
        errorLogger(err);

        return res.internalServerError!({ message: err?.message });
    }
}
