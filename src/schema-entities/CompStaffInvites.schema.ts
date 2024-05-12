import { prop, Ref, pre } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import { Types } from "mongoose";
import CompanySchema from "./Company.schema";
import Joi from "@hapi/joi";
import moment from "moment";

@pre<CompanyStaffInvitation>("save", function () {
    if (this!.expiryDate) {
        this.deletionDate = moment(this.expiryDate).add(7, "days").toDate();
    } else {
        this.deletionDate = moment().add(7, "days").toDate();
    }
})
export default class CompanyStaffInvitation extends BaseDocument {
    constructor(
        data: Pick<
            CompanyStaffInvitation,
            | "company"
            | "invitee"
            | "inviter"
            | "role"
            | "department"
            | "token"
            | "expiryDate"
        > &
            Omit<
                CompanyStaffInvitation,
                "_id" | "id" | "updatedAt" | "deletionDate"
            >
    ) {
        super();

        Object.assign(this, data);

        if (data.createdAt) {
            this.createdAt = data.createdAt;
        }
    }

    // Company for invitee to collaborate in
    @prop({ required: true, ref: () => CompanySchema })
    company!: Ref<CompanySchema>;

    // Invitee
    @prop({
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v: string) => {
                const valid = Joi.string().email().validate(v);
                return !valid.error;
            },
            message: "Invalid email address",
        },
    })
    invitee!: string;

    // Inviter (Person inviting the user) => this will default to user manager if manager is not specified
    @prop({ required: true })
    inviter!: Types.ObjectId;

    // Role of invitee
    @prop({ required: false })
    role?: string;

    // Department of invitee
    @prop({ required: false })
    department?: Types.ObjectId;

    // Invitation token => Expires on expiry date of invitation => Defaults to 7 days from now.
    @prop({ required: true })
    token!: string;

    // expiry date of invitation => Defaults to 7 days from now. Must  be passed when creating the document because same date should be used to sign expiry of token field
    @prop({ required: true })
    expiryDate!: Date;

    // Deletion date from db => document will delete from db x number of days after token expiry. this is to give room to the inviter to reinvite the invitee if need be. Else invitation will be deleted permanently. This is 7 days after token expiry. This does not need to be passed when creatiing document.
    @prop({ required: true })
    deletionDate!: Date;
}
