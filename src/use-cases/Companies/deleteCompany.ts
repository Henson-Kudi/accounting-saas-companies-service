import { Types } from "mongoose";
import moment from "moment";
import { ICompaniesDb } from "../../types/database";
import Services from "../../types/services";
import CompanySchema from "../../schema-entities/Company.schema";
import { COMPANY_EXCHANGE } from "../../utils/constants/rabbitMqQueues.json";


export default async function deleteCompany(database: ICompaniesDb, services: Services, companyId: string | Types.ObjectId, update: Omit<CompanySchema, "updatedAt" | "_id" | "id" | 'createdBy' | 'createdAt' | 'isActive' | 'isDeleted'>): Promise<boolean> {
    // We need to update company's status to inactive and deleted.
    // Schedule a cron job that would run 30 days (can be custom) from now. This job will perform the actual deletion of the company. This job must be set by all other services as well to delete al related data of the created company. (Deleting can actually mean moving these items to a trash db that is not lost completely).
    // We need to publish a message to rabbitMQ of company deleted
    const deletedCompany = await database.findByIdAndUpdate(Types.ObjectId.createFromHexString(companyId?.toString()), {
        isActive: false,
        isDeleted: true
    }, { new: true })

    // Schedule cronJob that will run 30 days from now
    const _30daysFromNow = moment().add(30, 'days').toDate()
    // await services.jobs.scheduleJob(_30daysFromNow, DELETE_COMPANY,{
    //     ...deletedCompany
    // })

    // Publish company deleted event
    deletedCompany && await services.rabbitMQService.publishToExchange(COMPANY_EXCHANGE.name, 'topic', COMPANY_EXCHANGE.routeKeys.companyDeleted, Buffer.from(JSON.stringify(deletedCompany)))


    return deletedCompany ? true : false
}