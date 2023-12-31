/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppStore } from "../../store/appStore";
import { PostAppData, postApp } from "../../api/appsApi";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  appName: string;
}

type CreateAppFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CreateAppForm({ open, setOpen }: CreateAppFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const appStore = useAppStore();

  const mutation = useMutation({
    mutationFn: (data: PostAppData) => postApp(data),
    onSuccess: () => {
      return setOpen(false);
    },
    onError: () => {
      alert("Application already exist");
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate({
      name: data.appName,
      developer_id: appStore.id as string,
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <label
                    htmlFor="appName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Insert your app name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("appName", {
                        required: true,
                        maxLength: 20,
                      })}
                      type="text"
                      name="appName"
                      id="appName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="E.g: carisuraudev"
                    />
                    {errors.appName ? (
                      <span className="text-red-500 text-sm">
                        App name is required
                      </span>
                    ) : null}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => void handleSubmit(onSubmit)()}
                      className="mt-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
