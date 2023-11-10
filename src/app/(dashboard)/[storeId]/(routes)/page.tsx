import { db } from "@/lib/db";
import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active Store : {store?.name}</div>;
};

export default DashboardPage;
