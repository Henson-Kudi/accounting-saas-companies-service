import { ConsumeMessage } from "amqplib";
import RabbitMQInstance from "../../config/amqp";
import redisClient, { acquireLock, releaseLock } from "../../config/redis";

async function subScribeToTasks(queue: string, taskProcessor: Function) {
    const channel = await RabbitMQInstance.createChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.prefetch(1);

    console.log("[*] Waiting for messages in %s.", queue);

    channel.consume(
        queue,
        async (msg: ConsumeMessage | null) => {
            const content = msg?.content.toString();

            console.log(content, "--content data");

            const lockId = await acquireLock(content);

            console.log(lockId, "--lock id data");

            if (!lockId && msg) {
                console.log("first");

                return channel.nack(msg); // Reject the message as it is locked
            }

            try {
                // Process the message here...
                console.log("Processing message:", content);

                await taskProcessor(content);

                // After processing
                await releaseLock(content, lockId);

                if (msg) {
                    channel.ack(msg); // Acknowledge after processing
                }
            } catch (error) {
                await releaseLock(content, lockId);

                if (msg) {
                    channel.nack(msg); // Reject the message on error
                }
            }
        },
        { noAck: false }
    );
}

export default subScribeToTasks;
