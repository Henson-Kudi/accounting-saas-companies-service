import IDatabase, { ICompaniesDb } from "../../src/types/database";
import { create, find, findById, findOne } from "./database/companies.mock";

export default class implements IDatabase {
    CompaniesDb: ICompaniesDb = { create, find, findById, findOne };
}
