import Services from "../../../src/types/services";
import rabbitMqMock from "./rabbitmq";

const mockServices: Services = {
    rabbitMQService: rabbitMqMock,
};

export default mockServices;
