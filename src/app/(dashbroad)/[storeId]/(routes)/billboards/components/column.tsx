"use client"

import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillBoardColumn = {
    id: string
    label: string
    createAt: string
}

export const columns: ColumnDef<BillBoardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createAt",
        header: "Day",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
