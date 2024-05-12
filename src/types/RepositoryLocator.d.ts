import ICompaniesRepo from "./CompaniesRepo";
import ICompanyOwnersRepo from "./CompanyOwnersRepo";
import ISecretsRepo from "./SecretsRepo";

export default interface RepositoryLocator {
    CompaniesRepo: ICompaniesRepo;
    UsersRepo: ICompanyOwnersRepo;

    SecretsRepo: ISecretsRepo
}
