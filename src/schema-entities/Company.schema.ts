import { prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import mongoose from "mongoose";
// import SubscriptionTypes from "../types/SubscriptionTypes";

type Subscription = {
    package: "Free" | "Standard" | "Pro" | "Enterprise";
    start: Date;
    end: Date;
};

type CompanyRep = {
    name: string;
    email: string;
    phone: string;
    address?: string;
    position: string;
    [key: string]: any;
};

export default class CompanySchema extends BaseDocument {
    constructor(
        data: Pick<
            CompanySchema,
            "name" | "owner" | "representative" | "subScription"
        > &
            Omit<CompanySchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        this.subScription = data.subScription;
        this.representative = data.representative;
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
    public owner!: mongoose.Types.ObjectId;

    @prop({})
    public representative?: CompanyRep;

    @prop({ required: true, enum: ["Free", "Standard", "Pro", "Enterprise"] })
    public subScription!: Subscription;

    @prop({ required: false, default: true })
    public isActive?: boolean;

    @prop({ required: false, default: false })
    public isDeleted?: boolean;
}
