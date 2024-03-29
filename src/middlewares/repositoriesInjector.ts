import { NextFunction, Request, Response } from "express";
import RepositoryLocator from "../use-cases";
import IDatabase from "../types/database";
import Services from "../types/services";

export default function repositoriesInjector(
    database: IDatabase,
    services?: Services
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const repositories = new RepositoryLocator(database, services);
        req.repositories = repositories;

        next();
    };
}
