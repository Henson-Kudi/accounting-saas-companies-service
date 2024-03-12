//  Create a company
// import { CompaniesDb } from "../../data-access";
import publishMessage from "../../services/rabbitMQ/publisher";
import { rabbitMQPublishers } from "../../utils/constants/rabbitMQPublisher";
import CompanySchema from "../../schema-entities/Company.schema";
import { FlattenMaps } from "mongoose";
import IDatabase from "../../types/database";

export default async function createCompany(
    { CompaniesDb }: IDatabase,
    data: CompanySchema | CompanySchema[]
): Promise<FlattenMaps<CompanySchema | CompanySchema[]> | null> {
    try {
        const createdCompany = await CompaniesDb.create(data);

        // publish a message to rabbitMQ informing other services of a new company registered
        await publishMessage(
            rabbitMQPublishers.companyCreated,
            JSON.stringify(createdCompany)
        );

        console.log(createdCompany);

        return createdCompany;
    } catch (err) {
        throw err;
    }
}
