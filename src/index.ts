import express from "express";
import morgan from "morgan";
import responseHandler from "./utils/responseHandler";
import router from "./routes";
import repositoriesInjector from "./middlewares/repositoriesInjector";
import IDatabase from "./types/database";
import Services from "./types/services";
import authenticationMiddleWare from "./middlewares/authentication";

const PORT = process.env.PORT || 5001;

// This function will start our express app and inject database repositories. This will greately help for mocking our databases for tests
const startApp = (database: IDatabase, services?: Services) => {
    const app = express();

    // use express.json
    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    // INITIALISE MORGAN FOR REQUEST LOGS
    app.use(
        morgan("dev", {
            skip(req, res) {
                return req.path === "/api/v0/swarm/peers";
            },
        })
    );

    // INJECT REPOSITORIES
    app.use(repositoriesInjector(database, services));

    // INTITIALISE RESPONSEHANDLER
    app.use(responseHandler);

    // Authenticate all requests to this service
    app.use(authenticationMiddleWare);

    // Define routes here
    app.use("/api/companies", router);

    const server = app.listen(PORT, () => {
        console.log(`Companies service running on port ${PORT}`);
    });

    return { app, server };
};

export default startApp;
