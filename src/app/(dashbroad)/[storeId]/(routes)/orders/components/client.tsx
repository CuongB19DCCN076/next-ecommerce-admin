"use client"
import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Đơn hàng (${data.length})`}
                    description='Quản lý đơn hàng ở cửa hàng của bạn'
                />
                <Link href={`/${params.storeId}/orders/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable
                keySearch={"phone"}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default OrderClient