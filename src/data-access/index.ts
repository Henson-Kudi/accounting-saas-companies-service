// THIS IS WHERE WE ABSTRACT THE LOGIC OF OUR MODELS.

import IDatabase, { ICompaniesDb } from "../types/database";
import { findOne, findById, find, create } from "./Company.db";

export default class Database implements IDatabase {
    constructor() {
        console.log("Injected main db");
    }
    CompaniesDb: ICompaniesDb = {
        findOne,
        findById,
        find,
        create,
    };
}
