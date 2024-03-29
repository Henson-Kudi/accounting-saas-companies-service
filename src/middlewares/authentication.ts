import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ForbiddenError } from "../utils/responseData";

export default async function authenticationMiddleWare(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // PROCESS

        // Get bearer token for request headers
        // decode the token
        // ensure that all required fields are present (issuer, keyId, etc) see https://developer.apple.com/documentation/appstoreserverapi/generating_json_web_tokens_for_api_requests/ for reference
        // based on payload, fetch public key from public key management system
        // use public key to verify token
        // update req.user if token is valid is throw 403/401 error

        const authToken = req.headers.authorization;

        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new ForbiddenError();
        }

        const token = authToken.split(" ")[1];

        // Decode token to ensure all required fields are passed
        // const decoded = decodeJwt(token);

        // Check all required fields to ensure validity

        // Fetch signer's public key from public key repository
        // const publicKey = getSignerPublicKey(decoded);

        // Verify that the token was actualy signed by the signer
        // const verified = verifyJwt(token, publicKey);

        // Fetch user data (if necessary)
        // const user = await getUser(verified);

        // throw err if user not found
        // if (!user) {
        //     throw new ForbiddenError();
        // }

        // add user to request

        // req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}
