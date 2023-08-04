import jwt from 'jsonwebtoken'
import { authenticateUser } from '../db/auth';

export type AuthSocialBody = {
  email: string;
  token: string;
  name: string;
}

export default class AuthController {
  public async socialAuth(body: AuthSocialBody): Promise<any> {

    const token = jwt.decode(body.token, { complete: true })

    if (typeof token?.payload === 'object') {
      const res = authenticateUser({
        email: body.email,
        sid: token.payload.sid,
        name: body.name,
        token: body.token
      })

      return res
    }
  }
}