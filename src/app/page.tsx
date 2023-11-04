import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Admin
      </Link>
      <h2>Client Session:</h2>
      <User />
      <h2>Server Session:</h2>
      {JSON.stringify(session)}
    </>
  );
}
