"use client"
import * as z from "zod";
import { Store } from '@prisma/client';
import React, { useState } from 'react'
import Heading from '@/components/ui/heading';
import { Button } from '../../../../../../components/ui/button';
import { Trash, Trophy } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../../../../../../components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../../../components/ui/form";
import { Input } from "../../../../../../components/ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "../../../../../../components/modals/alert-model";
import ApiAlert from "@/components/ui/api-alert";
import UseOrigin from "@/hooks/use-origin";

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: {
    initialData: Store
}) => {
    const params = useParams();
    const route = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const origin = UseOrigin();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            route.refresh();
            toast.success("Store updated.");
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
            await axios.delete(`/api/stores/${params.storeId}`);
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
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator className="mt-2" />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public" />
        </>
    )
}

export default SettingsForm;