"use client"
import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { BillBoardColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

interface BillboardClientProps {
    data: BillBoardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Billboards (${data.length})`}
                    description='Manage billboards for you store'
                />
                <Link href={`/${params.storeId}/billboards/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable
                keySearch={"label"}
                columns={columns}
                data={data}
            />
            <Heading
                title='API'
                description='API calls for Billboards'
            />
            <Separator />
            <ApiList
                entityName="billboards"
                entityIdName="billboardId"
            />
        </>
    )
}

export default BillboardClient