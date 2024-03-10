import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required(),
    // email: Joi.string().lowercase().email().optional().allow("").allow(null),
    // addressLine1: Joi.string().required(),
    // addressLine2: Joi.string().optional().allow(null).allow(""),
    // addressLine3: Joi.string().optional().allow(null).allow(""),
    owner: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Invalid owner id. Please pass valid id."),
    // subScriptionStart: Joi.date().optional().allow(null),
    // subscriptionDuration: Joi.number().optional().allow(null),
    isActive: Joi.boolean().optional(),
    isDeleted: Joi.boolean().optional(),
});

export const updateSchema = Joi.object({
    name: Joi.string().optional(),
    // email: Joi.string().lowercase().email().optional().allow("").allow(null),
    // addressLine1: Joi.string().optional(),
    // addressLine2: Joi.string().optional().allow(null).allow(""),
    // addressLine3: Joi.string().optional().allow(null).allow(""),
    // subScriptionStart: Joi.date().optional().allow(null),
    // subscriptionDuration: Joi.number().optional().allow(null),
    isActive: Joi.boolean().optional(),
    isDeleted: Joi.boolean().optional(),
});

// No one should be able to update owner, isActive or isDeleted when trying to update company details. Instead they should make a request to a special route

export default schema;
