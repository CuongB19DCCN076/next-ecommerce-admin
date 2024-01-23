"use client"
import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import Heading from '@/components/ui/heading'
import ApiList from '@/components/ui/api-list'
import {
    ColorColumn,
    columns
} from './column'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

interface ColorClientProps {
    data: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({
    data
}) => {
    const params = useParams();
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Colors (${data.length})`}
                    description='Manage Colors for you store'
                />
                <Link href={`/${params.storeId}/colors/new`}>
                    <Button>
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable keySearch={"name"} columns={columns} data={data} />
            <Heading title='API' description='API calls for Color' />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}

export default ColorClient