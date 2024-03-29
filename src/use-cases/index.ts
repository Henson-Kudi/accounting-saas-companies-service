// CORE BUSINESS LOGIC.
import IRepositoryLocator from "../types/RepositoryLocator";
import IUsersRepo from "../types/CompanyOwnersRepo";
import IDatabase from "../types/database";
import Services from "../types/services";
import CompaniesRepo from "./Companies";
import CompanyOwnersRepo from "./CompanyOwners";

export default class RepositoryLocator implements IRepositoryLocator {
    constructor(private database: IDatabase, private services?: Services) {}
    UsersRepo: IUsersRepo = new CompanyOwnersRepo(this.database, this.services);

    CompaniesRepo = new CompaniesRepo(this.database, this.services);
}
