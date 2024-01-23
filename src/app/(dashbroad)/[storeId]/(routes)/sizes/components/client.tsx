"use client"
import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import Heading from '@/components/ui/heading'
import {
    SizeColumn,
    columns
} from './column'
import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
    data
}) => {
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Sizes (${data.length})`}
                    description='Manage Sizes for you store'
                />
                <Link href={`/${params.storeId}/sizes/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable keySearch={"name"} columns={columns} data={data} />
            <Heading title='API' description='API calls for Size' />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}

export default SizeClient