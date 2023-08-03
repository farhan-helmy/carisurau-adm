import knexPg from ".";
import { generateAppSecret } from "../utils/generateSecret";

export const insertApp = async () => {
    // await knexPg("Application").insert({

    // })

    return generateAppSecret()
}