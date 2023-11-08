import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Ghost } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import UserAccount from "./UserAccount";
import UserAvatar from "./UserAvatar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import StoreSwitcher from "./StoreSwitcher";

const Navbar = async () => {
  const session = await getAuthSession();

  const stores = await db.store.findMany({
    where: {
      creatorId: session?.user.id,
    },
  });

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/"></Link>
          {session ? <StoreSwitcher items={stores} /> : <Ghost />}
        </div>
        {session?.user ? (
          <UserAvatar user={session?.user} />
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
