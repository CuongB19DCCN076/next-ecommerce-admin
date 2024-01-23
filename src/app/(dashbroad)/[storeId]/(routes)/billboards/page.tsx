import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import BillboardClient from './components/client'
import { BillBoardColumn } from './components/column'

const BillBoardsPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: "desc"
        }
    })
    const formattedBillboards: BillBoardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <BillboardClient data={formattedBillboards} />
        </div>
    )
}

export default BillBoardsPage