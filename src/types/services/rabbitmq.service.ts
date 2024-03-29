import * as amqp from "amqplib";

export type ExchangeTypes = "direct" | "fanout" | "topic";

export default interface IRabbitMQService {
    closeConnection(): Promise<void>;
    publishToQueue(queue: string, task: Buffer): Promise<void>;
    publishToExchange(
        exchange: string,
        exchangeType: ExchangeTypes,
        routeKey: string,
        task: Buffer
    ): Promise<void>;
    registerConsumer(
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
    ): Promise<void>;
    getConnection?(): Promise<amqp.Connection>;
}
