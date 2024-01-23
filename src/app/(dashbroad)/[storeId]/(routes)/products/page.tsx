import { format } from "date-fns"
import prismadb from '@/lib/prismadb'

import { ProductColumn } from "./components/column"
import ProductClient from "./components/client"
import { formatter } from "@/lib/utils"

const ProductsPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            color: true,
            size: true
        }
        ,
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createAt: format(item.createAt, "MMMM do, yyyy")
    }))
    return (
        <div className='p-4'>
            <ProductClient data={formattedProducts} />
        </div>
    )
}

export default ProductsPage