import "dotenv/config";
import startServer from "./src";
import connectToDb from "./src/db/index.db";
import Database from "./src/data-access";
import Services from "./src/types/services";
import rabbitMQService from "./src/config/amqp";
import redisService from "./src/services/redis";

(async () => {
    // init db connection before running server
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        throw new Error("Please submit database url!");
    }

    await connectToDb(dbUrl);

    // start server (Ensure db is connected first before running the server)
    const services: Services = {
        rabbitMQService,
        redis: redisService,
    };

    const app = startServer(new Database(), services);

    // SETUP LISTENERS TO GRACEFULLY SHUTDOWN THE SYSTEM HERE
})();
