import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { AppData } from "../../api/appsApi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AppList({ name }: AppData) {
  return (
    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
      <img
        src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${name}`}
        alt={name}
        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
      />
      <div className="text-sm font-medium leading-6 text-gray-900">{name}</div>
      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  View<span className="sr-only">, {name}</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  Edit<span className="sr-only">, {name}</span>
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
