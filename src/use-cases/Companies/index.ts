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
import Services from "../../types/services";
import companyJoiSchema from "../../utils/validators/company.validator";

export default class CompaniesRepo implements ICompaniesRepo {
    constructor(private database: IDatabase, private services?: Services) {}

    async createCompany(
        data: any
    ): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
        // validate data with joi
        await Promise.all(
            (Array.isArray(data) ? data : [data]).map(
                async (item: any) => await companyJoiSchema.validateAsync(item)
            )
        );

        const newCompany = Array.isArray(data)
            ? data?.map((item: any) => new CompanySchema(item))
            : new CompanySchema(data);

        const createdCompany = await createCompany(
            this.database,
            newCompany,
            this.services
        );
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
