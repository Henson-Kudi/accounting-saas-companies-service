import { NextFunction, Request, Response } from "express";
import RepositoryLocator from "../types/RepositoryLocator";

export default function repositoriesInjector(repositories: RepositoryLocator) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.repositories = repositories;

        next();
    };
}
