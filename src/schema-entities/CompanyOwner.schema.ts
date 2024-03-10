import { prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import Address from "../types/Address";
import Contact from "../types/Contact";
import Joi from "@hapi/joi";

const email = Joi.string().email().required();

class AddressSchema implements Address {
    public line1!: string;
    public line2?: string | undefined;
    public line3?: string | undefined;
    public type!: "Home" | "Work" | "Other";
}

class ContactSchema implements Contact {
    public phone!: string;
    public type!: "Home" | "Work" | "Mobile" | "WhatsApp" | "Main";
}

export default class CompanyOwnerSchema extends BaseDocument {
    constructor(
        data: Pick<
            CompanyOwnerSchema,
            | "name"
            | "addresses"
            | "contacts"
            | "subScriptionStart"
            | "subscriptionDuration"
            | "email"
        > &
            Omit<CompanyOwnerSchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, trim: true })
    public name!: string;

    @prop({
        required: true,
        trim: true,
        validate: {
            validator: (value: string) => {
                const { error } = email.validate(value);
                return !error;
            },
            message: (props: any) =>
                props?.reason?.message ?? "Invalid email address",
        },
    })
    public email!: string;

    @prop({ required: true, type: () => [AddressSchema] })
    public addresses!: AddressSchema[];

    @prop({ required: true, type: () => [ContactSchema] })
    public contacts!: ContactSchema[];

    @prop({ required: true })
    public subScriptionStart!: Date;

    @prop({ required: true })
    public subscriptionDuration!: number;

    @prop({ required: true, default: true })
    public isActive?: boolean;

    @prop({ required: true, default: false })
    public isDeleted?: boolean;

    // might need to add fields for isOwner & role (like viewer|modifier) if user is not owner - to handle cases of invites Users
    // When an owner invites a user, token is generated and if user accepts invitation, redirect to a page to fill required information like contact and addresses
}
