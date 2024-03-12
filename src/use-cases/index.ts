// CORE BUSINESS LOGIC.
import IRepositoryLocator from "../types/RepositoryLocator";
import IDatabase from "../types/database";
import CompaniesRepo from "./Companies";

export default class RepositoryLocator implements IRepositoryLocator {
    constructor(private database: IDatabase) {}

    CompaniesRepo = new CompaniesRepo(this.database);
}
