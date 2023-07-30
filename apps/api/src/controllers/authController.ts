import jwt from 'jsonwebtoken'
import { authenticateUser } from '../db/auth';

export type AuthSocialBody = {
    email: string;
    is_developer: boolean;
    token: string;
}

export default class AuthController {
    public async socialAuth(body: AuthSocialBody): Promise<any> {

        const token = jwt.decode(body.token, { complete: true })

        if (typeof token?.payload === 'object') {
          const res = authenticateUser({
            email: body.email,
            is_developer: body.is_developer,
            sid: token.payload.sid
          })

          return res
        }
    }
}