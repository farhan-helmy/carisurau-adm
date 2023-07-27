import { Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env
  .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY as string;

function App() {
  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Outlet />
      </ClerkProvider>
    </>
  );
}

export default App;
