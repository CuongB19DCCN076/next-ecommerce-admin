import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import ColorClient from "./components/client"
import { ColorColumn } from './components/column'

const ColorsPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <ColorClient data={formattedColors} />
        </div>
    )
}

export default ColorsPage