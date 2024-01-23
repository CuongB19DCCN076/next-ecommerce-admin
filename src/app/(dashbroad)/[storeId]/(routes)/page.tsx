import prismadb from "@/lib/prismadb"

const DashbroadPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const stores = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <div>
            Active Store: {stores?.name}
        </div>
    )
}

export default DashbroadPage