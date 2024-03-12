import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import CompanySchema from "../../schema-entities/Company.schema";
import IDatabase from "../../types/database";

export async function findCompanies(
    { CompaniesDb }: IDatabase,
    params?: FilterQuery<CompanySchema>,
    projection?: ProjectionType<CompanySchema>,
    options?: QueryOptions<CompanySchema>
): Promise<CompanySchema[] | null> {
    try {
        const companies = await CompaniesDb.find(params, projection, options);
        return companies;
    } catch (err) {
        throw err;
    }
}

export async function findOneCompany(
    { CompaniesDb }: IDatabase,
    params: FilterQuery<CompanySchema>,
    projection?: ProjectionType<CompanySchema>,
    options?: QueryOptions<CompanySchema>
): Promise<CompanySchema | null> {
    try {
        const foundCompany = await CompaniesDb.findOne(
            params,
            projection,
            options
        );
        return foundCompany;
    } catch (err) {
        throw err;
    }
}

export async function findCompanyById(
    { CompaniesDb }: IDatabase,
    companyId: any,
    projection?: ProjectionType<CompanySchema>,
    options?: QueryOptions<CompanySchema>
): Promise<CompanySchema | null> {
    try {
        const foundCompany = await CompaniesDb.findById(
            companyId,
            projection,
            options
        );

        return foundCompany;
    } catch (err) {
        throw err;
    }
}
