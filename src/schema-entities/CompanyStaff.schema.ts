import { index, prop, Ref } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import CompanySchema from "./Company.schema";
import mongoose from "mongoose";

@index({ company: 1, user: 1 }, { unique: true })
export default class CompanyStaffSchema extends BaseDocument {
    constructor(
        data: Pick<
            CompanyStaffSchema,
            "user" | "company" | "department" | "reportsTo" | "roles"
        > &
            Omit<CompanyStaffSchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        Object.assign(this, data);

        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, index: true, ref: () => CompanySchema })
    public company!: Ref<CompanySchema>;

    @prop({ required: true, index: true })
    public user!: mongoose.Types.ObjectId;

    // department
    // Just a description of a department to which a staff belongs
    @prop({})
    public department?: string;

    // reportsTo
    // userId of staff's manager
    @prop({ required: true })
    public reportsTo?: mongoose.Types.ObjectId;

    @prop({})
    public roles?: string[]; //Roles should be part of roles management system
    // For roles. We might want to change it to role (single role per user). A user can have owner role (root user access), Editor role(access to almost every resource except those that must be managed by root user such as api keys), Viewer role (access to view all resources of the organisation) and a Custom role that can be created and attached permissions.
}
