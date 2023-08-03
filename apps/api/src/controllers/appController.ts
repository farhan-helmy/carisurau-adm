import { insertApp } from "../db/app";

interface AppResponse {
    status: number;
    message?: string;
}

export type AppRequestBody = {
    name: string;
    developer_id: string;
}

export default class PingController {
    public async createApp(data: AppRequestBody): Promise<AppResponse> {
        const res = await insertApp(data)
        return res
    }
}
