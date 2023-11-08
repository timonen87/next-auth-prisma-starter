import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in");
  }

  const store = db.store.findFirst({
    where: {
      id: params.storeId,
      creatorId: session.user.id,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <>
      <div className="flex-col pt-20 pl-5">{children}</div>
    </>
  );
}
