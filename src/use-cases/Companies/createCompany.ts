//  Create a company
import _ from "lodash";
import CompanySchema from "../../schema-entities/Company.schema";
import mongoose, { FlattenMaps } from "mongoose";
import IDatabase from "../../types/database";
import Services from "../../types/services";
import { COMPANY_EXCHANGE } from "../../utils/constants/rabbitMqQueues.json";
import companyValidationSchema from "../../utils/validators/company.validator";
import { ValidationError } from "../../utils/responseData";
import slugify from "../../utils/slugify";

export default async function createCompany(
    { CompaniesDb }: IDatabase,
    data: any,
    services?: Services
): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
    try {
        // validate data
        await companyValidationSchema.validateAsync(data, {
            abortEarly: false,
        })

        // We want company names to be unique per user (owner)
        // group data by ownerId (if data is array)
        const found = await CompaniesDb.findOne({
            nameSlug: slugify(data?.name),
            createdBy: mongoose.Types.ObjectId.createFromHexString(data.owner)
        });

        if (found) {
            throw new ValidationError("Data contains duplicate keys", {
                message: "Company names must be unique per user.",
            });
        }

        const createdCompany = await CompaniesDb.create(data);

        services?.rabbitMQService?.publishToExchange(
            COMPANY_EXCHANGE.name,
            "topic",
            COMPANY_EXCHANGE.routeKeys.companyCreated,
            Buffer.from(JSON.stringify(createdCompany))
        );

        return createdCompany;
    } catch (err) {
        throw err;
    }
}
