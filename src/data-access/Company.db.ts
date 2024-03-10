import mongoose, { FlattenMaps } from "mongoose";
import CompanySchema from "../schema-entities/Company.schema";
import { Company } from "../models";

// Access to companies db model
export const findOne = async function (
    params?: mongoose.FilterQuery<CompanySchema>,
    projection?: mongoose.ProjectionType<CompanySchema>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<CompanySchema> | null> {
    try {
        const foundData = await Company.findOne(params, projection, options);
        return foundData?.toJSON() ?? null;
    } catch (err) {
        throw err;
    }
};

export const findById = async function (
    id: any,
    projection?: mongoose.ProjectionType<CompanySchema>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<CompanySchema> | null> {
    try {
        const foundData = await Company.findById(id, projection, options);

        return foundData?.toJSON() ?? null;
    } catch (err) {
        throw err;
    }
};

export const find = async function (
    params?: mongoose.FilterQuery<CompanySchema>,
    projection?: mongoose.ProjectionType<CompanySchema>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<CompanySchema>[] | null> {
    try {
        const foundData = await Company.find(params ?? {}, projection, options);

        return foundData?.map((value) => value?.toJSON()) ?? null;
    } catch (err) {
        throw err;
    }
};

export const create = async function (
    documents: CompanySchema | CompanySchema[]
): Promise<FlattenMaps<CompanySchema> | FlattenMaps<CompanySchema>[]> {
    try {
        const createdCompany = await Company.create(documents);

        const jsonData = Array.isArray(createdCompany)
            ? createdCompany?.map((item) => item?.toJSON())
            : createdCompany?.toJSON();

        return jsonData;
    } catch (err) {
        throw err;
    }
};
