import { db } from "@/lib/db";
import { ProductTypeForm } from "./_components/productTypeForm";

const ProductTypePage = async ({
  params,
}: {
  params: { productTypeId: string; storeId: string };
}) => {
  const productType = await db.productType.findUnique({
    where: {
      id: params.productTypeId,
    },
  });

  const brands = await db.brand.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductTypeForm brands={brands} initialData={productType} />
      </div>
    </div>
  );
};

export default ProductTypePage;
