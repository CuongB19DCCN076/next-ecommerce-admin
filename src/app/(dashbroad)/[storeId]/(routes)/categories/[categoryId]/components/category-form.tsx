"use client"
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { Billboard, Category } from '@prisma/client';
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/alert-model";
import UseOrigin from "@/hooks/use-origin";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData, billboards }: {
    initialData: Category | null,
    billboards: Billboard[]
}) => {
    const params = useParams();
    const route = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "Save changes" : "Create category"

    const origin = UseOrigin();
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: ""
        }
    })
    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/categories`, data);
            }
            route.refresh();
            route.push(`/${params.storeId}/categories`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
            route.refresh();
            route.push("/")
            toast.success("Xóa thành công Store");
        } catch (error) {
            toast.error("Trước tiên hãy đảm bảo bạn đã xóa tất cả sản phẩm và danh mục");
            console.log(error)
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} />
            <div className='flex items-center justify-between'>
                <Heading
                    title={title}
                    description={description}
                />
                {initialData &&
                    <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='h-4 w-4' />
                    </Button>}
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Category name..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator className="mt-2" />

        </>
    )
}

export default CategoryForm;