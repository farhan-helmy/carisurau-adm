import { createId } from "@paralleldrive/cuid2";
import knexPg from ".";

type AuthenticateUserData = {
    email: string;
    sid: string;
}

export const authenticateUser = async (data: AuthenticateUserData) => {
   try{
    const developer = await knexPg("Developer").where({ email: data.email }).first();
    console.log("developer", developer)
    if (developer) {
        const updatedDeveloper = await knexPg("Developer").where({ email: data.email }).update({ token: data.sid }).returning("*");
        return updatedDeveloper;
    } else {
        const newDeveloper = await knexPg("Developer").insert({ id: createId(), email: data.email, token: data.sid }).returning("*");
        return newDeveloper;
    }
   }catch(err: any){
       console.log(err)
       return err
   }    
}