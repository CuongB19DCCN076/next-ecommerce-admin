import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}:{params: {storeId: string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();

        const {label, imageUrl} = body;
        if(!userId){
            return new NextResponse("UnAuthorized", {status: 401});
        }

        if(!label){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!imageUrl){
            return new NextResponse("imageUrl is required", {status: 400});
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,

            }
        });
        return NextResponse.json(billboard)
    }catch(error){
        console.log('[BillBoard_Post]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}

export async function GET(req: Request, {params}:{params: {storeId: string}}) {
    try{
        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }
        
        const billboard = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        })

        return NextResponse.json(billboard)
    }catch(error){
        console.log('[BillBoard_Get]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}