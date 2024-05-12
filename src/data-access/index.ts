// THIS IS WHERE WE ABSTRACT THE LOGIC OF OUR MODELS.

import IDatabase, { ICompaniesDb, ICompanySecretDb } from "../types/database";
import { findOne, findById, find, create } from "./Company.db";
import {
    createSecret,
    deleteSecret,
    getSecret,
    getSecrets,
} from "./Secrets.db";

export default class Database implements IDatabase {
    CompanyScecretDb: ICompanySecretDb = {
        createSecret,
        deleteSecret,
        getSecret,
        getSecrets,
    };
    CompaniesDb: ICompaniesDb = {
        findOne,
        findById,
        find,
        create,
    };
}
