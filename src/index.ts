import express from "express";
import morgan from "morgan";
import responseHandler from "./utils/responseHandler";
import router from "./routes";
import repositoriesInjector from "./middlewares/repositoriesInjector";
import RepositoryLocator from "./types/RepositoryLocator";

const PORT = process.env.PORT || 5001;

// This function will start our express app and inject database repositories. This will greately help for mocking our databases for tests
const startApp = (repositoryLocator: RepositoryLocator) => {
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
    app.use(repositoriesInjector(repositoryLocator));

    // INTITIALISE RESPONSEHANDLER
    app.use(responseHandler);

    // Define routes here
    app.use("/api/companies", router);

    const server = app.listen(PORT, () => {
        console.log(`Companies service running on port ${PORT}`);
    });

    return { app, server };
};

export default startApp;
