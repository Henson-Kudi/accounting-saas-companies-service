import "dotenv/config";
import startServer from "./src";
import connectToDb from "./src/db/index.db";
import RepositoryLocator from "./src/use-cases";
import Database from "./src/data-access";

(async () => {
    // init db connection before running server
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        throw new Error("Please submit database url!");
    }

    await connectToDb(dbUrl);

    // start server (Ensure db is connected first before running the server)
    // server =
    const app = startServer(new RepositoryLocator(new Database()));

    // SETUP LISTENERS TO GRACEFULLY SHUTDOWN THE SYSTEM HERE
})();
