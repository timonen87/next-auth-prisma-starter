import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { productTypeId: string } }
) {
  try {
    if (!params.productTypeId) {
      return new NextResponse("productType id is required", {
        status: 400,
      });
    }

    const productTypes = await db.productType.findUnique({
      where: {
        id: params.productTypeId,
      },
      include: {
        brand: true,
      },
    });

    return NextResponse.json(productTypes);
  } catch (error) {
    console.log("[productType_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productTypeId: string; storeId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productTypeId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        creatorId: session.user.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const productType = await db.productType.delete({
      where: {
        id: params.productTypeId,
      },
    });

    return NextResponse.json(productType);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productTypeId: string; storeId: string } }
) {
  try {
    const session = await getAuthSession();

    const body = await req.json();

    const { name, brandId } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!brandId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.productTypeId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        creatorId: session.user.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const productType = await db.productType.update({
      where: {
        id: params.productTypeId,
      },
      data: {
        name,
        brandId,
      },
    });

    return NextResponse.json(productType);
  } catch (error) {
    console.log("[productType_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
