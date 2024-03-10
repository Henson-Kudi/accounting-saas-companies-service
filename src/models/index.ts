import { getModelForClass } from "@typegoose/typegoose";
import CompanyOwnerSchema from "../schema-entities/CompanyOwner.schema";
import CompanySchema from "../schema-entities/Company.schema";

export const CompanyOwner = getModelForClass(CompanyOwnerSchema);
export const Company = getModelForClass(CompanySchema);
