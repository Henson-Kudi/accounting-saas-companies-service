import { FilterQuery, QueryOptions } from "mongoose";
import CompanySecretSchema from "../schema-entities/CompanySecrets.schema";
import { CompanySecret } from "../models";

export const getSecret = async (
    filter: FilterQuery<CompanySecretSchema>,
    options?: QueryOptions<CompanySecretSchema>
): Promise<CompanySecretSchema | null> => {
    try {
        const foundData = await CompanySecret.findOne(
            filter,
            undefined,
            options
        );

        return foundData ? foundData?.toJSON() : null;
    } catch (err) {
        return null;
    }
};

export const getSecrets = async (
    filter: FilterQuery<CompanySecretSchema>,
    options?: QueryOptions<CompanySecretSchema>
): Promise<CompanySecretSchema[]> => {
    return (await CompanySecret.find(filter, undefined, options))?.map((item) =>
        item?.toJSON()
    );
};

export const createSecret = async (
    data: CompanySecretSchema | { [key: string]: any }
): Promise<CompanySecretSchema> => {
    const secret = new CompanySecret(data);

    const saved = await secret.save();
    return saved.toJSON();
};

export const deleteSecret = async (
    filter: FilterQuery<CompanySecretSchema>
): Promise<number> => {
    const deleted = await CompanySecret.deleteMany(filter);
    return deleted.deletedCount;
};
