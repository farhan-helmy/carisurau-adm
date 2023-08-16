import DashboardLayout from "../../components/layouts/DashboardLayout";
import AppLayout from "../../components/layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getApp } from "../../api/appsApi";
import { useParams } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ApiPage() {
  return (
    <DashboardLayout>
      <AppLayout>
        <div className="text-2xl text-black">API Key</div>
        <div className="text-sm text-black">View and manage your app key</div>
        <SecretCard />
      </AppLayout>
    </DashboardLayout>
  );
}

function SecretCard() {
  const [showSecret, setShowSecret] = useState(false);
  const param = useParams();

  const { data, isLoading, isError } = useQuery(["app"], () =>
    getApp(param.appId as string)
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const secretKeyToShow = showSecret
    ? data?.data.appSecret
    : hideSecretKey(data?.data.appSecret as string, false);

  return (
    <div className="w-full mt-4 flex flex-col bg-gray-100 rounded-xl p-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="font-semibold">App Key</div>
          <div>
            {showSecret ? (
              <button>
                <EyeSlashIcon
                  onClick={() => setShowSecret(false)}
                  className="h-4 w-4"
                />
              </button>
            ) : (
              <button>
                <EyeIcon
                  onClick={() => setShowSecret(true)}
                  className="h-4 w-4"
                />
              </button>
            )}
          </div>
        </div>

        <div className="text-md italic">{data?.data.appKey}</div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="font-semibold">App Secret</div>
        <div className="text-md italic">{secretKeyToShow}</div>
      </div>
    </div>
  );
}

function hideSecretKey(secretKey: string, visible: boolean): string {
  if (visible) {
    return secretKey;
  }

  const visibleCharacters = 11;
  const hiddenPart = "•".repeat(secretKey.length - visibleCharacters);
  const visiblePart = secretKey.substring(0, visibleCharacters);
  const hiddenKey = `${visiblePart}${hiddenPart}`;

  return hiddenKey;
}
