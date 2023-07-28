import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import CreateAppForm from "../components/CreateAppForm";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();

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
