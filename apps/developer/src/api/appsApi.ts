import axiosInstance from "./index";

export type UserData = {
    email: string;
    token: string | null;
    name: string | null;
};

type AppData = {
    id: string;
    name: string;
}

type PostAppData = {
    name: string;
    developer_id: string;
}

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
