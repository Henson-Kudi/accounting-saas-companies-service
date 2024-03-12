import {
    FlattenMaps,
    FilterQuery,
    ProjectionType,
    QueryOptions,
} from "mongoose";
import CompanySchema from "../../schema-entities/Company.schema";
import ICompaniesRepo from "../../types/CompaniesRepo";
import IDatabase from "../../types/database";
import createCompany from "./createCompany";
import {
    findCompanies,
    findCompanyById,
    findOneCompany,
} from "./findCompanies";

export default class CompaniesRepo implements ICompaniesRepo {
    constructor(private database: IDatabase) {}

    async createCompany(
        data: CompanySchema | CompanySchema[]
    ): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
        const createdCompany = await createCompany(this.database, data);
        return createdCompany;
    }

    async findCompanies(
        params?: FilterQuery<CompanySchema> | undefined,
        projection?: ProjectionType<CompanySchema> | undefined,
        options?: QueryOptions<CompanySchema> | undefined
    ): Promise<CompanySchema[] | null> {
        return await findCompanies(this.database, params, projection, options);
    }

    async findOneCompany(
        params: FilterQuery<CompanySchema>,
        projection?: ProjectionType<CompanySchema> | undefined,
        options?: QueryOptions<CompanySchema> | undefined
    ): Promise<CompanySchema | null> {
        return await findOneCompany(this.database, params, projection, options);
    }

    async findCompanyById(
        companyId: any,
        projection?: ProjectionType<CompanySchema> | undefined,
        options?: QueryOptions<CompanySchema> | undefined
    ): Promise<CompanySchema | null> {
        return await findCompanyById(
            this.database,
            companyId,
            projection,
            options
        );
    }
}
