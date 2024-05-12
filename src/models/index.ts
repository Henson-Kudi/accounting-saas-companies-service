import { getModelForClass } from "@typegoose/typegoose";
import CompanySchema from "../schema-entities/Company.schema";
import CompanyStaffSchema from "../schema-entities/CompanyStaff.schema";
import CompanySecretSchema from "../schema-entities/CompanySecrets.schema";
import CompanyStaffInvitation from "../schema-entities/CompStaffInvites.schema";

export const CompanyStaff = getModelForClass(CompanyStaffSchema);
export const Company = getModelForClass(CompanySchema);
export const CompanySecret = getModelForClass(CompanySecretSchema);
export const StaffInvitation = getModelForClass(CompanyStaffInvitation);
