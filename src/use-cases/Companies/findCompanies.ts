import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import { CompaniesDb } from "../../data-access";
import CompanySchema from "../../schema-entities/Company.schema";

export async function findCompanies(
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
