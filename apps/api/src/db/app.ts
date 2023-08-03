import knexPg from ".";
import { createId } from "@paralleldrive/cuid2";
import { SecretType, generateAppSecret } from "../utils/generateSecret";
import { AppRequestBody } from "../controllers/appController";

export const insertApp = async (data: AppRequestBody) => {
    try {
        await knexPg("Application").insert({
            id: createId(),
            name: data.name,
            appKey: generateAppSecret(SecretType.KEY, 8),
            appSecret: generateAppSecret(SecretType.SECRET, 32),
            developer_id: data.developer_id
        })

        return { message: "Created", status: 201 }
    } catch (err: any) {
        return { error: err.message, status: 500 }
    }

}