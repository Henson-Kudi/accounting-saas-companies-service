import { prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import mongoose from "mongoose";
import SubscriptionType from "../types/subscription";
import CompanyRepType from "../types/companyRep";

class Subscription implements SubscriptionType {
    public package!: "Free" | "Standard" | "Pro" | "Enterprise";
    public end!: Date;
    public start!: Date;
}

class CompanyRep implements CompanyRepType {
    public address?: string | undefined;
    public email!: string;
    public phone!: string;
    public position!: string;
    public name!: string;
}

export default class CompanySchema extends BaseDocument {
    constructor(
        data: Pick<
            CompanySchema,
            "name" | "createdBy" | "representative" | "subScription"
        > &
            Omit<CompanySchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        Object.assign(this, data);

        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({
        required: true,
        trim: true,
        index: true,
        maxlength: 52,
        minlength: 3,
    })
    public name!: string;

    @prop({ required: true })
    public createdBy!: mongoose.Types.ObjectId;

    @prop({})
    public representative?: CompanyRep;

    @prop({ required: true })
    public subScription!: Subscription;

    @prop({ required: false, default: true })
    public isActive?: boolean;

    @prop({ required: false, default: false })
    public isDeleted?: boolean;
}
