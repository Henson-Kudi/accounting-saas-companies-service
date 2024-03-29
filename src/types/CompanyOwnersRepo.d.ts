import CompanyOwnerSchema from "../schema-entities/CompanyOwner.schema";

export default interface ICompanyOwnersRepo {
    createUser(
        data: CompanyOwnerSchema | CompanyOwnerSchema[]
    ): Promise<FlattenMaps<CompanyOwnerSchema | CompanyOwnerSchema[]> | null>;
    updateOneUser(
        params: FilterQuery<CompanyOwnerSchema>,
        update: CompanyOwnerSchema,
        options?: QueryOptions<CompanyOwnerSchema>
    ): Promise<FlattenMaps<CompanyOwnerSchema | CompanyOwnerSchema[]> | null>;
    updateManyUsers(
        params: FilterQuery<CompanyOwnerSchema>,
        update: CompanyOwnerSchema,
        options?: QueryOptions<CompanyOwnerSchema>
    ): Promise<FlattenMaps<CompanyOwnerSchema | CompanyOwnerSchema[]> | null>;
    findUsers(
        params?: FilterQuery<CompanyOwnerSchema>,
        projection?: ProjectionType<CompanyOwnerSchema>,
        options?: QueryOptions<CompanyOwnerSchema>
    ): Promise<CompanyOwnerSchema[] | null>;
    findOneUser(
        params: FilterQuery<CompanyOwnerSchema>,
        projection?: ProjectionType<CompanyOwnerSchema>,
        options?: QueryOptions<CompanyOwnerSchema>
    ): Promise<CompanyOwnerSchema | null>;
    findUserById(
        companyId: any,
        projection?: ProjectionType<CompanyOwnerSchema>,
        options?: QueryOptions<CompanyOwnerSchema>
    ): Promise<CompanyOwnerSchema | null>;
}
