import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import SettingsForm from "@/app/(dashbroad)/[storeId]/(routes)/settings/components/setting-form";


interface ISettingsPageProps {
    params: {
        storeId: string
    };
}

const SettingsPage: React.FC<ISettingsPageProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if (!store) {
        redirect('/');
    }
    return (
        <div className="p-4">
            <SettingsForm initialData={store} />
        </div>
    )
}

export default SettingsPage