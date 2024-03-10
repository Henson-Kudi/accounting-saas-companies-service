import express from "express";
import morgan from "morgan";
import responseHandler from "./utils/responseHandler";
import router from "./routes";

const app = express();

const PORT = process.env.PORT || 5001;

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

// INTITIALISE RESPONSEHANDLER
app.use(responseHandler);

// Define routes here
app.use("/api/companies", router);

export const startServer = () =>
    app.listen(PORT, () => {
        console.log(`Companies service running on port ${PORT}`);
    });

export default app;
