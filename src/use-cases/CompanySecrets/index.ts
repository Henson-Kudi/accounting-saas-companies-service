import { v4 as uuid } from "uuid";
import mongoose, { isValidObjectId } from "mongoose";
import CompanySecretSchema from "../../schema-entities/CompanySecrets.schema";
import { ICompanySecretDb } from "../../types/database";
import ISecretsRepo from "../../types/SecretsRepo";
import Services from "../../types/services";
import { randomBytes } from "crypto";
import generateKeyPair from "../../utils/generateKeyPair";

export default class SecretsRepo implements ISecretsRepo {
    constructor(private db: ICompanySecretDb, private services: Services) {}

    async getSecret(query: {
        [key: string]: any;
    }): Promise<CompanySecretSchema | null> {
        const filterQuery: { [key: string]: any } = {};

        Object.entries(query).map(([key, value]) => {
            if (isValidObjectId(value)) {
                filterQuery[key] =
                    mongoose.Types.ObjectId.createFromHexString(value);
            } else {
                filterQuery[key] = value;
            }
        });

        return await this.db.getSecret(filterQuery);
    }

    async getSecrets(query: {
        [key: string]: any;
    }): Promise<CompanySecretSchema[]> {
        const filterQuery: { [key: string]: any } = {};

        Object.entries(query).map(([key, value]) => {
            if (isValidObjectId(value)) {
                filterQuery[key] =
                    mongoose.Types.ObjectId.createFromHexString(value);
            } else {
                filterQuery[key] = value;
            }
        });

        return await this.db.getSecrets(filterQuery);
    }

    async createSecret(data: { [key: string]: any }): Promise<{
        privateKey: string;
        userId: string;
        company: string;
        passPhrase: string;
        keyId: string;
    }> {
        // Save secret infor to db
        // generate private and public keys
        // save public key to redis db
        // return private key and details to client

        if (
            !data.createdBy ||
            !data.company ||
            !isValidObjectId(data.company) ||
            !isValidObjectId(data.createdBy)
        ) {
            throw new Error("Invalid data");
        }

        const secretKey = uuid();
        const passPhrase = data?.passPhrase
            ? data?.passPhrase
            : randomBytes(32).toString("base64");

        const keyPair = generateKeyPair(passPhrase);

        const savedSecret = this.db.createSecret({
            company: data.company,
            createdBy: data.createdBy,
            secretKey,
        });

        if (!savedSecret) {
            throw new Error("Error saving secret");
        }

        // Save public key to redis db
        await this.services.redis.setItem(
            secretKey,
            JSON.stringify({
                publicKey: keyPair.publicKey,
                passPhrase,
                userId: data.createdBy,
                company: data.company,
            })
        );

        // Return private key and details to client
        return {
            privateKey: keyPair.privateKey,
            userId: data.createdBy,
            company: data.company,
            passPhrase,
            keyId: secretKey,
        };
    }

    async deleteSecrets(query: { [key: string]: any }): Promise<number> {
        const filterQuery: { [key: string]: any } = {};

        Object.entries(query).map(([key, value]) => {
            if (isValidObjectId(value)) {
                filterQuery[key] =
                    mongoose.Types.ObjectId.createFromHexString(value);
            } else {
                filterQuery[key] = value;
            }
        });

        const found = await this.db.getSecrets(filterQuery);

        if (!found.length) {
            return 0;
        }

        const deleted = await this.db.deleteSecret(filterQuery);

        // Delete related keys in redis
        await Promise.all(
            found.map(
                async (secret) =>
                    await this.services.redis.removeItem(secret.secretKey)
            )
        );

        return deleted;
    }
}
