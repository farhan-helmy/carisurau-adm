import { useMutation } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/clerk-react";
import { redirect } from "react-router-dom";
import axios from "axios";

type UserData = {
  email: string;
  is_developer: boolean;
  token: Promise<string | null>;
};
export default function CallbackPage() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: UserData) =>
      axios.post(
        (import.meta.env.VITE_API_URL as string) + "/auth/social",
        data
      ),
    onSuccess: () => {
      return redirect("/dashboard");
    },
    onError: () => {
      return redirect("/");
    },
  });

  mutation.mutate({
    email: user?.emailAddresses[0].toString() as string,
    is_developer: true,
    token: getToken().then((token) => token),
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600"></div>
      <div className="mt-2 text-xl ">loading ...</div>
    </div>
  );
}
