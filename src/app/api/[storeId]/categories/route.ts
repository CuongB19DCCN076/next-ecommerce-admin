import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}:{params: {storeId: string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();

        const {name, billboardId} = body;
        if(!userId){
            return new NextResponse("UnAuthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!billboardId){
            return new NextResponse("billboardId is required", {status: 400});
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId,
            }
        });
        return NextResponse.json(category)
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
        
        const category = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(category)
    }catch(error){
        console.log('[Category_Get]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}