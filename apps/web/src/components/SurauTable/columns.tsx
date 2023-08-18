import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router-dom";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Surau = {
  id: string;
  name: string;
  unique_name: string;
  is_approved: boolean;
  is_approved_at: Date | null;
  created_at: Date;
  state: string;
  district: string;
  brief_direction: string;
};

const approveSurau = async (id: string) => {
  const res = await fetch(import.meta.env.VITE_API_URL + `surau/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteSurau = async (id: string) => {
  const res = await fetch(import.meta.env.VITE_API_URL + `surau/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const columns: ColumnDef<Surau>[] = [
  {
    accessorKey: "name",
    header: "Surau",
  },
  {
    accessorKey: "unique_name",
    header: "Id",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-left gap-2">
          <Link to={`/surau/${row.original.unique_name}`}>
            {row.original.unique_name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Approved",
  },
  {
    accessorKey: "is_approved_at",
    header: "Approved At",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [openViewModal, setOpenViewModal] = useState(false);
      return (
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white p-2 font-bold rounded-md"
            onClick={() => approveSurau(row.original.unique_name)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white p-2 font-bold rounded-md"
            onClick={() => deleteSurau(row.original.unique_name)}
          >
            Reject
          </button>
          <button
            className="bg-blue-500 hover:bg-red-700 text-white p-2 font-bold rounded-md"
            onClick={() => alert(`direction ${row.original.brief_direction}`)}
          >
            View
          </button>
        </div>
      );
    },
  },
];
