import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}:{params: {storeId: string}}) {
    try{
        const {userId} = auth();
        const body = await req.json();
        const {
            name, 
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;
        console.log(images);
        if(!userId){
            return new NextResponse("UnAuthorized", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!price){
            return new NextResponse("Price is required", {status: 400});
        }
        if(!categoryId){
            return new NextResponse("Category id is required", {status: 400});
        }
        if(!colorId){
            return new NextResponse("Color id is required", {status: 400});
        }
        if(!sizeId){
            return new NextResponse("Size is required", {status: 400});
        }
        if(!images || !images.length){
            return new NextResponse("Image is required", {status: 400});
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isArchived,
                isFeatured,
                colorId,
                sizeId,
                categoryId,
                storeId: params.storeId,
                images: {
                    createMany: {
                    data: [
                        ...images.map((image: {url: string}) => image)
                    ]
                }
                }
                
            }
        });
        return NextResponse.json(product)
    }catch(error){
        console.log('[Product_Post]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}

export async function GET(req: Request, {params}:{params: {storeId: string}}) {
    try{
        
        const {searchParams} = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured") || undefined;
        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400});
        }
        
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived:false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy: {
                createAt: 'desc'
            }
        })

        return NextResponse.json(products)
    }catch(error){
        console.log('[Product_Get]',error)
        return new NextResponse("Interal error", {status: 500})
    }
}