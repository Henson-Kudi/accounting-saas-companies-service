import { prop, Ref } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import CompanySchema from "./Company.schema";
import mongoose from "mongoose";

export default class CompanySecretSchema extends BaseDocument {
    constructor(
        data: Pick<CompanySecretSchema, "createdBy" | "company" | "secretKey"> &
            Omit<CompanySecretSchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        Object.assign(this, data);

        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, index: true, ref: () => CompanySchema })
    public company!: Ref<CompanySchema>;

    @prop({ required: true, index: true, unique: true })
    public secretKey!: string; // this should be a unique uuid

    @prop({ required: true, index: true })
    public createdBy!: mongoose.Types.ObjectId; // this must be a company owner
}
