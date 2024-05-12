import IRabbitMQService from "./rabbitmq.service";
import IRedisService from "./redis";

export default interface Services {
    rabbitMQService: IRabbitMQService;
    redis: IRedisService;
}
