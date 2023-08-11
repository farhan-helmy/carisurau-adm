import { useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import CreateAppForm from "../components/app/CreateAppForm";
import { useQuery } from "@tanstack/react-query";
import { getApps } from "../api/appsApi";
import { useAppStore } from "../store/appStore";
import AppList from "../components/app/AppList";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const appStore = useAppStore();
  const { isLoading, isError, data, error, refetch } = useQuery(["apps"], () =>
    getApps(appStore.id as string)
  );

  useEffect(() => {
    async function refetchData() {
      await refetch();
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetchData();
  }, [open]);

  if (isError) console.log(error);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600"></div>
        <div className="mt-2 text-xl ">loading ...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between mt-2">
        <div className="text-2xl font-semibold text-slate-800">Your apps</div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create app
        </button>
      </div>
      <div>
        <div className="mt-4">
          {data?.data?.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-12">
              <div className="text-2xl font-semibold">No apps created</div>
              <div className="mt-2 text-xl text-gray-500">
                Create your first app
              </div>
            </div>
          ) : (
            <>
              <ul
                role="list"
                className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
              >
                {data?.data.map((app, idx) => (
                  <li key={idx} className="rounded-xl border border-gray-200">
                    <AppList name={app.name} id={app.id} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <CreateAppForm open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
}
