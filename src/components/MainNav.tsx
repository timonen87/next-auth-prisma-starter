"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Главная",
      active: pathname === `${params.storeId}`,
    },
    {
      href: `/${params.storeId}/brands`,
      label: "Бренды",
      active: pathname === `${params.storeId}/brands`,
    },
    {
      href: `/${params.storeId}/product-types`,
      label: "Тип продукта",
      active: pathname === `${params.storeId}/product-types`,
    },
    {
      href: `/${params.storeId}/catalog`,
      label: "Каталог",
      active: pathname === `${params.storeId}/catalog`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Настройки",
      active: pathname === `${params.storeId}`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4")}>
      {routes.map((route) => (
        <Link
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          key={route.href}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
