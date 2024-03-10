import { Ref, prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import CompanyOwner from "./CompanyOwner.schema";

export default class CompanySchema extends BaseDocument {
    constructor(
        data: Pick<CompanySchema, "name" | "owner"> &
            Omit<CompanySchema, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, trim: true, unique: true })
    public name!: string;

    @prop({ required: true, ref: () => CompanyOwner })
    public owner!: Ref<CompanyOwner>;

    @prop({ required: false, default: true })
    public isActive?: boolean;

    @prop({ required: false, default: false })
    public isDeleted?: boolean;
}
