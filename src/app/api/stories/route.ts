import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    const { name } = body;

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const storeExists = await db.store.findFirst({
      where: {
        name,
      },
    });

    if (storeExists) {
      return new Response("Категория уже существует", { status: 409 });
    }

    if (!name) {
      return new NextResponse("Обязательное поле", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORIES_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
