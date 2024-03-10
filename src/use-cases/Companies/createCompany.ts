//  Create a company
import { CompaniesDb } from "../../data-access";
import publishMessage from "../../services/rabbitMQ/publisher";
import { rabbitMQPublishers } from "../../utils/constants/rabbitMQPublisher";
import CompanySchema from "../../schema-entities/Company.schema";
import { FlattenMaps } from "mongoose";

export default async function createCompany(
    data: CompanySchema | CompanySchema[]
): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
    try {
        const createdCompany = await CompaniesDb.create(data);

        // publish a message to rabbitMQ informing other services of a new company registered
        await publishMessage(
            rabbitMQPublishers.companyCreated,
            JSON.stringify(createdCompany)
        );

        return createdCompany;
    } catch (err) {
        throw err;
    }
}
