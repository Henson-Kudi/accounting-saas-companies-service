import { Request, Response, NextFunction } from "express";
import { UnauthorizedMessage } from "../utils/responseHandler/responseMessage";
import { getConnection } from "../config/amqp";
import { v4 as uuid } from "uuid";
import Error from "../utils/error";

export default async function authenticateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer")) {
            throw new UnauthorizedMessage("Invalid token");
        }

        const authToken = token.split(" ")[1];

        if (!authToken) {
            throw new UnauthorizedMessage("Invalid token");
        }
        // At this level we want to make a request to authentication service to authenticate jwt token and return a response if it is valid or not valid token

        const authData: any = await makeAuthenticationRequest(authToken);

        if (authData?.error) {
            const errorData = authData.error;

            throw new Error(
                errorData?.message ?? "Forbidden",
                errorData?.code ?? 500
            );
        }

        req.user = authData;

        next();
    } catch (err) {
        next(err);
    }
}

function makeAuthenticationRequest(token: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await getConnection();
            const channel = await connection.createChannel();

            const requestQueue = "authenticate-jwt";

            const correlationId = uuid();

            const queue = await channel.assertQueue("", {
                durable: false,
            });

            // Consume from reply queue
            const responsePromise = new Promise((resolve, reject) => {
                channel.consume(
                    queue.queue,
                    (msg) => {
                        const response = msg!.content.toString();

                        resolve(JSON.parse(response));
                    },
                    { noAck: true }
                );
            });

            // Publish request to request queue
            const requestData = {
                token,
            };

            channel.assertQueue(requestQueue, { durable: false });

            channel.sendToQueue(
                requestQueue,
                Buffer.from(JSON.stringify(requestData)),
                {
                    correlationId: correlationId,
                    replyTo: queue.queue,
                }
            );

            // Wait for response
            const response: any = await responsePromise;
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}
