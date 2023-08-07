import axios from "axios";

export type UserData = {
    email: string;
    token: string | null;
    name: string | null;
};

type AppData = {
    id: string;
    name: string;
}

export const getApps = async (id: string) => {

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token") as string}`,
        }
    });

    return await axiosInstance.get<AppData[]>(
        (import.meta.env.VITE_API_URL as string) + `/app/developer/${id}`,
    )
};
