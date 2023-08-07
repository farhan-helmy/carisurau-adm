import { insertApp, getAllApp, updateApp, AppData } from "../db/app";

interface CreateAppResponse {
    status: number;
    message?: string;
}

export type AppRequestBody = {
    id: string
    name: string;
    developer_id: string;
}

type AppResponse = {
    result?: AppData[];
}

export default class PingController {
    public async getApp(developer_id: string): Promise<AppResponse> {
        const res = await getAllApp(developer_id)
        return res
    }
    public async createApp(data: AppRequestBody): Promise<CreateAppResponse> {
        const res = await insertApp(data)
        return res
    }
    public async patchApp(data: AppRequestBody): Promise<CreateAppResponse> {
        const res = await updateApp(data)
        return res
    }
}
