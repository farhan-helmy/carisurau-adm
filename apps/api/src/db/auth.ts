import { createId } from "@paralleldrive/cuid2";
import knexPg from ".";

type AuthenticateUserData = {
    email: string;
    is_developer: boolean;
    sid: string;
}

export const authenticateUser = async (data: AuthenticateUserData) => {
   try{
    const user = await knexPg("User").where({ email: data.email }).first();
    console.log("user", user)
    if (user) {
        const updatedUser = await knexPg("User").where({ email: data.email }).update({ token: data.sid, is_developer: data.is_developer }).returning("*");
        return updatedUser;
    } else {
        const newUser = await knexPg("User").insert({ id: createId(), email: data.email, is_developer: data.is_developer, token: data.sid }).returning("*");
        return newUser;
    }
   }catch(err: any){
       console.log(err)
       return err
   }    
}