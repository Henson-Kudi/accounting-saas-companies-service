//  Create a company
import _ from "lodash";
import CompanySchema from "../../schema-entities/Company.schema";
import mongoose, { FlattenMaps } from "mongoose";
import IDatabase from "../../types/database";
import Services from "../../types/services";
import { COMPANY_EXCHANGE } from "../../utils/constants/rabbitMqQueues.json";
import companyValidationSchema from "../../utils/validators/company.validator";
import { ValidationError } from "../../utils/responseData";

export default async function createCompany(
    { CompaniesDb }: IDatabase,
    data: any,
    services?: Services
): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
    try {
        // validate data
        await Promise.all(
            (Array.isArray(data) ? data : [data]).map(
                async (data) =>
                    await companyValidationSchema.validateAsync(data, {
                        abortEarly: false,
                    })
            )
        );

        // We want company names to be unique per user (owner)
        // group data by ownerId (if data is array)
        if (Array.isArray(data)) {
            const groupedData = _.groupBy(data, (item) =>
                item?.owner?.toString()
            );

            // for each owner find duplicated company names
            await Promise.all(
                Object.entries(groupedData).map(async ([key, value]) => {
                    const names = value?.map(
                        (item) =>
                            new RegExp(item?.name?.trim()?.toLowerCase(), "i")
                    );

                    const found = await CompaniesDb.findOne({
                        name: {
                            $in: names,
                        },
                        owner: mongoose.Types.ObjectId.createFromHexString(key),
                    });

                    if (found) {
                        throw new ValidationError(
                            "Data contains duplicate keys",
                            {
                                message:
                                    "Company names must be unique per user.",
                            }
                        );
                    }
                })
            );
        } else {
            const found = await CompaniesDb.findOne({
                name: {
                    $regex: data?.name?.trim()?.toLowerCase(),
                    $options: "i",
                },
                owner: mongoose.Types.ObjectId.createFromHexString(data.owner),
            });

            if (found) {
                throw new ValidationError("Data contains duplicate keys", {
                    message: "Company names must be unique per user.",
                });
            }
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
