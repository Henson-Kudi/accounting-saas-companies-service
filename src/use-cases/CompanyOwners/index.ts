import {
    FlattenMaps,
    FilterQuery,
    ProjectionType,
    QueryOptions,
} from "mongoose";
import IDatabase from "../../types/database";

import Services from "../../types/services";
import ICompanyOwnersRepo from "../../types/CompanyOwnersRepo";
import CompanyOwnerSchema from "../../schema-entities/CompanyStaff.schema";
import companyOwnerValidator from "../../utils/validators/owners.validator";

export default class CompanyOwnersRepo implements ICompanyOwnersRepo {
    constructor(private database: IDatabase, private services?: Services) {}
    async createUser(data: any): Promise<any> {
        try {
            if (Array.isArray(data)) {
                await Promise.all(
                    data?.map(
                        async (item) =>
                            await companyOwnerValidator.validateAsync(item, {
                                abortEarly: false,
                            })
                    )
                );
            } else {
                await companyOwnerValidator.validateAsync(data, {
                    abortEarly: false,
                });
            }

            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }
    updateOneUser(
        params: FilterQuery<CompanyOwnerSchema>,
        update: CompanyOwnerSchema,
        options?: any
    ): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateManyUsers(
        params: FilterQuery<CompanyOwnerSchema>,
        update: CompanyOwnerSchema,
        options?: any
    ): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findUsers(
        params?: any,
        projection?: any,
        options?: any
    ): Promise<CompanyOwnerSchema[] | null> {
        throw new Error("Method not implemented.");
    }
    findOneUser(
        params: FilterQuery<CompanyOwnerSchema>,
        projection?: any,
        options?: any
    ): Promise<CompanyOwnerSchema | null> {
        throw new Error("Method not implemented.");
    }
    findUserById(
        companyId: any,
        projection?: any,
        options?: any
    ): Promise<CompanyOwnerSchema | null> {
        throw new Error("Method not implemented.");
    }
}
