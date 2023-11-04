import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const UserSchema = z.object({
  username: z.string().min(1, "Введите имя пользователя").max(100),
  email: z.string().min(1, "Введите Email ").email("неверный email"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(8, "Пароль должен состоять из 8 и более символов"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Пользователь с таким email уже существуте",
        },
        { status: 409 }
      );
    }
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "Пользователь с таким именем уже существуте",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "Пользователь успешно создан",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Что то пошло не так",
      },
      { status: 500 }
    );
  }
}
