"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/`,
            label: 'Tổng quan',
            active: pathname === `/${params.storeId}/`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Quảng cáo',
            active: pathname === `/${params.storeId}/billboards` || pathname.includes(`${params.storeId}/billboards`),
        }
        ,
        {
            href: `/${params.storeId}/categories`,
            label: 'Danh mục',
            active: pathname === `/${params.storeId}/categories` || pathname.includes(`${params.storeId}/categories`),
        }
        ,
        {
            href: `/${params.storeId}/sizes`,
            label: 'Kích thước',
            active: pathname === `/${params.storeId}/sizes` || pathname.includes(`${params.storeId}/sizes`),
        }
        ,
        {
            href: `/${params.storeId}/colors`,
            label: 'Màu sắc',
            active: pathname === `/${params.storeId}/colors` || pathname.includes(`${params.storeId}/colors`),
        }
        ,
        {
            href: `/${params.storeId}/products`,
            label: 'Sản phẩm',
            active: pathname === `/${params.storeId}/products` || pathname.includes(`${params.storeId}/products`),
        }
        ,
        {
            href: `/${params.storeId}/orders`,
            label: 'Đơn hàng',
            active: pathname === `/${params.storeId}/orders` || pathname.includes(`${params.storeId}/orders`),
        }
        ,
        {
            href: `/${params.storeId}/settings`,
            label: 'Cài đặt',
            active: pathname === `/${params.storeId}/settings` || pathname.includes(`${params.storeId}/settings`),
        }
    ]

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => {
                return (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                )
            })}
        </nav>
    )
}

export default MainNav