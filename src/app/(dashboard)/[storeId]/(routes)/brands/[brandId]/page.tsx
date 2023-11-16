import { db } from "@/lib/db";
import { BrandForm } from "./_components/brand-form";

const BrandPage = async ({ params }: { params: { brandId: string } }) => {
  const brandId = await db.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandForm initialData={brandId} />
      </div>
    </div>
  );
};

export default BrandPage;
