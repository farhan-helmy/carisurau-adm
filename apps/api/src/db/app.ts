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
        const data: AppData[] = await knexPg<AppData>("Application")
            .select("*")
            .where("developer_id", developer_id)

        return data
    } catch (err: any) {
        return err
    }
}

export const insertApp = async (data: AppRequestBody) => {
    try {

        const app = await knexPg("Application")
            .select('*')
            .where("name", data.name)
            .andWhere("developer_id", data.developer_id)
            .first()

        if (app) {
            console.log("App already exists")
            return { message: "App already exists", status: 409 }
        }
        console.log("Creating app")
        await knexPg("Application").insert({
            id: createId(),
            name: data.name,
            appKey: generateAppSecret(SecretType.KEY, 8),
            appSecret: generateAppSecret(SecretType.SECRET, 32),
            developer_id: data.developer_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return { message: "Created", status: 201 }
    } catch (err: any) {
        console.log(err)
        return { message: "Something went wrong", status: 500 }
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

export const deleteApp = async (app_id: string) => {
    try {
        await knexPg("Application")
            .delete()
            .where("id", app_id)

        return { message: "Deleted", status: 200 }
    } catch (err: any) {
        return { error: err.message, status: 500 }
    }
}