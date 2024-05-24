import { FlattenMaps, QueryOptions, Types } from "mongoose";
import { ICompaniesDb } from "../../types/database";
import CompanySchema from "../../schema-entities/Company.schema";
import Services from "../../types/services";
import { COMPANY_EXCHANGE } from "../../utils/constants/rabbitMqQueues.json";
import slugify from "../../utils/slugify";
import { companyUpdateSchema } from "../../utils/validators/company.validator";

export default async function UpdatedCompanyDetails(database: ICompaniesDb, services: Services, companyId: string | Types.ObjectId, update: Omit<CompanySchema, "updatedAt" | "_id" | "id" | 'createdBy' | 'createdAt' | 'isActive' | 'isDeleted'>, updateOptions?: QueryOptions<CompanySchema>): Promise<FlattenMaps<CompanySchema> | null> {
    // Make sure data to be update meets the required schema
    await companyUpdateSchema.validateAsync(update)
    // If there is name to be updated, we need to make sure the name does not already exist in user's list of created companies
    if (update.name) {
        const slugName = slugify(update.name)

        // We need to make request to roles service to get all owners of this company (users with role owner).
        // We need to ensure that all the roles do not have any company with given slug
        // const owners = await services.rabbitMQService.makeRequestToService()

        // const foundCompaniesWithSlug = await database.findOne({
        //     createdBy: {
        //         $in: owners?.map(owner => Types.ObjectId.createFromHexString(owner))
        //     },
        //     nameSlug: slugName
        // })

        // if (foundCompaniesWithSlug) {
        //     throw new BadRequestError({
        //         message: `You are owner of a company with existing company name: ${update.name}`
        //     })
        // }

    }

    const updatedCompany = await database.findByIdAndUpdate(Types.ObjectId.createFromHexString(companyId.toString()), update, updateOptions ?? {
        new: true
    })

    // Publish event of company updated
    services?.rabbitMQService?.publishToExchange(
        COMPANY_EXCHANGE.name,
        "topic",
        COMPANY_EXCHANGE.routeKeys.companyUpdated,
        Buffer.from(JSON.stringify(updatedCompany))
    );

    return updatedCompany


}