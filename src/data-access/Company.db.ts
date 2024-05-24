import mongoose, { FlattenMaps, UpdateQuery } from "mongoose";
import CompanySchema from "../schema-entities/Company.schema";
import { Company } from "../models";

// DO NOT FORGET TO USE THESAME DATABASE WITH AUTH DB. sO THAT USERS (OWNERS) CAN BE USED AND POPULATED DIRECTLY. WE WOULD NOT NEED FULL OBJECT FOR REPRESENTATIVE OBJECT. JUST A USER ID WHICH CAN THEN BE POPULATED WHEN NEEDED.

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

export const findByIdAndUpdate = async function (id: mongoose.Types.ObjectId, update: UpdateQuery<Omit<CompanySchema, "createdAt" | "_id" | "id" | 'createdBy'>>, options?: mongoose.QueryOptions<CompanySchema>): Promise<FlattenMaps<CompanySchema> | null> {
    const updated = await Company.findOneAndUpdate({
        _id: id,
        isActive: true,
        isDeleted: false
    }, update, options ?? { new: true })

    if (!updated) {
        return null
    }

    return updated.toJSON()
}
