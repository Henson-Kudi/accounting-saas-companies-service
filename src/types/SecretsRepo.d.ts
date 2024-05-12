import CompanySecretSchema from "../schema-entities/CompanySecrets.schema";

export default interface ISecretsRepo {
    getSecret(query: {
        [key: string]: any;
    }): Promise<CompanySecretSchema | null>;
    getSecrets(query: { [key: string]: any }): Promise<CompanySecretSchema[]>;
    createSecret(data: { [key: string]: any }): Promise<{
        privateKey: string;
        userId: string;
        company: string;
        passPhrase: string;
        keyId: string;
    }>;
    deleteSecrets(query: { [key: string]: any }): Promise<number>;
}
