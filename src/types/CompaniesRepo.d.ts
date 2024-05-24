import {
    FilterQuery,
    FlattenMaps,
    ProjectionType,
    QueryOptions,
} from "mongoose";
import CompanySchema from "../schema-entities/Company.schema";

export default interface ICompaniesRepo {
    createCompany(
        data: Pick<CompanySchema, "name" | "createdBy" | "representative" | "subScription"> & Omit<CompanySchema, "updatedAt" | "_id" | "id"> | CompanySchema
    ): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null>;
    findCompanies(
        params?: FilterQuery<CompanySchema>,
        projection?: ProjectionType<CompanySchema>,
        options?: QueryOptions<CompanySchema>
    ): Promise<CompanySchema[] | null>;
    findOneCompany(
        params: FilterQuery<CompanySchema>,
        projection?: ProjectionType<CompanySchema>,
        options?: QueryOptions<CompanySchema>
    ): Promise<CompanySchema | null>;
    findCompanyById(
        companyId: any,
        projection?: ProjectionType<CompanySchema>,
        options?: QueryOptions<CompanySchema>
    ): Promise<CompanySchema | null>;
}
