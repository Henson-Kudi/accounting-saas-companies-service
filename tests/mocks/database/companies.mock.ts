import mongoose, { FlattenMaps } from "mongoose";
import Company from "./models/company";
import CompanySchema from "../../../src/schema-entities/Company.schema";

// Access to companies db model
export const findOne = async function (
    params?: mongoose.FilterQuery<CompanySchema>
) {
    try {
        const foundData = await Company.findOne(params);
        return foundData ?? null;
    } catch (err) {
        throw err;
    }
};

export const findById = async function (id: any) {
    try {
        const foundData = await Company.findById(id);

        return foundData ?? null;
    } catch (err) {
        throw err;
    }
};

export const find = async function (
    params?: mongoose.FilterQuery<CompanySchema>
) {
    try {
        const foundData = await Company.find(params ?? {});

        return foundData ?? null;
    } catch (err) {
        throw err;
    }
};

export const create = async function (
    documents: CompanySchema | CompanySchema[]
) {
    try {
        const createdCompany = await Company.create(documents);

        return createdCompany;
    } catch (err) {
        throw err;
    }
};
