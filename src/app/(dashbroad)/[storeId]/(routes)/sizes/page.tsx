import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import SizeClient from "./components/client"
import { SizeColumn } from './components/column'

const SizesPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <SizeClient data={formattedSizes} />
        </div>
    )
}

export default SizesPage