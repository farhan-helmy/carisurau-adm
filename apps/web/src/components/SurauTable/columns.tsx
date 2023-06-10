import type { ColumnDef } from "@tanstack/react-table"
import {createColumnHelper} from '@tanstack/react-table'
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Surau = {
  id: string
  name: string
  unique_name: string
  is_approved: boolean
  is_approved_at: Date | null
  created_at: Date
  state: string
  district: string
  brief_direction: string
}

const approveSurau = async (id: string) => {
  console.log(id)
  const res = await fetch(`http://localhost:8000/surau/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    }
  })
  console.log(res)
}
 
export const columns: ColumnDef<Surau>[] = [
  {
    accessorKey: "name",
    header: "Surau",
  },
  {
    accessorKey: "unique_name",
    header: "Id",
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
    cell: ({row}) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-md"
            onClick={() => approveSurau(row.original.unique_name)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-md"
            onClick={() => alert(`Reject ${row}`)}
          >
            Reject
          </button>
          <button
            className="bg-blue-500 hover:bg-red-700 text-white font-bold rounded-md"
            onClick={() => alert(`direction ${row.original.brief_direction}`)}
          >
            View
          </button>
        </div>
      )
    },
  }
]