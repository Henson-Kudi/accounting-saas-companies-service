import IDatabase, {
    ICompaniesDb,
    ICompanySecretDb,
} from "../../src/types/database";
import { create, find, findById, findOne } from "./database/companies.mock";

export default class MockDatabase implements IDatabase {
    CompanyScecretDb: ICompanySecretDb = {
        getSecrets(filter: any) {
            throw new Error("Method not implemented.");
        },
        getSecret(filter: any) {
            throw new Error("Method not implemented.");
        },
        createSecret(data: any) {
            throw new Error("Method not implemented.");
        },
        deleteSecret(filter: any) {
            throw new Error("Method not implemented.");
        },
    };
    CompaniesDb: ICompaniesDb = { create, find, findById, findOne };
}
