import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AppLayout from "../../components/layouts/AppLayout";

export default function AppPage() {
  const id = useParams();
  console.log(id);
  return (
    <DashboardLayout>
      <AppLayout>
        <h1>Coming soon...</h1>
      </AppLayout>
    </DashboardLayout>
  );
}
