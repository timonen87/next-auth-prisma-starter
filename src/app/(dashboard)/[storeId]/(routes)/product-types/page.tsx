import { format } from "date-fns";

import { ProductTypeColumn } from "./_components/columns";
import { ProductTypeClient } from "./_components/client";
import { db } from "@/lib/db";

const ProductTypePage = async ({ params }: { params: { storeId: string } }) => {
  const ProductTypes = await db.productType.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProductType: ProductTypeColumn[] = ProductTypes.map(
    (item) => ({
      id: item.id,
      name: item.name,
      brandLabel: item.brand.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductTypeClient data={formattedProductType} />
      </div>
    </div>
  );
};

export default ProductTypePage;
