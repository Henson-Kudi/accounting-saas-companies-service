import ICompaniesRepo from "./CompaniesRepo";
import ICompanyOwnersRepo from "./CompanyOwnersRepo";

export default interface RepositoryLocator {
    CompaniesRepo: ICompaniesRepo;
    UsersRepo: ICompanyOwnersRepo;
}
