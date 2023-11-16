import { db } from "@/lib/db";
import { format } from "date-fns";

import { BrandColumn } from "./_components/columns";
import { BrandClient } from "./_components/client";

const BrandsPage = async ({ params }: { params: { storeId: string } }) => {
  const brands = await db.brand.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
