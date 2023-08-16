import axiosInstance from "./index";

export type UserData = {
    email: string;
    token: string | null;
    name: string | null;
};

export type AppData = {
    id: string;
    name: string;
    appKey?: string;
    appSecret?: string
}

export type PostAppData = {
    name: string;
    developer_id: string;
}

export const getApp = async (id: string) => {
    return await axiosInstance.get<AppData>(
        `/app/${id}`,
    )
};

export const getApps = async (id: string) => {
    return await axiosInstance.get<AppData[]>(
        `/app/developer/${id}`,
    )

};

export const postApp = async (data: PostAppData) => {
    return await axiosInstance.post(
        "/app",
        data
    )
}

export const deleteApp = async (app_id: string) => {
    return await axiosInstance.delete(
        `/app/${app_id}`
    )
}
