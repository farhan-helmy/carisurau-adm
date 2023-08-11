import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/index.tsx";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import DashboardPage from "./pages/dashboard.tsx";
import CallbackPage from "./pages/callback.tsx";
import ErrorPage from "./pages/error.tsx";
import AppPage from "./pages/app/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <IndexPage />,
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
      {
        path: "/sign-in/*",
        element: (
          <div className="flex items-center justify-center h-screen">
            <div>
              <SignIn routing="path" path="/sign-in" />
            </div>
          </div>
        ),
      },
      {
        path: "/sign-up/*",
        element: (
          <div className="flex items-center justify-center h-screen">
            <div>
              <SignUp routing="path" path="/sign-up" />
            </div>
          </div>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <>
            <SignedIn>
              <DashboardPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/dashboard/:appId",
        element: (
          <>
            <SignedIn>
              <AppPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
