import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import CompanySchema from "../../schema-entities/Company.schema";
import CompanySecretSchema from "../../schema-entities/CompanySecrets.schema";

export interface ICompaniesDb {
    findOne(
        params?: mongoose.FilterQuery<CompanySchema>,
        projection?: mongoose.ProjectionType<CompanySchema>,
        options?: mongoose.QueryOptions
    ): Promise<FlattenMaps<CompanySchema> | null>;

    findById(
        id: any,
        projection?: mongoose.ProjectionType<CompanySchema>,
        options?: mongoose.QueryOptions
    ): Promise<FlattenMaps<CompanySchema> | null>;

    find(
        params?: mongoose.FilterQuery<CompanySchema>,
        projection?: mongoose.ProjectionType<CompanySchema>,
        options?: mongoose.QueryOptions
    ): Promise<FlattenMaps<CompanySchema>[] | null>;

    create(
        documents: CompanySchema | CompanySchema[]
    ): Promise<FlattenMaps<CompanySchema> | FlattenMaps<CompanySchema>[]>;
}

export interface ICompanySecretDb {
    getSecrets(
        filter: FilterQuery<CompanySecretSchema>,
        options?: QueryOptions<CompanySecretSchema>
    ): Promise<CompanySecretSchema[]>;

    getSecret(
        filter: FilterQuery<CompanySecretSchema>,
        options?: QueryOptions<CompanySecretSchema>
    ): Promise<CompanySecretSchema | null>;

    createSecret(
        data: { [key: string]: any } | CompanySecretSchema
    ): Promise<CompanySecretSchema>;

    deleteSecret(filter: FilterQuery<CompanySecretSchema>): Promise<number>;
}

export default interface IDatabase {
    CompaniesDb: ICompaniesDb;
    CompanyScecretDb: ICompanySecretDb;
}
