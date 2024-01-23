import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

const corsHeaders = {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, {headers:corsHeaders});
};

export async function POST(req: Request, {params}:{params: {storeId: string}}) {
    try{
        const body = await req.json();
        console.log(body);
        const {userId, productIds, name, phone, address} = body;
        if(!name){
            return new NextResponse("Name is required", {status: 401});
        }

        if(!phone){
            return new NextResponse("Phone is required", {status: 401});
        }

        if(!address){
            return new NextResponse("Address is required", {status: 401});
        }

        if(!userId){
            return new NextResponse("UnAuthorized", {status: 401});
        }

        if(!productIds || productIds.length === 0){
            return new NextResponse("Product ids are required", {status: 400});
        }

        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }

        // const products = await prismadb.product.findMany({
        //     where: {
        //         id: {
        //             in: productIds
        //         }
        //     }
        // });

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                userId,
                name,
                phone,
                address,
            }
        })
        console.log("order", order);
        if(!order) {
            return new NextResponse("Tạo đơn hàng không thành công", {status: 401});
        }

        const orderItems = productIds?.map((item: string) => {
            return ({
                productId: item,
                orderId: order.id,
                quantity: 1
            })
        })

        const res = await prismadb.orderItem.createMany({
            data: orderItems
        })
        if(!res) {
            return new NextResponse("Thêm vào giỏ hàng không thành công!", {status: 401})
        }
        console.log("res:", res)
        return NextResponse.json(res)
    }catch(error){
        console.log('[Category_Post]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}

export async function GET(req: Request, {params}:{params: {storeId: string}}) {
    try{
        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }
        
        const order = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(order)
    }catch(error){
        console.log('[Category_Get]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}