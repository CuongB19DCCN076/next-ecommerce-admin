"use client"
import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { ProductColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Products (${data.length})`}
                    description='Manage Products for you store'
                />
                <Link href={`/${params.storeId}/products/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable keySearch={"name"} columns={columns} data={data} />
            <Heading title='API' description='API calls for Products' />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}

export default ProductClient