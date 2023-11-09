import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Обязательное поле", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        creatorId: session.user.id,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Обязательное поле", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        creatorId: session.user.id,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Error", { status: 500 });
  }
}
