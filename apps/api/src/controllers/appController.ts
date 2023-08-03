import { insertApp } from "../db/app";

interface AppResponse {
  message: string;
}

export default class PingController {
  public async createApp(): Promise<AppResponse> {
    const res = await insertApp()
    console.log(res)
    return {
      message: "Created",
    };
  }
}
