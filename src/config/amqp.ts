import * as amqp from "amqplib";
import RabbitMqQueues from "../utils/constants/rabbitMqQueues.json";
import IRabbitMQService, {
    ExchangeTypes,
} from "../types/services/rabbitmq.service";

let connection: amqp.Connection | undefined;

export async function getConnection(): Promise<amqp.Connection> {
    try {
        if (!connection) {
            if (!process.env.AMQP_URL) {
                throw new Error("Please update connection url in env");
            }
            // make connection and return new connection
            connection = await amqp.connect(process.env.AMQP_URL!);

            return connection;
        }
        // return erxisting connection
        return connection;
    } catch (err) {
        throw err;
    }
}

export async function closeConnection(): Promise<void> {
    try {
        if (connection) {
            await connection.close();
        }
    } catch (err) {
        console.log(`Failed to close rabbitMQ connection`);
    } finally {
        connection = undefined;
    }
}

// Publishing to an exchange mostly when we perform create, delete and update functionalities
export async function publishToExchange(
    exchange: string,
    exchangeType: ExchangeTypes,
    routeKey: string,
    task: Buffer
): Promise<void> {
    const connection = await getConnection();

    const channel = await connection.createChannel();

    try {
        await channel.assertExchange(exchange, exchangeType, {
            durable: true,
        });

        channel.publish(exchange, routeKey, task, {
            persistent: true,
        });

        console.log(`message published to exchange: ${exchange}`);
    } catch (err) {
        console.log(err);
    } finally {
        await channel.close();
    }
}

// Publishing to a queue mostly when another service requests to get information (get request)
export async function publishToQueue(
    queue: string,
    task: Buffer,
    options?: {
        assert?: amqp.Options.AssertQueue;
        publish?: amqp.Options.Publish;
    }
): Promise<void> {
    const connection = await getConnection();

    const channel = await connection.createChannel();

    try {
        await channel.assertQueue(queue, {
            ...options?.assert,
            durable: options?.assert?.durable ?? true,
        });

        channel.sendToQueue(queue, task, {
            ...options?.publish,
            persistent: options?.publish?.persistent ?? true,
        });

        console.log(`message published to queue: ${queue}`);
    } catch (err) {
        console.log(err);
    } finally {
        await channel.close();
    }
}

/**
 * Registers a new RabbitMQ consumer for the specified exchange.
 *
 * @param config Configuration object for the consumer.
 * @param msgConsumer Function to be called when a message is received.
 * @throws Error  If an error occurs during consumer registration.
 */

export async function registerConsumer(
    config: {
        exchange: string;
        exchangeType: ExchangeTypes;
        queueName?: string;
        routingKey?: string;
    },
    msgConsumer: (props: {
        attempt: number;
        routeKey?: string;
        data: any;
    }) => Promise<void>
): Promise<void> {
    try {
        const { exchange, exchangeType, queueName, routingKey } = config;

        const connection = await getConnection();

        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, exchangeType, { durable: true });

        const queueParams: amqp.Options.AssertQueue = queueName
            ? {
                  durable: true,
              }
            : {
                  exclusive: true,
              };

        const queue = await channel.assertQueue(queueName ?? "", queueParams);

        if (routingKey) {
            await channel.bindQueue(
                queueName ?? queue.queue,
                exchange,
                routingKey
            );
        }
        // process the message
        // We need to ensure that when consuming a message, if there is a replyTo Key, we need to reply to that queue with the processed data
        channel.consume(queueName ?? queue.queue, async (msg) => {
            if (!msg) {
                return;
            }
            try {
                const routeKey = msg?.fields.routingKey;

                if (msg?.content) {
                    const jsonData = JSON.parse(msg?.content?.toString());

                    await msgConsumer({
                        attempt: 1,
                        routeKey,
                        data: jsonData,
                    });

                    channel.ack(msg);
                }
            } catch (err) {
                console.log(err);
                // SEND MESSAGE TO DEAD LETTER QUEUE SINCE IT CANNOT BE PROCESSED
                channel.sendToQueue(
                    RabbitMqQueues.DEAD_LETTER.name,
                    msg.content
                );

                channel.ack(msg!);

                // SEND MESSAGE TO SLACK TO VERIFY ERROR
            }
        });
    } catch (err) {
        throw err;
    }
}

const sampleConsumer = async (props: {
    attempt: number;
    routeKey?: string;
    data: any;
}): Promise<void> => {
    const { attempt, data, routeKey } = props;

    const MAX_RETRIES_ATTEMPT = 2;

    if (attempt > MAX_RETRIES_ATTEMPT) {
        throw new Error("Attained max retries");
    }

    try {
        console.log("Processing message");
        // Continue normal msg processing
    } catch (err) {
        // retry logic
        if (attempt < MAX_RETRIES_ATTEMPT) {
            // calculate backoff delay
            const delay = calculateBackoffDelay(attempt, 1000);
            console.warn(
                `Error processing message ${attempt}/${MAX_RETRIES_ATTEMPT} times`
            );
            console.warn(err);
            // delay for <delay> secs before retry
            await new Promise((resolve) => setTimeout(resolve, delay));
            // attempt retry
            await sampleConsumer({ attempt: attempt + 1, routeKey, data });
        } else {
            // Exceeded max retries, throw err
            throw err;
        }
    }
};

function calculateBackoffDelay(
    attempt: number,
    baseDelay: number = 1000
): number {
    const MAX_BACKOFF_DELAY = 3000; // SHOULD DELAY MAX OF 3SECS BEFORE RESUME FUNCTION
    // Exponential backoff with jitter
    const jitter = Math.random() * baseDelay;
    return Math.min(baseDelay * 2 ** (attempt - 1) + jitter, MAX_BACKOFF_DELAY);
}

const rabbitMQService: IRabbitMQService = {
    closeConnection,
    publishToExchange,
    publishToQueue,
    registerConsumer,
    getConnection,
};

export default rabbitMQService;
