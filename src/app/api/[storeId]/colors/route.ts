import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}:{params: {storeId: string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();

        const {name, value} = body;
        if(!userId){
            return new NextResponse("UnAuthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!value){
            return new NextResponse("Value is required", {status: 400});
        }

        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized");
        }

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId,

            }
        });
        return NextResponse.json(color)
    }catch(error){
        console.log('[Color_Post]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}

export async function GET(req: Request, {params}:{params: {storeId: string}}) {
    try{
        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }
        
        const color = await prismadb.color.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(color)
    }catch(error){
        console.log('[Color_Get]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}