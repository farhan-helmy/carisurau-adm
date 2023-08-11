import { EyeIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { AppData } from "../../api/appsApi";
import { Link } from "react-router-dom";

export default function AppList({ name }: AppData) {
  return (
    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
      <img
        src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${name}`}
        alt={name}
        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
      />
      <div className="text-sm font-medium leading-6 text-gray-900">{name}</div>
      <div className="relative ml-auto flex gap-2">
        <Link
          className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"
          to={`/dashboard/${name}`}
        >
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
        <button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
          <Cog6ToothIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
