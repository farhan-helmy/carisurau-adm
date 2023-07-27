import { useClerk } from "@clerk/clerk-react";
import DashboardLayout from "../components/layouts/DashboardLayout";

export default function DashboardPage() {
  const { signOut } = useClerk();
  return (
    <DashboardLayout>
      <div>
        <button onClick={() => void signOut()}>Log Out</button>
      </div>
    </DashboardLayout>
  );
}
