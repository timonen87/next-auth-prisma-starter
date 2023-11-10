import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <div>Nav Sidebar</div>
      {children}
    </>
  );
}
