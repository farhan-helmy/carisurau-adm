import { createId } from "@paralleldrive/cuid2";
import jwt from 'jsonwebtoken'
import knexPg from ".";

type AuthenticateUserData = {
    email: string;
    sid: string;
    name: string;
    token: string;
}

export const checkUser = async (id: string) => {
    try {
        const developer = await knexPg("Developer").where({ id }).first();

        if (!developer) {
            return false
        }

        return {
            data: developer,
        }

    } catch (err: any) {
        console.log(err)
        return err
    }
}

export const authenticateUser = async (data: AuthenticateUserData) => {
    var returnData: AuthenticateUserData

    try {
        const developer = await knexPg("Developer").where({ email: data.email }).first();
        if (developer) {
            const updatedDeveloper = await knexPg("Developer").where({ email: data.email }).update({ token: data.sid }).returning("*");
            returnData = updatedDeveloper[0];
        } else {
            const newDeveloper = await knexPg("Developer").insert({ id: createId(), email: data.email, name: data.name, token: data.sid }).returning("*");
            returnData = newDeveloper[0];
        }

        const token = jwt.sign({ id: developer.id }, process.env.JWT_SECRET as string)

        returnData.token = token;
        return {
            data: returnData,
            status: 200
        }
    } catch (err: any) {
        console.log(err)
        return {
            error: err.message,
            status: 500
        }
    }
}

export const validateApp = async (app_key: string, app_secret: string) => {
    try {
        const app = await knexPg("Application").where({ appKey: app_key, appSecret: app_secret }).first();
        console.log(app)
        if (!app) {
            return {
                status: "failed"
            }
        }

        return {
            status: "success"
        }

    } catch (err: any) {

        return {
            status: "failed"
        }
    }
}