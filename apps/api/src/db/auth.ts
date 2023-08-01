import { createId } from "@paralleldrive/cuid2";
import knexPg from ".";

type AuthenticateUserData = {
    email: string;
    sid: string;
    name: string;
    token: string;
}

export const authenticateUser = async (data: AuthenticateUserData) => {
    var returnData: AuthenticateUserData
    
   try{
    const developer = await knexPg("Developer").where({ email: data.email }).first();
    if (developer) {
        const updatedDeveloper = await knexPg("Developer").where({ email: data.email }).update({ token: data.sid }).returning("*");
        returnData = updatedDeveloper[0];
    } else {
        const newDeveloper = await knexPg("Developer").insert({ id: createId(), email: data.email, name: data.name, token: data.sid }).returning("*");
        returnData = newDeveloper[0];
    }
    returnData.token = data.token;
    return {
        data: returnData,
        status: 200
    }
   }catch(err: any){
       console.log(err)
       return {
        error: err.message,
        status: 500
       }
   }    
}