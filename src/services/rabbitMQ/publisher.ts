import RabbitMQInstance from "../../config/amqp";

export default async function publishMessage(queue: string, task: string) {
    const channel = await RabbitMQInstance.createChannel();

    await channel.assertQueue(queue, {
        durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(task), {
        persistent: true,
    });

    console.log(`message published to queue: ${queue}`);
}
