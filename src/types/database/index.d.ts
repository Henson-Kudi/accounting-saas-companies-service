import mongoose from "mongoose";

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

export default interface IDatabase {
    CompaniesDb: ICompaniesDb;
}
