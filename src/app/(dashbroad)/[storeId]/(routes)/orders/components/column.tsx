"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Product } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
    id: string
    name: string
    phone: string
    address: string
    isPaid: boolean
    totalPrice: string
    products: Product[]
    createAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Sản phẩm",
        cell: ({ row }) => (
            <div className="flex flex-col">
                {row.original.products.map((product) => (
                    <div key={product.id}>
                        <span className=" font-semibold">{product?.name}</span>
                    </div>
                ))}
            </div>
        )
    },
    {
        accessorKey: "name",
        header: "Tên người nhận",
    },
    {
        accessorKey: "phone",
        header: "Điện thoại",
    },
    {
        accessorKey: "address",
        header: "Địa chỉ",
    },
    {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
    },
    {
        accessorKey: "isPaid",
        header: "Thanh toán",
    },
    {
        accessorKey: "createAt",
        header: "Day",
    },
]
