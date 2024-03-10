import * as amqp from "amqplib";

class RabbitMQService {
    private static instance: RabbitMQService | null = null;
    private connection: amqp.Connection | null = null;

    private constructor() {
        // private constructor to enforce the Singleton pattern
    }

    static getInstance(): RabbitMQService {
        if (!RabbitMQService.instance) {
            RabbitMQService.instance = new RabbitMQService();
        }
        return RabbitMQService.instance;
    }

    async connect(): Promise<void> {
        if (this.connection) {
            console.log("Connection already established.");
            return;
        }

        try {
            this.connection = await amqp.connect(process.env.AMQP_URL!);
            console.log("Connected to RabbitMQ");
        } catch (err: any) {
            console.error("Error connecting to RabbitMQ:", err.message);
            throw err;
        }
    }

    async reconnect(): Promise<void> {
        try {
            this.connection = await amqp.connect(process.env.AMQP_URL!);
            console.log("Reconnected to RabbitMQ");
        } catch (err: any) {
            console.error("Error reconnecting to RabbitMQ:", err.message);
            throw err;
        }
    }

    async createChannel(): Promise<amqp.Channel> {
        try {
            if (!this.connection) {
                await this.reconnect();
            }

            const channel = await this.connection!.createChannel();
            console.log("Channel created");
            return channel;
        } catch (err: any) {
            console.error("Error creating channel:", err.message);
            throw err;
        }
    }

    async closeConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            console.log("Connection closed");
        }
    }
}

export default RabbitMQService.getInstance();
