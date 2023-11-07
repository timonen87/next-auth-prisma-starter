import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions);
    const body = await req.json();

    const { name } = body;
    // if (!session?.user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!name) {
      return new NextResponse("Обязательное поле", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        name,
        // userId: session.user?.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
