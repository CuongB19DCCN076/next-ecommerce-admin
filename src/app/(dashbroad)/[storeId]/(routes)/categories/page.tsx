import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import { CategoryColumn } from "./components/column"
import CategoryClient from "./components/client"

const CategorysPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <CategoryClient data={formattedCategories} />
        </div>
    )
}

export default CategorysPage