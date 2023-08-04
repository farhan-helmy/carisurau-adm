import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import CreateAppForm from "../components/CreateAppForm";
import { useQuery } from "@tanstack/react-query";
import { getApps } from "../api/appsApi";
import { useAppStore } from "../store/appStore";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const appStore = useAppStore();
  const { isLoading, isError, data, error } = useQuery(["apps"], () =>
    getApps(appStore.id as string)
  );

  console.log(data);

  // if (isError) console.log(error);

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600"></div>
  //       <div className="mt-2 text-xl ">loading ...</div>
  //     </div>
  //   );
  // }

  return (
    <DashboardLayout>
      <div className="flex justify-start mt-2">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create app
        </button>
        <div>{user?.emailAddresses[0].toString()}</div>
        <CreateAppForm open={open} setOpen={setOpen} />
        {/* <button onClick={() => void signOut()}>Log Out</button> */}
      </div>
    </DashboardLayout>
  );
}
