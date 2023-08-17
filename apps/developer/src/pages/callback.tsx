import { useMutation } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUserSocial } from "../api/authApi";
import { useAppStore } from "../store/appStore";
import { UserData } from "../api/appsApi";

export default function CallbackPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const appStore = useAppStore();

  const mutation = useMutation({
    mutationFn: (data: UserData) => authenticateUserSocial(data),
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      appStore.setId(data.id);
      return navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      return navigate("/");
    },
  });

  useEffect(() => {
    if (isLoaded) {
      getToken()
        .then((token) => {
          mutation.mutate({
            email: user?.emailAddresses[0].toString() as string,
            token: token,
            name: user?.fullName as string,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoaded]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600"></div>
      <div className="mt-2 text-xl ">loading ...</div>
    </div>
  );
}
