import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import { OrderColumn } from './components/column'
import OrderClient from "./components/client"
import { formatter } from "@/lib/utils"

const BillBoardsPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItem: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createAt: "desc"
        }
    })
    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        isPaid: item.isPaid,
        address: item.address,
        products: item.orderItem.map((item) => (
            item.product
        )),
        totalPrice: formatter.format(item.orderItem.reduce((total, item) => {
            return total + Number(item.product.price) * item.quantity;
        }, 0)),
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <OrderClient data={formattedOrders} />
        </div>
    )
}

export default BillBoardsPage