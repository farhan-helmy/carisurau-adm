import axios, { AxiosResponse } from "axios";

export type UserData = {
  email: string;
  token: string | null;
  name: string | null;
};

type AuthResponse = {
  data: {
    token: string;
    email: string;
    createdAt: string;
    name: string;
  };
  status: number;
};

export const authenticateUserSocial = async (data: UserData) => {
  return await axios.post<AuthResponse>(
    (import.meta.env.VITE_API_URL as string) + "/auth/social",
    data
  );
};
