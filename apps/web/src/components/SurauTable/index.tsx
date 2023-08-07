import { useEffect, useState } from "react";
import { Surau, columns } from "./columns";
import { DataTable } from "./data-table";

const data = [
  {
    id: "2",
    name: "Surau Al-Muhajirin",
    unique_name: "surau-al-muhajirin",
    is_approved: true,
    is_approved_at: new Date(),
    created_at: new Date(),
    state: "Selangor",
    district: "Petaling",
  },
];

const SurauTable = () => {
  const [surauData, setSurauData] = useState<Surau[]>([]);

  const getSurauData = async () => {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(import.meta.env.VITE_API_URL + "surau");
    const data = await response.json();
    // filter is_approved false
    const filteredData = data.filter(
      (surau: Surau) => surau.is_approved === false
    );

    setSurauData(data);
  };

  useEffect(() => {
    getSurauData();
  }, []);

  return (
    <div>
      {data ? (
        <div className="mt-8 flow-root p-12">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <DataTable columns={columns} data={surauData} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SurauTable;
