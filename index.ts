import "dotenv/config";
import { startServer } from "./src";
import connectToDb from "./src/db/index.db";
import { Server } from "http";

let server: Server | undefined;

const initialiseServer = async () => {
    // init db connection before running server
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        throw new Error("Please submit database url!");
    }

    await connectToDb(dbUrl);

    // start server (Ensure db is connected first before running the server)
    server = startServer();

    return server;
};

(async () => {
    await initialiseServer();

    // SETUP LISTENERS TO GRACEFULLY SHUTDOWN THE SYSTEM HERE
})();

// EXPORT SERVER FOR USE BY OTHER FILES(MAINLY TEST  FILES FOR NOW)
export { server };
