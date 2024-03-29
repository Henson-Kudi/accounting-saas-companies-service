import IRabbitMQService from "../../../../src/types/services/rabbitmq.service";

const rabbitMQService: IRabbitMQService = {
    async closeConnection() {
        console.log("RabbitMQ: Connection closed success");
    },
    // async getConnection() {
    //     console.log("new rabbit mq connection established");
    //     throw new Error("no implementation");
    // },
    async publishToExchange(exchange, exchangeType, routeKey, task) {
        console.log(task?.toString(), "\n published");
    },
    async publishToQueue(queue, task) {
        console.log(task?.toString(), "\n published");
    },
    async registerConsumer(config, msgConsumer) {
        console.log("consumer registered");
    },
};

export default rabbitMQService;
