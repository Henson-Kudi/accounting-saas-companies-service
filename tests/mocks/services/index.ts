import Services from "../../../src/types/services";
import rabbitMqMock from "./rabbitmq";

const mockServices: Services = {
    rabbitMQService: rabbitMqMock,
    redis: {
        async getItem(filter) {
            return "";
        },
        async removeItem(key) {
            return 1;
        },
        async setItem(key, value) {
            return "";
        },
    },
};

export default mockServices;
