import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Ghost } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccount from "./UserAccount";
import UserAvatar from "./UserAvatar";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Ghost />
        </Link>
        {session?.user ? (
          <UserAvatar user={session.user} />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
