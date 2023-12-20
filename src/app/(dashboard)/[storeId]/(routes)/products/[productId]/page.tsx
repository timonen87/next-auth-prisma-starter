import { db } from "@/lib/db";
import { ProductForm } from "./_components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const productTypes = await db.productType.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm productTypes={productTypes} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
