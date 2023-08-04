import knexPg from ".";
import { createId } from "@paralleldrive/cuid2";
import { SecretType, generateAppSecret } from "../utils/generateSecret";
import { AppRequestBody } from "../controllers/appController";

export type AppData = {
    id: string;
    name: string;
    appKey: string;
    appSecret: string;
}

export const getAllApp = async (developer_id: string) => {
    try {
        const result: AppData[] = await knexPg<AppData>("Application")
            .select("*")
            .where("developer_id", developer_id)
        console.log(result)
        return { status: 200, result }
    } catch (err: any) {
        return { error: err.message, status: 500 }
    }
}

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

export const updateApp = async (data: AppRequestBody) => {
    try {
        await knexPg("Application")
            .update({
                name: data.name
            })
            .where("id", data.id)

        return { message: "Updated", status: 200 }
    } catch (err: any) {
        return { error: err.message, status: 500 }
    }
}