"use client";
import { AvatarProps } from "@radix-ui/react-avatar";

import Image from "next/image";
import { FC } from "react";
import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col space-y-1 leading-none">
        {user.name && <p className="font-medium">{user.name}</p>}
        {user.email && (
          <p className="w-[160px] truncate text-sm text-zinc-700">
            {user.email}
          </p>
        )}
      </div>
      <Avatar {...props}>
        {user.image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              fill
              src={user.image}
              alt="Профиль пользователя"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{user?.name}</span>
            <Icons.user className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
        variant="destructive"
      >
        Выйти
      </Button>
    </div>
  );
};

export default UserAvatar;
