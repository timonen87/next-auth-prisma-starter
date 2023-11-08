import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import SettingsForm from "./_components/SettingsForm";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      creatorId: session.user.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
